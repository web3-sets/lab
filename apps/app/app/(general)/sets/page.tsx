'use client'

import { CardSet } from '@/components/card-set'
import { LinkComponent } from '@/components/shared/link-component'

export default function PageHome() {
  return (
    <>
      <section className="">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap w-full mb-20">
            <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
              <h1 className="sm:text-3xl text-2xl font-medium mb-2 dark:text-white">A simple approach to mapping Web3</h1>
              <div className="h-1 w-20 bg-indigo-500 rounded"></div>
            </div>
            <p className="lg:w-1/2 w-full leading-relaxed ">
              <span className="font-bold">Web3 Set Theory is a simple approach to mapping and connecting Web3 resources.</span> The schema is an
              entities, conditions and rules based based schema for constructing Web3 resource maps.{' '}
              <LinkComponent className="link" href="/schema">
                Learn more about the schema Web3 Set Theory here
              </LinkComponent>
              .
            </p>
          </div>
          <div className="flex flex-wrap -m-4">
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
