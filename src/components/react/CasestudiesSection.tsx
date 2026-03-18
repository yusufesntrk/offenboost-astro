import { Play, Check, TrendingUp, TrendingDown, Star, Building2, Users } from "lucide-react";
import { useState, useEffect, useRef } from "react";

type Category = "alle" | "recruiting" | "kanzleien" | "fahrschulen";

interface CaseStudy {
  name: string;
  company: string;
  image?: string;
  videoUrl?: string;
  quote: string;
  headline: string;
  results: string[];
  category: Category;
  metric: {
    label: string;
    value: number;
    suffix: string;
    prefix: string;
    direction: "up" | "down";
    description: string;
  };
}

const caseStudies: CaseStudy[] = [
  // Recruiting
  {
    name: "Bahadir Battal",
    company: "VeraPartners Leadership",
    image: "/testimonials/bahadir-battal.webp",
    quote: "OffenBoost hat unsere Art zu arbeiten revolutioniert. Wir erreichen jetzt mehr IT-Fachkräfte mit weniger Aufwand.",
    headline: "Sales-Prozesse automatisiert und Kandidatenansprache skaliert",
    category: "recruiting",
    results: [
      "Sales-Aktivitäten automatisiert und skaliert",
      "Direktansprache von passiven IT-Kandidaten optimiert",
      "Mehr qualifizierte Gespräche durch Prozesseffizienz",
    ],
    metric: {
      label: "Sales-Aktivitäten",
      value: 120,
      suffix: "%",
      prefix: "+",
      direction: "up",
      description: "mehr Outreach"
    },
  },
  {
    name: "Yasar Sentürk",
    company: "searched GmbH",
    image: "/testimonials/yasar-sentuerk.png",
    videoUrl: "https://www.youtube.com/watch?v=Ojiv9Smi4XE",
    quote: "OffenBoost ist auf jeden Fall die schnellste Variante, um auf 500k im Monat zu skalieren!",
    headline: "Operative Effizienz gesteigert und Fulfillment-Workload um 50% reduziert",
    category: "recruiting",
    results: [
      "Effizienz der Prozesse verdoppelt, dank optimierter Abläufe",
      "Automatisierte Workflows reduzieren manuelle Aufgaben drastisch",
      "Skalierung auf 500k/Monat ermöglicht",
    ],
    metric: {
      label: "Workload im Fulfillment",
      value: 50,
      suffix: "%",
      prefix: "-",
      direction: "down",
      description: "mehr als halbiert"
    },
  },
  {
    name: "Alireza Nikjou",
    company: "Experiton UG",
    image: "/testimonials/alireza-nikjou.png",
    quote: "Es ist WIRKLICH krank, was ihr für uns gebaut habt!",
    headline: "IT-Recruiting automatisiert und Vermittlungsquote um 300% gesteigert",
    category: "recruiting",
    results: [
      "Bewerber-Pipeline automatisiert, IT-Fachkräfte 70% schneller vermittelt",
      "Lead-Weiterleitung in Echtzeit an Recruiter-Teams über WhatsApp und CRM",
      "Komplette Prozessdigitalisierung umgesetzt",
    ],
    metric: {
      label: "Vermittlungsquote",
      value: 300,
      suffix: "%",
      prefix: "+",
      direction: "up",
      description: "gesteigert"
    },
  },
  {
    name: "Nordin Begdouri",
    company: "SalesWorx",
    image: "/testimonials/nordin-begdouri.jpg",
    videoUrl: "https://www.youtube.com/watch?v=IlJ52JJe29k",
    quote: "Seitdem das System läuft, fühlt sich Sales wie Cheaten an.",
    headline: "Komplettes CRM-System automatisiert und Recruitment-Prozesse optimiert",
    category: "recruiting",
    results: [
      "Alle Bewerber-Workflows automatisiert, von der Erstansprache bis zur Einstellung",
      "Zentrale Datenpflege reduziert manuelle Eingaben und Fehlerquellen",
      "Sales-Prozesse vollständig digitalisiert",
    ],
    metric: {
      label: "Manuelle Eingaben",
      value: 80,
      suffix: "%",
      prefix: "-",
      direction: "down",
      description: "reduziert"
    },
  },
  {
    name: "Dr. Thomas Wendel",
    company: "tw.con. GmbH",
    image: "/testimonials/thomas-wendel.jpg",
    quote: "OffenBoost hat unsere Vermittlungsprozesse auf ein neues Level gehoben.",
    headline: "Ärzte- und Apothekervermittlung beschleunigt und Matching automatisiert",
    category: "recruiting",
    results: [
      "Vermittlungszeit um 40% reduziert durch automatisiertes Matching",
      "Kandidaten-Pipeline vollständig digitalisiert",
      "Qualität der Vermittlungen deutlich gesteigert",
    ],
    metric: {
      label: "Vermittlungszeit",
      value: 40,
      suffix: "%",
      prefix: "-",
      direction: "down",
      description: "schneller"
    },
  },
  // Kanzleien
  {
    name: "Jürgen Berger",
    company: "B&L Berger Lindzus Lutz",
    image: "/testimonials/juergen-berger.jpg",
    quote: "Innerhalb von einem Monat haben wir die richtige Person gefunden und eingestellt.",
    headline: "Passive Wechselkandidaten erreicht und Time-to-Hire um 75% reduziert",
    category: "kanzleien",
    results: [
      "Zugang zu passiven Wechselkandidaten, die über konventionelle Medien nicht erreichbar waren",
      "Qualifizierte Fachkraft innerhalb von 4 Wochen eingestellt",
      "Recruiting-Kanäle modernisiert und optimiert",
    ],
    metric: {
      label: "Time-to-Hire",
      value: 75,
      suffix: "%",
      prefix: "-",
      direction: "down",
      description: "schneller"
    },
  },
  {
    name: "Christian Eckhardt",
    company: "Quentin / Quitter & Eckhardt",
    image: "/testimonials/christian-eckhardt.jpg",
    quote: "Die Zusammenarbeit war von Anfang an professionell und zielorientiert.",
    headline: "Professioneller Recruiting-Prozess mit hochqualifizierten Bewerbern",
    category: "kanzleien",
    results: [
      "Hochqualifizierte Bewerber in kürzester Zeit gewonnen",
      "Professionelle und zielorientierte Zusammenarbeit",
      "Bewerberqualität um 90% verbessert",
    ],
    metric: {
      label: "Bewerberqualität",
      value: 90,
      suffix: "%",
      prefix: "+",
      direction: "up",
      description: "verbessert"
    },
  },
  {
    name: "Martina Kronbiegel",
    company: "Kanzlei Kronbiegel",
    image: "/testimonials/martina-kronbiegel.jpg",
    quote: "Wöchentlich sind es 1-3 Anfragen, von denen 90% wirklich interessant sind.",
    headline: "Webseite modernisiert und Anfragen verdreifacht",
    category: "kanzleien",
    results: [
      "Modernisierung der 20 Jahre alten Webseite mit sofortigen Ergebnissen",
      "90% der Anfragen sind qualifiziert und relevant",
      "Vollzeit-Mitarbeiterin erfolgreich eingestellt",
    ],
    metric: {
      label: "Anfragen pro Woche",
      value: 3,
      suffix: "x",
      prefix: "",
      direction: "up",
      description: "mehr"
    },
  },
  {
    name: "Marc Wüst",
    company: "adam, wüst & partner",
    image: "/testimonials/marc-wuest.jpg",
    quote: "Nach zwei Wochen hatte ich die ersten qualifizierten Bewerbungen auf dem Schreibtisch liegen.",
    headline: "Recruiting-Herausforderung gemeistert und qualifizierte Bewerber gewonnen",
    category: "kanzleien",
    results: [
      "Erste qualifizierte Bewerbungen bereits nach 2 Wochen",
      "Recruiting als planbare Lösung statt größte Herausforderung",
      "Digitale Recruiting-Strategie erfolgreich implementiert",
    ],
    metric: {
      label: "Time-to-First-Application",
      value: 2,
      suffix: " Wochen",
      prefix: "",
      direction: "down",
      description: "bis erste Bewerbung"
    },
  },
  {
    name: "Florian Rendler",
    company: "Rendler & Hoferer",
    image: "/testimonials/florian-rendler.jpg",
    quote: "In kürzester Zeit genügend Anfragen für unsere Azubi-Stelle.",
    headline: "Trotz Corona erfolgreich Azubis rekrutiert",
    category: "kanzleien",
    results: [
      "Azubi-Stelle trotz erschwerter Corona-Bedingungen besetzt",
      "Facebook und Instagram Anzeigen mit optimierter Landingpage",
      "Auswahl zwischen mehreren qualifizierten Kandidaten",
    ],
    metric: {
      label: "Bewerbungen",
      value: 100,
      suffix: "%",
      prefix: "+",
      direction: "up",
      description: "mehr als erwartet"
    },
  },
  // Fahrschulen
  {
    name: "Thomas Schille",
    company: "Fahrschule Schille",
    image: "/testimonials/thomas-schille.png",
    quote: "Mit OffenBoost haben wir nicht nur mehr Fahrschüler gewonnen, sondern auch neue Fahrlehrer für unser Team gefunden.",
    headline: "Fahrschüler-Akquise und Fahrlehrer-Recruiting in Stuttgart digitalisiert",
    category: "fahrschulen",
    results: [
      "Deutlich mehr Fahrschüler-Anmeldungen durch digitale Präsenz",
      "Neue qualifizierte Fahrlehrer erfolgreich eingestellt",
      "Über 20 Jahre Erfahrung modern präsentiert",
    ],
    metric: {
      label: "Fahrschüler-Anmeldungen",
      value: 85,
      suffix: "%",
      prefix: "+",
      direction: "up",
      description: "gesteigert"
    },
  },
];

