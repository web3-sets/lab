import { Metadata } from 'next'

import { siteConfig } from '@/config/site'
import { setDatabase } from '@/data/set-database'
import { absoluteUrl } from '@/lib/utils'
import { getOgUrl } from '@/lib/utils/get-og-url'
import { setsFilter } from '@/lib/utils/sets-filter'

import PageSetContent from './content'

export async function generateMetadata({ params: { id } }: { params: { id: string } }): Promise<Metadata> {
  const page = await setsFilter(setDatabase, id)
  if (!page) {
    return {}
  }

  // Set Open Graph Image Generation Parameters
  // ref: pages/api/og.ts
  const ogUrl = getOgUrl()
  ogUrl.searchParams.set('title', page.name)
  ogUrl.searchParams.set('description', page.description)
  ogUrl.searchParams.set('image', page.image)
  ogUrl.searchParams.set('heading', page.name)
  ogUrl.searchParams.set('type', 'set')

  // Open Graph Metadata
  // ref: https://ogp.me
  // testing: https://www.opengraph.xyz
  return {
    title: page.name,
    description: page.excerpt,
    openGraph: {
      title: `${page.name} - ${siteConfig.name}`,
      description: page.excerpt,
      type: 'article',
      url: absoluteUrl(page.slug),
      images: [
        {
          url: ogUrl.toString(),
          width: 1200,
          height: 630,
          alt: page.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: page.name,
      description: page.excerpt,
      images: [ogUrl.toString()],
    },
  }
}

export default function PageSet({ params }: any) {
  return (
    <>
      <PageSetContent id={params.id} />
    </>
  )
}
