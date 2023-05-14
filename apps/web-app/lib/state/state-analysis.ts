// @ts-ignore
import { useEffect } from 'react'

import { atom, useAtom } from 'jotai'

interface Analysis {
  id: string
  set: any
  analysis: any
}
// Initialize the atom with an empty array of analysis
const analysisAtom = atom<Analysis[]>([])

export const useAnalysis = (id: string, analysis?: any) => {
  const [sets, setAnalysis] = useAtom(analysisAtom)

  const getAnalysis = (id: string) => {
    return sets.find((analysis) => analysis.id === id)
  }

  // Find the analysis with the specified ID and update its properties
  const updateAnalysis = (id: string, updates: Partial<Analysis>) => {
    setAnalysis((prevAnalysis) => prevAnalysis.map((analysis) => (analysis.id === id ? { ...analysis, ...updates } : analysis)))
  }

  // Add a new analysis to the array with a unique ID
  const addAnalysis = (newAnalysis: Analysis) => {
    setAnalysis([...sets, { ...newAnalysis }])
  }

  // Remove a analysis from the array by ID
  const removeAnalysis = (id: string) => {
    setAnalysis(sets.filter((analysis) => analysis.id !== id))
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
    updateAnalysis,
    addAnalysis,
    removeAnalysis,
  }
}