const categories: { key: Category; label: string; icon: React.ElementType }[] = [
  { key: "alle", label: "Alle", icon: Star },
  { key: "recruiting", label: "Recruiting", icon: Users },
  { key: "kanzleien", label: "Kanzleien", icon: Building2 },
  { key: "fahrschulen", label: "Fahrschulen", icon: Users },
];

// Animated Counter Component
const AnimatedCounter = ({
  value,
  prefix = "",
  suffix = "",
  duration = 2000
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * value));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, value, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}{count}{suffix}
    </span>
  );
};

// Animated Bar Chart
const AnimatedBarChart = ({ direction, isVisible }: { direction: string; isVisible: boolean }) => {
  return (
    <div className="flex items-end gap-1 h-24 mt-4">
      {Array.from({ length: 12 }).map((_, i) => {
        const isDown = direction === "down";
        const height = isDown
          ? Math.max(15, 100 - i * 8)
          : Math.min(100, 20 + i * 7);
        return (
          <div
            key={i}
            className={`flex-1 rounded-t transition-all duration-700 ${
              isDown ? "bg-success/50" : "bg-primary/50"
            }`}
            style={{
              height: isVisible ? `${height}%` : "10%",
              transitionDelay: `${i * 80}ms`
            }}
          />
        );
      })}
    </div>
  );
};

