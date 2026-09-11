import {
  DEFAULTS,
  fillGuildDefaults,
  type NoThankYouSettings,
} from "akasha/temper/interface-addon/quiet-defaults/quiet-defaults.module.code.ts"
import { SAVED_VARIABLES_NAME } from "akasha/temper/interface-addon/quiet-identity/quiet-identity.module.code.ts"

let savedVarsInstance: NoThankYouSettings | undefined

export function initializeSavedVariables(this: void): NoThankYouSettings {
  fillGuildDefaults()
  savedVarsInstance = ZO_SavedVars.NewAccountWide<NoThankYouSettings>(
    SAVED_VARIABLES_NAME,
    2,
    undefined,
    DEFAULTS
  )
  return savedVarsInstance
}

export function getSavedVariables(this: void): NoThankYouSettings {
  if (savedVarsInstance === undefined) {
    throw new Error("TemperNoThankYou saved variables not initialized")
  }
  return savedVarsInstance
}
