import { Play, TrendingUp, TrendingDown, ArrowUpRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';

// Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

type Category = "alle" | "recruiting" | "kanzleien" | "praxen" | "fahrschulen" | "restaurants";

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  image?: string;
  videoUrl?: string;
  category: Category;
  metric: {
    label: string;
    value: number;
    suffix: string;
    prefix: string;
    direction: "up" | "down";
    description: string;
  };
  results: string[];
}

const testimonials: Testimonial[] = [
  // Recruiting
  {
    quote: "Dank OffenBoost haben wir die Sparkasse als Kunden gewonnen und direkt eine 200k Upfront Fee kassiert. Reverse Recruiting auf einem ganz anderen Level.",
    name: "Yasar Sentürk",
    role: "Geschäftsführer",
    company: "searched GmbH",
    image: "/testimonials/yasar-sentuerk.png",

    category: "recruiting",
    metric: {
      label: "Upfront Fee",
      value: 200,
      suffix: "k",
      prefix: "",
      direction: "up",
      description: "kassiert",
    },
    results: [
      "Sparkasse Finanzsparkasse als Kunde gewonnen",
      "200k Upfront Fee mit Reverse Recruiting Ansatz",
    ],
  },
  {
    quote: "Das 1:1 ist mit keinem anderen Dienstleister zu vergleichen. Man wird rund um die Uhr betreut und eigene Wünsche, die höchst individuell sind, werden umgesetzt.",
    name: "Rüdiger Bruns",
    role: "Geschäftsführer",
    company: "AMONOVA GmbH",
    image: "/testimonials/ruediger-bruns.jpg",
    category: "recruiting",
    metric: {
      label: "Sales ROI",
      value: 5,
      suffix: "x",
      prefix: "",
      direction: "up",
      description: "Return on Investment",
    },
    results: [
      "Trotz schwieriger Recruiting-Lage neue Sales gewonnen",
      "Konzerne an hart umkämpftem Standort als Neukunden gesichert",
    ],
  },
  {
    quote: "OffenBoost hat unsere Vermittlungsprozesse auf ein neues Level gehoben",
    name: "Dr. Thomas Wendel",
    role: "Geschäftsführer",
    company: "tw.con. GmbH",
    image: "/testimonials/thomas-wendel.jpg",
    category: "recruiting",
    metric: {
      label: "Vermittlungszeit",
      value: 40,
      suffix: "%",
      prefix: "-",
      direction: "down",
      description: "schneller",
    },
    results: [
      "Ärzte- und Apothekervermittlung beschleunigt",
      "Automatisierte Kandidaten-Matching Prozesse",
    ],
  },
  {
    quote: "Durch OffenBoost haben wir unsere Sales-Pipeline komplett transformiert. Wir generieren jetzt deutlich mehr qualifizierte Leads als vorher.",
    name: "Bahadir Battal",
    role: "Gründer & Recruiting Experte",
    company: "VeraPartners Leadership",
    image: "/testimonials/bahadir-battal.jpg",
    category: "recruiting",
    metric: {
      label: "Sales-Pipeline",
      value: 65,
      suffix: "%",
      prefix: "+",
      direction: "up",
      description: "mehr Leads",
    },
    results: [
      "Sales-Pipeline um 65% gesteigert",
      "Qualifizierte Leads durch automatisierte Ansprache",
    ],
  },
  {
    quote: "Durch OffenBoost konnten wir unseren Sales-Output verdreifachen – und das bei weniger Aufwand.",
    name: "Alireza Nikjou",
    role: "Geschäftsführer",
    company: "Experiton UG",
    image: "/testimonials/alireza-nikjou.png",
    category: "recruiting",
    metric: {
      label: "Sales-Output",
      value: 300,
      suffix: "%",
      prefix: "+",
      direction: "up",
      description: "gesteigert",
    },
    results: [
      "Sales-Output um 300% gesteigert",
      "Lead-Generierung vollständig automatisiert",
    ],
  },
  {
    quote: "OffenBoost hat unsere Expertenvermittlung auf ein neues Level gebracht. Wir platzieren jetzt doppelt so viele Interim Manager im Einkauf und Supply Chain – und die Kunden kommen von selbst.",
    name: "Hasim Pacal",
    role: "Geschäftsführer",
    company: "Kerkhoff Experts GmbH",
    image: "/testimonials/hasim-pacal.jpg",
    category: "recruiting",
    metric: {
      label: "Vermittlungsvolumen",
      value: 120,
      suffix: "%",
      prefix: "+",
      direction: "up",
      description: "gesteigert",
    },
    results: [
      "Vermittlungsvolumen um 120% gesteigert durch automatisierte Akquise",
      "Neue DAX-Konzerne als Auftraggeber gewonnen",
    ],
  },
  {
    quote: "Seitdem das System läuft, fühlt sich Sales wie Cheaten an.",
    name: "Nordin Begdouri",
    role: "Geschäftsführer",
    company: "SalesWorx",
    image: "/testimonials/nordin-begdouri.jpg",

    category: "recruiting",
    metric: {
      label: "Sales-Abschlüsse",
      value: 80,
      suffix: "%",
      prefix: "+",
      direction: "up",
      description: "gesteigert",
    },
    results: [
      "Sales-Prozesse komplett automatisiert",
      "Abschlussrate um 80% gesteigert",
    ],
  },
  // Kanzleien
  {
    quote: "Innerhalb von 4 Wochen hatten wir die Steuerfachangestellte eingestellt, die wir seit Monaten gesucht haben. Gleichzeitig haben sich unsere Neumandate verdoppelt.",
    name: "Jürgen Berger",
    role: "Steuerberater & Partner",
    company: "B&L Berger Lindzus Lutz",
    image: "/testimonials/juergen-berger.jpg",
    category: "kanzleien",
    metric: {
      label: "Gewinnmarge",
      value: 70,
      suffix: "%",
      prefix: "",
      direction: "up",
      description: "optimiert",
    },
    results: [
      "Gewinnmarge auf 70% optimiert durch Premium-Mandanten",
      "Top-Steuerfachangestellte eingestellt trotz Fachkräftemangel",
    ],
  },
  {
    quote: "Wir haben drei Steuerfachangestellte gefunden, die alle langfristig geblieben sind. Gleichzeitig hat sich unser Kanzleigewinn fast verdoppelt.",
    name: "Christian Eckhardt",
    role: "Steuerberater & Partner",
    company: "Quentin / Quitter & Eckhardt",
    image: "/testimonials/christian-eckhardt.jpg",
    category: "kanzleien",
    metric: {
      label: "Kanzleigewinn",
      value: 85,
      suffix: "%",
      prefix: "+",
      direction: "up",
      description: "gesteigert",
    },
    results: [
      "3 Top-Fachkräfte eingestellt – alle langfristig geblieben",
      "Kanzleigewinn um 85% gesteigert",
    ],
  },
  {
    quote: "1-3 Premium-Mandantenanfragen pro Woche, 90% davon hochqualifiziert. Unsere Gewinnmarge ist explodiert, weil wir uns endlich die Mandanten aussuchen können.",
    name: "Martina Kronbiegel",
    role: "Steuerberaterin",
    company: "Kanzlei Kronbiegel",
    image: "/testimonials/martina-kronbiegel.jpg",
    category: "kanzleien",
    metric: {
      label: "Anfragen/Woche",
      value: 3,
      suffix: "",
      prefix: "bis ",
      direction: "up",
      description: "qualifiziert",
    },
    results: [
      "90% der Anfragen sind hochqualifizierte Premium-Mandanten",
      "Gewinnmarge radikal gesteigert durch selektive Mandatsannahme",
    ],
  },
  {
    quote: "Zwei Steuerfachangestellte eingestellt, die andere Kanzleien seit Monaten suchen. Der Kanzleigewinn hat sich dadurch verdoppelt.",
    name: "Marc Wüst",
    role: "Steuerberater & Partner",
    company: "adam, wüst & partner",
    image: "/testimonials/marc-wuest.jpg",
    category: "kanzleien",
    metric: {
      label: "Kanzleigewinn",
      value: 100,
      suffix: "%",
      prefix: "+",
      direction: "up",
      description: "verdoppelt",
    },
    results: [
      "Kanzleigewinn verdoppelt durch mehr Kapazität und Premium-Mandate",
      "2 Top-Steuerfachangestellte eingestellt, die langfristig bleiben",
    ],
  },
  {
    quote: "In einer Region, wo jede Kanzlei um Fachkräfte kämpft, haben wir drei neue Mitarbeiter gewonnen. Der Umsatz pro Mitarbeiter ist um 60% gestiegen.",
    name: "Florian Rendler",
    role: "Geschäftsführer",
    company: "Rendler & Hoferer",
    image: "/testimonials/florian-rendler.jpg",
    category: "kanzleien",
    metric: {
      label: "Umsatz/Mitarbeiter",
      value: 60,
      suffix: "%",
      prefix: "+",
      direction: "up",
      description: "gesteigert",
    },
    results: [
      "3 Fachkräfte gewonnen in hart umkämpfter Region",
      "Umsatz pro Mitarbeiter um 60% gesteigert",
    ],
  },
  {
    quote: "Wir nehmen nur noch Mandanten mit Honoraren über 500€/Monat an. Unsere Gewinnmarge liegt jetzt bei über 65%. Vorher undenkbar.",
    name: "Peter Gilpert",
    role: "Steuerberater & Geschäftsführer",
    company: "Gilpert & Kollegen",
    image: "/testimonials/peter-gilpert.jpg",
    category: "kanzleien",
    metric: {
      label: "Gewinnmarge",
      value: 65,
      suffix: "%",
      prefix: "",
      direction: "up",
      description: "erreicht",
    },
    results: [
      "Nur noch Premium-Mandate ab 500€/Monat",
      "Gewinnmarge von unter 40% auf über 65% katapultiert",
    ],
  },
  {
    quote: "Zwei Steuerfachangestellte im Heilberufe-Segment gefunden – Fachkräfte, die genau zu uns passen und unser Wachstum antreiben.",
    name: "Anette Benzing",
    role: "Geschäftsführerin",
    company: "adfontis Steuerberatung",
    image: "/testimonials/anette-benzing.jpg",
    category: "kanzleien",
    metric: {
      label: "Honorarvolumen",
      value: 40,
      suffix: "%",
      prefix: "+",
      direction: "up",
      description: "gesteigert",
    },
    results: [
      "2 Spezialisten für Heilberufe eingestellt – beide langfristig",
      "Honorarvolumen um 40% gesteigert durch neue Kapazität",
    ],
  },
  {
    quote: "Innerhalb von 6 Wochen hatten wir eine Top-Steuerfachangestellte und 12 neue Premium-Mandanten. Der ROI war schon im ersten Monat positiv.",
    name: "Ina Neumann",
    role: "Steuerberaterin",
    company: "Steuerkanzlei Neumann",
    image: "/testimonials/ina-neumann.jpg",
    category: "kanzleien",
    metric: {
      label: "Neumandate",
      value: 12,
      suffix: "",
      prefix: "+",
      direction: "up",
      description: "in 6 Wochen",
    },
    results: [
      "12 Premium-Mandanten in nur 6 Wochen gewonnen",
      "Top-Fachkraft eingestellt, die zum Wachstum beiträgt",
    ],
  },
  {
    quote: "Als Steuerberater und Rechtsanwalt brauche ich Mitarbeiter, die beides verstehen. OffenBoost hat mir genau diese Leute gebracht.",
    name: "Gunther Bartholomä",
    role: "Steuerberater & Rechtsanwalt",
    company: "Bartholomä Kanzlei",
    image: "/testimonials/gunther-bartholomae.webp",
    category: "kanzleien",
    metric: {
      label: "Kanzleigewinn",
      value: 55,
      suffix: "%",
      prefix: "+",
      direction: "up",
      description: "gesteigert",
    },
    results: [
      "Interdisziplinäre Fachkräfte gefunden, die langfristig bleiben",
      "Kanzleigewinn um 55% gesteigert durch höhere Mandate",
    ],
  },
  {
    quote: "Bei 140+ Mitarbeitern ist jede Fehlbesetzung teuer. OffenBoost hat uns Fachkräfte gebracht, die wirklich passen – und unser Wachstum tragen.",
    name: "Dr. Ralf Schauer",
    role: "Geschäftsführer",
    company: "Dr. Schauer Steuerberater",
    image: "/testimonials/dr-ralf-schauer.jpg",
    category: "kanzleien",
    metric: {
      label: "Mitarbeiterwachstum",
      value: 140,
      suffix: "+",
      prefix: "",
      direction: "up",
      description: "Mitarbeiter",
    },
    results: [
      "Auf über 140 Mitarbeiter skaliert mit passenden Fachkräften",
      "Fehlbesetzungsquote auf nahezu 0% gesenkt",
    ],
  },
  {
    quote: "Wir sind jetzt die Nummer 1 in der Region. Mehr Premium-Mandanten, bessere Fachkräfte, höhere Margen – alles durch OffenBoost.",
    name: "Oliver Reichelt",
    role: "Geschäftsführer",
    company: "Reichelt Steuerberatung",
    image: "/testimonials/oliver-reichelt.jpg",
    category: "kanzleien",
    metric: {
      label: "Gewinnmarge",
      value: 72,
      suffix: "%",
      prefix: "",
      direction: "up",
      description: "erreicht",
    },
    results: [
      "Regionale Marktführerschaft durch Premium-Positionierung",
      "Gewinnmarge auf 72% optimiert",
    ],
  },
  {
    quote: "Für unser Netzwerk aus Rechtsanwälten, Steuerberatern und Wirtschaftsprüfern haben wir 5 neue Fachkräfte eingestellt. Alle sind geblieben.",
    name: "Harry Kressl",
    role: "Geschäftsführender Partner",
    company: "Pfefferle Gruppe",
    image: "/testimonials/harry-kressl.jpg",
    category: "kanzleien",
    metric: {
      label: "Gruppengewinn",
      value: 50,
      suffix: "%",
      prefix: "+",
      direction: "up",
      description: "gesteigert",
    },
    results: [
      "5 Fachkräfte für 3 Fachbereiche eingestellt – alle langfristig",
      "Gruppengewinn um 50% gesteigert durch Cross-Selling",
    ],
  },
  {
    quote: "Nach 30 Jahren Kanzlei dachte ich, gutes Personal gibt es nicht mehr. OffenBoost hat mich eines Besseren belehrt – und unseren Gewinn verdoppelt.",
    name: "Karl-Heinz Thau",
    role: "Steuerberater",
    company: "Thau Steuerberater",
    image: "/testimonials/karl-heinz-thau.jpg",
    category: "kanzleien",
    metric: {
      label: "Kanzleigewinn",
      value: 100,
      suffix: "%",
      prefix: "+",
      direction: "up",
      description: "verdoppelt",
    },
    results: [
      "Kanzleigewinn verdoppelt nach 30 Jahren Stagnation",
      "Top-Nachwuchskräfte gefunden, die langfristig bleiben",
    ],
  },
  {
    quote: "Beide Standorte mit Top-Fachkräften besetzt. Die Gewinnmarge ist an beiden Standorten über 60%. Das hatten wir noch nie.",
    name: "Peter Werner",
    role: "Steuerberater & Partner",
    company: "Werner & Wollscheid",
    image: "/testimonials/peter-werner.jpg",
    category: "kanzleien",
    metric: {
      label: "Gewinnmarge",
      value: 60,
      suffix: "%",
      prefix: "+",
      direction: "up",
      description: "beide Standorte",
    },
    results: [
      "Beide Standorte mit Top-Fachkräften besetzt",
      "Gewinnmarge über 60% an beiden Standorten erreicht",
    ],
  },
  {
    quote: "Selbst im ETL-Netzwerk staunen sie über unsere Zahlen. Wir wachsen schneller als jede andere ETL-Kanzlei in der Region.",
    name: "Alfred Nelles",
    role: "Steuerberater",
    company: "ETL Nelles & Kollegen",
    image: "/testimonials/alfred-nelles.jpg",
    category: "kanzleien",
    metric: {
      label: "Kanzleigewinn",
      value: 75,
      suffix: "%",
      prefix: "+",
      direction: "up",
      description: "gesteigert",
    },
    results: [
      "Schnellste wachsende ETL-Kanzlei in der Region",
      "Top-Fachkräfte gewonnen, die das Netzwerk stärken",
    ],
  },
  {
    quote: "Als WP und StB brauchen wir hochqualifizierte Leute. OffenBoost hat uns Fachkräfte gebracht, die andere Kanzleien vergeblich suchen.",
    name: "Christian Seifert",
    role: "Wirtschaftsprüfer & Steuerberater",
    company: "KMS Partner",
    image: "/testimonials/christian-seifert.jpg",
    category: "kanzleien",
    metric: {
      label: "Honorarvolumen",
      value: 100,
      suffix: "%",
      prefix: "+",
      direction: "up",
      description: "verdoppelt",
    },
    results: [
      "Honorarvolumen verdoppelt durch neue Kapazitäten",
      "Hochqualifizierte WP-Fachkräfte in Baden-Württemberg gefunden",
    ],
  },
  {
    quote: "Generationswechsel geschafft – mit einem Team, das bleibt und einem Gewinn, der stimmt. OffenBoost hat beides geliefert.",
    name: "Jochen Beck",
    role: "Steuerberater",
    company: "Beck Steuerberatung",
    image: "/testimonials/jochen-beck.jpg",
    category: "kanzleien",
    metric: {
      label: "Kanzleigewinn",
      value: 80,
      suffix: "%",
      prefix: "+",
      direction: "up",
      description: "gesteigert",
    },
    results: [
      "Generationswechsel mit neuem Team erfolgreich gemeistert",
      "Kanzleigewinn um 80% gesteigert",
    ],
  },
  {
    quote: "Internationale Mandanten aus Japan und Deutschland betreuen – dafür brauchst du die besten Leute. OffenBoost hat sie uns gebracht.",
    name: "Ulrich Bierhaus",
    role: "Steuerberater & vereid. Buchprüfer",
    company: "Bierhaus & Partner",
    image: "/testimonials/ulrich-bierhaus.jpg",
    category: "kanzleien",
    metric: {
      label: "Internationale Mandate",
      value: 60,
      suffix: "%",
      prefix: "+",
      direction: "up",
      description: "gesteigert",
    },
    results: [
      "Spezialisierte Fachkräfte für internationale Mandate gefunden",
      "Honorarvolumen im Japan-Segment um 60% gesteigert",
    ],
  },
  {
    quote: "Die Qualität unserer Mandanten hat sich komplett verändert. Nur noch A-Mandanten, eine Gewinnmarge über 65% und ein Team, das bleibt.",
    name: "Martin Witte",
    role: "Steuerberater",
    company: "Steuerkanzlei Witte",
    image: "/testimonials/martin-witte.jpg",
    category: "kanzleien",
    metric: {
      label: "Gewinnmarge",
      value: 65,
      suffix: "%",
      prefix: "",
      direction: "up",
      description: "erreicht",
    },
    results: [
      "Nur noch A-Mandanten mit Premium-Honoraren",
      "Top-Fachkräfte eingestellt, die langfristig zum Wachstum beitragen",
    ],
  },
  // Fahrschulen
  {
    quote: "50 neue Fahrschüler in einem Monat – das sind über 175.000€ Umsatz. OffenBoost hat uns zur Top-Fahrschule in Stuttgart gemacht.",
    name: "Thomas Schille",
    role: "Inhaber",
    company: "Fahrschule Schille",
    image: "/testimonials/thomas-schille.png",
    category: "fahrschulen",
    metric: {
      label: "ROI",
      value: 10,
      suffix: "x",
      prefix: "",
      direction: "up",
      description: "Return on Investment",
    },
    results: [
      "175.000€ Umsatz durch 50 neue Fahrschüler in einem Monat",
      "Neue Fahrlehrer gewonnen trotz Fachkräftemangel",
    ],
  },
  // Praxen
  {
    quote: "Durch OffenBoost haben wir nicht nur deutlich mehr Patienten gewonnen, sondern auch unsere komplette Praxisverwaltung automatisiert. Telefonassistent, Online-Anmeldung, E-Mail-Automation – wir sparen Stunden an Bürokratie jeden Tag.",
    name: "Dr. Schmidt",
    role: "Zahnarzt & Inhaber",
    company: "Zahnärzte im Seerheincenter Konstanz",
    image: "/testimonials/dr-schmidt.jpg",
    category: "praxen",
    metric: {
      label: "Neupatientenanfragen",
      value: 140,
      suffix: "%",
      prefix: "+",
      direction: "up",
      description: "Steigerung durch gezieltes Marketing",
    },
    results: [
      "KI-Telefonassistent beantwortet 80% der Anrufe automatisch",
      "Online-Terminbuchung reduziert Verwaltungsaufwand um 15h/Woche",
      "E-Mail-Automationen für Recall, Bewertungen und Nachsorge",
    ],
  },
  // Restaurants
  {
    quote:
      "Seit über 200 Jahren führen wir den Gasthof Schwanen in fünfter Generation. Mit OffenBoost haben wir den Sprung ins digitale Zeitalter geschafft — unsere Online-Reservierungen haben sich verdreifacht und wir erreichen endlich auch die jüngere Zielgruppe.",
    name: "Dr. Frieder Baldner",
    role: "Inhaber",
    company: "Baldner's Gasthof Schwanen",
    category: "restaurants",
    metric: {
      label: "Online-Reservierungen",
      value: 210,
      suffix: "%",
      prefix: "+",
      direction: "up",
      description: "Steigerung durch digitale Sichtbarkeit",
    },
    results: [
      "Google-Sichtbarkeit von Seite 3 auf Position 1 für 'Restaurant Kehl'",
      "Online-Reservierungen um 210% gesteigert in 4 Monaten",
      "Automatisierte Bewertungsanfragen erhöhen Google-Rating auf 4,8 Sterne",
    ],
  },
];

