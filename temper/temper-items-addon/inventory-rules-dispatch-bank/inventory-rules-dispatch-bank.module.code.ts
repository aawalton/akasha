import {
  recordBankMoves,
  recordBankPhaseMs,
} from "../inventory-bank-trace/inventory-bank-trace.module.code.ts"
import { HOUSE_BANK_BAGS } from "../inventory-constants/inventory-constants.module.code.ts"
import { moveItem } from "../inventory-move-item/inventory-move-item.module.code.ts"
import { reportAction } from "../inventory-rules-core-report/inventory-rules-core-report.module.code.ts"
import { dispatchCurrencyRules } from "../inventory-rules-dispatch-bank-currency/inventory-rules-dispatch-bank-currency.module.code.ts"
import { executeBankDeposits } from "../inventory-rules-dispatch-bank-deposits/inventory-rules-dispatch-bank-deposits.module.code.ts"
import { startPacedBankChain } from "../inventory-rules-dispatch-bank-paced/inventory-rules-dispatch-bank-paced.module.code.ts"
import type { PacedBankStep } from "../inventory-rules-dispatch-bank-paced-confirm/inventory-rules-dispatch-bank-paced-confirm.module.code.ts"
import { freezeStockBackpackCounts } from "../inventory-rules-dispatch-bank-reconcile/inventory-rules-dispatch-bank-reconcile.module.code.ts"
import type { BankSlotContext } from "../inventory-rules-dispatch-bank-slots/inventory-rules-dispatch-bank-slots.module.code.ts"
import {
  executeVaultWithdrawals,
  startVaultDepositChain,
} from "../inventory-rules-dispatch-bank-vault/inventory-rules-dispatch-bank-vault.module.code.ts"
import { executeBankWithdrawals } from "../inventory-rules-dispatch-bank-withdrawals/inventory-rules-dispatch-bank-withdrawals.module.code.ts"
export const MAX_OPS = 50

export let dispatchingBank = false

export function isDispatchingBank(): boolean {
  return dispatchingBank
}

export function onOpenBank(): undefined {
  const bankingBag = GetBankingBag()

  if (bankingBag === BAG_FURNITURE_VAULT) {
    dispatchingBank = true
    const vaultCtx: BankSlotContext = {
      reserved: new LuaMap<number, true>(),
      vacated: new LuaMap<number, true>(),
      isBank: false,
      isHouseStorage: false,
      bankingBag,
      currentChestId: undefined,
    }
    const vaultStart = GetGameTimeMilliseconds()
    const { withdrawnLinks } = executeVaultWithdrawals(vaultCtx, MAX_OPS, moveItem)
    recordBankPhaseMs("withdraw", GetGameTimeMilliseconds() - vaultStart)
    recordBankMoves(withdrawnLinks.length, 0)
    if (withdrawnLinks.length > 0) {
      reportAction("Withdrew from furniture vault", withdrawnLinks)
    }
    dispatchingBank = false
    startVaultDepositChain(moveItem)
    return
  }

  dispatchingBank = true

  const currentCharId = tostring(GetCurrentCharacterId())

  const isBank = bankingBag === BAG_BANK || bankingBag === BAG_SUBSCRIBER_BANK
  const isHouseStorage = HOUSE_BANK_BAGS.indexOf(bankingBag) !== -1
  const currentChestId = isHouseStorage ? tostring(GetCollectibleForBag(bankingBag)) : undefined

  const ctx: BankSlotContext = {
    reserved: new LuaMap<number, true>(),
    vacated: new LuaMap<number, true>(),
    isBank,
    isHouseStorage,
    bankingBag,
    currentChestId,
  }

  const frozenStock = freezeStockBackpackCounts()

  const queue: PacedBankStep[] = []
  queue.push({
    kind: "effect",
    run: function (this: void): undefined {
      dispatchCurrencyRules()
    },
  })
  const enqueue = function (
    this: void,
    sourceBag: number,
    sourceSlot: number,
    targetBag: number,
    targetSlot: number,
    count: number
  ): undefined {
    queue.push({ kind: "move", sourceBag, sourceSlot, targetBag, targetSlot, count })
  }

  const withdrawStart = GetGameTimeMilliseconds()
  const { ops: phase1Ops, withdrawnLinks } = executeBankWithdrawals(
    ctx,
    currentCharId,
    frozenStock,
    MAX_OPS,
    enqueue
  )
  recordBankPhaseMs("withdraw", GetGameTimeMilliseconds() - withdrawStart)

  const storageLabel = isBank ? "bank" : "storage"

  if (withdrawnLinks.length > 0) {
    reportAction(`Withdrew from ${storageLabel}`, withdrawnLinks)
  }

  const depositStart = GetGameTimeMilliseconds()
  const { depositedLinks } = executeBankDeposits(
    ctx,
    currentCharId,
    frozenStock,
    phase1Ops,
    MAX_OPS,
    enqueue
  )
  recordBankPhaseMs("deposit", GetGameTimeMilliseconds() - depositStart)
  recordBankMoves(withdrawnLinks.length, depositedLinks.length)

  if (depositedLinks.length > 0) {
    reportAction(`Deposited to ${storageLabel}`, depositedLinks)
  }

  dispatchingBank = false
  startPacedBankChain(queue, moveItem)
}
