# Implementation Plan: Stargardt Disease Website

## Overview

Build a React + TypeScript single-page application using Vite that serves as an informational and resource-tracking website for Stargardt disease. The implementation follows a static JSON data layer with three primary routes (Disease Info, Research/Trials, Calendar), CSS Modules for styling, and a custom accessible calendar component. All interactive elements comply with WCAG 2.1 Level AA.

## Tasks

- [x] 1. Set up project structure and core configuration
  - [x] 1.1 Initialize Vite + React + TypeScript project
    - Run `npm create vite@latest` with React TypeScript template
    - Install dependencies: react-router-dom, vitest, @testing-library/react, @testing-library/jest-dom, jsdom, fast-check, axe-core, @axe-core/react
    - Configure `vitest.config.ts` with jsdom environment and setup file
    - Create `src/test/setup.ts` with testing-library matchers
    - Set up CSS custom properties in `src/styles/variables.css` for theming and contrast compliance
    - _Requirements: 7.1, 8.1, 8.2_

  - [x] 1.2 Define TypeScript interfaces and data models
    - Create `src/types/index.ts` with all interfaces: NavLink, DiseaseInfoSection, GlossaryTerm, PrecautionItem, ResearchStudy, ClinicalTrial, AgeGroup, AgeGroupDefinition, CalendarEvent, CalendarState
    - Create `src/constants/ageGroups.ts` with AGE_GROUPS definitions
    - Create `src/constants/calendarBounds.ts` with CALENDAR_BOUNDS config
    - _Requirements: 5.2, 6.3, 6.4_

  - [x] 1.3 Create static JSON data files
    - Create `src/data/disease-info.json` with overview (definition, symptoms, progression), medicalScience, precautions (at least 5 items covering uv-exposure, dietary, lifestyle), and glossary (ABCA4, lipofuscin, retinal pigment epithelium, photoreceptor)
    - Create `src/data/research-studies.json` with sample research studies
    - Create `src/data/clinical-trials.json` with sample trials spanning multiple age groups
    - Create `src/data/events.json` with sample events of all three types
    - _Requirements: 1.1, 1.2, 2.1, 2.2, 2.3, 2.4, 3.1, 3.2, 4.1, 4.2, 5.1, 5.4, 6.1, 6.4_

- [x] 2. Implement navigation and layout
  - [x] 2.1 Create Layout and NavigationBar components
    - Create `src/components/Layout/Layout.tsx` with header, main content area, and footer
    - Create `src/components/Navigation/NavigationBar.tsx` with responsive behavior
    - Render all nav links on viewports ≥ 768px; collapse to hamburger menu on < 768px
    - Apply `aria-current="page"` to the active link based on current route
    - Implement focus trap within expanded mobile menu
    - Use CSS Modules for scoped styling
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5, 8.4, 8.5_

  - [x] 2.2 Configure React Router with routes
    - Create `src/App.tsx` with React Router setup
    - Define routes: `/` and `/disease-info` → DiseaseInfoPage, `/research` → ResearchPage, `/calendar` → CalendarPage
    - Add a 404 catch-all route redirecting to home
    - Implement focus management on route change (move focus to main content heading)
    - _Requirements: 1.1, 4.3, 7.1_

  - [ ]* 2.3 Write property test for active navigation link
    - **Property 8: Active Navigation Link Determination**
    - For any valid route path, verify exactly one link has `aria-current="page"` and it matches the current path
    - **Validates: Requirements 7.2**

  - [ ]* 2.4 Write unit tests for NavigationBar
    - Test all links render on desktop viewport
    - Test hamburger menu toggle on mobile viewport
    - Test active link highlighting per route
    - Test keyboard navigation and focus trap in mobile menu
    - Run axe-core accessibility audit on rendered navigation
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 8.1_

