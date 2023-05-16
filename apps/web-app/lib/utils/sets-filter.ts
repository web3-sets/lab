export function setsFilter(sets: any[], setId: string) {
  return sets.filter((set) => set.id === setId)[0]
}
