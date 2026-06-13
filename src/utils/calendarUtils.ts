import { CALENDAR_BOUNDS } from '../constants/calendarBounds';
import { CalendarEvent } from '../types';

/**
 * Checks whether a target month/year is within the allowed calendar navigation bounds.
 * Navigation is limited to CALENDAR_BOUNDS.pastMonths in the past and
 * CALENDAR_BOUNDS.futureMonths in the future relative to the current date.
 */
export function isWithinCalendarBounds(
  targetMonth: number,
  targetYear: number,
  currentDate: Date
): boolean {
  const target = new Date(targetYear, targetMonth, 1);
  const earliest = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() - CALENDAR_BOUNDS.pastMonths,
    1
  );
  const latest = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + CALENDAR_BOUNDS.futureMonths,
    1
  );
  return target >= earliest && target <= latest;
}

/**
 * Filters a list of calendar events to only those occurring in the specified month and year.
 */
export function getEventsForMonth(
  events: CalendarEvent[],
  month: number,
  year: number
): CalendarEvent[] {
  return events.filter((event) => {
    const d = new Date(event.date);
    return d.getMonth() === month && d.getFullYear() === year;
  });
}

/**
 * Returns the number of days in a given month/year.
 */
export function getDaysInMonth(month: number, year: number): number {
  return new Date(year, month + 1, 0).getDate();
}

/**
 * Returns the day of the week (0 = Sunday, 6 = Saturday) for the first day of the given month.
 */
export function getFirstDayOfMonth(month: number, year: number): number {
  return new Date(year, month, 1).getDay();
}

/**
 * Returns events for a specific day within a month/year.
 */
export function getEventsForDay(
  events: CalendarEvent[],
  day: number,
  month: number,
  year: number
): CalendarEvent[] {
  return events.filter((event) => {
    const d = new Date(event.date);
    return d.getDate() === day && d.getMonth() === month && d.getFullYear() === year;
  });
}
