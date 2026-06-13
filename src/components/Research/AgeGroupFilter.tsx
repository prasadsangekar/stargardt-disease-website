import type { AgeGroup } from '../../types';
import { AGE_GROUPS } from '../../constants/ageGroups';
import styles from './AgeGroupFilter.module.css';

export type FilterValue = AgeGroup | 'all';

interface AgeGroupFilterProps {
  selectedFilter: FilterValue;
  onFilterChange: (filter: FilterValue) => void;
}

export function AgeGroupFilter({ selectedFilter, onFilterChange }: AgeGroupFilterProps) {
  return (
    <div role="group" aria-label="Filter clinical trials by age group" className={styles.filterContainer}>
      <button
        type="button"
        className={`${styles.filterButton} ${selectedFilter === 'all' ? styles.filterButtonActive : ''}`}
        aria-pressed={selectedFilter === 'all'}
        onClick={() => onFilterChange('all')}
      >
        All
      </button>
      {AGE_GROUPS.map((group) => (
        <button
          key={group.id}
          type="button"
          className={`${styles.filterButton} ${selectedFilter === group.id ? styles.filterButtonActive : ''}`}
          aria-pressed={selectedFilter === group.id}
          onClick={() => onFilterChange(group.id)}
        >
          {group.label}
        </button>
      ))}
    </div>
  );
}
