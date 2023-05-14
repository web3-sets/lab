import compareConditionArgumentToTransactionArgument from '../compare/compare-condition-argument-transaction-argument'
import {
  ConditionStateMatchObject,
  TransactionMatched,
  TransactionParsed,
} from '../types'

export function filterTransactionsMatchingConditions({
  condition,
  transactions,
}: {
  condition: any
  transactions: TransactionParsed[] | null
}): TransactionMatched[] {
  if (!transactions) {
    return []
  }
  // Web3 Sets use a function with a signature like:
  // `set(uint256, bool)`
  // We want to compare the function name, not the signature
  // so we split the signature on the first `(` and take the first
  // part of the string.
  // When we use viem.decodeFunctionData to parse the transaction
  // data, we get a `functionName` property that is just the function name.
  const conditionFunctionName = condition?.signature.split('(')[0]
  const filtered = transactions
    .map((tx: TransactionParsed) => {
      if (
        tx?.args &&
        condition?.args &&
        tx.functionName === conditionFunctionName
      ) {
        const comparator = compareConditionArgumentToTransactionArgument(
          tx,
          condition.args,
        )
        return {
          isSuccess: comparator.isComplete,
          cid: condition.id,
          object: ConditionStateMatchObject.Transaction,
          hash: tx.hash,
          data: {
            matched: comparator.argumentsMatched,
            total: comparator.argumentsTotal,
            conditions: comparator.conditions,
          },
        }
      } else {
        return null
      }
    })
    .filter((tx) => tx !== null)

  // @ts-ignore
  return filtered
}
