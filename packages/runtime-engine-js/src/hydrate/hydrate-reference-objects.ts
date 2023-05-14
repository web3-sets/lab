import { SmartContractSet } from '../types/core'
import { fetchAbiFromUri } from './fetch-abi-from-uri'

/**
 * @name hydrateReferenceObjects
 * @description Hydrate reference objects in a SmartContractSet
 * @param set
 * @returns SmartContractSet
 */
export async function hydrateReferenceObjects(
  set: SmartContractSet,
): Promise<SmartContractSet> {
  const newSet = { ...set }
  const length = newSet.entities.length
  for (let index = 0; index < length; index++) {
    const entity = newSet.entities[index]
    if (entity.abi.startsWith('ipfs://')) {
      const abi = await fetchAbiFromUri(entity.abi)
      if (abi) {
        newSet.entities[index].abi = abi
      }
    }
  }
  return newSet
}
