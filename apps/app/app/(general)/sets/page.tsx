'use client'

import { CardSet } from '@/components/card-set'
import { LinkComponent } from '@/components/shared/link-component'

export default function PageHome() {
  return (
    <>
      <section className="">
        <div className="container mx-auto px-5 py-24">
          <div className="mb-20 flex w-full flex-wrap">
            <div className="mb-6 w-full lg:mb-0 lg:w-1/2">
              <h1 className="mb-2 text-2xl font-medium dark:text-white sm:text-3xl">A simple approach to mapping Web3</h1>
              <div className="h-1 w-20 rounded bg-indigo-500"></div>
            </div>
            <p className="w-full leading-relaxed lg:w-1/2 ">
              <span className="font-bold">Web3 Set Theory is a simple approach to mapping and connecting Web3 resources.</span> The schema is an
              entities, conditions and rules based based schema for constructing Web3 resource maps.{' '}
              <LinkComponent className="link" href="/schema">
                Learn more about the schema Web3 Set Theory here
              </LinkComponent>
              .
            </p>
          </div>
          <div className="-m-4 flex flex-wrap">
            <CardSet
              href="/set/poolTogetherOptimismDeposit"
              name="PoolTogether USDC Deposit"
              tagline="V4"
              description="Deposit USDC into PoolTogether V4."
              image="/covers/set-cover-pooltogether.png"
            />
          </div>
        </div>
      </section>
    </>
  )
}
