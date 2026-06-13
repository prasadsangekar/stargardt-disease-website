import styles from './EventLegend.module.css';

function EventLegend() {
  return (
    <div className={styles.legend} aria-label="Event type legend">
      <div className={styles.legendItem}>
        <span className={`${styles.dot} ${styles.dotTrial}`} aria-hidden="true" />
        <span className={styles.label}>Clinical Trial Milestone</span>
      </div>
      <div className={styles.legendItem}>
        <span className={`${styles.dot} ${styles.dotMedicine}`} aria-hidden="true" />
        <span className={styles.label}>Medicine Release</span>
      </div>
      <div className={styles.legendItem}>
        <span className={`${styles.dot} ${styles.dotFda}`} aria-hidden="true" />
        <span className={styles.label}>FDA Approval</span>
      </div>
    </div>
  );
}

export default EventLegend;
