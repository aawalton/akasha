import type { BankTraceBracket, BankTraceNetWorth, BankTraceSettling } from "./bank-trace-types"

export function emptyNetWorthStats(): BankTraceNetWorth {
  return { walkCount: 0, walkTotalMs: 0, walkMaxMs: 0 }
}

export function foldNetWorthWalk(stats: BankTraceNetWorth, walkMs: number): BankTraceNetWorth {
  return {
    walkCount: stats.walkCount + 1,
    walkTotalMs: stats.walkTotalMs + walkMs,
    walkMaxMs: walkMs > stats.walkMaxMs ? walkMs : stats.walkMaxMs,
  }
}

export function emptyBracket(): BankTraceBracket {
  return { count: 0, totalMs: 0, maxMs: 0 }
}

export function foldBracket(bracket: BankTraceBracket, ms: number): BankTraceBracket {
  return {
    count: bracket.count + 1,
    totalMs: bracket.totalMs + ms,
    maxMs: ms > bracket.maxMs ? ms : bracket.maxMs,
  }
}

export function emptySettlingStats(): BankTraceSettling {
  return {
    evaluateRules: emptyBracket(),
    actionsChanged: emptyBracket(),
    bankPanelRefresh: emptyBracket(),
    slotUpdate: emptyBracket(),
    fullUpdate: emptyBracket(),
    scanCraftBag: emptyBracket(),
  }
}

export function computeUnattributedMs(parts: {
  openToCloseMs: number
  openHandlerMs: number | undefined
  netWorthWalkTotalMs: number
  settlingTotalsMs: number
  craftingTotalMs: number
}): number {
  const remainder =
    parts.openToCloseMs -
    (parts.openHandlerMs ?? 0) -
    parts.netWorthWalkTotalMs -
    parts.settlingTotalsMs -
    parts.craftingTotalMs
  return remainder > 0 ? remainder : 0
}
