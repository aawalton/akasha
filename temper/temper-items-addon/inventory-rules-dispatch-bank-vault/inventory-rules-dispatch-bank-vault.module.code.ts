import { isBackpackRequiredAction } from "@akasha/temper-items-rules-core/action-storage-capability"
import { getConfiguredBufferSlots } from "../inventory-backpack-buffer/inventory-backpack-buffer.module.code.ts"
import { ADDON_NAME } from "../inventory-constants/inventory-constants.module.code.ts"
import {
  clearPendingAction,
  forEachPendingAction,
  getCompiledConfig,
} from "../inventory-rules-core/inventory-rules-core.module.code.ts"
import { reportAction } from "../inventory-rules-core-report/inventory-rules-core-report.module.code.ts"
import {
  type BankSlotContext,
  bankFindEmptyBackpackSlot,
  bankFindPartialStackSlot,
} from "../inventory-rules-dispatch-bank-slots/inventory-rules-dispatch-bank-slots.module.code.ts"
import { findMatchedRule } from "../inventory-rules-eval/inventory-rules-eval.module.code.ts"
import { slotKey } from "../inventory-slot-key/inventory-slot-key.module.code.ts"

interface VaultWithdrawal {
  readonly slotIndex: number
  readonly ruleIndex: number
}

function collectVaultWithdrawals(): VaultWithdrawal[] {
  if (!getCompiledConfig()) return []
  const withdrawals: VaultWithdrawal[] = []
  let slotIndex: number | undefined = ZO_GetNextBagSlotIndex(BAG_FURNITURE_VAULT, undefined)
  while (slotIndex !== undefined) {
    const matched = findMatchedRule(BAG_FURNITURE_VAULT, slotIndex)
    if (matched !== undefined && isBackpackRequiredAction(matched.action, matched.destination)) {
      withdrawals.push({ slotIndex, ruleIndex: matched.ruleIndex })
    }
    slotIndex = ZO_GetNextBagSlotIndex(BAG_FURNITURE_VAULT, slotIndex)
  }
  table.sort(withdrawals, function (this: void, a, b): boolean {
    if (a.ruleIndex !== b.ruleIndex) return a.ruleIndex < b.ruleIndex
    return a.slotIndex < b.slotIndex
  })
  return withdrawals
}

export function executeVaultWithdrawals(
  ctx: BankSlotContext,
  maxOps: number,
  bankMoveItem: (
    sourceBag: number,
    sourceSlot: number,
    targetBag: number,
    targetSlot: number,
    stackCount: number
  ) => void
): { ops: number; withdrawnLinks: string[] } {
  const withdrawals = collectVaultWithdrawals()
  const withdrawnLinks: string[] = []
  const bufferSlots = getConfiguredBufferSlots()
  const initialFree = GetNumBagFreeSlots(BAG_BACKPACK)
  let ops = 0

  for (const w of withdrawals) {
    if (ops >= maxOps) break
    if (initialFree - ops <= bufferSlots) {
      d(
        `[${ADDON_NAME}] Stopping vault withdrawals — backpack buffer reached (${bufferSlots} reserved)`
      )
      break
    }
    const [stackCount] = GetSlotStackSize(BAG_FURNITURE_VAULT, w.slotIndex)
    if (stackCount === 0) continue
    const itemLink = GetItemLink(BAG_FURNITURE_VAULT, w.slotIndex, LINK_STYLE_BRACKETS)
    const itemId = GetItemLinkItemId(itemLink)
    const partial = bankFindPartialStackSlot(ctx, BAG_BACKPACK, itemId)
    if (partial !== undefined) {
      ctx.reserved.delete(slotKey(BAG_BACKPACK, partial))
    }
    const targetSlot = partial ?? bankFindEmptyBackpackSlot(ctx)
    if (targetSlot === undefined) {
      d(`[${ADDON_NAME}] Backpack is full, stopping vault withdraw`)
      break
    }
    withdrawnLinks.push(stackCount > 1 ? `${itemLink} x${stackCount}` : itemLink)
    bankMoveItem(BAG_FURNITURE_VAULT, w.slotIndex, BAG_BACKPACK, targetSlot, stackCount)
    ctx.vacated.set(slotKey(BAG_FURNITURE_VAULT, w.slotIndex), true)
    ops++
  }

  return { ops, withdrawnLinks }
}

const VAULT_DEPOSIT_NS = `${ADDON_NAME}_VaultDeposit`
const VAULT_DEPOSIT_WATCHDOG_MS = 2000
const MAX_VAULT_DEPOSIT_RETRIES = 3

let vaultDepositRunning = false

export function isVaultDepositRunning(): boolean {
  return vaultDepositRunning
}

