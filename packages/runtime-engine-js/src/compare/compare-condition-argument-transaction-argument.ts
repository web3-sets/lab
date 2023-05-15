import { conditionBigNumber } from '../conditions/condition-big-number'
import { conditionString } from '../conditions/condition-string'
import { conditionTuple } from '../conditions/condition-tuple'
import { ConditionArgument, TransactionParsed } from '../types'
import { BigNumber } from '@ethersproject/bignumber'
import { isBigNumberish } from '@ethersproject/bignumber/lib/bignumber'

export function compareConditionArgumentToTransactionArgument(
  transaction: TransactionParsed,
  conditionArguments: ConditionArgument[],
) {
  const formatted = conditionArguments.map((arg) => {
    const condition: any = { ...arg }
    const txInputValue = transaction.args[condition.index]
    switch (arg.type) {
      case 'bignumber':
        if (isBigNumberish(txInputValue)) {
          condition.input = BigNumber.from(txInputValue || 0)
          condition.valueFormatted = BigNumber.from(arg.value || 0)
        } else {
          return false
        }
        break
      default:
        condition.input = txInputValue
        condition.valueFormatted = arg.value
    }
    return condition
  })

  const conditionStatus = formatted.map((arg) => {
    switch (arg.type) {
      case 'address':
      case 'bytes':
      case 'string':
        return conditionString(arg.condition, arg.valueFormatted, arg.input)
      case 'bignumber':
        return conditionBigNumber(arg.condition, arg.valueFormatted, arg.input)
      case 'tuple':
        return conditionTuple(
          arg.condition,
          arg.valueFormatted,
          arg.input,
          arg.selector,
        )
      default:
        return false
    }
  })

  const conditionsCompletion = {
    conditions: conditionStatus,
    isComplete: conditionStatus.reduce((acc, cur) => acc && cur, true), // all conditions must be true
    argumentsTotal: conditionArguments.length,
    argumentsMatched: conditionStatus.filter(Boolean).length,
  }
  return conditionsCompletion
}

export default compareConditionArgumentToTransactionArgument
