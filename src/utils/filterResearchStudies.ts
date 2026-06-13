import { ResearchStudy } from '../types';

/**
 * Filters research studies to only those updated within the last 12 months
 * from the reference date, and returns them sorted descending by lastUpdated
 * (most recent first).
 */
export function filterResearchStudies(
  studies: ResearchStudy[],
  referenceDate: Date = new Date()
): ResearchStudy[] {
  const twelveMonthsAgo = new Date(referenceDate);
  twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);

  return studies
    .filter((study) => {
      const studyDate = new Date(study.lastUpdated);
      return studyDate >= twelveMonthsAgo && studyDate <= referenceDate;
    })
    .sort((a, b) => {
      const dateA = new Date(a.lastUpdated).getTime();
      const dateB = new Date(b.lastUpdated).getTime();
      return dateB - dateA;
    });
}
