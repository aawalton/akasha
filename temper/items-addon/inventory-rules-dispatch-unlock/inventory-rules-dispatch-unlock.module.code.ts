import { refreshLockOverlays } from "akasha/temper/items-addon/inventory-lock-overlay/inventory-lock-overlay.module.code.ts"
import {
  clearPendingAction,
  forEachPendingAction,
} from "akasha/temper/items-addon/inventory-rules-core/inventory-rules-core.module.code.ts"
import { reportAction } from "akasha/temper/items-addon/inventory-rules-core-report/inventory-rules-core-report.module.code.ts"
import { clearTemperLock } from "akasha/temper/items-addon/inventory-temper-lock-store/inventory-temper-lock-store.module.code.ts"
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
