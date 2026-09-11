import { initializeInventoryTweaks } from "akasha/temper/crafting-addon/writ-mark-inventory-tweaks/writ-mark-inventory-tweaks.module.code.ts"
import { hookLists } from "akasha/temper/crafting-addon/writ-mark-markers/writ-mark-markers.module.code.ts"
import { initSavedVariables } from "akasha/temper/crafting-addon/writ-mark-saved-variables/writ-mark-saved-variables.module.code.ts"
import { registerSettingsPanel } from "akasha/temper/crafting-addon/writ-mark-settings/writ-mark-settings.module.code.ts"

export function initializeMasterWritInventoryMarker(this: void): undefined {
  initSavedVariables()
  hookLists()
  initializeInventoryTweaks()
  registerSettingsPanel()
  return undefined
}
