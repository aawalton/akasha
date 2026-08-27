"use client"

import { createContext, useContext } from "react"

export const CompletionActivityModeContext = createContext(false)

export function useCompletionActivityMode(): boolean {
  return useContext(CompletionActivityModeContext)
}
