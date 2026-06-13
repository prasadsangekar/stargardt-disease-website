import type { CalendarEvent } from '../../types';
import EventIndicator from './EventIndicator';
import styles from './CalendarDay.module.css';

interface CalendarDayProps {
  day: number | null;
  isToday: boolean;
  events: CalendarEvent[];
  onDaySelect: (day: number) => void;
  tabIndex: number;
}

function CalendarDay({ day, isToday, events, onDaySelect, tabIndex }: CalendarDayProps) {
  if (day === null) {
    return <div className={`${styles.day} ${styles.empty}`} aria-hidden="true" />;
  }

  const handleClick = () => {
    onDaySelect(day);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onDaySelect(day);
    }
  };

  const dayLabel = events.length > 0
    ? `${day}, ${events.length} event${events.length > 1 ? 's' : ''}`
    : `${day}`;

  return (
    <div
      className={`${styles.day} ${isToday ? styles.today : ''}`}
      role="gridcell"
      aria-label={dayLabel}
      tabIndex={tabIndex}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      <span className={styles.dayNumber}>{day}</span>
      {events.length > 0 && (
        <div className={styles.indicators}>
          {events.map((event) => (
            <EventIndicator key={event.id} type={event.type} />
          ))}
        </div>
      )}
    </div>
  );
}

export default CalendarDay;
