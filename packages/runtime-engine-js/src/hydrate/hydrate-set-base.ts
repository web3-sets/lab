import { EntityHydrated, SmartContractSetHydrated } from '../types'
import { Condition, SmartContractSet } from '../types/core'
import { Client } from 'viem'

/**
 * @name hydrateSetBase
 */
export function hydrateSetBase(
  set: SmartContractSet,
  conditions: Condition[],
  clients: Client[],
): SmartContractSetHydrated {
  const length = set.entities.length
  const newSet = { rules: set.rules, entities: [] as EntityHydrated[], clients }
  for (let index = 0; index < length; index++) {
    newSet.entities.push({
      name: set.entities[index].name,
      address: set.entities[index].address,
      chainId: set.entities[index].chainId,
      abi: set.entities[index].abi,
      conditions: conditions?.filter(
        (condition: Condition) => condition.eid === set.entities[index].address,
      ),
      state: {
        raw: {
          transactions: [],
        },
        parsed: {
          transactions: [],
        },
      },
      matches: {
        transactions: [],
      },
    } as EntityHydrated)
  }

  return newSet
}
