import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Was macht OffenBoost?",
    answer:
      "OffenBoost ist Ihr Wachstumspartner aus Offenburg. Wir bieten Marketing & Growth Services, Sales-Systeme, Webentwicklung und strategische Beratung aus einer Hand – alles mit dem Ziel, Ihr Unternehmen nachhaltig wachsen zu lassen.",
  },
  {
    question: "Für wen sind eure Leistungen geeignet?",
    answer:
      "Unsere Leistungen eignen sich für kleine und mittelständische Unternehmen, Startups und Selbstständige, die wachsen möchten. Besonders profitieren Unternehmen, die ihre Prozesse digitalisieren, mehr Kunden gewinnen oder ihre Online-Präsenz verbessern wollen.",
  },
  {
    question: "Wie läuft das Erstgespräch ab?",
    answer:
      "Im kostenlosen Erstgespräch lernen wir Sie und Ihr Unternehmen kennen. Wir analysieren Ihre aktuelle Situation, verstehen Ihre Ziele und prüfen, wie wir Ihnen am besten helfen können. Das Gespräch ist unverbindlich und dauert ca. 30 Minuten.",
  },
  {
    question: "Was kostet eine Zusammenarbeit?",
    answer:
      "Die Kosten hängen vom Umfang und der Komplexität Ihres Projekts ab. Nach dem Erstgespräch erstellen wir ein individuelles Angebot, das auf Ihre Bedürfnisse zugeschnitten ist. Wir legen Wert auf transparente Preisgestaltung ohne versteckte Kosten.",
  },
  {
    question: "Wie schnell kann ich mit Ergebnissen rechnen?",
    answer:
      "Das hängt vom jeweiligen Service ab. Bei Webprojekten liefern wir typischerweise innerhalb von 2-6 Wochen. Marketing-Kampagnen zeigen oft erste Ergebnisse nach 2-4 Wochen. Im Erstgespräch geben wir Ihnen eine realistische Einschätzung.",
  },
  {
    question: "Arbeitet ihr nur mit Unternehmen aus Offenburg?",
    answer:
      "Nein, wir arbeiten mit Unternehmen aus ganz Deutschland und dem DACH-Raum zusammen. Dank digitaler Kommunikation können wir Projekte ortsunabhängig umsetzen. Persönliche Treffen sind bei Bedarf natürlich möglich.",
  },
  {
    question: "Bietet ihr auch laufende Betreuung an?",
    answer:
      "Ja, neben Einzelprojekten bieten wir auch laufende Betreuung und Support an. Viele unserer Kunden arbeiten langfristig mit uns zusammen, um ihre Strategien kontinuierlich zu optimieren und neue Wachstumsmöglichkeiten zu erschließen.",
  },
  {
    question: "Wie kann ich euch kontaktieren?",
    answer:
      "Am einfachsten buchen Sie ein kostenloses Erstgespräch über unsere Website. Alternativ können Sie uns auch per E-Mail oder Telefon erreichen. Die Kontaktdaten finden Sie im Impressum.",
  },
];

const FAQSection = () => {
  return (
    <section className="py-16 md:py-24 px-4 md:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-primary font-medium mb-4">FAQ</p>
          <h2 className="section-heading mb-4">
            Häufig gestellte <span className="gradient-text">Fragen</span>
          </h2>
        </div>

        {/* FAQ Accordion */}
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-card rounded-xl border border-border px-6 shadow-sm data-[state=open]:shadow-card data-[state=open]:border-primary/30 transition-all"
            >
              <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline py-6">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-6">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;
