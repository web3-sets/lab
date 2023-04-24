import { JsonRpcProvider } from '@ethersproject/providers';
import sortSmartContractSet from '../../src/utils/sortSmartContractSet';
import constructSortedSmartContractSet from '../../src/mutations/constructSortedSmartContractSet';
import injectStateInConstructedSmartContractSet from '../../src/mutations/injectStateInConstructedSmartContractSet';

import logs from '../../data/state/erc20.logs.json';
import transactions from '../../data/state/erc20.transactions.json';
import set from '../../data/sets/set.smartcontract.ERC20.json';

describe('injectStateInConstructedSmartContractSet', () => {
  it('should export injectStateInConstructedSmartContractSet from src', () => {
    expect(injectStateInConstructedSmartContractSet).toBeDefined();
  });

  it('should successfully construct a sorted smart contract set', async () => {
    const state = {
      logs,
      transactions,
      providers: {
        1: new JsonRpcProvider('http://localhost:8545'),
        31337: new JsonRpcProvider('http://localhost:8545'),
      },
    };
    const sortedConstructedInjectedSet = injectStateInConstructedSmartContractSet(
      constructSortedSmartContractSet(sortSmartContractSet(set)),
      // @ts-ignore
      state
    );
    expect(
      sortedConstructedInjectedSet?.collections[0]?.state?.transactions
    ).toEqual(state.transactions);
    expect(sortedConstructedInjectedSet?.collections[0]?.state?.logs).toEqual(
      state.logs
    );
  });
});
