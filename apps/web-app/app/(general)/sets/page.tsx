'use client'

import { CardSet } from '@/components/card-set'
import { LinkComponent } from '@/components/shared/link-component'
import { setDatabase } from '@/data/set-database'

export default function PageSets() {
  return (
    <>
      <section className="">
        <div className="container mx-auto px-5 py-24">
          <div className="mb-20 flex w-full flex-wrap">
            <div className="mb-6 w-full lg:mb-0 lg:w-1/2">
              <h1 className="mb-2 text-2xl font-medium dark:text-white sm:text-3xl">A simple approach to mapping Web3</h1>
              <div className="h-1 w-20 rounded bg-indigo-500"></div>
            </div>
            <div className="w-full leading-relaxed lg:w-1/2">
              <p>
                <span className="font-bold">Web3 Sets is a simple approach to mapping and grouping Web3 systems.</span> Everything is an Entity.
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
    </>
  )
}
