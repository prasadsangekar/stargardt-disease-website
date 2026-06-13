import type { GlossaryTerm as GlossaryTermType } from '../../types';
import { GlossaryTerm } from './GlossaryTerm';
import styles from './DiseaseOverview.module.css';

interface DiseaseOverviewProps {
  definition: string;
  symptoms: string;
  progression: string;
  glossary: GlossaryTermType[];
  usedTerms: Set<string>;
}

/**
 * Renders text with inline glossary term definitions at first use.
 * Scans the text for glossary terms and wraps the first occurrence
 * with a tooltip component.
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
      // Add text before the term
      if (earliestIndex > 0) {
        nodes.push(
          <span key={`text-${key++}`}>
            {remainingText.substring(0, earliestIndex)}
          </span>
        );
      }

      // Add the glossary term with tooltip
      usedTerms.add(matchedTerm.term);
      nodes.push(
        <GlossaryTerm key={`term-${key++}`} term={matchedTerm}>
          {matchedText}
        </GlossaryTerm>
      );

      remainingText = remainingText.substring(earliestIndex + matchedTerm.term.length);
    } else {
      // No more terms found, add remaining text
      nodes.push(<span key={`text-${key++}`}>{remainingText}</span>);
      break;
    }
  }

  return nodes;
}

export function DiseaseOverview({
  definition,
  symptoms,
  progression,
  glossary,
  usedTerms,
}: DiseaseOverviewProps) {

  return (
    <section aria-labelledby="overview-heading" className={styles.section}>
      <h2 id="overview-heading" className={styles.heading}>
        Disease Overview
      </h2>

      <section aria-labelledby="definition-heading" className={styles.subsection}>
        <h3 id="definition-heading" className={styles.subheading}>
          What is Stargardt Disease?
        </h3>
        <p className={styles.content}>
          {renderTextWithGlossary(definition, glossary, usedTerms)}
        </p>
      </section>

      <section aria-labelledby="symptoms-heading" className={styles.subsection}>
        <h3 id="symptoms-heading" className={styles.subheading}>
          Symptoms
        </h3>
        <p className={styles.content}>
          {renderTextWithGlossary(symptoms, glossary, usedTerms)}
        </p>
      </section>

      <section aria-labelledby="progression-heading" className={styles.subsection}>
        <h3 id="progression-heading" className={styles.subheading}>
          Progression
        </h3>
        <p className={styles.content}>
          {renderTextWithGlossary(progression, glossary, usedTerms)}
        </p>
      </section>
    </section>
  );
}