const getInitials = (name: string) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("");

const CasestudiesSection = () => {
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const [activeCategory, setActiveCategory] = useState<Category>("alle");

  const filteredCaseStudies =
    activeCategory === "alle"
      ? caseStudies
      : caseStudies.filter((c) => c.category === activeCategory);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    filteredCaseStudies.forEach((_, index) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleCards(prev => new Set([...prev, index]));
          }
        },
        { threshold: 0.2 }
      );

      const element = document.getElementById(`case-study-${index}`);
      if (element) {
        observer.observe(element);
        observers.push(observer);
      }
    });

    return () => observers.forEach(obs => obs.disconnect());
  }, [filteredCaseStudies]);

  // Reset visible cards when category changes
  useEffect(() => {
    setVisibleCards(new Set());
  }, [activeCategory]);

  return (
    <main className="py-12 md:py-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-primary font-semibold mb-4 animate-fade-in">Fallstudien & Bewertungen</p>
          <h1 className="text-3xl md:text-5xl font-bold text-secondary animate-fade-in-up">
            Unser Portfolio mit über{" "}
            <span className="text-primary">20+</span>{" "}
            Erfolgsstories
          </h1>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Entdecken Sie, wie wir Unternehmen aus verschiedenen Branchen beim Wachstum unterstützt haben.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all min-h-[44px] ${
                  activeCategory === cat.key
                    ? "bg-primary text-white shadow-lg shadow-primary/25"
                    : "bg-card text-muted-foreground hover:bg-card/80 border border-border"
                }`}
              >
                <Icon className="w-4 h-4" />
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Case Studies */}
        <div className="space-y-16">
          {filteredCaseStudies.map((study, index) => (
            <div
              id={`case-study-${index}`}
              key={`${activeCategory}-${index}`}
              className="grid lg:grid-cols-2 gap-8 items-stretch animate-fade-in-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Image & Quote Card */}
              <div className="bg-secondary rounded-2xl overflow-hidden shadow-xl group">
                {/* Image with Video Overlay */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  {study.image ? (
                    <img
                      src={study.image}
                      alt={study.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = "none";
                        const fallback = target.nextElementSibling;
                        if (fallback) fallback.classList.remove("hidden");
                      }}
                    />
                  ) : null}
                  {/* Fallback */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center ${
                      study.image ? "hidden" : ""
                    }`}
                  >
                    <span className="text-8xl font-bold text-white/30">
                      {getInitials(study.name)}
                    </span>
                  </div>

                  {study.videoUrl && (
                    <a
                      href={study.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-center justify-center"
                    >
                      <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center hover:scale-110 transition-transform shadow-xl">
                        <Play className="w-8 h-8 text-primary-foreground fill-current ml-1" />
                      </div>
                    </a>
                  )}

                  {!study.videoUrl && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  )}

                  {/* Category Badge */}
                  <div className="absolute top-3 left-3 bg-card/95 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm capitalize">
                    {study.category}
                  </div>
                </div>

                {/* Quote */}
                <div className="p-6">
                  <blockquote className="text-secondary-foreground text-lg mb-4">
                    "{study.quote}"
                  </blockquote>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-secondary-foreground">{study.name}</p>
                      <p className="text-sm text-secondary-foreground/70">{study.company}</p>
                    </div>
                    <div className="bg-card/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold text-secondary-foreground">
                      {study.company.split(" ")[0]}
                    </div>
                  </div>
                </div>
              </div>

              {/* Results Card */}
              <div className="bg-card rounded-2xl p-8 shadow-card border border-border/50 flex flex-col justify-between">
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-secondary mb-6">
                    {study.headline}
                  </h2>

                  <div className="space-y-3 mb-8">
                    {study.results.map((result, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-primary" />
                        </div>
                        <span className="text-muted-foreground">{result}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Interactive Metric Chart */}
                <div className="bg-muted/50 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{study.metric.label}</p>
                      <p className="text-xs text-muted-foreground/70">{study.metric.description}</p>
                    </div>
                    {study.metric.direction === "up" ? (
                      <TrendingUp className="w-5 h-5 text-primary" />
                    ) : (
                      <TrendingDown className="w-5 h-5 text-success" />
                    )}
                  </div>

                  <div className={`text-5xl font-bold ${
                    study.metric.direction === "up" ? "text-primary" : "text-success"
                  }`}>
                    <AnimatedCounter
                      value={study.metric.value}
                      prefix={study.metric.prefix}
                      suffix={study.metric.suffix}
                      duration={2500}
                    />
                  </div>

                  <AnimatedBarChart
                    direction={study.metric.direction}
                    isVisible={visibleCards.has(index)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default CasestudiesSection;
