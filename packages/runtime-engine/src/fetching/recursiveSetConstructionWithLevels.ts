import { recursiveSetResourceFetching } from './recursiveSetResourceFetching';

export async function recursiveSetResourceFetchingWithLevels(
  setOrSets: any | Array<any>,
  levels: number
): Promise<any> {
  let newSetOrSets: any = setOrSets;
  for (let index = 0; index < levels; index++) {
    newSetOrSets = await recursiveSetResourceFetching(newSetOrSets);
  }
  return newSetOrSets;
}
export default recursiveSetResourceFetchingWithLevels;
