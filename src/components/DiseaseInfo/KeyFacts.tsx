import styles from './KeyFacts.module.css';

interface KeyFact {
  label: string;
  value: string;
}

interface KeyFactsProps {
  facts: KeyFact[];
}

export function KeyFacts({ facts }: KeyFactsProps) {
  return (
    <section aria-labelledby="key-facts-heading" className={styles.keyFactsSection}>
      <h2 id="key-facts-heading" className={styles.keyFactsHeading}>
        Key Facts
      </h2>
      <div className={styles.factsGrid} role="list">
        {facts.map((fact, index) => (
          <div key={index} className={styles.factCard} role="listitem">
            <div className={styles.factLabel}>{fact.label}</div>
            <div className={styles.factValue}>{fact.value}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
