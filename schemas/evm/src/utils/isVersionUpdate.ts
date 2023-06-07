import versionComparator from './versionComparator';
import { Version } from '../types';

/**
 * Returns true if versionB is an update over versionA
 */
function isVersionUpdate(base: Version, update: Version): boolean {
  return versionComparator(base, update) < 0;
}

export default isVersionUpdate;
