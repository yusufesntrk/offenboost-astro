import { useEffect, useRef } from "react";

const CandidateClusterAnimation = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const runAnimation = () => {
      const title1 = wrapper.querySelector("#cc-title-1");
      const title2 = wrapper.querySelector("#cc-title-2");
      const agency1 = wrapper.querySelector("#cc-agency-1");
      const agency2 = wrapper.querySelector("#cc-agency-2");
      const candidate1 = wrapper.querySelector("#cc-cand-1");
      const candidate2 = wrapper.querySelector("#cc-cand-2");
      const candidate3 = wrapper.querySelector("#cc-cand-3");
      const match1 = wrapper.querySelector("#cc-match-1");
      const match2 = wrapper.querySelector("#cc-match-2");
      const hotBadge = wrapper.querySelector("#cc-hot-badge");
      const connection = wrapper.querySelector("#cc-connection");
      const successBadge = wrapper.querySelector("#cc-success");

      // Reset
      [title1, title2, agency1, agency2, candidate1, candidate2, candidate3,
       match1, match2, hotBadge, connection, successBadge].forEach(el => {
        el?.classList.remove("cc-show", "cc-pop", "cc-fly", "cc-fade-in", "cc-fade-out", "cc-draw");
        if (el?.tagName === "g" && (el.id.includes("connection"))) {
          (el as SVGGElement).style.opacity = "0";
        }
      });

      const timeline = [
        { time: 200, action: () => title1?.classList.add("cc-fade-in") },
        { time: 500, action: () => agency1?.classList.add("cc-show") },
        { time: 800, action: () => agency2?.classList.add("cc-show") },
        { time: 1200, action: () => candidate1?.classList.add("cc-fly") },
        { time: 1500, action: () => candidate2?.classList.add("cc-fly") },
        { time: 1800, action: () => candidate3?.classList.add("cc-fly") },
        { time: 2400, action: () => match1?.classList.add("cc-pop") },
        { time: 2700, action: () => match2?.classList.add("cc-pop") },
        { time: 3200, action: () => hotBadge?.classList.add("cc-pop") },
        { time: 3600, action: () => title1?.classList.add("cc-fade-out") },
        { time: 3700, action: () => title2?.classList.add("cc-fade-in") },
        { time: 3900, action: () => { const c = wrapper.querySelector("#cc-connection") as SVGGElement; if (c) c.style.opacity = "1"; } },
        { time: 4500, action: () => successBadge?.classList.add("cc-pop") },
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
        .cc-wrapper {
          all: initial;
          display: block;
          width: 100%;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }

        .cc-wrapper .cc-container {
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

        .cc-wrapper svg { width: 100%; height: 100%; display: block; }
        .cc-wrapper .cc-animation { width: 100%; height: 100%; }
        .cc-wrapper { height: 100%; }

        /* Title animations */
        .cc-wrapper .title { opacity: 0; }
        .cc-wrapper .title.cc-fade-in { animation: cc-titleIn 0.5s ease-out forwards; }
        .cc-wrapper .title.cc-fade-out { animation: cc-titleOut 0.3s ease-out forwards; }

        /* Agency show */
        .cc-wrapper .agency { opacity: 0; }
        .cc-wrapper .agency.cc-show { animation: cc-agencyShow 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }

        /* Candidate fly */
        .cc-wrapper .candidate { opacity: 0; }
        .cc-wrapper .candidate.cc-fly { animation: cc-flyIn 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards; }

        /* Match score pop */
        .cc-wrapper .match { opacity: 0; }
        .cc-wrapper .match.cc-pop { animation: cc-matchPop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }

        /* Hot badge */
        .cc-wrapper .hot-badge { opacity: 0; }
        .cc-wrapper .hot-badge.cc-pop { animation: cc-hotPop 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }

        /* Success badge */
        .cc-wrapper .success { opacity: 0; }
        .cc-wrapper .success.cc-pop { animation: cc-successPop 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }

        /* Connection line */
        .cc-wrapper .connection { transition: opacity 0.6s ease-out; }

        @keyframes cc-titleIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes cc-titleOut {
          from { opacity: 1; }
          to { opacity: 0; transform: translateY(10px); }
        }
        @keyframes cc-agencyShow {
          0% { opacity: 0; transform: scale(0.5); }
          70% { transform: scale(1.05); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes cc-flyIn {
          0% { opacity: 0; transform: translateY(50px) scale(0.7); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes cc-matchPop {
          0% { opacity: 0; transform: scale(0); }
          70% { transform: scale(1.2); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes cc-hotPop {
          0% { opacity: 0; transform: scale(0) rotate(-20deg); }
          70% { transform: scale(1.2) rotate(10deg); }
          100% { opacity: 1; transform: scale(1) rotate(0); }
        }
        @keyframes cc-successPop {
          0% { opacity: 0; transform: scale(0) rotate(-10deg); }
          70% { transform: scale(1.15) rotate(5deg); }
          100% { opacity: 1; transform: scale(1) rotate(0); }
        }

        `}</style>

      <div className="cc-wrapper">
        <div className="cc-container">
          <div className="cc-animation">
            <svg viewBox="40 0 720 600" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="ccMarketGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: "#DBEAFE" }} />
                  <stop offset="100%" style={{ stopColor: "#EDE9FE" }} />
                </linearGradient>
                <filter id="ccShadow">
                  <feGaussianBlur in="SourceAlpha" stdDeviation="4" />
                  <feOffset dx="0" dy="4" result="offsetblur" />
                  <feComponentTransfer><feFuncA type="linear" slope="0.25" /></feComponentTransfer>
                  <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
                <filter id="ccGlow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Background */}
              <rect x="50" y="70" width="700" height="460" rx="20" fill="url(#ccMarketGrad)" opacity="0.3" />

              {/* Titles */}
              <text id="cc-title-1" className="title" x="400" y="50" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="20" fontWeight="700" fill="#1F2937">
                Marktplatz für Recruiting-Agenturen
              </text>
              <text id="cc-title-2" className="title" x="400" y="50" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="20" fontWeight="700" fill="#10B981">
                Kollaboration erfolgreich!
              </text>

              {/* Agency 1 - Left */}
              <g id="cc-agency-1" className="agency">
                <rect x="100" y="100" width="180" height="120" rx="16" fill="white" stroke="#3B82F6" strokeWidth="3" filter="url(#ccShadow)" />
                <circle cx="150" cy="140" r="25" fill="#DBEAFE" />
                <text x="150" y="148" textAnchor="middle" fontSize="28">🏢</text>
                <text x="190" y="128" textAnchor="start" fontFamily="Arial, sans-serif" fontSize="13" fontWeight="700" fill="#1F2937">TechRecruit</text>
                <text x="190" y="145" textAnchor="start" fontFamily="Arial, sans-serif" fontSize="10" fill="#6B7280">IT Recruiting</text>
                <rect x="115" y="170" width="150" height="20" rx="10" fill="#DBEAFE" />
                <text x="190" y="184" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="10" fill="#1E40AF">12 Kandidaten</text>
              </g>

              {/* Agency 2 - Right */}
              <g id="cc-agency-2" className="agency">
                <rect x="520" y="100" width="180" height="120" rx="16" fill="white" stroke="#8B5CF6" strokeWidth="3" filter="url(#ccShadow)" />
                <circle cx="570" cy="140" r="25" fill="#EDE9FE" />
                <text x="570" y="148" textAnchor="middle" fontSize="28">🏛️</text>
                <text x="610" y="128" textAnchor="start" fontFamily="Arial, sans-serif" fontSize="13" fontWeight="700" fill="#1F2937">SalesHunter</text>
                <text x="610" y="145" textAnchor="start" fontFamily="Arial, sans-serif" fontSize="10" fill="#6B7280">Sales Recruiting</text>
                <rect x="535" y="170" width="150" height="20" rx="10" fill="#EDE9FE" />
                <text x="610" y="184" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="10" fill="#5B21B6">8 Mandate</text>
              </g>

              {/* Candidates in center */}
              <g id="cc-cand-1" className="candidate">
                <rect x="280" y="260" width="100" height="90" rx="12" fill="white" stroke="#E5E7EB" strokeWidth="2" filter="url(#ccShadow)" />
                <circle cx="330" cy="290" r="22" fill="#DBEAFE" />
                <text x="330" y="298" textAnchor="middle" fontSize="24">👨‍💻</text>
                <text x="330" y="328" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="10" fontWeight="600" fill="#1F2937">Developer</text>
                <text x="330" y="342" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="9" fill="#6B7280">Senior</text>
              </g>

              <g id="cc-cand-2" className="candidate">
                <rect x="400" y="260" width="100" height="90" rx="12" fill="white" stroke="#E5E7EB" strokeWidth="2" filter="url(#ccShadow)" />
                <circle cx="450" cy="290" r="22" fill="#FEF3C7" />
                <text x="450" y="298" textAnchor="middle" fontSize="24">👩‍💼</text>
                <text x="450" y="328" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="10" fontWeight="600" fill="#1F2937">Account Exec</text>
                <text x="450" y="342" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="9" fill="#6B7280">Mid-Level</text>
              </g>

              <g id="cc-cand-3" className="candidate">
                <rect x="520" y="260" width="100" height="90" rx="12" fill="white" stroke="#E5E7EB" strokeWidth="2" filter="url(#ccShadow)" />
                <circle cx="570" cy="290" r="22" fill="#D1FAE5" />
                <text x="570" y="298" textAnchor="middle" fontSize="24">👨‍🔬</text>
                <text x="570" y="328" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="10" fontWeight="600" fill="#1F2937">Data Scientist</text>
                <text x="570" y="342" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="9" fill="#6B7280">Lead</text>
              </g>

              {/* Match Scores */}
              <g id="cc-match-1" className="match">
                <rect x="295" y="360" width="70" height="30" rx="15" fill="#10B981" />
                <text x="330" y="380" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="12" fontWeight="700" fill="white">92%</text>
              </g>

              <g id="cc-match-2" className="match">
                <rect x="535" y="360" width="70" height="30" rx="15" fill="#3B82F6" />
                <text x="570" y="380" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="12" fontWeight="700" fill="white">87%</text>
              </g>

              {/* Hot Badge */}
              <g id="cc-hot-badge" className="hot-badge">
                <circle cx="380" cy="285" r="18" fill="#EF4444" filter="url(#ccGlow)" />
                <text x="380" y="292" textAnchor="middle" fontSize="18">🔥</text>
              </g>

              {/* Connection Line */}
              <g id="cc-connection" className="connection" style={{ opacity: 0 }}>
                <path d="M 280 160 Q 400 200 520 160" stroke="#10B981" strokeWidth="4" fill="none" strokeDasharray="10,5" />
                <circle cx="400" cy="185" r="20" fill="#10B981" />
                <text x="400" y="192" textAnchor="middle" fontSize="18">🤝</text>
              </g>

              {/* Feature Boxes */}
              <g>
                <rect x="80" y="420" width="180" height="45" rx="10" fill="white" stroke="#E5E7EB" strokeWidth="2" />
                <text x="100" y="448" fontFamily="Arial, sans-serif" fontSize="18">🎯</text>
                <text x="125" y="448" fontFamily="Arial, sans-serif" fontSize="11" fontWeight="500" fill="#374151">Smart Matching Engine</text>
              </g>

              <g>
                <rect x="540" y="420" width="180" height="45" rx="10" fill="white" stroke="#E5E7EB" strokeWidth="2" />
                <text x="560" y="448" fontFamily="Arial, sans-serif" fontSize="18">🔔</text>
                <text x="585" y="448" fontFamily="Arial, sans-serif" fontSize="11" fontWeight="500" fill="#374151">Hot Match Alerts</text>
              </g>

              {/* Success Badge */}
              <g id="cc-success" className="success">
                <circle cx="400" cy="500" r="55" fill="#10B981" filter="url(#ccShadow)" />
                <circle cx="400" cy="500" r="45" fill="#D1FAE5" />
                <text x="400" y="495" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="22" fontWeight="bold" fill="#059669">+35%</text>
                <text x="400" y="518" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="10" fontWeight="600" fill="#047857">Placements</text>
              </g>

              {/* Footer */}
              <text x="400" y="575" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fill="#9CA3AF">CandidateCluster - Der Marktplatz für Recruiting-Agenturen</text>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateClusterAnimation;
