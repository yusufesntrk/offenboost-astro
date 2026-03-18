import { useEffect, useRef } from "react";

const ANIMATION_STYLES = `
  .beratung-wrapper {
    all: initial;
    display: block;
    width: 100%;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  }

  .beratung-wrapper .beratung-container {
    background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);
    border-radius: 16px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
    width: 100%;
    min-height: 400px;
    overflow: hidden;
    padding: 24px;
    display: flex;
    flex-direction: column;
  }

  @media (max-width: 768px) {
    .beratung-wrapper .beratung-container {
      min-height: 320px;
      padding: 16px;
    }
  }

  /* Header */
  .beratung-wrapper .beratung-header {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    font-weight: 600;
    color: #065f46;
    margin-bottom: 20px;
    opacity: 0;
  }

  @media (max-width: 768px) {
    .beratung-wrapper .beratung-header {
      font-size: 12px;
      margin-bottom: 16px;
    }
  }

  @keyframes fade-in {
    to { opacity: 1; }
  }

  .beratung-wrapper .beratung-header.show {
    animation: fade-in 0.5s ease-out forwards;
  }

  /* Timeline Container */
  .beratung-wrapper .timeline {
    flex: 1;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  /* Timeline Line */
  .beratung-wrapper .timeline-line {
    position: absolute;
    left: 20px;
    top: 20px;
    bottom: 60px;
    width: 3px;
    background: #a7f3d0;
    overflow: hidden;
  }

  @media (max-width: 768px) {
    .beratung-wrapper .timeline-line {
      left: 16px;
    }
  }

  .beratung-wrapper .timeline-progress {
    width: 100%;
    height: 0%;
    background: linear-gradient(180deg, #10b981, #34d399);
    transition: height 2s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .beratung-wrapper .timeline-progress.fill {
    height: 100%;
  }

  /* Milestone */
  .beratung-wrapper .milestone {
    display: flex;
    align-items: flex-start;
    gap: 16px;
    position: relative;
    z-index: 1;
    opacity: 0;
    transform: translateX(-20px);
  }

  @media (max-width: 768px) {
    .beratung-wrapper .milestone {
      gap: 12px;
    }
  }

  @keyframes milestone-in {
    to { opacity: 1; transform: translateX(0); }
  }

  .beratung-wrapper .milestone.show {
    animation: milestone-in 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  }

  .beratung-wrapper .milestone-dot {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: white;
    border: 3px solid #a7f3d0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: all 0.3s ease;
  }

  @media (max-width: 768px) {
    .beratung-wrapper .milestone-dot {
      width: 32px;
      height: 32px;
      border-width: 2px;
    }
  }

  .beratung-wrapper .milestone-dot.active {
    background: #10b981;
    border-color: #10b981;
  }

  .beratung-wrapper .milestone-check {
    opacity: 0;
    transform: scale(0);
  }

  @keyframes check-pop {
    0% { opacity: 0; transform: scale(0); }
    60% { transform: scale(1.3); }
    100% { opacity: 1; transform: scale(1); }
  }

  .beratung-wrapper .milestone-check.check {
    animation: check-pop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  }

  .beratung-wrapper .milestone-content {
    flex: 1;
    background: white;
    border-radius: 12px;
    padding: 14px 16px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }

  @media (max-width: 768px) {
    .beratung-wrapper .milestone-content {
      padding: 10px 12px;
    }
  }

  .beratung-wrapper .milestone-title {
    font-size: 14px;
    font-weight: 600;
    color: #1e293b;
    margin-bottom: 4px;
  }

  @media (max-width: 768px) {
    .beratung-wrapper .milestone-title {
      font-size: 12px;
    }
  }

  .beratung-wrapper .milestone-desc {
    font-size: 12px;
    color: #64748b;
  }

  @media (max-width: 768px) {
    .beratung-wrapper .milestone-desc {
      font-size: 10px;
    }
  }

  /* Goal Badge */
  .beratung-wrapper .goal-badge {
    display: flex;
    align-items: center;
    gap: 12px;
    background: white;
    border-radius: 12px;
    padding: 16px;
    margin-left: 56px;
    box-shadow: 0 8px 24px rgba(16, 185, 129, 0.2);
    opacity: 0;
    transform: scale(0);
  }

  @media (max-width: 768px) {
    .beratung-wrapper .goal-badge {
      margin-left: 44px;
      padding: 12px;
      gap: 10px;
    }
  }

  @keyframes badge-pop {
    0% { opacity: 0; transform: scale(0) rotate(-5deg); }
    60% { transform: scale(1.05) rotate(2deg); }
    100% { opacity: 1; transform: scale(1) rotate(0); }
  }

  .beratung-wrapper .goal-badge.pop {
    animation: badge-pop 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  }

  @keyframes glow-pulse {
    0%, 100% { box-shadow: 0 8px 24px rgba(16, 185, 129, 0.2); }
    50% { box-shadow: 0 8px 40px rgba(16, 185, 129, 0.5); }
  }

  .beratung-wrapper .goal-badge.glow {
    animation: badge-pop 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) forwards,
               glow-pulse 2s ease-in-out infinite 0.7s;
  }

  .beratung-wrapper .goal-icon {
    width: 44px;
    height: 44px;
    background: linear-gradient(135deg, #10b981, #34d399);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  @media (max-width: 768px) {
    .beratung-wrapper .goal-icon {
      width: 36px;
      height: 36px;
    }
  }

  .beratung-wrapper .goal-info {
    display: flex;
    flex-direction: column;
  }

  .beratung-wrapper .goal-label {
    font-size: 11px;
    color: #64748b;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  @media (max-width: 768px) {
    .beratung-wrapper .goal-label {
      font-size: 9px;
    }
  }

  .beratung-wrapper .goal-title {
    font-size: 18px;
    font-weight: 700;
    color: #10b981;
  }

  @media (max-width: 768px) {
    .beratung-wrapper .goal-title {
      font-size: 14px;
    }
  }

  /* Sparkles */
  .beratung-wrapper .sparkle {
    position: absolute;
    opacity: 0;
  }

  @keyframes sparkle {
    0%, 100% { opacity: 0; transform: scale(0) rotate(0deg); }
    50% { opacity: 1; transform: scale(1) rotate(180deg); }
  }

  .beratung-wrapper .sparkle.sparkle-animate {
    animation: sparkle 1.5s ease-in-out infinite;
  }
`;

