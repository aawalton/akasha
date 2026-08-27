import { ToggleInventoryBrowser } from "./browser"
import { getInventoryActionSummary } from "./plan"
import { ToggleHoveredItemLock, ToggleHoveredItemSell } from "./rules-keybind"
import { getSavedVariables, isSavedVariablesReady } from "./saved-variables"

function getBackpackFreeSlots(): number {
  return GetNumBagFreeSlots(BAG_BACKPACK)
}

declare global {
  var TemperInventory: {
    ToggleHoveredItemSell: typeof ToggleHoveredItemSell
    ToggleHoveredItemLock: typeof ToggleHoveredItemLock
    ToggleInventoryBrowser: typeof ToggleInventoryBrowser
    getInventoryActionSummary: typeof getInventoryActionSummary
    getBackpackFreeSlots: typeof getBackpackFreeSlots
    getSavedVariables: typeof getSavedVariables
    isSavedVariablesReady: typeof isSavedVariablesReady
  }
}

globalThis.TemperInventory = {
  ToggleHoveredItemSell,
  ToggleHoveredItemLock,
  ToggleInventoryBrowser,
  getInventoryActionSummary,
  getBackpackFreeSlots,
  getSavedVariables,
  isSavedVariablesReady,
}
