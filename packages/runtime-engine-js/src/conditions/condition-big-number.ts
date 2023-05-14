import { BigNumber } from '@ethersproject/bignumber'

export function conditionBigNumber(
  condition: string,
  value: BigNumber,
  input: BigNumber,
) {
  switch (condition) {
    case 'gt':
      return input.gt(value)
    case 'gte':
      return input.gte(value)
    case 'lt':
      return input.lt(value)
    case 'lte':
      return input.lte(value)
    case 'eq':
      return input.eq(value)
    case 'neq':
      return !input.eq(value)
    default:
      return false
  }
}
