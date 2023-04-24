import _ from 'lodash';
import { findStateMatchingSmartContractConditionFunction } from '../state';
import findStateMatchingSmartContractConditionLog from '../state/findStateMatchingSmartContractConditionLog';
import findStateMatchingSmartContractConditionRead from '../state/findStateMatchingSmartContractConditionRead';
import { ConstructedSmartContractSet, EntityCollection } from '../types';

function filterParsedStateMatchingSmartContractSetConditions(
  constructedSet: ConstructedSmartContractSet
): ConstructedSmartContractSet {
  let __collections = [];
  __collections = constructedSet.collections.map(
    (collection: EntityCollection) => {

      console.log(collection, 'collection')
      if (!collection.state?.parsed) return collection;

      if (!collection?.conditions) return;

      const transactionConditions = _.filter(
        collection.conditions,
        condition => condition.type === 'transaction'
      );
      const logConditions = _.filter(
        collection.conditions,
        condition => condition.type === 'log'
      );
      const readConditions = _.filter(
        collection.conditions,
        condition => condition.type === 'read'
      );


      const totalTransactionMatches = transactionConditions
        .map(conditions => ({
          id: conditions.id,
          matches: findStateMatchingSmartContractConditionFunction(
            conditions,
            collection?.state?.parsed?.transactions
          ),
        }))
        .filter(tx => tx);

        console.log(totalTransactionMatches, 'totalTransactionMatches')

      const totalLogMatches = logConditions.map(conditions => ({
        id: conditions.id,
        matches: findStateMatchingSmartContractConditionLog(
          conditions,
          collection?.state?.parsed?.logs
        ),
      }));
      const totalReadMatches = readConditions.map(conditions => ({
        id: conditions.id,
        matches: findStateMatchingSmartContractConditionRead(
          conditions,
          collection?.state?.parsed?.reads
        ),
      }));

      const _matches = {
        transactions: totalTransactionMatches,
        logs: totalLogMatches,
        reads: totalReadMatches,
      };

      return {
        ...collection,
        computed: _matches,
      };
    }
  );
  const __parsedSet = Object.assign({}, constructedSet, {
    collections: __collections,
    status: 'filtered',
  });
  return __parsedSet;
}

export default filterParsedStateMatchingSmartContractSetConditions;
