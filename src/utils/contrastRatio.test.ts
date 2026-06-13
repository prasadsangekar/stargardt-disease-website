import { describe, it, expect } from 'vitest';
import {
  relativeLuminance,
  contrastRatio,
  meetsContrastAA,
  hexToRgb,
} from './contrastRatio';

describe('contrastRatio utilities', () => {
  describe('hexToRgb', () => {
    it('parses 6-digit hex with hash', () => {
      expect(hexToRgb('#ffffff')).toEqual([255, 255, 255]);
      expect(hexToRgb('#000000')).toEqual([0, 0, 0]);
      expect(hexToRgb('#2563eb')).toEqual([37, 99, 235]);
    });

    it('parses 6-digit hex without hash', () => {
      expect(hexToRgb('ff0000')).toEqual([255, 0, 0]);
    });

    it('parses 3-digit hex', () => {
      expect(hexToRgb('#fff')).toEqual([255, 255, 255]);
      expect(hexToRgb('#abc')).toEqual([170, 187, 204]);
    });

    it('throws on invalid hex', () => {
      expect(() => hexToRgb('#gg0000')).toThrow('Invalid hex color');
      expect(() => hexToRgb('#12345')).toThrow('Invalid hex color');
      expect(() => hexToRgb('')).toThrow('Invalid hex color');
    });
  });

  describe('relativeLuminance', () => {
    it('returns 0 for black', () => {
      expect(relativeLuminance(0, 0, 0)).toBe(0);
    });

    it('returns 1 for white', () => {
      expect(relativeLuminance(255, 255, 255)).toBeCloseTo(1, 4);
    });

    it('returns correct luminance for pure red', () => {
      // Pure red linearized = 1.0, luminance = 0.2126 * 1 = 0.2126
      expect(relativeLuminance(255, 0, 0)).toBeCloseTo(0.2126, 4);
    });

    it('returns correct luminance for pure green', () => {
      // Pure green linearized = 1.0, luminance = 0.7152 * 1 = 0.7152
      expect(relativeLuminance(0, 255, 0)).toBeCloseTo(0.7152, 4);
    });

    it('returns correct luminance for pure blue', () => {
      // Pure blue linearized = 1.0, luminance = 0.0722 * 1 = 0.0722
      expect(relativeLuminance(0, 0, 255)).toBeCloseTo(0.0722, 4);
    });
  });

  describe('contrastRatio', () => {
    it('returns 21:1 for black on white', () => {
      const ratio = contrastRatio([0, 0, 0], [255, 255, 255]);
      expect(ratio).toBeCloseTo(21, 0);
    });

    it('returns 1:1 for same color', () => {
      const ratio = contrastRatio([128, 128, 128], [128, 128, 128]);
      expect(ratio).toBeCloseTo(1, 4);
    });

    it('is commutative (order does not matter)', () => {
      const ratio1 = contrastRatio([37, 99, 235], [255, 255, 255]);
      const ratio2 = contrastRatio([255, 255, 255], [37, 99, 235]);
      expect(ratio1).toBeCloseTo(ratio2, 10);
    });

    it('always returns a value >= 1', () => {
      const ratio = contrastRatio([100, 100, 100], [200, 200, 200]);
      expect(ratio).toBeGreaterThanOrEqual(1);
    });
  });

  describe('meetsContrastAA', () => {
    it('black on white passes for normal text (21:1 >= 4.5:1)', () => {
      expect(meetsContrastAA([0, 0, 0], [255, 255, 255])).toBe(true);
    });

    it('white on white fails for normal text', () => {
      expect(meetsContrastAA([255, 255, 255], [255, 255, 255])).toBe(false);
    });

    it('uses 3:1 threshold for large text', () => {
      // A color pair that has ratio ~3.5 would pass large text but fail normal
      // Gray #767676 on white has ~4.54:1 — passes both
      // Gray #949494 on white has ~3.0:1 — borderline for large text
      const darkGray: [number, number, number] = [118, 118, 118]; // #767676
      const white: [number, number, number] = [255, 255, 255];
      expect(meetsContrastAA(darkGray, white, false)).toBe(true);
      expect(meetsContrastAA(darkGray, white, true)).toBe(true);
    });

    it('defaults isLargeText to false', () => {
      // Gray rgb(135, 135, 135) on white has ~3.5:1 — passes 3:1 but fails 4.5:1
      const gray: [number, number, number] = [135, 135, 135];
      const white: [number, number, number] = [255, 255, 255];
      const ratio = contrastRatio(gray, white);
      // Verify this is between 3 and 4.5
      expect(ratio).toBeGreaterThanOrEqual(3);
      expect(ratio).toBeLessThan(4.5);
      // Without isLargeText flag, should fail (4.5:1 threshold)
      expect(meetsContrastAA(gray, white)).toBe(false);
      // With isLargeText = true, should pass (3:1 threshold)
      expect(meetsContrastAA(gray, white, true)).toBe(true);
    });
  });

  describe('CSS custom properties contrast verification', () => {
    it('focus indicator (#2563eb) meets >= 3:1 against white', () => {
      const focusColor = hexToRgb('#2563eb');
      const white = hexToRgb('#ffffff');
      const ratio = contrastRatio(focusColor, white);
      expect(ratio).toBeGreaterThanOrEqual(3);
    });

    it('primary text (#1c2833) meets 4.5:1 against white background', () => {
      const textPrimary = hexToRgb('#1c2833');
      const bgWhite = hexToRgb('#ffffff');
      expect(meetsContrastAA(textPrimary, bgWhite)).toBe(true);
    });

    it('secondary text (#4a5568) meets 4.5:1 against white background', () => {
      const textSecondary = hexToRgb('#4a5568');
      const bgWhite = hexToRgb('#ffffff');
      expect(meetsContrastAA(textSecondary, bgWhite)).toBe(true);
    });

    it('link text (#1a5276) meets 4.5:1 against white background', () => {
      const textLink = hexToRgb('#1a5276');
      const bgWhite = hexToRgb('#ffffff');
      expect(meetsContrastAA(textLink, bgWhite)).toBe(true);
    });

    it('inverse text (#ffffff) meets 4.5:1 against primary color (#1a5276)', () => {
      const textInverse = hexToRgb('#ffffff');
      const bgPrimary = hexToRgb('#1a5276');
      expect(meetsContrastAA(textInverse, bgPrimary)).toBe(true);
    });

    it('success color (#1e7e34) meets 4.5:1 against white background', () => {
      const successColor = hexToRgb('#1e7e34');
      const bgWhite = hexToRgb('#ffffff');
      expect(meetsContrastAA(successColor, bgWhite)).toBe(true);
    });

    it('warning color (#856404) meets 4.5:1 against white background', () => {
      const warningColor = hexToRgb('#856404');
      const bgWhite = hexToRgb('#ffffff');
      expect(meetsContrastAA(warningColor, bgWhite)).toBe(true);
    });

    it('error color (#9b1c1c) meets 4.5:1 against white background', () => {
      const errorColor = hexToRgb('#9b1c1c');
      const bgWhite = hexToRgb('#ffffff');
      expect(meetsContrastAA(errorColor, bgWhite)).toBe(true);
    });

    it('event type colors meet 3:1 for large text against white', () => {
      const white = hexToRgb('#ffffff');
      const eventTrial = hexToRgb('#2c5282');
      const eventMedicine = hexToRgb('#276749');
      const eventFda = hexToRgb('#9b2c2c');

      expect(meetsContrastAA(eventTrial, white, true)).toBe(true);
      expect(meetsContrastAA(eventMedicine, white, true)).toBe(true);
      expect(meetsContrastAA(eventFda, white, true)).toBe(true);
    });
  });
});
