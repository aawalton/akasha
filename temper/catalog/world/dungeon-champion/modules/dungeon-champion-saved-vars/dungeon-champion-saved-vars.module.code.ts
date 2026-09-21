import {
  type DcsDefaults,
  DEFAULTS,
} from "akasha/temper/catalog/world/dungeon-champion/modules/dungeon-champion-defaults/dungeon-champion-defaults.module.code.ts"
import { SAVED_VARIABLES_NAME } from "akasha/temper/catalog/world/dungeon-champion/modules/dungeon-champion-names/dungeon-champion-names.module.code.ts"
import "akasha/temper/eso/type/eso-api/eso-api.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-08/eso-functions-08.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-string-ids/eso-string-ids.type-declaration.d.ts"

export type DcsSavedVariables = DcsDefaults & { namesToIDSavedVars?: boolean }

let svInstance: DcsSavedVariables | undefined

export interface SavedVariablesRoot {
  Default?: Record<string, Record<string, DcsSavedVariables | undefined> | undefined>
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
