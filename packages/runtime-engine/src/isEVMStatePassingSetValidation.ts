import { SmartContractSet } from '@web3-sets/smart-contract-schema';
// import jsonfile from 'jsonfile';
import { EVMState } from './types';
import sortSmartContractSet from './utils/sortSmartContractSet';
import constructSortedSmartContractSet from './mutations/constructSortedSmartContractSet';
import injectStateInConstructedSmartContractSet from './mutations/injectStateInConstructedSmartContractSet';
import parseStateInConstructedSmartContractSet from './mutations/parseStateInConstructedSmartContractSet';
import filterParsedStateMatchingSmartContractSetConditions from './mutations/filterParsedStateMatchingSmartContractSetConditions';
import isFilteredParsedStatePassingSmartContractSetRules from './utils/isFilteredParsedStatePassingSmartContractSetRules';
import fetchAdditionalStateForInjectedSmartContractSet from './fetching/fetchAdditionalStateForInjectedSmartContractSet';

/**
 * @name isEVMStatePassingSetValidation
 * @description Check if EVMState passes set validation
 * @summary Compares an EVMState to a SmartContract Set entity, condition and rules.
 * @param state EVMState - The state to validate
 * @param set SmartContractSet - The set to validate against
 * @returns boolean - true if the EVM state passes set validation
 */
export async function isEVMStatePassingSetValidation(
  state: EVMState,
  set: SmartContractSet
): Promise<boolean> {
  try {

    const setConstructed = constructSortedSmartContractSet(
      sortSmartContractSet(set)
    );
    
    const setConstructedStateful = injectStateInConstructedSmartContractSet(
      setConstructed,
      state
    );

    console.log(setConstructedStateful, 'setConstructedStateful')

    const setConstructedStatefulFetched = await fetchAdditionalStateForInjectedSmartContractSet(
      setConstructedStateful
    );

    const setConstructedStatefulFetchedParsed = parseStateInConstructedSmartContractSet(
      setConstructedStatefulFetched
    );

    console.log(setConstructedStatefulFetchedParsed, 'setConstructedStatefulFetchedParsed')

    const setConstructedStatefulFetchedParsedAndFiltered = filterParsedStateMatchingSmartContractSetConditions(
      setConstructedStatefulFetchedParsed
    );

    console.log(setConstructedStatefulFetchedParsedAndFiltered, 'setConstructedStatefulFetchedParsedAndFiltered')

    return isFilteredParsedStatePassingSmartContractSetRules(
      setConstructedStatefulFetchedParsedAndFiltered
    );
  } catch (error) {
    console.error(error);
    return false;
  }
}

export default isEVMStatePassingSetValidation;
