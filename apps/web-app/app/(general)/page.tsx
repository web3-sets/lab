'use client'
import React from 'react'

import { GithubIcon, Network } from 'lucide-react'
import Balancer from 'react-wrap-balancer'

import { CardSet } from '@/components/card-set'
import { LinkComponent } from '@/components/shared/link-component'
import { setDatabase } from '@/data/set-database'

export default function PageHome() {
  return (
    <>
      <section className="">
        <div className="mx-auto grid max-w-screen-xl px-4 py-8 lg:grid-cols-12 lg:gap-8 lg:py-16 xl:gap-0">
          <div className="mr-auto place-self-center lg:col-span-7">
            <h1 className="mb-4 max-w-2xl text-4xl font-extrabold leading-none tracking-tight dark:text-white md:text-5xl xl:text-6xl">Web3 Sets</h1>
            <Balancer>
              <p className="mb-6 max-w-2xl font-light  leading-8 dark:text-gray-400 md:text-lg lg:mb-8 lg:text-xl">
                Web3 Sets are{' '}
                <LinkComponent href="https://json-schema.org/draft-07/json-schema-release-notes.html" className="link">
                  JSON Draft 7 schemas
                </LinkComponent>{' '}
                for mapping objects across distributed systems using{' '}
                <LinkComponent href="https://en.wikipedia.org/wiki/Naive_set_theory" className="link">
                  naive set theory principles.
                </LinkComponent>
              </p>
            </Balancer>
            <div className="flex items-center gap-3">
              <LinkComponent href="/set/stand-with-crypto" className="btn btn-primary ">
                <span className="flex items-center">
                  <Network size={18} /> <span className="ml-1">Runtime Example</span>
                </span>
              </LinkComponent>
              <LinkComponent
                href="https://github.com/web3-sets"
                className="inline-flex items-center justify-center rounded-lg border border-gray-300 px-5 py-3 text-center text-base font-medium hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                <GithubIcon size={18} /> <span className="ml-1">View the Code</span>
              </LinkComponent>
            </div>
          </div>
          <div className="hidden lg:col-span-5 lg:mt-0 lg:flex">
            <img className="rounded-full border-2" src="/story/light-graphic-4.png" alt="mockup" />
          </div>
        </div>
      </section>
      <section className="">
        <div className="container mx-auto px-5 py-24">
          <div className="mb-20 flex w-full flex-wrap">
            <div className="mb-6 w-full lg:mb-0 lg:w-1/2">
              <h1 className="mb-2 text-2xl font-medium dark:text-white sm:text-3xl">A simple approach to mapping Web3</h1>
              <div className="h-1 w-20 rounded bg-indigo-500"></div>
            </div>
            <div className="w-full leading-relaxed lg:w-1/2">
              <p>
                <span className="font-bold">Web3 Sets is a simple approach to mapping distributed resource objects.</span> Everything is an Entity.
                Entities always have predictable behaviors. Entities can be grouped into Sets.
              </p>
              <p className="">
                <LinkComponent className="link" href="/how-it-works">
                  Web3 Sets is built upon informal set theory principles.
                </LinkComponent>
              </p>
            </div>
          </div>
          <div className="-m-4 flex flex-wrap">
            {setDatabase.map((set) => (
              <CardSet key={set.id} href={`/set/${set.id}`} name={set.name} tagline={set.version} description={set.description} image={set.image} />
            ))}
          </div>
        </div>
      </section>
      <section className="">
        <div className="container mx-auto px-5 py-24">
          <div className="mb-20 text-center">
            <h1 className="mb-4 text-2xl font-medium sm:text-3xl lg:text-5xl">Mapping the Emergent Web3 Universe </h1>
            <p className="mx-auto text-xl leading-relaxed lg:w-full xl:w-2/4">
              Web3 Sets is a simple approach to <br />
              understanding complex systems
            </p>
            <div className="mt-6 flex justify-center">
              <div className="inline-flex h-1 w-16 rounded-full bg-indigo-500"></div>
            </div>
          </div>
          <div className="-mx-4 -mb-10 -mt-4 flex flex-wrap space-y-6 sm:-m-4 md:space-y-0">
            <div className="flex flex-col items-center p-4 text-center md:w-1/3">
              <div className="mb-5 inline-flex h-32 w-32 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-500">
                <img className="rounded-2xl border-2" src="/story/light-graphic-1.png" alt="mockup" />
              </div>
              <div className="grow">
                <h2 className="mb-3 text-2xl font-medium lg:text-3xl">Entities</h2>
                <p className="text-base leading-relaxed">
                  <span className="font-bold">Entities are the nouns of the Web3 world.</span> They are the things that exist and we can interact
                  with.
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center p-4 text-center md:w-1/3">
              <div className="mb-5 inline-flex h-32 w-32 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-500">
                <img className="rounded-2xl border-2" src="/story/light-graphic-6.png" alt="mockup" />
              </div>
              <div className="grow">
                <h2 className=" mb-3 text-2xl font-medium lg:text-3xl">Conditions</h2>
                <p className="text-base leading-relaxed">
                  <span className="font-bold">Conditions are the verbs of the Web3 world.</span> They describe the actions or state an entity can be
                  in.
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center p-4 text-center md:w-1/3">
              <div className="mb-5 inline-flex h-32 w-32 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-500">
                <img className="rounded-2xl border-2" src="/story/light-graphic-3.png" alt="mockup" />
              </div>
              <div className="grow">
                <h2 className=" mb-3 text-2xl font-medium lg:text-3xl">Rules</h2>
                <p className="text-base leading-relaxed">
                  <span className="font-bold">Rules are the adjectives of the Web3 world.</span> They describe how entities interact and behave with
                  other entities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="relative z-10 lg:py-16">
              <div className="relative h-auto sm:h-80 lg:-mr-10 lg:h-full">
                {/* <img alt="House" src="/story/light-graphic-2.png" className="absolute inset-0 h-full w-full object-cover" /> */}
                <img className="rounded-xl border-2" src="/story/dark-graphic-4.png" alt="mockup" />
              </div>
            </div>

            <div className="relative flex items-center bg-gray-100 dark:bg-gray-800">
              <span className=" hidden lg:absolute lg:inset-y-0 lg:block lg:w-16 lg:bg-gray-100 dark:lg:bg-gray-800"></span>

              <div className="p-8 sm:p-16 lg:p-24">
                <h3 className="text-2xl font-bold sm:text-3xl lg:text-4xl">Connecting the Dots</h3>

                <p className="mt-4 leading-7">
                  <span className="font-bold">The Web3 world is a complex place.</span> It is a place where entities interact with other entities in
                  unpredictable ways. We need a new way to design, build and scale user experiences for this new world.
                </p>

                <p className="mt-4 leading-7">
                  We need a way to organize and connect data in a way that is easy to understand and use.{' '}
                  <span className="font-bold">Web3 Sets is a simple approach to mapping and connecting Web3 resources.</span>
                </p>

                <LinkComponent
                  href="/sets"
                  className="mt-8 inline-block rounded border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500">
                  Example Sets
                </LinkComponent>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
