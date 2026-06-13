import { AgeGroupDefinition } from '../types';

export const AGE_GROUPS: AgeGroupDefinition[] = [
  { id: 'pediatric', label: 'Pediatric (0–17)', minAge: 0, maxAge: 17 },
  { id: 'adult', label: 'Adult (18–64)', minAge: 18, maxAge: 64 },
  { id: 'senior', label: 'Senior (65+)', minAge: 65, maxAge: 150 },
];
