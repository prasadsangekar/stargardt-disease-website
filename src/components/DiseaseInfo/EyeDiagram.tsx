import styles from './EyeDiagram.module.css';

export function EyeDiagram() {
  return (
    <section aria-labelledby="eye-diagram-heading" className={styles.diagramSection}>
      <h2 id="eye-diagram-heading" className={styles.diagramHeading}>
        How Stargardt Disease Affects the Eye
      </h2>
      <div className={styles.diagramContainer}>
        <div className={styles.svgWrapper}>
          <svg
            viewBox="0 0 400 280"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-labelledby="eye-diagram-title eye-diagram-desc"
          >
            <title id="eye-diagram-title">Cross-section diagram of the human eye</title>
            <desc id="eye-diagram-desc">
              A simplified cross-section showing the major structures of the eye relevant to
              Stargardt disease: the cornea at the front, the lens behind it, the vitreous
              humor filling the interior, the retina lining the back, the macula at the center
              of the retina, and the retinal pigment epithelium (RPE) layer behind the retina
              where toxic lipofuscin accumulates.
            </desc>

            {/* Eye outline */}
            <ellipse cx="200" cy="140" rx="170" ry="120" fill="#f0f4f8" stroke="#1a5276" strokeWidth="2" />

            {/* Sclera / outer wall */}
            <path d="M 50 140 Q 50 40 200 30 Q 350 40 350 140 Q 350 240 200 250 Q 50 240 50 140"
              fill="none" stroke="#1a5276" strokeWidth="2.5" />

            {/* Cornea */}
            <path d="M 35 140 Q 35 80 80 60 Q 35 80 35 140 Q 35 200 80 220"
              fill="none" stroke="#2980b9" strokeWidth="2" />
            <path d="M 30 140 Q 50 60 90 50 Q 50 60 30 140 Q 50 220 90 230 Q 50 220 30 140"
              fill="#d6eaf8" stroke="#2980b9" strokeWidth="2" opacity="0.8" />

            {/* Lens */}
            <ellipse cx="120" cy="140" rx="25" ry="40" fill="#eaf2f8" stroke="#1a5276" strokeWidth="1.5" />

            {/* Iris */}
            <path d="M 80 105 Q 95 115 95 140 Q 95 165 80 175"
              fill="none" stroke="#276749" strokeWidth="3" />
            <path d="M 80 105 L 85 100" fill="none" stroke="#276749" strokeWidth="2" />
            <path d="M 80 175 L 85 180" fill="none" stroke="#276749" strokeWidth="2" />

            {/* Pupil */}
            <circle cx="85" cy="140" r="10" fill="#1c2833" />

            {/* Vitreous humor area */}
            <ellipse cx="220" cy="140" rx="100" ry="85" fill="#eaf2f8" opacity="0.3" />

            {/* Retina layer */}
            <path d="M 150 55 Q 330 30 345 140 Q 330 250 150 225"
              fill="none" stroke="#e67e22" strokeWidth="3" strokeDasharray="none" />

            {/* RPE layer (affected in Stargardt) */}
            <path d="M 155 50 Q 340 25 355 140 Q 340 255 155 230"
              fill="none" stroke="#9b2c2c" strokeWidth="3" strokeDasharray="5,3" />

            {/* Macula region (affected area) */}
            <circle cx="330" cy="140" r="20" fill="#fef9e7" stroke="#9b2c2c" strokeWidth="2" />
            <circle cx="330" cy="140" r="8" fill="#f9e79f" stroke="#856404" strokeWidth="1.5" />

            {/* Lipofuscin deposits (yellow dots in RPE near macula) */}
            <circle cx="318" cy="128" r="3" fill="#f1c40f" opacity="0.8" />
            <circle cx="325" cy="120" r="2.5" fill="#f1c40f" opacity="0.7" />
            <circle cx="335" cy="118" r="2" fill="#f1c40f" opacity="0.8" />
            <circle cx="342" cy="125" r="3" fill="#f1c40f" opacity="0.7" />
            <circle cx="345" cy="135" r="2.5" fill="#f1c40f" opacity="0.8" />
            <circle cx="343" cy="148" r="2" fill="#f1c40f" opacity="0.7" />
            <circle cx="338" cy="158" r="3" fill="#f1c40f" opacity="0.8" />
            <circle cx="328" cy="162" r="2.5" fill="#f1c40f" opacity="0.7" />
            <circle cx="318" cy="155" r="2" fill="#f1c40f" opacity="0.8" />

            {/* Optic nerve */}
            <path d="M 355 140 Q 370 140 385 135 L 395 130"
              fill="none" stroke="#1a5276" strokeWidth="4" />
            <path d="M 355 140 Q 370 140 385 145 L 395 150"
              fill="none" stroke="#1a5276" strokeWidth="4" />

            {/* Labels with numbered circles */}
            <circle cx="55" cy="50" r="10" fill="#1a5276" />
            <text x="55" y="54" textAnchor="middle" fontSize="11" fill="white" fontWeight="bold">1</text>
            <line x1="55" y1="60" x2="60" y2="90" stroke="#1a5276" strokeWidth="1" strokeDasharray="3,2" />

            <circle cx="120" cy="30" r="10" fill="#1a5276" />
            <text x="120" y="34" textAnchor="middle" fontSize="11" fill="white" fontWeight="bold">2</text>
            <line x1="120" y1="40" x2="120" y2="95" stroke="#1a5276" strokeWidth="1" strokeDasharray="3,2" />

            <circle cx="240" cy="35" r="10" fill="#1a5276" />
            <text x="240" y="39" textAnchor="middle" fontSize="11" fill="white" fontWeight="bold">3</text>
            <line x1="240" y1="45" x2="260" y2="75" stroke="#1a5276" strokeWidth="1" strokeDasharray="3,2" />

            <circle cx="330" cy="45" r="10" fill="#1a5276" />
            <text x="330" y="49" textAnchor="middle" fontSize="11" fill="white" fontWeight="bold">4</text>
            <line x1="330" y1="55" x2="330" y2="112" stroke="#1a5276" strokeWidth="1" strokeDasharray="3,2" />

            <circle cx="370" cy="75" r="10" fill="#9b2c2c" />
            <text x="370" y="79" textAnchor="middle" fontSize="11" fill="white" fontWeight="bold">5</text>
            <line x1="365" y1="85" x2="355" y2="115" stroke="#9b2c2c" strokeWidth="1" strokeDasharray="3,2" />

            <circle cx="330" cy="235" r="10" fill="#856404" />
            <text x="330" y="239" textAnchor="middle" fontSize="11" fill="white" fontWeight="bold">6</text>
            <line x1="330" y1="225" x2="330" y2="165" stroke="#856404" strokeWidth="1" strokeDasharray="3,2" />
          </svg>
        </div>
        <div className={styles.diagramCaption}>
          <p>
            In Stargardt disease, toxic waste (lipofuscin) builds up in the RPE layer behind
            the macula, eventually destroying the cells needed for central vision.
          </p>
          <ul className={styles.labelList}>
            <li className={styles.labelItem}>
              <span className={styles.labelNumber}>1</span>
              <span><strong>Cornea</strong> — Clear front surface that focuses light</span>
            </li>
            <li className={styles.labelItem}>
              <span className={styles.labelNumber}>2</span>
              <span><strong>Lens</strong> — Focuses light onto the retina</span>
            </li>
            <li className={styles.labelItem}>
              <span className={styles.labelNumber}>3</span>
              <span><strong>Retina</strong> — Light-sensitive layer containing photoreceptors</span>
            </li>
            <li className={styles.labelItem}>
              <span className={styles.labelNumber}>4</span>
              <span><strong>Macula</strong> — Central area responsible for sharp vision (affected in Stargardt)</span>
            </li>
            <li className={styles.labelItem}>
              <span className={styles.labelNumber} style={{ backgroundColor: '#9b2c2c' }}>5</span>
              <span><strong>RPE Layer</strong> — Where lipofuscin accumulates and causes damage</span>
            </li>
            <li className={styles.labelItem}>
              <span className={styles.labelNumber} style={{ backgroundColor: '#856404' }}>6</span>
              <span><strong>Lipofuscin deposits</strong> — Toxic waste buildup that poisons cells</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
