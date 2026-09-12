"use client"

import { createContext, useContext } from "react"

export const CompletionSearchContext = createContext("")

export function useCompletionSearch(): string {
  return useContext(CompletionSearchContext)
}
