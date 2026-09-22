import "akasha/temper/web/item-browser/modules/item-browser-global/item-browser-global.module.code.ts"

import { Public } from "akasha/temper/addon/pages/world/collections/modules/journal-state/journal-state.module.code.ts"
import { initializeMultiAccount } from "akasha/temper/web/item-browser/modules/item-browser-multi-account/item-browser-multi-account.module.code.ts"
import {
  initializeSavedVariables,
  migrateSettings,
} from "akasha/temper/web/item-browser/modules/item-browser-saved-vars/item-browser-saved-vars.module.code.ts"
import { registerSettingsPanel } from "akasha/temper/web/item-browser/modules/item-browser-settings/item-browser-settings.module.code.ts"
import {
  getVars,
  setVars,
} from "akasha/temper/web/item-browser/modules/item-browser-state/item-browser-state.module.code.ts"
import { initializeBrowser } from "akasha/temper/web/item-browser/modules/item-browser-tab/item-browser-tab.module.code.ts"
import { hookExternalTooltips } from "akasha/temper/web/item-browser/modules/item-browser-tooltip-hooks/item-browser-tooltip-hooks.module.code.ts"
import { registerUiStrings } from "akasha/temper/web/item-browser/modules/item-browser-ui-strings/item-browser-ui-strings.module.code.ts"
import "akasha/temper/addon/type/temper-helpers-global/temper-helpers-global.type-declaration.d.ts"

Public.Used = true

registerUiStrings()

TemperHelpers.RunAfterInitialLoadscreen(hookExternalTooltips)

export function initItemBrowser(this: void): undefined {
  setVars(initializeSavedVariables())
  migrateSettings(getVars())
  initializeMultiAccount()
  registerSettingsPanel()
  initializeBrowser()
  return undefined
}