const milestones = [
  { title: "Analyse", desc: "Ist-Zustand & Ziele definieren" },
  { title: "Strategie", desc: "Maßnahmenplan entwickeln" },
  { title: "Umsetzung", desc: "Schritt für Schritt implementieren" },
];

const BeratungAnimation = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const header = wrapper.querySelector(".beratung-header");
    const timelineProgress = wrapper.querySelector(".timeline-progress");
    const milestoneEls = wrapper.querySelectorAll(".milestone");
    const milestoneDots = wrapper.querySelectorAll(".milestone-dot");
    const milestoneChecks = wrapper.querySelectorAll(".milestone-check");
    const goalBadge = wrapper.querySelector(".goal-badge");
    const sparkles = wrapper.querySelectorAll(".sparkle");

    let intervalId: ReturnType<typeof setInterval> | null = null;

    const resetAnimation = () => {
      header?.classList.remove("show");
      timelineProgress?.classList.remove("fill");
      milestoneEls.forEach((el) => el.classList.remove("show"));
      milestoneDots.forEach((dot) => dot.classList.remove("active"));
      milestoneChecks.forEach((check) => check.classList.remove("check"));
      goalBadge?.classList.remove("pop", "glow");
      sparkles.forEach((s) => s.classList.remove("sparkle-animate"));
    };

    const runAnimation = () => {
      // Header
      setTimeout(() => header?.classList.add("show"), 100);

      // Timeline progress
      setTimeout(() => timelineProgress?.classList.add("fill"), 400);

      // Milestones appear sequentially
      milestoneEls.forEach((el, i) => {
        setTimeout(() => {
          el.classList.add("show");
        }, 600 + i * 500);

        setTimeout(() => {
          milestoneDots[i]?.classList.add("active");
          milestoneChecks[i]?.classList.add("check");
        }, 900 + i * 500);
      });

      // Goal badge
      setTimeout(() => {
        goalBadge?.classList.add("pop");
        setTimeout(() => goalBadge?.classList.add("glow"), 700);
      }, 2600);

      // Sparkles
      setTimeout(() => {
        sparkles.forEach((s, i) => {
          setTimeout(() => s.classList.add("sparkle-animate"), i * 200);
        });
      }, 3000);
    };

    // IntersectionObserver - Animation startet erst wenn sichtbar
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setTimeout(runAnimation, 200);

          intervalId = setInterval(() => {
            resetAnimation();
            setTimeout(runAnimation, 500);
          }, 10000);

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
      <div className="beratung-wrapper">
        <div className="beratung-container">
          {/* Header */}
          <div className="beratung-header">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#10b981"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            Strategische Roadmap
          </div>

          {/* Timeline */}
          <div className="timeline">
            {/* Vertical Line */}
            <div className="timeline-line">
              <div className="timeline-progress" />
            </div>

            {/* Milestones */}
            {milestones.map((milestone, i) => (
              <div key={i} className="milestone">
                <div className="milestone-dot">
                  <svg
                    className="milestone-check"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="3"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <div className="milestone-content">
                  <div className="milestone-title">{milestone.title}</div>
                  <div className="milestone-desc">{milestone.desc}</div>
                </div>
              </div>
            ))}

            {/* Goal Badge */}
            <div className="goal-badge" style={{ position: "relative" }}>
              <div className="goal-icon">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="8" r="6" />
                  <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
                </svg>
              </div>
              <div className="goal-info">
                <span className="goal-label">Ziel erreicht</span>
                <span className="goal-title">Wachstum</span>
              </div>

              {/* Sparkles */}
              <svg
                className="sparkle"
                style={{ top: "-8px", right: "-8px" }}
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="#fbbf24"
              >
                <polygon points="12,2 15,9 22,9 16,14 18,22 12,17 6,22 8,14 2,9 9,9" />
              </svg>
              <svg
                className="sparkle"
                style={{ top: "50%", right: "-16px", animationDelay: "0.3s" }}
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="#fbbf24"
              >
                <polygon points="12,2 15,9 22,9 16,14 18,22 12,17 6,22 8,14 2,9 9,9" />
              </svg>
              <svg
                className="sparkle"
                style={{ bottom: "-8px", right: "20%", animationDelay: "0.6s" }}
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="#fbbf24"
              >
                <polygon points="12,2 15,9 22,9 16,14 18,22 12,17 6,22 8,14 2,9 9,9" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeratungAnimation;
