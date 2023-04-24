import { SmartContractSet } from '@web3-sets/smart-contract-schema';
import { ConstructedSmartContractSet } from '../types';

function validateInput(set: any) {
  if (!set) throw new Error('set is required');
}

function sortSmartContractSet(
  set: SmartContractSet
): ConstructedSmartContractSet {
  validateInput(set);
  let __collections = [];
  for (let sIndex = 0; sIndex < set.entities.length; sIndex++) {
    const _entity = set.entities[sIndex];
    const _conditions = set.conditions.filter(
      (condition: any) => condition.eid === _entity.id
    );
    __collections.push({
      entity: _entity,
      conditions: _conditions,
      // @ts-ignore
      status: 'sorted',
      state: {
        transactions: [],
        providers: {},
        logs: [],
        parsed: {
          transactions: [],
          logs: {},
          reads: [],
        },
      },
      computed: {
        transactions: [],
        logs: [],
        reads: [],
      },
      metadata: undefined,
      progress: undefined,
    });
  }

  return {
    collections: __collections,
    rules: set.rules,
    status: 'sorted',
  };
}

export default sortSmartContractSet;
