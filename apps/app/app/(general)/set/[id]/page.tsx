'use client'

import { FaCheckCircle } from 'react-icons/fa'

import { TableWeb3SetFilteredTransaction } from '@/components/app/table-web3set-filtered-transactions'
import { FormRunSetValidation } from '@/components/form-run-set-validation'
import { Icons } from '@/components/shared/icons'
import { LinkComponent } from '@/components/shared/link-component'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useSet } from '@/lib/hooks/use-set'
import { useSetLocalState } from '@/lib/state/set'

export default function SetUniswapV2Swap({ params }: any) {
  const { id } = params
  const set = useSet(id)
  const { set: runtime } = useSetLocalState(set?.model?.id, set?.model)

  return (
    <>
      <section className="w-full">
        <div className="mx-auto grid max-w-screen-xl lg:grid-cols-12 lg:gap-8 xl:gap-6">
          <div className="lg:col-span-12">
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
          <div className="flex items-center justify-between lg:col-span-12 lg:mt-0 lg:flex">
            <span className="flex items-center">
              Version: {set?.model?.version.major}.{set?.model?.version.minor}.{set?.model?.version.patch}
            </span>
            <LinkComponent href="https://github.com/web3-set-theory" className="flex items-center gap-3">
              <Icons.gitHub className="w-4" /> <span className="">View Set on Github</span>
            </LinkComponent>
          </div>
        </div>
      </section>
      <hr className="my-2" />
      <div className="mx-auto w-full max-w-screen-xl">
        <Tabs defaultValue="account" className="w-full">
          <TabsList className="w-full p-3">
            <TabsTrigger className="w-1/2 py-4" value="account">
              Runtime Engine
            </TabsTrigger>
            <TabsTrigger className="w-1/2 py-4" value="password">
              Set Model
            </TabsTrigger>
          </TabsList>
          <div className="my-4" />
          <TabsContent value="account" className="border-none p-0">
            <section className="w-full">
              <div className="mx-auto grid w-full max-w-screen-xl rounded-md border-2 bg-neutral-100 dark:bg-neutral-800 lg:grid-cols-12 lg:gap-8 lg:p-10 xl:gap-0">
                <div className="col-span-12">
                  <FormRunSetValidation schema={set?.model} />
                  <p className="text-light text-sm">
                    <span className="font-bold">How it works:</span> The account&apos;s transaction history will be fetched from Etherscan and
                    analyzed using the Web3 Smart Contract Set. The results will be displayed below.
                  </p>
                </div>
              </div>
            </section>
            <hr className="my-8" />
            <section className="w-full">
              <div className="mx-auto grid w-full max-w-screen-xl rounded-md border-2 bg-neutral-100 dark:bg-neutral-800 lg:grid-cols-12 lg:gap-8 lg:p-10 xl:gap-0">
                {!runtime?.analytics?.isRun ? (
                  <div className="col-span-12 flex items-center justify-between">
                    <div className="">
                      <h3 className="mb-4 text-2xl font-semibold">Run Analysis</h3>
                      <p className="text-light text-sm">
                        To run the analysis, click the button above. The analysis will take a few seconds to complete.
                      </p>
                    </div>
                    <FaCheckCircle className="text-gray-600" size={48} />
                  </div>
                ) : (
                  <>
                    {runtime?.analytics?.isPassing ? (
                      <>
                        <div className="col-span-12 flex items-center justify-between">
                          <div className="">
                            <h3 className="mb-4 text-2xl font-semibold">Passing</h3>
                            <p className="text-light text-sm">
                              <span className="font-bold">The account has passed the set validation.</span> Below is a list of the transactions that
                              were found to be valid.
                            </p>
                          </div>
                          <FaCheckCircle className="text-green-600" size={32} />
                        </div>
                        <div className="col-span-12 mt-6">
                          <TableWeb3SetFilteredTransaction data={runtime?.analytics?.filteredTx} />
                        </div>
                      </>
                    ) : (
                      <div className="col-span-12">
                        <h2 className="text-2xl font-bold">Set is not passing</h2>
                      </div>
                    )}
                  </>
                )}
              </div>
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
