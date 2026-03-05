export function faqSchema(items: { question: string; answer: string }[]): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  });
}

export function breadcrumbSchema(items: { name: string; url: string }[]): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  });
}

export function howToSchema(steps: { name: string; text: string }[]): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Start Supervised Visitation Through SafeProvider",
    description: "From intake to your first scheduled visit in 5 clear steps.",
    step: steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  });
}

export function serviceSchema(service: { name: string; description: string; url: string }): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    url: service.url,
    provider: {
      "@type": "Organization",
      name: "SafePair",
    },
    broker: {
      "@type": "Organization",
      name: "SafeProvider",
      url: "https://safeprovider.org",
    },
    areaServed: [
      { "@type": "AdministrativeArea", name: "Santa Clara County, CA" },
      { "@type": "AdministrativeArea", name: "Alameda County, CA" },
      { "@type": "AdministrativeArea", name: "Contra Costa County, CA" },
      { "@type": "AdministrativeArea", name: "San Francisco County, CA" },
    ],
  });
}

export function organizationSchema(): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "SafeProvider",
    legalName: "Safe Provider",
    url: "https://safeprovider.org",
    description: "Online intake, scheduling, and payment for court-compliant supervised visitation and custody exchange in the Bay Area.",
    areaServed: [
      { "@type": "AdministrativeArea", name: "Santa Clara County, CA" },
      { "@type": "AdministrativeArea", name: "Alameda County, CA" },
      { "@type": "AdministrativeArea", name: "Contra Costa County, CA" },
      { "@type": "AdministrativeArea", name: "San Francisco County, CA" },
    ],
  });
}
