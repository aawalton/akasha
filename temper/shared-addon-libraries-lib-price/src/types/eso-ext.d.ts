declare const ZO_ONE_DAY_IN_SECONDS: number

declare const FURC_CRAFTING: number
declare const FURC_VENDOR: number
declare const FURC_PVP: number
declare const FURC_CROWN: number
declare const FURC_LUXURY: number
declare const FURC_ROLIS: number
declare const FURC_DROP: number
declare const FURC_JUSTICE: number
declare const FURC_RUMOUR: number
declare const FURC_FESTIVAL_DROP: number

interface MasterMerchantGlobal {
  isInitialized?: boolean
  GetTooltipStats(
    this: MasterMerchantGlobal,
    itemLink: string,
    requireSales: boolean,
    something: boolean
  ): { [field: string]: unknown } | undefined
  vendor_price_table?: Record<string, Record<string, number | undefined> | undefined>
}

declare const MasterMerchant: MasterMerchantGlobal | undefined

interface ArkadiusSalesModule {
  addMenuItems?: unknown
  GetAveragePricePerItem(
    this: ArkadiusSalesModule,
    itemLink: string,
    sinceTimestamp: number
  ): number | undefined
}

interface ArkadiusTradeToolsGlobal {
  Modules?: { Sales?: ArkadiusSalesModule }
}

declare const ArkadiusTradeTools: ArkadiusTradeToolsGlobal | undefined

interface TamrielTradeCentrePriceGlobal {
  GetPriceInfo(
    this: TamrielTradeCentrePriceGlobal,
    itemLink: string
  ): { [field: string]: unknown } | undefined
}

declare const TamrielTradeCentrePrice: TamrielTradeCentrePriceGlobal | undefined

interface FurCRecipe {
  origin: number
  version: number
  blueprint?: number
  [field: string]: unknown
}

interface FurCPriceLeaf {
  itemPrice?: number
}

type FurCItemMap = Record<string, FurCPriceLeaf | undefined>

type FurCVendorTree = Record<string, Record<string, FurCItemMap | undefined> | undefined>

interface FurCGlobal {
  Utils: {
    GetItemId(this: void, itemLink: string): number
    GetItemLink(this: void, id: number): string
  }
  Find(this: void, itemLink: string): FurCRecipe | undefined
  GetItemDescription(this: void, itemId: number, recipe: FurCRecipe): string
  Rolis: Record<string, Record<string, number | undefined> | undefined>
  Faustina: Record<string, Record<string, number | undefined> | undefined>
  LuxuryFurnisher: Record<string, Record<string, FurCPriceLeaf | undefined> | undefined>
  AchievementVendors: Record<string, FurCVendorTree | undefined>
  MiscItemSources: Record<
    string,
    | Record<string, Record<string, number | string | FurCPriceLeaf | undefined> | undefined>
    | undefined
  >
  PVP: Record<string, FurCVendorTree | undefined>
}

declare const FurC: FurCGlobal | undefined
