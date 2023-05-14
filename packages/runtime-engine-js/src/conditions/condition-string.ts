export function conditionString(
  condition: string,
  value: string,
  input: string,
) {
  switch (condition) {
    case 'eq':
      return value === input
    default:
      return false
  }
}
