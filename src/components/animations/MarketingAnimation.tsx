import { useEffect, useRef, useState } from "react";

const ANIMATION_STYLES = `
  .marketing-wrapper {
    all: initial;
    display: block;
    width: 100%;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  }

  .marketing-wrapper .marketing-container {
    background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
    border-radius: 16px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
    width: 100%;
    min-height: 400px;
    overflow: hidden;
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  @media (max-width: 768px) {
    .marketing-wrapper .marketing-container {
      min-height: 320px;
      padding: 16px;
      gap: 12px;
    }
  }

  /* KPI Cards */
  .marketing-wrapper .kpi-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
  }

  @media (max-width: 768px) {
    .marketing-wrapper .kpi-grid {
      gap: 8px;
    }
  }

  .marketing-wrapper .kpi-card {
    background: white;
    border-radius: 12px;
    padding: 16px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    opacity: 0;
    transform: translateY(20px);
  }

  @media (max-width: 768px) {
    .marketing-wrapper .kpi-card {
      padding: 10px;
    }
  }

  @keyframes kpi-fly-in {
    0% { opacity: 0; transform: translateY(20px); }
    100% { opacity: 1; transform: translateY(0); }
  }

  .marketing-wrapper .kpi-card.show {
    animation: kpi-fly-in 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  }

  .marketing-wrapper .kpi-label {
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: #64748b;
    margin-bottom: 4px;
  }

  @media (max-width: 768px) {
    .marketing-wrapper .kpi-label {
      font-size: 9px;
    }
  }

  .marketing-wrapper .kpi-value {
    font-size: 28px;
    font-weight: 700;
    color: #1e293b;
  }

  @media (max-width: 768px) {
    .marketing-wrapper .kpi-value {
      font-size: 20px;
    }
  }

  .marketing-wrapper .kpi-change {
    font-size: 12px;
    font-weight: 500;
    color: #10b981;
    display: flex;
    align-items: center;
    gap: 2px;
    margin-top: 4px;
  }

  @media (max-width: 768px) {
    .marketing-wrapper .kpi-change {
      font-size: 10px;
    }
  }

  /* Progress Section */
  .marketing-wrapper .progress-section {
    background: white;
    border-radius: 12px;
    padding: 16px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    opacity: 0;
    transform: translateX(-20px);
    flex: 1;
  }

  @media (max-width: 768px) {
    .marketing-wrapper .progress-section {
      padding: 12px;
    }
  }

  @keyframes section-fly-in {
    0% { opacity: 0; transform: translateX(-20px); }
    100% { opacity: 1; transform: translateX(0); }
  }

  .marketing-wrapper .progress-section.show {
    animation: section-fly-in 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  }

  .marketing-wrapper .section-title {
    font-size: 13px;
    font-weight: 600;
    color: #334155;
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  @media (max-width: 768px) {
    .marketing-wrapper .section-title {
      font-size: 11px;
      margin-bottom: 8px;
    }
  }

  .marketing-wrapper .progress-row {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 10px;
  }

  @media (max-width: 768px) {
    .marketing-wrapper .progress-row {
      gap: 8px;
      margin-bottom: 8px;
    }
  }

  .marketing-wrapper .progress-label {
    font-size: 12px;
    color: #64748b;
    min-width: 80px;
  }

  @media (max-width: 768px) {
    .marketing-wrapper .progress-label {
      font-size: 10px;
      min-width: 60px;
    }
  }

  .marketing-wrapper .progress-bar {
    flex: 1;
    height: 8px;
    background: #e2e8f0;
    border-radius: 4px;
    overflow: hidden;
  }

  .marketing-wrapper .progress-fill {
    height: 100%;
    border-radius: 4px;
    width: 0%;
    transition: width 1s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .marketing-wrapper .progress-fill.animate {
    width: var(--progress);
  }

  .marketing-wrapper .progress-value {
    font-size: 12px;
    font-weight: 600;
    color: #334155;
    min-width: 36px;
    text-align: right;
  }

  @media (max-width: 768px) {
    .marketing-wrapper .progress-value {
      font-size: 10px;
      min-width: 28px;
    }
  }

  /* Chart Section */
  .marketing-wrapper .chart-section {
    background: white;
    border-radius: 12px;
    padding: 16px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    opacity: 0;
    transform: translateY(20px);
  }

  @media (max-width: 768px) {
    .marketing-wrapper .chart-section {
      padding: 12px;
    }
  }

  .marketing-wrapper .chart-section.show {
    animation: kpi-fly-in 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  }

  .marketing-wrapper .chart-line {
    stroke-dasharray: 400;
    stroke-dashoffset: 400;
  }

  @keyframes draw-line {
    to { stroke-dashoffset: 0; }
  }

  .marketing-wrapper .chart-line.draw {
    animation: draw-line 1.5s ease-out forwards;
  }

  /* Glow effect for badges */
  @keyframes glow-pulse {
    0%, 100% { box-shadow: 0 0 8px rgba(16, 185, 129, 0.4); }
    50% { box-shadow: 0 0 20px rgba(16, 185, 129, 0.8); }
  }

  .marketing-wrapper .glow {
    animation: glow-pulse 2s ease-in-out infinite;
  }
`;

