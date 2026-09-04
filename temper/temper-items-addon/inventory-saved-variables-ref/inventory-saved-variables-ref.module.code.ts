import type {
  InventoryDatabase,
  SavedVariablesData,
} from "../inventory-saved-variables-types/inventory-saved-variables-types.module.code.ts"
export let inventorySavedVariables: SavedVariablesData | undefined

export function setSavedVarsInstance(value: SavedVariablesData): undefined {
  inventorySavedVariables = value
}

export function isSavedVariablesReady(): boolean {
  return inventorySavedVariables !== undefined
}

export function getSavedVariables(): SavedVariablesData {
  if (!inventorySavedVariables) {
    throw new Error("Saved variables not initialized. Call initializeSavedVariables() first.")
  }
  return inventorySavedVariables
}

export function getDatabase(): InventoryDatabase {
  return getSavedVariables().db
}
