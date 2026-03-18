import { useEffect, useRef } from "react";

const ShortSelectAnimation = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const runAnimation = () => {
      const title1 = wrapper.querySelector("#ss-title-1");
      const title2 = wrapper.querySelector("#ss-title-2");
      const title3 = wrapper.querySelector("#ss-title-3");
      const candidate1 = wrapper.querySelector("#ss-candidate-1");
      const candidate2 = wrapper.querySelector("#ss-candidate-2");
      const candidate3 = wrapper.querySelector("#ss-candidate-3");
      const stage1 = wrapper.querySelector("#ss-stage-1");
      const stage2 = wrapper.querySelector("#ss-stage-2");
      const stage3 = wrapper.querySelector("#ss-stage-3");
      const stage4 = wrapper.querySelector("#ss-stage-4");
      const arrow1 = wrapper.querySelector("#ss-arrow-1");
      const arrow2 = wrapper.querySelector("#ss-arrow-2");
      const arrow3 = wrapper.querySelector("#ss-arrow-3");
      const badge = wrapper.querySelector("#ss-badge");

      // Reset all
      [title1, title2, title3, candidate1, candidate2, candidate3,
       stage1, stage2, stage3, stage4, arrow1, arrow2, arrow3, badge].forEach(el => {
        el?.classList.remove("ss-show", "ss-fly", "ss-fade-in", "ss-fade-out", "ss-pop");
        if (el?.tagName === "g" && el.id.includes("arrow")) {
          (el as SVGGElement).style.opacity = "0";
        }
      });

      const timeline = [
        { time: 200, action: () => title1?.classList.add("ss-fade-in") },
        { time: 400, action: () => stage1?.classList.add("ss-show") },
        { time: 600, action: () => stage2?.classList.add("ss-show") },
        { time: 800, action: () => stage3?.classList.add("ss-show") },
        { time: 1000, action: () => stage4?.classList.add("ss-show") },
        { time: 1500, action: () => candidate1?.classList.add("ss-fly") },
        { time: 1800, action: () => candidate2?.classList.add("ss-fly") },
        { time: 2100, action: () => candidate3?.classList.add("ss-fly") },
        { time: 2600, action: () => title1?.classList.add("ss-fade-out") },
        { time: 2700, action: () => title2?.classList.add("ss-fade-in") },
        { time: 2800, action: () => { const a = wrapper.querySelector("#ss-arrow-1") as SVGGElement; if (a) a.style.opacity = "1"; } },
        { time: 3200, action: () => { const a = wrapper.querySelector("#ss-arrow-2") as SVGGElement; if (a) a.style.opacity = "1"; } },
        { time: 3600, action: () => { const a = wrapper.querySelector("#ss-arrow-3") as SVGGElement; if (a) a.style.opacity = "1"; } },
        { time: 4200, action: () => title2?.classList.add("ss-fade-out") },
        { time: 4300, action: () => title3?.classList.add("ss-fade-in") },
        { time: 4500, action: () => badge?.classList.add("ss-pop") },
      ];

      timeline.forEach(({ time, action }) => setTimeout(action, time));
    };

    runAnimation();

    const interval = setInterval(() => {
      runAnimation();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div ref={wrapperRef}>
      <style>{`
        .ss-wrapper {
          all: initial;
          display: block;
          width: 100%;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }

        .ss-wrapper .ss-container {
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

        .ss-wrapper svg { width: 100%; height: 100%; display: block; }
        .ss-wrapper .ss-animation { width: 100%; height: 100%; }
        .ss-wrapper { height: 100%; }

        /* Title animations */
        .ss-wrapper .title { opacity: 0; }
        .ss-wrapper .title.ss-fade-in { animation: ss-titleIn 0.5s ease-out forwards; }
        .ss-wrapper .title.ss-fade-out { animation: ss-titleOut 0.3s ease-out forwards; }

        /* Stage pop */
        .ss-wrapper .stage { opacity: 0; }
        .ss-wrapper .stage.ss-show { animation: ss-stagePop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }

        /* Candidate fly */
        .ss-wrapper .candidate { opacity: 0; }
        .ss-wrapper .candidate.ss-fly { animation: ss-flyIn 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards; }

        /* Badge pop */
        .ss-wrapper .badge { opacity: 0; }
        .ss-wrapper .badge.ss-pop { animation: ss-badgePop 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }

        /* Arrow fade */
        .ss-wrapper .arrow { transition: opacity 0.5s ease-out; }

        @keyframes ss-titleIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes ss-titleOut {
          from { opacity: 1; }
          to { opacity: 0; transform: translateY(10px); }
        }
        @keyframes ss-stagePop {
          0% { opacity: 0; transform: scale(0.5); }
          70% { transform: scale(1.1); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes ss-flyIn {
          0% { opacity: 0; transform: translateX(-150px) scale(0.6); }
          100% { opacity: 1; transform: translateX(0) scale(1); }
        }
        @keyframes ss-badgePop {
          0% { opacity: 0; transform: scale(0) rotate(-10deg); }
          70% { transform: scale(1.15) rotate(5deg); }
          100% { opacity: 1; transform: scale(1) rotate(0); }
        }

        `}</style>

      <div className="ss-wrapper">
        <div className="ss-container">
          <div className="ss-animation">
            <svg viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="ssPipelineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style={{ stopColor: "#DBEAFE" }} />
                  <stop offset="100%" style={{ stopColor: "#BFDBFE" }} />
                </linearGradient>
                <filter id="ssShadow">
                  <feGaussianBlur in="SourceAlpha" stdDeviation="4" />
                  <feOffset dx="0" dy="4" result="offsetblur" />
                  <feComponentTransfer><feFuncA type="linear" slope="0.25" /></feComponentTransfer>
                  <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
              </defs>

              {/* Titles */}
              <text id="ss-title-1" className="title" x="400" y="50" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="20" fontWeight="700" fill="#1F2937">
                1. Kandidaten erfassen
              </text>
              <text id="ss-title-2" className="title" x="400" y="50" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="20" fontWeight="700" fill="#3B82F6">
                2. Durch Pipeline führen
              </text>
              <text id="ss-title-3" className="title" x="400" y="50" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="20" fontWeight="700" fill="#10B981">
                3. Erfolgreich platzieren
              </text>

              {/* Pipeline Stages */}
              <g id="ss-stage-1" className="stage">
                <rect x="80" y="90" width="150" height="60" rx="10" fill="#DBEAFE" stroke="#3B82F6" strokeWidth="2" filter="url(#ssShadow)" />
                <text x="155" y="125" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="13" fontWeight="600" fill="#1E40AF">Beworben</text>
              </g>
              <g id="ss-stage-2" className="stage">
                <rect x="250" y="90" width="150" height="60" rx="10" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="2" filter="url(#ssShadow)" />
                <text x="325" y="125" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="13" fontWeight="600" fill="#92400E">Screening</text>
              </g>
              <g id="ss-stage-3" className="stage">
                <rect x="420" y="90" width="150" height="60" rx="10" fill="#EDE9FE" stroke="#8B5CF6" strokeWidth="2" filter="url(#ssShadow)" />
                <text x="495" y="125" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="13" fontWeight="600" fill="#5B21B6">Interview</text>
              </g>
              <g id="ss-stage-4" className="stage">
                <rect x="590" y="90" width="150" height="60" rx="10" fill="#D1FAE5" stroke="#10B981" strokeWidth="2" filter="url(#ssShadow)" />
                <text x="665" y="125" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="13" fontWeight="600" fill="#065F46">Eingestellt</text>
              </g>

              {/* Candidates */}
              <g id="ss-candidate-1" className="candidate">
                <rect x="100" y="180" width="180" height="110" rx="12" fill="white" stroke="#E5E7EB" strokeWidth="2" filter="url(#ssShadow)" />
                <circle cx="145" cy="220" r="25" fill="#DBEAFE" />
                <text x="145" y="228" textAnchor="middle" fontSize="28">👨</text>
                <text x="180" y="215" fontFamily="Arial, sans-serif" fontSize="13" fontWeight="600" fill="#1F2937">Max M.</text>
                <text x="180" y="232" fontFamily="Arial, sans-serif" fontSize="10" fill="#6B7280">Senior Dev</text>
                <rect x="115" y="260" width="150" height="20" rx="10" fill="#E5E7EB" />
                <rect x="115" y="260" width="120" height="20" rx="10" fill="#3B82F6" />
                <text x="130" y="274" fontFamily="Arial, sans-serif" fontSize="9" fill="white">Match: 92%</text>
              </g>

              <g id="ss-candidate-2" className="candidate">
                <rect x="310" y="180" width="180" height="110" rx="12" fill="white" stroke="#E5E7EB" strokeWidth="2" filter="url(#ssShadow)" />
                <circle cx="355" cy="220" r="25" fill="#FEF3C7" />
                <text x="355" y="228" textAnchor="middle" fontSize="28">👩</text>
                <text x="390" y="215" fontFamily="Arial, sans-serif" fontSize="13" fontWeight="600" fill="#1F2937">Lisa K.</text>
                <text x="390" y="232" fontFamily="Arial, sans-serif" fontSize="10" fill="#6B7280">Product Mgr</text>
                <rect x="325" y="260" width="150" height="20" rx="10" fill="#E5E7EB" />
                <rect x="325" y="260" width="135" height="20" rx="10" fill="#F59E0B" />
                <text x="340" y="274" fontFamily="Arial, sans-serif" fontSize="9" fill="white">Match: 88%</text>
              </g>

              <g id="ss-candidate-3" className="candidate">
                <rect x="520" y="180" width="180" height="110" rx="12" fill="white" stroke="#E5E7EB" strokeWidth="2" filter="url(#ssShadow)" />
                <circle cx="565" cy="220" r="25" fill="#D1FAE5" />
                <text x="565" y="228" textAnchor="middle" fontSize="28">👨</text>
                <text x="600" y="215" fontFamily="Arial, sans-serif" fontSize="13" fontWeight="600" fill="#1F2937">Tom S.</text>
                <text x="600" y="232" fontFamily="Arial, sans-serif" fontSize="10" fill="#6B7280">Sales Mgr</text>
                <rect x="535" y="260" width="150" height="20" rx="10" fill="#E5E7EB" />
                <rect x="535" y="260" width="145" height="20" rx="10" fill="#10B981" />
                <text x="550" y="274" fontFamily="Arial, sans-serif" fontSize="9" fill="white">Match: 95%</text>
              </g>

              {/* Pipeline Flow Arrows - horizontal durch Stages */}
              <g id="ss-arrow-1" className="arrow" style={{ opacity: 0 }}>
                <path d="M 230 120 L 248 120" stroke="#3B82F6" strokeWidth="2" fill="none" strokeDasharray="4,2" />
                <polygon points="250,120 244,116 244,124" fill="#3B82F6" />
              </g>
              <g id="ss-arrow-2" className="arrow" style={{ opacity: 0 }}>
                <path d="M 400 120 L 418 120" stroke="#F59E0B" strokeWidth="2" fill="none" strokeDasharray="4,2" />
                <polygon points="420,120 414,116 414,124" fill="#F59E0B" />
              </g>
              <g id="ss-arrow-3" className="arrow" style={{ opacity: 0 }}>
                <path d="M 570 120 L 588 120" stroke="#10B981" strokeWidth="2" fill="none" strokeDasharray="4,2" />
                <polygon points="590,120 584,116 584,124" fill="#10B981" />
              </g>

              {/* Success Badge */}
              <g id="ss-badge" className="badge">
                <circle cx="400" cy="480" r="60" fill="#10B981" filter="url(#ssShadow)" />
                <circle cx="400" cy="480" r="50" fill="#D1FAE5" />
                <text x="400" y="475" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="28" fontWeight="bold" fill="#059669">3</text>
                <text x="400" y="498" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fontWeight="600" fill="#047857">Platziert</text>
              </g>

              {/* Feature Icons */}
              <g>
                <rect x="80" y="380" width="140" height="50" rx="8" fill="#F3F4F6" />
                <text x="100" y="410" fontFamily="Arial, sans-serif" fontSize="20">📧</text>
                <text x="130" y="410" fontFamily="Arial, sans-serif" fontSize="11" fill="#4B5563">Auto-Mails</text>
              </g>
              <g>
                <rect x="80" y="440" width="140" height="50" rx="8" fill="#F3F4F6" />
                <text x="100" y="470" fontFamily="Arial, sans-serif" fontSize="20">📅</text>
                <text x="130" y="470" fontFamily="Arial, sans-serif" fontSize="11" fill="#4B5563">Scheduling</text>
              </g>
              <g>
                <rect x="580" y="380" width="140" height="50" rx="8" fill="#F3F4F6" />
                <text x="600" y="410" fontFamily="Arial, sans-serif" fontSize="20">🤖</text>
                <text x="630" y="410" fontFamily="Arial, sans-serif" fontSize="11" fill="#4B5563">AI Matching</text>
              </g>
              <g>
                <rect x="580" y="440" width="140" height="50" rx="8" fill="#F3F4F6" />
                <text x="600" y="470" fontFamily="Arial, sans-serif" fontSize="20">💬</text>
                <text x="630" y="470" fontFamily="Arial, sans-serif" fontSize="11" fill="#4B5563">WhatsApp</text>
              </g>

              {/* Branding */}
              <text x="400" y="560" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fill="#9CA3AF">ShortSelect - Das ATS für Recruiting-Agenturen</text>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShortSelectAnimation;
