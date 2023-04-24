import { SmartContractCondition } from '@web3-sets/smart-contract-schema';
import { ConditionStateMatchObject, TransactionAndReceipt } from '../types';
import compareConditionArgumentToTransactionArgument from '../utils/compareConditionArgumentToTransactionArgument';

function findStateMatchingSmartContractConditionFunction(
  condition: SmartContractCondition,
  transactions: TransactionAndReceipt[]
) {
  const conditionsMatched = transactions
    .map((tx: any) => {
      if (
        tx?.parsed?.args &&
        condition?.arguments &&
        tx.parsed.signature === condition.signature
      ) {
        const status = compareConditionArgumentToTransactionArgument(
          tx.parsed,
          condition.arguments
        );
        return {
          object: ConditionStateMatchObject.Transaction,
          conditionId: condition.id,
          stateId: tx.hash,
          conditions: status.conditions,
          isComplete: status.isComplete,
        };
      } else {
        return null;
      }
    })
    .filter(tx => tx);

  return conditionsMatched;
}

export default findStateMatchingSmartContractConditionFunction;
