import { useEffect, useState } from 'react'

import { setDatabase } from '@/data/set-database'

export function useSet(setId: string): {
  id: string
  name: string
  description: string
  model?: any
} {
  const [set, setSet] = useState<any>()
  useEffect(() => {
    setDatabase.filter((set) => set.id === setId).map((set) => setSet(set))
  }, [setId, setDatabase])

  return set
}
