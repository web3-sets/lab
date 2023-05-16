import * as React from 'react'

import { absoluteUrl } from '@/lib/utils'

interface IntegrationOpenGraphProps {
  className?: string
  title: string
  description: string
  image: string
}

export const IntegrationOpenGraph = ({ title, description, image }: IntegrationOpenGraphProps) => {
  return (
    <div tw="h-full w-full flex items-start justify-start bg-gray-100">
      <div tw="flex items-start justify-start h-full">
        <div tw="flex w-2/5 flex-col justify-center h-full pl-20 py-20">
          <p tw="text-2xl font-bold mb-0 text-green-600">Set</p>
          <h1 tw="text-5xl font-black text-left">{title}</h1>
          <p tw="text-xl leading-7 text-gray-600">{description}</p>
        </div>
        {image ? (
          <div tw="flex w-3/5 h-full p-8 px-16">
            <img tw="w-full h-full rounded-xl" style={{ objectFit: 'contain' }} src={`${absoluteUrl(image)}`} />
          </div>
        ) : null}
      </div>
    </div>
  )
}
