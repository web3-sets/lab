import * as React from 'react'

import classNames from 'clsx'

import { LinkComponent } from './shared/link-component'

interface CardSetProps {
  className?: string
  name: string
  tagline: string
  description: string
  image: string
  href: string
}

export const CardSet = ({ className, name, description, tagline, image, href }: CardSetProps) => {
  const classes = classNames(className, 'CardSet')
  return (
    <LinkComponent href={href} className="p-4 md:w-1/2 xl:w-1/4">
      <div className="rounded-lg bg-gray-100 p-6 transition duration-300 ease-in-out hover:scale-105 hover:shadow-lg dark:bg-gray-800">
        {!image ? null : <img className="mb-6 h-40 w-full rounded object-cover object-center" src={image} alt="content" />}
        {/* <h3 className="text-xs font-medium tracking-widest text-indigo-500 dark:text-indigo-100">{tagline}</h3> */}
        <h2 className="mb-4 text-lg font-medium dark:text-gray-100">{name}</h2>
        <p className="text-base leading-relaxed">{description}</p>
      </div>
    </LinkComponent>
  )
}
