import { useEffect, useRef, useState } from 'react';
import type { UpcomingMedicine } from '../../types';
import { UpcomingMedicineList } from '../../components/Research/UpcomingMedicineList';
import { PageErrorBoundary } from '../../components/PageErrorBoundary';
import styles from './UpcomingMedicinesPage.module.css';

function UpcomingMedicinesContent() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [medicines, setMedicines] = useState<UpcomingMedicine[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  useEffect(() => {
    async function loadData() {
      try {
        const medicinesModule = await import('../../data/upcoming-medicines.json');
        setMedicines(medicinesModule.default as UpcomingMedicine[]);
      } catch {
        setError('Upcoming medicines content is temporarily unavailable. Please try again later.');
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (error) {
    return (
      <section aria-labelledby="medicines-heading" className={styles.page}>
        <h1 id="medicines-heading" ref={headingRef} tabIndex={-1} className={styles.pageHeading}>
          Upcoming Medicines
        </h1>
        <div className={styles.errorContainer} role="alert" aria-live="assertive">
          <p className={styles.errorMessage}>{error}</p>
        </div>
      </section>
    );
  }

  if (loading) {
    return (
      <section aria-labelledby="medicines-heading" className={styles.page}>
        <h1 id="medicines-heading" ref={headingRef} tabIndex={-1} className={styles.pageHeading}>
          Upcoming Medicines
        </h1>
        <p className={styles.loadingMessage} aria-live="polite">
          Loading medicines data...
        </p>
      </section>
    );
  }

  return (
    <section aria-labelledby="medicines-heading" className={styles.page}>
      <h1 id="medicines-heading" ref={headingRef} tabIndex={-1} className={styles.pageHeading}>
        Upcoming Medicines Near FDA Approval
      </h1>
      <p className={styles.description}>
        These therapies are in late-stage clinical development or regulatory review for
        Stargardt disease. No treatments are currently FDA-approved for this condition.
      </p>
      <UpcomingMedicineList medicines={medicines} />
    </section>
  );
}

function UpcomingMedicinesPage() {
  return (
    <PageErrorBoundary fallbackMessage="Upcoming medicines content is temporarily unavailable. Please try again later.">
      <UpcomingMedicinesContent />
    </PageErrorBoundary>
  );
}

export default UpcomingMedicinesPage;
