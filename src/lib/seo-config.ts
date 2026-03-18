// SEO Configuration for OffenBoost Website
export const SITE_CONFIG = {
  name: "OffenBoost",
  tagline: "Wachstumspartner aus Offenburg",
  domain: "offenboost.de",
  url: "https://www.offenboost.de",
  locale: "de_DE",
  language: "de",

  // Company Info
  company: {
    name: "OffenBoost",
    legalName: "OffenBoost GbR",
    email: "info@offenboost.de",
    address: {
      street: "Burdastraße 18",
      city: "Offenburg",
      postalCode: "77656",
      country: "DE",
    },
  },

  // Social Media
  social: {
    linkedin: "https://www.linkedin.com/company/offenboost",
  },

  // Default OG Image
  ogImage: "/og-image.png",

  // Twitter
  twitter: {
    card: "summary_large_image",
    site: "@offenboost",
  },
};

// Page-specific SEO configurations
export const PAGE_SEO = {
  home: {
    title: "OffenBoost | Wachstumspartner aus Offenburg",
    description: "Ihr Wachstumspartner für digitales Marketing, Recruiting und Automatisierung. Wir helfen Unternehmen planbar zu wachsen. Jetzt Erstgespräch buchen!",
    keywords: "Wachstumspartner, Offenburg, Recruiting, Marketing, Automatisierung, Digitalisierung, Unternehmensberatung",
  },
  termin: {
    title: "Erstgespräch buchen | OffenBoost",
    description: "Buchen Sie Ihr kostenloses Erstgespräch mit OffenBoost. Erfahren Sie, wie wir Ihr Unternehmen beim Wachstum unterstützen können.",
    keywords: "Erstgespräch, Beratungstermin, Wachstumsberatung, Unternehmensberatung Offenburg",
  },
  casestudies: {
    title: "Case Studies & Erfolgsgeschichten | OffenBoost",
    description: "Echte Erfolgsgeschichten unserer Kunden. Sehen Sie, wie Unternehmen mit OffenBoost planbar wachsen und ihre Ziele erreichen.",
    keywords: "Case Studies, Erfolgsgeschichten, Kundenreferenzen, Wachstum, Recruiting Erfolg",
  },
  leistungen: {
    title: "Unsere Leistungen | OffenBoost",
    description: "Recruiting, Marketing, Automatisierung - Entdecken Sie unsere Leistungen für Ihr Unternehmenswachstum.",
    keywords: "Leistungen, Recruiting, Marketing, Automatisierung, Digitalisierung",
  },
  ueberuns: {
    title: "Über uns | OffenBoost",
    description: "Lernen Sie das Team hinter OffenBoost kennen. Yusuf Esentürk und Manuel Engelhardt - Ihre Wachstumspartner aus Offenburg.",
    keywords: "Über uns, Team, Gründer, Offenburg",
  },
  impressum: {
    title: "Impressum | OffenBoost",
    description: "Impressum und rechtliche Informationen der OffenBoost.",
    keywords: "",
    noindex: true,
  },
  datenschutz: {
    title: "Datenschutzerklärung | OffenBoost",
    description: "Datenschutzerklärung der OffenBoost. Informationen zur Verarbeitung Ihrer personenbezogenen Daten.",
    keywords: "",
    noindex: true,
  },
  agb: {
    title: "AGB | OffenBoost",
    description: "Allgemeine Geschäftsbedingungen der OffenBoost.",
    keywords: "",
    noindex: true,
  },
  notFound: {
    title: "Seite nicht gefunden | OffenBoost",
    description: "Die angeforderte Seite wurde nicht gefunden.",
    keywords: "",
    noindex: true,
  },
};
