import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { CalendarGrid, CalendarNavigation, EventDetailModal, EventLegend } from '../../components/Calendar';
import { getEventsForMonth } from '../../utils/calendarUtils';
import { PageErrorBoundary } from '../../components/PageErrorBoundary';
import type { CalendarEvent } from '../../types';
import eventsData from '../../data/events.json';
import styles from './CalendarPage.module.css';

function CalendarContent() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const liveRegionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const today = useMemo(() => new Date(), []);
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDay, setSelectedDay] = useState<number | null>(today.getDate());
  const [isModalOpen, setIsModalOpen] = useState(false);

  const events: CalendarEvent[] = eventsData as CalendarEvent[];
  const monthEvents = useMemo(
    () => getEventsForMonth(events, currentMonth, currentYear),
    [events, currentMonth, currentYear]
  );

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  const handlePreviousMonth = useCallback(() => {
    setCurrentMonth((prev) => {
      if (prev === 0) {
        setCurrentYear((y) => y - 1);
        return 11;
      }
      return prev - 1;
    });
    setSelectedDay(null);
  }, []);

  const handleNextMonth = useCallback(() => {
    setCurrentMonth((prev) => {
      if (prev === 11) {
        setCurrentYear((y) => y + 1);
        return 0;
      }
      return prev + 1;
    });
    setSelectedDay(null);
  }, []);

  const handleDaySelect = useCallback((day: number) => {
    setSelectedDay((prev) => {
      // If user selects an already-selected day that has events, open the modal
      if (prev === day) {
        const dayEvents = monthEvents.filter((event) => {
          const d = new Date(event.date);
          return d.getDate() === day;
        });
        if (dayEvents.length > 0) {
          triggerRef.current = document.activeElement as HTMLElement;
          setIsModalOpen(true);
        }
      } else {
        // First selection of a day with events also opens the modal
        const dayEvents = monthEvents.filter((event) => {
          const d = new Date(event.date);
          return d.getDate() === day;
        });
        if (dayEvents.length > 0) {
          triggerRef.current = document.activeElement as HTMLElement;
          setIsModalOpen(true);
        }
      }
      return day;
    });
  }, [monthEvents]);

  const handleModalClose = useCallback(() => {
    setIsModalOpen(false);
    // Return focus to the triggering element
    requestAnimationFrame(() => {
      triggerRef.current?.focus();
    });
  }, []);

  // Get events for the selected day (used by modal)
  const selectedDayEvents = useMemo(() => {
    if (selectedDay === null) return [];
    return monthEvents.filter((event) => {
      const d = new Date(event.date);
      return d.getDate() === selectedDay;
    });
  }, [selectedDay, monthEvents]);

  const selectedDate = useMemo(() => {
    if (selectedDay === null) return new Date(currentYear, currentMonth, 1);
    return new Date(currentYear, currentMonth, selectedDay);
  }, [selectedDay, currentMonth, currentYear]);

  // Announce selected day to screen readers
  useEffect(() => {
    if (selectedDay !== null && liveRegionRef.current) {
      const dateStr = new Date(currentYear, currentMonth, selectedDay).toLocaleDateString('default', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      });
      const dayEvents = monthEvents.filter((event) => {
        const d = new Date(event.date);
        return d.getDate() === selectedDay;
      });
      const eventsText = dayEvents.length > 0
        ? `. ${dayEvents.length} event${dayEvents.length > 1 ? 's' : ''}: ${dayEvents.map((e) => e.name).join(', ')}`
        : '';
      liveRegionRef.current.textContent = `${dateStr}${eventsText}`;
    }
  }, [selectedDay, currentMonth, currentYear, monthEvents]);

  return (
    <section aria-labelledby="calendar-heading" className={styles.page}>
      <h1 id="calendar-heading" ref={headingRef} tabIndex={-1} className={styles.heading}>
        Events Calendar
      </h1>
      <div className={styles.calendarContainer}>
        <CalendarNavigation
          month={currentMonth}
          year={currentYear}
          onPreviousMonth={handlePreviousMonth}
          onNextMonth={handleNextMonth}
        />
        <CalendarGrid
          month={currentMonth}
          year={currentYear}
          events={monthEvents}
          selectedDay={selectedDay}
          onDaySelect={handleDaySelect}
        />
        <EventLegend />
      </div>
      <div
        ref={liveRegionRef}
        className={styles.liveRegion}
        aria-live="polite"
        aria-atomic="true"
        role="status"
      />
      <EventDetailModal
        events={selectedDayEvents}
        date={selectedDate}
        isOpen={isModalOpen}
        onClose={handleModalClose}
      />
    </section>
  );
}

function CalendarPage() {
  return (
    <PageErrorBoundary fallbackMessage="Calendar content is temporarily unavailable. Please try again later.">
      <CalendarContent />
    </PageErrorBoundary>
  );
}

export default CalendarPage;
