import * as React from 'react'

import { siteConfig } from '@/config/site'

interface GenericOpenGraphProps {
  className?: string
  title: string
  description: string
  image: string
}

export const GenericOpenGraph = ({ className, title, description, image }: GenericOpenGraphProps) => {
  return (
    <div
      tw="flex p-0"
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
      }}>
      <div
        tw="w-1/2 h-full flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: 'url(https://red-effective-snake-988.mypinata.cloud/ipfs/Qma862AMNXxp5hey8HibUVQxc2SU3WWasoLhTpC41vb4Gb)',
          backgroundSize: '100% 100%',
          backgroundPosition: 'center',
        }}></div>
      <div tw="flex flex-col w-1/2 p-10">
        <h1 tw="opacity-100 text-8xl font-extrabold">{siteConfig.name}</h1>
        <h3 tw="opacity-100 text-3xl text-gray-500 font-light font-primary">{siteConfig.description}</h3>
      </div>
    </div>
  )
}
