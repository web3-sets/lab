import { SmartContractSet } from '../src';
import SetComplete from './schemas/set.smartcontract.complete.json';

describe('types', () => {
  it('matches example schema', () => {
    const set: SmartContractSet = SetComplete;
    expect(set.name).toEqual('Complete Smart Contract Set');
  });
});
