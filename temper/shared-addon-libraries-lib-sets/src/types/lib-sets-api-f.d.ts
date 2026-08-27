interface LibSetsLib {
  GetSetItemId: (
    this: void,
    setId: number | undefined,
    isNoESOSetId?: boolean,
    equipType?: number,
    traitType?: number,
    enchantSearchCategoryType?: number | string,
    armorType?: number,
    weaponType?: number
  ) => number | undefined
  GetSetFirstItemId: (
    this: void,
    setId: number | undefined,
    isNoESOSetId?: boolean,
    equipType?: number,
    traitType?: number,
    enchantSearchCategoryType?: number | string,
    armorType?: number,
    weaponType?: number
  ) => number | undefined

  GetSetName: (this: void, setId: number | undefined, lang?: string) => unknown
  GetSetNames: (this: void, setId: number | undefined) => unknown
  GetAllSetNames: (this: void) => unknown

  GetSetArmorTypes: (this: void, setId: number | undefined) => unknown
  GetArmorTypeName: (this: void, armorType: number | undefined) => string | undefined
  GetItemsArmorType: (this: void, itemId: number | undefined) => number | undefined

  GetSetWeaponTypes: (
    this: void,
    setId: number | undefined
  ) => { [setId: number]: boolean | undefined } | undefined
  GetItemsWeaponType: (this: void, itemId: number | undefined) => number | undefined

  GetNumEquippedItemsByItemIds: (
    this: void,
    setsItemIds: { [itemId: number]: unknown } | undefined
  ) => number
  GetNumEquippedItemsBySetId: (
    this: void,
    setId: number | undefined
  ) => LuaMultiReturn<[number | undefined, number | undefined, number | undefined]>
  GetNumEquippedItemsByItemId: (
    this: void,
    itemId: number | undefined
  ) => LuaMultiReturn<[number | undefined, number | undefined, number | undefined]>

  GetSetEquipTypes: (
    this: void,
    setId: number | undefined
  ) => { [setId: number]: boolean | undefined } | undefined

  GetSetByName: (
    this: void,
    setName: string | undefined,
    lang?: string
  ) => LuaMultiReturn<[number | undefined, unknown]>
  GetSetBonuses: (this: void, itemLink: string, numBonuses: number) => (string | undefined)[]

  GetClassSets: (this: void, classId: number | undefined) => unknown
  GetAllClassSets: (this: void) => unknown

  JumpToSetId: (this: void, setId: number | undefined, factionIndex?: number) => boolean | undefined

  RegisterCustomSetSearchResultsListContextMenu: (
    this: void,
    addonName: string | undefined,
    headerName: string | undefined,
    submenuName: string | undefined,
    submenuEntries: object | undefined,
    visibleFunc: ((this: void, ...args: unknown[]) => unknown) | undefined
  ) => void
  GetSetSearchFavoriteCategories: (this: void) => {
    category: string
    categoryName: unknown
    texture: string
  }[]
  GetSetSearchFavoriteCategoryData: (
    this: void,
    category: string | undefined
  ) =>
    | {
        category: string
        categoryName: unknown
        texture: string
      }
    | undefined
  GetSetSearchFavoritesCategoriesForSetId: (
    this: void,
    setId: number | undefined
  ) =>
    | (
        | {
            category: string
            categoryName: unknown
            texture: string
          }
        | undefined
      )[]
    | undefined
}
