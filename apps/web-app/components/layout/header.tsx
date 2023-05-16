import React from 'react'

import classNames from 'clsx'
import Image from 'next/image'
import { FaGithub } from 'react-icons/fa'

import { BranchIsAuthenticated } from '@/components/shared/branch-is-authenticated'
import { siteConfig } from '@/config/site'
import { ButtonSIWELogin } from '@/integrations/siwe/components/button-siwe-login'
import { ButtonSIWELogout } from '@/integrations/siwe/components/button-siwe-logout'
import useScroll from '@/lib/hooks/use-scroll'

import { NavigationMenuGeneral } from './navigation-menu-general'
import { UserDropdown } from './user-dropdown'
import BranchButtonLoginOrAccount from '../shared/branch-button-login-or-account'
import { BranchColorMode } from '../shared/branch-color-mode'
import { BranchIsWalletConnected } from '../shared/branch-is-wallet-connected'
import { LinkComponent } from '../shared/link-component'
import { ResponsiveMobileAndDesktop } from '../shared/responsive-mobile-and-desktop'
import { ThemeToggle } from '../shared/theme-toggle'

interface Props {
  className?: string
}

export function Header(props: Props) {
  const scrolled = useScroll(50)
  const classes = classNames(
    props.className,
    'Header',
    'fixed top-0 w-full',
    'px-6 lg:px-10 py-3 mb-8 flex items-center',
    {
      'border-b border-gray-200 bg-white/50 backdrop-blur-xl dark:bg-black/50 dark:border-gray-800': scrolled,
    },
    'z-30 transition-all'
  )
  return (
    <header className={classes}>
      <ResponsiveMobileAndDesktop>
        <>
          <div className="flex w-full justify-between p-4">
            <div className="flex items-center gap-x-2">
              <LinkComponent href="/" className="flex">
                <span className="-mt-4 text-5xl leading-3">⏣</span>
              </LinkComponent>
              <LinkComponent href={`${siteConfig.links.github}`} className="-mt-2">
                <FaGithub />
              </LinkComponent>
            </div>
            <div className="">
              <UserDropdown />
            </div>
          </div>
        </>
        <>
          <div className="flex w-full justify-between">
            <div className="flex items-center space-x-5">
              <LinkComponent className="flex items-center" href="/">
                <span className="text-5xl leading-3 lg:-mt-2">⏣</span>
                {/* <span className="ml-2 text-lg font-bold">{siteConfig.name}</span> */}
              </LinkComponent>
              <LinkComponent href={`${siteConfig.links.github}`}>
                <FaGithub />
              </LinkComponent>
            </div>
            {/* <div className="flex flex-1 justify-center lg:px-10"></div> */}

            <div className="flex items-center gap-4 self-end">
              <LinkComponent className="menu-item" href="/how-it-works">
                How it Works
              </LinkComponent>
              <LinkComponent className="menu-item" href="/development">
                Development
              </LinkComponent>
              <LinkComponent className="btn btn-pill btn-sm btn-indigo" href="/sets">
                Web3 Sets
              </LinkComponent>
              <ThemeToggle />
            </div>
          </div>
        </>
      </ResponsiveMobileAndDesktop>
    </header>
  )
}
