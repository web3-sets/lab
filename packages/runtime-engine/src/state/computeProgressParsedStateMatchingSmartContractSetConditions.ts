import { findStateMatchingSmartContractConditionFunction } from '.';
import { ConstructedSmartContractSet, EntityCollection } from '../types';

function computeProgressParsedStateMatchingSmartContractSetConditions(
  constructedSet: ConstructedSmartContractSet
): ConstructedSmartContractSet {
  let __collections = [];
  __collections = constructedSet.collections.map(
    (collection: EntityCollection) => {
      if (!collection.state?.parsed) return collection;

      if (!collection?.conditions) return;
      const progress = collection?.conditions
        .map(conditions =>
          findStateMatchingSmartContractConditionFunction(
            conditions,
            collection?.state?.parsed?.transactions
          )
        )
        .filter(tx => tx);
      return {
        ...collection,
        progress: progress.flat(1),
      };
    }
  );
  const __parsedSet = Object.assign({}, constructedSet, {
    collections: __collections,
    status: 'progress',
  });
  return __parsedSet;
}

export default computeProgressParsedStateMatchingSmartContractSetConditions;
