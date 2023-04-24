import { Interface } from '@ethersproject/abi';
import sortSmartContractSet from '../../src/utils/sortSmartContractSet';
import constructSortedSmartContractSet from '../../src/mutations/constructSortedSmartContractSet';
import set from '../../data/sets/set.smartcontract.ERC20.json';

describe('constructSortedSmartContractSet', () => {
  it('should export constructSortedSmartContractSet from src', () => {
    expect(constructSortedSmartContractSet).toBeDefined();
  });

  it('should successfully construct a sorted smart contract set', async () => {
    const sorted = constructSortedSmartContractSet(
      // @ts-ignore
      sortSmartContractSet(set)
    );
    const isExpected = new Interface(set.entities[0].abi);
    expect(sorted.status).toBe('constructed');
    expect(sorted.collections[0].interface).toEqual(isExpected);
  });
});
