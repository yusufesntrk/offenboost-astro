import { useEffect, useRef, useState } from "react";

const ANIMATION_STYLES = `
  .sales-wrapper {
    all: initial;
    display: block;
    width: 100%;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  }

  .sales-wrapper .sales-container {
    background: linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%);
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
    .sales-wrapper .sales-container {
      min-height: 320px;
      padding: 16px;
    }
  }

  /* Header */
  .sales-wrapper .sales-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
    opacity: 0;
    transform: translateY(-10px);
  }

  @keyframes header-fade-in {
    to { opacity: 1; transform: translateY(0); }
  }

  .sales-wrapper .sales-header.show {
    animation: header-fade-in 0.5s ease-out forwards;
  }

  .sales-wrapper .header-title {
    font-size: 14px;
    font-weight: 600;
    color: #581c87;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  @media (max-width: 768px) {
    .sales-wrapper .header-title {
      font-size: 12px;
    }
  }

  .sales-wrapper .header-badge {
    background: linear-gradient(135deg, #8b5cf6, #a855f7);
    color: white;
    font-size: 11px;
    font-weight: 600;
    padding: 4px 10px;
    border-radius: 20px;
  }

  /* Funnel Container */
  .sales-wrapper .funnel-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 8px;
    position: relative;
  }

  /* Funnel Stages */
  .sales-wrapper .funnel-stage {
    display: flex;
    align-items: center;
    gap: 12px;
    opacity: 0;
    transform: translateY(-30px);
  }

  @media (max-width: 768px) {
    .sales-wrapper .funnel-stage {
      gap: 8px;
    }
  }

  @keyframes stage-drop {
    0% { opacity: 0; transform: translateY(-30px); }
    60% { transform: translateY(5px); }
    100% { opacity: 1; transform: translateY(0); }
  }

  .sales-wrapper .funnel-stage.drop {
    animation: stage-drop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  }

  .sales-wrapper .stage-bar {
    height: 40px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 16px;
    transition: width 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    width: 0%;
  }

  @media (max-width: 768px) {
    .sales-wrapper .stage-bar {
      height: 32px;
      padding: 0 10px;
    }
  }

  .sales-wrapper .stage-bar.expand {
    width: var(--width);
  }

  .sales-wrapper .stage-label {
    font-size: 13px;
    font-weight: 600;
    color: white;
    white-space: nowrap;
  }

  @media (max-width: 768px) {
    .sales-wrapper .stage-label {
      font-size: 11px;
    }
  }

  .sales-wrapper .stage-count {
    font-size: 14px;
    font-weight: 700;
    color: white;
    min-width: 40px;
    text-align: right;
  }

  @media (max-width: 768px) {
    .sales-wrapper .stage-count {
      font-size: 12px;
      min-width: 30px;
    }
  }

  /* Deal Badge */
  .sales-wrapper .deal-badge {
    position: absolute;
    bottom: 0;
    right: 0;
    background: white;
    border-radius: 12px;
    padding: 12px 16px;
    box-shadow: 0 8px 24px rgba(139, 92, 246, 0.3);
    opacity: 0;
    transform: scale(0);
    display: flex;
    align-items: center;
    gap: 10px;
  }

  @media (max-width: 768px) {
    .sales-wrapper .deal-badge {
      padding: 8px 12px;
      gap: 8px;
    }
  }

  @keyframes badge-pop {
    0% { opacity: 0; transform: scale(0) rotate(-10deg); }
    60% { transform: scale(1.1) rotate(5deg); }
    100% { opacity: 1; transform: scale(1) rotate(0); }
  }

  .sales-wrapper .deal-badge.pop {
    animation: badge-pop 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  }

  @keyframes glow-pulse {
    0%, 100% { box-shadow: 0 8px 24px rgba(139, 92, 246, 0.3); }
    50% { box-shadow: 0 8px 40px rgba(139, 92, 246, 0.6); }
  }

  .sales-wrapper .deal-badge.glow {
    animation: badge-pop 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) forwards,
               glow-pulse 2s ease-in-out infinite 0.7s;
  }

  .sales-wrapper .deal-icon {
    width: 36px;
    height: 36px;
    background: linear-gradient(135deg, #10b981, #34d399);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @media (max-width: 768px) {
    .sales-wrapper .deal-icon {
      width: 28px;
      height: 28px;
    }
  }

  .sales-wrapper .deal-info {
    display: flex;
    flex-direction: column;
  }

  .sales-wrapper .deal-label {
    font-size: 11px;
    color: #64748b;
    font-weight: 500;
  }

  @media (max-width: 768px) {
    .sales-wrapper .deal-label {
      font-size: 9px;
    }
  }

  .sales-wrapper .deal-value {
    font-size: 18px;
    font-weight: 700;
    color: #8b5cf6;
  }

  @media (max-width: 768px) {
    .sales-wrapper .deal-value {
      font-size: 14px;
    }
  }

  /* Connecting dots animation */
  .sales-wrapper .dot {
    position: absolute;
    width: 8px;
    height: 8px;
    background: #8b5cf6;
    border-radius: 50%;
    opacity: 0;
  }

  @keyframes dot-flow {
    0% { opacity: 0; transform: translateY(0); }
    20% { opacity: 1; }
    80% { opacity: 1; }
    100% { opacity: 0; transform: translateY(200px); }
  }

  .sales-wrapper .dot.flow {
    animation: dot-flow 2s ease-in-out forwards;
  }
`;

