import { isObjectRecord } from "@akasha/utils-narrow/is-object-record"
import {
  computeUnattributedMs,
  emptyNetWorthStats,
  emptySettlingStats,
  foldBracket,
  foldNetWorthScan,
} from "../inventory-bank-trace-fold/inventory-bank-trace-fold.module.code.ts"
import type {
  BankTrace,
  BankTraceCraftingStats,
  BankTracePacedDispatch,
} from "../inventory-bank-trace-types/inventory-bank-trace-types.module.code.ts"
import { getSavedVariables } from "../inventory-saved-variables-ref/inventory-saved-variables-ref.module.code.ts"

const TRAILING_SCAN_WINDOW_MS = 5000

let activeTrace: BankTrace | undefined
let openAnchorMs = 0
let closedAtMs: number | undefined
let openHandlerDone = false
let craftingAtOpen: BankTraceCraftingStats | undefined

export function beginBankTrace(bankingBag: number): undefined {
  openAnchorMs = GetGameTimeMilliseconds()
  closedAtMs = undefined
  openHandlerDone = false
  craftingAtOpen = readCraftingSlotHandlerStats()
  const trace: BankTrace = {
    schemaVersion: 4,
    timestamp: GetTimeStamp(),
    bankingBag,
    netWorth: emptyNetWorthStats(),
    settling: emptySettlingStats(),
  }
  activeTrace = trace
  const sv = getSavedVariables()
  if (sv.diagnostics === undefined) sv.diagnostics = {}
  sv.diagnostics.lastBankTrace = trace
}

export type BankTracePhase = "scanBankBags" | "refreshPanel" | "withdraw" | "deposit"

export function recordBankPhaseMs(phase: BankTracePhase, ms: number): undefined {
  if (activeTrace === undefined) return
  if (phase === "scanBankBags") {
    activeTrace.scanBankBagsMs = ms
  } else if (phase === "refreshPanel") {
    activeTrace.refreshPanelMs = ms
  } else if (phase === "withdraw") {
    activeTrace.withdrawMs = ms
  } else {
    activeTrace.depositMs = ms
  }
}

export function recordBankMoves(withdrawCount: number, depositCount: number): undefined {
  if (activeTrace === undefined) return
  activeTrace.withdrawCount = withdrawCount
  activeTrace.depositCount = depositCount
  activeTrace.moveCount = withdrawCount + depositCount
}

export function recordPacedDispatch(stats: BankTracePacedDispatch): undefined {
  if (activeTrace === undefined) return
  activeTrace.pacedDispatch = {
    planned: stats.planned,
    issued: stats.issued,
    confirmed: stats.confirmed,
    retries: stats.retries,
    spanMs: stats.spanMs,
    abortedEarly: stats.abortedEarly,
  }
}

export function finishBankOpenHandler(): undefined {
  if (activeTrace === undefined) return
  activeTrace.openHandlerMs = GetGameTimeMilliseconds() - openAnchorMs
  openHandlerDone = true
}

export function markBankClosed(): undefined {
  if (activeTrace === undefined) return
  closedAtMs = GetGameTimeMilliseconds()
  activeTrace.openToCloseMs = closedAtMs - openAnchorMs
  refreshCraftingAndRemainder(activeTrace)
}

function pastTrailingWindow(): boolean {
  return (
    closedAtMs !== undefined && GetGameTimeMilliseconds() - closedAtMs > TRAILING_SCAN_WINDOW_MS
  )
}

export function recordNetWorthScanMs(scanMs: number): undefined {
  if (activeTrace === undefined) return
  if (pastTrailingWindow()) {
    activeTrace = undefined
    return
  }
  activeTrace.netWorth = foldNetWorthScan(activeTrace.netWorth, scanMs)
  if (closedAtMs !== undefined) refreshCraftingAndRemainder(activeTrace)
}

export type SettlingBracketKey =
  | "evaluateRules"
  | "actionsChanged"
  | "bankPanelRefresh"
  | "slotUpdate"
  | "fullUpdate"
  | "scanCraftBag"

export function recordSettlingMs(key: SettlingBracketKey, ms: number): undefined {
  if (activeTrace === undefined) return
  if (!openHandlerDone) return
  if (pastTrailingWindow()) {
    activeTrace = undefined
    return
  }
  activeTrace.settling[key] = foldBracket(activeTrace.settling[key], ms)
  if (closedAtMs !== undefined) refreshCraftingAndRemainder(activeTrace)
}

function refreshCraftingAndRemainder(trace: BankTrace): undefined {
  const craftingNow = readCraftingSlotHandlerStats()
  if (craftingNow !== undefined && craftingAtOpen !== undefined) {
    trace.settling.crafting = {
      count: craftingNow.count - craftingAtOpen.count,
      totalMs: craftingNow.totalMs - craftingAtOpen.totalMs,
    }
  }
  if (trace.openToCloseMs === undefined) return
  const settling = trace.settling
  trace.settling.unattributedMs = computeUnattributedMs({
    openToCloseMs: trace.openToCloseMs,
    openHandlerMs: trace.openHandlerMs,
    netWorthScanTotalMs: trace.netWorth.walkTotalMs,
    settlingTotalsMs:
      settling.evaluateRules.totalMs +
      settling.actionsChanged.totalMs +
      settling.bankPanelRefresh.totalMs +
      settling.slotUpdate.totalMs +
      settling.fullUpdate.totalMs +
      settling.scanCraftBag.totalMs,
    craftingTotalMs: settling.crafting?.totalMs ?? 0,
  })
}

function readCraftingSlotHandlerStats(): BankTraceCraftingStats | undefined {
  const g: Record<string, unknown> = globalThis
  const fn = g["TemperCrafting_GetSlotHandlerStats"]
  if (typeof fn !== "function") return undefined
  const stats: unknown = fn()
  if (!isObjectRecord(stats)) return undefined
  const count = stats["count"]
  const totalMs = stats["totalMs"]
  if (typeof count !== "number" || typeof totalMs !== "number") return undefined
  return { count, totalMs }
}
