import { CodePreview } from '@/components/code-preview'
import { LinkComponent } from '@/components/shared/link-component'
export default function PageHowItWorks() {
  return (
    <>
      <section className="content my-10 lg:my-6">
        <div className="container mx-auto max-w-2xl">
          <h3 className="text-3xl font-normal">Development</h3>
          <p>Web3 Sets is under active development and is still considered experimental.</p>
          <h3 className="text-2xl font-bold">Schemas</h3>
          <p className="">
            <span className="font-bold">Purpose:</span> The purpose of the web3 sets schemas is to create a standard for mapping and connecting
            resources across distributed and decentralized ecosystems. Using principles from naive set theory, the schema defines a simple approach to
            managing complex systems.
          </p>
          <h3 className="mt-4 text-xl font-medium">Ethereum Virtual Machine</h3>
          <p>
            The Web3 Sets EVM schema is a JSON Draft 7 schema for mapping and connecting resources across distributed and decentralized ecosystems.
          </p>
          <p className="">
            <LinkComponent className="link" href="https://github.com/web3-sets/lab/tree/main/schemas/schema-smart-contract">
              Github Repo
            </LinkComponent>
          </p>

          <h3 className="mt-4 text-xl font-medium">Verifiable Credentials</h3>
          <p className="">The schema is still under development and is not yet ready for beta testing.</p>

          <h3 className="text-2xl font-bold">Runtimes</h3>
          <h3 className="mt-4 text-xl font-medium">Ethereum Virtual Machine</h3>

          <p>The Web3 Sets EVM runtime is a JavaScript library for validating Web3 Sets.</p>
          <LinkComponent className="link" href="https://github.com/web3-sets/lab/tree/main/packages/runtime-engine-js">
            Github Repo
          </LinkComponent>
          <h3 className="mt-4 text-lg font-bold">Supports</h3>
          <ul className="list-inside list-disc">
            <li>Transactions</li>
          </ul>
          <h3 className="mt-4 text-lg font-bold">Planned</h3>
          <ul className="list-inside list-disc">
            <li>Event Logs</li>
            <li>Reads (live and archive)</li>
            <li>Storage Proofs</li>
          </ul>
        </div>
      </section>
    </>
  )
}
