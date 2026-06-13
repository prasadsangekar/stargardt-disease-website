/**
 * WCAG 2.1 Contrast Ratio Utilities
 *
 * Implements the relative luminance and contrast ratio formulas
 * defined in WCAG 2.1 Success Criterion 1.4.3 (Contrast Minimum)
 * and 1.4.11 (Non-text Contrast).
 *
 * References:
 * - https://www.w3.org/TR/WCAG21/#dfn-relative-luminance
 * - https://www.w3.org/TR/WCAG21/#dfn-contrast-ratio
 */

/**
 * Converts a single sRGB channel value (0–255) to its linear RGB value.
 * Per WCAG 2.1: if sRGB <= 0.04045, linear = sRGB / 12.92
 * otherwise linear = ((sRGB + 0.055) / 1.055) ^ 2.4
 */
function sRGBToLinear(channel: number): number {
  const srgb = channel / 255;
  if (srgb <= 0.04045) {
    return srgb / 12.92;
  }
  return Math.pow((srgb + 0.055) / 1.055, 2.4);
}

/**
 * Computes relative luminance for an sRGB color per WCAG 2.1.
 * L = 0.2126 * R + 0.7152 * G + 0.0722 * B
 * where R, G, B are the linearized channel values.
 *
 * @param r - Red channel (0–255)
 * @param g - Green channel (0–255)
 * @param b - Blue channel (0–255)
 * @returns Relative luminance value between 0 and 1
 */
export function relativeLuminance(r: number, g: number, b: number): number {
  const rLinear = sRGBToLinear(r);
  const gLinear = sRGBToLinear(g);
  const bLinear = sRGBToLinear(b);
  return 0.2126 * rLinear + 0.7152 * gLinear + 0.0722 * bLinear;
}

/**
 * Computes the WCAG 2.1 contrast ratio between two colors.
 * Contrast ratio = (L1 + 0.05) / (L2 + 0.05)
 * where L1 is the relative luminance of the lighter color
 * and L2 is the relative luminance of the darker color.
 *
 * @param rgb1 - First color as [r, g, b] tuple (each 0–255)
 * @param rgb2 - Second color as [r, g, b] tuple (each 0–255)
 * @returns Contrast ratio (always >= 1)
 */
export function contrastRatio(
  rgb1: [number, number, number],
  rgb2: [number, number, number]
): number {
  const l1 = relativeLuminance(...rgb1);
  const l2 = relativeLuminance(...rgb2);

  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);

  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Checks whether a foreground/background color pair meets WCAG 2.1
 * Level AA contrast requirements.
 *
 * - Normal text (< 18pt regular or < 14pt bold): minimum 4.5:1
 * - Large text (≥ 18pt regular or ≥ 14pt bold): minimum 3:1
 *
 * @param foreground - Foreground (text) color as [r, g, b]
 * @param background - Background color as [r, g, b]
 * @param isLargeText - Whether the text qualifies as large text (default: false)
 * @returns true if the contrast ratio meets the AA threshold
 */
export function meetsContrastAA(
  foreground: [number, number, number],
  background: [number, number, number],
  isLargeText: boolean = false
): boolean {
  const ratio = contrastRatio(foreground, background);
  const threshold = isLargeText ? 3 : 4.5;
  return ratio >= threshold;
}

/**
 * Parses a hex color string into an RGB tuple.
 * Supports both 3-digit (#RGB) and 6-digit (#RRGGBB) formats,
 * with or without the leading '#'.
 *
 * @param hex - Hex color string (e.g., "#2563eb", "fff", "#abc")
 * @returns RGB tuple [r, g, b] with values 0–255
 * @throws Error if the hex string is invalid
 */
export function hexToRgb(hex: string): [number, number, number] {
  let cleaned = hex.replace(/^#/, '');

  if (cleaned.length === 3) {
    cleaned = cleaned
      .split('')
      .map((c) => c + c)
      .join('');
  }

  if (cleaned.length !== 6 || !/^[0-9a-fA-F]{6}$/.test(cleaned)) {
    throw new Error(`Invalid hex color: ${hex}`);
  }

  const r = parseInt(cleaned.slice(0, 2), 16);
  const g = parseInt(cleaned.slice(2, 4), 16);
  const b = parseInt(cleaned.slice(4, 6), 16);

  return [r, g, b];
}
