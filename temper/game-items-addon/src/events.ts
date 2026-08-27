import { registerAutoMaintenanceEvents } from "./auto-maintenance"
import { hideBankActionPanel, refreshBankActionPanel } from "./bank-action-panel"
import { beginBankProfile, scheduleBankProfileFinalize } from "./bank-profile"
import {
  beginBankTrace,
  finishBankOpenHandler,
  markBankClosed,
  recordBankPhaseMs,
  recordSettlingMs,
} from "./bank-trace"
import { ADDON_NAME } from "./constants"
import {
  scanAccountCurrencies,
  scanBankedCurrencies,
  scanCharacterCurrencies,
  updateCurrency,
} from "./currency"
import {
  addPlacedFurnishing,
  removePlacedFurnishing,
  scanPlacedFurnishings,
} from "./furnishing-scanner"
import { recomputeNetWorthAndUpdateHud, reseedNetWorthBaseline, resetSession } from "./hud-fields"
import { getInventoryConfig } from "./inventory-config"
import {
  recordFullScan,
  scanBankBags,
  scanCompanionWorn,
  scanCraftBag,
  scanCurrentGuildBank,
  scanHouseBanks,
  scanPersonalBags,
  updateSlot,
} from "./inventory-ops"
import { flushJunkGate, openJunkGate } from "./junk-queue"
import { annotateContainerIfPending } from "./quest-annotations"
import { clearPendingAction, getPendingAction, isPendingActionStale } from "./rules-core"
import { captureCraftingLevels } from "./rules-core-inspire"
import { isDispatchingBank, onOpenBank } from "./rules-dispatch-bank"
import { dispatchEquipActions } from "./rules-dispatch-equip"
import { onOpenGuildBank } from "./rules-dispatch-guild-crafting"
import { dispatchGuildBankCurrency } from "./rules-dispatch-guild-currency"
import { isOpenQueueActive } from "./rules-dispatch-open-queue"
import { dispatchUnlockActions } from "./rules-dispatch-unlock"
import { dispatchSafeOpenActions, dispatchUseActions } from "./rules-dispatch-use"
import {
  evaluateRules,
  fireInventoryActionsChanged,
  rescanInventory,
  rescanWornItems,
} from "./rules-eval"
import { registerAutoListResultEvents } from "./rules-list"
import { registerVenueDispatchEvents } from "./rules-venue-events"
import { invalidateScribingKnowledgeCache } from "./scribing-knowledge"
import { migrateLocksToTemperLocks } from "./temper-lock-migrate"

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
