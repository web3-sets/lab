import _ from 'lodash';
import { ConstructedSmartContractSet, EntityCollection } from '../types';

function parseStateInConstructedSmartContractSet(
  constructedSet: ConstructedSmartContractSet
): ConstructedSmartContractSet {
  let __collections = [];
  __collections = constructedSet.collections.map(
    (collection: EntityCollection) => {
      if (!collection.state || !collection.interface) return collection;
      const __parsedTransactions = _.map(
        collection?.state.transactions,
        (transaction: any) => ({
          ...transaction,
          // @ts-ignore
          parsed: collection?.interface.parseTransaction({...transaction, data: transaction.input}),
        })
      );

      return {
        ...collection,
        state: {
          ...collection.state,
          parsed: {
            transactions: __parsedTransactions,
            logs: collection.state.logs,
            reads: collection.state.parsed?.reads,
          },
        },
      };
    }
  );
  const __parsedSet = Object.assign({}, constructedSet, {
    collections: __collections,
    status: 'parsed',
  });
  return __parsedSet;
}

export default parseStateInConstructedSmartContractSet;
