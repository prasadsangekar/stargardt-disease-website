// Navigation
export interface NavLink {
  label: string;
  path: string;
  ariaLabel: string;
}

// Disease Information
export interface DiseaseInfoSection {
  id: string;
  title: string;
  content: string;
  terms: GlossaryTerm[];
}

export interface GlossaryTerm {
  term: string;
  definition: string;
}

export interface PrecautionItem {
  id: string;
  category: 'uv-exposure' | 'dietary' | 'lifestyle';
  text: string;
}

// Research
export interface ResearchStudy {
  id: string;
  title: string;
  institution: string;
  status: 'recruiting' | 'active' | 'completed';
  summary: string; // max 300 chars
  lastUpdated: string; // ISO date
}

export interface ClinicalTrial {
  id: string;
  name: string; // max 150 chars
  phase: string;
  status: 'recruiting' | 'active' | 'completed' | 'enrolling';
  eligibilitySummary: string; // max 200 chars
  location: string;
  detailsUrl: string;
  ageRange: {
    min: number;
    max: number;
  };
}

export type AgeGroup = 'pediatric' | 'adult' | 'senior';

export interface AgeGroupDefinition {
  id: AgeGroup;
  label: string;
  minAge: number;
  maxAge: number;
}

// Upcoming Medicines
export interface UpcomingMedicine {
  id: string;
  name: string;
  company: string;
  status: string;
  description: string;
  targetApproval: string;
}

// Calendar
export interface CalendarEvent {
  id: string;
  name: string;
  type: 'clinical-trial-milestone' | 'medicine-release' | 'fda-approval';
  date: string; // ISO date
  description: string; // max 500 chars
}

export interface CalendarState {
  currentMonth: number; // 0-indexed
  currentYear: number;
  selectedEvent: CalendarEvent | null;
}
