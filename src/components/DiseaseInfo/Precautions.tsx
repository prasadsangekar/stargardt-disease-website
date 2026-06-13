import type { PrecautionItem } from '../../types';
import styles from './Precautions.module.css';

interface PrecautionsProps {
  precautions: PrecautionItem[];
}

function getCategoryLabel(category: PrecautionItem['category']): string {
  switch (category) {
    case 'uv-exposure':
      return 'UV Exposure';
    case 'dietary':
      return 'Dietary';
    case 'lifestyle':
      return 'Lifestyle';
    default:
      return category;
  }
}

export function Precautions({ precautions }: PrecautionsProps) {
  return (
    <section aria-labelledby="precautions-heading" className={styles.section}>
      <h2 id="precautions-heading" className={styles.heading}>
        Precautions
      </h2>
      <ul className={styles.list} aria-label="List of precautions for Stargardt disease">
        {precautions.map((item) => (
          <li key={item.id} className={styles.listItem}>
            <span className={styles.categoryLabel} aria-label={`Category: ${getCategoryLabel(item.category)}`}>
              {getCategoryLabel(item.category)}
            </span>
            {item.text}
          </li>
        ))}
      </ul>
    </section>
  );
}
