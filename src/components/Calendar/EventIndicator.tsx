import type { CalendarEvent } from '../../types';
import styles from './EventIndicator.module.css';

interface EventIndicatorProps {
  type: CalendarEvent['type'];
}

const typeClassMap: Record<CalendarEvent['type'], string> = {
  'clinical-trial-milestone': styles.clinicalTrialMilestone,
  'medicine-release': styles.medicineRelease,
  'fda-approval': styles.fdaApproval,
};

const typeLabelMap: Record<CalendarEvent['type'], string> = {
  'clinical-trial-milestone': 'Clinical trial milestone',
  'medicine-release': 'Medicine release',
  'fda-approval': 'FDA approval',
};

function EventIndicator({ type }: EventIndicatorProps) {
  return (
    <span
      className={`${styles.indicator} ${typeClassMap[type]}`}
      aria-label={typeLabelMap[type]}
      role="img"
    />
  );
}

export default EventIndicator;
