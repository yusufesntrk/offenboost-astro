import { useEffect, useRef, useState } from "react";

const ANIMATION_STYLES = `
  .webdev-wrapper {
    all: initial;
    display: block;
    width: 100%;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  }

  .webdev-wrapper .webdev-container {
    background: linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%);
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
    .webdev-wrapper .webdev-container {
      min-height: 320px;
      padding: 16px;
      gap: 12px;
    }
  }

  /* Header */
  .webdev-wrapper .webdev-header {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    font-weight: 600;
    color: #9a3412;
    opacity: 0;
  }

  @media (max-width: 768px) {
    .webdev-wrapper .webdev-header {
      font-size: 12px;
    }
  }

  @keyframes fade-in {
    to { opacity: 1; }
  }

  .webdev-wrapper .webdev-header.show {
    animation: fade-in 0.5s ease-out forwards;
  }

  /* Main Content */
  .webdev-wrapper .main-content {
    flex: 1;
    display: flex;
    gap: 12px;
    align-items: stretch;
  }

  @media (max-width: 768px) {
    .webdev-wrapper .main-content {
      flex-direction: column;
      gap: 8px;
    }
  }

  /* Code Editor */
  .webdev-wrapper .code-editor {
    flex: 1;
    background: #1e293b;
    border-radius: 12px;
    overflow: hidden;
    opacity: 0;
    transform: translateX(-20px);
  }

  @keyframes slide-in-left {
    to { opacity: 1; transform: translateX(0); }
  }

  .webdev-wrapper .code-editor.show {
    animation: slide-in-left 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  }

  .webdev-wrapper .editor-header {
    background: #334155;
    padding: 8px 12px;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .webdev-wrapper .editor-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
  }

  .webdev-wrapper .editor-dot.red { background: #ef4444; }
  .webdev-wrapper .editor-dot.yellow { background: #f59e0b; }
  .webdev-wrapper .editor-dot.green { background: #10b981; }

  .webdev-wrapper .editor-content {
    padding: 12px;
    font-family: "SF Mono", "Fira Code", monospace;
    font-size: 11px;
    line-height: 1.6;
  }

  @media (max-width: 768px) {
    .webdev-wrapper .editor-content {
      font-size: 9px;
      padding: 8px;
    }
  }

  .webdev-wrapper .code-line {
    opacity: 0;
    transform: translateX(-10px);
  }

  @keyframes type-in {
    to { opacity: 1; transform: translateX(0); }
  }

  .webdev-wrapper .code-line.type {
    animation: type-in 0.3s ease-out forwards;
  }

  .webdev-wrapper .code-tag { color: #f97316; }
  .webdev-wrapper .code-attr { color: #a78bfa; }
  .webdev-wrapper .code-value { color: #34d399; }
  .webdev-wrapper .code-text { color: #e2e8f0; }

  /* Arrow */
  .webdev-wrapper .arrow-container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    opacity: 0;
    transform: scale(0);
  }

  @media (max-width: 768px) {
    .webdev-wrapper .arrow-container {
      width: 100%;
      height: 30px;
      transform: rotate(90deg) scale(0);
    }
  }

  @keyframes arrow-pop {
    0% { opacity: 0; transform: scale(0); }
    60% { transform: scale(1.2); }
    100% { opacity: 1; transform: scale(1); }
  }

  @media (max-width: 768px) {
    @keyframes arrow-pop {
      0% { opacity: 0; transform: rotate(90deg) scale(0); }
      60% { transform: rotate(90deg) scale(1.2); }
      100% { opacity: 1; transform: rotate(90deg) scale(1); }
    }
  }

  .webdev-wrapper .arrow-container.show {
    animation: arrow-pop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  }

  @keyframes pulse-glow {
    0%, 100% { filter: drop-shadow(0 0 4px rgba(249, 115, 22, 0.4)); }
    50% { filter: drop-shadow(0 0 12px rgba(249, 115, 22, 0.8)); }
  }

  .webdev-wrapper .arrow-container.glow svg {
    animation: pulse-glow 1.5s ease-in-out infinite;
  }

  /* Browser Preview */
  .webdev-wrapper .browser-preview {
    flex: 1;
    background: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    opacity: 0;
    transform: translateX(20px);
  }

  @keyframes slide-in-right {
    to { opacity: 1; transform: translateX(0); }
  }

  .webdev-wrapper .browser-preview.show {
    animation: slide-in-right 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  }

  .webdev-wrapper .browser-header {
    background: #f1f5f9;
    padding: 8px 12px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .webdev-wrapper .browser-dots {
    display: flex;
    gap: 4px;
  }

  .webdev-wrapper .browser-url {
    flex: 1;
    background: white;
    border-radius: 4px;
    padding: 4px 8px;
    font-size: 10px;
    color: #64748b;
  }

  @media (max-width: 768px) {
    .webdev-wrapper .browser-url {
      font-size: 8px;
    }
  }

  .webdev-wrapper .browser-content {
    padding: 12px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  @media (max-width: 768px) {
    .webdev-wrapper .browser-content {
      padding: 8px;
      gap: 6px;
    }
  }

  .webdev-wrapper .preview-element {
    opacity: 0;
    transform: scale(0.8);
  }

  @keyframes element-pop {
    0% { opacity: 0; transform: scale(0.8); }
    60% { transform: scale(1.05); }
    100% { opacity: 1; transform: scale(1); }
  }

  .webdev-wrapper .preview-element.render {
    animation: element-pop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  }

  .webdev-wrapper .preview-nav {
    height: 24px;
    background: linear-gradient(90deg, #f97316, #fb923c);
    border-radius: 4px;
  }

  .webdev-wrapper .preview-hero {
    height: 50px;
    background: linear-gradient(135deg, #fef3c7, #fde68a);
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
    font-weight: 600;
    color: #92400e;
  }

  @media (max-width: 768px) {
    .webdev-wrapper .preview-hero {
      height: 36px;
      font-size: 8px;
    }
  }

  .webdev-wrapper .preview-cards {
    display: flex;
    gap: 6px;
  }

  .webdev-wrapper .preview-card {
    flex: 1;
    height: 36px;
    background: #f1f5f9;
    border-radius: 4px;
  }

  @media (max-width: 768px) {
    .webdev-wrapper .preview-card {
      height: 28px;
    }
  }

  .webdev-wrapper .preview-footer {
    height: 20px;
    background: #1e293b;
    border-radius: 4px;
  }

  /* Success Badge */
  .webdev-wrapper .success-badge {
    position: absolute;
    bottom: 16px;
    right: 16px;
    background: linear-gradient(135deg, #10b981, #34d399);
    color: white;
    padding: 8px 14px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 6px;
    opacity: 0;
    transform: scale(0);
    box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);
  }

  @media (max-width: 768px) {
    .webdev-wrapper .success-badge {
      font-size: 10px;
      padding: 6px 10px;
      bottom: 8px;
      right: 8px;
    }
  }

  .webdev-wrapper .success-badge.pop {
    animation: arrow-pop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  }
`;

