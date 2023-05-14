import { SmartContractSet } from './types/core'
import { EVMState } from './types/evm'

import { Client } from 'viem'

import { conditionsApply } from './conditions-apply'
import { hydrateSet } from './hydrate/hydrate-set'
import { injectState } from './inject-state'
import { runRules } from './run-rules'

interface RuntimeInput {
  set: SmartContractSet
  state: EVMState
  clients: Client[]
}

interface RuntimeOutput {
  set: any
  analysis: any
}

/**
 * @name Runtime
 * @description Runtime is the main entrypoint for runtime engine. It is responsible for:
 * 1. Fetch externally referenced data objects (e.g. ABI files from IPFS)
 * 2. Injecting EVM state into corresponding Entity smart contract objects
 * 3. Applying conditions to Entity smart contract objects EVM state
 * 4. Apply rules to Entity smart contract objects EVM state and conditions
 */
export async function runtime({
  set,
  state,
  clients,
}: RuntimeInput): Promise<RuntimeOutput | void> {
  try {
    const hydrated = await hydrateSet(set, clients)
    const injected = injectState({
      set: hydrated,
      state,
    })
    const conditioned = conditionsApply(injected)
    const analysis = runRules(conditioned)
    return {
      set: conditioned,
      analysis,
    }
  } catch (error: any) {
    console.error(error)
    return
  }
}
