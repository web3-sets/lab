import { ConstructedSmartContractSet } from '../types';

function isFilteredParsedStatePassingSmartContractSetRules(
  sortedTransactionsWithEntityAndConditionsList: ConstructedSmartContractSet
): boolean {
  const {
    collections: entityCollections,
  } = sortedTransactionsWithEntityAndConditionsList;
  let isComplete = true;

  console.log(entityCollections, 'entityCollections')  

  while (isComplete) {
    if(!entityCollections) return false;
    
    for (let _i = 0; _i < entityCollections.length; _i++) {
      const collection = entityCollections[_i];
      if(collection?.computed?.transactions.length && collection?.computed?.logs.length, collection?.computed?.reads.length) isComplete = false;
      if(collection?.computed?.transactions.length && collection?.computed?.logs.length, collection?.computed?.reads.length) isComplete = false;
      collection.computed?.transactions?.forEach(match => {
        if(match.matches.length == 0) isComplete = false;
        for (let _m of match.matches) {
          if (!_m.isComplete) isComplete = false;
        }
      });
      collection.computed?.logs?.forEach(match => {
        for (let _m of match.matches) {
          if (!_m.isComplete) isComplete = false;
        }
      });
      collection.computed?.reads?.forEach(match => {
        for (let _m of match.matches) {
          if (!_m.isComplete) isComplete = false;
        }
      });
    }
    break;
  }
  return isComplete;
}

export default isFilteredParsedStatePassingSmartContractSetRules;
