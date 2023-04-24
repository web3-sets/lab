import { Interface } from '@ethersproject/abi';
import { ConstructedSmartContractSet } from '../types';

function constructSortedSmartContractSet(
  constructedSet: ConstructedSmartContractSet
): ConstructedSmartContractSet {
  const { collections } = constructedSet;
  const __collections = [...collections];
  for (let index = 0; index < __collections.length; index++) {
    const _jsonFragment = __collections[index].entity.abi;
    __collections[index].interface = new Interface(_jsonFragment);
  }
  return {
    collections: __collections,
    rules: constructedSet.rules,
    status: 'constructed',
  };
}

export default constructSortedSmartContractSet;
