import {
  Analysis,
  Condition,
  EntityHydrated,
  SmartContractSetHydrated,
} from './types'

export function runRules(set: SmartContractSetHydrated): Analysis {
  const newSet = { ...set }
  const length = set.rules.length
  const matches: any = []

  for (let index = 0; index < length; index++) {
    const rule = newSet.rules[index]

    // Iterate over the operations in the rule.
    // TODO: Add support for multiple operations.
    rule.operations.forEach((operation, index: number) => {
      switch (operation) {
        case 'isComplete': {
          const cid = rule.cid[index]

          const transactions: any = []
          // Find the Entity that has the condition.
          const entityMatching = newSet.entities.find(
            (entity: EntityHydrated) => {
              return entity.conditions.find((condition: Condition) => {
                return condition.id === cid
              })
            },
          )

          let isComplete = true
          while (isComplete) {
            // If there are no transactions matches in the Entity
            // we can assume that the condition is not complete.
            if (entityMatching?.matches?.transactions?.length === 0) {
              isComplete = false
            }

            // Filters the matches for the current condition.
            // If there are no matches, we can assume that the condition
            // is not complete.
            let completeCounter = 0
            entityMatching?.matches?.transactions
              ?.filter((transaction: any) => transaction.cid === cid)
              .forEach((transaction: any) => {
                if (transaction.isSuccess === true) {
                  transactions.push({
                    chainId: entityMatching.chainId,
                    reference: findTransactionReference(
                      transaction.hash,
                      entityMatching,
                    ),
                    rid: rule.id,
                    ...transaction,
                  })
                  completeCounter = completeCounter + 1
                }
              })
            // TODO: Add support for ranges.
            // How? Not sure yet, but let's do something clever.
            if (completeCounter === 0) {
              isComplete = false
            }

            break
          }
          matches.push({
            id: rule.id, // Rule ID
            cid: cid, // Condition ID
            isSuccess: isComplete,
            matches: transactions,
          })
        }

        break
        case 'beforeTimestamp':
          break
        case 'afterTimestamp':
          break
        case 'beforeBlock':
          break
        case 'afterBlock':
          break
        default:
          break
      }
    })
  }

  return {
    isSuccess: isComplete(matches),
    data: matches,
  }
}

function isComplete(matches: any): boolean {
  const every = matches.every((match: any) => match.isSuccess === true)
  return every
}

function findTransactionReference(hash: string, entity: any): any {
  const match = entity?.state?.raw?.transactions?.filter(
    (transaction: any) => transaction.hash === hash,
  )
  if (match.length === 0) {
    return null
  }
  return match[0]
}

function findChainIdReference(cid: string, entity: any): any {
  const match = entity?.state?.raw?.chains?.filter(
    (chain: any) => chain.cid === cid,
  )
  if (match.length === 0) {
    return null
  }
  return match[0]
}
