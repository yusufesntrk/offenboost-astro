import { Check, FileText, Users, Network } from "lucide-react";
import TalentSaverAnimation from "./TalentSaverAnimation";
import ShortSelectAnimation from "./ShortSelectAnimation";
import CandidateClusterAnimation from "./CandidateClusterAnimation";

// Animation Aspect-Ratios basierend auf viewBox:
// - TalentSaver: viewBox 800x480 = 5:3
// - ShortSelect: viewBox 800x600 = 4:3
// - CandidateCluster: viewBox 720x600 = 6:5
const products = [
  {
    id: "talentsaver",
    title: "TalentSaver",
    subtitle: "Kandidatenprofile im Corporate Design",
    features: [
      "Lebensläufe automatisch ins Corporate Design transformieren",
      "Anonymisierung für diskrete Präsentation",
      "Sprachliche Anpassung an Ihren Agentur-Stil",
      "Ein-Klick Export als PDF",
    ],
    icon: <FileText className="w-5 h-5" />,
    Animation: TalentSaverAnimation,
    aspectRatio: "aspect-[5/3]", // viewBox 800x480
  },
  {
    id: "shortselect",
    title: "ShortSelect",
    subtitle: "Das ATS für Recruiting-Agenturen",
    features: [
      "Multi-Channel Multiposting auf 2.500+ Stellenbörsen",
      "AI-gestütztes Candidate Matching",
      "Integriertes E-Mail, SMS & WhatsApp",
      "Automatisierte Pipeline-Workflows",
    ],
    icon: <Users className="w-5 h-5" />,
    Animation: ShortSelectAnimation,
    aspectRatio: "aspect-[4/3]", // viewBox 800x600
  },
  {
    id: "candidatecluster",
    title: "CandidateCluster",
    subtitle: "Der Marktplatz für Agenturen",
    features: [
      "Anonymisierter Kandidaten-Marktplatz",
      "Hot-Match Alerts bei >85% Score",
      "Automatische Kontaktfreigabe",
      "Transparentes Provisions-Tracking",
    ],
    icon: <Network className="w-5 h-5" />,
    Animation: CandidateClusterAnimation,
    aspectRatio: "aspect-[6/5]", // viewBox 720x600
  },
];

const ProductsSection = () => {
  return (
    <section className="py-16 md:py-24 px-4 md:px-8 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Unsere Produkte
          </span>
          <h2 className="section-heading mb-4">
            Speziell für Recruiting-Agenturen entwickelt
          </h2>
          <p className="section-subheading mx-auto">
            Diese Tools haben unseren Kunden geholfen, mehr Umsatz zu generieren,
            ihr Fulfillment zu optimieren und ihr Geschäft planbar zu skalieren.
          </p>
        </div>

        {/* Product Cards Grid - alle 3 sichtbar */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex flex-col bg-card rounded-2xl p-6 border border-border/50 hover:border-primary/30 transition-all duration-300"
            >
              {/* Icon + Title */}
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  {product.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-secondary">
                    {product.title}
                  </h3>
                </div>
              </div>

              {/* Subtitle */}
              <p className="text-muted-foreground text-sm mb-4">
                {product.subtitle}
              </p>

              {/* Animation - individuelles Aspect-Ratio basierend auf viewBox */}
              <div className={`bg-background/50 rounded-xl p-3 mb-4 ${product.aspectRatio} overflow-hidden`}>
                <product.Animation />
              </div>

              {/* Features */}
              <ul className="space-y-2 flex-1 mb-4">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href="/termin"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary/90 text-white text-sm font-semibold rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-lg shadow-md shadow-primary/25"
              >
                Mehr erfahren
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