const codeLines = [
  { content: '<div class="hero">', indent: 0 },
  { content: '<h1>Willkommen</h1>', indent: 1 },
  { content: '<button>CTA</button>', indent: 1 },
  { content: '</div>', indent: 0 },
  { content: '<section class="cards">', indent: 0 },
  { content: '<!-- 3 Feature Cards -->', indent: 1 },
  { content: '</section>', indent: 0 },
];

const WebdevAnimation = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [, setRenderKey] = useState(0);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const header = wrapper.querySelector(".webdev-header");
    const codeEditor = wrapper.querySelector(".code-editor");
    const codeLineElements = wrapper.querySelectorAll(".code-line");
    const arrow = wrapper.querySelector(".arrow-container");
    const browser = wrapper.querySelector(".browser-preview");
    const previewElements = wrapper.querySelectorAll(".preview-element");
    const successBadge = wrapper.querySelector(".success-badge");

    let intervalId: ReturnType<typeof setInterval> | null = null;

    const resetAnimation = () => {
      header?.classList.remove("show");
      codeEditor?.classList.remove("show");
      codeLineElements.forEach((line) => line.classList.remove("type"));
      arrow?.classList.remove("show", "glow");
      browser?.classList.remove("show");
      previewElements.forEach((el) => el.classList.remove("render"));
      successBadge?.classList.remove("pop");
      setRenderKey((k) => k + 1);
    };

    const runAnimation = () => {
      // Header
      setTimeout(() => header?.classList.add("show"), 100);

      // Code editor slides in
      setTimeout(() => codeEditor?.classList.add("show"), 300);

      // Code lines type in
      codeLineElements.forEach((line, i) => {
        setTimeout(() => line.classList.add("type"), 600 + i * 200);
      });

      // Arrow appears
      setTimeout(() => {
        arrow?.classList.add("show");
        setTimeout(() => arrow?.classList.add("glow"), 500);
      }, 2000);

      // Browser slides in
      setTimeout(() => browser?.classList.add("show"), 2200);

      // Preview elements render
      previewElements.forEach((el, i) => {
        setTimeout(() => el.classList.add("render"), 2600 + i * 200);
      });

      // Success badge
      setTimeout(() => successBadge?.classList.add("pop"), 3800);
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
      <div className="webdev-wrapper">
        <div className="webdev-container" style={{ position: "relative" }}>
          {/* Header */}
          <div className="webdev-header">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#f97316"
              strokeWidth="2"
            >
              <polyline points="16 18 22 12 16 6" />
              <polyline points="8 6 2 12 8 18" />
            </svg>
            Code to Website
          </div>

          {/* Main Content */}
          <div className="main-content">
            {/* Code Editor */}
            <div className="code-editor">
              <div className="editor-header">
                <div className="editor-dot red" />
                <div className="editor-dot yellow" />
                <div className="editor-dot green" />
              </div>
              <div className="editor-content">
                {codeLines.map((line, i) => (
                  <div
                    key={i}
                    className="code-line"
                    style={{ paddingLeft: `${line.indent * 16}px` }}
                  >
                    {line.content.includes("<!--") ? (
                      <span style={{ color: "#64748b" }}>{line.content}</span>
                    ) : (
                      <>
                        <span className="code-tag">
                          {line.content.match(/<\/?[\w-]+/)?.[0]}
                        </span>
                        {line.content.includes('class="') && (
                          <>
                            <span className="code-attr"> class</span>
                            <span className="code-text">=</span>
                            <span className="code-value">
                              "{line.content.match(/class="([^"]+)"/)?.[1]}"
                            </span>
                          </>
                        )}
                        {line.content.match(/>([^<]+)</)?.[1] && (
                          <span className="code-text">
                            &gt;{line.content.match(/>([^<]+)</)?.[1]}
                          </span>
                        )}
                        {line.content.endsWith(">") && !line.content.includes("</") && (
                          <span className="code-tag">&gt;</span>
                        )}
                        {line.content.includes("</") && (
                          <span className="code-tag">
                            {line.content.match(/<\/[\w-]+>/)?.[0]}
                          </span>
                        )}
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Arrow */}
            <div className="arrow-container">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#f97316"
                strokeWidth="2.5"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </div>

            {/* Browser Preview */}
            <div className="browser-preview">
              <div className="browser-header">
                <div className="browser-dots">
                  <div className="editor-dot red" />
                  <div className="editor-dot yellow" />
                  <div className="editor-dot green" />
                </div>
                <div className="browser-url">https://meine-website.de</div>
              </div>
              <div className="browser-content">
                <div className="preview-element preview-nav" />
                <div className="preview-element preview-hero">Willkommen</div>
                <div className="preview-cards">
                  <div className="preview-element preview-card" />
                  <div className="preview-element preview-card" />
                  <div className="preview-element preview-card" />
                </div>
                <div className="preview-element preview-footer" />
              </div>
            </div>
          </div>

          {/* Success Badge */}
          <div className="success-badge">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Live!
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebdevAnimation;
