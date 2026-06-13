import { describe, it, expect } from 'vitest';

describe('Test setup', () => {
  it('vitest runs correctly', () => {
    expect(1 + 1).toBe(2);
  });

  it('jsdom environment is available', () => {
    expect(document).toBeDefined();
    expect(document.createElement).toBeDefined();
  });

  it('jest-dom matchers are available', () => {
    const element = document.createElement('div');
    element.textContent = 'Hello';
    document.body.appendChild(element);
    expect(element).toBeInTheDocument();
    document.body.removeChild(element);
  });
});
