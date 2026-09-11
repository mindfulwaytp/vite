// Structured data (schema.org JSON-LD) describing the practice. Pages reference
// it by @id so search engines and AI answer engines tie every page to one entity.
export const SITE_URL = 'https://www.mindfulway-therapy.com';
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;

export const organizationJsonLd = {
  '@type': 'MedicalBusiness',
  '@id': ORGANIZATION_ID,
  name: 'Mindful Way Therapy',
  legalName: 'Mindful Way Therapy, PLLC',
  description:
    'Neurodivergent- and LGBTQ+-affirming therapy in Seattle and via telehealth across Washington, for individuals, couples, and families.',
  url: `${SITE_URL}/`,
  image: `${SITE_URL}/images/social-preview.jpg`,
  telephone: '+1-360-347-2559',
  faxNumber: '+1-206-844-6811',
  email: 'support@mindfulway-therapy.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '4500 9th Ave NE, Suite 300',
    addressLocality: 'Seattle',
    addressRegion: 'WA',
    postalCode: '98105',
    addressCountry: 'US',
  },
  areaServed: [
    { '@type': 'City', name: 'Seattle' },
    { '@type': 'State', name: 'Washington' },
  ],
};
