export const BRAND = {
  name: 'Brand Name',
  tagline: 'Your tagline goes here.',
  description: 'Short description of the brand for metadata and emails.',
  contactEmail: 'hello@example.com',
  domain: 'example.com',
  legalEntity: 'BRAND NAME LLC',
}

/** Registration / legal details — replace with the brand's real entity info. */
export const LEGAL = {
  tradeName: 'Brand Name',
  entityName: 'BRAND NAME LLC',
  legalForm: 'Limited Liability Company (LLC)',
  state: 'Florida',
  country: 'United States',
  ein: '00-0000000',
  documentNumber: '00-0000000',
  principalAddress: '123 Main Street, Suite 100, City, ST 00000',
  mailingAddress: '123 Main Street, Suite 100, City, ST 00000',
  registeredAgent: 'Registered Agent Name',
  registeredAgentAddress: '456 Agent Street, City, ST 00000',
  authorizedPerson: 'Authorized Person',
  governingLawCounty: 'Example County',
  /** Public SMS/help line — leave empty if not available. */
  contactPhone: '',
  termsLastUpdated: 'January 1, 2026',
  privacyLastUpdated: 'January 1, 2026',
  copyrightEmail: 'hello@example.com',
  privacyEmail: 'privacy@example.com',
}

export const SITE_URL = `https://${BRAND.domain}`
export const UNSUBSCRIBE_URL = `${SITE_URL}/unsubscribe`
export const CONTACT_URL = `${SITE_URL}/contact`
export const TERMS_URL = `${SITE_URL}/terms`
export const PRIVACY_URL = `${SITE_URL}/privacy`
export const SUBSCRIBE_URL = `${SITE_URL}/subscribe`

export const ROUTES = {
  home: '/',
  shop: '/shop',
  subscribe: '/subscribe',
  unsubscribe: '/unsubscribe',
  privacy: '/privacy',
  terms: '/terms',
} as const

export const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/shop', label: 'Shop' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
] as const
