import _ from 'lodash';
import { getAddress } from '@ethersproject/address';
import {
  ConstructedSmartContractSet,
  EVMState,
  EntityCollection,
} from '../types';

function injectStateInConstructedSmartContractSet(
  constructedSet: ConstructedSmartContractSet,
  data: EVMState
): ConstructedSmartContractSet {
  let collections: EntityCollection[] = [];
  collections = constructedSet.collections.map(
    (collection: EntityCollection) => {
      const __transactions = _.filter(data.transactions, {
        to: collection.entity.address,
      });

      const __logs = _.filter(data.logs, {
        address: getAddress(collection.entity.address),
      });
      // @TODO: Write better way to implement provider handling.
      const __providers = {
        [collection.entity.chainId]: data.providers[collection.entity.chainId],
      };

      return {
        ...collection,
        state: {
          ...collection.state,
          transactions: __transactions,
          logs: __logs,
          providers: __providers,
          parsed: {
            ...collection.state.parsed,
            reads: [],
          },
        },
      };
    }
  );

  const __constructedSet = Object.assign({}, constructedSet, {
    collections,
    status: 'injected',
  });
  return __constructedSet;
}
export default injectStateInConstructedSmartContractSet;
