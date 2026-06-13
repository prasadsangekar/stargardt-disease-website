import { ClinicalTrial, AgeGroupDefinition } from '../types';

/**
 * Filters clinical trials by age group using overlap logic.
 * A trial appears under an age group if the trial's age range overlaps
 * with the group's age range.
 */
export function filterTrialsByAgeGroup(
  trials: ClinicalTrial[],
  ageGroup: AgeGroupDefinition
): ClinicalTrial[] {
  return trials.filter(
    (trial) =>
      trial.ageRange.min <= ageGroup.maxAge &&
      trial.ageRange.max >= ageGroup.minAge
  );
}
