interface ArkadiusTradeToolsSalesItemStats {
  avgPrice?: number
  [key: string]: unknown
}

interface ArkadiusTradeToolsSalesApi {
  GetItemSalesStats: (
    this: ArkadiusTradeToolsSalesApi,
    itemId: number,
    itemQuality: number
  ) => ArkadiusTradeToolsSalesItemStats | undefined
}

declare const ArkadiusTradeToolsSales: ArkadiusTradeToolsSalesApi | undefined

interface ArkadiusTradeToolsSalesModule {
  addMenuItems?: unknown
  GetAveragePricePerItem: (
    this: ArkadiusTradeToolsSalesModule,
    itemLink: string,
    sinceTimestamp: number
  ) => number | undefined
}

interface ArkadiusTradeToolsApi {
  Modules?: { Sales?: ArkadiusTradeToolsSalesModule }
}

declare const ArkadiusTradeTools: ArkadiusTradeToolsApi | undefined
