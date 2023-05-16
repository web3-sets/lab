'use client'
import { useEffect, useState } from 'react'

import { FaCheckCircle } from 'react-icons/fa'

import { ConditionCard } from '@/components/condition-card'
import { FormRunSetValidation } from '@/components/form-run-set-validation'
import { Icons } from '@/components/shared/icons'
import { LinkComponent } from '@/components/shared/link-component'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useSet } from '@/lib/hooks/use-set'
import { useAnalysis } from '@/lib/state/state-analysis'

import { columnsActionObservers } from './columns'
import { DataTable } from './data-table'

export default function PageSetContent({ id }: any) {
  const set = useSet(id)
  const { analysis: runtimeResults } = useAnalysis(set?.model?.id)

  const [flattenedMatches, setFlattenedMatches] = useState<Array<any>>([])
  useEffect(() => {
    if (runtimeResults) {
      setFlattenedMatches(runtimeResults?.analysis?.data?.flatMap((match: any) => match?.matches))
    }
  }, [runtimeResults])

  return (
    <>
      <section className="w-full">
        <div className="mx-auto grid max-w-screen-xl lg:grid-cols-12 lg:gap-8 xl:gap-6">
          <div className="lg:col-span-8">
            <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight dark:text-white md:text-5xl xl:text-5xl">{set?.model?.name}</h1>
            <p className="mb-6 font-light leading-8 text-gray-600 dark:text-gray-400 md:text-lg lg:mb-8 lg:text-xl">{set?.model?.description}</p>
            <div className="flex gap-2">
              {set?.model?.keywords &&
                set?.model?.keywords?.map((tag: string) => (
                  <span key={tag} className="tag tag-primary">
                    {tag}
                  </span>
                ))}
            </div>
          </div>
          <div className="flex items-center justify-between lg:col-span-4">
            <LinkComponent href={`${set?.url}`} className="flex items-center gap-3">
              <img className="rounded-lg" src={set?.image} alt={set?.model?.author?.name} />
            </LinkComponent>
          </div>
          <div className="flex items-center justify-between lg:col-span-12 lg:mt-0 lg:flex">
            <span className="flex items-center">
              Version: {set?.model?.version.major}.{set?.model?.version.minor}.{set?.model?.version.patch}
            </span>
            <LinkComponent href="https://github.com/web3-sets" className="flex items-center gap-3">
              <Icons.gitHub className="w-4" /> <span className="">View Set on Github</span>
            </LinkComponent>
          </div>
        </div>
      </section>
      <hr className="my-6 opacity-30" />
      <div className="mx-auto w-full max-w-screen-xl">
        <Tabs defaultValue="account" className="w-full">
          <TabsList className="w-full p-3">
            <TabsTrigger className="w-1/2 py-4" value="account">
              Runtime
            </TabsTrigger>
            <TabsTrigger className="w-1/2 py-4" value="password">
              Set
            </TabsTrigger>
          </TabsList>
          <div className="my-4" />
          <TabsContent value="account" className="border-none p-0">
            <section className="w-full">
              <div className="mx-auto grid w-full max-w-screen-xl rounded-md border-2 bg-neutral-100 dark:bg-neutral-800 lg:grid-cols-12 lg:gap-8 lg:p-10 xl:gap-0">
                <div className="col-span-12">
                  <FormRunSetValidation
                    schema={set?.model}
                    className="mx-auto grid w-full max-w-screen-xl rounded-md border-2 bg-neutral-100 dark:bg-neutral-800 lg:grid-cols-12 lg:gap-8 lg:p-10 xl:gap-0"
                  />
                  <p className="text-light text-sm">
                    <span className="font-bold">How it works:</span> The account&apos;s transaction history will be fetched from Etherscan and
                    analyzed using the Web3 Smart Contract Set. The results will be displayed below.
                  </p>
                </div>
              </div>
            </section>
            {!runtimeResults && (
              <section className="mt-10 w-full">
                <div className="mx-auto grid w-full max-w-screen-xl rounded-md border-2 bg-neutral-100 dark:bg-neutral-800 lg:grid-cols-12 lg:gap-8 lg:p-10 xl:gap-0">
                  <div className="col-span-12 flex items-center justify-between">
                    <div className="">
                      <h3 className="mb-4 text-2xl font-semibold">Run Analysis</h3>
                      <p className="text-light text-sm">
                        To run the analysis, click the button above. The analysis will take a few seconds to complete.
                      </p>
                    </div>
                    <FaCheckCircle className="text-gray-600" size={48} />
                  </div>
                </div>
              </section>
            )}
            {runtimeResults && !runtimeResults?.analysis?.isSuccess && (
              <section className="mt-10 w-full">
                <div className="mx-auto grid w-full max-w-screen-xl rounded-md border-2 bg-neutral-100 dark:bg-neutral-800 lg:grid-cols-12 lg:gap-8 lg:p-10 xl:gap-0">
                  <div className="col-span-12 flex items-center justify-between">
                    <div className="">
                      <h3 className="mb-4 text-2xl font-semibold">No Results</h3>
                      <p className="text-light text-sm">
                        To run the analysis, click the button above. The analysis will take a few seconds to complete.
                      </p>
                    </div>
                    <FaCheckCircle className="text-gray-600" size={48} />
                  </div>
                </div>
              </section>
            )}
            {runtimeResults && runtimeResults?.analysis?.isSuccess && (
              <section className="mt-5 w-full">
                <div className="mx-auto grid w-full max-w-screen-xl rounded-md border-2 bg-neutral-100 dark:bg-neutral-800 lg:grid-cols-12 lg:gap-8 lg:p-10 xl:gap-0">
                  <div className="col-span-12 flex items-center justify-between">
                    <div className="">
                      <h3 className="mb-4 text-2xl font-semibold">Passing</h3>
                      <p className="text-light text-sm">
                        <span className="font-bold">The account has passed the set validation.</span> Below is a list of the transactions that were
                        found to be valid.
                      </p>
                    </div>
                    <FaCheckCircle className="text-green-600" size={32} />
                  </div>
                  <div className="col-span-12 mt-6">
                    <DataTable columns={columnsActionObservers} data={flattenedMatches} />
                  </div>
                </div>
              </section>
            )}
            <section className="mt-10 w-full">
              <h3 className="text-lg font-normal">Conditions</h3>
              <hr className="my-4" />
              <SetConditions id={id} />
            </section>
          </TabsContent>
          <TabsContent value="password">
            <pre>
              <code>{JSON.stringify(set?.model, null, 2)}</code>
            </pre>
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}

const SetConditions = ({ id }: any) => {
  const set = useSet(id)
  return (
    <div className="grid grid-cols-1 gap-4">
      {set?.model?.conditions?.map((condition: any) => {
        return <ConditionCard key={condition.id} {...condition} />
      })}
    </div>
  )
}
