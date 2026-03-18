import { useEffect, useRef } from "react";

const TalentSaverAnimation = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const runAnimation = () => {
      const originalCV = wrapper.querySelector("#ts-original");
      const arrow = wrapper.querySelector("#ts-arrow");
      const brandedCV = wrapper.querySelector("#ts-branded");
      const anonymize1 = wrapper.querySelector("#ts-anon-1");
      const anonymize2 = wrapper.querySelector("#ts-anon-2");
      const styleAdapt = wrapper.querySelector("#ts-style");
      const logo = wrapper.querySelector("#ts-logo");
      const checkmark = wrapper.querySelector("#ts-checkmark");

      // Reset
      [originalCV, arrow, brandedCV, anonymize1, anonymize2, styleAdapt, logo, checkmark].forEach(el => {
        el?.classList.remove("ts-show", "ts-pop", "ts-draw", "ts-strike");
      });

      // Timeline - CV Transformation Story
      const timeline = [
        { time: 300, action: () => originalCV?.classList.add("ts-show") },      // Original CV erscheint
        { time: 1000, action: () => arrow?.classList.add("ts-show") },          // Pfeil erscheint
        { time: 1400, action: () => brandedCV?.classList.add("ts-show") },      // Branded CV erscheint
        { time: 2000, action: () => anonymize1?.classList.add("ts-strike") },   // Name wird anonymisiert
        { time: 2400, action: () => anonymize2?.classList.add("ts-strike") },   // Kontakt wird anonymisiert
        { time: 3000, action: () => styleAdapt?.classList.add("ts-pop") },      // Sprachstil Badge
        { time: 3400, action: () => logo?.classList.add("ts-pop") },            // Corporate Logo
        { time: 4000, action: () => checkmark?.classList.add("ts-draw") },      // Fertig Checkmark
      ];

      timeline.forEach(({ time, action }) => setTimeout(action, time));
    };

    runAnimation();

    const interval = setInterval(() => {
      runAnimation();
    }, 9000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div ref={wrapperRef}>
      <style>{`
        .ts-wrapper {
          all: initial;
          display: block;
          width: 100%;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }

        .ts-wrapper .ts-container {
          background: white;
          border-radius: 12px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          width: 100%;
          height: 100%;
          overflow: hidden;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .ts-wrapper svg {
          width: 100%;
          height: 100%;
          display: block;
        }

        .ts-wrapper .ts-animation {
          width: 100%;
          height: 100%;
        }

        /* Fade in */
        .ts-wrapper .fade-in { opacity: 0; }
        .ts-wrapper .fade-in.ts-show {
          animation: ts-fadeIn 0.6s ease-out forwards;
        }

        /* Pop animation */
        .ts-wrapper .pop { opacity: 0; transform-origin: center; }
        .ts-wrapper .pop.ts-pop {
          animation: ts-pop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        /* Strike through animation (anonymize) */
        .ts-wrapper .strike-line {
          stroke-dasharray: 100;
          stroke-dashoffset: 100;
        }
        .ts-wrapper .anonymize.ts-strike .strike-line {
          animation: ts-strike 0.4s ease-out forwards;
        }
        .ts-wrapper .anonymize.ts-strike .original-text {
          animation: ts-fadeOut 0.3s ease-out 0.2s forwards;
        }
        .ts-wrapper .anonymize.ts-strike .anon-text {
          animation: ts-fadeIn 0.3s ease-out 0.3s forwards;
        }
        .ts-wrapper .anon-text { opacity: 0; }

        /* Checkmark draw */
        .ts-wrapper .checkmark-path {
          stroke-dasharray: 60;
          stroke-dashoffset: 60;
          opacity: 0;
        }
        .ts-wrapper .checkmark.ts-draw .checkmark-path {
          animation: ts-drawCheck 0.8s ease-out forwards;
        }
        .ts-wrapper .checkmark.ts-draw .checkmark-circle {
          animation: ts-pop 0.4s ease-out forwards;
        }
        .ts-wrapper .checkmark-circle { opacity: 0; }

        @keyframes ts-fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes ts-fadeOut {
          from { opacity: 1; }
          to { opacity: 0.3; }
        }

        @keyframes ts-pop {
          0% { opacity: 0; transform: scale(0); }
          70% { transform: scale(1.15); }
          100% { opacity: 1; transform: scale(1); }
        }

        @keyframes ts-strike {
          to { stroke-dashoffset: 0; }
        }

        @keyframes ts-drawCheck {
          to { stroke-dashoffset: 0; opacity: 1; }
        }

        .ts-wrapper {
          height: 100%;
        }
      `}</style>

      <div className="ts-wrapper">
        <div className="ts-container">
          <div className="ts-animation">
            <svg viewBox="0 0 800 480" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="tsDocGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" style={{ stopColor: "#FFFFFF" }} />
                  <stop offset="100%" style={{ stopColor: "#F9FAFB" }} />
                </linearGradient>
                <linearGradient id="tsBrandGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: "#3B82F6" }} />
                  <stop offset="100%" style={{ stopColor: "#8B5CF6" }} />
                </linearGradient>
                <filter id="tsShadow">
                  <feGaussianBlur in="SourceAlpha" stdDeviation="4" />
                  <feOffset dx="0" dy="4" result="offsetblur" />
                  <feComponentTransfer>
                    <feFuncA type="linear" slope="0.2" />
                  </feComponentTransfer>
                  <feMerge>
                    <feMergeNode />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* === LEFT SIDE: Original CV === */}
              <g id="ts-original" className="fade-in">
                {/* Document */}
                <rect x="40" y="40" width="240" height="340" rx="8" fill="url(#tsDocGradient)" stroke="#E5E7EB" strokeWidth="2" filter="url(#tsShadow)" />

                {/* Header - Plain */}
                <rect x="40" y="40" width="240" height="50" rx="8" fill="#F3F4F6" />
                <rect x="40" y="82" width="240" height="8" fill="#F3F4F6" />
                <text x="160" y="72" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="14" fontWeight="600" fill="#6B7280">Lebenslauf</text>

                {/* Name Section */}
                <text x="60" y="120" fontFamily="Arial, sans-serif" fontSize="11" fontWeight="600" fill="#374151">Max Mustermann</text>
                <text x="60" y="138" fontFamily="Arial, sans-serif" fontSize="10" fill="#6B7280">max.mustermann@email.de</text>
                <text x="60" y="154" fontFamily="Arial, sans-serif" fontSize="10" fill="#6B7280">+49 123 456789</text>

                {/* Divider */}
                <rect x="60" y="170" width="200" height="1" fill="#E5E7EB" />

                {/* Experience */}
                <text x="60" y="195" fontFamily="Arial, sans-serif" fontSize="10" fontWeight="600" fill="#374151">BERUFSERFAHRUNG</text>
                <rect x="60" y="205" width="180" height="8" rx="2" fill="#E5E7EB" />
                <rect x="60" y="218" width="160" height="8" rx="2" fill="#E5E7EB" />
                <rect x="60" y="231" width="140" height="8" rx="2" fill="#E5E7EB" />

                {/* Skills */}
                <text x="60" y="265" fontFamily="Arial, sans-serif" fontSize="10" fontWeight="600" fill="#374151">FÄHIGKEITEN</text>
                <rect x="60" y="275" width="60" height="18" rx="9" fill="#F3F4F6" />
                <rect x="128" y="275" width="50" height="18" rx="9" fill="#F3F4F6" />
                <rect x="186" y="275" width="55" height="18" rx="9" fill="#F3F4F6" />

                {/* Education */}
                <text x="60" y="320" fontFamily="Arial, sans-serif" fontSize="10" fontWeight="600" fill="#374151">AUSBILDUNG</text>
                <rect x="60" y="330" width="170" height="8" rx="2" fill="#E5E7EB" />
                <rect x="60" y="343" width="150" height="8" rx="2" fill="#E5E7EB" />

                {/* Label */}
                <text x="160" y="400" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fill="#9CA3AF">Original CV</text>
              </g>

              {/* === ARROW === */}
              <g id="ts-arrow" className="fade-in">
                <path d="M 310 210 L 370 210" stroke="#8B5CF6" strokeWidth="3" strokeLinecap="round" markerEnd="url(#arrowhead)" />
                <defs>
                  <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill="#8B5CF6" />
                  </marker>
                </defs>
                <text x="340" y="235" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="9" fill="#8B5CF6">TalentSaver</text>
              </g>

              {/* === RIGHT SIDE: Branded CV === */}
              <g id="ts-branded" className="fade-in">
                {/* Document */}
                <rect x="400" y="40" width="280" height="340" rx="8" fill="url(#tsDocGradient)" stroke="#3B82F6" strokeWidth="2" filter="url(#tsShadow)" />

                {/* Header - Corporate Branded */}
                <rect x="400" y="40" width="280" height="55" rx="8" fill="url(#tsBrandGradient)" />
                <rect x="400" y="87" width="280" height="8" fill="url(#tsBrandGradient)" />

                {/* Company Logo Placeholder */}
                <g id="ts-logo" className="pop">
                  <rect x="420" y="52" width="80" height="30" rx="4" fill="white" fillOpacity="0.9" />
                  <text x="460" y="72" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="10" fontWeight="700" fill="#3B82F6">AGENTUR</text>
                </g>

                <text x="620" y="75" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="14" fontWeight="600" fill="white">Kandidatenprofil</text>

                {/* Anonymized Name Section */}
                <g id="ts-anon-1" className="anonymize">
                  <text className="original-text" x="420" y="125" fontFamily="Arial, sans-serif" fontSize="12" fontWeight="600" fill="#374151">Max Mustermann</text>
                  <text className="anon-text" x="420" y="125" fontFamily="Arial, sans-serif" fontSize="12" fontWeight="600" fill="#8B5CF6">Kandidat #2847</text>
                  <line className="strike-line" x1="420" y1="122" x2="530" y2="122" stroke="#EF4444" strokeWidth="2" />
                </g>

                <g id="ts-anon-2" className="anonymize">
                  <text className="original-text" x="420" y="145" fontFamily="Arial, sans-serif" fontSize="10" fill="#6B7280">max.mustermann@email.de</text>
                  <text className="anon-text" x="420" y="145" fontFamily="Arial, sans-serif" fontSize="10" fill="#8B5CF6">[Kontakt über Agentur]</text>
                  <line className="strike-line" x1="420" y1="142" x2="560" y2="142" stroke="#EF4444" strokeWidth="2" />
                </g>

                {/* Divider */}
                <rect x="420" y="165" width="240" height="1" fill="#E5E7EB" />

                {/* Experience - Styled */}
                <text x="420" y="190" fontFamily="Arial, sans-serif" fontSize="10" fontWeight="600" fill="#3B82F6">BERUFSERFAHRUNG</text>
                <rect x="420" y="200" width="200" height="8" rx="2" fill="#DBEAFE" />
                <rect x="420" y="213" width="180" height="8" rx="2" fill="#DBEAFE" />
                <rect x="420" y="226" width="160" height="8" rx="2" fill="#DBEAFE" />

                {/* Skills - Corporate styled */}
                <text x="420" y="260" fontFamily="Arial, sans-serif" fontSize="10" fontWeight="600" fill="#3B82F6">FÄHIGKEITEN</text>
                <rect x="420" y="270" width="65" height="20" rx="10" fill="#3B82F6" />
                <text x="452" y="284" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="9" fill="white">React</text>
                <rect x="493" y="270" width="55" height="20" rx="10" fill="#8B5CF6" />
                <text x="520" y="284" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="9" fill="white">Node</text>
                <rect x="556" y="270" width="60" height="20" rx="10" fill="#3B82F6" />
                <text x="586" y="284" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="9" fill="white">Python</text>

                {/* Education */}
                <text x="420" y="315" fontFamily="Arial, sans-serif" fontSize="10" fontWeight="600" fill="#3B82F6">AUSBILDUNG</text>
                <rect x="420" y="325" width="190" height="8" rx="2" fill="#DBEAFE" />
                <rect x="420" y="338" width="170" height="8" rx="2" fill="#DBEAFE" />

                {/* Style Adaptation Badge */}
                <g id="ts-style" className="pop">
                  <rect x="550" y="100" width="120" height="28" rx="14" fill="#10B981" />
                  <text x="610" y="118" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="10" fontWeight="500" fill="white">✨ Ihr Stil</text>
                </g>

                {/* Label */}
                <text x="540" y="400" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fill="#3B82F6" fontWeight="500">Corporate CV</text>
              </g>

              {/* === SUCCESS CHECKMARK === */}
              <g id="ts-checkmark" className="checkmark">
                <circle className="checkmark-circle" cx="720" cy="70" r="30" fill="#10B981" />
                <path className="checkmark-path" d="M 702 70 L 715 83 L 738 55" stroke="white" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </g>

              {/* Footer text */}
              <text x="400" y="460" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fill="#9CA3AF">Lebenslauf → Corporate Design • Anonymisiert • Personalisierter Stil</text>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TalentSaverAnimation;
