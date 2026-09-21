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

interface TtcPriceTable {
  Data?: object
  TimeStamp?: number
}

interface TamrielTradeCentrePriceApi {
  GetPriceInfo: (itemLink: string) => TtcPriceInfo | undefined
  PriceTable?: TtcPriceTable
}

declare const TamrielTradeCentrePrice: TamrielTradeCentrePriceApi | undefined

declare const TamrielTradeCentre: object | undefined
