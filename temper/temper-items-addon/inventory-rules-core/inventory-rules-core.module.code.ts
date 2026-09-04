import { isBackpackRequiredAction } from "@akasha/temper-items-rules-core/action-storage-capability"
import type { CompiledRuleConfig } from "@akasha/temper-items-rules-core/inventory-rule-compiler-types"
import { getInventoryConfig } from "../inventory-config/inventory-config.module.code.ts"
import { setItemIsJunkGated } from "../inventory-junk-queue/inventory-junk-queue.module.code.ts"
import {
  applyMultiCharAllocation,
  clearAllPendingUseDeposits,
  clearPendingUseDeposits,
} from "../inventory-rules-core-use-deposits/inventory-rules-core-use-deposits.module.code.ts"
import { isVendorCrossCharDestination } from "../inventory-rules-cross-char/inventory-rules-cross-char.module.code.ts"
import type {
  AddonItemAction,
  UseAllocation,
} from "../inventory-rules-types/inventory-rules-types.module.code.ts"
import { slotKey } from "../inventory-slot-key/inventory-slot-key.module.code.ts"
import { setTemperLock } from "../inventory-temper-lock-store/inventory-temper-lock-store.module.code.ts"
export function getCompiledConfig(): CompiledRuleConfig | undefined {
  const compiled = getInventoryConfig().sellCompiled
  if (!compiled || compiled.version !== 3) return undefined
  if (!compiled.orderedRules) compiled.orderedRules = []
  if (!compiled.wantedEquipment) compiled.wantedEquipment = []
  if (!compiled.wantedCompanionEquipment) compiled.wantedCompanionEquipment = []
  if (!compiled.wantedConsumables) compiled.wantedConsumables = {}
  if (!compiled.consumableStock) compiled.consumableStock = {}
  if (!compiled.characterPriority) compiled.characterPriority = []
  if (!compiled.currencyRules) compiled.currencyRules = {}
  return compiled
}

export const pendingActions = new LuaMap<number, AddonItemAction>()
export const pendingDestinations = new LuaMap<number, string>()
export const pendingTargetQuantities = new LuaMap<number, number>()
export const pendingStockScopes = new LuaMap<number, string>()
export const pendingRuleIndices = new LuaMap<number, number>()
export const pendingItemIds = new LuaMap<number, string>()

export function setPendingAction(
  bagId: number,
  slotIndex: number,
  action: AddonItemAction,
  destination?: string,
  targetQuantity?: number,
  stockScope?: string
): undefined {
  const key = slotKey(bagId, slotIndex)
  pendingActions.set(key, action)
  if (destination !== undefined) {
    pendingDestinations.set(key, destination)
  } else {
    pendingDestinations.delete(key)
  }
  if (targetQuantity !== undefined) {
    pendingTargetQuantities.set(key, targetQuantity)
  } else {
    pendingTargetQuantities.delete(key)
  }
  if (stockScope !== undefined) {
    pendingStockScopes.set(key, stockScope)
  } else {
    pendingStockScopes.delete(key)
  }
  const uniqueId = GetItemUniqueId(bagId, slotIndex)
  pendingItemIds.set(key, uniqueId !== undefined ? Id64ToString(uniqueId) : "")
}

export function isPendingActionStale(bagId: number, slotIndex: number): boolean {
  const key = slotKey(bagId, slotIndex)
  if (!pendingActions.has(key)) return false
  const [stackSize] = GetSlotStackSize(bagId, slotIndex)
  if (stackSize === 0) return true
  const storedId = pendingItemIds.get(key)
  if (storedId === undefined || storedId === "" || storedId === "0") return false
  const currentUniqueId = GetItemUniqueId(bagId, slotIndex)
  if (currentUniqueId === undefined) return true
  return Id64ToString(currentUniqueId) !== storedId
}

export function getPendingTargetQuantity(bagId: number, slotIndex: number): number | undefined {
  return pendingTargetQuantities.get(slotKey(bagId, slotIndex))
}

export function getPendingStockScope(bagId: number, slotIndex: number): string | undefined {
  return pendingStockScopes.get(slotKey(bagId, slotIndex))
}

export function getPendingDestination(bagId: number, slotIndex: number): string | undefined {
  return pendingDestinations.get(slotKey(bagId, slotIndex))
}

export function getPendingRuleIndex(bagId: number, slotIndex: number): number | undefined {
  return pendingRuleIndices.get(slotKey(bagId, slotIndex))
}

export function getPendingAction(bagId: number, slotIndex: number): AddonItemAction | undefined {
  return pendingActions.get(slotKey(bagId, slotIndex))
}

export function clearPendingAction(bagId: number, slotIndex: number): undefined {
  const key = slotKey(bagId, slotIndex)
  pendingActions.delete(key)
  pendingDestinations.delete(key)
  pendingTargetQuantities.delete(key)
  pendingStockScopes.delete(key)
  pendingRuleIndices.delete(key)
  pendingItemIds.delete(key)
  clearPendingUseDeposits(bagId, slotIndex)
}

export function clearAllPendingActions(): undefined {
  for (const [key] of pendingActions) {
    pendingActions.delete(key)
  }
  for (const [key] of pendingDestinations) {
    pendingDestinations.delete(key)
  }
  for (const [key] of pendingTargetQuantities) {
    pendingTargetQuantities.delete(key)
  }
  for (const [key] of pendingStockScopes) {
    pendingStockScopes.delete(key)
  }
  for (const [key] of pendingRuleIndices) {
    pendingRuleIndices.delete(key)
  }
  for (const [key] of pendingItemIds) {
    pendingItemIds.delete(key)
  }
  clearAllPendingUseDeposits()
}

