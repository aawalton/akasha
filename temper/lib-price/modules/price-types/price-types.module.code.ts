export type OptionalNumber = number | undefined

export type GlobalTable = Record<string, unknown>

export type SourceSet = Record<string, boolean>

export interface ItemPriceRecord {
  itemPrice?: number
}

export interface RawPrice {
  [field: string]: unknown
}

export interface NormalizedPrice {
  type: string
  count?: number
  days?: number
  source?: string
  saleCount?: number
  [currencyOrField: string]: unknown
}

export interface FurCRecipeArray {
  origin: number
  version: number
  blueprint?: number
  [field: string]: unknown
}

export interface IngredientRow {
  ingr_ct: number
  ingr_name: string
  ingr_link: string
  ingr_gold_ea?: number
  ingr_gold_source_key?: string
  ingr_gold_field_name?: string
}

export type FurCSubReturn = LuaMultiReturn<
  [string | undefined, number | undefined, string | undefined, IngredientRow[] | undefined]
>

export type PriceGoldReturn = LuaMultiReturn<
  [number | undefined, string | undefined, string | undefined]
>

export type CanPriceFn = (this: void) => boolean | undefined
export type PriceFn = (this: void, itemLink: string) => RawPrice | undefined
export type NormalizeFn = (this: void, raw: RawPrice) => NormalizedPrice[] | undefined

export type DispatchEntry = [PriceFn, CanPriceFn?]

export interface SpreadMetric {
  sources: SourceSet | string[]
  value?: number
  count?: number
  sum?: number
}

export interface LibPriceTable {
  day_ct_short: number
  day_ct_long: number
  MM: string
  ATT: string
  FURC: string
  TTC: string
  CROWN: string
  ROLIS: string
  NPC: string
  CURRENCY_TYPE_GOLD: string
  CURRENCY_TYPE_WRIT_VOUCHERS: string
  CURRENCY_TYPE_ALLIANCE_POINTS: string
  CURRENCY_TYPE_CROWNS: string
  CURRENCY_TYPE_TELVAR_STONES: string
  PRICE_BID: string
  PRICE_ASK: string
  PRICE_SALE: string
  PRICE_AVG: string
  LINK_ATTUNABLE_BS: string
  LINK_ATTUNABLE_CL: string
  LINK_ATTUNABLE_WW: string
  LINK_ATTUNABLE_JW: string
  CACHE_DUR_SECONDS: number

  SOURCE_LIST?: string[]
  CURRENCY_LIST?: Record<string, number>
  PRICE_TYPES?: string[]
  DISPATCH?: Record<string, DispatchEntry>
  NORMALIZE?: Record<string, NormalizeFn>
  CASH?: Record<string, { crowns: number }>
  ROLIS_PRICE?: Record<string, { vouchers: number }>

  cache?: Record<string, Record<string, RawPrice>>
  cache_reset_ts?: number

  ItemLinkToPriceGold: (this: void, itemLink: string, ...sources: string[]) => PriceGoldReturn
  ItemLinkToPriceData: (
    this: void,
    itemLink: string,
    ...sources: string[]
  ) => Record<string, RawPrice | undefined>
  ItemLinkToBidAskData: (this: void, itemLink: string, ...sources: string[]) => NormalizedPrice[]
  ItemLinkToBidAskSpread: (
    this: void,
    itemLink: string,
    ...sources: string[]
  ) => Record<string, Record<string, SpreadMetric>>

  SourceList: (this: void) => string[]
  CurrencyList: (this: void) => Record<string, number>
  PriceTypes: (this: void) => string[]
  Price: (
    this: void,
    sourceKey: string | undefined,
    itemLink: string | undefined
  ) => RawPrice | undefined
  PriceNormalized: (
    this: void,
    sourceKey: string,
    itemLink: string
  ) => NormalizedPrice[] | undefined
  Enabled: (this: void, key: string, sourceList: string[]) => boolean

  CanMMPrice: CanPriceFn
  MMPrice: PriceFn
  MMPriceNormalize: NormalizeFn
  CanATTPrice: CanPriceFn
  ATTPrice: PriceFn
  ATTPriceNormalize: NormalizeFn
  CanFurCPrice: CanPriceFn
  FurCPrice: PriceFn
  FurCPriceNormalize?: NormalizeFn
  From_FurC_Crafting: (this: void, itemLink: string, recipe: FurCRecipeArray) => FurCSubReturn
  From_FurC_Rolis: (this: void, itemLink: string, recipe: FurCRecipeArray) => FurCSubReturn
  From_FurC_Luxury: (this: void, itemLink: string, recipe: FurCRecipeArray) => FurCSubReturn
  From_FurC_AchievementVendor: (
    this: void,
    itemLink: string,
    recipe: FurCRecipeArray
  ) => FurCSubReturn
  From_FurC_Generic: (
    this: void,
    itemLink: string,
    recipe: FurCRecipeArray,
    currencyType: string
  ) => FurCSubReturn
  From_FurC_Crown: (this: void, itemLink: string, recipe: FurCRecipeArray) => FurCSubReturn
  From_FurC_Misc: (this: void, itemLink: string, recipe: FurCRecipeArray) => FurCSubReturn
  From_FurC_NoPrice: (this: void, itemLink: string, recipe: FurCRecipeArray) => FurCSubReturn
  From_FurC_PVP: (this: void, itemLink: string, recipe: FurCRecipeArray) => FurCSubReturn
  CanTTCPrice: CanPriceFn
  TTCPrice: PriceFn
  TTCPriceNormalize: NormalizeFn
  CrownPrice: PriceFn
  CrownPriceNormalize: NormalizeFn
  RolisPrice: PriceFn
  RolisPriceNormalize: NormalizeFn
  Unattune: (
    this: void,
    itemLink: string
  ) => { item_name: string; item_link: string; furniture_data_id?: number }
  NPCPrice: PriceFn
  NPCPriceNormalize: NormalizeFn

  ResetCacheIfNecessary: (this: void) => undefined
  GetCachedPrice: (this: void, sourceKey: string, itemLink: string) => RawPrice | undefined
  SetCachedPrice: (this: void, sourceKey: string, itemLink: string, value: RawPrice) => undefined
}
