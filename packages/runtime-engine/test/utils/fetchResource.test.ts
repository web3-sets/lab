import { fetchUriFromString } from '../../src/fetching/fetchUriFromString';

describe('fetchUriFromString', () => {
  it('should export from utils', () => {
    expect(fetchUriFromString).toBeDefined();
  });

  it('should fetch IPFS resource', async () => {
    // const resource = await fetchUriFromString(
    //   'ipfs://QmUHeDovuppZGU3yMccWpcCZ3GbcfiYGmCTMSUUn7XsqLY'
    // );
    // if (!resource) throw new Error('Resource not found');
    // expect(resource?.data).toEqual({ message: 'Pinatas are awesome' });
  });
});
