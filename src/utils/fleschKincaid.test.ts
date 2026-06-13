import { describe, it, expect } from 'vitest';
import {
  countSyllables,
  countSentences,
  countWords,
  fleschKincaidGradeLevel,
} from './fleschKincaid';
import diseaseInfo from '../data/disease-info.json';

describe('countSyllables', () => {
  it('counts single-syllable words', () => {
    expect(countSyllables('cat')).toBe(1);
    expect(countSyllables('the')).toBe(1);
    expect(countSyllables('run')).toBe(1);
  });

  it('counts multi-syllable words', () => {
    expect(countSyllables('water')).toBe(2);
    expect(countSyllables('beautiful')).toBe(3);
    expect(countSyllables('information')).toBe(4);
  });

  it('handles silent-e', () => {
    expect(countSyllables('make')).toBe(1);
    expect(countSyllables('time')).toBe(1);
  });

  it('returns 0 for empty string', () => {
    expect(countSyllables('')).toBe(0);
  });

  it('returns at least 1 for any non-empty word', () => {
    expect(countSyllables('a')).toBe(1);
    expect(countSyllables('I')).toBe(1);
  });
});

describe('countSentences', () => {
  it('counts sentences ending with periods', () => {
    expect(countSentences('Hello world. Goodbye world.')).toBe(2);
  });

  it('counts sentences ending with question marks', () => {
    expect(countSentences('Is this a test? Yes it is.')).toBe(2);
  });

  it('counts sentences ending with exclamation marks', () => {
    expect(countSentences('Wow! That is great.')).toBe(2);
  });

  it('returns 1 for text without sentence-ending punctuation', () => {
    expect(countSentences('Hello world')).toBe(1);
  });

  it('returns 0 for empty text', () => {
    expect(countSentences('')).toBe(0);
    expect(countSentences('   ')).toBe(0);
  });
});

describe('countWords', () => {
  it('counts words in a simple sentence', () => {
    expect(countWords('The cat sat on the mat')).toBe(6);
  });

  it('handles multiple spaces', () => {
    expect(countWords('hello    world')).toBe(2);
  });

  it('returns 0 for empty text', () => {
    expect(countWords('')).toBe(0);
    expect(countWords('   ')).toBe(0);
  });
});

describe('fleschKincaidGradeLevel', () => {
  it('computes FK grade level using the standard formula', () => {
    // Simple sentence: "The cat sat on the mat."
    // 6 words, 1 sentence, 6 syllables
    // FK = 0.39 * (6/1) + 11.8 * (6/6) - 15.59 = 2.34 + 11.8 - 15.59 = -1.45
    const text = 'The cat sat on the mat.';
    const grade = fleschKincaidGradeLevel(text);
    const totalWords = 6;
    const totalSentences = 1;
    const totalSyllables = 6;
    const expected =
      0.39 * (totalWords / totalSentences) +
      11.8 * (totalSyllables / totalWords) -
      15.59;
    expect(grade).toBeCloseTo(expected, 1);
  });

  it('returns 0 for empty text', () => {
    expect(fleschKincaidGradeLevel('')).toBe(0);
  });

  it('produces higher grade levels for complex text', () => {
    const simpleText = 'The dog ran fast. It was fun.';
    const complexText =
      'The implementation of sophisticated technological infrastructure necessitates comprehensive evaluation of multifaceted environmental considerations.';
    expect(fleschKincaidGradeLevel(complexText)).toBeGreaterThan(
      fleschKincaidGradeLevel(simpleText)
    );
  });
});

describe('disease-info.json readability validation', () => {
  const MAX_GRADE_LEVEL = 8.0;

  it('overview.definition is at or below 8th grade level', () => {
    const grade = fleschKincaidGradeLevel(diseaseInfo.overview.definition);
    expect(grade).toBeLessThanOrEqual(MAX_GRADE_LEVEL);
  });

  it('overview.symptoms is at or below 8th grade level', () => {
    const grade = fleschKincaidGradeLevel(diseaseInfo.overview.symptoms);
    expect(grade).toBeLessThanOrEqual(MAX_GRADE_LEVEL);
  });

  it('overview.progression is at or below 8th grade level', () => {
    const grade = fleschKincaidGradeLevel(diseaseInfo.overview.progression);
    expect(grade).toBeLessThanOrEqual(MAX_GRADE_LEVEL);
  });

  it('medicalScience.geneticBasis is at or below 8th grade level', () => {
    const grade = fleschKincaidGradeLevel(
      diseaseInfo.medicalScience.geneticBasis
    );
    expect(grade).toBeLessThanOrEqual(MAX_GRADE_LEVEL);
  });

  it('medicalScience.biologicalMechanism is at or below 8th grade level', () => {
    const grade = fleschKincaidGradeLevel(
      diseaseInfo.medicalScience.biologicalMechanism
    );
    expect(grade).toBeLessThanOrEqual(MAX_GRADE_LEVEL);
  });

  it('medicalScience.inheritancePatterns is at or below 8th grade level', () => {
    const grade = fleschKincaidGradeLevel(
      diseaseInfo.medicalScience.inheritancePatterns
    );
    expect(grade).toBeLessThanOrEqual(MAX_GRADE_LEVEL);
  });

  it('each precaution text is at or below 8th grade level', () => {
    for (const precaution of diseaseInfo.precautions) {
      const grade = fleschKincaidGradeLevel(precaution.text);
      expect(
        grade,
        `Precaution "${precaution.id}" (${precaution.category}) has grade level ${grade.toFixed(1)}`
      ).toBeLessThanOrEqual(MAX_GRADE_LEVEL);
    }
  });
});
