import type { UpcomingMedicine } from '../../types';
import styles from './UpcomingMedicineCard.module.css';

interface UpcomingMedicineCardProps {
  medicine: UpcomingMedicine;
}

export function UpcomingMedicineCard({ medicine }: UpcomingMedicineCardProps) {
  return (
    <article className={styles.medicineCard} aria-labelledby={`medicine-name-${medicine.id}`}>
      <h4 id={`medicine-name-${medicine.id}`} className={styles.medicineName}>
        {medicine.name}
      </h4>
      <div className={styles.medicineMeta}>
        <span className={styles.medicineCompany}>{medicine.company}</span>
        <span className={styles.medicineStatus}>{medicine.status}</span>
        <span className={styles.medicineApproval}>Target: {medicine.targetApproval}</span>
      </div>
      <p className={styles.medicineDescription}>{medicine.description}</p>
    </article>
  );
}
