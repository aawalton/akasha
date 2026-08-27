import type { InventoryDatabase, SavedVariablesData } from "./types"

export let savedVarsInstance: SavedVariablesData | undefined

export function setSavedVarsInstance(value: SavedVariablesData): undefined {
  savedVarsInstance = value
}

export function isSavedVariablesReady(): boolean {
  return savedVarsInstance !== undefined
}

export function getSavedVariables(): SavedVariablesData {
  if (!savedVarsInstance) {
    throw new Error("Saved variables not initialized. Call initializeSavedVariables() first.")
  }
  return savedVarsInstance
}

export function getDatabase(): InventoryDatabase {
  return getSavedVariables().db
}
