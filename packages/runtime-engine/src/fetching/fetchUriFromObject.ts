import { AxiosResponse } from 'axios';
import { URIObject } from '../types';
import { fetchUriFromString } from './fetchUriFromString';

export async function fetchUriFromObject(
  resource: URIObject
): Promise<AxiosResponse<any, any> | void> {
  switch (resource.schema) {
    case 'http':
    case 'https':
      return fetchUriFromString(`${resource.schema}://${resource.path}`);
    case 'ipfs':
      // @TODO: Add generic support for IPFS support without cloudflare-ipfs.com
      return fetchUriFromString(
        `https://cloudflare-ipfs.com/ipfs/${resource.path}`
      );
    default:
      throw new Error('Invalid URI object');
  }
}

export default fetchUriFromObject;
