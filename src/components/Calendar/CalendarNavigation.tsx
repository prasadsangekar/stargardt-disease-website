import { useMemo } from 'react';
import { isWithinCalendarBounds } from '../../utils/calendarUtils';
import styles from './CalendarNavigation.module.css';

interface CalendarNavigationProps {
  month: number;
  year: number;
  onPreviousMonth: () => void;
  onNextMonth: () => void;
}

function CalendarNavigation({ month, year, onPreviousMonth, onNextMonth }: CalendarNavigationProps) {
  const now = useMemo(() => new Date(), []);

  const prevMonth = month === 0 ? 11 : month - 1;
  const prevYear = month === 0 ? year - 1 : year;
  const nextMonth = month === 11 ? 0 : month + 1;
  const nextYear = month === 11 ? year + 1 : year;

  const canGoPrev = isWithinCalendarBounds(prevMonth, prevYear, now);
  const canGoNext = isWithinCalendarBounds(nextMonth, nextYear, now);

  const monthLabel = new Date(year, month).toLocaleString('default', {
    month: 'long',
    year: 'numeric',
  });

  return (
    <nav className={styles.navigation} aria-label="Calendar navigation">
      <button
        className={styles.navButton}
        onClick={onPreviousMonth}
        disabled={!canGoPrev}
        aria-label="Previous month"
        type="button"
      >
        &#8592;
      </button>
      <h2 className={styles.monthLabel} aria-live="polite" aria-atomic="true">
        {monthLabel}
      </h2>
      <button
        className={styles.navButton}
        onClick={onNextMonth}
        disabled={!canGoNext}
        aria-label="Next month"
        type="button"
      >
        &#8594;
      </button>
    </nav>
  );
}

export default CalendarNavigation;