export function forEachPendingAction(
  callback: (
    bagId: number,
    slotIndex: number,
    action: AddonItemAction,
    destination?: string
  ) => void
): undefined {
  for (const [key, action] of pendingActions) {
    const bagId = math.floor(key / 100000)
    const slotIndex = key % 100000
    const destination = pendingDestinations.get(key)
    callback(bagId, slotIndex, action, destination)
  }
}

export function applyAction(
  bagId: number,
  slotIndex: number,
  action: AddonItemAction,
  destination?: string,
  targetQuantity?: number,
  stockScope?: string,
  ruleIndex?: number,
  useAllocation?: UseAllocation
): undefined {
  if (
    bagId !== BAG_BACKPACK &&
    action !== "lock" &&
    (action === "open-stolen-when-safe" || isBackpackRequiredAction(action, destination))
  )
    return

  const pKey = slotKey(bagId, slotIndex)

  if (action === "sell") {
    if (IsItemStolen(bagId, slotIndex)) {
      setPendingAction(bagId, slotIndex, "fence-sell", destination)
      if (ruleIndex !== undefined) pendingRuleIndices.set(pKey, ruleIndex)
    } else if (isVendorCrossCharDestination(destination)) {
      setPendingAction(bagId, slotIndex, "sell", destination)
      if (ruleIndex !== undefined) pendingRuleIndices.set(pKey, ruleIndex)
    } else {
      setItemIsJunkGated(bagId, slotIndex, true)
    }
    return
  }
  if (action === "fence-sell") {
    setPendingAction(bagId, slotIndex, "fence-sell", destination)
    if (ruleIndex !== undefined) pendingRuleIndices.set(pKey, ruleIndex)
    return
  }
  if (action === "fence-launder") {
    setPendingAction(bagId, slotIndex, "fence-launder", destination)
    if (ruleIndex !== undefined) pendingRuleIndices.set(pKey, ruleIndex)
    return
  }
  if (action === "destroy") {
    setPendingAction(bagId, slotIndex, "destroy")
    if (ruleIndex !== undefined) pendingRuleIndices.set(pKey, ruleIndex)
    return
  }
  if (action === "lock") {
    setTemperLock(bagId, slotIndex)
    return
  }
  if (action === "unlock") {
    setPendingAction(bagId, slotIndex, "unlock")
    if (ruleIndex !== undefined) pendingRuleIndices.set(pKey, ruleIndex)
    return
  }
  if (action === "nothing") {
    return
  }
  if (action === "move-to") {
    setPendingAction(bagId, slotIndex, "move-to", destination ?? "bank")
    if (ruleIndex !== undefined) pendingRuleIndices.set(pKey, ruleIndex)
    return
  }
  if (action === "stock") {
    setPendingAction(bagId, slotIndex, "stock", destination ?? "bank", targetQuantity, stockScope)
    if (ruleIndex !== undefined) pendingRuleIndices.set(pKey, ruleIndex)
    return
  }
  if (action === "deconstruct") {
    setPendingAction(bagId, slotIndex, "deconstruct", destination)
    if (ruleIndex !== undefined) pendingRuleIndices.set(pKey, ruleIndex)
    return
  }
  if (action === "refine") {
    setPendingAction(bagId, slotIndex, "refine", destination)
    if (ruleIndex !== undefined) pendingRuleIndices.set(pKey, ruleIndex)
    return
  }
  if (action === "research") {
    setPendingAction(bagId, slotIndex, "research", destination)
    if (ruleIndex !== undefined) pendingRuleIndices.set(pKey, ruleIndex)
    return
  }
  if (action === "list") {
    setPendingAction(bagId, slotIndex, "list", destination)
    if (ruleIndex !== undefined) pendingRuleIndices.set(pKey, ruleIndex)
    return
  }
  if (action === "mail") {
    setPendingAction(bagId, slotIndex, "mail", destination)
    if (ruleIndex !== undefined) pendingRuleIndices.set(pKey, ruleIndex)
    return
  }
  if (action === "open") {
    setPendingAction(bagId, slotIndex, "open")
    if (ruleIndex !== undefined) pendingRuleIndices.set(pKey, ruleIndex)
    return
  }
  if (action === "use") {
    if (useAllocation !== undefined) {
      if (bagId === BAG_BACKPACK) {
        applyMultiCharAllocation(
          bagId,
          slotIndex,
          "use",
          useAllocation,
          undefined,
          undefined,
          setPendingAction
        )
      } else if (useAllocation.currentCharQty > 0) {
        const currentCharStr = tostring(GetCurrentCharacterId())
        setPendingAction(bagId, slotIndex, "use", `character:${currentCharStr}`)
      }
      if (ruleIndex !== undefined) pendingRuleIndices.set(pKey, ruleIndex)
      return
    }
    setPendingAction(bagId, slotIndex, "use", destination)
    if (ruleIndex !== undefined) pendingRuleIndices.set(pKey, ruleIndex)
    return
  }
  if (action === "character-equip") {
    setPendingAction(bagId, slotIndex, "character-equip", destination)
    if (ruleIndex !== undefined) pendingRuleIndices.set(pKey, ruleIndex)
    return
  }
  if (action === "companion-equip") {
    setPendingAction(bagId, slotIndex, "companion-equip", destination)
    if (ruleIndex !== undefined) pendingRuleIndices.set(pKey, ruleIndex)
    return
  }
}
