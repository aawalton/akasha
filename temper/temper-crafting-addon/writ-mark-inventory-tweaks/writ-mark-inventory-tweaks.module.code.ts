import {
  getMasterWritSetName,
  getMasterWritVouchers,
} from "../writ-mark-analysis/writ-mark-analysis.module.code.ts"
import { INVENTORY_TYPES } from "../writ-mark-constants/writ-mark-constants.module.code.ts"
import { safeGetTabFilterInfo } from "../writ-mark-safe-tab-filter/writ-mark-safe-tab-filter.module.code.ts"
import { areInventoryTweaksEnabled } from "../writ-mark-saved-variables/writ-mark-saved-variables.module.code.ts"

let INITIALIZED_TWEAKS = false

function hookInventorySortFunction(
  this: void,
  inventory: PlayerInventoryDefinition | undefined
): undefined {
  if (
    inventory !== undefined &&
    inventory.temperReplacedSort !== true &&
    inventory.sortFn !== undefined
  ) {
    inventory.temperReplacedSort = true

    const origSortFn = inventory.sortFn
    inventory.sortFn = (a, b) => {
      if (areInventoryTweaksEnabled()) {
        const order = inventory.currentSortOrder
        if (inventory.currentSortKey === "traitInformationSortOrder") {
          const aName = getMasterWritSetName(a.data)
          const bName = getMasterWritSetName(b.data)

          if (aName !== undefined && bName === undefined) {
            return order === ZO_SORT_ORDER_UP
          }
          if (bName !== undefined && aName === undefined) {
            return order === ZO_SORT_ORDER_DOWN
          }
          if (aName !== undefined && bName !== undefined) {
            if (aName < bName) {
              return order === ZO_SORT_ORDER_UP
            }
            if (bName < aName) {
              return order === ZO_SORT_ORDER_DOWN
            }
          }
        } else if (inventory.currentSortKey === "stackSellPrice") {
          const aValue = getMasterWritVouchers(a.data) ?? 99999
          const bValue = getMasterWritVouchers(b.data) ?? 99999

          if (aValue < bValue) {
            return order === ZO_SORT_ORDER_UP
          }
          if (bValue < aValue) {
            return order === ZO_SORT_ORDER_DOWN
          }
        }
      }

      return origSortFn(a, b)
    }
  }
  return undefined
}

export function initializeInventoryTweaks(this: void): undefined {
  const fnGetTabFilterInfo = PLAYER_INVENTORY.GetTabFilterInfo
  if (fnGetTabFilterInfo === undefined || INITIALIZED_TWEAKS || !areInventoryTweaksEnabled()) {
    return undefined
  }

  INITIALIZED_TWEAKS = true

  PLAYER_INVENTORY.GetTabFilterInfo = (self, inventoryType, tabControl) => {
    const tweaksEnabled = areInventoryTweaksEnabled()
    if (tweaksEnabled && self.inventories !== undefined) {
      for (const [invType] of pairs(INVENTORY_TYPES)) {
        hookInventorySortFunction(self.inventories[invType])
      }
    }

    const applyTrait =
      tweaksEnabled && self.inventories !== undefined && INVENTORY_TYPES[inventoryType] === true
    return safeGetTabFilterInfo(() => {
      return fnGetTabFilterInfo(self, inventoryType, tabControl)
    }, applyTrait)
  }
  return undefined
}
