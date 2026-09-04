interface LibSetsApi {
  customTooltipHooks: {
    needed: { [ctrlName: string]: unknown }
    hooked: { [ctrlName: string]: unknown }
    eventPlayerActivatedCalled: boolean
  }
  customContextMenuEntries: { [key: string]: unknown }

  lastSetsPreloadedCheckAPIVersion: number
  debugNumItemIdPackages: number
  debugNumItemIdPackageSize: number
  debugMaxCollectibleIds: number

  fallbackLang: string
  supportedLanguages: { [lang: string]: boolean }
  nonOfficialLanguages: { [lang: string]: boolean }
  numSupportedLangs: number
  numSupportedLangsForDebug: number
  supportedLanguagesIndex: string[]
  supportedLanguageChoices: string[]
  supportedLanguageChoicesValues: number[]
  supportedLanguageChoicesTooltips: string[]
  clientLang: string

  allowedSetTypes: { [setType: number]: boolean }
  setTypeToLibraryInternalVariableNames: {
    [setType: number]: { [tableKey: string]: string }
  }
  counterSuffix: string
  setTypesToName: { [setType: number]: LibSetsLangMap<string> }
  setTypeToSetIdsForSetTypeTable: { [setType: number]: unknown }

  setItemTypes: { [itemType: number]: boolean }
  equipTypesValid: { [equipType: number]: boolean }
  isJewelryEquipType: { [equipType: number]: boolean }
  isWeaponEquipType: { [equipType: number]: boolean }
  isArmorEquipType: { [equipType: number]: boolean }
  traitTypesValid: { [traitType: number]: boolean }
  isJewelryTraitType: { [traitType: number]: boolean }
  isWeaponTraitType: { [traitType: number]: boolean }
  isArmorTraitType: { [traitType: number]: boolean }
  enchantSearchCategoryTypesValid: { [category: string]: boolean }

  equipTypesSets: { [setId: number]: unknown }
  armorSets: { [setId: number]: unknown }
  armorTypesSets: { [setId: number]: unknown }
  jewelrySets: { [setId: number]: unknown }
  weaponSets: { [setId: number]: unknown }
  weaponTypesSets: { [setId: number]: unknown }
  nonPerfectedSet2PerfectedSet: { [setId: number]: unknown }
  perfectedSet2NonPerfectedSet: { [setId: number]: unknown }
  perfectedSetsInfo: { [setId: number]: unknown }
  perfectedSets: { [setId: number]: unknown }
  nonPerfectedSets: { [setId: number]: unknown }

  countMonsterSetBonus: number
  countUndauntedChests: number
  undauntedChestIds: LibSetsLangMap<{ [chestIndex: number]: string }>

  armorTypeNames: { [armorType: number]: string }
  weaponTypeNames: { [weaponType: number]: string }

  allowedDropMechanics: { [dropMechanicId: number]: boolean }
  dropZones: { [key: number]: unknown }
  dropZone2SetIds: { [key: number]: unknown }
  setId2DropZones: { [setId: number]: unknown }
  dropLocationNames: { [key: number]: unknown }
  dropLocationNames2SetIds: { [key: string]: unknown }
  setId2DropLocationNames: { [setId: number]: unknown }
  dropMechanicIdToName: LibSetsLangMap<{ [dropMechanicId: number]: string }>
  dropMechanicIdToNameTooltip: LibSetsLangMap<{ [dropMechanicId: number]: string }>

  localization: LibSetsLangMap<{ [key: string]: unknown }>
  specialZoneNames: LibSetsLangMap<{ [zoneId: number]: string }>
  dropMechanicIdToTexture: { [dropMechanicId: number]: string }
  setTypeToTexture: { [key: string]: string }
  setTypeToDropZoneLocalizationStr: { [key: string]: unknown }

  possibleSetSearchFavoriteCategoriesUnsorted: { [category: string]: string }
  possibleSetSearchFavoriteCategories: {
    category: string
    categoryName: unknown
    texture: string
  }[]

  possibleDlcTypes: { [index: number]: string }
  allowedDLCTypes: { [dlcType: number]: boolean }
  possibleDlcIds: { [index: number]: string }
  allowedDLCIds: { [dlcId: number]: boolean }
  dlcAndChapterCollectibleIds: { [dlcId: number]: LibSetsDlcEntry }
  CleanDLCTimeStamp: (
    this: void,
    releaseDateTimestamp: number | undefined,
    withoutColon?: boolean
  ) => LuaMultiReturn<[string, string]>
  DLCAndCHAPTERData: { [dlcId: number]: string }
  DLCAndCHAPTERDataOrdered: { [index: number]: number }
  DLCandCHAPTERLookupdata: { [dlcType: number]: { [dlcId: number]: string } }
  NONDLCData: { [dlcId: number]: string }
  NONDLCLookupdata: { [dlcType: number]: { [dlcId: number]: string } }

  classData: LibSetsClassData
}
