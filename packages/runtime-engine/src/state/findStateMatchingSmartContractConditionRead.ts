import { SmartContractCondition } from '@web3-sets/smart-contract-schema';
import { ConditionStateMatchObject, ContractRead } from '../types';
import compareStateToConditionArgument from '../utils/compareStateToConditionArgument';

function findStateMatchingSmartContractConditionRead(
  condition: SmartContractCondition,
  reads: ContractRead[]
) {
  return reads.map((read: any) => {
    const status = compareStateToConditionArgument(read, condition.arguments);
    return {
      object: ConditionStateMatchObject.Read,
      conditionId: condition.id,
      stateId: read.encoded, // Since the state is dynamic we reference it via the encoded value used for the read. To reconstruct the request use the parent entity address and the encoded value to refetch the state.
      conditions: status.conditions,
      isComplete: status.isComplete,
    };
  });
}

export default findStateMatchingSmartContractConditionRead;
