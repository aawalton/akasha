import { recordBankMoves, recordBankPhaseMs } from "./bank-trace"
import { HOUSE_BANK_BAGS } from "./constants"
import { reportAction } from "./rules-core-report"
import { dispatchCurrencyRules } from "./rules-dispatch-bank-currency"
import { executeBankDeposits } from "./rules-dispatch-bank-deposits"
import { startPacedBankChain } from "./rules-dispatch-bank-paced"
import { type PacedBankStep } from "./rules-dispatch-bank-paced-confirm"
import { freezeStockBackpackCounts } from "./rules-dispatch-bank-reconcile"
import type { BankSlotContext } from "./rules-dispatch-bank-slots"
import { executeVaultWithdrawals, startVaultDepositChain } from "./rules-dispatch-bank-vault"
import { executeBankWithdrawals } from "./rules-dispatch-bank-withdrawals"
export const MAX_OPS = 50

export let _dispatchingBank = false

export function isDispatchingBank(): boolean {
  return _dispatchingBank
}

export function moveItem(
  sourceBag: number,
  sourceSlot: number,
  targetBag: number,
  targetSlot: number,
  stackCount: number
): undefined {
  if (IsProtectedFunction("RequestMoveItem")) {
    CallSecureProtected("RequestMoveItem", sourceBag, sourceSlot, targetBag, targetSlot, stackCount)
  } else {
    RequestMoveItem(sourceBag, sourceSlot, targetBag, targetSlot, stackCount)
  }
}

export function onOpenBank(): undefined {
  const bankingBag = GetBankingBag()

  if (bankingBag === BAG_FURNITURE_VAULT) {
    _dispatchingBank = true
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
    _dispatchingBank = false
    startVaultDepositChain(moveItem)
    return
  }

  _dispatchingBank = true

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

  _dispatchingBank = false
  startPacedBankChain(queue, moveItem)
}