- [x] 3. Implement Disease Information page
  - [x] 3.1 Create DiseaseInfoPage with subsection components
    - Create `src/pages/DiseaseInfoPage/DiseaseInfoPage.tsx` loading disease-info.json
    - Create `src/components/DiseaseInfo/DiseaseOverview.tsx` rendering definition, symptoms, progression subsections
    - Create `src/components/DiseaseInfo/MedicalScience.tsx` rendering genetic basis, biological mechanism, inheritance patterns
    - Create `src/components/DiseaseInfo/Precautions.tsx` rendering precaution items as a bulleted list
    - Implement inline glossary term definitions (tooltip or inline parenthetical) at first use
    - Use semantic HTML: hierarchical headings, landmark regions, lists
    - Add visible heading/navigation element for locating precautions subsection
    - Implement error boundary with "Content is temporarily unavailable" message on load failure
    - _Requirements: 1.1, 1.2, 1.4, 2.1, 2.2, 2.3, 2.4, 3.1, 3.2, 3.3, 3.4, 3.5, 8.3, 8.4_

  - [ ]* 3.2 Write property test for precaution category validation
    - **Property 3: Precaution Category Validation**
    - For any set of precaution items, validation returns true iff set has ≥1 uv-exposure, ≥1 dietary, ≥1 lifestyle, and total ≥5
    - **Validates: Requirements 3.1, 3.2**

  - [ ]* 3.3 Write property test for precaution sentence length
    - **Property 4: Precaution Sentence Length Constraint**
    - For any precaution item text, verify it contains ≤2 sentence-ending punctuation marks
    - **Validates: Requirements 3.3**

  - [ ]* 3.4 Write property test for glossary term coverage
    - **Property 2: Glossary Term Coverage**
    - For any content containing glossary terms, verify definition appears at or before first use
    - **Validates: Requirements 1.4, 2.4**

  - [ ]* 3.5 Write unit tests for DiseaseInfoPage
    - Test three subsections render with correct headings
    - Test glossary terms display definitions
    - Test precaution list renders as bulleted list with correct items
    - Test error state displays when data load fails
    - Run axe-core accessibility audit
    - _Requirements: 1.1, 1.2, 1.4, 3.1, 3.3, 3.5, 8.1_

- [x] 4. Checkpoint - Verify core pages render correctly
  - Ensure all tests pass, ask the user if questions arise.

- [x] 5. Implement Research and Clinical Trials page
  - [x] 5.1 Create ResearchPage with study list and trial components
    - Create `src/pages/ResearchPage/ResearchPage.tsx` loading research-studies.json and clinical-trials.json
    - Create `src/components/Research/ResearchStudyList.tsx` displaying studies sorted by lastUpdated descending, filtered to last 12 months
    - Create `src/components/Research/ClinicalTrialList.tsx` displaying trials grouped by age group
    - Create `src/components/Research/ClinicalTrialCard.tsx` showing name, phase, eligibility, location, details link
    - Create `src/components/Research/AgeGroupFilter.tsx` with filter buttons (All, Pediatric, Adult, Senior) using `aria-pressed`
    - Display empty state messages for no studies and no trials per age group
    - On initial load, show all trials without pre-selected filter
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7, 8.4, 8.6_

  - [x] 5.2 Implement filtering logic utilities
    - Create `src/utils/filterTrialsByAgeGroup.ts` implementing overlap logic: `trial.min <= group.maxAge AND trial.max >= group.minAge`
    - Create `src/utils/filterResearchStudies.ts` implementing 12-month recency filter and descending sort
    - _Requirements: 4.1, 5.3, 5.7_

  - [ ]* 5.3 Write property test for age group filtering
    - **Property 6: Age Group Filtering Correctness**
    - For any trial age range [min, max] and age group [groupMin, groupMax], trial appears iff ranges overlap
    - **Validates: Requirements 5.1, 5.3, 5.7**

  - [ ]* 5.4 Write property test for research study filtering and sort
    - **Property 5: Research Study Filtering and Sort Order**
    - For any list of studies with various dates and a reference date, verify only last-12-month studies included and sorted descending by lastUpdated
    - **Validates: Requirements 4.1**

  - [ ]* 5.5 Write unit tests for Research page
    - Test study cards display all required fields
    - Test clinical trial cards display all required fields
    - Test filter buttons render and apply filtering
    - Test empty state messages for no studies and no trials per group
    - Test initial load shows all trials
    - Run axe-core accessibility audit
    - _Requirements: 4.1, 4.2, 4.4, 5.1, 5.4, 5.5, 5.6, 8.1_

