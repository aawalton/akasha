declare const ELLIPSIS: number

interface ZoCollectibleData {
  IsHouse(this: ZoCollectibleData): boolean
  GetReferenceId(this: ZoCollectibleData): number
  GetFormattedName(this: ZoCollectibleData): string
  IsLocked(this: ZoCollectibleData): boolean
  GetHouseLocation(this: ZoCollectibleData): string
}

interface ZoCollectibleDataManager {
  GetAllCollectibleDataObjects(this: ZoCollectibleDataManager): ZoCollectibleData[]
}

declare const ZO_COLLECTIBLE_DATA_MANAGER: ZoCollectibleDataManager

interface CollectibleDataObject {
  IsLocked: (this: CollectibleDataObject) => boolean
  GetHouseLocation: (this: CollectibleDataObject) => string
}
