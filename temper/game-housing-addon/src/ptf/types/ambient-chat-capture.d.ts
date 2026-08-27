declare function zo_strtrim(this: void, text: string): string

interface CollectibleDataObject {
  collectibleId: number
  houseLocation: string
  IsHouse: (this: CollectibleDataObject) => boolean
  GetReferenceId: (this: CollectibleDataObject) => number
  GetFormattedName: (this: CollectibleDataObject) => string
}

interface CollectibleDataManager {
  GetAllCollectibleDataObjects: (this: CollectibleDataManager) => CollectibleDataObject[]
}

declare const ZO_COLLECTIBLE_DATA_MANAGER: CollectibleDataManager
