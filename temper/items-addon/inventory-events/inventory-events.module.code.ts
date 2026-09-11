import { registerAutoMaintenanceEvents } from "akasha/temper/items-addon/inventory-auto-maintenance/inventory-auto-maintenance.module.code.ts"
import {
  hideBankActionPanel,
  refreshBankActionPanel,
} from "akasha/temper/items-addon/inventory-bank-action-panel/inventory-bank-action-panel.module.code.ts"
import {
  beginBankProfile,
  scheduleBankProfileFinalize,
} from "akasha/temper/items-addon/inventory-bank-profile/inventory-bank-profile.module.code.ts"
import {
  beginBankTrace,
  finishBankOpenHandler,
  markBankClosed,
  recordBankPhaseMs,
  recordSettlingMs,
} from "akasha/temper/items-addon/inventory-bank-trace/inventory-bank-trace.module.code.ts"
import { getInventoryConfig } from "akasha/temper/items-addon/inventory-config/inventory-config.module.code.ts"
import { ADDON_NAME } from "akasha/temper/items-addon/inventory-constants/inventory-constants.module.code.ts"
import {
  scanAccountCurrencies,
  scanBankedCurrencies,
  scanCharacterCurrencies,
  updateCurrency,
} from "akasha/temper/items-addon/inventory-currency/inventory-currency.module.code.ts"
import {
  addPlacedFurnishing,
  removePlacedFurnishing,
  scanPlacedFurnishings,
} from "akasha/temper/items-addon/inventory-furnishing-scanner/inventory-furnishing-scanner.module.code.ts"
import {
  recomputeNetWorthAndUpdateHud,
  reseedNetWorthBaseline,
  resetSession,
} from "akasha/temper/items-addon/inventory-hud-fields/inventory-hud-fields.module.code.ts"
import {
  flushJunkGate,
  openJunkGate,
} from "akasha/temper/items-addon/inventory-junk-queue/inventory-junk-queue.module.code.ts"
import {
  recordFullScan,
  scanBankBags,
  scanCompanionWorn,
  scanCraftBag,
  scanCurrentGuildBank,
  scanHouseBanks,
  scanPersonalBags,
  updateSlot,
} from "akasha/temper/items-addon/inventory-ops/inventory-ops.module.code.ts"
import { annotateContainerIfPending } from "akasha/temper/items-addon/inventory-quest-annotations/inventory-quest-annotations.module.code.ts"
import {
  clearPendingAction,
  getPendingAction,
  isPendingActionStale,
} from "akasha/temper/items-addon/inventory-rules-core/inventory-rules-core.module.code.ts"
import { captureCraftingLevels } from "akasha/temper/items-addon/inventory-rules-core-inspire/inventory-rules-core-inspire.module.code.ts"
import {
  isDispatchingBank,
  onOpenBank,
} from "akasha/temper/items-addon/inventory-rules-dispatch-bank/inventory-rules-dispatch-bank.module.code.ts"
import { dispatchEquipActions } from "akasha/temper/items-addon/inventory-rules-dispatch-equip/inventory-rules-dispatch-equip.module.code.ts"
import { onOpenGuildBank } from "akasha/temper/items-addon/inventory-rules-dispatch-guild-crafting/inventory-rules-dispatch-guild-crafting.module.code.ts"
import { dispatchGuildBankCurrency } from "akasha/temper/items-addon/inventory-rules-dispatch-guild-currency/inventory-rules-dispatch-guild-currency.module.code.ts"
import { isOpenQueueActive } from "akasha/temper/items-addon/inventory-rules-dispatch-open-queue/inventory-rules-dispatch-open-queue.module.code.ts"
import { dispatchUnlockActions } from "akasha/temper/items-addon/inventory-rules-dispatch-unlock/inventory-rules-dispatch-unlock.module.code.ts"
import {
  dispatchSafeOpenActions,
  dispatchUseActions,
} from "akasha/temper/items-addon/inventory-rules-dispatch-use/inventory-rules-dispatch-use.module.code.ts"
import {
  evaluateRules,
  fireInventoryActionsChanged,
  rescanInventory,
  rescanWornItems,
} from "akasha/temper/items-addon/inventory-rules-eval/inventory-rules-eval.module.code.ts"
import { registerAutoListResultEvents } from "akasha/temper/items-addon/inventory-rules-list/inventory-rules-list.module.code.ts"
import { registerVenueDispatchEvents } from "akasha/temper/items-addon/inventory-rules-venue-events/inventory-rules-venue-events.module.code.ts"
import { invalidateScribingKnowledgeCache } from "akasha/temper/items-addon/inventory-scribing-knowledge/inventory-scribing-knowledge.module.code.ts"
import { migrateLocksToTemperLocks } from "akasha/temper/items-addon/inventory-temper-lock-migrate/inventory-temper-lock-migrate.module.code.ts"

