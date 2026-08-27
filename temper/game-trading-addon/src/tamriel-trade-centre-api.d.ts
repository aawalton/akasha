interface TtcPriceInfo {
  SuggestedPrice?: number
  Avg?: number
}

interface TamrielTradeCentrePriceApi {
  GetPriceInfo(itemLink: string): TtcPriceInfo | undefined
}

declare const TamrielTradeCentrePrice: TamrielTradeCentrePriceApi | undefined
