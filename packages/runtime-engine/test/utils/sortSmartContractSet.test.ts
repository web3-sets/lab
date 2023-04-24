import sortSmartContractSet from '../../src/utils/sortSmartContractSet';
import set from '../../data/sets/set.smartcontract.ERC20.json';
describe('sortSmartContractSet', () => {
  it('should export sortSmartContractSet from src', () => {
    expect(sortSmartContractSet).toBeDefined();
  });

  it('should successfully sort entity condition transactions', async () => {
    // @ts-ignore
    const sorted = sortSmartContractSet(set);
    expect(sorted.status).toBe('sorted');
    expect(sorted.rules).toBe(set.rules);
    expect(sorted.collections.length).toBe(set.entities.length);
    expect(sorted.collections[0].entity.id).toBe(set.entities[0].id);
    expect(sorted.collections[0].conditions).toEqual(set.conditions);
  });
});
