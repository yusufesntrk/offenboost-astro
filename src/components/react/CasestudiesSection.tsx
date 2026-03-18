import { Play, Check, TrendingUp, TrendingDown, Star, Building2, Users, Stethoscope, UtensilsCrossed } from "lucide-react";
import { useState, useEffect, useRef } from "react";

type Category = "alle" | "recruiting" | "kanzleien" | "praxen" | "fahrschulen" | "restaurants";

interface CaseStudy {
  name: string;
  role?: string;
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
    name: "Yasar Sentürk",
    role: "Geschäftsführer",
    company: "searched GmbH",
    image: "/testimonials/yasar-sentuerk.png",

    quote: "Dank OffenBoost haben wir die Sparkasse als Kunden gewonnen und direkt eine 200k Upfront Fee kassiert. Reverse Recruiting auf einem ganz anderen Level.",
    headline: "Sparkasse als Kunde gewonnen und 200k Upfront Fee mit Reverse Recruiting kassiert",
    category: "recruiting",
    results: [
      "Sparkasse Finanzsparkasse als Großkunde gewonnen",
      "200k Upfront Fee durch Reverse Recruiting Ansatz kassiert",
      "Skalierung auf Top-Konzerne durch automatisierte Sales-Prozesse",
    ],
    metric: {
      label: "Upfront Fee",
      value: 200,
      suffix: "k",
      prefix: "",
      direction: "up",
      description: "kassiert"
    },
  },
  {
    name: "Rüdiger Bruns",
    role: "Geschäftsführer",
    company: "AMONOVA GmbH",
    image: "/testimonials/ruediger-bruns.jpg",
    quote: "Das 1:1 ist mit keinem anderen Dienstleister zu vergleichen. Man wird rund um die Uhr betreut und eigene Wünsche, die höchst individuell sind, werden umgesetzt.",
    headline: "Trotz schwieriger Recruiting-Lage Konzerne an hart umkämpftem Standort gewonnen",
    category: "recruiting",
    results: [
      "Trotz schwieriger Recruiting-Lage neue Sales generiert",
      "Konzerne als Neukunden an hart umkämpftem Standort gesichert",
      "Sales ROI von 5x bei individueller 1:1 Betreuung",
    ],
    metric: {
      label: "Sales ROI",
      value: 5,
      suffix: "x",
      prefix: "",
      direction: "up",
      description: "Return on Investment"
    },
  },
  {
    name: "Dr. Thomas Wendel",
    role: "Geschäftsführer",
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
  {
    name: "Bahadir Battal",
    role: "Gründer & Recruiting Experte",
    company: "VeraPartners Leadership",
    image: "/testimonials/bahadir-battal.jpg",
    quote: "Durch OffenBoost haben wir unsere Sales-Pipeline komplett transformiert. Wir generieren jetzt deutlich mehr qualifizierte Leads als vorher.",
    headline: "Sales-Pipeline um 65% gesteigert durch automatisierte Lead-Generierung",
    category: "recruiting",
    results: [
      "Sales-Pipeline um 65% gesteigert",
      "Qualifizierte Leads durch automatisierte Ansprache gewonnen",
      "Mehr Abschlüsse durch datengetriebene Sales-Prozesse",
    ],
    metric: {
      label: "Sales-Pipeline",
      value: 65,
      suffix: "%",
      prefix: "+",
      direction: "up",
      description: "mehr Leads"
    },
  },
  {
    name: "Alireza Nikjou",
    role: "Geschäftsführer",
    company: "Experiton UG",
    image: "/testimonials/alireza-nikjou.png",
    quote: "Durch OffenBoost konnten wir unseren Sales-Output verdreifachen – und das bei weniger Aufwand.",
    headline: "Sales-Output um 300% gesteigert bei gleichzeitig weniger Aufwand",
    category: "recruiting",
    results: [
      "Sales-Output um 300% gesteigert",
      "Lead-Generierung vollständig automatisiert",
      "Mehr Abschlüsse bei weniger manuellem Aufwand",
    ],
    metric: {
      label: "Sales-Output",
      value: 300,
      suffix: "%",
      prefix: "+",
      direction: "up",
      description: "gesteigert"
    },
  },
  {
    name: "Hasim Pacal",
    role: "Geschäftsführer",
    company: "Kerkhoff Experts GmbH",
    image: "/testimonials/hasim-pacal.jpg",
    quote: "OffenBoost hat unsere Expertenvermittlung auf ein neues Level gebracht. Wir platzieren jetzt doppelt so viele Interim Manager im Einkauf und Supply Chain – und die Kunden kommen von selbst.",
    headline: "Vermittlungsvolumen um 120% gesteigert und DAX-Konzerne als Neukunden gewonnen",
    category: "recruiting",
    results: [
      "Vermittlungsvolumen um 120% gesteigert durch automatisierte Akquise",
      "DAX-Konzerne als neue Auftraggeber für Interim Management gewonnen",
      "Time-to-Fill für Einkaufs- und Supply-Chain-Experten halbiert",
    ],
    metric: {
      label: "Vermittlungsvolumen",
      value: 120,
      suffix: "%",
      prefix: "+",
      direction: "up",
      description: "gesteigert"
    },
  },
  {
    name: "Nordin Begdouri",
    role: "Geschäftsführer",
    company: "SalesWorx",
    image: "/testimonials/nordin-begdouri.jpg",

    quote: "Seitdem das System läuft, fühlt sich Sales wie Cheaten an.",
    headline: "Sales-Abschlüsse um 80% gesteigert durch automatisierte Prozesse",
    category: "recruiting",
    results: [
      "Sales-Abschlussrate um 80% gesteigert",
      "Kompletter Sales-Funnel automatisiert",
      "Mehr Deals bei weniger manuellem Aufwand",
    ],
    metric: {
      label: "Sales-Abschlüsse",
      value: 80,
      suffix: "%",
      prefix: "+",
      direction: "up",
      description: "gesteigert"
    },
  },
  // Kanzleien
  {
    name: "Jürgen Berger",
    role: "Steuerberater & Partner",
    company: "B&L Berger Lindzus Lutz",
    image: "/testimonials/juergen-berger.jpg",
    quote: "Innerhalb von 4 Wochen hatten wir die Steuerfachangestellte eingestellt, die wir seit Monaten gesucht haben. Gleichzeitig haben sich unsere Neumandate verdoppelt.",
    headline: "Gewinnmarge auf 70% optimiert und Top-Fachkraft in 4 Wochen eingestellt",
    category: "kanzleien",
    results: [
      "Gewinnmarge auf 70% optimiert durch Premium-Mandanten",
      "Top-Steuerfachangestellte in nur 4 Wochen eingestellt",
      "Neumandate verdoppelt durch gezielte Mandantenakquise",
    ],
    metric: {
      label: "Gewinnmarge",
      value: 70,
      suffix: "%",
      prefix: "",
      direction: "up",
      description: "optimiert"
    },
  },
  {
    name: "Christian Eckhardt",
    role: "Steuerberater & Partner",
    company: "Quentin / Quitter & Eckhardt",
    image: "/testimonials/christian-eckhardt.jpg",
    quote: "Wir haben drei Steuerfachangestellte gefunden, die alle langfristig geblieben sind. Gleichzeitig hat sich unser Kanzleigewinn fast verdoppelt.",
    headline: "3 Top-Fachkräfte langfristig eingestellt und Kanzleigewinn um 85% gesteigert",
    category: "kanzleien",
    results: [
      "3 Top-Steuerfachangestellte eingestellt – alle langfristig geblieben",
      "Kanzleigewinn um 85% gesteigert durch mehr Kapazität",
      "Mandantenqualität radikal verbessert durch selektive Annahme",
    ],
    metric: {
      label: "Kanzleigewinn",
      value: 85,
      suffix: "%",
      prefix: "+",
      direction: "up",
      description: "gesteigert"
    },
  },
  {
    name: "Martina Kronbiegel",
    role: "Steuerberaterin",
    company: "Kanzlei Kronbiegel",
    image: "/testimonials/martina-kronbiegel.jpg",
    quote: "1-3 Premium-Mandantenanfragen pro Woche, 90% davon hochqualifiziert. Unsere Gewinnmarge ist explodiert, weil wir uns endlich die Mandanten aussuchen können.",
    headline: "90% qualifizierte Anfragen und Gewinnmarge radikal gesteigert",
    category: "kanzleien",
    results: [
      "Bis zu 3 Premium-Mandantenanfragen pro Woche generiert",
      "90% der Anfragen sind hochqualifizierte A-Mandanten",
      "Gewinnmarge radikal gesteigert durch selektive Mandatsannahme",
    ],
    metric: {
      label: "Anfragen/Woche",
      value: 3,
      suffix: "",
      prefix: "bis ",
      direction: "up",
      description: "qualifiziert"
    },
  },
  {
    name: "Marc Wüst",
    role: "Steuerberater & Partner",
    company: "adam, wüst & partner",
    image: "/testimonials/marc-wuest.jpg",
    quote: "Zwei Steuerfachangestellte eingestellt, die andere Kanzleien seit Monaten suchen. Der Kanzleigewinn hat sich dadurch verdoppelt.",
    headline: "Kanzleigewinn verdoppelt durch 2 Top-Fachkräfte, die langfristig bleiben",
    category: "kanzleien",
    results: [
      "Kanzleigewinn verdoppelt durch mehr Kapazität und Premium-Mandate",
      "2 Top-Steuerfachangestellte eingestellt, die langfristig bleiben",
      "Erste qualifizierte Bewerbungen bereits nach 2 Wochen erhalten",
    ],
    metric: {
      label: "Kanzleigewinn",
      value: 100,
      suffix: "%",
      prefix: "+",
      direction: "up",
      description: "verdoppelt"
    },
  },
  {
    name: "Florian Rendler",
    role: "Geschäftsführer",
    company: "Rendler & Hoferer",
    image: "/testimonials/florian-rendler.jpg",
    quote: "In einer Region, wo jede Kanzlei um Fachkräfte kämpft, haben wir drei neue Mitarbeiter gewonnen. Der Umsatz pro Mitarbeiter ist um 60% gestiegen.",
    headline: "3 Fachkräfte in hart umkämpfter Region gewonnen und Umsatz/Mitarbeiter um 60% gesteigert",
    category: "kanzleien",
    results: [
      "3 Fachkräfte gewonnen in hart umkämpfter Region",
      "Umsatz pro Mitarbeiter um 60% gesteigert",
      "Alle Neueinstellungen langfristig im Unternehmen geblieben",
    ],
    metric: {
      label: "Umsatz/Mitarbeiter",
      value: 60,
      suffix: "%",
      prefix: "+",
      direction: "up",
      description: "gesteigert"
    },
  },
  {
    name: "Peter Gilpert",
    role: "Steuerberater & Geschäftsführer",
    company: "Gilpert & Kollegen",
    image: "/testimonials/peter-gilpert.jpg",
    quote: "Wir nehmen nur noch Mandanten mit Honoraren über 500€/Monat an. Unsere Gewinnmarge liegt jetzt bei über 65%. Vorher undenkbar.",
    headline: "Nur noch Premium-Mandate ab 500€/Monat – Gewinnmarge auf 65% katapultiert",
    category: "kanzleien",
    results: [
      "Nur noch Premium-Mandate ab 500€/Monat angenommen",
      "Gewinnmarge von unter 40% auf über 65% katapultiert",
      "Top-Fachkräfte eingestellt, die zum Wachstum beitragen",
    ],
    metric: {
      label: "Gewinnmarge",
      value: 65,
      suffix: "%",
      prefix: "",
      direction: "up",
      description: "erreicht"
    },
  },
  {
    name: "Anette Benzing",
    role: "Geschäftsführerin",
    company: "adfontis Steuerberatung",
    image: "/testimonials/anette-benzing.jpg",
    quote: "Zwei Steuerfachangestellte im Heilberufe-Segment gefunden – Fachkräfte, die genau zu uns passen und unser Wachstum antreiben.",
    headline: "2 Spezialisten für Heilberufe eingestellt und Honorarvolumen um 40% gesteigert",
    category: "kanzleien",
    results: [
      "2 Spezialisten für Heilberufe eingestellt – beide langfristig geblieben",
      "Honorarvolumen um 40% gesteigert durch neue Kapazität",
      "Team von 17 auf 19 Mitarbeiter durch Top-Fachkräfte erweitert",
    ],
    metric: {
      label: "Honorarvolumen",
      value: 40,
      suffix: "%",
      prefix: "+",
      direction: "up",
      description: "gesteigert"
    },
  },
  {
    name: "Ina Neumann",
    role: "Steuerberaterin",
    company: "Steuerkanzlei Neumann",
    image: "/testimonials/ina-neumann.jpg",
    quote: "Innerhalb von 6 Wochen hatten wir eine Top-Steuerfachangestellte und 12 neue Premium-Mandanten. Der ROI war schon im ersten Monat positiv.",
    headline: "12 Premium-Mandanten in 6 Wochen und Top-Fachkraft eingestellt",
    category: "kanzleien",
    results: [
      "12 Premium-Mandanten in nur 6 Wochen gewonnen",
      "Top-Steuerfachangestellte eingestellt, die langfristig bleibt",
      "ROI bereits im ersten Monat positiv",
    ],
    metric: {
      label: "Neumandate",
      value: 12,
      suffix: "",
      prefix: "+",
      direction: "up",
      description: "in 6 Wochen"
    },
  },
  {
    name: "Gunther Bartholomä",
    role: "Steuerberater & Rechtsanwalt",
    company: "Bartholomä Kanzlei",
    image: "/testimonials/gunther-bartholomae.webp",
    quote: "Als Steuerberater und Rechtsanwalt brauche ich Mitarbeiter, die beides verstehen. OffenBoost hat mir genau diese Leute gebracht.",
    headline: "Interdisziplinäre Fachkräfte gefunden und Kanzleigewinn um 55% gesteigert",
    category: "kanzleien",
    results: [
      "Interdisziplinäre Fachkräfte gefunden, die langfristig bleiben",
      "Kanzleigewinn um 55% gesteigert durch höherwertige Mandate",
      "Steuerrecht und Rechtsberatung optimal besetzt",
    ],
    metric: {
      label: "Kanzleigewinn",
      value: 55,
      suffix: "%",
      prefix: "+",
      direction: "up",
      description: "gesteigert"
    },
  },
  {
    name: "Dr. Ralf Schauer",
    role: "Geschäftsführer",
    company: "Dr. Schauer Steuerberater",
    image: "/testimonials/dr-ralf-schauer.jpg",
    quote: "Bei 140+ Mitarbeitern ist jede Fehlbesetzung teuer. OffenBoost hat uns Fachkräfte gebracht, die wirklich passen – und unser Wachstum tragen.",
    headline: "Auf über 140 Mitarbeiter skaliert mit passenden Fachkräften ohne Fehlbesetzungen",
    category: "kanzleien",
    results: [
      "Auf über 140 Mitarbeiter skaliert mit passenden Fachkräften",
      "Fehlbesetzungsquote auf nahezu 0% gesenkt",
      "Jede Neueinstellung trägt zum Unternehmenswachstum bei",
    ],
    metric: {
      label: "Mitarbeiter",
      value: 140,
      suffix: "+",
      prefix: "",
      direction: "up",
      description: "skaliert"
    },
  },
  {
    name: "Oliver Reichelt",
    role: "Geschäftsführer",
    company: "Reichelt Steuerberatung",
    image: "/testimonials/oliver-reichelt.jpg",
    quote: "Wir sind jetzt die Nummer 1 in der Region. Mehr Premium-Mandanten, bessere Fachkräfte, höhere Margen – alles durch OffenBoost.",
    headline: "Regionale Marktführerschaft erreicht mit 72% Gewinnmarge",
    category: "kanzleien",
    results: [
      "Regionale Marktführerschaft durch Premium-Positionierung erreicht",
      "Gewinnmarge auf 72% optimiert",
      "Top-Fachkräfte in der Region gesichert, die langfristig bleiben",
    ],
    metric: {
      label: "Gewinnmarge",
      value: 72,
      suffix: "%",
      prefix: "",
      direction: "up",
      description: "erreicht"
    },
  },
  {
    name: "Harry Kressl",
    role: "Geschäftsführender Partner",
    company: "Pfefferle Gruppe",
    image: "/testimonials/harry-kressl.jpg",
    quote: "Für unser Netzwerk aus Rechtsanwälten, Steuerberatern und Wirtschaftsprüfern haben wir 5 neue Fachkräfte eingestellt. Alle sind geblieben.",
    headline: "5 Fachkräfte für 3 Fachbereiche eingestellt und Gruppengewinn um 50% gesteigert",
    category: "kanzleien",
    results: [
      "5 Fachkräfte für 3 Fachbereiche eingestellt – alle langfristig geblieben",
      "Gruppengewinn um 50% gesteigert durch Cross-Selling",
      "Netzwerk-Synergien zwischen RA, StB und WP voll ausgeschöpft",
    ],
    metric: {
      label: "Gruppengewinn",
      value: 50,
      suffix: "%",
      prefix: "+",
      direction: "up",
      description: "gesteigert"
    },
  },
  {
    name: "Karl-Heinz Thau",
    role: "Steuerberater",
    company: "Thau Steuerberater",
    image: "/testimonials/karl-heinz-thau.jpg",
    quote: "Nach 30 Jahren Kanzlei dachte ich, gutes Personal gibt es nicht mehr. OffenBoost hat mich eines Besseren belehrt – und unseren Gewinn verdoppelt.",
    headline: "Kanzleigewinn verdoppelt nach 30 Jahren und Top-Nachwuchskräfte gefunden",
    category: "kanzleien",
    results: [
      "Kanzleigewinn verdoppelt nach 30 Jahren Stagnation",
      "Top-Nachwuchskräfte gefunden, die langfristig bleiben",
      "Nachfolgeplanung durch junge Talente gesichert",
    ],
    metric: {
      label: "Kanzleigewinn",
      value: 100,
      suffix: "%",
      prefix: "+",
      direction: "up",
      description: "verdoppelt"
    },
  },
  {
    name: "Peter Werner",
    role: "Steuerberater & Partner",
    company: "Werner & Wollscheid",
    image: "/testimonials/peter-werner.jpg",
    quote: "Beide Standorte mit Top-Fachkräften besetzt. Die Gewinnmarge ist an beiden Standorten über 60%. Das hatten wir noch nie.",
    headline: "Beide Standorte mit Top-Fachkräften besetzt und 60%+ Gewinnmarge erreicht",
    category: "kanzleien",
    results: [
      "Beide Standorte mit Top-Fachkräften vollständig besetzt",
      "Gewinnmarge über 60% an beiden Standorten erreicht",
      "Alle Neueinstellungen langfristig im Unternehmen geblieben",
    ],
    metric: {
      label: "Gewinnmarge",
      value: 60,
      suffix: "%+",
      prefix: "",
      direction: "up",
      description: "beide Standorte"
    },
  },
  {
    name: "Alfred Nelles",
    role: "Steuerberater",
    company: "ETL Nelles & Kollegen",
    image: "/testimonials/alfred-nelles.jpg",
    quote: "Selbst im ETL-Netzwerk staunen sie über unsere Zahlen. Wir wachsen schneller als jede andere ETL-Kanzlei in der Region.",
    headline: "Schnellste wachsende ETL-Kanzlei in der Region mit 75% mehr Gewinn",
    category: "kanzleien",
    results: [
      "Schnellste wachsende ETL-Kanzlei in der Region",
      "Kanzleigewinn um 75% gesteigert",
      "Top-Fachkräfte gewonnen, die das Netzwerk stärken",
    ],
    metric: {
      label: "Kanzleigewinn",
      value: 75,
      suffix: "%",
      prefix: "+",
      direction: "up",
      description: "gesteigert"
    },
  },
  {
    name: "Christian Seifert",
    role: "Wirtschaftsprüfer & Steuerberater",
    company: "KMS Partner",
    image: "/testimonials/christian-seifert.jpg",
    quote: "Als WP und StB brauchen wir hochqualifizierte Leute. OffenBoost hat uns Fachkräfte gebracht, die andere Kanzleien vergeblich suchen.",
    headline: "Honorarvolumen verdoppelt durch hochqualifizierte WP-Fachkräfte",
    category: "kanzleien",
    results: [
      "Honorarvolumen verdoppelt durch neue Kapazitäten",
      "Hochqualifizierte WP-Fachkräfte in Baden-Württemberg gefunden",
      "Mandanten-Portfolio auf Premium-Segment umgestellt",
    ],
    metric: {
      label: "Honorarvolumen",
      value: 100,
      suffix: "%",
      prefix: "+",
      direction: "up",
      description: "verdoppelt"
    },
  },
  {
    name: "Jochen Beck",
    role: "Steuerberater",
    company: "Beck Steuerberatung",
    image: "/testimonials/jochen-beck.jpg",
    quote: "Generationswechsel geschafft – mit einem Team, das bleibt und einem Gewinn, der stimmt. OffenBoost hat beides geliefert.",
    headline: "Generationswechsel gemeistert mit neuem Team und 80% mehr Gewinn",
    category: "kanzleien",
    results: [
      "Generationswechsel mit neuem Team erfolgreich gemeistert",
      "Kanzleigewinn um 80% gesteigert",
      "Junge Talente gewonnen, die die Kanzlei langfristig tragen",
    ],
    metric: {
      label: "Kanzleigewinn",
      value: 80,
      suffix: "%",
      prefix: "+",
      direction: "up",
      description: "gesteigert"
    },
  },
  {
    name: "Ulrich Bierhaus",
    role: "Steuerberater & vereid. Buchprüfer",
    company: "Bierhaus & Partner",
    image: "/testimonials/ulrich-bierhaus.jpg",
    quote: "Internationale Mandanten aus Japan und Deutschland betreuen – dafür brauchst du die besten Leute. OffenBoost hat sie uns gebracht.",
    headline: "Spezialisierte Fachkräfte für internationale Mandate und 60% mehr Honorarvolumen",
    category: "kanzleien",
    results: [
      "Spezialisierte Fachkräfte für internationale Mandate gefunden",
      "Honorarvolumen im Japan-Segment um 60% gesteigert",
      "Langfristige Mitarbeiterbindung durch perfekten Cultural Fit",
    ],
    metric: {
      label: "Honorarvolumen",
      value: 60,
      suffix: "%",
      prefix: "+",
      direction: "up",
      description: "gesteigert"
    },
  },
  {
    name: "Martin Witte",
    role: "Steuerberater",
    company: "Steuerkanzlei Witte",
    image: "/testimonials/martin-witte.jpg",
    quote: "Die Qualität unserer Mandanten hat sich komplett verändert. Nur noch A-Mandanten, eine Gewinnmarge über 65% und ein Team, das bleibt.",
    headline: "Nur noch A-Mandanten, 65% Gewinnmarge und Top-Fachkräfte die bleiben",
    category: "kanzleien",
    results: [
      "Nur noch A-Mandanten mit Premium-Honoraren",
      "Gewinnmarge auf über 65% optimiert",
      "Top-Fachkräfte eingestellt, die langfristig zum Wachstum beitragen",
    ],
    metric: {
      label: "Gewinnmarge",
      value: 65,
      suffix: "%",
      prefix: "",
      direction: "up",
      description: "erreicht"
    },
  },
  // Fahrschulen
  {
    name: "Thomas Schille",
    role: "Inhaber",
    company: "Fahrschule Schille",
    image: "/testimonials/thomas-schille.png",
    quote: "50 neue Fahrschüler in einem Monat – das sind über 175.000€ Umsatz. OffenBoost hat uns zur Top-Fahrschule in Stuttgart gemacht.",
    headline: "50 neue Fahrschüler, 175.000€ Umsatz in einem Monat und neue Fahrlehrer trotz Fachkräftemangel",
    category: "fahrschulen",
    results: [
      "50 neue Fahrschüler-Anfragen in nur einem Monat generiert",
      "175.000€ Umsatzpotenzial durch neue Anmeldungen",
      "Neue Fahrlehrer gewonnen trotz akutem Fachkräftemangel in der Branche",
    ],
    metric: {
      label: "ROI",
      value: 10,
      suffix: "x",
      prefix: "",
      direction: "up",
      description: "Return on Investment"
    },
  },
  // Praxen
  {
    name: "Dr. Schmidt",
    role: "Zahnarzt & Inhaber",
    company: "Zahnärzte im Seerheincenter Konstanz",
    image: "/testimonials/dr-schmidt.jpg",
    quote: "Durch OffenBoost haben wir nicht nur deutlich mehr Patienten gewonnen, sondern auch unsere komplette Praxisverwaltung automatisiert. Telefonassistent, Online-Anmeldung, E-Mail-Automation – wir sparen Stunden an Bürokratie jeden Tag.",
    headline: "+140% Neupatientenanfragen und komplette Praxisautomation mit KI-Telefonassistent",
    category: "praxen",
    results: [
      "KI-Telefonassistent beantwortet 80% der Anrufe automatisch",
      "Online-Terminbuchung reduziert Verwaltungsaufwand um 15h/Woche",
      "E-Mail-Automationen für Recall, Bewertungen und Nachsorge",
    ],
    metric: {
      label: "Neupatientenanfragen",
      value: 140,
      suffix: "%",
      prefix: "+",
      direction: "up",
      description: "Steigerung durch gezieltes Marketing",
    },
  },
  // Restaurants
  {
    name: "Dr. Frieder Baldner",
    role: "Inhaber",
    company: "Baldner's Gasthof Schwanen",
    quote:
      "Seit über 200 Jahren führen wir den Gasthof Schwanen in fünfter Generation. Mit OffenBoost haben wir den Sprung ins digitale Zeitalter geschafft — unsere Online-Reservierungen haben sich verdreifacht und wir erreichen endlich auch die jüngere Zielgruppe.",
    headline: "Traditionsrestaurant seit 1820 erobert die digitale Welt",
    results: [
      "Google-Sichtbarkeit von Seite 3 auf Position 1 für 'Restaurant Kehl'",
      "Online-Reservierungen um 210% gesteigert in 4 Monaten",
      "Automatisierte Bewertungsanfragen erhöhen Google-Rating auf 4,8 Sterne",
      "Social-Media-Präsenz aufgebaut mit 35% mehr Laufkundschaft",
    ],
    category: "restaurants",
    metric: {
      label: "Online-Reservierungen",
      value: 210,
      suffix: "%",
      prefix: "+",
      direction: "up",
      description: "Steigerung durch digitale Sichtbarkeit",
    },
  },
];

const categories: { key: Category; label: string; icon: React.ElementType }[] = [
  { key: "alle", label: "Alle", icon: Star },
  { key: "recruiting", label: "Recruiting", icon: Users },
  { key: "kanzleien", label: "Kanzleien", icon: Building2 },
  { key: "praxen", label: "Praxen", icon: Stethoscope },
  { key: "fahrschulen", label: "Fahrschulen", icon: Users },
  { key: "restaurants", label: "Restaurants", icon: UtensilsCrossed },
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
                      {study.role && <p className="text-xs text-secondary-foreground/60">{study.role}</p>}
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
