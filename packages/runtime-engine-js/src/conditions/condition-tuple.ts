// import objectPath from 'object-path'

export function conditionTuple(
  condition: string,
  value: any,
  input: any,
  selector: string,
) {
  const inputSelector = accessObject(input, selector)
  switch (condition) {
    case 'eq':
      return inputSelector === value
    case 'neq':
      return input !== value
    default:
      return false
  }
}

function accessObject(obj: any, str: any) {
  const path = str.split(/[.[\]]+/).filter(Boolean)
  let value = obj

  for (let i = 0; i < path.length; i++) {
    const key = path[i]

    if (typeof value === 'object' && value !== null) {
      if (Array.isArray(value) && /^\d+$/.test(key)) {
        // Access array element
        value = value[Number(key)]
      } else if (key in value) {
        // Access object property
        value = value[key]
      } else {
        value = undefined
        break
      }
    } else {
      value = undefined
      break
    }
  }

  return value
}
