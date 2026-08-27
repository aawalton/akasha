import { initializeInventoryTweaks } from "./inventory-tweaks"
import { hookLists } from "./markers"
import { initSavedVariables } from "./saved-variables"
import { registerSettingsPanel } from "./settings"

export function initializeMasterWritInventoryMarker(this: void): undefined {
  initSavedVariables()
  hookLists()
  initializeInventoryTweaks()
  registerSettingsPanel()
  return undefined
}
