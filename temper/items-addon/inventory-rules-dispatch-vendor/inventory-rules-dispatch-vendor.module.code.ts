import {
  clearPendingAction,
  forEachPendingAction,
  getPendingRuleIndex,
} from "../inventory-rules-core/inventory-rules-core.module.code.ts"
import {
  shouldConfirmAction,
  showConfirmDialog,
} from "../inventory-rules-core-confirm-dialog/inventory-rules-core-confirm-dialog.module.code.ts"
import {
  formatItemList,
  reportAction,
  reportPendingAction,
} from "../inventory-rules-core-report/inventory-rules-core-report.module.code.ts"
import { isVendorCrossCharDestination } from "../inventory-rules-cross-char/inventory-rules-cross-char.module.code.ts"
import { dispatchBuyRules } from "../inventory-rules-dispatch-buy/inventory-rules-dispatch-buy.module.code.ts"
export function onOpenStore(): undefined {
  const soldLinks: string[] = []
  const bagSize = GetBagSize(BAG_BACKPACK)
  for (let slot = 0; slot < bagSize; slot++) {
    if (!IsItemJunk(BAG_BACKPACK, slot)) continue
    if (IsItemStolen(BAG_BACKPACK, slot)) continue
    const [stackCount] = GetSlotStackSize(BAG_BACKPACK, slot)
    if (stackCount === 0) continue
    soldLinks.push(GetItemLink(BAG_BACKPACK, slot, LINK_STYLE_BRACKETS))
  }

  const destroyTargets: { bagId: number; slotIndex: number; link: string; ruleIndex: number }[] = []
  forEachPendingAction(function (this: void, bagId, slotIndex, action): undefined {
    if (action !== "destroy") return
    if (IsItemStolen(bagId, slotIndex)) return
    const [stackCount] = GetSlotStackSize(bagId, slotIndex)
    if (stackCount === 0) return
    destroyTargets.push({
      bagId,
      slotIndex,
      link: GetItemLink(bagId, slotIndex, LINK_STYLE_BRACKETS),
      ruleIndex: getPendingRuleIndex(bagId, slotIndex) ?? 999999,
    })
  })
  table.sort(destroyTargets, function (this: void, a, b): boolean {
    if (a.ruleIndex !== b.ruleIndex) return a.ruleIndex < b.ruleIndex
    return a.slotIndex < b.slotIndex
  })

  const confirmSell = soldLinks.length > 0 && shouldConfirmAction("sell")
  const confirmDestroy = destroyTargets.length > 0 && shouldConfirmAction("destroy")

  function executeSell(): undefined {
    if (soldLinks.length > 0) {
      SellAllJunk()
      reportAction("Sold", soldLinks)
    }
  }

  function executeDestroy(): undefined {
    const destroyedLinks: string[] = []
    for (const t of destroyTargets) {
      const [stackCount] = GetSlotStackSize(t.bagId, t.slotIndex)
      if (stackCount === 0) continue
      destroyedLinks.push(t.link)
      DestroyItem(t.bagId, t.slotIndex)
      clearPendingAction(t.bagId, t.slotIndex)
    }
    if (destroyedLinks.length > 0) {
      reportAction("Destroyed", destroyedLinks)
    }
  }

  if (confirmSell || confirmDestroy) {
    const parts: string[] = []
    if (confirmSell) {
      const n = soldLinks.length
      parts.push(`Sell ${n} ${n !== 1 ? "items" : "item"}: ${formatItemList(soldLinks)}`)
    }
    if (confirmDestroy) {
      const links = destroyTargets.map((t) => t.link)
      const n = links.length
      parts.push(`Destroy ${n} ${n !== 1 ? "items" : "item"}: ${formatItemList(links)}`)
    }

    if (confirmSell) reportPendingAction("Sell", soldLinks)
    if (confirmDestroy)
      reportPendingAction(
        "Destroy",
        destroyTargets.map((t) => t.link)
      )

    if (!confirmSell) executeSell()
    if (!confirmDestroy) executeDestroy()

    showConfirmDialog(`${parts.join("\n")}`, function (this: void): undefined {
      if (confirmSell) executeSell()
      if (confirmDestroy) executeDestroy()
    })
  } else {
    executeSell()
    executeDestroy()
  }

  dispatchBuyRules()
}