function findNextVaultDepositSlot(): number | undefined {
  let found: number | undefined
  forEachPendingAction(function (this: void, bagId, slotIndex, action, destination): undefined {
    if (found !== undefined) return
    if (bagId !== BAG_BACKPACK) return
    if (action !== "move-to" || destination !== "furniture-vault") return
    const [stackCount] = GetSlotStackSize(BAG_BACKPACK, slotIndex)
    if (stackCount === 0) return
    if (!CanStowFurnitureItem(BAG_BACKPACK, slotIndex)) return
    found = slotIndex
  })
  return found
}

export function startVaultDepositChain(
  bankMoveItem: (
    sourceBag: number,
    sourceSlot: number,
    targetBag: number,
    targetSlot: number,
    stackCount: number
  ) => void
): undefined {
  if (vaultDepositRunning) return
  if (findNextVaultDepositSlot() === undefined) return
  vaultDepositRunning = true

  const depositedLinks: string[] = []
  let inFlightSlot: number | undefined
  let inFlightLink: string | undefined
  let retries = 0

  function cleanup(): undefined {
    EVENT_MANAGER.UnregisterForEvent(VAULT_DEPOSIT_NS, EVENT_INVENTORY_SINGLE_SLOT_UPDATE)
    EVENT_MANAGER.UnregisterForEvent(VAULT_DEPOSIT_NS, EVENT_CLOSE_BANK)
    vaultDepositRunning = false
    if (depositedLinks.length > 0) {
      reportAction("Deposited to furniture vault", depositedLinks)
    }
  }

  function issueNext(): undefined {
    if (!vaultDepositRunning) return
    const slot = findNextVaultDepositSlot()
    if (slot === undefined) {
      cleanup()
      return
    }
    const targetSlot = FindFirstEmptySlotInBag(BAG_FURNITURE_VAULT)
    if (targetSlot === undefined) {
      d(`[${ADDON_NAME}] Furniture vault is full, stopping deposit`)
      cleanup()
      return
    }
    const [stackCount] = GetSlotStackSize(BAG_BACKPACK, slot)
    const itemLink = GetItemLink(BAG_BACKPACK, slot, LINK_STYLE_BRACKETS)
    inFlightSlot = slot
    inFlightLink = stackCount > 1 ? `${itemLink} x${stackCount}` : itemLink
    retries = 0
    bankMoveItem(BAG_BACKPACK, slot, BAG_FURNITURE_VAULT, targetSlot, stackCount)
    scheduleWatchdog(slot)
  }

  function onMoveConfirmed(): undefined {
    if (!vaultDepositRunning) return
    if (inFlightSlot === undefined) return
    const [srcStack] = GetSlotStackSize(BAG_BACKPACK, inFlightSlot)
    if (srcStack > 0) return
    if (inFlightLink !== undefined) depositedLinks.push(inFlightLink)
    clearPendingAction(BAG_BACKPACK, inFlightSlot)
    inFlightSlot = undefined
    inFlightLink = undefined
    issueNext()
  }

  function scheduleWatchdog(expectSlot: number): undefined {
    zo_callLater(function (this: void): undefined {
      if (!vaultDepositRunning) return
      if (inFlightSlot === undefined || inFlightSlot !== expectSlot) return
      const [srcStack] = GetSlotStackSize(BAG_BACKPACK, inFlightSlot)
      if (srcStack === 0) {
        onMoveConfirmed()
        return
      }
      retries++
      if (retries > MAX_VAULT_DEPOSIT_RETRIES) {
        d(`[${ADDON_NAME}] Vault deposit stalled at backpack slot ${inFlightSlot}, stopping`)
        cleanup()
        return
      }
      const targetSlot = FindFirstEmptySlotInBag(BAG_FURNITURE_VAULT)
      if (targetSlot === undefined) {
        cleanup()
        return
      }
      bankMoveItem(BAG_BACKPACK, inFlightSlot, BAG_FURNITURE_VAULT, targetSlot, srcStack)
      scheduleWatchdog(expectSlot)
    }, VAULT_DEPOSIT_WATCHDOG_MS)
  }

  EVENT_MANAGER.RegisterForEvent(
    VAULT_DEPOSIT_NS,
    EVENT_INVENTORY_SINGLE_SLOT_UPDATE,
    function (
      this: void,
      _event: number,
      bagId: number,
      _slotIndex: number,
      _isNewItem: boolean,
      _itemSoundCategory: number,
      _inventoryUpdateReason: number,
      _stackCountChange: number,
      _triggeredByCharacterName: string | undefined,
      _triggeredByDisplayName: string | undefined,
      isLastUpdateForMessage: boolean
    ): undefined {
      if (bagId !== BAG_FURNITURE_VAULT) return
      if (!isLastUpdateForMessage) return
      onMoveConfirmed()
    }
  )
  EVENT_MANAGER.RegisterForEvent(
    VAULT_DEPOSIT_NS,
    EVENT_CLOSE_BANK,
    function (this: void): undefined {
      cleanup()
    }
  )

  issueNext()
}