- [x] 6. Implement Calendar page
  - [x] 6.1 Create CalendarPage with custom calendar component
    - Create `src/pages/CalendarPage/CalendarPage.tsx` loading events.json
    - Create `src/components/Calendar/CalendarGrid.tsx` rendering monthly grid with day cells
    - Create `src/components/Calendar/CalendarDay.tsx` rendering individual days with event indicators
    - Create `src/components/Calendar/CalendarNavigation.tsx` with previous/next month controls
    - Create `src/components/Calendar/EventIndicator.tsx` rendering color-coded dots/icons per event type
    - Create `src/components/Calendar/EventLegend.tsx` with visible legend for event type colors
    - Highlight current date on initial load
    - Display "No events are scheduled for this month" when month has no events
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.6, 6.7, 8.4_

  - [x] 6.2 Implement calendar navigation and bounds logic
    - Create `src/utils/calendarUtils.ts` with `isWithinCalendarBounds` and `getEventsForMonth` functions
    - Enforce navigation bounds: 3 months past, 12 months future
    - Disable previous/next buttons when at bounds
    - _Requirements: 6.3_

  - [x] 6.3 Create EventDetailModal component
    - Create `src/components/Calendar/EventDetailModal.tsx` as accessible modal (role="dialog")
    - Display event name, type, date, and description (up to 500 chars)
    - Implement focus trap within modal
    - Close on Escape key or close button
    - Return focus to triggering element on close
    - Implement keyboard navigation between days with arrow keys
    - Use `aria-live` region to announce selected date and events
    - _Requirements: 6.5, 8.4, 8.5, 8.6_

  - [ ]* 6.4 Write property test for calendar navigation bounds
    - **Property 7: Calendar Navigation Bounds**
    - For any target month/year and reference current date, verify `isWithinCalendarBounds` returns true iff within 3 months past and 12 months future
    - **Validates: Requirements 6.3**

  - [ ]* 6.5 Write unit tests for Calendar page
    - Test monthly grid renders correct number of days
    - Test current date is highlighted
    - Test event indicators appear on correct days
    - Test navigation controls move between months
    - Test bounds prevent navigating beyond limits
    - Test event detail modal opens and closes correctly
    - Test empty month message displays
    - Run axe-core accessibility audit
    - _Requirements: 6.1, 6.2, 6.3, 6.5, 6.6, 6.7, 8.1_

- [x] 7. Checkpoint - Verify all pages and interactions work
  - Ensure all tests pass, ask the user if questions arise.

- [x] 8. Implement accessibility and contrast utilities
  - [x] 8.1 Create WCAG contrast ratio utility
    - Create `src/utils/contrastRatio.ts` implementing relative luminance calculation and contrast ratio formula: `(L1 + 0.05) / (L2 + 0.05)`
    - Ensure all CSS custom properties for text/background meet 4.5:1 for normal text and 3:1 for large text
    - Add visible focus indicators with ≥3:1 contrast ratio
    - _Requirements: 8.2, 8.5_

  - [ ]* 8.2 Write property test for WCAG contrast ratio calculation
    - **Property 9: WCAG Contrast Ratio Calculation**
    - For any pair of RGB colors, verify computed contrast ratio equals `(L1 + 0.05) / (L2 + 0.05)` using WCAG 2.1 luminance formula
    - **Validates: Requirements 8.2**

  - [ ]* 8.3 Write property test for Flesch-Kincaid grade level
    - **Property 1: Flesch-Kincaid Grade Level Computation**
    - For any text with ≥1 sentence and ≥1 word, verify FK formula: `0.39 * (words/sentences) + 11.8 * (syllables/words) - 15.59`
    - **Validates: Requirements 1.3**

  - [x] 8.4 Implement Flesch-Kincaid utility and validate content
    - Create `src/utils/fleschKincaid.ts` with syllable counting and FK grade level calculation
    - Validate disease info content produces grade level ≤ 8.0
    - _Requirements: 1.3_

- [x] 9. Final integration and wiring
  - [x] 9.1 Wire all pages into router and verify end-to-end flow
    - Ensure all routes are connected and navigable
    - Verify error boundaries are in place for each page
    - Ensure `role="alert"` or `aria-live="assertive"` on all error messages
    - Verify no horizontal scrolling at viewports 320px–1920px
    - Verify semantic HTML structure: hierarchical headings, landmarks, proper ARIA attributes
    - _Requirements: 7.5, 8.3, 8.4, 8.6_

  - [ ]* 9.2 Write integration tests for accessibility and keyboard navigation
    - Run axe-core audit across all pages
    - Test keyboard tab order matches visual reading order
    - Test no keyboard traps exist
    - Test state changes are announced to assistive technologies
    - _Requirements: 8.1, 8.4, 8.5, 8.6_

- [x] 10. Final checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties from the design document
- Unit tests validate specific examples and edge cases
- All components use CSS Modules with CSS custom properties for theming and contrast compliance
- The application uses static JSON data files bundled with the build — no backend required
- All interactive elements must be keyboard accessible with visible focus indicators

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1"] },
    { "id": 1, "tasks": ["1.2", "1.3"] },
    { "id": 2, "tasks": ["2.1", "2.2"] },
    { "id": 3, "tasks": ["2.3", "2.4", "3.1", "5.2"] },
    { "id": 4, "tasks": ["3.2", "3.3", "3.4", "3.5", "5.1"] },
    { "id": 5, "tasks": ["5.3", "5.4", "5.5", "6.1", "6.2"] },
    { "id": 6, "tasks": ["6.3", "6.4", "6.5", "8.1"] },
    { "id": 7, "tasks": ["8.2", "8.3", "8.4"] },
    { "id": 8, "tasks": ["9.1"] },
    { "id": 9, "tasks": ["9.2"] }
  ]
}
```
