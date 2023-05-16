import Balancer from 'react-wrap-balancer'

import { CodePreview } from '@/components/code-preview'
export default function PageHowItWorks() {
  return (
    <>
      <section className="my-10 lg:my-12">
        <div className="container mx-auto flex flex-col  items-center justify-center px-5">
          <img className="mb-10 w-5/6 rounded-full shadow-xl hover:shadow-2xl md:w-3/6 lg:w-2/6" alt="hero" src="/story/light-graphic-10.png" />
          <div className="w-full text-center lg:w-2/3">
            <h1 className="mb-4 text-3xl font-bold sm:text-4xl lg:text-6xl">How It Works</h1>
            <p className="text-xl leading-relaxed">
              <Balancer>
                Web3 Sets is JSON Draft 7 schema for mapping and connecting resources across distributed and decentralized ecosystems.
              </Balancer>
            </p>
          </div>
        </div>
      </section>
      <section className="my-10 lg:my-12 lg:py-10">
        <div className="container mx-auto px-5">
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
      <section className="content my-10 lg:my-6">
        <div className="container mx-auto max-w-2xl">
          <p>Web3 Sets is a simple approach to managing a complex system.</p>
          <p>
            Designed to be light-weight and flexible, Web3 Sets is a JSON Draft 7 schema for mapping and connecting resources across distributed and
            decentralized ecosystems.
          </p>
          <p className="font-bold">The approach is simple.</p>
          <p>Everything is Entity. Entities always have predictable behaviors. Entities can be grouped into Sets. Sets can be grouped into Sets.</p>
          <p className="font-bold">The approach is powerful.</p>
          <p>
            The only focus is mapping inputs and outputs across distributed systems. It does not concern itself with the underlying technology or
            implementation details. It only cares about Entities and how to organize them. .
          </p>
          <p className="font-bold">Web3 Sets draws inspiration from informal set theory.</p>
          <p>Informal (i.e. naive) set theory is a way of thinking about collections of objects, called sets, and the relationships between them.</p>
        </div>
      </section>
      <section className="content">
        <div className="container mx-auto max-w-2xl">
          <h3 className="mb-3 text-4xl font-bold">Why</h3>
          <p>To create complex user journeys across decentralized and distributed systems.</p>
          <p>
            Sets define <span className="font-bold">potential</span> state positions across a finite field of all Web3 resource states.
          </p>
          <p>If [X...] entities have behaved in [Y...] range that can be expressed within a set.</p>
          <p>
            <span className="font-bold">Potential</span> state positions can be compared to <span className="font-bold">realized</span> state.
          </p>
          <h3 className="mb-3 mt-4 text-2xl font-bold">Sets In Practice</h3>
          <p>As a big fan of PoolTogether, so let&apos;s make a set for the prize savings protocol.</p>
          <p>A formal description for a user depositing 100 USDC minimum into PoolTogether.</p>
          <p>The set can be simple too: one entity, one condition and one rule.</p>
          <ul className="mb-4 list-disc pl-4">
            <li>
              <span className="font-bold">Entity:</span> PoolTogether V4 USDC Pool on Mainnet (chainId: 1)
            </li>
            <li>
              <span className="font-bold">Condition:</span> USDC deposit above $100{' '}
            </li>
            <li>
              <span className="font-bold">Rule:</span> Complete
            </li>
          </ul>
          <div className="my-10 opacity-30" />

          <div className="card relative -left-[10%] w-[120%]">
            <CodePreview>
              {`entities: [
  {
    "chainId": 10,
    "address": "0x79bc8bd53244bc8a9c8c27509a2d573650a83373",
    "abi": "ipfs://Qmc6MHybup7ppGgUdyEcsi5jqCeTAPtcxF9wBaco56Uc1H",
    "name": "PoolTogether USDC Prize Pool"
  }
]
`}
            </CodePreview>
          </div>
          <div className="my-10 opacity-30" />
          <div className="card relative -left-[10%] w-[120%]">
            <CodePreview>
              {`conditions: [
    {
      "id": "condition:depositTo:gte:100000000",
      "eid": "0x79bc8bd53244bc8a9c8c27509a2d573650a83373",
      "name": "PoolTogether Optimism Deposit over 1 USDC",
      "type": "transaction",
      "signature": "depositTo(address,uint256)",
      "args": [
        {
          "index": 1,
          "type": "bignumber",
          "condition": "gte",
          "value": "10000000"
        }
      ]
    }
  ],
`}
            </CodePreview>
          </div>
          <div className="my-10 opacity-30" />
          <div className="card relative -left-[10%] w-[120%]">
            <CodePreview>
              {`rules: [
    {
      "id": "rule.complete",
      "cid": ["condition:depositTo:gte:100000000"],
      "operations": ["isComplete"],
      "args": [[true]],
      "range": [100]
    }
  ],
`}
            </CodePreview>
          </div>
          <div className="mt-10">
            <p>The primitive is simple. But being designed for mapping complex systems.</p>
            <p>
              A set can contain entities or even other sets. Similar to the premise of set theory, that all things in the universe can be categorized,
              web3 sets takes the position it&apos;s possible to categorize all things in the web3 universe.
            </p>
            <p className="">
              And by mapping the relationships between these things, we can create complex user journeys across decentralized and distributed systems.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