const stages = [
  { label: "Leads", count: 1250, width: "100%", color: "linear-gradient(90deg, #c4b5fd, #a78bfa)" },
  { label: "Qualifiziert", count: 480, width: "75%", color: "linear-gradient(90deg, #a78bfa, #8b5cf6)" },
  { label: "Angebot", count: 156, width: "50%", color: "linear-gradient(90deg, #8b5cf6, #7c3aed)" },
  { label: "Verhandlung", count: 48, width: "30%", color: "linear-gradient(90deg, #7c3aed, #6d28d9)" },
];

const SalesAnimation = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [counts, setCounts] = useState([0, 0, 0, 0]);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const header = wrapper.querySelector(".sales-header");
    const funnelStages = wrapper.querySelectorAll(".funnel-stage");
    const stageBars = wrapper.querySelectorAll(".stage-bar");
    const dealBadge = wrapper.querySelector(".deal-badge");

    let intervalId: ReturnType<typeof setInterval> | null = null;

    const resetAnimation = () => {
      header?.classList.remove("show");
      funnelStages.forEach((stage) => stage.classList.remove("drop"));
      stageBars.forEach((bar) => bar.classList.remove("expand"));
      dealBadge?.classList.remove("pop", "glow");
      setCounts([0, 0, 0, 0]);
    };

    const animateCount = (index: number, target: number, delay: number) => {
      setTimeout(() => {
        const duration = 800;
        const start = Date.now();
        const animate = () => {
          const elapsed = Date.now() - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCounts((prev) => {
            const newCounts = [...prev];
            newCounts[index] = Math.round(target * eased);
            return newCounts;
          });
          if (progress < 1) requestAnimationFrame(animate);
        };
        animate();
      }, delay);
    };

    const runAnimation = () => {
      // Header
      setTimeout(() => header?.classList.add("show"), 200);

      // Funnel stages drop in
      funnelStages.forEach((stage, i) => {
        setTimeout(() => {
          stage.classList.add("drop");
        }, 400 + i * 200);
      });

      // Stage bars expand
      stageBars.forEach((bar, i) => {
        setTimeout(() => {
          bar.classList.add("expand");
        }, 600 + i * 200);
      });

      // Animate counts
      stages.forEach((stage, i) => {
        animateCount(i, stage.count, 700 + i * 200);
      });

      // Deal badge
      setTimeout(() => {
        dealBadge?.classList.add("pop");
        setTimeout(() => dealBadge?.classList.add("glow"), 700);
      }, 2000);
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
      <div className="sales-wrapper">
        <div className="sales-container">
          {/* Header */}
          <div className="sales-header">
            <div className="header-title">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#8b5cf6"
                strokeWidth="2"
              >
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
              Sales Pipeline
            </div>
            <div className="header-badge">Q4 2024</div>
          </div>

          {/* Funnel */}
          <div className="funnel-container">
            {stages.map((stage, i) => (
              <div key={i} className="funnel-stage">
                <div
                  className="stage-bar"
                  style={{ "--width": stage.width, background: stage.color } as React.CSSProperties}
                >
                  <span className="stage-label">{stage.label}</span>
                  <span className="stage-count">{counts[i].toLocaleString()}</span>
                </div>
              </div>
            ))}

            {/* Deal Badge */}
            <div className="deal-badge">
              <div className="deal-icon">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2.5"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <div className="deal-info">
                <span className="deal-label">Abgeschlossen</span>
                <span className="deal-value">23 Deals</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesAnimation;