const NET_WORTH_DEBOUNCE_MS = 500
let netWorthRecomputePending = false

function scheduleNetWorthRecompute(): undefined {
  if (netWorthRecomputePending) return
  netWorthRecomputePending = true
  zo_callLater(function (this: void): undefined {
    netWorthRecomputePending = false
    recomputeNetWorthAndUpdateHud()
  }, NET_WORTH_DEBOUNCE_MS)
}

export function registerInventoryEvents(): undefined {
  const ns = ADDON_NAME

  EVENT_MANAGER.RegisterForEvent(
    `${ns}_PlayerActivated`,
    EVENT_PLAYER_ACTIVATED,
    function (this: void, _eventCode: number, initial: boolean): undefined {
      if (initial) {
        zo_callLater(() => resetSession(), 2500)
      } else {
        zo_callLater(() => reseedNetWorthBaseline(), 2500)
      }
      invalidateScribingKnowledgeCache()
      scanPersonalBags()
      scanCraftBag()
      scanCharacterCurrencies()
      scanAccountCurrencies()
      captureCraftingLevels()
      if (HasActiveCompanion()) {
        scanCompanionWorn()
      }
      if (GetCurrentZoneHouseId() > 0 && IsOwnerOfCurrentHouse()) {
        scanPlacedFurnishings()
      }
      recordFullScan()
      if (getInventoryConfig().backpack?.autoStack !== false) {
        zo_callLater(() => StackBag(BAG_BACKPACK), 500)
      }
      zo_callLater(() => migrateLocksToTemperLocks(), 1500)
      zo_callLater(() => rescanInventory(), 2000)
    }
  )

  EVENT_MANAGER.RegisterForEvent(
    `${ns}_SlotUpdate`,
    EVENT_INVENTORY_SINGLE_SLOT_UPDATE,
    function (
      this: void,
      _eventCode: number,
      bagId: number,
      slotIndex: number,
      _isNewItem: boolean,
      _itemSoundCategory: number,
      inventoryUpdateReason: number
    ): undefined {
      if (inventoryUpdateReason !== INVENTORY_UPDATE_REASON_DEFAULT) return
      const slotStart = GetGameTimeMilliseconds()
      updateSlot(bagId, slotIndex)
      recordSettlingMs("slotUpdate", GetGameTimeMilliseconds() - slotStart)
      scheduleNetWorthRecompute()
    }
  )

  EVENT_MANAGER.RegisterForEvent(
    `${ns}_FullUpdate`,
    EVENT_INVENTORY_FULL_UPDATE,
    function (this: void): undefined {
      const fullStart = GetGameTimeMilliseconds()
      scanPersonalBags()
      recordSettlingMs("fullUpdate", GetGameTimeMilliseconds() - fullStart)
      const craftStart = GetGameTimeMilliseconds()
      scanCraftBag()
      recordSettlingMs("scanCraftBag", GetGameTimeMilliseconds() - craftStart)
      scheduleNetWorthRecompute()
    }
  )

  EVENT_MANAGER.RegisterForEvent(
    `${ns}_OpenBank`,
    EVENT_OPEN_BANK,
    function (this: void): undefined {
      beginBankTrace(GetBankingBag())
      beginBankProfile(GetBankingBag())
      const scanStart = GetGameTimeMilliseconds()
      scanBankBags()
      recordBankPhaseMs("scanBankBags", GetGameTimeMilliseconds() - scanStart)
      scanBankedCurrencies()
      if (GetCurrentZoneHouseId() > 0 && IsOwnerOfCurrentHouse()) {
        scanHouseBanks()
      }
      openJunkGate()
      const panelStart = GetGameTimeMilliseconds()
      refreshBankActionPanel(GetBankingBag())
      recordBankPhaseMs("refreshPanel", GetGameTimeMilliseconds() - panelStart)
      onOpenBank()
      finishBankOpenHandler()
    }
  )

  EVENT_MANAGER.RegisterForEvent(
    `${ns}_CloseBank`,
    EVENT_CLOSE_BANK,
    function (this: void): undefined {
      markBankClosed()
      scheduleBankProfileFinalize()
      flushJunkGate()
      hideBankActionPanel()
      dispatchUseActions()
    }
  )

  EVENT_MANAGER.RegisterForEvent(
    `${ns}_GuildBank`,
    EVENT_GUILD_BANK_ITEMS_READY,
    function (this: void): undefined {
      scanCurrentGuildBank()
      openJunkGate()
      onOpenGuildBank()
      dispatchGuildBankCurrency()
    }
  )

  EVENT_MANAGER.RegisterForEvent(
    `${ns}_CloseGuildBank`,
    EVENT_CLOSE_GUILD_BANK,
    function (this: void): undefined {
      flushJunkGate()
    }
  )

  EVENT_MANAGER.RegisterForEvent(
    `${ns}_CompanionActivated`,
    EVENT_COMPANION_ACTIVATED,
    function (this: void): undefined {
      scanCompanionWorn()
    }
  )

  EVENT_MANAGER.RegisterForEvent(
    `${ns}_CompanionMenu`,
    EVENT_OPEN_COMPANION_MENU,
    function (this: void): undefined {
      rescanInventory()
      dispatchEquipActions()
    }
  )

  EVENT_MANAGER.RegisterForEvent(
    `${ns}_CurrencyUpdate`,
    EVENT_CURRENCY_UPDATE,
    function (
      this: void,
      _eventCode: number,
      currencyType: number,
      currencyLocation: number,
      newAmount: number
    ): undefined {
      updateCurrency(currencyType, currencyLocation, newAmount)
      scheduleNetWorthRecompute()
    }
  )

  EVENT_MANAGER.RegisterForEvent(
    `${ns}_FurniturePlaced`,
    EVENT_HOUSING_FURNITURE_PLACED,
    function (this: void, _eventCode: number, furnitureId: Id64): undefined {
      addPlacedFurnishing(furnitureId)
    }
  )

  EVENT_MANAGER.RegisterForEvent(
    `${ns}_FurnitureRemoved`,
    EVENT_HOUSING_FURNITURE_REMOVED,
    function (this: void, _eventCode: number, furnitureId: Id64): undefined {
      removePlacedFurnishing(furnitureId)
    }
  )

  EVENT_MANAGER.RegisterForEvent(
    `${ns}_PlayerDeactivated`,
    EVENT_PLAYER_DEACTIVATED,
    function (this: void): undefined {
      flushJunkGate()
      scanPersonalBags()
      scanCraftBag()
      scanCharacterCurrencies()
      scanAccountCurrencies()
    }
  )

  EVENT_MANAGER.RegisterForEvent(
    `${ns}_RulesSlotUpdate`,
    EVENT_INVENTORY_SINGLE_SLOT_UPDATE,
    function (
      this: void,
      _eventCode: number,
      bagId: number,
      slotIndex: number,
      _isNewItem: boolean,
      _itemSoundCategory: number,
      inventoryUpdateReason: number
    ): undefined {
      if (inventoryUpdateReason !== INVENTORY_UPDATE_REASON_DEFAULT) return
      if (bagId !== BAG_BACKPACK) return
      zo_callLater(function (this: void): undefined {
        if (isDispatchingBank()) return
        if (getPendingAction(bagId, slotIndex) !== undefined) {
          if (isPendingActionStale(bagId, slotIndex)) {
            clearPendingAction(bagId, slotIndex)
          } else {
            return
          }
        }
        annotateContainerIfPending(bagId, slotIndex)
        evaluateRules(bagId, slotIndex)
        fireInventoryActionsChanged()
        const action = getPendingAction(bagId, slotIndex)
        if ((action === "use" || action === "open") && !isOpenQueueActive()) {
          dispatchUseActions()
        }
      }, 0)
    }
  )

  EVENT_MANAGER.RegisterForEvent(
    `${ns}_StealthChanged`,
    EVENT_STEALTH_STATE_CHANGED,
    function (this: void, _eventCode: number, unitTag: string, stealthState: number): undefined {
      if (unitTag !== "player") return
      if (stealthState !== STEALTH_STATE_HIDDEN) return
      dispatchSafeOpenActions()
    }
  )

  INVENTORY_FRAGMENT.RegisterCallback(
    "StateChange",
    function (this: void, _oldState: number, newState: number): undefined {
      if (newState !== SCENE_SHOWING) return
      rescanWornItems()
      dispatchUnlockActions()
      dispatchSafeOpenActions()
    }
  )

  registerVenueDispatchEvents(ns)

  registerAutoListResultEvents(ns)

  registerAutoMaintenanceEvents(ns)
}
