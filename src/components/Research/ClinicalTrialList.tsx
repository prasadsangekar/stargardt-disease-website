import { useMemo } from 'react';
import type { ClinicalTrial } from '../../types';
import { AGE_GROUPS } from '../../constants/ageGroups';
import { filterTrialsByAgeGroup } from '../../utils/filterTrialsByAgeGroup';
import { ClinicalTrialCard } from './ClinicalTrialCard';
import type { FilterValue } from './AgeGroupFilter';
import styles from './ClinicalTrialList.module.css';

interface ClinicalTrialListProps {
  trials: ClinicalTrial[];
  selectedFilter: FilterValue;
}

export function ClinicalTrialList({ trials, selectedFilter }: ClinicalTrialListProps) {
  const filteredContent = useMemo(() => {
    if (selectedFilter === 'all') {
      // Show all trials grouped by age group
      return AGE_GROUPS.map((group) => {
        const groupTrials = filterTrialsByAgeGroup(trials, group);
        return (
          <section key={group.id} className={styles.ageGroupSection} aria-labelledby={`age-group-${group.id}`}>
            <h3 id={`age-group-${group.id}`} className={styles.ageGroupHeading}>
              {group.label}
            </h3>
            {groupTrials.length > 0 ? (
              <ul className={styles.trialList} aria-label={`Clinical trials for ${group.label}`}>
                {groupTrials.map((trial) => (
                  <li key={trial.id}>
                    <ClinicalTrialCard trial={trial} />
                  </li>
                ))}
              </ul>
            ) : (
              <p className={styles.emptyGroupMessage}>
                No trials are currently available for this age group.
              </p>
            )}
          </section>
        );
      });
    }

    // Show trials for the selected age group only
    const selectedGroup = AGE_GROUPS.find((g) => g.id === selectedFilter);
    if (!selectedGroup) return null;

    const groupTrials = filterTrialsByAgeGroup(trials, selectedGroup);
    return (
      <section className={styles.ageGroupSection} aria-labelledby={`age-group-${selectedGroup.id}`}>
        <h3 id={`age-group-${selectedGroup.id}`} className={styles.ageGroupHeading}>
          {selectedGroup.label}
        </h3>
        {groupTrials.length > 0 ? (
          <ul className={styles.trialList} aria-label={`Clinical trials for ${selectedGroup.label}`}>
            {groupTrials.map((trial) => (
              <li key={trial.id}>
                <ClinicalTrialCard trial={trial} />
              </li>
            ))}
          </ul>
        ) : (
          <p className={styles.emptyGroupMessage}>
            No trials are currently available for this age group.
          </p>
        )}
      </section>
    );
  }, [trials, selectedFilter]);

  return <div>{filteredContent}</div>;
}
