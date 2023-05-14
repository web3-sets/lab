import { filterTransactionsMatchingConditions } from './filter/filter-transactions-matching-conditions'
import { SmartContractSetHydrated } from './types'

export function conditionsApply(
  set: SmartContractSetHydrated,
): SmartContractSetHydrated {
  const newSet = { ...set }
  const length = set.entities.length
  for (let index = 0; index < length; index++) {
    const entity = newSet.entities[index]
    const transactionConditions = entity.conditions.filter(
      (condition) => condition.type === 'transaction',
    )

    const totalMatches = transactionConditions
      .map((condition) => {
        const matches = filterTransactionsMatchingConditions({
          condition,
          transactions: entity.state.parsed.transactions,
        })
        return matches
      })
      .flatMap((matches) => matches)
    entity.matches.transactions = totalMatches
  }
  return newSet
}
