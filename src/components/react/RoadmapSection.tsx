import { useState, useRef, useEffect } from "react";
import {
  Zap,
  Crown,
  ChevronRight,
  Target,
  Calendar,
  Handshake,
  Package,
  Settings,
  Users,
  UserPlus,
  Cog,
  BarChart3,
  Award,
  Mic,
  Shield,
  Palmtree
} from "lucide-react";

interface RoadmapCard {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface RoadmapPhase {
  id: string;
  title: string;
  revenue: string;
  color: string;
  cards: RoadmapCard[];
}

const phases: RoadmapPhase[] = [
  {
    id: "survival",
    title: "Survival-Phase",
    revenue: "0-30k/Monat",
    color: "#F59E0B",
    cards: [
      {
        icon: <Target className="w-6 h-6" />,
        title: "No-Brainer Angebot",
        description: "Aus der Kombination deiner Skills, Ziele und aktuellen Marktchancen entwickeln wir ein Angebot, mit dem du zur ersten Wahl für deine Zielgruppe wirst.",
      },
      {
        icon: <Calendar className="w-6 h-6" />,
        title: "Termine generieren",
        description: "Wir installieren ein validiertes Akquise-System, das deinen Kalender mit qualifizierten Terminen füllt und zu 100% delegierbar ist.",
      },
      {
        icon: <Handshake className="w-6 h-6" />,
        title: "Kunden abschließen",
        description: "Du erlernst Principle Based Selling mit Call-Breakdowns und Sparrings, um auch bei veränderten Marktbedingungen überdurchschnittlich abzuschließen.",
      },
      {
        icon: <Package className="w-6 h-6" />,
        title: "MVP Delivery",
        description: "Wir starten agil mit dem Verkaufen deiner Dienstleistung und optimieren von Projekt zu Projekt dein Fulfillment.",
      },
    ],
  },
  {
    id: "growth",
    title: "Growth-Phase",
    revenue: "30-100k/Monat",
    color: "#3B82F6",
    cards: [
      {
        icon: <Settings className="w-6 h-6" />,
        title: "Optimales Selling System",
        description: "Wir implementieren einen planbaren, wiederholbaren und zuverlässigen Sales-Prozess, der unabhängig von dir als Founder funktioniert.",
      },
      {
        icon: <UserPlus className="w-6 h-6" />,
        title: "Erster A-Player einstellen",
        description: "Wir finden einen Allrounder, der als Intrapreneur dir den Rücken freihält, während du als Entrepreneur weiter nach vorne prescht.",
      },
      {
        icon: <Cog className="w-6 h-6" />,
        title: "Fulfillment 2.0 Upgrade",
        description: "Aus den Learnings all deiner Projekte entwickeln wir SOPs und Automatisierungen, damit dein Fokus nur auf High-Leverage-Tätigkeiten liegt.",
      },
      {
        icon: <Users className="w-6 h-6" />,
        title: "Aufbau Sales Team",
        description: "Wir helfen dir High-Performer zu hiren und rüsten dich mit Sales-Prozessen und Leadership Skills aus.",
      },
    ],
  },
  {
    id: "scale",
    title: "Scale-Phase",
    revenue: "100-250k/Monat",
    color: "#10B981",
    cards: [
      {
        icon: <Zap className="w-6 h-6" />,
        title: "1-Click-Delivery System",
        description: "Die perfekte Symbiose aus Mensch und Automatismen sorgt dafür, dass Projekte wie an einem roten Faden erledigt werden.",
      },
      {
        icon: <BarChart3 className="w-6 h-6" />,
        title: "Performance Culture",
        description: "Wir etablieren eine Culture, die deinen Umsatz pro Kopf auf 400k/Jahr bringt und für eine saftige Profitmarge sorgt.",
      },
      {
        icon: <Award className="w-6 h-6" />,
        title: "Retention maximieren",
        description: "Die Qualität deiner Delivery produziert Case Studies am Fließband und sorgt für eine Upsell-Quote von min. 30%.",
      },
    ],
  },
  {
    id: "rulebreaker",
    title: "Rulebreaker",
    revenue: "250k+/Monat",
    color: "#8B5CF6",
    cards: [
      {
        icon: <Mic className="w-6 h-6" />,
        title: "Marktführer-Positionierung",
        description: "Du wirst als Speaker eingeladen und deine Marketing-Botschaften bestimmen, wie sich Trends in deiner Branche entwickeln.",
      },
      {
        icon: <Crown className="w-6 h-6" />,
        title: "C-Suite Leadership",
        description: "Du erlernst eine Führung, die sich herumspricht, sodass andere Top-Talente für dich arbeiten wollen.",
      },
      {
        icon: <Shield className="w-6 h-6" />,
        title: "Hands-Off Management",
        description: "Du managst die Manager und steuerst mit deinem CEO-Dashboard die Richtung deiner Agentur – 100% aus dem Tagesgeschäft.",
      },
      {
        icon: <Palmtree className="w-6 h-6" />,
        title: "Finanzielle Freiheit",
        description: "Deine Agentur dient als Cash-Cow für deinen Lifestyle, das nächste Unternehmen oder eine größere Vision.",
      },
    ],
  },
];

const RoadmapSection = () => {
  const [activePhase, setActivePhase] = useState<string>("survival");
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Drag-to-scroll state
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const currentPhase = phases.find((p) => p.id === activePhase) || phases[0];
  const [hasAnimated, setHasAnimated] = useState(false);

  // Mark as animated after initial render
  useEffect(() => {
    const timer = setTimeout(() => setHasAnimated(true), 600);
    return () => clearTimeout(timer);
  }, []);

  // Reset scroll position when phase changes
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ left: 0, behavior: "smooth" });
      setActiveCardIndex(0);
    }
  }, [activePhase]);

  // Track active card based on scroll position
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const card = container.querySelector('.snap-start') as HTMLElement;
      const cardWidth = card?.offsetWidth || 320;
      const gap = 20;
      const currentScrollLeft = container.scrollLeft;
      const index = Math.round(currentScrollLeft / (cardWidth + gap));
      setActiveCardIndex(Math.min(index, currentPhase.cards.length - 1));
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [currentPhase.cards.length]);

  // Drag-to-scroll handlers for mouse
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // Scroll speed multiplier
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };


  return (
    <section className="py-16 md:py-24 bg-secondary overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Deine <span className="text-primary">Leverage Roadmap</span> zur Rulebreaker-Agentur
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Der bewährte Weg von der Gründung bis zur marktführenden Agentur
          </p>
        </div>

        {/* Phase Tabs */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-10">
          {phases.map((phase) => (
            <button
              key={phase.id}
              onClick={() => setActivePhase(phase.id)}
              className={`relative px-4 md:px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                activePhase === phase.id
                  ? "text-white"
                  : "text-gray-400 hover:text-white bg-white/5 hover:bg-white/10"
              }`}
              style={{
                backgroundColor: activePhase === phase.id ? phase.color : undefined,
              }}
            >
              <div className="flex flex-col items-center md:items-start">
                <span className="text-sm md:text-base">{phase.title}</span>
                <span className="text-xs opacity-75">{phase.revenue}</span>
              </div>
              {activePhase === phase.id && (
                <div
                  className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent"
                  style={{ borderTopColor: phase.color }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Cards Container */}
        <div className="-mx-4 md:-mx-8">
          {/* Scrollable Cards - User scrolls naturally with finger/mouse */}
          <div
            ref={scrollContainerRef}
            className={`flex gap-5 overflow-x-auto scroll-smooth px-4 md:px-8 py-4 scrollbar-hide select-none lg:grid lg:overflow-visible ${
              currentPhase.cards.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4"
            } ${
              isDragging ? "cursor-grabbing" : "cursor-grab snap-x snap-mandatory lg:cursor-default lg:snap-none"
            }`}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
          >
            {currentPhase.cards.map((card, index) => (
              <div
                key={index}
                className={`flex-shrink-0 w-[300px] md:w-[320px] lg:w-auto snap-start ${
                  !hasAnimated ? "animate-fade-in" : ""
                }`}
                style={!hasAnimated ? { animationDelay: `${index * 100}ms` } : undefined}
              >
                <div className="h-[340px] rounded-2xl bg-gradient-to-b from-white/10 to-white/5 border border-white/10 p-6 hover:border-white/30 hover:bg-white/10 transition-all duration-300 flex flex-col">
                  {/* Icon */}
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-5"
                    style={{
                      backgroundColor: `${currentPhase.color}20`,
                      color: currentPhase.color,
                    }}
                  >
                    {card.icon}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-3">
                    {card.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-400 text-sm leading-relaxed flex-1">
                    {card.description}
                  </p>

                  {/* Progress Line - Always at bottom */}
                  <div className="mt-6 pt-4 border-t border-white/10">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1 rounded-full bg-white/10 overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${((index + 1) / currentPhase.cards.length) * 100}%`,
                            backgroundColor: currentPhase.color,
                          }}
                        />
                      </div>
                      <span className="text-xs text-gray-500">
                        {index + 1}/{currentPhase.cards.length}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Scroll Indicator Dots - only on mobile */}
          <div className="flex justify-center gap-2 mt-4 lg:hidden">
            {currentPhase.cards.map((_, index) => (
              <div
                key={index}
                className={`rounded-full transition-all duration-300 ${
                  index === activeCardIndex ? "w-6 h-2" : "w-2 h-2"
                }`}
                style={{
                  backgroundColor: currentPhase.color,
                  opacity: index === activeCardIndex ? 1 : 0.4,
                }}
              />
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-400 mb-4">
            Bereit für den nächsten Schritt auf deiner Roadmap?
          </p>
          <a
            href="/termin"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary hover:bg-primary/90 text-white font-semibold rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-xl shadow-lg shadow-primary/25"
          >
            Kostenloses Strategiegespräch
            <ChevronRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default RoadmapSection;
