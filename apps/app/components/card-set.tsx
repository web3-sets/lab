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

export const CardSet = ({ className, name, description, tagline, image = '/covers/set-cover-pooltogether.png', href }: CardSetProps) => {
  const classes = classNames(className, 'CardSet')
  return (
    <LinkComponent href={href} className="xl:w-1/4 md:w-1/2 p-4">
      <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg hover:scale-105 transition duration-300 ease-in-out hover:shadow-lg">
        <img className="h-40 rounded w-full object-cover object-center mb-6" src={image} alt="content" />
        <h3 className="tracking-widest dark:text-indigo-100 text-indigo-500 text-xs font-medium">{tagline}</h3>
        <h2 className="text-lg dark:text-gray-100 font-medium mb-4">{name}</h2>
        <p className="leading-relaxed text-base">{description}</p>
      </div>
    </LinkComponent>
  )
}
