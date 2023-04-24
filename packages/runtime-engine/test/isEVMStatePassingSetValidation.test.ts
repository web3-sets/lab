import { JsonRpcProvider } from '@ethersproject/providers';
import isEVMStatePassingSetValidation from '../src/isEVMStatePassingSetValidation';
import injectStateInConstructedSmartContractSet from '../src/mutations/injectStateInConstructedSmartContractSet';

import logs from '../data/state/erc20.logs.json';
import transactions from '../data/state/erc20.transactions.json';
import set from '../data/sets/set.smartcontract.ERC20.json';
import setMinimal from '../data/sets/set.smartcontract.ERC20Minimal.json';
import setStateTest from '../data/sets/set.smartcontract.ERC20TransactionAndRead.json';

describe('isEVMStatePassingSetValidation', () => {
  const state = {
    logs,
    transactions,
    providers: {
      1: new JsonRpcProvider('http://localhost:8545'),
      31337: new JsonRpcProvider('http://localhost:8545'),
    },
  };

  it('should export injectStateInConstructedSmartContractSet from src', () => {
    expect(injectStateInConstructedSmartContractSet).toBeDefined();
  })

  it('should successfully validate', async () => {
    const sortedConstructedInjectedSet = await isEVMStatePassingSetValidation(
      // @ts-ignore
      state,
      setMinimal
    );
    expect(sortedConstructedInjectedSet).toEqual(true);
  });

  it('should successfully validate', async () => {
    const sortedConstructedInjectedSet = await isEVMStatePassingSetValidation(
      // @ts-ignore
      state,
      setStateTest
    );
    
    expect(sortedConstructedInjectedSet).toEqual(true);
  });

  it('should fail to validate', async () => {
    const sortedConstructedInjectedSet = await isEVMStatePassingSetValidation(
      // @ts-ignore
      state,
      set
    );
    expect(sortedConstructedInjectedSet).toEqual(false);
  });
});
