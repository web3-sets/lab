import { useEffect } from 'react'

import { atom, useAtom } from 'jotai'

interface Analysis {
  id: string
  set: any
  analysis: any
}
// Initialize the atom with an empty array of analysis
const analysisAtom = atom<Analysis[]>([])

/**
 * @name useAnalysis
 * @param id
 * @param analysis
 * @todo This could be a lot better. I'm lazy and just want to get it working.
 */
export const useAnalysis = (id: string, analysis?: any) => {
  const [sets, setAnalysis] = useAtom(analysisAtom)

  const getAnalysis = (id: string) => {
    return sets.find((analysis) => analysis.id === id)
  }

  // Add a new analysis to the array with a unique ID
  const addAnalysis = (newAnalysis: Analysis) => {
    setAnalysis([{ ...newAnalysis }])
  }

  useEffect(() => {
    if (id && analysis) {
      addAnalysis({
        id: id,
        ...analysis,
      })
    }
  }, [])

  return {
    analysis: getAnalysis(id),
    analysisAll: sets,
    getAnalysis,
    addAnalysis,
  }
}
