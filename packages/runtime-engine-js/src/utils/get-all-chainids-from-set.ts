export function getAllChainIdsFromSet(set: any) {
  return set.entities.flatMap((entity: any) => entity.chainId)
}
