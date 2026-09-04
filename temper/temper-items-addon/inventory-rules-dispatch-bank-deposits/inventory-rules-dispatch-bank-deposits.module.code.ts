import type { ItemAction } from "@akasha/temper-items-rules-core/inventory-rule-types"
import { planStockChainVisit } from "@akasha/temper-items-rules-core/stock-chain-visit"
import { isConsolidateDest } from "@akasha/temper-items-rules-routing-core/inventory-consolidate-dest"
import { ADDON_NAME } from "../inventory-constants/inventory-constants.module.code.ts"
import {
  clearPendingAction,
  forEachPendingAction,
  getCompiledConfig,
  getPendingAction,
  getPendingDestination,
  getPendingRuleIndex,
  getPendingStockScope,
  getPendingTargetQuantity,
  setPendingAction,
} from "../inventory-rules-core/inventory-rules-core.module.code.ts"
import { getPendingUseDeposits } from "../inventory-rules-core-use-deposits/inventory-rules-core-use-deposits.module.code.ts"
import {
  type FrozenStockCounts,
  frozenStockCount,
} from "../inventory-rules-dispatch-bank-reconcile/inventory-rules-dispatch-bank-reconcile.module.code.ts"
import {
  type BankSlotContext,
  bankCountItemInStorage,
  bankFindEmptyStorageSlot,
  bankFindPartialStorageSlot,
  bankIsCorrectStorage,
} from "../inventory-rules-dispatch-bank-slots/inventory-rules-dispatch-bank-slots.module.code.ts"
import { slotKey } from "../inventory-slot-key/inventory-slot-key.module.code.ts"
import { computeStockTierDeposit } from "../inventory-stock-deposit-decision/inventory-stock-deposit-decision.module.code.ts"
export const DEPOSIT_CHARACTER_PREFIX = "character:"

function resolveCascadeTierForCtx(
  ctx: BankSlotContext,
  bagId: number,
  slotIndex: number
): { destination: string; cap: number | undefined } | undefined {
  const ruleIndex = getPendingRuleIndex(bagId, slotIndex)
  if (ruleIndex === undefined) return undefined
  const compiled = getCompiledConfig()
  const chain = compiled?.orderedRules[ruleIndex]?.destinationChain
  if (chain === undefined) return undefined
  const plan = planStockChainVisit(chain)
  if (plan === undefined) return undefined
  for (const tier of plan.surplusCascade) {
    if (bankIsCorrectStorage(ctx, tier.destination)) {
      return { destination: tier.destination, cap: tier.cap }
    }
  }
  return undefined
}

