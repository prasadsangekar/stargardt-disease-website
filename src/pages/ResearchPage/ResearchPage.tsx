import { useEffect, useRef, useState } from 'react';
import type { ResearchStudy, ClinicalTrial } from '../../types';
import { AgeGroupFilter } from '../../components/Research/AgeGroupFilter';
import type { FilterValue } from '../../components/Research/AgeGroupFilter';
import { ResearchStudyList } from '../../components/Research/ResearchStudyList';
import { ClinicalTrialList } from '../../components/Research/ClinicalTrialList';
import { PageErrorBoundary } from '../../components/PageErrorBoundary';
import styles from './ResearchPage.module.css';

function ResearchContent() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [studies, setStudies] = useState<ResearchStudy[]>([]);
  const [trials, setTrials] = useState<ClinicalTrial[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState<FilterValue>('all');

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  useEffect(() => {
    async function loadData() {
      try {
        const [studiesModule, trialsModule] = await Promise.all([
          import('../../data/research-studies.json'),
          import('../../data/clinical-trials.json'),
        ]);
        setStudies(studiesModule.default as ResearchStudy[]);
        setTrials(trialsModule.default as ClinicalTrial[]);
      } catch {
        setError('Research content is temporarily unavailable. Please try again later.');
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (error) {
    return (
      <section aria-labelledby="research-heading" className={styles.page}>
        <h1 id="research-heading" ref={headingRef} tabIndex={-1} className={styles.pageHeading}>
          Research &amp; Clinical Trials
        </h1>
        <div className={styles.errorContainer} role="alert" aria-live="assertive">
          <p className={styles.errorMessage}>{error}</p>
        </div>
      </section>
    );
  }

  if (loading) {
    return (
      <section aria-labelledby="research-heading" className={styles.page}>
        <h1 id="research-heading" ref={headingRef} tabIndex={-1} className={styles.pageHeading}>
          Research &amp; Clinical Trials
        </h1>
        <p className={styles.loadingMessage} aria-live="polite">
          Loading research data...
        </p>
      </section>
    );
  }

  return (
    <section aria-labelledby="research-heading" className={styles.page}>
      <h1 id="research-heading" ref={headingRef} tabIndex={-1} className={styles.pageHeading}>
        Research &amp; Clinical Trials
      </h1>

      <section aria-labelledby="studies-heading" className={styles.section}>
        <h2 id="studies-heading" className={styles.sectionHeading}>
          Current Research Studies
        </h2>
        <ResearchStudyList studies={studies} />
      </section>

      <section aria-labelledby="trials-heading" className={styles.section}>
        <h2 id="trials-heading" className={styles.sectionHeading}>
          Clinical Trials
        </h2>
        <AgeGroupFilter
          selectedFilter={selectedFilter}
          onFilterChange={setSelectedFilter}
        />
        <ClinicalTrialList trials={trials} selectedFilter={selectedFilter} />
      </section>
    </section>
  );
}

function ResearchPage() {
  return (
    <PageErrorBoundary fallbackMessage="Research content is temporarily unavailable. Please try again later.">
      <ResearchContent />
    </PageErrorBoundary>
  );
}

export default ResearchPage;
