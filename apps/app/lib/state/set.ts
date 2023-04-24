// @ts-ignore
import { useEffect } from 'react'

import { atom, useAtom } from 'jotai'

interface Set {
  id: string
  name: string
  description: string
  analytics?: any
  schema?: any
}
// Initialize the atom with an empty array of todos
const todosAtom = atom<Set[]>([])

export const useSetLocalState = (id: string, schema?: any) => {
  const [sets, setSets] = useAtom(todosAtom)

  const getSet = (id: string) => {
    return sets.find((todo) => todo.id === id)
  }

  // Find the todo with the specified ID and update its properties
  const updateSet = (id: string, updates: Partial<Set>) => {
    setSets((prevSets) => prevSets.map((todo) => (todo.id === id ? { ...todo, ...updates } : todo)))
  }

  // Add a new todo to the array with a unique ID
  const addSet = (newSet: Set) => {
    setSets([...sets, { ...newSet }])
  }

  // Remove a todo from the array by ID
  const removeSet = (id: string) => {
    setSets(sets.filter((todo) => todo.id !== id))
  }

  useEffect(() => {
    if (id && schema) {
      addSet({
        id: id,
        name: schema.name as string,
        description: schema.description as string,
        schema,
      })
    }
  }, [])

  return {
    set: getSet(id),
    sets: sets,
    getSet,
    updateSet,
    addSet,
    removeSet,
  }
}
