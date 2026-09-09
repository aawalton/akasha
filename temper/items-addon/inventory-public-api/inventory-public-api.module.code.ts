import "@akasha/temper-addon-library-types/temper-inventory-global"

import { toggleInventoryBrowser } from "../inventory-browser/inventory-browser.module.code.ts"
import { getInventoryActionSummary } from "../inventory-plan/inventory-plan.module.code.ts"
import {
  toggleHoveredItemLock,
  toggleHoveredItemSell,
} from "../inventory-rules-keybind/inventory-rules-keybind.module.code.ts"
import {
  getSavedVariables,
  isSavedVariablesReady,
} from "../inventory-saved-variables-ref/inventory-saved-variables-ref.module.code.ts"

function getBackpackFreeSlots(): number {
  return GetNumBagFreeSlots(BAG_BACKPACK)
}

globalThis.TemperInventory = {
  ToggleHoveredItemSell: toggleHoveredItemSell,
  ToggleHoveredItemLock: toggleHoveredItemLock,
  ToggleInventoryBrowser: toggleInventoryBrowser,
  getInventoryActionSummary,
  getBackpackFreeSlots,
  getSavedVariables,
  isSavedVariablesReady,
}
