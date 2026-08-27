interface CollectibleCategoryData {
  orderedCollectibles?: CollectibleData[]
  GetCollectibleCategoryTypesInCategory(this: CollectibleCategoryData): Record<number, boolean>
}

interface CollectibleData {
  collectibleId: number
  GetName(this: CollectibleData): string
  GetCategoryName(this: CollectibleData): string
  GetCategoryId(this: CollectibleData): number
  GetCategoryType(this: CollectibleData): number
  GetActorCategory(this: CollectibleData): number
  IsCategoryType(this: CollectibleData, categoryType: number): boolean
  IsUnlocked(this: CollectibleData): boolean
  IsFavoritable(this: CollectibleData): boolean
  IsFavorite(this: CollectibleData): boolean
  IsNew(this: CollectibleData): boolean
  IsActive(this: CollectibleData, actorCategory: number): boolean
  ShouldSuppressActiveState(this: CollectibleData, actorCategory: number): boolean
  WouldBeHidden(this: CollectibleData, actorCategory: number): boolean
}

interface CollectibleDataManager {
  collectibleCategoryIdToDataMap: Record<number, CollectibleCategoryData | undefined>
  GetCategoryDataById(
    this: CollectibleDataManager,
    categoryId: number
  ): CollectibleCategoryData | undefined
  GetCollectibleDataById(this: CollectibleDataManager, collectibleId: number): CollectibleData
}

declare const ZO_COLLECTIBLE_DATA_MANAGER: CollectibleDataManager

declare const ZO_CollectibleDataManager: {
  HasAnyUnlockedMounts(this: void): boolean
  HasAnyFavoriteMounts(this: void): boolean
}

declare const COLLECTIONS_BOOK: {
  UpdateCollectionVisualLayer(this: void): void
}

interface StatusIconControl extends Control {
  ClearIcons(this: StatusIconControl): void
  AddIcon(this: StatusIconControl, texture: string, color?: ZoColorDef): void
  Show(this: StatusIconControl): void
}

declare const ZO_CollectibleTile_Keyboard: object

declare function GetCombinationUnlockedCollectible(
  this: void,
  referenceId: number
): number | undefined

declare function moc(this: void): MocControl | undefined

interface MocControl extends Control {
  dataEntry?: { data?: CollectibleFragmentRowData }
}

interface CollectibleFragmentRowData {
  dataSource?: { collectibleId?: number; referenceId?: number }
  meetsRequirementsToBuy?: unknown
  slotIndex?: number
}

declare function GetMenuOwner(this: void): MocControl | undefined

declare const ZO_CHECK_ICON: string
declare const ZO_KEYBOARD_NEW_ICON: string

declare const SI_COLLECTIBLE_NAME_FORMATTER: number
declare const SI_COLLECTIBLEUNLOCKSTATE2: number
declare const SI_COLLECTIBLE_ACTION_COMBINE: number
