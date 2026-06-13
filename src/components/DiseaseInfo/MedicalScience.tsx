import type { GlossaryTerm as GlossaryTermType } from '../../types';
import { GlossaryTerm } from './GlossaryTerm';
import styles from './MedicalScience.module.css';

interface MedicalScienceProps {
  geneticBasis: string;
  biologicalMechanism: string;
  inheritancePatterns: string;
  glossary: GlossaryTermType[];
  usedTerms: Set<string>;
}

/**
 * Renders text with inline glossary term definitions at first use.
 * Shares the usedTerms set with DiseaseOverview to ensure terms are
 * only defined once across the entire page.
 */
function renderTextWithGlossary(
  text: string,
  glossary: GlossaryTermType[],
  usedTerms: Set<string>
): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  let remainingText = text;
  let key = 0;

  while (remainingText.length > 0) {
    let earliestIndex = Infinity;
    let matchedTerm: GlossaryTermType | null = null;
    let matchedText = '';

    for (const term of glossary) {
      if (usedTerms.has(term.term)) continue;

      const index = remainingText.toLowerCase().indexOf(term.term.toLowerCase());
      if (index !== -1 && index < earliestIndex) {
        earliestIndex = index;
        matchedTerm = term;
        matchedText = remainingText.substring(index, index + term.term.length);
      }
    }

    if (matchedTerm && earliestIndex !== Infinity) {
      if (earliestIndex > 0) {
        nodes.push(
          <span key={`text-${key++}`}>
            {remainingText.substring(0, earliestIndex)}
          </span>
        );
      }

      usedTerms.add(matchedTerm.term);
      nodes.push(
        <GlossaryTerm key={`term-${key++}`} term={matchedTerm}>
          {matchedText}
        </GlossaryTerm>
      );

      remainingText = remainingText.substring(earliestIndex + matchedTerm.term.length);
    } else {
      nodes.push(<span key={`text-${key++}`}>{remainingText}</span>);
      break;
    }
  }

  return nodes;
}

export function MedicalScience({
  geneticBasis,
  biologicalMechanism,
  inheritancePatterns,
  glossary,
  usedTerms,
}: MedicalScienceProps) {
  return (
    <section aria-labelledby="medical-science-heading" className={styles.section}>
      <h2 id="medical-science-heading" className={styles.heading}>
        Medical Science
      </h2>

      <section aria-labelledby="genetic-basis-heading" className={styles.subsection}>
        <h3 id="genetic-basis-heading" className={styles.subheading}>
          Genetic Basis
        </h3>
        <p className={styles.content}>
          {renderTextWithGlossary(geneticBasis, glossary, usedTerms)}
        </p>
      </section>

      <section aria-labelledby="biological-mechanism-heading" className={styles.subsection}>
        <h3 id="biological-mechanism-heading" className={styles.subheading}>
          Biological Mechanism
        </h3>
        <p className={styles.content}>
          {renderTextWithGlossary(biologicalMechanism, glossary, usedTerms)}
        </p>
      </section>

      <section aria-labelledby="inheritance-heading" className={styles.subsection}>
        <h3 id="inheritance-heading" className={styles.subheading}>
          Inheritance Patterns
        </h3>
        <p className={styles.content}>
          {renderTextWithGlossary(inheritancePatterns, glossary, usedTerms)}
        </p>
      </section>
    </section>
  );
}
