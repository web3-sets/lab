import { SmartContractSetHydrated } from './types'
import { EVMState } from './types/evm'
import { decodeFunctionData } from 'viem'

interface Input {
  set: SmartContractSetHydrated
  state: EVMState
}

export function injectState({ set, state }: Input): SmartContractSetHydrated {
  const newSet = { ...set }

  const length = newSet.entities.length
  for (let index = 0; index < length; index++) {
    newSet.entities[index].state.raw = {
      transactions: state?.transactions?.filter(
        (transaction) =>
          transaction.to?.toLowerCase() ===
          newSet.entities[index].address.toLowerCase(),
      ),
    }
    newSet.entities[index].state.parsed = {
      transactions: newSet.entities[index].state.raw.transactions.map(
        (tx: any) => {
          const decoded = decodeFunctionData({
            abi: newSet.entities[index].abi,
            data: tx.data || tx.input, // Support for Default and Etherscan API transaction objects
          })
          return {
            hash: tx.hash,
            args: decoded.args,
            functionName: decoded.functionName,
          }
        },
      ),
    }
  }

  return newSet
}
