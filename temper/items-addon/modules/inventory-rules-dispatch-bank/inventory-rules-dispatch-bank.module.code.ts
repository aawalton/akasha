import {
  currentVisitGeneration,
  recordBankMoves,
  recordBankPhaseMs,
  recordStacking,
} from "akasha/temper/items-addon/modules/inventory-bank-trace/inventory-bank-trace.module.code.ts"
import type { BankTraceStackingCount } from "akasha/temper/items-addon/modules/inventory-bank-trace-types/inventory-bank-trace-types.module.code.ts"
import { getInventoryConfig } from "akasha/temper/items-addon/modules/inventory-config/inventory-config.module.code.ts"
import { HOUSE_BANK_BAGS } from "akasha/temper/items-addon/modules/inventory-constants/inventory-constants.module.code.ts"
import { moveItem } from "akasha/temper/items-addon/modules/inventory-move-item/inventory-move-item.module.code.ts"
import { reportAction } from "akasha/temper/items-addon/modules/inventory-rules-core-report/inventory-rules-core-report.module.code.ts"
import { dispatchCurrencyRules } from "akasha/temper/items-addon/modules/inventory-rules-dispatch-bank-currency/inventory-rules-dispatch-bank-currency.module.code.ts"
import { executeBankDeposits } from "akasha/temper/items-addon/modules/inventory-rules-dispatch-bank-deposits/inventory-rules-dispatch-bank-deposits.module.code.ts"
import { startPacedBankChain } from "akasha/temper/items-addon/modules/inventory-rules-dispatch-bank-paced/inventory-rules-dispatch-bank-paced.module.code.ts"
import type { PacedBankStep } from "akasha/temper/items-addon/modules/inventory-rules-dispatch-bank-paced-confirm/inventory-rules-dispatch-bank-paced-confirm.module.code.ts"
import { freezeStockBackpackCounts } from "akasha/temper/items-addon/modules/inventory-rules-dispatch-bank-reconcile/inventory-rules-dispatch-bank-reconcile.module.code.ts"
import type { BankSlotContext } from "akasha/temper/items-addon/modules/inventory-rules-dispatch-bank-slots/inventory-rules-dispatch-bank-slots.module.code.ts"
import {
  executeVaultWithdrawals,
  startVaultDepositChain,
} from "akasha/temper/items-addon/modules/inventory-rules-dispatch-bank-vault/inventory-rules-dispatch-bank-vault.module.code.ts"
import { executeBankWithdrawals } from "akasha/temper/items-addon/modules/inventory-rules-dispatch-bank-withdrawals/inventory-rules-dispatch-bank-withdrawals.module.code.ts"
import { refreshBackpackActions } from "akasha/temper/items-addon/modules/inventory-rules-eval/inventory-rules-eval.module.code.ts"

const MAX_VAULT_WITHDRAW_OPS = 50

let dispatchingBank = false

export function isDispatchingBank(): boolean {
  return dispatchingBank
}

const STACK_ARRIVAL_MS = 1500

const STACK_SETTLE_MS = 2000

function partialStackCount(this: void, bag: number): number {
  let partials = 0
  const bagSize = GetBagSize(bag)
  for (let slot = 0; slot < bagSize; slot++) {
    const [stack, maxStack] = GetSlotStackSize(bag, slot)
    if (stack > 0 && maxStack > 1 && stack < maxStack) partials++
  }
  return partials
}

function bagsVisitStacks(this: void, bankingBag: number): number[] {
  if (bankingBag === BAG_BANK || bankingBag === BAG_SUBSCRIBER_BANK) {
    if (IsESOPlusSubscriber()) return [BAG_BACKPACK, BAG_BANK, BAG_SUBSCRIBER_BANK]
    return [BAG_BACKPACK, BAG_BANK]
  }
  return [BAG_BACKPACK, bankingBag]
}

function stackVisitedBags(this: void, bankingBag: number): undefined {
  if (getInventoryConfig().backpack?.autoStack === false) {
    recordStacking({ ran: false, skipped: "the autoStack setting is off" })
    return
  }
  const bags = bagsVisitStacks(bankingBag)
  const generation = currentVisitGeneration()
  zo_callLater(function (this: void): undefined {
    const counts: BankTraceStackingCount[] = []
    for (const bag of bags) {
      counts.push({ bag, partialsBefore: partialStackCount(bag) })
      StackBag(bag)
    }
    recordStacking({ ran: true, bags, counts }, generation)
    zo_callLater(function (this: void): undefined {
      const settled: BankTraceStackingCount[] = []
      for (const one of counts) {
        settled.push({
          bag: one.bag,
          partialsBefore: one.partialsBefore,
          partialsAfter: partialStackCount(one.bag),
        })
      }
      recordStacking({ ran: true, bags, counts: settled }, generation)
    }, STACK_SETTLE_MS)
  }, STACK_ARRIVAL_MS)
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
    const { withdrawnLinks } = executeVaultWithdrawals(vaultCtx, MAX_VAULT_WITHDRAW_OPS, moveItem)
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

  refreshBackpackActions()

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
  const { withdrawnLinks } = executeBankWithdrawals(ctx, currentCharId, frozenStock, enqueue)
  recordBankPhaseMs("withdraw", GetGameTimeMilliseconds() - withdrawStart)

  const storageLabel = isBank ? "bank" : "storage"

  if (withdrawnLinks.length > 0) {
    reportAction(`Withdrew from ${storageLabel}`, withdrawnLinks)
  }

  const depositStart = GetGameTimeMilliseconds()
  const { depositedLinks } = executeBankDeposits(ctx, currentCharId, frozenStock, enqueue)
  recordBankPhaseMs("deposit", GetGameTimeMilliseconds() - depositStart)
  recordBankMoves(withdrawnLinks.length, depositedLinks.length)

  if (depositedLinks.length > 0) {
    reportAction(`Deposited to ${storageLabel}`, depositedLinks)
  }

  dispatchingBank = false
  startPacedBankChain(queue, moveItem, function (this: void): undefined {
    stackVisitedBags(bankingBag)
  })
}
