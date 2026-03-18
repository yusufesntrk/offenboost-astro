import { useEffect, useRef } from 'react';

const CalendarAnimation = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wrapperRef.current) return;

    const allEvents = wrapperRef.current.querySelectorAll('.cal-event');
    const eventsList: { element: Element; order: number }[] = [];

    allEvents.forEach(event => {
      const order = parseInt(event.getAttribute('data-order') || '0');
      eventsList.push({ element: event, order: order });
    });

    // Sort by order
    eventsList.sort((a, b) => a.order - b.order);

    // Show events with animation
    const showEvents = () => {
      eventsList.forEach((item, index) => {
        setTimeout(() => {
          item.element.classList.add('show');
        }, index * 200);
      });
    };

    // Reset and restart animation
    const resetEvents = () => {
      eventsList.forEach(item => {
        item.element.classList.remove('show');
      });
    };

    // Start animation
    showEvents();

    // Loop animation every 8 seconds
    const interval = setInterval(() => {
      resetEvents();
      setTimeout(showEvents, 500);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <style>{`
        #calendar-animation-wrapper {
          all: initial;
          display: block;
          width: 100%;
          max-width: 100%;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          container-type: inline-size;
        }

        #calendar-animation-wrapper * {
          box-sizing: border-box;
        }

        #calendar-animation-wrapper .cal-container {
          background: white;
          border-radius: 16px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
          width: 100%;
          max-width: 100%;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          margin: 0;
          padding: 0;
          position: relative;
          min-height: 400px;
        }

        #calendar-animation-wrapper .cal-header {
          padding: 12px 16px;
          border-bottom: 1px solid #e5e7eb;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-shrink: 0;
          flex-wrap: wrap;
          gap: 10px;
        }

        #calendar-animation-wrapper .cal-header-left {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }

        #calendar-animation-wrapper .cal-add-btn {
          background: white;
          border: 1px solid #d1d5db;
          padding: 6px 12px;
          border-radius: 8px;
          color: #6b7280;
          font-size: 12px;
          cursor: pointer;
          font-family: inherit;
        }

        #calendar-animation-wrapper .cal-date-nav {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        #calendar-animation-wrapper .cal-nav-btn {
          background: none;
          border: none;
          color: #6b7280;
          cursor: pointer;
          font-size: 14px;
          padding: 4px;
          font-family: inherit;
        }

        #calendar-animation-wrapper .cal-current-date {
          font-size: 16px;
          font-weight: 600;
          color: #1f2937;
        }

        #calendar-animation-wrapper .cal-main-content {
          display: flex;
          flex: 1;
          overflow: hidden;
          min-height: 320px;
        }

        #calendar-animation-wrapper .cal-sidebar {
          width: 140px;
          padding: 12px 10px;
          border-right: 1px solid #e5e7eb;
          background: #f9fafb;
          flex-shrink: 0;
        }

        #calendar-animation-wrapper .cal-mini-calendar {
          margin-bottom: 16px;
        }

        #calendar-animation-wrapper .cal-mini-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }

        #calendar-animation-wrapper .cal-mini-month {
          font-size: 11px;
          font-weight: 600;
          color: #1f2937;
        }

        #calendar-animation-wrapper .cal-mini-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 1px;
        }

        #calendar-animation-wrapper .cal-mini-day {
          text-align: center;
          padding: 2px 0;
          font-size: 9px;
          color: #6b7280;
        }

        #calendar-animation-wrapper .cal-mini-day.header {
          font-weight: 600;
        }

        #calendar-animation-wrapper .cal-legend {
          margin-top: 12px;
        }

        #calendar-animation-wrapper .cal-legend-title {
          font-size: 11px;
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 6px;
        }

        #calendar-animation-wrapper .cal-legend-item {
          display: flex;
          align-items: center;
          gap: 5px;
          margin-bottom: 5px;
          font-size: 10px;
          color: #6b7280;
        }

        #calendar-animation-wrapper .cal-legend-color {
          width: 10px;
          height: 10px;
          border-radius: 3px;
          flex-shrink: 0;
        }

        #calendar-animation-wrapper .cal-calendar-grid {
          flex: 1;
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          border-left: 1px solid #e5e7eb;
          overflow: visible;
          min-width: 0;
        }

        #calendar-animation-wrapper .cal-day-column {
          border-right: 1px solid #e5e7eb;
          display: flex;
          flex-direction: column;
          min-height: 0;
          min-width: 0;
          flex: 1;
        }

        #calendar-animation-wrapper .cal-day-column:last-child {
          border-right: none;
        }

        #calendar-animation-wrapper .cal-day-header {
          padding: 8px 6px;
          border-bottom: 1px solid #e5e7eb;
          text-align: center;
          flex-shrink: 0;
        }

        #calendar-animation-wrapper .cal-day-name {
          font-size: 8px;
          color: #6b7280;
          text-transform: uppercase;
          margin-bottom: 2px;
          letter-spacing: 0.5px;
        }

        #calendar-animation-wrapper .cal-day-number {
          font-size: 16px;
          font-weight: 600;
          color: #1f2937;
        }

        #calendar-animation-wrapper .cal-events-container {
          padding: 6px;
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 4px;
          overflow-y: auto;
          min-height: 0;
        }

        #calendar-animation-wrapper .cal-events-container::-webkit-scrollbar {
          width: 0;
        }

        #calendar-animation-wrapper .cal-event {
          background: #60a5fa;
          border-radius: 5px;
          padding: 6px;
          color: white;
          font-size: 10px;
          cursor: pointer;
          transition: all 0.2s;
          position: relative;
          overflow: hidden;
          opacity: 0;
          transform: scale(0.5) rotate(-5deg);
          flex-shrink: 0;
          min-height: 36px;
        }

        #calendar-animation-wrapper .cal-event.show {
          animation: calEventAppear 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        #calendar-animation-wrapper .cal-event:hover {
          transform: scale(1.03) translateY(-2px);
          box-shadow: 0 6px 16px rgba(96, 165, 250, 0.5);
        }

        #calendar-animation-wrapper .cal-event-icon {
          display: inline-block;
          margin-right: 4px;
          font-size: 11px;
        }

        #calendar-animation-wrapper .cal-event-title {
          font-weight: 500;
          margin-bottom: 3px;
        }

        #calendar-animation-wrapper .cal-event-time {
          font-size: 8px;
          opacity: 0.9;
        }

        #calendar-animation-wrapper .cal-event.beruflich {
          background: linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%);
        }

        #calendar-animation-wrapper .cal-event.feiertage {
          background: linear-gradient(135deg, #fb923c 0%, #f97316 100%);
        }

        #calendar-animation-wrapper .cal-event.privat {
          background: linear-gradient(135deg, #a78bfa 0%, #8b5cf6 100%);
        }

        @keyframes calEventAppear {
          0% {
            opacity: 0;
            transform: scale(0.5) rotate(-5deg);
          }
          50% {
            transform: scale(1.1) rotate(2deg);
          }
          100% {
            opacity: 1;
            transform: scale(1) rotate(0deg);
          }
        }

        #calendar-animation-wrapper .cal-weekend {
          background: #f9fafb;
        }

        #calendar-animation-wrapper .cal-day-blocked {
          background: #f3f4f6;
          position: relative;
        }

        #calendar-animation-wrapper .cal-day-blocked .cal-day-header {
          opacity: 0.5;
        }

        #calendar-animation-wrapper .cal-day-blocked .cal-events-container {
          opacity: 0.3;
          pointer-events: none;
        }

        @media (max-width: 768px) {
          #calendar-animation-wrapper .cal-container {
            min-height: 320px;
          }

          #calendar-animation-wrapper .cal-main-content {
            min-height: 260px;
          }

          #calendar-animation-wrapper .cal-sidebar {
            display: none;
          }

          #calendar-animation-wrapper .cal-calendar-grid {
            grid-template-columns: repeat(3, 1fr);
          }

          #calendar-animation-wrapper .cal-day-column:nth-child(n+4) {
            display: none;
          }
        }
      `}</style>

      <div id="calendar-animation-wrapper" ref={wrapperRef}>
        <div className="cal-container">
          <div className="cal-header">
            <div className="cal-header-left">
              <button className="cal-add-btn">+ Eintragen</button>
              <div className="cal-date-nav">
                <button className="cal-nav-btn">‹</button>
                <button className="cal-nav-btn">Heute</button>
                <button className="cal-nav-btn">›</button>
                <span className="cal-current-date">Januar 2026</span>
              </div>
            </div>
          </div>

          <div className="cal-main-content">
            <div className="cal-sidebar">
              <div className="cal-mini-calendar">
                <div className="cal-mini-header">
                  <span className="cal-mini-month">Januar</span>
                  <div>
                    <button className="cal-nav-btn">‹</button>
                    <button className="cal-nav-btn">›</button>
                  </div>
                </div>
                <div className="cal-mini-grid">
                  <div className="cal-mini-day header">S</div>
                  <div className="cal-mini-day header">M</div>
                  <div className="cal-mini-day header">D</div>
                  <div className="cal-mini-day header">M</div>
                  <div className="cal-mini-day header">D</div>
                  <div className="cal-mini-day header">F</div>
                  <div className="cal-mini-day header">S</div>
                  <div className="cal-mini-day"></div>
                  <div className="cal-mini-day"></div>
                  <div className="cal-mini-day"></div>
                  <div className="cal-mini-day"></div>
                  <div className="cal-mini-day">1</div>
                  <div className="cal-mini-day">2</div>
                  <div className="cal-mini-day">3</div>
                  <div className="cal-mini-day">4</div>
                  <div className="cal-mini-day">5</div>
                  <div className="cal-mini-day">6</div>
                  <div className="cal-mini-day">7</div>
                  <div className="cal-mini-day">8</div>
                  <div className="cal-mini-day">9</div>
                </div>
              </div>

              <div className="cal-legend">
                <div className="cal-legend-title">Treffen mit...</div>
                <div className="cal-legend-item">
                  <div className="cal-legend-color" style={{ background: '#60a5fa' }}></div>
                  <span>Beruflich</span>
                </div>
                <div className="cal-legend-item">
                  <div className="cal-legend-color" style={{ background: '#fb923c' }}></div>
                  <span>Feiertage</span>
                </div>
                <div className="cal-legend-item">
                  <div className="cal-legend-color" style={{ background: '#a78bfa' }}></div>
                  <span>Privat</span>
                </div>
              </div>
            </div>

            <div className="cal-calendar-grid">
              {/* Monday */}
              <div className="cal-day-column">
                <div className="cal-day-header">
                  <div className="cal-day-name">MO</div>
                  <div className="cal-day-number">4</div>
                </div>
                <div className="cal-events-container">
                  <div className="cal-event beruflich" data-order="5">
                    <div className="cal-event-icon">⭕</div>
                    <div className="cal-event-title">Neues Event</div>
                    <div className="cal-event-time">9 AM - 10 AM</div>
                  </div>
                  <div className="cal-event beruflich" data-order="12">
                    <div className="cal-event-icon">⭕</div>
                    <div className="cal-event-title">Neues Event</div>
                    <div className="cal-event-time">10 AM - 11 AM</div>
                  </div>
                  <div className="cal-event beruflich" data-order="18">
                    <div className="cal-event-icon">⭕</div>
                    <div className="cal-event-title">Neues Event</div>
                    <div className="cal-event-time">1 PM - 2 PM</div>
                  </div>
                </div>
              </div>

              {/* Tuesday */}
              <div className="cal-day-column">
                <div className="cal-day-header">
                  <div className="cal-day-name">DI</div>
                  <div className="cal-day-number">5</div>
                </div>
                <div className="cal-events-container">
                  <div className="cal-event beruflich" data-order="2">
                    <div className="cal-event-icon">⭕</div>
                    <div className="cal-event-title">Neues Event</div>
                    <div className="cal-event-time">9 AM - 10 AM</div>
                  </div>
                  <div className="cal-event beruflich" data-order="8">
                    <div className="cal-event-icon">⭕</div>
                    <div className="cal-event-title">Neues Event</div>
                    <div className="cal-event-time">9 AM - 10 AM</div>
                  </div>
                  <div className="cal-event beruflich" data-order="15">
                    <div className="cal-event-icon">⭕</div>
                    <div className="cal-event-title">Neues Event</div>
                    <div className="cal-event-time">11 AM - 12 PM</div>
                  </div>
                </div>
              </div>

              {/* Wednesday */}
              <div className="cal-day-column">
                <div className="cal-day-header">
                  <div className="cal-day-name">MI</div>
                  <div className="cal-day-number">6</div>
                </div>
                <div className="cal-events-container">
                  <div className="cal-event beruflich" data-order="1">
                    <div className="cal-event-icon">⭕</div>
                    <div className="cal-event-title">Neues Event</div>
                    <div className="cal-event-time">9 AM - 10 AM</div>
                  </div>
                  <div className="cal-event beruflich" data-order="9">
                    <div className="cal-event-icon">⭕</div>
                    <div className="cal-event-title">Neues Event</div>
                    <div className="cal-event-time">11 AM - 12 PM</div>
                  </div>
                  <div className="cal-event beruflich" data-order="14">
                    <div className="cal-event-icon">⭕</div>
                    <div className="cal-event-title">Neues Event</div>
                    <div className="cal-event-time">1 PM - 2 PM</div>
                  </div>
                </div>
              </div>

              {/* Thursday */}
              <div className="cal-day-column">
                <div className="cal-day-header">
                  <div className="cal-day-name">DO</div>
                  <div className="cal-day-number">7</div>
                </div>
                <div className="cal-events-container">
                  <div className="cal-event beruflich" data-order="4">
                    <div className="cal-event-icon">⭕</div>
                    <div className="cal-event-title">Neues Event</div>
                    <div className="cal-event-time">9 AM - 10 AM</div>
                  </div>
                  <div className="cal-event beruflich" data-order="11">
                    <div className="cal-event-icon">⭕</div>
                    <div className="cal-event-title">Neues Event</div>
                    <div className="cal-event-time">10 AM - 11 AM</div>
                  </div>
                  <div className="cal-event beruflich" data-order="16">
                    <div className="cal-event-icon">⭕</div>
                    <div className="cal-event-title">Neues Event</div>
                    <div className="cal-event-time">12 PM - 1 PM</div>
                  </div>
                </div>
              </div>

              {/* Friday */}
              <div className="cal-day-column">
                <div className="cal-day-header">
                  <div className="cal-day-name">FR</div>
                  <div className="cal-day-number">8</div>
                </div>
                <div className="cal-events-container">
                  <div className="cal-event beruflich" data-order="3">
                    <div className="cal-event-icon">⭕</div>
                    <div className="cal-event-title">Neues Event</div>
                    <div className="cal-event-time">9 AM - 10 AM</div>
                  </div>
                  <div className="cal-event beruflich" data-order="7">
                    <div className="cal-event-icon">⭕</div>
                    <div className="cal-event-title">Neues Event</div>
                    <div className="cal-event-time">11 AM - 12 PM</div>
                  </div>
                  <div className="cal-event beruflich" data-order="10">
                    <div className="cal-event-icon">⭕</div>
                    <div className="cal-event-title">Neues Event</div>
                    <div className="cal-event-time">1 PM - 2 PM</div>
                  </div>
                </div>
              </div>

              {/* Saturday */}
              <div className="cal-day-column cal-weekend">
                <div className="cal-day-header">
                  <div className="cal-day-name">SA</div>
                  <div className="cal-day-number">9</div>
                </div>
                <div className="cal-events-container">
                  <div className="cal-event privat" data-order="6">
                    <div className="cal-event-icon">⭕</div>
                    <div className="cal-event-title">Neues Event</div>
                    <div className="cal-event-time">11 AM - 12 PM</div>
                  </div>
                  <div className="cal-event privat" data-order="13">
                    <div className="cal-event-icon">⭕</div>
                    <div className="cal-event-title">Neues Event</div>
                    <div className="cal-event-time">3 PM - 4 PM</div>
                  </div>
                </div>
              </div>

              {/* Sunday */}
              <div className="cal-day-column cal-weekend cal-day-blocked">
                <div className="cal-day-header">
                  <div className="cal-day-name">SO</div>
                  <div className="cal-day-number">10</div>
                </div>
                <div className="cal-events-container"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CalendarAnimation;
