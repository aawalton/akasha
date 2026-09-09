import {
  DURABILITY_DEBOUNCE_MS,
  RECHARGE_DESCRIPTOR,
  REPAIR_DESCRIPTOR,
  resetMaintenanceSuppression,
  runMaintenancePass,
  shouldSuppressChargeEvent,
  shouldSuppressDurabilityEvent,
} from "../inventory-auto-maintenance-engine/inventory-auto-maintenance-engine.module.code.ts"

const LOGIN_MAINTENANCE_DELAY_MS = 10000
const POST_COMBAT_MAINTENANCE_DELAY_MS = 500

function runFullMaintenance(this: void): undefined {
  runMaintenancePass(RECHARGE_DESCRIPTOR)
  runMaintenancePass(REPAIR_DESCRIPTOR)
}

export function registerAutoMaintenanceEvents(ns: string): undefined {
  EVENT_MANAGER.RegisterForEvent(
    `${ns}_PlayerActivated`,
    EVENT_PLAYER_ACTIVATED,
    function (this: void): undefined {
      zo_callLater(runFullMaintenance, LOGIN_MAINTENANCE_DELAY_MS)
    }
  )
  EVENT_MANAGER.RegisterForEvent(
    `${ns}_LeaveCombat`,
    EVENT_PLAYER_COMBAT_STATE,
    function (this: void, _eventCode: number, inCombat: boolean): undefined {
      if (inCombat) return
      zo_callLater(runFullMaintenance, POST_COMBAT_MAINTENANCE_DELAY_MS)
    }
  )
  EVENT_MANAGER.RegisterForEvent(
    `${ns}_PlayerAlive`,
    EVENT_PLAYER_ALIVE,
    function (this: void): undefined {
      resetMaintenanceSuppression()
    }
  )

  const nsCharge = `${ns}_ChargeChanged`
  EVENT_MANAGER.RegisterForEvent(
    nsCharge,
    EVENT_INVENTORY_SINGLE_SLOT_UPDATE,
    function (this: void, _eventCode: number, _bagId: number, slotIndex: number): undefined {
      if (shouldSuppressChargeEvent(slotIndex)) return
      runMaintenancePass(RECHARGE_DESCRIPTOR, slotIndex)
    }
  )
  EVENT_MANAGER.AddFilterForEvent(
    nsCharge,
    EVENT_INVENTORY_SINGLE_SLOT_UPDATE,
    REGISTER_FILTER_INVENTORY_UPDATE_REASON,
    INVENTORY_UPDATE_REASON_ITEM_CHARGE
  )
  EVENT_MANAGER.AddFilterForEvent(
    nsCharge,
    EVENT_INVENTORY_SINGLE_SLOT_UPDATE,
    REGISTER_FILTER_BAG_ID,
    BAG_WORN
  )

  const nsDurability = `${ns}_DurabilityChanged`
  EVENT_MANAGER.RegisterForEvent(
    nsDurability,
    EVENT_INVENTORY_SINGLE_SLOT_UPDATE,
    function (this: void, _eventCode: number, _bagId: number, slotIndex: number): undefined {
      if (shouldSuppressDurabilityEvent(slotIndex)) return
      zo_callLater(() => runMaintenancePass(REPAIR_DESCRIPTOR, slotIndex), DURABILITY_DEBOUNCE_MS)
    }
  )
  EVENT_MANAGER.AddFilterForEvent(
    nsDurability,
    EVENT_INVENTORY_SINGLE_SLOT_UPDATE,
    REGISTER_FILTER_INVENTORY_UPDATE_REASON,
    INVENTORY_UPDATE_REASON_DURABILITY_CHANGE
  )
  EVENT_MANAGER.AddFilterForEvent(
    nsDurability,
    EVENT_INVENTORY_SINGLE_SLOT_UPDATE,
    REGISTER_FILTER_BAG_ID,
    BAG_WORN
  )
}