export function executeBankDeposits(
  ctx: BankSlotContext,
  currentCharId: string,
  frozen: FrozenStockCounts,
  startOps: number,
  maxOps: number,
  bankMoveItem: (
    sourceBag: number,
    sourceSlot: number,
    targetBag: number,
    targetSlot: number,
    stackCount: number
  ) => void
): { ops: number; depositedLinks: string[] } {
  const deposits: {
    bagId: number
    slotIndex: number
    action: ItemAction
    dest: string
    ruleIndex: number
  }[] = []

  forEachPendingAction(function (this: void, bagId, slotIndex, action, destination): undefined {
    if (bagId !== BAG_BACKPACK) return
    const isMoveLike =
      action === "move-to" ||
      action === "stock" ||
      action === "character-equip" ||
      action === "companion-equip"
    const isCharacterUse =
      action === "use" &&
      destination !== undefined &&
      destination.substring(0, DEPOSIT_CHARACTER_PREFIX.length) === DEPOSIT_CHARACTER_PREFIX
    const isCharacterResearch =
      action === "research" &&
      destination !== undefined &&
      destination.substring(0, DEPOSIT_CHARACTER_PREFIX.length) === DEPOSIT_CHARACTER_PREFIX
    const isCharacterDeconstruct =
      action === "deconstruct" &&
      destination !== undefined &&
      destination.substring(0, DEPOSIT_CHARACTER_PREFIX.length) === DEPOSIT_CHARACTER_PREFIX
    const isVendorAction =
      action === "list" ||
      action === "sell" ||
      action === "fence-sell" ||
      action === "fence-launder"
    const isVendorCrossChar =
      isVendorAction &&
      destination !== undefined &&
      destination.substring(0, DEPOSIT_CHARACTER_PREFIX.length) === DEPOSIT_CHARACTER_PREFIX &&
      destination.substring(DEPOSIT_CHARACTER_PREFIX.length) !== currentCharId
    if (
      !isMoveLike &&
      !isCharacterUse &&
      !isCharacterResearch &&
      !isCharacterDeconstruct &&
      !isVendorCrossChar
    )
      return

    const dest = destination ?? "bank"

    let shouldDeposit = false
    if (bankIsCorrectStorage(ctx, dest)) {
      shouldDeposit = true
    }
    if (dest === "craft-bag" && HasCraftBagAccess() && CanItemBeVirtual(bagId, slotIndex)) {
      shouldDeposit = true
    }
    if (
      ctx.isBank &&
      dest.substring(0, DEPOSIT_CHARACTER_PREFIX.length) === DEPOSIT_CHARACTER_PREFIX &&
      dest.substring(DEPOSIT_CHARACTER_PREFIX.length) !== currentCharId
    ) {
      shouldDeposit = true
    }
    if (ctx.isBank && action === "character-equip" && destination != null) {
      const charId = destination.slice("character-worn:".length)
      if (charId !== currentCharId) {
        shouldDeposit = true
      }
    }
    if (ctx.isBank && isConsolidateDest(dest)) {
      const compiled = getCompiledConfig()
      const primary = compiled?.characterPriority?.[0]
      if (primary !== undefined && currentCharId !== primary) {
        shouldDeposit = true
      }
    }
    if (ctx.isBank && action === "use" && getPendingUseDeposits(bagId, slotIndex) !== undefined) {
      shouldDeposit = true
    }
    if (!shouldDeposit && action === "stock") {
      if (resolveCascadeTierForCtx(ctx, bagId, slotIndex) !== undefined) {
        shouldDeposit = true
      }
    }

    if (shouldDeposit) {
      deposits.push({
        bagId,
        slotIndex,
        action,
        dest,
        ruleIndex: getPendingRuleIndex(bagId, slotIndex) ?? 999999,
      })
    }
  })

  table.sort(deposits, function (this: void, a, b): boolean {
    if (a.ruleIndex !== b.ruleIndex) return a.ruleIndex < b.ruleIndex
    return a.slotIndex < b.slotIndex
  })

  const depositedLinks: string[] = []

  const stockDepositedCounts = new LuaMap<number, number>()

  let ops = startOps

  for (const dep of deposits) {
    if (ops >= maxOps) break
    const [stackCount] = GetSlotStackSize(dep.bagId, dep.slotIndex)
    if (stackCount === 0) continue

    if (dep.action === "use") {
      const useDeposits = getPendingUseDeposits(dep.bagId, dep.slotIndex)
      if (useDeposits !== undefined && useDeposits.length > 0) {
        const result = executeUseDepositsSplit(
          ctx,
          dep.bagId,
          dep.slotIndex,
          useDeposits,
          ops,
          maxOps,
          bankMoveItem
        )
        ops = result.ops
        for (const link of result.depositedLinks) depositedLinks.push(link)
        continue
      }
    }
    let toMove = stackCount
    if (dep.action === "stock") {
      const tq = getPendingTargetQuantity(dep.bagId, dep.slotIndex)
      const scope = getPendingStockScope(dep.bagId, dep.slotIndex)
      if (tq !== undefined) {
        const itemLink = GetItemLink(dep.bagId, dep.slotIndex, LINK_STYLE_BRACKETS)
        const itemId = GetItemLinkItemId(itemLink)
        const ruleIndex = getPendingRuleIndex(dep.bagId, dep.slotIndex)
        if (scope === "any-character") {
          const accumKey = ruleIndex ?? itemId
          const backpackCount = frozenStockCount(frozen, ruleIndex, itemId)
          const alreadyDispatched = stockDepositedCounts.get(accumKey) ?? 0
          const tier = resolveCascadeTierForCtx(ctx, dep.bagId, dep.slotIndex)
          const tierCap = tier?.cap
          const tierAccountWideCount =
            tierCap !== undefined ? bankCountItemInStorage(ctx, itemId) : 0
          toMove = computeStockTierDeposit({
            stackCount,
            backpackCount,
            selfTarget: tq,
            alreadyDispatched,
            tierCap,
            tierAccountWideCount,
          })
        } else {
          const alreadyAtDest = bankCountItemInStorage(ctx, itemId)
          const needed = math.max(0, tq - alreadyAtDest)
          toMove = math.min(stackCount, needed)
        }
        if (toMove === 0) {
          clearPendingAction(dep.bagId, dep.slotIndex)
          continue
        }
      }
    }

    if (dep.dest === "craft-bag") {
      const itemLink = GetItemLink(dep.bagId, dep.slotIndex, LINK_STYLE_BRACKETS)
      depositedLinks.push(toMove > 1 ? `${itemLink} x${toMove}` : itemLink)
      bankMoveItem(dep.bagId, dep.slotIndex, BAG_VIRTUAL, 0, toMove)
      clearPendingAction(dep.bagId, dep.slotIndex)
      ops++
      continue
    }

    const depositItemLink = GetItemLink(dep.bagId, dep.slotIndex, LINK_STYLE_BRACKETS)
    const depositItemId = GetItemLinkItemId(depositItemLink)
    const partialStorageSlot =
      dep.action === "stock" ? bankFindPartialStorageSlot(ctx, depositItemId) : undefined
    if (partialStorageSlot !== undefined) {
      ctx.reserved.delete(slotKey(partialStorageSlot.bag, partialStorageSlot.slot))
    }
    const target = partialStorageSlot ?? bankFindEmptyStorageSlot(ctx)
    if (target === undefined) {
      d(`[${ADDON_NAME}] Storage is full, stopping deposit`)
      break
    }

    depositedLinks.push(toMove > 1 ? `${depositItemLink} x${toMove}` : depositItemLink)
    bankMoveItem(dep.bagId, dep.slotIndex, target.bag, target.slot, toMove)
    if (dep.action === "stock") {
      const depRuleIndex = getPendingRuleIndex(dep.bagId, dep.slotIndex)
      const accumKey = depRuleIndex ?? depositItemId
      const alreadyDispatched = stockDepositedCounts.get(accumKey) ?? 0
      stockDepositedCounts.set(accumKey, alreadyDispatched + toMove)
    }
    clearPendingAction(dep.bagId, dep.slotIndex)
    ops++
  }

  return { ops, depositedLinks }
}

