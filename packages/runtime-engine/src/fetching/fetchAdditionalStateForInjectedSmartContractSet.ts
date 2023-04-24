import { Contract } from '@ethersproject/contracts';
import { ConstructedSmartContractSet } from '../types';
import { SmartContractConditionType } from '@web3-sets/smart-contract-schema';

async function fetchAdditionalStateForInjectedSmartContractSet(
  constructedSet: ConstructedSmartContractSet
): Promise<ConstructedSmartContractSet> {
  let __collections = [];
  __collections = constructedSet.collections;
  for (let cIndex = 0; cIndex < constructedSet.collections.length; cIndex++) {
    const collection = constructedSet.collections[cIndex];
    if (!collection.state) throw new Error('Collection State: undefined');
    if (!collection?.conditions)
      throw new Error('Collection Conditions: undefined');
    const provider = collection.state.providers[collection.entity.chainId];
    const contract = new Contract(
      collection.entity.address,
      collection.entity.abi,
      provider
    );
    for (let index = 0; index < collection.conditions.length; index++) {
      const condition = collection.conditions[index];
      if (condition.type === SmartContractConditionType.Read) {
        // ts-ignore
        if(!Array.isArray(condition?.inputs)) throw new Error('Condition inputs: undefined');
        const inputArray = condition?.inputs.map((arg: any) => arg.value);
        const encoded = await contract.populateTransaction[condition.signature](
          ...inputArray
        );

        const result = await contract.functions[condition.signature](
          ...inputArray
        );
        __collections[cIndex].state?.parsed?.reads.push({
          conditionId: condition.id,
          value: result,
          inputs: inputArray,
          encoded: encoded.data || '',
        });
      }
    }
  }

  const __constructedSet = Object.assign({}, constructedSet, {
    collections: __collections,
    status: 'fetched',
  });

  return __constructedSet;
}

export default fetchAdditionalStateForInjectedSmartContractSet;
