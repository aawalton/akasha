declare const ELLIPSIS: number

declare const ZO_Menu_GetNumMenuItems: (this: void) => number

interface CollectibleDataObject {
  collectibleId: number
  houseLocation: string
  IsHouse: (this: CollectibleDataObject) => boolean
  IsLocked: (this: CollectibleDataObject) => boolean
  GetReferenceId: (this: CollectibleDataObject) => number
  GetFormattedName: (this: CollectibleDataObject) => string
  GetHouseLocation: (this: CollectibleDataObject) => string
}

interface CollectibleDataManager {
  GetAllCollectibleDataObjects: (this: CollectibleDataManager) => CollectibleDataObject[]
}
