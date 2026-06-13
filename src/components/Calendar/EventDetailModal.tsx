import { useCallback, useEffect, useRef } from 'react';
import type { CalendarEvent } from '../../types';
import styles from './EventDetailModal.module.css';

interface EventDetailModalProps {
  events: CalendarEvent[];
  date: Date;
  isOpen: boolean;
  onClose: () => void;
}

function formatEventType(type: CalendarEvent['type']): string {
  switch (type) {
    case 'clinical-trial-milestone':
      return 'Clinical Trial Milestone';
    case 'medicine-release':
      return 'Medicine Release';
    case 'fda-approval':
      return 'FDA Approval';
    default:
      return type;
  }
}

function getBadgeClass(type: CalendarEvent['type']): string {
  switch (type) {
    case 'clinical-trial-milestone':
      return styles.badgeTrial;
    case 'medicine-release':
      return styles.badgeMedicine;
    case 'fda-approval':
      return styles.badgeFda;
    default:
      return '';
  }
}

function EventDetailModal({ events, date, isOpen, onClose }: EventDetailModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const formattedDate = date.toLocaleDateString('default', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const titleId = 'event-modal-title';

  // Focus the close button when modal opens
  useEffect(() => {
    if (isOpen) {
      closeButtonRef.current?.focus();
    }
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Focus trap
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key !== 'Tab') return;

    const modal = modalRef.current;
    if (!modal) return;

    const focusableElements = modal.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      }
    } else {
      if (document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  }, []);

  // Prevent clicks on overlay from propagating to elements behind
  const handleOverlayClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div
        ref={modalRef}
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onKeyDown={handleKeyDown}
      >
        <div className={styles.header}>
          <h2 id={titleId} className={styles.title}>
            Events for {formattedDate}
          </h2>
          <button
            ref={closeButtonRef}
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close event details"
            type="button"
          >
            ✕
          </button>
        </div>

        <ul className={styles.eventList}>
          {events.map((event) => (
            <li key={event.id} className={styles.eventItem}>
              <h3 className={styles.eventName}>{event.name}</h3>
              <span className={`${styles.eventTypeBadge} ${getBadgeClass(event.type)}`}>
                {formatEventType(event.type)}
              </span>
              <p className={styles.eventDescription}>
                {event.description.slice(0, 500)}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default EventDetailModal;
