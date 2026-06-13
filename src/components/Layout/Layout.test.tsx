import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { Layout } from './Layout';

function renderLayout(initialEntries: string[] = ['/disease-info']) {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/disease-info" element={<div>Disease Info Content</div>} />
          <Route path="/research" element={<div>Research Content</div>} />
          <Route path="/calendar" element={<div>Calendar Content</div>} />
        </Route>
      </Routes>
    </MemoryRouter>
  );
}

describe('Layout', () => {
  it('renders header with navigation', () => {
    renderLayout();
    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();

    const nav = screen.getByRole('navigation', { name: 'Main navigation' });
    expect(nav).toBeInTheDocument();
  });

  it('renders main content area', () => {
    renderLayout();
    const main = screen.getByRole('main');
    expect(main).toBeInTheDocument();
  });

  it('renders footer', () => {
    renderLayout();
    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
  });

  it('renders the correct page content via Outlet', () => {
    renderLayout(['/disease-info']);
    expect(screen.getByText('Disease Info Content')).toBeInTheDocument();
  });

  it('renders different page content based on route', () => {
    renderLayout(['/research']);
    expect(screen.getByText('Research Content')).toBeInTheDocument();
  });

  it('renders the site logo/link to home', () => {
    renderLayout();
    const logo = screen.getByRole('link', { name: /stargardt disease info.*home/i });
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('href', '/');
  });

  it('uses semantic HTML landmarks', () => {
    renderLayout();
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('footer contains informational text', () => {
    renderLayout();
    const footer = screen.getByRole('contentinfo');
    expect(footer.textContent).toContain('Stargardt Disease Information');
    expect(footer.textContent).toContain('informational purposes only');
  });
});
