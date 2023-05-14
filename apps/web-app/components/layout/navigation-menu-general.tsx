'use client'

import * as React from 'react'

import Image from 'next/image'

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import { cn } from '@/lib/utils'

import { BranchColorMode } from '../shared/branch-color-mode'
import { LinkComponent } from '../shared/link-component'
import { turboIntegrations } from '@/data/turbo-integrations'

export function NavigationMenuGeneral() {
  return (
    <NavigationMenu className="self-center">
      <NavigationMenuList className="w-full">
        <NavigationMenuItem>
          <LinkComponent className="menu-item" href="/how-it-works">
            How it Works
          </LinkComponent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const ListItem = ({ className, name, imgLight, imgDark, children, ...props }: any) => {
  return (
    <li key={name}>
      <NavigationMenuLink asChild>
        <LinkComponent
          href={props.href as string}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-100 focus:bg-slate-100 dark:hover:bg-slate-700 dark:focus:bg-slate-700',
            className
          )}
          {...props}>
          <BranchColorMode>
            <Image className="mb-3 h-7 w-7 rounded-full" alt="Etherscan logo" src={imgDark} width={100} height={100} />
            <Image className="mb-3 h-7 w-7 rounded-full" alt="Etherscan logo" src={imgLight} width={100} height={100} />
          </BranchColorMode>
          <div className="text-sm font-medium leading-none">{name}</div>
          <p className="text-sm leading-snug text-slate-500 line-clamp-2 dark:text-slate-400">{children}</p>
        </LinkComponent>
      </NavigationMenuLink>
    </li>
  )
}
ListItem.displayName = 'ListItem'
