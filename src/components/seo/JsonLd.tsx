import { companyData } from "@/data/company";

export function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WholesaleStore",
    name: companyData.brandName.en,
    alternateName: [companyData.brandName.ar, companyData.legalName.en, companyData.legalName.ar],
    description:
      "Official elevator spare parts and components distributor in Saudi Arabia. Supplying controllers, traction machines, door operators, safety gears, guide rails, and emergency maintenance support across Dammam, Riyadh, and Jeddah.",
    url: "https://www.jupiterelevators.com",
    logo: "https://www.jupiterelevators.com/brand/logo_full_transparent.png",
    image: "https://www.jupiterelevators.com/brand/logo_full_transparent.png",
    telephone: companyData.contact.primaryPhone,
    email: companyData.contact.emails.sales,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: `${companyData.address.district.en}, ${companyData.address.poBox}`,
      addressLocality: companyData.address.city.en,
      postalCode: companyData.address.postalCode,
      addressCountry: "SA",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "26.4207",
      longitude: "50.0888",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
        opens: "08:00",
        closes: "17:00",
      },
    ],
    areaServed: [
      { "@type": "City", name: "Dammam" },
      { "@type": "City", name: "Riyadh" },
      { "@type": "City", name: "Jeddah" },
      { "@type": "Country", name: "Saudi Arabia" },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
