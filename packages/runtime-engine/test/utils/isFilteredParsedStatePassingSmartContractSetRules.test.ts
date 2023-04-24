import { JsonRpcProvider } from '@ethersproject/providers';
import sortSmartContractSet from '../../src/utils/sortSmartContractSet';
import constructSortedSmartContractSet from '../../src/mutations/constructSortedSmartContractSet';
import injectStateInConstructedSmartContractSet from '../../src/mutations/injectStateInConstructedSmartContractSet';
import parseStateInConstructedSmartContractSet from '../../src/mutations/parseStateInConstructedSmartContractSet';
import filterParsedStateMatchingSmartContractSetConditions from '../../src/mutations/filterParsedStateMatchingSmartContractSetConditions';
import isFilteredParsedStatePassingSmartContractSetRules from '../../src/utils/isFilteredParsedStatePassingSmartContractSetRules';

import logs from '../../data/state/erc20.logs.json';
import transactions from '../../data/state/erc20.transactions.json';
import set from '../../data/sets/set.smartcontract.ERC20.json';
import setMinimal from '../../data/sets/set.smartcontract.ERC20Minimal.json';

describe('isFilteredParsedStatePassingSmartContractSetRules', () => {
  it('should export injectStateInConstructedSmartContractSet from src', () => {
    expect(injectStateInConstructedSmartContractSet).toBeDefined();
  });

  it('should successfully construct a sorted smart contract set', async () => {
    const state = {
      logs,
      transactions,
      providers: { 1: new JsonRpcProvider('http://localhost:8545') },
    };

    const isPassingSetValidation = isFilteredParsedStatePassingSmartContractSetRules(
      filterParsedStateMatchingSmartContractSetConditions(
        parseStateInConstructedSmartContractSet(
          injectStateInConstructedSmartContractSet(
            // @ts-ignore
            constructSortedSmartContractSet(sortSmartContractSet(set)),
            // @ts-ignore
            state
          )
        )
      )
    );

    const isMinimalStatePassingSetValidation = isFilteredParsedStatePassingSmartContractSetRules(
      filterParsedStateMatchingSmartContractSetConditions(
        parseStateInConstructedSmartContractSet(
          injectStateInConstructedSmartContractSet(
            // @ts-ignore
            constructSortedSmartContractSet(sortSmartContractSet(setMinimal)),
            // @ts-ignore
            state
          )
        )
      )
    );
    expect(isPassingSetValidation).toBe(false);
    expect(isMinimalStatePassingSetValidation).toBe(true);
  });
});
