import { useEffect, useRef } from 'react';

const FulfillmentAnimation = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const animationStartedRef = useRef(false);

  useEffect(() => {
    if (!wrapperRef.current || animationStartedRef.current) return;

    const hiringTimeline = [
      { time: 300, action: () => document.getElementById("ha-title-1")?.classList.add("title-fade-in") },
      { time: 500, action: () => document.getElementById("ha-signal-1")?.classList.add("ha-show") },
      { time: 700, action: () => document.getElementById("ha-signal-2")?.classList.add("ha-show") },
      { time: 900, action: () => document.getElementById("ha-signal-3")?.classList.add("ha-show") },
      { time: 1500, action: () => document.getElementById("ha-lightbulb")?.classList.add("ha-light") },
      { time: 1800, action: () => { const el = document.getElementById("ha-arrow-1"); if (el) { el.style.opacity = "1"; el.style.transition = "opacity 0.5s ease-out"; } } },
      { time: 2300, action: () => { const el = document.getElementById("ha-arrow-2"); if (el) { el.style.opacity = "1"; el.style.transition = "opacity 0.5s ease-out"; } } },
      { time: 2600, action: () => document.getElementById("ha-title-1")?.classList.add("title-fade-out") },
      { time: 2700, action: () => document.getElementById("ha-title-2")?.classList.add("title-fade-in") },
      { time: 2800, action: () => document.getElementById("ha-lead-1")?.classList.add("ha-fly") },
      { time: 3100, action: () => document.getElementById("ha-lead-2")?.classList.add("ha-fly") },
      { time: 3400, action: () => document.getElementById("ha-lead-3")?.classList.add("ha-fly") },
      { time: 4200, action: () => { const el = document.getElementById("ha-arrow-3"); if (el) { el.style.opacity = "1"; el.style.transition = "opacity 0.5s ease-out"; } } },
      { time: 4500, action: () => document.getElementById("ha-title-2")?.classList.add("title-fade-out") },
      { time: 4600, action: () => document.getElementById("ha-title-3")?.classList.add("title-fade-in") },
      { time: 4700, action: () => document.getElementById("ha-msg-1")?.classList.add("ha-send") },
      { time: 4900, action: () => document.getElementById("ha-msg-2")?.classList.add("ha-send") },
      { time: 5100, action: () => document.getElementById("ha-msg-3")?.classList.add("ha-send") },
      { time: 5300, action: () => document.getElementById("ha-msg-4")?.classList.add("ha-send") },
      { time: 5700, action: () => document.getElementById("ha-check-1")?.classList.add("ha-check") },
      { time: 5900, action: () => document.getElementById("ha-check-2")?.classList.add("ha-check") },
      { time: 6100, action: () => document.getElementById("ha-check-3")?.classList.add("ha-check") },
      { time: 6300, action: () => document.getElementById("ha-check-4")?.classList.add("ha-check") },
      { time: 6800, action: () => document.getElementById("ha-success-badge")?.classList.add("ha-show") },
    ];

    const startAnimation = () => {
      if (animationStartedRef.current) return;
      animationStartedRef.current = true;
      hiringTimeline.forEach((event) => setTimeout(event.action, event.time));
    };

    // Start after a short delay
    setTimeout(startAnimation, 100);

    // Restart animation every 10 seconds
    const interval = setInterval(() => {
      // Reset all animations
      document.querySelectorAll('[class*="ha-"], [class*="title-fade"]').forEach(el => {
        el.classList.remove('ha-show', 'ha-light', 'ha-fly', 'ha-send', 'ha-check', 'title-fade-in', 'title-fade-out');
      });
      ['ha-arrow-1', 'ha-arrow-2', 'ha-arrow-3'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.opacity = '0';
      });
      animationStartedRef.current = false;
      setTimeout(startAnimation, 500);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <style>{`
        #hiring-animation-wrapper {
          all: initial;
          display: block;
          width: 100%;
          max-width: 100%;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }
        #hiring-animation-wrapper * { box-sizing: border-box; }
        #hiring-animation-wrapper .ha-container {
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
        #hiring-animation-wrapper .ha-animation {
          width: min(100%, 533px);
          height: 400px;
          margin: 0;
          padding: 0;
        }
        #hiring-animation-wrapper svg {
          width: 100%;
          height: 100%;
          display: block;
        }
        #hiring-animation-wrapper .title-fade-in { animation: ha-titleFadeIn 0.6s ease-out forwards !important; }
        #hiring-animation-wrapper .title-fade-out { animation: ha-titleFadeOut 0.4s ease-out forwards !important; }
        @keyframes ha-titleFadeIn { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes ha-titleFadeOut { from { opacity: 1; transform: translateY(0); } to { opacity: 0; transform: translateY(10px); } }
        #hiring-animation-wrapper .signal { opacity: 0; transform-origin: center; }
        #hiring-animation-wrapper .signal.ha-show { animation: ha-signalPop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards !important; }
        @keyframes ha-signalPop { 0% { opacity: 0; transform: scale(0); } 70% { transform: scale(1.15); } 100% { opacity: 1; transform: scale(1); } }
        #hiring-animation-wrapper .lightbulb { opacity: 0; }
        #hiring-animation-wrapper .lightbulb.ha-light { animation: ha-lightUp 1s ease-out forwards !important; }
        @keyframes ha-lightUp { 0% { opacity: 0; transform: scale(0.5); } 50% { transform: scale(1.2); } 100% { opacity: 1; transform: scale(1); } }
        #hiring-animation-wrapper .glow-pulse { animation: ha-glowPulse 2s ease-in-out infinite !important; }
        @keyframes ha-glowPulse { 0%, 100% { filter: drop-shadow(0 0 8px rgba(251, 191, 36, 0.6)); } 50% { filter: drop-shadow(0 0 25px rgba(251, 191, 36, 1)); } }
        #hiring-animation-wrapper .lead-card { opacity: 0; }
        #hiring-animation-wrapper .lead-card.ha-fly { animation: ha-flyToPipeline 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards !important; }
        @keyframes ha-flyToPipeline { 0% { opacity: 0; transform: translateX(-200px) scale(0.5); } 100% { opacity: 1; transform: translateX(0) scale(1); } }
        #hiring-animation-wrapper .message { opacity: 0; transform-origin: left center; }
        #hiring-animation-wrapper .message.ha-send { animation: ha-messageSend 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards !important; }
        @keyframes ha-messageSend { 0% { opacity: 0; transform: translateX(-50px) scale(0.8); } 70% { transform: translateX(5px) scale(1.05); } 100% { opacity: 1; transform: translateX(0) scale(1); } }
        #hiring-animation-wrapper .checkmark { opacity: 0; stroke-dasharray: 50; stroke-dashoffset: 50; }
        #hiring-animation-wrapper .checkmark.ha-check { animation: ha-drawCheck 0.6s ease-out forwards !important; }
        @keyframes ha-drawCheck { to { stroke-dashoffset: 0; opacity: 1; } }
        #hiring-animation-wrapper .success-badge { opacity: 0; transform-origin: center; }
        #hiring-animation-wrapper .success-badge.ha-show { animation: ha-badgePop 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards !important; }
        @keyframes ha-badgePop { 0% { opacity: 0; transform: scale(0) rotate(-10deg); } 70% { transform: scale(1.15) rotate(5deg); } 100% { opacity: 1; transform: scale(1) rotate(0); } }
        #hiring-animation-wrapper .sparkle { opacity: 0; animation: ha-sparkle 1.5s ease-in-out infinite !important; }
        @keyframes ha-sparkle { 0%, 100% { opacity: 0; transform: scale(0) rotate(0deg); } 50% { opacity: 1; transform: scale(1) rotate(180deg); } }

        @media (max-width: 768px) {
          #hiring-animation-wrapper .ha-container {
            min-height: 320px;
          }
          #hiring-animation-wrapper .ha-animation {
            height: 320px;
          }
        }
      `}</style>

      <div id="hiring-animation-wrapper" ref={wrapperRef}>
        <div className="ha-container">
          <div className="ha-animation">
            <svg viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="bulbGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#FEF3C7' }} />
                  <stop offset="100%" style={{ stopColor: '#FCD34D' }} />
                </linearGradient>
                <linearGradient id="pipelineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#DBEAFE' }} />
                  <stop offset="100%" style={{ stopColor: '#BFDBFE' }} />
                </linearGradient>
                <filter id="shadow">
                  <feGaussianBlur in="SourceAlpha" stdDeviation="4" />
                  <feOffset dx="0" dy="4" result="offsetblur" />
                  <feComponentTransfer><feFuncA type="linear" slope="0.25" /></feComponentTransfer>
                  <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
              </defs>

              <g id="phase-title">
                <text id="ha-title-1" x="400" y="60" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="22" fontWeight="700" fill="#1F2937" style={{ opacity: 0 }}>1. Signale identifizieren</text>
                <text id="ha-title-2" x="400" y="60" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="22" fontWeight="700" fill="#3B82F6" style={{ opacity: 0 }}>2. Leads verarbeiten</text>
                <text id="ha-title-3" x="400" y="60" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="22" fontWeight="700" fill="#10B981" style={{ opacity: 0 }}>3. Outreach starten</text>
              </g>

              <g id="signals-section">
                <g className="signal" id="ha-signal-1">
                  <circle cx="80" cy="150" r="35" fill="#FEE2E2" stroke="#EF4444" strokeWidth="3" filter="url(#shadow)" />
                  <text x="80" y="163" textAnchor="middle" fontSize="32">📢</text>
                </g>
                <g className="signal" id="ha-signal-2">
                  <circle cx="160" cy="150" r="35" fill="#DBEAFE" stroke="#3B82F6" strokeWidth="3" filter="url(#shadow)" />
                  <text x="160" y="163" textAnchor="middle" fontSize="32">💼</text>
                </g>
                <g className="signal" id="ha-signal-3">
                  <circle cx="120" cy="220" r="35" fill="#D1FAE5" stroke="#10B981" strokeWidth="3" filter="url(#shadow)" />
                  <text x="120" y="233" textAnchor="middle" fontSize="32">🎯</text>
                </g>
              </g>

              <g className="lightbulb" id="ha-lightbulb">
                <g className="glow-pulse">
                  <circle cx="120" cy="350" r="55" fill="url(#bulbGradient)" filter="url(#shadow)" />
                </g>
                <text x="120" y="370" textAnchor="middle" fontSize="60">💡</text>
              </g>

              <g id="pipeline-section">
                <rect x="280" y="120" width="240" height="330" rx="20" fill="url(#pipelineGradient)" stroke="#3B82F6" strokeWidth="3" filter="url(#shadow)" />
                <g className="lead-card" id="ha-lead-1">
                  <rect x="300" y="150" width="200" height="70" rx="10" fill="#FFFFFF" stroke="#D1D5DB" strokeWidth="2" />
                  <text x="315" y="172" fontFamily="Arial, sans-serif" fontSize="14" fontWeight="600" fill="#1F2937">Lead: Tech GmbH</text>
                  <text x="315" y="190" fontFamily="Arial, sans-serif" fontSize="11" fill="#6B7280">📧 max@tech.de</text>
                  <text x="315" y="207" fontFamily="Arial, sans-serif" fontSize="11" fill="#6B7280">📱 +49 170 123456</text>
                </g>
                <g className="lead-card" id="ha-lead-2">
                  <rect x="300" y="240" width="200" height="70" rx="10" fill="#FFFFFF" stroke="#D1D5DB" strokeWidth="2" />
                  <text x="315" y="262" fontFamily="Arial, sans-serif" fontSize="14" fontWeight="600" fill="#1F2937">Lead: StartUp AG</text>
                  <text x="315" y="280" fontFamily="Arial, sans-serif" fontSize="11" fill="#6B7280">📧 lisa@startup.com</text>
                  <text x="315" y="297" fontFamily="Arial, sans-serif" fontSize="11" fill="#6B7280">📱 +49 151 987654</text>
                </g>
                <g className="lead-card" id="ha-lead-3">
                  <rect x="300" y="330" width="200" height="70" rx="10" fill="#FFFFFF" stroke="#D1D5DB" strokeWidth="2" />
                  <text x="315" y="352" fontFamily="Arial, sans-serif" fontSize="14" fontWeight="600" fill="#1F2937">Lead: Corp Ltd.</text>
                  <text x="315" y="370" fontFamily="Arial, sans-serif" fontSize="11" fill="#6B7280">📧 tom@corp.de</text>
                  <text x="315" y="387" fontFamily="Arial, sans-serif" fontSize="11" fill="#6B7280">📱 +49 160 555777</text>
                </g>
              </g>

              <g id="outreach-section">
                <g className="message" id="ha-msg-1">
                  <rect x="570" y="140" width="160" height="55" rx="10" fill="#10B981" filter="url(#shadow)" />
                  <text x="588" y="160" fontFamily="Arial, sans-serif" fontSize="12" fontWeight="600" fill="#FFFFFF">📧 E-Mail</text>
                  <text x="588" y="177" fontFamily="Arial, sans-serif" fontSize="11" fill="#D1FAE5">Personalisiert</text>
                  <path className="checkmark" id="ha-check-1" d="M 710 155 L 720 165 L 735 145" stroke="#FFFFFF" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </g>
                <g className="message" id="ha-msg-2">
                  <rect x="570" y="210" width="160" height="55" rx="10" fill="#10B981" filter="url(#shadow)" />
                  <text x="588" y="230" fontFamily="Arial, sans-serif" fontSize="12" fontWeight="600" fill="#FFFFFF">📞 Telefon</text>
                  <text x="588" y="247" fontFamily="Arial, sans-serif" fontSize="11" fill="#D1FAE5">Persönlich</text>
                  <path className="checkmark" id="ha-check-2" d="M 710 225 L 720 235 L 735 215" stroke="#FFFFFF" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </g>
                <g className="message" id="ha-msg-3">
                  <rect x="570" y="280" width="160" height="55" rx="10" fill="#10B981" filter="url(#shadow)" />
                  <text x="588" y="300" fontFamily="Arial, sans-serif" fontSize="12" fontWeight="600" fill="#FFFFFF">💼 LinkedIn</text>
                  <text x="588" y="317" fontFamily="Arial, sans-serif" fontSize="11" fill="#D1FAE5">Follow-up</text>
                  <path className="checkmark" id="ha-check-3" d="M 710 295 L 720 305 L 735 285" stroke="#FFFFFF" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </g>
                <g className="message" id="ha-msg-4">
                  <rect x="570" y="350" width="160" height="55" rx="10" fill="#10B981" filter="url(#shadow)" />
                  <text x="588" y="370" fontFamily="Arial, sans-serif" fontSize="12" fontWeight="600" fill="#FFFFFF">💬 WhatsApp</text>
                  <text x="588" y="387" fontFamily="Arial, sans-serif" fontSize="11" fill="#D1FAE5">Automatisch</text>
                  <path className="checkmark" id="ha-check-4" d="M 710 365 L 720 375 L 735 355" stroke="#FFFFFF" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </g>
              </g>

              <g className="success-badge" id="ha-success-badge">
                <circle cx="650" cy="480" r="70" fill="#10B981" filter="url(#shadow)" />
                <circle cx="650" cy="480" r="60" fill="#D1FAE5" />
                <text x="650" y="480" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="34" fontWeight="bold" fill="#059669">4</text>
                <text x="650" y="505" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="13" fontWeight="600" fill="#047857">Kanäle</text>
                <g className="sparkle"><text x="580" y="450" fontSize="22">✨</text></g>
                <g className="sparkle"><text x="710" y="460" fontSize="22">✨</text></g>
                <g className="sparkle"><text x="650" y="550" fontSize="22">✨</text></g>
              </g>

              <g id="ha-arrow-1" style={{ opacity: 0 }}>
                <path d="M 140 270 Q 130 300 120 320" stroke="#F59E0B" strokeWidth="3" fill="none" strokeDasharray="5,5" />
                <polygon points="115,320 120,330 125,320" fill="#F59E0B" />
              </g>
              <g id="ha-arrow-2" style={{ opacity: 0 }}>
                <path d="M 180 350 L 270 290" stroke="#3B82F6" strokeWidth="3" fill="none" strokeDasharray="5,5" />
                <polygon points="270,290 280,285 270,280" fill="#3B82F6" />
              </g>
              <g id="ha-arrow-3" style={{ opacity: 0 }}>
                <path d="M 530 270 L 560 230" stroke="#10B981" strokeWidth="3" fill="none" strokeDasharray="5,5" />
                <polygon points="560,230 570,230 560,220" fill="#10B981" />
              </g>
            </svg>
          </div>
        </div>
      </div>
    </>
  );
};

export default FulfillmentAnimation;
