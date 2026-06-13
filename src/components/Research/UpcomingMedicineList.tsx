import type { UpcomingMedicine } from '../../types';
import { UpcomingMedicineCard } from './UpcomingMedicineCard';
import styles from './UpcomingMedicineList.module.css';

interface UpcomingMedicineListProps {
  medicines: UpcomingMedicine[];
}

export function UpcomingMedicineList({ medicines }: UpcomingMedicineListProps) {
  if (medicines.length === 0) {
    return (
      <p className={styles.emptyMessage}>
        No upcoming medicines are currently in the approval pipeline.
      </p>
    );
  }

  return (
    <div className={styles.medicineList}>
      {medicines.map((medicine) => (
        <UpcomingMedicineCard key={medicine.id} medicine={medicine} />
      ))}
    </div>
  );
}
