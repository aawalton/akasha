import "@akasha/temper-eso-types/eso-api"

import {
  HUD_SAVED_VARIABLES_DEFAULTS,
  type HudSavedVariables,
} from "../hud-addon-types/hud-addon-types.module.code.ts"
import {
  coerceStoredBoolean,
  migrateHiddenToVisible,
  needsFrameMigration,
  VISIBILITY_VERSION_CURRENT,
} from "../hud-addon-visibility-version/hud-addon-visibility-version.module.code.ts"

const SAVED_VARIABLES_NAME = "TemperHud_SavedVariables"

let savedVarsInstance: HudSavedVariables | undefined

export function initializeSavedVariables(): HudSavedVariables {
  const defaults: HudSavedVariables = { ...HUD_SAVED_VARIABLES_DEFAULTS }
  const instance = ZO_SavedVars.NewAccountWide(SAVED_VARIABLES_NAME, 1, undefined, defaults)
  savedVarsInstance = instance
  return instance
}

export function getSavedVariables(): HudSavedVariables {
  if (savedVarsInstance === undefined) {
    throw new Error("TemperHud SavedVariables accessed before initialization")
  }
  return savedVarsInstance
}

export function isSavedVariablesReady(): boolean {
  return savedVarsInstance !== undefined
}

export function readComponentVisible(this: void, id: string): boolean | undefined {
  return coerceStoredBoolean(getSavedVariables().componentVisibility[id])
}

export function writeComponentVisible(this: void, id: string, visible: boolean): undefined {
  getSavedVariables().componentVisibility[id] = visible
}

export function migrateComponentVisibility(this: void, knownIds: readonly string[]): undefined {
  const instance = getSavedVariables()
  if (!needsFrameMigration(instance.schemaVersion)) return
  const migrated = migrateHiddenToVisible(instance.componentVisibility, knownIds)
  for (const id of knownIds) {
    const visible = migrated[id]
    if (visible !== undefined) instance.componentVisibility[id] = visible
  }
  instance.schemaVersion = VISIBILITY_VERSION_CURRENT
}
