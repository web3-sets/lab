import { SmartContractCondition } from '@web3-sets/smart-contract-schema';
import { ConditionStateMatchObject, ParsedLog } from '../types';
import compareStateToConditionArgument from '../utils/compareStateToConditionArgument';

function findStateMatchingSmartContractConditionLog(
  condition: SmartContractCondition,
  logs?: ParsedLog[]
) {
  if (!logs) throw new Error('No logs provided');
  const conditionsMatched = logs.map((log: any) => {
    if (log && condition.arguments) {
      const status = compareStateToConditionArgument(log, condition.arguments);

      return {
        object: ConditionStateMatchObject.Log,
        conditionId: condition.id,
        stateId: `${log.transactionHash}|${log.logIndex}`,
        conditions: status.conditions,
        isComplete: status.isComplete,
      };
    } else {
      return null;
    }
  });

  return conditionsMatched;
}

export default findStateMatchingSmartContractConditionLog;
