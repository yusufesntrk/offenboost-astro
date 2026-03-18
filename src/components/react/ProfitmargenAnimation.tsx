import { useEffect, useRef } from "react";

const ProfitmargenAnimation = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const runAnimation = () => {
      const wrapper = wrapperRef.current;
      if (!wrapper) return;

      // Reset all elements
      const strike1 = wrapper.querySelector("#strike-1") as SVGLineElement;
      const strike2 = wrapper.querySelector("#strike-2") as SVGLineElement;
      const emp1Icon = wrapper.querySelector("#emp-1-icon") as SVGTextElement;
      const emp2Icon = wrapper.querySelector("#emp-2-icon") as SVGTextElement;
      const ai1 = wrapper.querySelector("#ai-1") as SVGTextElement;
      const ai2 = wrapper.querySelector("#ai-2") as SVGTextElement;
      const profitBadge = wrapper.querySelector("#profit-badge") as SVGGElement;
      const strategicBox = wrapper.querySelector("#strategic-box") as SVGGElement;
      const ceoInitial = wrapper.querySelector("#ceo-initial") as SVGGElement;
      const ceoMovingCopy = wrapper.querySelector("#ceo-moving-copy") as SVGGElement;
      const ceoTransformed = wrapper.querySelector("#ceo-transformed") as SVGGElement;
      const beach1 = wrapper.querySelector("#beach-1") as SVGGElement;
      const beach2 = wrapper.querySelector("#beach-2") as SVGGElement;
      const beach3 = wrapper.querySelector("#beach-3") as SVGGElement;

      // Reset all states
      if (strike1) {
        strike1.classList.remove("aa-draw");
        strike1.style.opacity = "0";
      }
      if (strike2) {
        strike2.classList.remove("aa-draw");
        strike2.style.opacity = "0";
      }
      if (emp1Icon) emp1Icon.classList.remove("employee-icon-fade");
      if (emp2Icon) emp2Icon.classList.remove("employee-icon-fade");
      if (ai1) ai1.classList.remove("aa-replace");
      if (ai2) ai2.classList.remove("aa-replace");
      if (profitBadge) profitBadge.classList.remove("aa-show");
      if (strategicBox) strategicBox.classList.remove("aa-show");
      if (ceoInitial) ceoInitial.style.opacity = "";
      if (ceoMovingCopy) {
        ceoMovingCopy.style.opacity = "0";
        ceoMovingCopy.classList.remove("aa-animate");
      }
      if (ceoTransformed) ceoTransformed.classList.remove("aa-show");
      if (beach1) beach1.classList.remove("aa-show");
      if (beach2) beach2.classList.remove("aa-show");
      if (beach3) beach3.classList.remove("aa-show");

      const timeouts: NodeJS.Timeout[] = [];

      // Timeline
      // Strike lines and fade icons
      timeouts.push(
        setTimeout(() => {
          if (strike1) strike1.classList.add("aa-draw");
          if (strike2) strike2.classList.add("aa-draw");
          setTimeout(() => {
            if (emp1Icon) emp1Icon.classList.add("employee-icon-fade");
            if (emp2Icon) emp2Icon.classList.add("employee-icon-fade");
          }, 500);
        }, 2000)
      );

      // AI replace
      timeouts.push(
        setTimeout(() => {
          if (strike1) strike1.style.opacity = "0";
          if (strike2) strike2.style.opacity = "0";
          if (ai1) ai1.classList.add("aa-replace");
          if (ai2) ai2.classList.add("aa-replace");
        }, 3000)
      );

      // Profit badge
      timeouts.push(
        setTimeout(() => {
          if (profitBadge) profitBadge.classList.add("aa-show");
        }, 3800)
      );

      // Strategic box
      timeouts.push(
        setTimeout(() => {
          if (strategicBox) strategicBox.classList.add("aa-show");
        }, 4800)
      );

      // CEO move up
      timeouts.push(
        setTimeout(() => {
          if (ceoInitial) ceoInitial.style.opacity = "0";
          if (ceoMovingCopy) {
            ceoMovingCopy.style.opacity = "1";
            ceoMovingCopy.classList.add("aa-animate");
          }
        }, 5600)
      );

      // CEO transform
      timeouts.push(
        setTimeout(() => {
          if (ceoMovingCopy) ceoMovingCopy.style.opacity = "0";
          if (ceoTransformed) ceoTransformed.classList.add("aa-show");
        }, 7600)
      );

      // Beach icons
      timeouts.push(
        setTimeout(() => {
          if (beach1) beach1.classList.add("aa-show");
          setTimeout(() => {
            if (beach2) beach2.classList.add("aa-show");
          }, 200);
          setTimeout(() => {
            if (beach3) beach3.classList.add("aa-show");
          }, 400);
        }, 8200)
      );

      return timeouts;
    };

    // Run animation initially
    let timeouts = runAnimation();

    // Loop animation every 12 seconds
    const interval = setInterval(() => {
      timeouts.forEach(clearTimeout);
      timeouts = runAnimation();
    }, 12000);

    return () => {
      timeouts.forEach(clearTimeout);
      clearInterval(interval);
    };
  }, []);

  return (
    <div ref={wrapperRef}>
      <style>{`
        /* alles gekapselt */
        .aa-wrapper {
          all: initial;
          display: block;
          width: 100%;
          max-width: 100%;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }

        /* äußere Box */
        .aa-wrapper .aa-container {
          background: white;
          border-radius: 16px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
          width: 100%;
          max-width: 100%;
          min-height: 400px;
          display: flex;
          justify-content: center;
          align-items: flex-start;
          overflow: hidden;
          padding: 0;
          margin: 0;
        }

        /* eigentliche Animation */
        .aa-wrapper .aa-animation {
          width: min(100%, 533px);
          height: 400px;
          margin: 0;
          padding: 0;
        }

        .aa-wrapper svg {
          width: 100%;
          height: 100%;
          display: block;
        }

        /* ===== Animationen ===== */

        .aa-wrapper .employee {
          animation: aa-employeeAppear 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          opacity: 0;
          transform-origin: center;
        }
        .aa-wrapper .employee:nth-child(1) { animation-delay: 0.2s; }
        .aa-wrapper .employee:nth-child(2) { animation-delay: 0.4s; }
        .aa-wrapper .employee:nth-child(3) { animation-delay: 0.6s; }
        .aa-wrapper .employee:nth-child(4) { animation-delay: 0.8s; }

        @keyframes aa-employeeAppear {
          0% { opacity: 0; transform: scale(0) translateY(30px); }
          70% { transform: scale(1.1) translateY(-5px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }

        /* CEO Kopie hochfahren */
        .aa-wrapper #ceo-moving-copy.aa-animate {
          animation: aa-ceoSlideUp 2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        @keyframes aa-ceoSlideUp {
          0% { opacity: 1; transform: translateY(0); }
          100% { opacity: 1; transform: translateY(-330px); }
        }

        /* Strategisches Management sichtbar */
        .aa-wrapper .strategic-box {
          transform-origin: center;
        }
        .aa-wrapper .strategic-box.aa-show {
          animation: aa-boxSlideIn 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        @keyframes aa-boxSlideIn {
          0% { opacity: 0; transform: translateY(-30px) scale(0.9); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }

        /* CEO unten */
        .aa-wrapper .ceo-initial {
          animation: aa-ceoAppear 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          animation-delay: 1s;
          opacity: 0;
        }
        @keyframes aa-ceoAppear {
          0% { opacity: 0; transform: scale(0); }
          70% { transform: scale(1.15); }
          100% { opacity: 1; transform: scale(1); }
        }

        /* Striche */
        .aa-wrapper .strike {
          stroke-dasharray: 80;
          stroke-dashoffset: 80;
          opacity: 0;
        }
        .aa-wrapper .strike.aa-draw {
          animation: aa-drawStrike 0.5s ease-out forwards;
        }
        @keyframes aa-drawStrike {
          to { stroke-dashoffset: 0; opacity: 1; }
        }

        /* Mensch-Icon ausblenden */
        .aa-wrapper .employee-icon-fade {
          animation: aa-iconFadeOut 0.4s ease-out forwards;
        }
        @keyframes aa-iconFadeOut { to { opacity: 0; } }

        /* AI-Icon rein */
        .aa-wrapper .ai-icon {
          opacity: 0;
          transform-origin: center;
        }
        .aa-wrapper .ai-icon.aa-replace {
          animation: aa-aiReplace 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        @keyframes aa-aiReplace {
          0% { opacity: 0; transform: scale(0); }
          70% { transform: scale(1.2); }
          100% { opacity: 1; transform: scale(1); }
        }

        /* Profit-Badge */
        .aa-wrapper .profit-badge.aa-show {
          animation: aa-badgePop 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        @keyframes aa-badgePop {
          0% { opacity: 0; transform: scale(0); }
          70% { transform: scale(1.15); }
          100% { opacity: 1; transform: scale(1); }
        }

        /* CEO oben */
        .aa-wrapper .ceo-transform {
          opacity: 0;
        }
        .aa-wrapper .ceo-transform.aa-show {
          animation: aa-ceoTransform 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        @keyframes aa-ceoTransform {
          0% { opacity: 0; transform: scale(0.5) translateY(0); }
          100% { opacity: 1; transform: scale(1) translateY(-80px); }
        }

        .aa-wrapper .beach { opacity: 0; }
        .aa-wrapper .beach.aa-show {
          animation: aa-beachFade 0.8s ease-out forwards;
        }
        @keyframes aa-beachFade { to { opacity: 1; } }

        .aa-wrapper .glow {
          animation: aa-glowPulse 2s ease-in-out infinite;
        }
        @keyframes aa-glowPulse {
          0%, 100% { filter: drop-shadow(0 0 5px rgba(251, 191, 36, 0.5)); }
          50% { filter: drop-shadow(0 0 20px rgba(251, 191, 36, 0.9)); }
        }

        .aa-wrapper .sparkle {
          opacity: 0;
          animation: aa-sparkle 1.5s ease-in-out infinite;
        }
        .aa-wrapper .sparkle:nth-child(1) { animation-delay: 0s; }
        .aa-wrapper .sparkle:nth-child(2) { animation-delay: 0.3s; }
        .aa-wrapper .sparkle:nth-child(3) { animation-delay: 0.6s; }
        @keyframes aa-sparkle {
          0%, 100% { opacity: 0; transform: scale(0); }
          50% { opacity: 1; transform: scale(1); }
        }

        @media (max-width: 768px) {
          .aa-wrapper .aa-container {
            min-height: 320px;
            padding: 0;
          }
          .aa-wrapper .aa-animation {
            width: 100%;
            height: 320px;
          }
        }
      `}</style>

      <div className="aa-wrapper">
        <div className="aa-container">
          <div className="aa-animation">
            <svg viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="teamGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: "#F3F4F6" }} />
                  <stop offset="100%" style={{ stopColor: "#E5E7EB" }} />
                </linearGradient>

                <linearGradient id="sunGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: "#FCD34D" }} />
                  <stop offset="100%" style={{ stopColor: "#F59E0B" }} />
                </linearGradient>

                <filter id="shadow">
                  <feGaussianBlur in="SourceAlpha" stdDeviation="4" />
                  <feOffset dx="0" dy="4" result="offsetblur" />
                  <feComponentTransfer>
                    <feFuncA type="linear" slope="0.25" />
                  </feComponentTransfer>
                  <feMerge>
                    <feMergeNode />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Strategisches Management */}
              <g className="strategic-box" id="strategic-box" style={{ opacity: 0 }}>
                <rect x="200" y="80" width="400" height="200" rx="20" fill="#ffffff" stroke="#10B981" strokeWidth="4" filter="url(#shadow)" />
                <text x="400" y="125" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="20" fontWeight="700" fill="#059669">
                  Strategisches Management
                </text>
              </g>

              {/* Team-Box */}
              <g id="team-container">
                <rect x="200" y="320" width="400" height="250" rx="20" fill="url(#teamGradient)" stroke="#D1D5DB" strokeWidth="3" filter="url(#shadow)" />
                <text x="400" y="360" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="18" fontWeight="600" fill="#1F2937">
                  Operatives Team
                </text>

                {/* Employees */}
                <g className="employee" id="emp-1">
                  <circle cx="280" cy="440" r="35" fill="#DBEAFE" stroke="#3B82F6" strokeWidth="2" />
                  <text x="280" y="458" textAnchor="middle" fontSize="48" id="emp-1-icon">🧍</text>
                  <line className="strike" id="strike-1" x1="250" y1="440" x2="310" y2="440" stroke="#EF4444" strokeWidth="4" strokeLinecap="round" />
                  <text className="ai-icon" id="ai-1" x="280" y="458" textAnchor="middle" fontSize="48">🤖</text>
                </g>

                <g className="employee" id="emp-2">
                  <circle cx="380" cy="440" r="35" fill="#DBEAFE" stroke="#3B82F6" strokeWidth="2" />
                  <text x="380" y="458" textAnchor="middle" fontSize="48" id="emp-2-icon">🧍</text>
                  <line className="strike" id="strike-2" x1="350" y1="440" x2="410" y2="440" stroke="#EF4444" strokeWidth="4" strokeLinecap="round" />
                  <text className="ai-icon" id="ai-2" x="380" y="458" textAnchor="middle" fontSize="48">🤖</text>
                </g>

                <g className="employee" id="emp-3">
                  <circle cx="480" cy="440" r="35" fill="#DBEAFE" stroke="#3B82F6" strokeWidth="2" />
                  <text x="480" y="458" textAnchor="middle" fontSize="48">🧍</text>
                </g>

                <g className="employee" id="emp-4">
                  <circle cx="520" cy="440" r="35" fill="#DBEAFE" stroke="#3B82F6" strokeWidth="2" />
                  <text x="520" y="458" textAnchor="middle" fontSize="48">🧍</text>
                </g>

                {/* CEO unten */}
                <g className="ceo-initial" id="ceo-initial">
                  <circle cx="400" cy="510" r="40" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="3" />
                  <text x="400" y="530" textAnchor="middle" fontSize="52">👔</text>
                </g>

                {/* CEO Moving Copy */}
                <g id="ceo-moving-copy" style={{ opacity: 0 }}>
                  <circle cx="400" cy="510" r="40" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="3" />
                  <text x="400" y="530" textAnchor="middle" fontSize="52">👔</text>
                </g>
              </g>

              {/* Profit Badge */}
              <g className="profit-badge" id="profit-badge" style={{ opacity: 0 }}>
                <circle cx="650" cy="440" r="70" fill="#10B981" filter="url(#shadow)" />
                <circle cx="650" cy="440" r="60" fill="#D1FAE5" />
                <text x="650" y="440" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="32" fontWeight="bold" fill="#059669">
                  +72%
                </text>
                <text x="650" y="465" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="13" fontWeight="600" fill="#047857">
                  Profitmarge
                </text>
              </g>

              {/* CEO oben */}
              <g className="ceo-transform" id="ceo-transformed">
                <g className="glow" id="sun-glow">
                  <circle cx="400" cy="180" r="45" fill="url(#sunGradient)" />
                </g>

                <circle cx="400" cy="180" r="45" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="3" filter="url(#shadow)" />
                <text x="400" y="205" textAnchor="middle" fontSize="60">😎</text>

                <g className="beach" id="beach-1">
                  <text x="320" y="150" fontSize="28">🏖️</text>
                </g>
                <g className="beach" id="beach-2">
                  <text x="470" y="170" fontSize="28">🍹</text>
                </g>
                <g className="beach" id="beach-3">
                  <text x="330" y="210" fontSize="24">☀️</text>
                </g>

                <g className="sparkle">
                  <text x="340" y="140" fontSize="20">✨</text>
                </g>
                <g className="sparkle">
                  <text x="460" y="150" fontSize="20">✨</text>
                </g>
                <g className="sparkle">
                  <text x="400" y="240" fontSize="20">✨</text>
                </g>
              </g>

              {/* Final Text */}
              <g id="final-text" style={{ opacity: 0 }}>
                <text x="400" y="520" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="20" fontWeight="bold" fill="#10B981">
                  Mehr Zeit für Wachstum &amp; Strategie
                </text>
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfitmargenAnimation;
