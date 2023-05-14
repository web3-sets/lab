import React, { useEffect, useState } from 'react'

// import { filterTransactionsUsingSmartContractSet, isEVMStatePassingSetValidation, recursiveSetResourceFetching } from '@web3-sets/runtime-engine'
import { EVMState, runtime } from '@web3-sets/runtime-engine-js'
import { useForm } from 'react-hook-form'
import { FaCheckCircle } from 'react-icons/fa'
import { useAccount, useNetwork, useProvider } from 'wagmi'
import * as yup from 'yup'

import { WalletConnect } from '@/components/blockchain/wallet-connect'
import { BranchIsAuthenticated } from '@/components/shared/branch-is-authenticated'
import { BranchIsWalletConnected } from '@/components/shared/branch-is-wallet-connected'
import { clientMainnet } from '@/config/evm-public-clients'
import { etherscanAccountTransactions } from '@/integrations/etherscan/account-transactions'
import { ButtonSIWELogin } from '@/integrations/siwe/components/button-siwe-login'
import { useYupValidationResolver } from '@/lib/hooks/useYupValidationResolver'
import { useSetLocalState } from '@/lib/state/set'
import { useAnalysis } from '@/lib/state/state-analysis'

import { TableWeb3SetFilteredTransaction } from './app/table-web3set-filtered-transactions'

const validationSchema = yup.object({
  account: yup.string().required('Account is required'),
})

interface FormRunSetValidationProps {
  schema: any
}

export function FormRunSetValidation({ schema }: FormRunSetValidationProps) {
  const resolver = useYupValidationResolver(validationSchema)
  const { handleSubmit, register, setValue, setError, reset, ...rest } = useForm({ resolver })
  const { address } = useAccount()
  const { chain } = useNetwork()
  const provider = useProvider()

  // const { set, updateSet } = useSetLocalState(schema?.id)
  const { addAnalysis, analysisAll } = useAnalysis(schema?.id)

  const [runtimeResults, setRuntimeResults] = useState()
  const onSubmit = async (data: any) => {
    const logs: any = []
    const transactions: any = await etherscanAccountTransactions(chain?.id || 1, data.account)
    const state = {
      logs,
      transactions: transactions,
    } as EVMState
    const runtimeResults = await runtime({
      set: schema,
      state,
      clients: [clientMainnet],
    })
    addAnalysis({
      id: schema?.id,
      ...runtimeResults,
    })
    setRuntimeResults(runtimeResults)
  }

  console.log(analysisAll, 'analysisAll')
  useEffect(() => {}, [analysisAll])

  const handleSetAccount = () => {
    setValue('account', address)
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex items-center gap-4">
        <div className="flex w-2/3 gap-10">
          <div className="mb-6 w-full">
            <label htmlFor="account" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
              Account <span className="mt-2 text-center text-xs text-gray-700">(Ethereum address or ENS domain)</span>
            </label>
            <div className="flex flex-1 items-center gap-2">
              <input
                {...register('account')}
                type="text"
                id="name"
                className="block flex-1 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="0x000...000"
              />
              <span onClick={handleSetAccount} className="tag tag-light cursor-pointer">
                Insert Wallet Address
              </span>
            </div>
            {rest.formState.errors.to && <p className="text-xs italic text-red-500">{rest.formState.errors.to.message as string}</p>}
          </div>
        </div>

        <div className="w-1/3">
          <BranchIsAuthenticated>
            <BranchIsWalletConnected>
              {rest.formState.isSubmitted ? (
                <>
                  <div className="flex items-center gap-4">
                    <button type="button" className="btn btn-emerald w-full">
                      Analysis Run
                    </button>
                    <button type="button" onClick={() => reset()} className="btn btn-secondary">
                      Reset
                    </button>
                  </div>
                </>
              ) : (
                <button type="submit" className="btn btn-emerald w-full">
                  {rest.formState.isSubmitting ? (
                    <svg className="-ml-1 mr-3 h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v1a7 7 0 00-7 7h1z"></path>
                    </svg>
                  ) : (
                    'Run Analysis'
                  )}
                </button>
              )}
              <WalletConnect />
            </BranchIsWalletConnected>
            <ButtonSIWELogin className="btn btn-sm btn-emerald w-full" label="Web3 Login" />
          </BranchIsAuthenticated>
        </div>
      </form>
      {/* <RuntimeAnalysis runtimeResults={runtimeResults} /> */}
    </>
  )
}

const RuntimeAnalysis = ({ runtimeResults }: any) => {
  return (
    <section className="w-full">
      <div className="mx-auto grid w-full max-w-screen-xl rounded-md border-2 bg-neutral-100 dark:bg-neutral-800 lg:grid-cols-12 lg:gap-8 lg:p-10 xl:gap-0">
        {!runtimeResults?.analysis?.isSuccess ? (
          <div className="col-span-12 flex items-center justify-between">
            <div className="">
              <h3 className="mb-4 text-2xl font-semibold">Run Analysis</h3>
              <p className="text-light text-sm">To run the analysis, click the button above. The analysis will take a few seconds to complete.</p>
            </div>
            <FaCheckCircle className="text-gray-600" size={48} />
          </div>
        ) : (
          <>
            {runtimeResults?.analysis?.isSuccess ? (
              <>
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
                  <TableWeb3SetFilteredTransaction data={runtimeResults?.analysis?.isSuccess} />
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
  )
}
