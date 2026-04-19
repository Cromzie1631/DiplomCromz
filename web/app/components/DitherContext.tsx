'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface DitherContextType {
  mousePos: { x: number; y: number } | null
  setMousePos: (pos: { x: number; y: number } | null) => void
}

const DitherContext = createContext<DitherContextType | undefined>(undefined)

export function DitherProvider({ children }: { children: ReactNode }) {
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null)
  return (
    <DitherContext.Provider value={{ mousePos, setMousePos }}>
      {children}
    </DitherContext.Provider>
  )
}

export function useDitherContext() {
  const context = useContext(DitherContext)
  if (!context) {
    throw new Error('useDitherContext must be used within DitherProvider')
  }
  return context
}
