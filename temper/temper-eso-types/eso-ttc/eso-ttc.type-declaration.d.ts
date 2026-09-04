interface TtcPriceInfo {
  Avg?: number
  Max?: number
  Min?: number
  EntryCount?: number
  AmountCount?: number
  SuggestedPrice?: number
  SaleAvg?: number
  SaleEntryCount?: number
  SaleAmountCount?: number
}

interface TamrielTradeCentrePriceApi {
  GetPriceInfo: (itemLink: string) => TtcPriceInfo | undefined
}

declare const TamrielTradeCentrePrice: TamrielTradeCentrePriceApi | undefined

declare const TamrielTradeCentre: object | undefined
