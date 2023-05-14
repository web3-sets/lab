import { SmartContractSet, SmartContractSetParser } from '../types/core'
import { hydrateReferenceObjects } from './hydrate-reference-objects'
import { hydrateSetBase } from './hydrate-set-base'
import { Client } from 'viem'

export async function hydrateSet(set: SmartContractSet, clients: Client[]) {
  const setParsed = SmartContractSetParser.parse(set)
  const hydrate1 = await hydrateReferenceObjects(setParsed)
  return hydrateSetBase(hydrate1, set.conditions, clients)
}
