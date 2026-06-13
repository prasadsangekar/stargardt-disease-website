/**
 * Flesch-Kincaid Grade Level utility functions.
 *
 * Implements syllable counting, sentence/word counting, and the
 * Flesch-Kincaid Grade Level formula for readability analysis.
 */

/**
 * Counts the number of syllables in a single word using standard English rules:
 * - Count vowel groups (consecutive vowels count as one syllable)
 * - Handle silent-e at end of word
 * - Handle special vowel pairs (hiatus) that count as separate syllables
 * - Ensure at least 1 syllable per word
 */
export function countSyllables(word: string): number {
  const cleaned = word.toLowerCase().replace(/[^a-z]/g, '');
  if (cleaned.length === 0) return 0;

  // Special short words
  if (cleaned.length <= 3) return 1;

  const vowels = 'aeiouy';

  let count = 0;
  let prevVowel = false;

  for (let i = 0; i < cleaned.length; i++) {
    const isVowel = vowels.includes(cleaned[i]);
    if (isVowel && !prevVowel) {
      count++;
    }
    prevVowel = isVowel;
  }

  // Silent-e at end of word (not "le" after a consonant which is its own syllable)
  if (cleaned.endsWith('e') && cleaned.length > 3) {
    const beforeE = cleaned[cleaned.length - 2];
    if (beforeE === 'l') {
      // "-le" at end: keep the syllable if preceded by a consonant (e.g., "table")
      // The vowel-group logic already counted it if the 'e' started a new group
    } else if (!vowels.includes(beforeE)) {
      // Silent-e after a consonant (e.g., "make", "time", "became")
      count--;
    }
  }

  // Handle "-es" ending (e.g., "becomes", "accumulates")
  if (cleaned.endsWith('es') && cleaned.length > 4) {
    const beforeEs = cleaned[cleaned.length - 3];
    // "-es" is silent after most consonants (e.g., "makes", "becomes")
    // but not after s, x, z, ch, sh (e.g., "boxes", "watches")
    if (
      beforeEs !== 's' &&
      beforeEs !== 'x' &&
      beforeEs !== 'z' &&
      !(beforeEs === 'h' && cleaned.length > 4 &&
        (cleaned[cleaned.length - 4] === 'c' || cleaned[cleaned.length - 4] === 's'))
    ) {
      count--;
    }
  }

  // Handle "-ed" ending that is usually silent
  if (cleaned.endsWith('ed') && !cleaned.endsWith('eed') && cleaned.length > 4) {
    const beforeEd = cleaned[cleaned.length - 3];
    // "-ed" is pronounced as a syllable only after 't' or 'd'
    if (beforeEd !== 't' && beforeEd !== 'd') {
      count--;
    }
  }

  // Handle vowel hiatus: certain vowel combinations are typically two syllables
  // e.g., "iu" in "epithelium", "ua" in "eventually"
  // But common English combinations like "io" in "-tion", "-sion" are one syllable
  const hiatusPatterns = /[aeiou][aeiou]/g;
  let match;
  while ((match = hiatusPatterns.exec(cleaned)) !== null) {
    const pair = match[0];
    const pos = match.index;
    // Common diphthongs/monophthongs that should NOT be split
    const diphthongs = [
      'ai', 'au', 'ea', 'ee', 'oa', 'oo', 'ou', 'oi', 'ie', 'ei',
      'ey', 'ay', 'oy', 'ue', 'io', 'eo',
    ];
    if (!diphthongs.includes(pair)) {
      // This pair is likely hiatus (two syllables), add one
      // But not at the very end if it's part of silent-e we already handled
      if (pos + 2 <= cleaned.length - 1 || !cleaned.endsWith('e')) {
        count++;
      }
    }
  }

  // Ensure minimum of 1 syllable
  return Math.max(1, count);
}

/**
 * Counts the number of sentences in a text block.
 * Detects sentence-ending punctuation: periods, exclamation marks, question marks.
 * Handles abbreviations and decimal numbers by requiring a space or end-of-string after punctuation.
 */
export function countSentences(text: string): number {
  if (!text || text.trim().length === 0) return 0;

  // Match sentence-ending punctuation followed by a space, newline, or end of string
  const matches = text.match(/[.!?]+(?:\s|$)/g);
  const count = matches ? matches.length : 0;

  // If there's text but no sentence-ending punctuation detected, count as 1 sentence
  return Math.max(1, count);
}

/**
 * Counts the number of words in a text block.
 * Words are sequences of characters separated by whitespace.
 */
export function countWords(text: string): number {
  if (!text || text.trim().length === 0) return 0;

  const words = text.trim().split(/\s+/).filter((w) => w.length > 0);
  return words.length;
}

/**
 * Computes the Flesch-Kincaid Grade Level for a given text.
 *
 * Formula: 0.39 * (totalWords / totalSentences) + 11.8 * (totalSyllables / totalWords) - 15.59
 *
 * Returns the grade level as a number. Lower values indicate easier readability.
 * Requires at least 1 word and 1 sentence to compute.
 */
export function fleschKincaidGradeLevel(text: string): number {
  const totalWords = countWords(text);
  const totalSentences = countSentences(text);

  if (totalWords === 0 || totalSentences === 0) {
    return 0;
  }

  // Count syllables for each word
  const words = text.trim().split(/\s+/).filter((w) => w.length > 0);
  let totalSyllables = 0;
  for (const word of words) {
    totalSyllables += countSyllables(word);
  }

  const gradeLevel =
    0.39 * (totalWords / totalSentences) +
    11.8 * (totalSyllables / totalWords) -
    15.59;

  return gradeLevel;
}
