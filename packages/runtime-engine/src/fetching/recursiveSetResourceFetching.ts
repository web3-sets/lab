import { fetchUriFromString } from './fetchUriFromString';
import { fetchUriFromObject } from './fetchUriFromObject';
const debug = require('debug')('recursiveSetResourceFetching');

export async function recursiveSetResourceFetching(
  setOrSets: any | Array<any>
): Promise<any> {
  /**
   * Fetch URI String Resouce
   * ipfs://QmfVfkhD5G23NChC2tTndtxv5MH5oYb9fF2BZcRsWyq7uK
   */
  if (typeof setOrSets === 'string') {
    debug('Fetching URI String Resource');
    return await fetchUriFromString(setOrSets);
  }

  /**
   * Fetch URI Object Resouce
   * protocol: 'ipfs' | 'http' | 'https''
   * path: 'QmfVfkhD5G23NChC2tTndtxv5MH5oYb9fF2BZcRsWyq7uK'
   */
  if (typeof setOrSets === 'object' && setOrSets.hasOwnProperty('schema')) {
    debug('Fetching URI Object Resource');
    return await fetchUriFromObject(setOrSets);
  }

  /**
   * Fetch Set Entities/Conditions/Rules
   */
  if (Array.isArray(setOrSets)) {
    debug('Fetching Set Entities List');
    return await Promise.all(
      setOrSets.map(async set => await recursiveSetResourceFetching(set))
    );
  }

  /**
   * Fetch Set Entities
   * @TODO Add Rule and Condition support.
   */
  if (typeof setOrSets === 'object' && setOrSets.hasOwnProperty('entities')) {
    debug('Fetching Set Entities');
    const entities = await recursiveSetResourceFetching(setOrSets.entities);
    const newSet = { ...setOrSets, entities };
    return newSet;
  }

  /* -------------------------------------------------- */
  // Smart Contract Specific Construction
  /* -------------------------------------------------- */

  /**
   * Fetch URI Resouce from Entity specific object keys mapped to a URI resource.
   * ipfs://QmfVfkhD5G23NChC2tTndtxv5MH5oYb9fF2BZcRsWyq7uK
   */
  if (typeof setOrSets === 'object' && setOrSets.hasOwnProperty('abi')) {
    debug('Fetching Smart Contract ABI');
    const resource = await recursiveSetResourceFetching(setOrSets.abi);
    const newSet = { ...setOrSets, abi: resource };
    return newSet;
  }

  return setOrSets;
}

export default recursiveSetResourceFetching;
