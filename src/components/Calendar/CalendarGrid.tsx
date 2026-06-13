import { useCallback, useRef } from 'react';
import type { CalendarEvent } from '../../types';
import { getDaysInMonth, getFirstDayOfMonth, getEventsForDay } from '../../utils/calendarUtils';
import CalendarDay from './CalendarDay';
import styles from './CalendarGrid.module.css';

interface CalendarGridProps {
  month: number;
  year: number;
  events: CalendarEvent[];
  selectedDay: number | null;
  onDaySelect: (day: number) => void;
}

const WEEKDAY_HEADERS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function CalendarGrid({ month, year, events, selectedDay, onDaySelect }: CalendarGridProps) {
  const gridRef = useRef<HTMLDivElement>(null);

  const daysInMonth = getDaysInMonth(month, year);
  const firstDay = getFirstDayOfMonth(month, year);

  const today = new Date();
  const isCurrentMonth = today.getMonth() === month && today.getFullYear() === year;
  const todayDate = today.getDate();

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (!selectedDay) return;

    let newDay = selectedDay;

    switch (e.key) {
      case 'ArrowRight':
        newDay = Math.min(selectedDay + 1, daysInMonth);
        break;
      case 'ArrowLeft':
        newDay = Math.max(selectedDay - 1, 1);
        break;
      case 'ArrowDown':
        newDay = Math.min(selectedDay + 7, daysInMonth);
        break;
      case 'ArrowUp':
        newDay = Math.max(selectedDay - 7, 1);
        break;
      default:
        return;
    }

    e.preventDefault();
    onDaySelect(newDay);

    // Move focus to the new day cell
    const grid = gridRef.current;
    if (grid) {
      const cells = grid.querySelectorAll('[role="gridcell"]');
      const targetIndex = newDay - 1;
      if (cells[targetIndex]) {
        (cells[targetIndex] as HTMLElement).focus();
      }
    }
  }, [selectedDay, daysInMonth, onDaySelect]);

  // Build the day cells array
  const dayCells: (number | null)[] = [];
  // Leading empty cells for days before the first of the month
  for (let i = 0; i < firstDay; i++) {
    dayCells.push(null);
  }
  // Actual days
  for (let day = 1; day <= daysInMonth; day++) {
    dayCells.push(day);
  }

  const monthEvents = events;
  const hasEventsThisMonth = monthEvents.length > 0;

  return (
    <div
      ref={gridRef}
      className={styles.grid}
      role="grid"
      aria-label={`Calendar for ${new Date(year, month).toLocaleString('default', { month: 'long', year: 'numeric' })}`}
      onKeyDown={handleKeyDown}
    >
      {WEEKDAY_HEADERS.map((header) => (
        <div key={header} className={styles.header} role="columnheader" aria-label={header}>
          {header}
        </div>
      ))}
      {dayCells.map((day, index) => (
        <CalendarDay
          key={index}
          day={day}
          isToday={isCurrentMonth && day === todayDate}
          events={day !== null ? getEventsForDay(monthEvents, day, month, year) : []}
          onDaySelect={onDaySelect}
          tabIndex={day === selectedDay ? 0 : -1}
        />
      ))}
      {!hasEventsThisMonth && (
        <p className={styles.noEvents} role="status">
          No events are scheduled for this month
        </p>
      )}
    </div>
  );
}

export default CalendarGrid;
