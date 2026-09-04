const TTC_SORT = {
  ItemName: "ItemName",
  Price: "Price",
  LastSeen: "LastSeen",
} as const

export const TTC_AGO = {
  Minutes10: 10,
  Minutes30: 30,
  Hour1: 60,
  Hours6: 360,
  Hours12: 720,
} as const

export const TTC_QUALITY = {
  Normal: 0,
  Fine: 1,
  Superior: 2,
  Epic: 3,
  Legendary: 4,
} as const

export interface TTCListingSearchParams {
  ItemID?: number
  IconName?: string
  ItemNamePattern?: string
  ItemCategory1ID?: number
  ItemCategory2ID?: number
  ItemCategory3ID?: number
  ItemQualityID?: number
  ItemTraitID?: number
  LevelMin?: number
  LevelMax?: number
  PriceMin?: number
  PriceMax?: number
  AmountMin?: number
  AmountMax?: number
  MasterWritVoucherMin?: number
  MasterWritVoucherMax?: number
  Ago?: (typeof TTC_AGO)[keyof typeof TTC_AGO]
  SortBy?: (typeof TTC_SORT)[keyof typeof TTC_SORT]
  Order?: "asc" | "desc"
  page?: number
}

export interface TTCListingResponse {
  IsSuccess: boolean
  Code: number
  TradeListPageModel: TTCListingPage
}

export interface TTCListingPage {
  TradeDetails: readonly TTCListingEntry[]
  CurrentPage: number
  TotalPageCount: number
  TotalMatchCount: number
}

export interface TTCListingEntry {
  TradeAsset: TTCListingAsset
  GuildID: number
  GuildName: string
  GuildKioskLocationID: number
  PlayerID: string
  DiscoverUnixTime: number
  ExpireUnixTime: number
  ID: number
  Message: string | null
  TraderID: number
}

interface TTCListingAsset {
  Amount: number
  TotalPrice: number
  UnitPrice: number
  Item: TTCListingItem
}

export interface TTCListingItem {
  Name: string
  ID: number
  QualityID: number
  TraitID: number
  LevelTotal: number
  IconName: string
  Category2ID: number
  Category2IDOverWrite: number | null
  UID: number
  PotionEffectIDs: readonly number[] | null
  MasterWritInfo: TTCMasterWritInfo
}

interface TTCMasterWritInfo {
  RequiredItemName: string | null
  RequiredItemID: number | null
  RequiredQualityID: number | null
  RequiredTraitID: number | null
  RequiredSetID: number | null
  RequiredStyleID: number | null
  RequiredPotionEffectIDs: readonly number[] | null
  NumVoucher: number | null
  IsEmpty: boolean
}

export interface TTCListingClientOptions {
  server?: "us" | "eu"
  platform?: "pc"
  requestsPerSecond?: number
}

export interface TTCListingClient {
  search: (params: TTCListingSearchParams) => Promise<TTCListingPage>
  searchAll: (
    params: TTCListingSearchParams,
    options?: { maxPages?: number }
  ) => AsyncGenerator<TTCListingEntry>
  searchBatch: (
    paramsList: readonly TTCListingSearchParams[],
    options?: { maxPagesPerItem?: number; onItemComplete?: (index: number) => void }
  ) => Promise<ReadonlyArray<readonly TTCListingEntry[]>>
}
