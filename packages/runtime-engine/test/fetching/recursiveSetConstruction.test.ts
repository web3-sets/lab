import { recursiveSetResourceFetching } from '../../src';
import set from '../../data/sets/set.smartcontract.ERC20.json';

describe('recursiveSetResourceFetching', () => {
  it('should export recursiveSetResourceFetching from src', () => {
    expect(recursiveSetResourceFetching).toBeDefined();
  });

  it('should successfully construct a smart contract set', async () => {
    const results = await recursiveSetResourceFetching([set]);
    expect(results[0].entities[0].abi.length).toBeGreaterThan(0);
  });
});
