import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import type { NavLink } from '../../types';
import styles from './NavigationBar.module.css';

const NAV_LINKS: NavLink[] = [
  { label: 'Disease Information', path: '/disease-info', ariaLabel: 'Disease Information' },
  { label: 'Upcoming Medicines', path: '/upcoming-medicines', ariaLabel: 'Upcoming Medicines' },
  { label: 'Research', path: '/research', ariaLabel: 'Research' },
  { label: 'Calendar', path: '/calendar', ariaLabel: 'Calendar' },
];

export function NavigationBar() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  const isActive = (path: string): boolean => {
    if (path === '/disease-info') {
      return location.pathname === '/' || location.pathname === '/disease-info';
    }
    return location.pathname === path;
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    hamburgerRef.current?.focus();
  };

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Focus trap within mobile menu
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!isMenuOpen || !menuRef.current) return;

      if (event.key === 'Escape') {
        closeMenu();
        return;
      }

      if (event.key === 'Tab') {
        const focusableElements = menuRef.current.querySelectorAll<HTMLElement>(
          'a[href], button, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey) {
          if (document.activeElement === firstElement) {
            event.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            event.preventDefault();
            firstElement.focus();
          }
        }
      }
    },
    [isMenuOpen]
  );

  useEffect(() => {
    if (isMenuOpen) {
      document.addEventListener('keydown', handleKeyDown);
      // Focus first link in menu when opened
      const firstLink = menuRef.current?.querySelector<HTMLElement>('a[href]');
      firstLink?.focus();
    } else {
      document.removeEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMenuOpen, handleKeyDown]);

  return (
    <nav className={styles.nav} aria-label="Main navigation">
      {/* Desktop navigation */}
      <ul className={styles.navList}>
        {NAV_LINKS.map((link) => (
          <li key={link.path}>
            <Link
              to={link.path}
              className={`${styles.navLink} ${isActive(link.path) ? styles.navLinkActive : ''}`}
              aria-label={link.ariaLabel}
              aria-current={isActive(link.path) ? 'page' : undefined}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Mobile hamburger button */}
      <button
        ref={hamburgerRef}
        className={`${styles.hamburgerButton} ${isMenuOpen ? styles.hamburgerOpen : ''}`}
        onClick={toggleMenu}
        aria-expanded={isMenuOpen}
        aria-controls="mobile-nav-menu"
        aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        type="button"
      >
        <span className={styles.hamburgerIcon} aria-hidden="true">
          <span></span>
          <span></span>
          <span></span>
        </span>
      </button>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div
          ref={menuRef}
          id="mobile-nav-menu"
          className={styles.mobileMenu}
          role="menu"
        >
          <ul className={styles.mobileNavList}>
            {NAV_LINKS.map((link) => (
              <li key={link.path} role="none">
                <Link
                  to={link.path}
                  className={`${styles.mobileNavLink} ${isActive(link.path) ? styles.mobileNavLinkActive : ''}`}
                  aria-label={link.ariaLabel}
                  aria-current={isActive(link.path) ? 'page' : undefined}
                  role="menuitem"
                  onClick={closeMenu}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <button
            className={styles.closeButton}
            onClick={closeMenu}
            aria-label="Close navigation menu"
            type="button"
            style={{
              position: 'absolute',
              top: 'var(--spacing-sm)',
              right: 'var(--spacing-sm)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 'var(--spacing-sm)',
              fontSize: 'var(--font-size-lg)',
              color: 'var(--color-text-primary)',
            }}
          >
            ✕
          </button>
        </div>
      )}
    </nav>
  );
}

export { NAV_LINKS };
