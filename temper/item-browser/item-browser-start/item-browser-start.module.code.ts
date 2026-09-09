import "../item-browser-global/item-browser-global.module.code.ts"

import { initializeMultiAccount } from "../item-browser-multi-account/item-browser-multi-account.module.code.ts"
import {
  initializeSavedVariables,
  migrateSettings,
} from "../item-browser-saved-vars/item-browser-saved-vars.module.code.ts"
import { registerSettingsPanel } from "../item-browser-settings/item-browser-settings.module.code.ts"
import { getVars, setVars } from "../item-browser-state/item-browser-state.module.code.ts"
import { initializeBrowser } from "../item-browser-tab/item-browser-tab.module.code.ts"
import { hookExternalTooltips } from "../item-browser-tooltip-hooks/item-browser-tooltip-hooks.module.code.ts"
import { registerUiStrings } from "../item-browser-ui-strings/item-browser-ui-strings.module.code.ts"

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
