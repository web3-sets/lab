'use client'
import * as React from 'react'

import { SmartContractSet } from '@web3-sets/smart-contract-schema'
import { PoolTogetherOptimismDeposit } from '@web3-sets/smart-contract-sets'
import Ajv from 'ajv'
import classNames from 'clsx'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useAccount, useNetwork } from 'wagmi'

import { etherscanAccountTransactions } from '@/integrations/etherscan/account-transactions'
import { useToast } from '@/lib/hooks/use-toast'

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'

const ajv = new Ajv({
  allErrors: true,
})
interface ViewRuntimeEngineProps {
  className?: string
}

type Inputs = {
  set: string
  state: string
}

export const ViewRuntimeEngine = ({ className }: ViewRuntimeEngineProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Inputs>()
  const { toast } = useToast()

  const { address } = useAccount()
  const { chain } = useNetwork()

  const [transactonHistory, setTransactonHistory] = React.useState<Array<any>>()
  const handleFetchTransactionHistory = async () => {
    if (address) return
    const transactions: any = await etherscanAccountTransactions(chain?.id || 1, address)
    setValue('state', JSON.stringify({ transactions, logs: [] }, null, 2))
    setTransactonHistory(transactions)
  }

  const [isValid, setIsValid] = React.useState<number>(0)
  const [validationErrors, setValidationErrors] = React.useState<Array<any>>([])
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    try {
      if (data.set === '') return
      const parsed = JSON.parse(data.set)
      const validate = ajv.compile(SmartContractSet)
      const valid = validate(parsed)
      setIsValid(valid ? 1 : -1)
      // @ts-ignore
      setValidationErrors(validate.errors)
      console.log(validate.errors)
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
      })
    }
  }

  const classNamesHeader = classNames('flex items-center justify-between p-4 rounded-lg', {
    'bg-neutral-100': isValid == 0,
    'bg-green-100': isValid == 1,
    'bg-red-100': isValid == -1,
  })

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={classNamesHeader}>
        <div className="flex items-center space-x-4">
          <h3 className="text-2xl font-semibold">Set Runtime Engine</h3>
          <Dialog>
            <DialogTrigger>
              <span className="text-sm text-gray-600 hover:text-gray-700">How It Works</span>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Set Runtime Engine</DialogTitle>
                <DialogDescription className="content">
                  <p className="">An EVM state object is compared against a valid Web3 Set.</p>
                  <p className="">
                    If the EVM state object contains history (transactions, logs, etc...) that meets the sets conditions and rules the set runtime
                    engine will <span className="font-bold">return true</span>.
                  </p>
                  <p className="">
                    If not <span className="font-bold">false</span> will be returned.
                  </p>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
        <div className="flex-1 text-center">
          {isValid == -1 ? (
            <Dialog>
              <DialogTrigger>
                <span className="text-sm text-gray-600 hover:text-gray-700">Error Report</span>
              </DialogTrigger>
              <DialogContent className="max-h-[500px] overflow-auto">
                <DialogHeader>
                  <DialogTitle>Validation Error Report</DialogTitle>
                  <DialogDescription className="content">
                    {validationErrors.map((error, index) => {
                      return (
                        <div key={index} className="card my-3">
                          <h3 className="text-lg font-normal">{error.schemaPath}</h3>
                          <span className="">{error.keyword}</span>
                          <hr className="my-2" />
                          {Object.keys(error.params).map((label, index) => (
                            <span key={index} className="">
                              {label}: {error.params[label]}
                            </span>
                          ))}
                        </div>
                      )
                    })}
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          ) : null}
          {isValid == 1 ? <span className="font-bold">Passing</span> : null}
          {/* <span className="ml-2">{isValid === 1 ? 'Valid' : isValid === -1 ? 'Invalid' : ''}</span> */}
        </div>
        <div className="">
          <button className="btn btn-primary btn-pill" type="submit">
            Execute
          </button>
        </div>
      </div>
      <hr className="my-4" />
      <div className="flex space-x-8">
        <textarea
          className="input w-full lg:min-h-[680px]"
          placeholder={`${JSON.stringify(PoolTogetherOptimismDeposit, null, 2)}`}
          {...register('set', { required: true })}
        />
        <div className="w-full">
          <div className="mb-4 flex items-center justify-between">
            <span className="font-semibold">EVM State</span>
            <span className="tag tag-primary" onClick={handleFetchTransactionHistory}>
              Inject account transaction history
            </span>
          </div>
          <textarea
            className="input w-full lg:min-h-[680px]"
            placeholder={`{
  transactions: [],
  logs: [],
}`}
            {...register('state', { required: true })}
          />
        </div>
      </div>

      {/* errors will return when field validation fails  */}
      {errors.set && <span>This field is required</span>}
    </form>
  )
}
