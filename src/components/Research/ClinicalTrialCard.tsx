import type { ClinicalTrial } from '../../types';
import styles from './ClinicalTrialCard.module.css';

interface ClinicalTrialCardProps {
  trial: ClinicalTrial;
}

const STATUS_LABELS: Record<ClinicalTrial['status'], string> = {
  recruiting: 'Recruiting',
  active: 'Active',
  completed: 'Completed',
  enrolling: 'Enrolling',
};

export function ClinicalTrialCard({ trial }: ClinicalTrialCardProps) {
  return (
    <article className={styles.trialCard} aria-labelledby={`trial-name-${trial.id}`}>
      <h4 id={`trial-name-${trial.id}`} className={styles.trialName}>
        {trial.name}
      </h4>
      <div className={styles.trialMeta}>
        <span className={styles.trialPhase}>{trial.phase}</span>
        <span className={`${styles.trialStatus} ${styles[`status-${trial.status}`]}`}>
          {STATUS_LABELS[trial.status]}
        </span>
        <span className={styles.trialLocation}>{trial.location}</span>
      </div>
      <p className={styles.trialEligibility}>{trial.eligibilitySummary}</p>
      <a
        href={trial.detailsUrl}
        className={styles.trialDetailsLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`View details for ${trial.name}`}
      >
        View trial details
      </a>
    </article>
  );
}