const MarketingAnimation = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [counters, setCounters] = useState({ leads: 0, conversion: 0, roi: 0 });

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const kpiCards = wrapper.querySelectorAll(".kpi-card");
    const progressSection = wrapper.querySelector(".progress-section");
    const progressFills = wrapper.querySelectorAll(".progress-fill");
    const chartSection = wrapper.querySelector(".chart-section");
    const chartLine = wrapper.querySelector(".chart-line");

    let intervalId: ReturnType<typeof setInterval> | null = null;

    const resetAnimation = () => {
      kpiCards.forEach((card) => card.classList.remove("show"));
      progressSection?.classList.remove("show");
      progressFills.forEach((fill) => fill.classList.remove("animate"));
      chartSection?.classList.remove("show");
      chartLine?.classList.remove("draw");
      setCounters({ leads: 0, conversion: 0, roi: 0 });
    };

    const animateCounter = (
      key: "leads" | "conversion" | "roi",
      target: number,
      duration: number
    ) => {
      const start = Date.now();
      const animate = () => {
        const elapsed = Date.now() - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setCounters((prev) => ({
          ...prev,
          [key]: Math.round(target * eased),
        }));
        if (progress < 1) requestAnimationFrame(animate);
      };
      animate();
    };

    const runAnimation = () => {
      // KPI Cards fly in
      kpiCards.forEach((card, i) => {
        setTimeout(() => card.classList.add("show"), 200 + i * 150);
      });

      // Counter animations
      setTimeout(() => animateCounter("leads", 847, 1500), 400);
      setTimeout(() => animateCounter("conversion", 12, 1200), 550);
      setTimeout(() => animateCounter("roi", 340, 1400), 700);

      // Progress section
      setTimeout(() => progressSection?.classList.add("show"), 800);

      // Progress bars animate
      progressFills.forEach((fill, i) => {
        setTimeout(() => fill.classList.add("animate"), 1200 + i * 150);
      });

      // Chart section
      setTimeout(() => chartSection?.classList.add("show"), 1600);
      setTimeout(() => chartLine?.classList.add("draw"), 2000);
    };

    // IntersectionObserver - Animation startet erst wenn sichtbar
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // Erst beim Sichtbarwerden starten
          setTimeout(runAnimation, 200);

          // Loop starten
          intervalId = setInterval(() => {
            resetAnimation();
            setTimeout(runAnimation, 500);
          }, 10000);

          // Observer disconnecten - wir brauchen ihn nicht mehr
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(wrapper);

    return () => {
      observer.disconnect();
      if (intervalId) clearInterval(intervalId);
    };
  }, []);

  return (
    <div ref={wrapperRef}>
      <style>{ANIMATION_STYLES}</style>
      <div className="marketing-wrapper">
        <div className="marketing-container">
          {/* KPI Cards */}
          <div className="kpi-grid">
            <div className="kpi-card" data-order="1">
              <div className="kpi-label">Neue Leads</div>
              <div className="kpi-value">{counters.leads}</div>
              <div className="kpi-change">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                </svg>
                +23%
              </div>
            </div>
            <div className="kpi-card" data-order="2">
              <div className="kpi-label">Conversion</div>
              <div className="kpi-value">{counters.conversion}%</div>
              <div className="kpi-change">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                </svg>
                +4.2%
              </div>
            </div>
            <div className="kpi-card" data-order="3">
              <div className="kpi-label">ROI</div>
              <div className="kpi-value">{counters.roi}%</div>
              <div className="kpi-change glow" style={{ borderRadius: "4px", padding: "2px 6px", background: "rgba(16, 185, 129, 0.1)" }}>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                </svg>
                +89%
              </div>
            </div>
          </div>

          {/* Progress Section */}
          <div className="progress-section">
            <div className="section-title">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#3b82f6"
                strokeWidth="2"
              >
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
              Kampagnen-Performance
            </div>
            <div className="progress-row">
              <span className="progress-label">Google Ads</span>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={
                    { "--progress": "78%", background: "linear-gradient(90deg, #3b82f6, #60a5fa)" } as React.CSSProperties
                  }
                />
              </div>
              <span className="progress-value">78%</span>
            </div>
            <div className="progress-row">
              <span className="progress-label">Meta Ads</span>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={
                    { "--progress": "65%", background: "linear-gradient(90deg, #8b5cf6, #a78bfa)" } as React.CSSProperties
                  }
                />
              </div>
              <span className="progress-value">65%</span>
            </div>
            <div className="progress-row">
              <span className="progress-label">SEO</span>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={
                    { "--progress": "92%", background: "linear-gradient(90deg, #10b981, #34d399)" } as React.CSSProperties
                  }
                />
              </div>
              <span className="progress-value">92%</span>
            </div>
          </div>

          {/* Chart Section */}
          <div className="chart-section">
            <div className="section-title">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#10b981"
                strokeWidth="2"
              >
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
              </svg>
              Wachstumstrend
            </div>
            <svg
              viewBox="0 0 300 80"
              style={{ width: "100%", height: "60px" }}
            >
              <defs>
                <linearGradient id="chartGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#10b981" />
                </linearGradient>
              </defs>
              <path
                className="chart-line"
                d="M 10 60 Q 50 55, 80 45 T 140 35 T 200 25 T 260 15 T 290 10"
                fill="none"
                stroke="url(#chartGradient)"
                strokeWidth="3"
                strokeLinecap="round"
              />
              {/* Data points */}
              <circle cx="10" cy="60" r="4" fill="#3b82f6" opacity="0.8" />
              <circle cx="80" cy="45" r="4" fill="#5b9cf6" opacity="0.8" />
              <circle cx="140" cy="35" r="4" fill="#7bb5f6" opacity="0.8" />
              <circle cx="200" cy="25" r="4" fill="#10b981" opacity="0.8" />
              <circle cx="290" cy="10" r="5" fill="#10b981" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketingAnimation;
