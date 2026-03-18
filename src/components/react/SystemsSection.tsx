import { useState } from "react";
import { Check, DollarSign, Package, TrendingUp } from "lucide-react";
import CalendarAnimation from "./CalendarAnimation";
import FulfillmentAnimation from "./FulfillmentAnimation";
import ProfitmargenAnimation from "./ProfitmargenAnimation";

type TabKey = "akquise" | "fulfillment" | "profitmargen";

const systems: Record<TabKey, {
  title: string;
  features: string[];
  icon: React.ReactNode;
  animation: string;
}> = {
  akquise: {
    title: "Rulebreaker Akquise",
    features: [
      "Wir entwickeln einen Vertriebsprozess, der genau auf dein Business zugeschnitten ist",
      "Diesen Prozess implementieren wir Done-4-You",
      "Wir übernehmen den kompletten Aufbau, damit du dich auf Umsatz statt Akquise konzentrieren kannst.",
    ],
    icon: <DollarSign className="w-5 h-5" />,
    animation: "calendar", // Special case - uses CalendarAnimation component
  },
  fulfillment: {
    title: "Rulebreaker Fullfilment",
    features: [
      "Wiederkehrende Aufgaben, Dateien, Mails und Reminder werden über Automatisierungen gesteuert",
      "Deine Kunden erhalten ein sauberes, professionelles Erlebnis – mit klaren Meilensteinen",
      "So skalierst du dein Angebot, ohne bei jedem neuen Kunden wieder im operativen Chaos zu landen.",
    ],
    icon: <Package className="w-5 h-5" />,
    animation: "/animations/fulfillment.svg",
  },
  profitmargen: {
    title: "Rulebreaker Profitmargen",
    features: [
      "Wir analysieren dein aktuelles Angebots- und Preismodell für maximale Marge",
      "Durch Automatisierung und schlanke Prozesse senken wir deine operativen Kosten pro Kunde",
      "Am Ende siehst du schwarz auf weiß, welche Produkte, Kanäle und Kundensegmente wirklich profitabel sind.",
    ],
    icon: <TrendingUp className="w-5 h-5" />,
    animation: "/animations/profitmargen.svg",
  },
};

const SystemsSection = () => {
  const [activeTab, setActiveTab] = useState<TabKey>("akquise");

  const tabs: { key: TabKey; label: string; emoji: string }[] = [
    { key: "akquise", label: "Akquise & Sales", emoji: "💰" },
    { key: "fulfillment", label: "Fullfilement", emoji: "📦" },
    { key: "profitmargen", label: "Profitmargen", emoji: "📈" },
  ];

  const renderAnimation = () => {
    switch (activeTab) {
      case "akquise":
        return <CalendarAnimation />;
      case "fulfillment":
        return <FulfillmentAnimation />;
      case "profitmargen":
        return <ProfitmargenAnimation />;
      default:
        return null;
    }
  };

  return (
    <section className="py-16 md:py-24 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="section-heading mb-4">Bewährte Rulebreaker-Systeme</h2>
          <p className="section-subheading mx-auto">
            Unsere Systeme kombinieren Automatisierung, Datenintelligenz und klare Vertriebsstrategien für planbare Kundengewinnung statt Zufall.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 ${
                activeTab === tab.key
                  ? "bg-secondary text-secondary-foreground shadow-lg"
                  : "bg-card text-muted-foreground hover:bg-muted border border-border/50"
              }`}
            >
              <span className="text-lg">{tab.emoji}</span>
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Animation Visual */}
          <div
            className="bg-card rounded-2xl p-4 shadow-card border border-border/50 order-2 lg:order-1 animate-fade-in overflow-hidden min-h-[360px] md:min-h-[440px]"
            key={`visual-${activeTab}`}
          >
            <div className="w-full">
              {renderAnimation()}
            </div>
          </div>

          {/* Features */}
          <div className="space-y-6 order-1 lg:order-2 animate-fade-in" key={activeTab}>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                {systems[activeTab].icon}
              </div>
              <h3 className="text-2xl font-bold text-secondary">
                {systems[activeTab].title}
              </h3>
            </div>

            <ul className="space-y-4">
              {systems[activeTab].features.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SystemsSection;
