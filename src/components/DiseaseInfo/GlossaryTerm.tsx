import { useState, useRef } from 'react';
import type { GlossaryTerm as GlossaryTermType } from '../../types';
import styles from './GlossaryTerm.module.css';

interface GlossaryTermProps {
  term: GlossaryTermType;
  children: string;
}

export function GlossaryTerm({ term, children }: GlossaryTermProps) {
  const [isVisible, setIsVisible] = useState(false);
  const termRef = useRef<HTMLSpanElement>(null);

  return (
    <span
      ref={termRef}
      className={styles.glossaryTerm}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
      tabIndex={0}
      role="term"
      aria-describedby={`glossary-def-${term.term.toLowerCase().replace(/\s+/g, '-')}`}
    >
      {children}
      {isVisible && (
        <span
          id={`glossary-def-${term.term.toLowerCase().replace(/\s+/g, '-')}`}
          className={styles.tooltip}
          role="tooltip"
        >
          <strong>{term.term}:</strong> {term.definition}
        </span>
      )}
    </span>
  );
}
