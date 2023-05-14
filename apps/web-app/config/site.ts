// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// Site
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
interface SiteConfig {
  name: string
  title: string
  emoji: string
  description: string
  localeDefault: string
  links: {
    twitter: string
    github: string
  }
}

export const SITE_CANONICAL = 'https://web3sets.xyz'

export const siteConfig: SiteConfig = {
  name: 'Web3 Sets',
  title: 'Web3 Sets - Mapping distributed systems',
  emoji: '⏣',
  description: 'Web3 Sets is JSON Draft 7 schema for mapping resources across distributed systems.',
  localeDefault: 'en',
  links: {
    twitter: 'https://twitter.com/KamesGeraghty',
    github: 'https://github.com/web3-sets',
  },
}
