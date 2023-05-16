import { motion } from 'framer-motion'
import { BinaryIcon, DatabaseIcon, LayoutDashboard, LogOutIcon, Wallet } from 'lucide-react'
import { FaCode } from 'react-icons/fa'

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { FADE_IN_ANIMATION_SETTINGS } from '@/config/design'

import { ButtonSIWELogin } from '../../integrations/siwe/components/button-siwe-login'
import { ButtonSIWELogout } from '../../integrations/siwe/components/button-siwe-logout'
import { BranchIsAuthenticated } from '../shared/branch-is-authenticated'
import { LinkComponent } from '../shared/link-component'

export function UserDropdown() {
  return (
    <motion.div className="relative inline-block text-left text-neutral-700" {...FADE_IN_ANIMATION_SETTINGS}>
      <Popover>
        <PopoverTrigger>
          <button className="bg-card flex items-center justify-center overflow-hidden rounded-md p-2 px-4 transition-all duration-75 hover:bg-neutral-100 focus:outline-none active:scale-95 ">
            Menu
          </button>
        </PopoverTrigger>
        <PopoverContent>
          <div className="w-full rounded-md p-2 ">
            <LinkComponent className="user-dropdown-menu-item" href="/how-it-works">
              <p className="text-lg font-medium">How It Works</p>
            </LinkComponent>
            <LinkComponent className="user-dropdown-menu-item " href="/development">
              <p className="text-lg font-medium">Development</p>
            </LinkComponent>
            <LinkComponent className="user-dropdown-menu-item " href="/sets">
              <p className="text-lg font-medium">Sets</p>
            </LinkComponent>
            <BranchIsAuthenticated>
              <ButtonSIWELogout className="user-dropdown-menu-item flex">
                <span className="text-sm">Logout</span>
                <LogOutIcon className="h-4 w-4" />
              </ButtonSIWELogout>
              <ButtonSIWELogin className="user-dropdown-menu-item flex">
                <span className="ml-2 text-sm">Login</span>
                <LogOutIcon className="inline-block h-4 w-4" />
              </ButtonSIWELogin>
            </BranchIsAuthenticated>
          </div>
        </PopoverContent>
      </Popover>
    </motion.div>
  )
}
