// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// Site

import { url } from 'inspector'

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
interface SiteConfig {
  name: string
  title: string
  emoji: string
  description: string
  localeDefault: string
  url?: string
  links: {
    twitter: string
    github: string
  }
}

export const SITE_CANONICAL = 'https://www.web3sets.app'

export const siteConfig: SiteConfig = {
  name: 'Web3 Sets',
  title: 'Web3 Sets - Mapping distributed systems',
  emoji: '⏣',
  description: 'Web3 Sets is JSON Draft 7 schema for mapping resources across distributed systems.',
  localeDefault: 'en',
  url: SITE_CANONICAL,
  links: {
    twitter: 'https://twitter.com/KamesGeraghty',
    github: 'https://github.com/web3-sets',
  },
}
