/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from '@vercel/og'
import { NextRequest } from 'next/server'

import { siteConfig } from '@/config/site'

export const config = {
  runtime: 'experimental-edge',
}

const sfPro = fetch(new URL('../../assets/fonts/SF-Pro-Display-Medium.otf', import.meta.url)).then((res) => res.arrayBuffer())

export default async function handler(req: NextRequest) {
  const [sfProData] = await Promise.all([sfPro])
  return new ImageResponse(
    (
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
          }}>
        </div>
        <div tw="flex flex-col w-1/2 p-10">
          <h1
            tw="opacity-100 text-8xl font-bold">
            {siteConfig.name}
          </h1>
          <h3
            tw="opacity-100 text-3xl text-gray-500 font-light font-primary">
            {siteConfig.description}
          </h3>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'SF Pro',
          data: sfProData,
        },
      ],
    }
  )
}
