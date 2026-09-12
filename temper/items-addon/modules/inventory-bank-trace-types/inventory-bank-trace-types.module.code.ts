export interface BankTraceNetWorth {
  walkCount: number
  walkTotalMs: number
  walkMaxMs: number
}

export interface BankTraceBracket {
  count: number
  totalMs: number
  maxMs: number
}

export interface BankTraceCraftingStats {
  count: number
  totalMs: number
}

export interface BankTraceSettling {
  evaluateRules: BankTraceBracket
  actionsChanged: BankTraceBracket
  bankPanelRefresh: BankTraceBracket
  slotUpdate: BankTraceBracket
  fullUpdate: BankTraceBracket
  scanCraftBag: BankTraceBracket
  crafting?: BankTraceCraftingStats
  unattributedMs?: number
}

export interface BankTracePacedDispatch {
  planned: number
  issued: number
  confirmed: number
  retries: number
  spanMs: number
  abortedEarly: boolean
}

export interface BankTrace {
  schemaVersion: number
  timestamp: number
  bankingBag: number
  scanBankBagsMs?: number
  refreshPanelMs?: number
  withdrawMs?: number
  depositMs?: number
  withdrawCount?: number
  depositCount?: number
  moveCount?: number
  openHandlerMs?: number
  openToCloseMs?: number
  netWorth: BankTraceNetWorth
  settling: BankTraceSettling
  pacedDispatch?: BankTracePacedDispatch
}
