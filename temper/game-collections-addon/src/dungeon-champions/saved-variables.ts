import { SAVED_VARIABLES_NAME } from "./constants"
import { type DcsDefaults, DEFAULTS } from "./defaults"

export type DcsSavedVariables = DcsDefaults & { namesToIDSavedVars?: boolean }

let svInstance: DcsSavedVariables | undefined

interface SavedVariablesRoot {
  Default?: Record<string, Record<string, DcsSavedVariables | undefined> | undefined>
}

declare global {
  var TemperDungeonChampions_SavedVariables: SavedVariablesRoot | undefined
}

function namesToIDSavedVars(): undefined {
  if (svInstance === undefined) return undefined
  if (svInstance.namesToIDSavedVars === true) return undefined

  const displayName = GetDisplayName()
  const name = zo_strformat(SI_UNIT_NAME, GetUnitName("player"))
  const root = globalThis.TemperDungeonChampions_SavedVariables
  const named = root?.Default?.[displayName]?.[name]
  if (named !== undefined) {
    svInstance = named
    svInstance.namesToIDSavedVars = true
  }
  return undefined
}

export function initializeSavedVariables(): DcsSavedVariables {
  svInstance = ZO_SavedVars.New(SAVED_VARIABLES_NAME, 6, undefined, DEFAULTS)
  namesToIDSavedVars()
  return getSavedVariables()
}

export function getSavedVariables(): DcsSavedVariables {
  if (svInstance === undefined) {
    throw new Error("Saved variables not initialized. Call initializeSavedVariables() first.")
  }
  return svInstance
}
