import { useEffect, useRef, useState } from 'react';
import type { GlossaryTerm, PrecautionItem } from '../../types';
import { EyeDiagram } from '../../components/DiseaseInfo/EyeDiagram';
import { KeyFacts } from '../../components/DiseaseInfo/KeyFacts';
import { CauseAndDiagnosis } from '../../components/DiseaseInfo/CauseAndDiagnosis';
import { DiseaseOverview } from '../../components/DiseaseInfo/DiseaseOverview';
import { MedicalScience } from '../../components/DiseaseInfo/MedicalScience';
import { Precautions } from '../../components/DiseaseInfo/Precautions';
import { DiseaseInfoErrorBoundary } from '../../components/DiseaseInfo/ErrorBoundary';
import styles from './DiseaseInfoPage.module.css';

interface DiagnosisMethod {
  name: string;
  description: string;
}

interface KeyFact {
  label: string;
  value: string;
}

interface DiseaseInfoData {
  keyFacts: KeyFact[];
  cause: string;
  diagnosisMethods: DiagnosisMethod[];
  overview: {
    definition: string;
    symptoms: string;
    progression: string;
  };
  medicalScience: {
    geneticBasis: string;
    biologicalMechanism: string;
    inheritancePatterns: string;
  };
  precautions: PrecautionItem[];
  glossary: GlossaryTerm[];
}

function DiseaseInfoContent() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [data, setData] = useState<DiseaseInfoData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [usedTerms] = useState(() => new Set<string>());

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  useEffect(() => {
    async function loadData() {
      try {
        const diseaseInfo = await import('../../data/disease-info.json');
        setData(diseaseInfo.default as DiseaseInfoData);
      } catch {
        setError('Content is temporarily unavailable. Please try again later.');
      }
    }
    loadData();
  }, []);

  // Handle navigation to section anchors
  const handleSectionClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const href = e.currentTarget.getAttribute('href');
    if (href?.startsWith('#')) {
      e.preventDefault();
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
        targetElement.focus({ preventScroll: true });
      }
    }
  };

  if (error) {
    return (
      <div className={styles.errorContainer} role="alert" aria-live="assertive">
        <p className={styles.errorMessage}>{error}</p>
      </div>
    );
  }

  if (!data) {
    return (
      <p className={styles.loadingMessage} aria-live="polite">
        Loading disease information...
      </p>
    );
  }

  // Reset usedTerms when data loads so glossary tracking is fresh
  usedTerms.clear();

  return (
    <article aria-labelledby="disease-info-heading" className={styles.page}>
      <h1 id="disease-info-heading" ref={headingRef} tabIndex={-1} className={styles.pageHeading}>
        Stargardt Disease Information
      </h1>

      {/* Navigation element for locating subsections */}
      <nav aria-label="Page sections" className={styles.tableOfContents}>
        <h2 className={styles.tableOfContentsHeading}>On This Page</h2>
        <ul className={styles.tableOfContentsList}>
          <li className={styles.tableOfContentsItem}>
            <a href="#eye-diagram-heading" onClick={handleSectionClick} className={styles.tableOfContentsLink}>
              Eye Diagram
            </a>
          </li>
          <li className={styles.tableOfContentsItem}>
            <a href="#key-facts-heading" onClick={handleSectionClick} className={styles.tableOfContentsLink}>
              Key Facts
            </a>
          </li>
          <li className={styles.tableOfContentsItem}>
            <a href="#cause-heading" onClick={handleSectionClick} className={styles.tableOfContentsLink}>
              Cause
            </a>
          </li>
          <li className={styles.tableOfContentsItem}>
            <a href="#diagnosis-heading" onClick={handleSectionClick} className={styles.tableOfContentsLink}>
              Diagnosis
            </a>
          </li>
          <li className={styles.tableOfContentsItem}>
            <a href="#overview-heading" onClick={handleSectionClick} className={styles.tableOfContentsLink}>
              Disease Overview
            </a>
          </li>
          <li className={styles.tableOfContentsItem}>
            <a href="#medical-science-heading" onClick={handleSectionClick} className={styles.tableOfContentsLink}>
              Medical Science
            </a>
          </li>
          <li className={styles.tableOfContentsItem}>
            <a href="#precautions-heading" onClick={handleSectionClick} className={styles.tableOfContentsLink}>
              Precautions
            </a>
          </li>
        </ul>
      </nav>

      <EyeDiagram />

      <KeyFacts facts={data.keyFacts} />

      <CauseAndDiagnosis
        cause={data.cause}
        diagnosisMethods={data.diagnosisMethods}
      />

      <DiseaseOverview
        definition={data.overview.definition}
        symptoms={data.overview.symptoms}
        progression={data.overview.progression}
        glossary={data.glossary}
        usedTerms={usedTerms}
      />

      <MedicalScience
        geneticBasis={data.medicalScience.geneticBasis}
        biologicalMechanism={data.medicalScience.biologicalMechanism}
        inheritancePatterns={data.medicalScience.inheritancePatterns}
        glossary={data.glossary}
        usedTerms={usedTerms}
      />

      <Precautions precautions={data.precautions} />
    </article>
  );
}

function DiseaseInfoPage() {
  return (
    <DiseaseInfoErrorBoundary>
      <DiseaseInfoContent />
    </DiseaseInfoErrorBoundary>
  );
}

export default DiseaseInfoPage;
