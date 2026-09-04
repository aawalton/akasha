import {
  clearPendingAction,
  forEachPendingAction,
  getPendingRuleIndex,
} from "../inventory-rules-core/inventory-rules-core.module.code.ts"
import { isItemUnlockable } from "../inventory-rules-core-overrides/inventory-rules-core-overrides.module.code.ts"
import { reportAction } from "../inventory-rules-core-report/inventory-rules-core-report.module.code.ts"
import {
  ATTEMPTED_OPEN_LINKS_HOLDER,
  enqueueOpenItems,
  type OpenQueueEntry,
  resetAttemptedOpenLinksForChain,
} from "../inventory-rules-dispatch-open-queue/inventory-rules-dispatch-open-queue.module.code.ts"
export const MAX_OPS = 50
export const CHARACTER_PREFIX = "character:"
export const USE_FRAME_DELAY = 200
export let useGeneration = 0

export function dispatchUseActions(): undefined {
  useGeneration++
  const gen = useGeneration
  const currentCharId = tostring(GetCurrentCharacterId())

  resetAttemptedOpenLinksForChain()

  const useItems: { bagId: number; slotIndex: number; itemLink: string; ruleIndex: number }[] = []
  const openItems: (OpenQueueEntry & { ruleIndex: number })[] = []

  forEachPendingAction(function (this: void, bagId, slotIndex, action, destination): undefined {
    if (action !== "use" && action !== "open") return
    if (bagId !== BAG_BACKPACK) return
    if (useItems.length + openItems.length >= MAX_OPS) return
    if (
      destination !== undefined &&
      destination.substring(0, CHARACTER_PREFIX.length) === CHARACTER_PREFIX
    ) {
      const charId = destination.substring(CHARACTER_PREFIX.length)
      if (charId !== currentCharId) return
    }
    const itemLink = GetItemLink(bagId, slotIndex, LINK_STYLE_BRACKETS)
    const ri = getPendingRuleIndex(bagId, slotIndex) ?? 999999
    if (action === "open") {
      if (ATTEMPTED_OPEN_LINKS_HOLDER.set.has(itemLink)) return
      const [itemType] = GetItemType(bagId, slotIndex)
      openItems.push({
        bagId,
        slotIndex,
        itemLink,
        isStackable: itemType === ITEMTYPE_CONTAINER_STACKABLE,
        ruleIndex: ri,
      })
    } else {
      useItems.push({ bagId, slotIndex, itemLink, ruleIndex: ri })
    }
  })

  table.sort(useItems, function (this: void, a, b): boolean {
    if (a.ruleIndex !== b.ruleIndex) return a.ruleIndex < b.ruleIndex
    return a.slotIndex < b.slotIndex
  })
  table.sort(openItems, function (this: void, a, b): boolean {
    if (a.ruleIndex !== b.ruleIndex) return a.ruleIndex < b.ruleIndex
    return a.slotIndex < b.slotIndex
  })

  if (useItems.length > 0) {
    const usedLinks: string[] = []
    for (const [i, item] of useItems.entries()) {
      const isLast = i === useItems.length - 1
      const delay = i * USE_FRAME_DELAY
      zo_callLater(function (this: void): undefined {
        if (useItem(gen, item.bagId, item.slotIndex)) {
          usedLinks.push(item.itemLink)
        }
        if (isLast && usedLinks.length > 0) {
          reportAction("Used", usedLinks)
        }
      }, delay)
    }
  }

  if (openItems.length > 0) {
    enqueueOpenItems(openItems)
  }
}

export function useItem(gen: number, bagId: number, slotIndex: number): boolean {
  if (gen !== useGeneration) return false
  const [stackCount] = GetSlotStackSize(bagId, slotIndex)
  if (stackCount === 0) {
    clearPendingAction(bagId, slotIndex)
    return false
  }
  if (!CanInteractWithItem(bagId, slotIndex)) {
    return false
  }
  const link = GetItemLink(bagId, slotIndex, LINK_STYLE_BRACKETS)
  if (link !== "") {
    const [iType] = GetItemLinkItemType(link)
    const unlockable = isItemUnlockable(link, iType)
    if (unlockable === false) {
      clearPendingAction(bagId, slotIndex)
      return false
    }
  }
  if (IsProtectedFunction("UseItem")) {
    CallSecureProtected("UseItem", bagId, slotIndex)
  } else {
    UseItem(bagId, slotIndex)
  }
  clearPendingAction(bagId, slotIndex)
  return true
}

export function dispatchSafeOpenActions(): undefined {
  const items: OpenQueueEntry[] = []

  forEachPendingAction(function (this: void, bagId, slotIndex, action): undefined {
    if (action !== "open-stolen-when-safe") return
    if (bagId !== BAG_BACKPACK) return
    if (items.length >= MAX_OPS) return
    if (GetUnitStealthState("player") !== STEALTH_STATE_HIDDEN && IsInJusticeEnabledZone()) return
    const [itemType] = GetItemType(bagId, slotIndex)
    items.push({
      bagId,
      slotIndex,
      itemLink: GetItemLink(bagId, slotIndex, LINK_STYLE_BRACKETS),
      isStackable: itemType === ITEMTYPE_CONTAINER_STACKABLE,
    })
  })

  if (items.length === 0) return
  enqueueOpenItems(items)
}
