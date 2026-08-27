import "./public-api"

import { initializeMultiAccount } from "./core/multi-account"
import { getVars, setVars } from "./core/state"
import { registerUiStrings } from "./locale/ui-strings"
import { initializeSavedVariables, migrateSettings } from "./saved-variables"
import { hookExternalTooltips } from "./tooltip/hooks"
import { initializeBrowser } from "./ui/browser"
import { registerSettingsPanel } from "./ui/settings-panel"

LibExtendedJournal.Used = true

registerUiStrings()

LibCodesCommonCode.RunAfterInitialLoadscreen(hookExternalTooltips)

export function initItemBrowser(this: void): undefined {
  setVars(initializeSavedVariables())
  migrateSettings(getVars())
  initializeMultiAccount()
  registerSettingsPanel()
  initializeBrowser()
  return undefined
}
