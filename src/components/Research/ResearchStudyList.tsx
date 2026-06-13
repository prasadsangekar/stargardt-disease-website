import { useMemo } from 'react';
import type { ResearchStudy } from '../../types';
import { filterResearchStudies } from '../../utils/filterResearchStudies';
import styles from './ResearchStudyList.module.css';

interface ResearchStudyListProps {
  studies: ResearchStudy[];
}

function getStatusClass(status: ResearchStudy['status']): string {
  switch (status) {
    case 'recruiting':
      return styles.statusRecruiting;
    case 'active':
      return styles.statusActive;
    case 'completed':
      return styles.statusCompleted;
    default:
      return '';
  }
}

export function ResearchStudyList({ studies }: ResearchStudyListProps) {
  const filteredStudies = useMemo(() => filterResearchStudies(studies), [studies]);

  if (filteredStudies.length === 0) {
    return (
      <p className={styles.emptyState} role="status">
        No current studies are available at this time.
      </p>
    );
  }

  return (
    <ul className={styles.studyList} aria-label="Research studies">
      {filteredStudies.map((study) => (
        <li key={study.id} className={styles.studyCard}>
          <h3 className={styles.studyTitle}>{study.title}</h3>
          <div className={styles.studyMeta}>
            <span className={styles.studyInstitution}>{study.institution}</span>
            <span className={`${styles.studyStatus} ${getStatusClass(study.status)}`}>
              {study.status}
            </span>
          </div>
          <p className={styles.studySummary}>{study.summary}</p>
        </li>
      ))}
    </ul>
  );
}
