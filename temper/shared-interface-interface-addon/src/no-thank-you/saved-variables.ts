import { SAVED_VARIABLES_NAME } from "./constants"
import { defaults, fillGuildDefaults, type NoThankYouSettings } from "./defaults"

let savedVarsInstance: NoThankYouSettings | undefined

export function initializeSavedVariables(this: void): NoThankYouSettings {
  fillGuildDefaults()
  savedVarsInstance = ZO_SavedVars.NewAccountWide<NoThankYouSettings>(
    SAVED_VARIABLES_NAME,
    2,
    undefined,
    defaults
  )
  return savedVarsInstance
}

export function getSavedVariables(this: void): NoThankYouSettings {
  if (savedVarsInstance === undefined) {
    throw new Error("TemperNoThankYou saved variables not initialized")
  }
  return savedVarsInstance
}
