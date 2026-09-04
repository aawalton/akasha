export interface NetWorthBreakdownEntry {
  currency: string
  label: string
  rawAmount: number
  goldEquivalent: number
  rate: number
}

export interface NetWorthBreakdown {
  currencies: readonly NetWorthBreakdownEntry[]
}

export interface NetWorthResult {
  itemValue: number
  goldAmount: number
  currencyGoldValue: number
  netWorth: number
  breakdown: NetWorthBreakdown
}
