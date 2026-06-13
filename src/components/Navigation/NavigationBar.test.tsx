import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { NavigationBar, NAV_LINKS } from './NavigationBar';

function renderWithRouter(initialEntries: string[] = ['/disease-info']) {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <NavigationBar />
    </MemoryRouter>
  );
}

describe('NavigationBar', () => {
  it('renders all navigation links', () => {
    renderWithRouter();
    for (const link of NAV_LINKS) {
      expect(screen.getAllByText(link.label).length).toBeGreaterThanOrEqual(1);
    }
  });

  it('has a nav element with aria-label', () => {
    renderWithRouter();
    const nav = screen.getByRole('navigation', { name: 'Main navigation' });
    expect(nav).toBeInTheDocument();
  });

  it('marks the active link with aria-current="page"', () => {
    renderWithRouter(['/research']);
    const researchLinks = screen.getAllByRole('link', { name: /research/i });
    const activeLink = researchLinks.find(
      (link) => link.getAttribute('aria-current') === 'page'
    );
    expect(activeLink).toBeDefined();
  });

  it('does not mark inactive links with aria-current', () => {
    renderWithRouter(['/research']);
    const calendarLinks = screen.getAllByRole('link', { name: /calendar/i });
    for (const link of calendarLinks) {
      expect(link).not.toHaveAttribute('aria-current');
    }
  });

  it('marks disease-info as active when on root path', () => {
    renderWithRouter(['/']);
    const diseaseLinks = screen.getAllByRole('link', { name: /disease information/i });
    const activeLink = diseaseLinks.find(
      (link) => link.getAttribute('aria-current') === 'page'
    );
    expect(activeLink).toBeDefined();
  });

  it('renders hamburger button with correct aria attributes', () => {
    renderWithRouter();
    const button = screen.getByRole('button', { name: /open navigation menu/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('aria-expanded', 'false');
    expect(button).toHaveAttribute('aria-controls', 'mobile-nav-menu');
  });

  it('toggles mobile menu on hamburger click', () => {
    renderWithRouter();
    const button = screen.getByRole('button', { name: /open navigation menu/i });

    fireEvent.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('menu')).toBeInTheDocument();
  });

  it('closes mobile menu when a link is clicked', () => {
    renderWithRouter();
    const button = screen.getByRole('button', { name: /open navigation menu/i });
    fireEvent.click(button);

    const menuItems = screen.getAllByRole('menuitem');
    fireEvent.click(menuItems[0]);

    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('closes mobile menu on Escape key', () => {
    renderWithRouter();
    const button = screen.getByRole('button', { name: /open navigation menu/i });
    fireEvent.click(button);

    expect(screen.getByRole('menu')).toBeInTheDocument();

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('mobile menu links have aria-current for active route', () => {
    renderWithRouter(['/calendar']);
    const button = screen.getByRole('button', { name: /open navigation menu/i });
    fireEvent.click(button);

    const menuItems = screen.getAllByRole('menuitem');
    const calendarItem = menuItems.find((item) => item.textContent === 'Calendar');
    expect(calendarItem).toHaveAttribute('aria-current', 'page');
  });
});
