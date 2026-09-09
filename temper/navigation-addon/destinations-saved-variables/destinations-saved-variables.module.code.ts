import { DEFAULTS } from "../destinations-defaults/destinations-defaults.module.code.ts"
import { SAVED_VARIABLES_NAME } from "../destinations-names/destinations-names.module.code.ts"

export type DestinationsSavedVariables = typeof DEFAULTS & {
  oneTamrielUpdate?: boolean
  migratedFromDestinations?: boolean
}

let svInstance: DestinationsSavedVariables | undefined
let cssvInstance: DestinationsSavedVariables | undefined
let awsvInstance: DestinationsSavedVariables | undefined

let savedVarsInitialized = false

export function initializeSavedVariables(): DestinationsSavedVariables {
  svInstance = ZO_SavedVars.NewCharacterNameSettings(SAVED_VARIABLES_NAME, 1, undefined, DEFAULTS)
  cssvInstance = ZO_SavedVars.NewCharacterNameSettings(SAVED_VARIABLES_NAME, 1, undefined, DEFAULTS)
  awsvInstance = ZO_SavedVars.NewAccountWide(SAVED_VARIABLES_NAME, 1, undefined, DEFAULTS)

  if (awsvInstance.settings.useAccountWide) {
    svInstance = ZO_SavedVars.NewAccountWide(SAVED_VARIABLES_NAME, 1, undefined, DEFAULTS)
  }

  svInstance.settings.useAccountWide = awsvInstance.settings.useAccountWide
  cssvInstance.settings.useAccountWide = awsvInstance.settings.useAccountWide

  if (
    !svInstance.oneTamrielUpdate &&
    !cssvInstance.oneTamrielUpdate &&
    !awsvInstance.oneTamrielUpdate
  ) {
    svInstance.pins.pinTextureUnknown = DEFAULTS.pins.pinTextureUnknown
    cssvInstance.pins.pinTextureUnknown = DEFAULTS.pins.pinTextureUnknown
    awsvInstance.pins.pinTextureUnknown = DEFAULTS.pins.pinTextureUnknown
    svInstance.oneTamrielUpdate = true
    cssvInstance.oneTamrielUpdate = true
    awsvInstance.oneTamrielUpdate = true
  }

  return svInstance
}

export function getSavedVariables(): DestinationsSavedVariables {
  if (!svInstance) {
    throw new Error("Saved variables not initialized. Call initializeSavedVariables() first.")
  }
  return svInstance
}

export function getCharacterSavedVariables(): DestinationsSavedVariables {
  if (!cssvInstance) {
    throw new Error("Saved variables not initialized. Call initializeSavedVariables() first.")
  }
  return cssvInstance
}

export function getAccountWideSavedVariables(): DestinationsSavedVariables {
  if (!awsvInstance) {
    throw new Error("Saved variables not initialized. Call initializeSavedVariables() first.")
  }
  return awsvInstance
}

export function getRawSavedVariablesRoot(): Record<string, unknown> {
  const globalTable: Record<string, unknown> = globalThis
  const existing = globalTable[SAVED_VARIABLES_NAME]
  if (isLuaTable(existing)) {
    return existing
  }
  const root: Record<string, unknown> = {}
  globalTable[SAVED_VARIABLES_NAME] = root
  return root
}

function isLuaTable(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null
}

export function isSavedVarsInitialized(): boolean {
  return savedVarsInitialized
}

export function markSavedVarsInitialized(): undefined {
  savedVarsInitialized = true
}
