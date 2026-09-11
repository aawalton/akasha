import "akasha/temper/addon-library-types/temper-inventory-global/temper-inventory-global.type-declaration.d.ts"

import { toggleInventoryBrowser } from "akasha/temper/items-addon/inventory-browser/inventory-browser.module.code.ts"
import { getInventoryActionSummary } from "akasha/temper/items-addon/inventory-plan/inventory-plan.module.code.ts"
import {
  toggleHoveredItemLock,
  toggleHoveredItemSell,
} from "akasha/temper/items-addon/inventory-rules-keybind/inventory-rules-keybind.module.code.ts"
import {
  getSavedVariables,
  isSavedVariablesReady,
} from "akasha/temper/items-addon/inventory-saved-variables-ref/inventory-saved-variables-ref.module.code.ts"

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
