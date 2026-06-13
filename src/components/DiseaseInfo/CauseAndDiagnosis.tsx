import styles from './CauseAndDiagnosis.module.css';

interface DiagnosisMethod {
  name: string;
  description: string;
}

interface CauseAndDiagnosisProps {
  cause: string;
  diagnosisMethods: DiagnosisMethod[];
}

export function CauseAndDiagnosis({ cause, diagnosisMethods }: CauseAndDiagnosisProps) {
  return (
    <>
      <section aria-labelledby="cause-heading" className={styles.section}>
        <h2 id="cause-heading" className={styles.heading}>
          Cause
        </h2>
        <div className={styles.content}>
          <p>{cause}</p>
        </div>
      </section>

      <section aria-labelledby="diagnosis-heading" className={styles.section}>
        <h2 id="diagnosis-heading" className={styles.heading}>
          Diagnosis
        </h2>
        <ul className={styles.diagnosisList}>
          {diagnosisMethods.map((method, index) => (
            <li key={index} className={styles.diagnosisItem}>
              <span className={styles.diagnosisIcon} aria-hidden="true">
                {index + 1}
              </span>
              <div className={styles.diagnosisText}>
                <div className={styles.diagnosisName}>{method.name}</div>
                <div className={styles.diagnosisDesc}>{method.description}</div>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
