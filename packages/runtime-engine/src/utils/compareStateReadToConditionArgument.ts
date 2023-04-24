import _ from 'lodash';
import { BigNumber } from '@ethersproject/bignumber';
import { SmartContractConditionArgument } from '@web3-sets/smart-contract-schema';
import { conditionString } from './conditions/conditionString';
import { conditionBigNumber } from './conditions/conditionBigNumber';
import { isBigNumberish } from '@ethersproject/bignumber/lib/bignumber';
import { ContractRead } from '../types';

export function compareStateReadToConditionArgument(
  read: ContractRead,
  conditionArguments: SmartContractConditionArgument[]
) {
  const formatted = conditionArguments.map(arg => {
    let condition: any = { ...arg };
    const txInputValue = _.get(read.value, condition.index);

    switch (arg.type) {
      case 'bignumber':
        if (isBigNumberish(txInputValue)) {
          condition.input = BigNumber.from(txInputValue || 0);
          condition.valueFormatted = BigNumber.from(arg.value || 0);
        } else {
          return false;
        }
        break;
      default:
        condition.input = txInputValue;
        condition.valueFormatted = arg.value;
    }
    return condition;
  });

  const conditionStatus = formatted.map(arg => {
    switch (arg.type) {
      case 'address':
      case 'bytes':
      case 'string':
        return conditionString(arg.comparator, arg.valueFormatted, arg.input);
      case 'bignumber':
        return conditionBigNumber(
          arg.comparator,
          arg.valueFormatted,
          arg.input
        );
      default:
        return false;
    }
  });

  const conditionsCompletion = {
    conditions: conditionStatus,
    isComplete: conditionStatus.reduce((acc, cur) => acc && cur, true), // all conditions must be true
    argumentsTotal: conditionArguments.length,
    argumentsMatched: conditionStatus.filter(Boolean).length,
  };

  return conditionsCompletion;
}

export default compareStateReadToConditionArgument;
