const lib = LibSets

export const MAJOR = lib.name
export const MINOR = lib.version

export const UNKNOWN_NAME = "n/a"

export const worldName = GetWorldName()
export const apiVersion = GetAPIVersion()
export const isPTSAPIVersionLive = lib.checkIfPTSAPIVersionIsLive()
export const clientLang =
  lib.clientLang !== undefined && lib.clientLang.length > 0 ? lib.clientLang : GetCVar("language.2")
export const fallbackLang = lib.fallbackLang
export const SUPPORTED_LANGUAGES = lib.supportedLanguages
export const numSupportedLangsForDebug = lib.numSupportedLangsForDebug
export const NON_OFFICIAL_LANGUAGES = lib.nonOfficialLanguages

export const libPrefix = lib.prefix
export const libPrefixWithVersion = "[" + MAJOR + " v" + tostring(MINOR) + "]"
export const storedInSVFileLibSetsInTable =
  "->Stored in SaveVariables file '" + MAJOR + ".lua', in the table "
export const PLEASE_RELOAD_UI = ">Please do a /reloadui to update the file properly!"
export const UPPER_CASE_FIRST_FORMATTER = "<<C:1>>"

export const DEBUG_OUTPUT_START_LINE = "==============================\n"

export const SCAN_STATE: {
  newSetIdsFound: number[]
  sets: { [setId: number]: { [itemId: number]: number } }
  setsEquipTypes: { [equipType: number]: { [setId: number]: number } }
  setsArmor: { [setId: number]: number }
  setsArmorTypes: { [armorType: number]: { [setId: number]: number } }
  setsJewelry: { [setId: number]: number }
  setsWeapons: { [setId: number]: number }
  setsWeaponTypes: { [weaponType: number]: { [setId: number]: number } }
  setCount: number
  itemCount: number
  itemArmorCount: number
  itemJewelryCount: number
  itemWeaponsCount: number
  itemIdsScanned: number
  lastSetsCount: number
  lastFoundPackageNr: number
  noFurtherItemsFound: boolean
} = {
  newSetIdsFound: [],
  sets: {},
  setsEquipTypes: {},
  setsArmor: {},
  setsArmorTypes: {},
  setsJewelry: {},
  setsWeapons: {},
  setsWeaponTypes: {},
  setCount: 0,
  itemCount: 0,
  itemArmorCount: 0,
  itemJewelryCount: 0,
  itemWeaponsCount: 0,
  itemIdsScanned: 0,
  lastSetsCount: 0,
  lastFoundPackageNr: 0,
  noFurtherItemsFound: false,
}

export const DEBUG_HOLDER: {
  checkForNewSetIds?: (
    this: void,
    setIdTable: { [setId: number]: unknown } | undefined,
    funcToCallForEachSetId: ((this: void, setId: number) => unknown) | undefined,
    combineFromSV: boolean,
    forceShowOtherApiVersionSets: boolean
  ) => void
  compressSetItemIdsNow?: (
    this: void,
    setsDataTable: { [setId: number]: { [itemId: number]: number } } | undefined,
    noReloadInfo?: boolean
  ) => void
  getNewSetName?: (this: void, newSetId: number | undefined) => string
  scanAllSetData?: (this: void, keepUncompressedetItemIds?: boolean, noReloadInfo?: boolean) => void
  loadSetsByIds?: (
    this: void,
    packageNr: number,
    from: number,
    to: number,
    noReloadInfo?: boolean
  ) => void
  showSetCountsScanned?: (
    this: void,
    finished: boolean,
    keepUncompressedetItemIds: boolean | undefined,
    noReloadInfo: boolean,
    packageNr: number | string
  ) => void
  debugResetSavedVariables?: (this: void, noReloadInfo?: boolean, onlyNames?: boolean) => void
  debugGetAllZoneInfo?: (this: void) => void
  debugGetAllMapNames?: (this: void) => void
  debugGetAllWayshrineInfoOfCurrentMap?: (this: void) => void
  debugGetAllWayshrineNames?: (this: void) => void
  debugGetAllSetNames?: (this: void, noReloadInfo?: boolean) => void
  debugGetDungeonFinderData?: (
    this: void,
    dungeonFinderIndex?: number,
    noReloadInfo?: boolean
  ) => void
  debugGetAllAchievementCategoryNames?: (
    this: void,
    achievementStartId?: number,
    achievementEndId?: number,
    noReloadInfo?: boolean,
    ingameList?: boolean
  ) => void
  debugGetAllCollectibleDLCNames?: (this: void, noReloadInfo?: boolean) => void
  debugShowNewSetIds?: (this: void, noChatOutput?: boolean) => void
  debugGetAllNames?: (this: void, noReloadInfo?: boolean) => void
} = {}
