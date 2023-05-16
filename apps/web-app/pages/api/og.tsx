/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from '@vercel/og'
import { NextApiRequest } from 'next'
import { z } from 'zod'

import { GenericOpenGraph } from '@/components/social/generic-open-graph'
import { IntegrationOpenGraph } from '@/components/social/integration-open-graph'
import { siteConfig } from '@/config/site'

export const config = {
  runtime: 'edge',
}

// --------------------------------------------------
// Schemas
// --------------------------------------------------
const setSchema = z.object({
  imageType: z.literal('set'),
  title: z.string(),
  description: z.string(),
  image: z.string(),
})

// --------------------------------------------------
// Open Graph Handler
// 1. Set Template
// 3. Generic Template
// --------------------------------------------------
export default async function handler(req: NextApiRequest) {
  const { searchParams } = new URL(`${req.url}`)
  const ogtype = searchParams.get('type')

  switch (ogtype) {
    // --------------------------------------------------
    // Integration
    // --------------------------------------------------
    case 'set': {
      const { title, description, image } = setSchema.parse({
        title: searchParams.get('title'),
        description: searchParams.get('description'),
        image: searchParams.get('image'),
        imageType: ogtype,
      })

      const imageBuffer = new ImageResponse(<IntegrationOpenGraph title={title} description={description} image={image} />, {
        width: 1200,
        height: 630,
      }) as {
        body: Buffer
      }

      return new Response(imageBuffer.body, { status: 200, headers: { 'Content-Type': 'image/png' } })
    }

    // --------------------------------------------------
    // Generic (Default)
    // --------------------------------------------------
    default: {
      const imageBuffer = new ImageResponse(
        <GenericOpenGraph title={siteConfig.name} description={siteConfig.description} image={siteConfig.name} />,
        {
          width: 1200,
          height: 630,
        }
      ) as {
        body: Buffer
      }

      return new Response(imageBuffer.body, { status: 200, headers: { 'Content-Type': 'image/png' } })
    }
  }
}