function executeUseDepositsSplit(
  ctx: BankSlotContext,
  sourceBagId: number,
  sourceSlotIndex: number,
  useDeposits: readonly { readonly charId: string; readonly qty: number }[],
  startOps: number,
  maxOps: number,
  bankMoveItem: (
    sourceBag: number,
    sourceSlot: number,
    targetBag: number,
    targetSlot: number,
    stackCount: number
  ) => void
): { ops: number; depositedLinks: string[] } {
  const itemLink = GetItemLink(sourceBagId, sourceSlotIndex, LINK_STYLE_BRACKETS)
  const itemId = GetItemLinkItemId(itemLink)
  const charsAlreadyAtBank = scanBankForActionPending(ctx, itemId, "use")
  const depositedLinks: string[] = []
  let ops = startOps

  for (const entry of useDeposits) {
    if (ops >= maxOps) break
    const [stackRemaining] = GetSlotStackSize(sourceBagId, sourceSlotIndex)
    if (stackRemaining === 0) break

    if (charsAlreadyAtBank.has(entry.charId)) continue

    const target = bankFindEmptyStorageSlot(ctx)
    if (target === undefined) {
      d(`[${ADDON_NAME}] Storage is full, stopping deposit`)
      break
    }

    const qty = entry.qty > 0 ? entry.qty : 1
    const toMove = math.min(stackRemaining, qty)
    depositedLinks.push(toMove > 1 ? `${itemLink} x${toMove}` : itemLink)
    bankMoveItem(sourceBagId, sourceSlotIndex, target.bag, target.slot, toMove)
    setPendingAction(target.bag, target.slot, "use", `character:${entry.charId}`)
    charsAlreadyAtBank.set(entry.charId, true)
    ops++
  }

  return { ops, depositedLinks }
}

function scanBankForActionPending(
  ctx: BankSlotContext,
  itemId: number,
  targetAction: "use"
): LuaMap<string, true> {
  const result = new LuaMap<string, true>()
  if (!ctx.isBank) return result

  const scanBag = function (this: void, bag: number): undefined {
    const size = GetBagSize(bag)
    for (let slot = 0; slot < size; slot++) {
      const [stackCount] = GetSlotStackSize(bag, slot)
      if (stackCount === 0) continue
      const link = GetItemLink(bag, slot, LINK_STYLE_BRACKETS)
      if (GetItemLinkItemId(link) !== itemId) continue
      const action = getPendingAction(bag, slot)
      if (action !== targetAction) continue
      const dest = getPendingDestination(bag, slot)
      if (dest === undefined) continue
      if (dest.substring(0, DEPOSIT_CHARACTER_PREFIX.length) !== DEPOSIT_CHARACTER_PREFIX) continue
      const charId = dest.substring(DEPOSIT_CHARACTER_PREFIX.length)
      result.set(charId, true)
    }
  }

  scanBag(BAG_BANK)
  if (IsESOPlusSubscriber()) scanBag(BAG_SUBSCRIBER_BANK)
  return result
}
