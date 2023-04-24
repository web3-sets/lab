import { JsonRpcProvider } from '@ethersproject/providers';
import sortSmartContractSet from '../../src/utils/sortSmartContractSet';
import constructSortedSmartContractSet from '../../src/mutations/constructSortedSmartContractSet';
import injectStateInConstructedSmartContractSet from '../../src/mutations/injectStateInConstructedSmartContractSet';
import parseStateInConstructedSmartContractSet from '../../src/mutations/parseStateInConstructedSmartContractSet';

import logs from '../../data/state/erc20.logs.json';
import transactions from '../../data/state/erc20.transactions.json';
import set from '../../data/sets/set.smartcontract.ERC20.json';

describe('parseStateInConstructedSmartContractSet', () => {
  it('should export injectStateInConstructedSmartContractSet from src', () => {
    expect(injectStateInConstructedSmartContractSet).toBeDefined();
  });

  it('should successfully construct a sorted smart contract set', async () => {
    const state = {
      logs,
      transactions,
      providers: { 1: new JsonRpcProvider('http://localhost:8545') },
    };
    const sortedConstructedInjectedParsedSet = parseStateInConstructedSmartContractSet(
      injectStateInConstructedSmartContractSet(
        // @ts-ignore
        constructSortedSmartContractSet(sortSmartContractSet(set)),
        // @ts-ignore
        state
      )
    );
    expect(sortedConstructedInjectedParsedSet.status).toBe('parsed');
    expect(
      sortedConstructedInjectedParsedSet?.collections[0]?.state?.parsed
        ?.transactions?.length
    ).toBeGreaterThan(0);
    expect(
      sortedConstructedInjectedParsedSet?.collections[0]?.state?.parsed?.logs
        .length
    ).toBeGreaterThan(0);
  });
});