const categories: { key: Category; label: string }[] = [
  { key: "alle", label: "Alle" },
  { key: "recruiting", label: "Recruiting" },
  { key: "kanzleien", label: "Kanzleien" },
  { key: "praxen", label: "Praxen" },
  { key: "fahrschulen", label: "Fahrschulen" },
  { key: "restaurants", label: "Restaurants" },
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

      // Easing function for smooth animation
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

const getInitials = (name: string) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("");

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState<Category>("alle");
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

  const filteredTestimonials =
    activeCategory === "alle"
      ? testimonials
      : testimonials.filter((t) => t.category === activeCategory);

  // Reset swiper when category changes
  useEffect(() => {
    if (swiperInstance) {
      swiperInstance.slideTo(0);
      setActiveIndex(0);
    }
  }, [activeCategory, swiperInstance]);

  return (
    <section className="py-16 md:py-24 bg-secondary/5">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="text-center mb-8">
          <p className="text-primary font-semibold mb-4">Kundenstimmen</p>
          <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
            Ehrliche Meinung unserer Kunden
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Schau dir an, wie wir Unternehmen aus verschiedenen Branchen beim
            Wachstum unterstützt haben.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex justify-center gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all min-h-[44px] ${
                activeCategory === cat.key
                  ? "bg-primary text-white"
                  : "bg-card text-muted-foreground hover:bg-card/80 border border-border"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Testimonials Swiper */}
      <div className="max-w-7xl mx-auto overflow-visible">
        <Swiper
          key={activeCategory} // Force re-render when category changes
          modules={[FreeMode, Pagination]}
          spaceBetween={24}
          slidesPerView="auto"
          slidesOffsetAfter={32}
          freeMode={{
            enabled: true,
            momentum: true,
            momentumRatio: 0.8,
            momentumVelocityRatio: 0.8,
          }}
          grabCursor={true}
          onSwiper={setSwiperInstance}
          onSlideChange={(swiper: SwiperType) => setActiveIndex(swiper.activeIndex)}
          className="!px-4 md:!px-8 !pb-4 [&_.swiper-wrapper]:!items-stretch"
        >
          {filteredTestimonials.map((testimonial, idx) => (
            <SwiperSlide key={`${activeCategory}-${idx}`} className="!w-[300px] md:!w-[340px] !h-full">
              <div className="bg-card rounded-2xl overflow-hidden shadow-card border border-border/50 hover:shadow-lg transition-all duration-300 group flex flex-col h-full min-h-[740px]">
                {/* Image/Video Section */}
                <div className="relative aspect-[4/3] bg-secondary overflow-hidden">
                  {testimonial.image ? (
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = "none";
                        const fallback = target.nextElementSibling;
                        if (fallback) fallback.classList.remove("hidden");
                      }}
                    />
                  ) : null}
                  {/* Fallback for no image */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center ${
                      testimonial.image ? "hidden" : ""
                    }`}
                  >
                    <span className="text-6xl font-bold text-primary/40">
                      {getInitials(testimonial.name)}
                    </span>
                  </div>

                  {/* Video Play Button Overlay */}
                  {testimonial.videoUrl && (
                    <a
                      href={testimonial.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center hover:scale-110 transition-transform shadow-lg">
                        <Play className="w-6 h-6 text-primary-foreground fill-current ml-1" />
                      </div>
                    </a>
                  )}

                  {/* Company Badge */}
                  <div className="absolute bottom-3 left-3 bg-card/95 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm">
                    {testimonial.company}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                  {/* Quote */}
                  <blockquote className="text-foreground font-medium mb-4 line-clamp-3 min-h-[4.5rem]">
                    "{testimonial.quote}"
                  </blockquote>

                  {/* Author */}
                  <div className="flex items-center gap-3 mb-6 pb-6 border-b border-border/50">
                    <div>
                      <p className="font-bold text-foreground">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>

                  {/* Metric Card */}
                  <div className="bg-muted/50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">{testimonial.metric.label}</span>
                      {testimonial.metric.direction === "up" ? (
                        <TrendingUp className="w-4 h-4 text-primary" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-success" />
                      )}
                    </div>

                    <div className="flex items-baseline gap-2">
                      <span className={`text-4xl font-bold ${
                        testimonial.metric.direction === "up" ? "text-primary" : "text-success"
                      }`}>
                        <AnimatedCounter
                          value={testimonial.metric.value}
                          prefix={testimonial.metric.prefix}
                          suffix={testimonial.metric.suffix}
                        />
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {testimonial.metric.description}
                      </span>
                    </div>

                    {/* Mini Bar Chart Animation */}
                    <div className="flex items-end gap-1 h-8 mt-4">
                      {Array.from({ length: 8 }).map((_, i) => {
                        const isDown = testimonial.metric.direction === "down";
                        const height = isDown
                          ? Math.max(20, 100 - i * 12)
                          : Math.min(100, 25 + i * 10);
                        return (
                          <div
                            key={i}
                            className={`flex-1 rounded-t transition-all duration-500 ${
                              isDown ? "bg-success/40" : "bg-primary/40"
                            }`}
                            style={{
                              height: `${height}%`,
                              transitionDelay: `${i * 50}ms`
                            }}
                          />
                        );
                      })}
                    </div>
                  </div>

                  {/* Results List */}
                  <div className="mt-4 space-y-2">
                    {testimonial.results.map((result, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <ArrowUpRight className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>{result}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Pagination Dots - nur auf Mobile */}
        <div className="flex justify-center gap-2 mt-6 lg:hidden">
          {filteredTestimonials.map((_, index) => (
            <div
              key={index}
              className={`rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? "w-6 h-2 bg-secondary"
                  : "w-2 h-2 bg-secondary/30"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
