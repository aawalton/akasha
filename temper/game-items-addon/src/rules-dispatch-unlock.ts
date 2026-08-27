import { refreshLockOverlays } from "./inventory-lock-overlay"
import { clearPendingAction, forEachPendingAction } from "./rules-core"
import { reportAction } from "./rules-core-report"
import { clearTemperLock } from "./temper-lock-store"

export function dispatchUnlockActions(): undefined {
  const items: { bagId: number; slotIndex: number; itemLink: string }[] = []
  forEachPendingAction(function (this: void, bagId, slotIndex, action): undefined {
    if (action !== "unlock") return
    items.push({
      bagId,
      slotIndex,
      itemLink: GetItemLink(bagId, slotIndex, LINK_STYLE_BRACKETS),
    })
  })
  if (items.length === 0) return

  const unlockedLinks: string[] = []
  for (const item of items) {
    const [stackCount] = GetSlotStackSize(item.bagId, item.slotIndex)
    if (stackCount > 0) {
      clearTemperLock(item.bagId, item.slotIndex)
      unlockedLinks.push(item.itemLink)
    }
    clearPendingAction(item.bagId, item.slotIndex)
  }

  if (unlockedLinks.length > 0) {
    reportAction("Unlocked", unlockedLinks)
    refreshLockOverlays()
  }
}
