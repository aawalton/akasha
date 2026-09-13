import {
  computeUnattributedMs,
  emptyNetWorthStats,
  emptySettlingStats,
  foldBracket,
  foldNetWorthScan,
} from "akasha/temper/items-addon/modules/inventory-bank-trace-fold/inventory-bank-trace-fold.module.code.ts"
import type {
  BankTrace,
  BankTraceCraftingStats,
  BankTracePacedDispatch,
  VenueKind,
} from "akasha/temper/items-addon/modules/inventory-bank-trace-types/inventory-bank-trace-types.module.code.ts"
import { getSavedVariables } from "akasha/temper/items-addon/modules/inventory-saved-variables-ref/inventory-saved-variables-ref.module.code.ts"
import { isObjectRecord } from "akasha/utils/narrow/modules/is-object-record/is-object-record.module.code.ts"

const TRAILING_SCAN_WINDOW_MS = 5000

const BANK_TRACE_RING_MAX = 10

let activeTrace: BankTrace | undefined
let openAnchorMs = 0
let closedAtMs: number | undefined
let openHandlerDone = false
let craftingAtOpen: BankTraceCraftingStats | undefined
let visitGeneration = 0

export function beginBankTrace(bankingBag: number): undefined {
  beginVenueTrace("bank", bankingBag)
}

export function beginVenueTrace(venue: VenueKind, bankingBag: number): undefined {
  openAnchorMs = GetGameTimeMilliseconds()
  closedAtMs = undefined
  openHandlerDone = false
  visitGeneration += 1
  craftingAtOpen = readCraftingSlotHandlerStats()
  const trace: BankTrace = {
    schemaVersion: 5,
    timestamp: GetTimeStamp(),
    venue,
    bankingBag,
    netWorth: emptyNetWorthStats(),
    settling: emptySettlingStats(),
  }
  activeTrace = trace
  const sv = getSavedVariables()
  if (sv.diagnostics === undefined) sv.diagnostics = {}
  if (venue === "bank") {
    sv.diagnostics.lastBankTrace = trace
    sv.diagnostics.bankTraces = keptWith(sv.diagnostics.bankTraces, trace)
    return
  }
  sv.diagnostics.storeTraces = keptWith(sv.diagnostics.storeTraces, trace)
}

function keptWith(kept: BankTrace[] | undefined, trace: BankTrace): BankTrace[] {
  const ring = kept ?? []
  ring[ring.length] = trace
  while (ring.length > BANK_TRACE_RING_MAX) {
    ring.splice(0, 1)
  }
  return ring
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

export function finishVenueOpenHandler(): undefined {
  finishBankOpenHandler()
}

export function markVenueClosed(): undefined {
  markBankClosed()
}

export function markBankClosed(): undefined {
  if (activeTrace === undefined) return
  closedAtMs = GetGameTimeMilliseconds()
  activeTrace.openToCloseMs = closedAtMs - openAnchorMs
  refreshCraftingAndRemainder(activeTrace)
  const generation = visitGeneration
  zo_callLater(function (this: void): undefined {
    if (generation !== visitGeneration) return
    activeTrace = undefined
  }, TRAILING_SCAN_WINDOW_MS)
}

export function releaseBankTrace(): undefined {
  activeTrace = undefined
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