export function onOpenFence(allowSell: boolean, allowLaunder: boolean): undefined {
  const bagSize = GetBagSize(BAG_BACKPACK)

  const fenceSellTargets: {
    bagId: number
    slotIndex: number
    link: string
    isPending: boolean
    ruleIndex: number
    stackCount: number
  }[] = []

  if (allowSell) {
    for (let slot = 0; slot < bagSize; slot++) {
      if (!IsItemJunk(BAG_BACKPACK, slot)) continue
      if (!IsItemStolen(BAG_BACKPACK, slot)) continue
      const [stackCount] = GetSlotStackSize(BAG_BACKPACK, slot)
      if (stackCount === 0) continue
      fenceSellTargets.push({
        bagId: BAG_BACKPACK,
        slotIndex: slot,
        link: GetItemLink(BAG_BACKPACK, slot, LINK_STYLE_BRACKETS),
        isPending: false,
        ruleIndex: 999999,
        stackCount,
      })
    }

    forEachPendingAction(function (this: void, bagId, slotIndex, action, destination): undefined {
      if (action !== "fence-sell") return
      if (isVendorCrossCharDestination(destination)) return
      const [stackCount] = GetSlotStackSize(bagId, slotIndex)
      if (stackCount === 0) return
      fenceSellTargets.push({
        bagId,
        slotIndex,
        link: GetItemLink(bagId, slotIndex, LINK_STYLE_BRACKETS),
        isPending: true,
        ruleIndex: getPendingRuleIndex(bagId, slotIndex) ?? 999999,
        stackCount,
      })
    })
  }

  const fenceLaunderTargets: {
    bagId: number
    slotIndex: number
    link: string
    ruleIndex: number
    stackCount: number
  }[] = []

  if (allowLaunder) {
    forEachPendingAction(function (this: void, bagId, slotIndex, action, destination): undefined {
      if (action !== "fence-launder") return
      if (isVendorCrossCharDestination(destination)) return
      const [stackCount] = GetSlotStackSize(bagId, slotIndex)
      if (stackCount === 0) return
      fenceLaunderTargets.push({
        bagId,
        slotIndex,
        link: GetItemLink(bagId, slotIndex, LINK_STYLE_BRACKETS),
        ruleIndex: getPendingRuleIndex(bagId, slotIndex) ?? 999999,
        stackCount,
      })
    })
  }

  const fenceDestroyTargets: {
    bagId: number
    slotIndex: number
    link: string
    ruleIndex: number
  }[] = []

  forEachPendingAction(function (this: void, bagId, slotIndex, action): undefined {
    if (action !== "destroy") return
    if (!IsItemStolen(bagId, slotIndex)) return
    const [stackCount] = GetSlotStackSize(bagId, slotIndex)
    if (stackCount === 0) return
    fenceDestroyTargets.push({
      bagId,
      slotIndex,
      link: GetItemLink(bagId, slotIndex, LINK_STYLE_BRACKETS),
      ruleIndex: getPendingRuleIndex(bagId, slotIndex) ?? 999999,
    })
  })

  table.sort(fenceSellTargets, function (this: void, a, b): boolean {
    if (a.stackCount !== b.stackCount) return a.stackCount < b.stackCount
    if (a.ruleIndex !== b.ruleIndex) return a.ruleIndex < b.ruleIndex
    return a.slotIndex < b.slotIndex
  })
  table.sort(fenceLaunderTargets, function (this: void, a, b): boolean {
    if (a.stackCount !== b.stackCount) return a.stackCount < b.stackCount
    if (a.ruleIndex !== b.ruleIndex) return a.ruleIndex < b.ruleIndex
    return a.slotIndex < b.slotIndex
  })
  table.sort(fenceDestroyTargets, function (this: void, a, b): boolean {
    if (a.ruleIndex !== b.ruleIndex) return a.ruleIndex < b.ruleIndex
    return a.slotIndex < b.slotIndex
  })

  const confirmSell = fenceSellTargets.length > 0 && shouldConfirmAction("sell")
  const confirmDestroy = fenceDestroyTargets.length > 0 && shouldConfirmAction("destroy")

  function executeFenceSell(): undefined {
    if (fenceSellTargets.length === 0) return
    const [totalSells, sellsUsed] = GetFenceSellTransactionInfo()
    let sellsRemaining = totalSells - sellsUsed
    const soldLinks: string[] = []

    for (const t of fenceSellTargets) {
      const [stackCount] = GetSlotStackSize(t.bagId, t.slotIndex)
      if (stackCount === 0) continue
      if (sellsRemaining <= 0) break
      const qty = math.min(stackCount, sellsRemaining)
      soldLinks.push(t.link)
      SellInventoryItem(t.bagId, t.slotIndex, qty)
      if (t.isPending && qty === stackCount) clearPendingAction(t.bagId, t.slotIndex)
      sellsRemaining -= qty
    }

    if (soldLinks.length > 0) {
      reportAction("Fence-sold", soldLinks)
    }
  }

  function executeFenceLaunder(): undefined {
    if (fenceLaunderTargets.length === 0) return
    const [totalLaunders, laundersUsed] = GetFenceLaunderTransactionInfo()
    let laundersRemaining = totalLaunders - laundersUsed
    const launderedLinks: string[] = []

    for (const t of fenceLaunderTargets) {
      const [stackCount] = GetSlotStackSize(t.bagId, t.slotIndex)
      if (stackCount === 0) continue
      if (laundersRemaining <= 0) break
      const qty = math.min(stackCount, laundersRemaining)
      launderedLinks.push(t.link)
      LaunderItem(t.bagId, t.slotIndex, qty)
      if (qty === stackCount) clearPendingAction(t.bagId, t.slotIndex)
      laundersRemaining -= qty
    }

    if (launderedLinks.length > 0) {
      reportAction("Laundered", launderedLinks)
    }
  }

  function executeFenceDestroy(): undefined {
    const destroyedLinks: string[] = []

    for (const t of fenceDestroyTargets) {
      const [stackCount] = GetSlotStackSize(t.bagId, t.slotIndex)
      if (stackCount === 0) continue
      destroyedLinks.push(t.link)
      DestroyItem(t.bagId, t.slotIndex)
      clearPendingAction(t.bagId, t.slotIndex)
    }

    if (destroyedLinks.length > 0) {
      reportAction("Destroyed", destroyedLinks)
    }
  }

  if (confirmSell || confirmDestroy) {
    const parts: string[] = []
    if (confirmSell) {
      const links = fenceSellTargets.map((t) => t.link)
      const n = links.length
      parts.push(`Fence-sell ${n} ${n !== 1 ? "items" : "item"}: ${formatItemList(links)}`)
    }
    if (confirmDestroy) {
      const links = fenceDestroyTargets.map((t) => t.link)
      const n = links.length
      parts.push(`Destroy ${n} ${n !== 1 ? "items" : "item"}: ${formatItemList(links)}`)
    }

    if (confirmSell)
      reportPendingAction(
        "Fence-sell",
        fenceSellTargets.map((t) => t.link)
      )
    if (confirmDestroy)
      reportPendingAction(
        "Destroy",
        fenceDestroyTargets.map((t) => t.link)
      )

    if (!confirmSell) executeFenceSell()
    executeFenceLaunder()
    if (!confirmDestroy) executeFenceDestroy()

    showConfirmDialog(`${parts.join("\n")}`, function (this: void): undefined {
      if (confirmSell) executeFenceSell()
      if (confirmDestroy) executeFenceDestroy()
    })
  } else {
    executeFenceSell()
    executeFenceLaunder()
    executeFenceDestroy()
  }
}
