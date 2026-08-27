import { asGlobalTable, asTyped } from "../casts"
import { boolPair } from "../data/bool-pair"

const MAJOR = "LibSets"
const MINOR = 0.92

const G = asGlobalTable(globalThis)

function isLibSetsAlreadyLoaded(this: void, outputMsg?: boolean): boolean {
  const doOutput = outputMsg ?? false
  if (LibSets !== undefined && LibSets.fullyLoaded === true) {
    const loadedVersion = LibSets.version
    if (loadedVersion < MINOR) {
      return false
    }
    if (doOutput === true) {
      d(
        "[" +
          MAJOR +
          "]Library was already loaded before, with version " +
          tostring(loadedVersion) +
          "!"
      )
    }
    return true
  }
  return false
}
G["IsLibSetsAlreadyLoaded"] = isLibSetsAlreadyLoaded

LibSets = asTyped<LibSetsLib>({})
const lib = LibSets

const IsConsole = ZO_IsConsoleOrGameCoreUI()
lib.IsConsole = IsConsole
lib.SearchUI = {
  name: MAJOR + "_SearchUI",
  controlName: boolPair("LibSets_SearchUI_TLC_Keyboard", "LibSets_SearchUI_TLC_Gamepad"),
  control: new LuaMap<boolean, unknown>(),
  KeyboardVars: {
    minWidth: 934,
    minHeight: 600,
  },
}

lib.name = MAJOR
const libPrefix = "[" + MAJOR + "]"
lib.prefix = libPrefix
lib.version = MINOR
lib.author = "Baertram"
lib.svName = "LibSets_SV_Data"
lib.svDebugName = "LibSets_SV_DEBUG_Data"
lib.svVersion = 0.38
lib.setsLoaded = false
lib.setsScanning = false
lib.fullyLoaded = false
lib.startedLoading = true
lib.setIds = {}
lib.nonExistingSetIdsAtCurrentApiVersion = {}

lib.customTooltipHooks = {
  needed: {},
  hooked: {},
  eventPlayerActivatedCalled: false,
}
lib.customContextMenuEntries = {
  setSearchUI: {},
}

const APIVersions: { [key: string]: number } = {}
lib.lastSetsPreloadedCheckAPIVersion = 101049

APIVersions["PTS"] = 101050
const APIVersionPTS = tonumber(APIVersions["PTS"]) ?? 0

APIVersions["live"] = GetAPIVersion()
const APIVersionLive = tonumber(APIVersions["live"]) ?? 0

function checkIfPTSAPIVersionIsLive(this: void): boolean {
  return APIVersionLive >= APIVersionPTS || false
}
lib.checkIfPTSAPIVersionIsLive = checkIfPTSAPIVersionIsLive
lib.APIVersions = APIVersions

lib.debugNumItemIdPackages = 60
lib.debugNumItemIdPackageSize = 5000
lib.debugMaxCollectibleIds = 250000

const langDE = "de"
const langEN = "en"
const langES = "es"
const langFR = "fr"
const langRU = "ru"
const langZH = "zh"
const langJP = "jp"
const langPL = "pl"

const fallbackLang = langEN
lib.fallbackLang = fallbackLang

const supportedLanguages: { [lang: string]: boolean } = {
  [langDE]: true,
  [langEN]: true,
  [langES]: true,
  [langFR]: true,
  [langPL]: true,
  [langRU]: true,
  [langZH]: true,
  [langJP]: false,
}
lib.supportedLanguages = supportedLanguages

const nonOfficialLanguages: { [lang: string]: boolean } = {
  [langPL]: true,
  [langJP]: true,
}
lib.nonOfficialLanguages = nonOfficialLanguages

let numSupportedLangs = 0
let numSupportedLangsForDebug = 0
const supportedLanguagesIndex: string[] = []
for (const [supportedLanguage, isSupported] of pairs(supportedLanguages)) {
  if (isSupported === true) {
    numSupportedLangs = numSupportedLangs + 1
    numSupportedLangsForDebug = numSupportedLangsForDebug + 1
    supportedLanguagesIndex[supportedLanguagesIndex.length] = tostring(supportedLanguage)
  } else {
    if (nonOfficialLanguages[supportedLanguage] === true) {
      numSupportedLangsForDebug = numSupportedLangsForDebug + 1
    }
  }
}
lib.numSupportedLangs = numSupportedLangs
lib.numSupportedLangsForDebug = numSupportedLangsForDebug
table.sort(supportedLanguagesIndex)
lib.supportedLanguagesIndex = supportedLanguagesIndex

const supportedLanguageChoices: string[] = [langDE, langEN, langES, langFR, langRU, langZH, langPL]
const supportedLanguageChoicesValues: number[] = []
for (let langId = 1; langId <= supportedLanguageChoices.length; langId++) {
  supportedLanguageChoicesValues[langId - 1] = langId
}
lib.supportedLanguageChoices = supportedLanguageChoices
lib.supportedLanguageChoicesValues = supportedLanguageChoicesValues

let clientLang = GetCVar("language.2")
clientLang = string.lower(clientLang)
if (supportedLanguages[clientLang] !== true) {
  clientLang = fallbackLang
}
lib.clientLang = clientLang

const noSetIdString = "NoSetId"
G["LIBSETS_TABLEKEY_NEWSETIDS"] = "NewSetIDs"
G["LIBSETS_TABLEKEY_NAMES"] = "Names"
G["LIBSETS_TABLEKEY_SETITEMIDS"] = "setItemIds"
G["LIBSETS_TABLEKEY_SETITEMIDS_NO_SETID"] = LIBSETS_TABLEKEY_SETITEMIDS + noSetIdString
G["LIBSETS_TABLEKEY_SETITEMIDS_COMPRESSED"] = LIBSETS_TABLEKEY_SETITEMIDS + "_Compressed"
G["LIBSETS_TABLEKEY_SETS_EQUIP_TYPES"] = "setsEquipTypes"
G["LIBSETS_TABLEKEY_SETS_ARMOR_TYPES"] = "setsArmorTypes"
G["LIBSETS_TABLEKEY_SETS_JEWELRY"] = "setsWithJewelry"
G["LIBSETS_TABLEKEY_SETS_WEAPONS_TYPES"] = "setsWeaponTypes"
G["LIBSETS_TABLEKEY_SETNAMES"] = "set" + LIBSETS_TABLEKEY_NAMES
G["LIBSETS_TABLEKEY_SETNAMES_NO_SETID"] = "set" + LIBSETS_TABLEKEY_NAMES + noSetIdString
G["LIBSETS_TABLEKEY_LASTCHECKEDAPIVERSION"] = "lastSetsCheckAPIVersion"
G["LIBSETS_TABLEKEY_NUMBONUSES"] = "numBonuses"
G["LIBSETS_TABLEKEY_MAXEQUIPPED"] = "maxEquipped"
G["LIBSETS_TABLEKEY_SETTYPE"] = "setType"
G["LIBSETS_TABLEKEY_MAPS"] = "maps"
G["LIBSETS_TABLEKEY_WAYSHRINES"] = "wayshrines"
G["LIBSETS_TABLEKEY_WAYSHRINE_NAMES"] = "wayshrine" + LIBSETS_TABLEKEY_NAMES
G["LIBSETS_TABLEKEY_ZONEIDS"] = "zoneIds"
G["LIBSETS_TABLEKEY_ZONEIDS_SORTED"] = "zoneIdsSorted"
G["LIBSETS_TABLEKEY_ZONE_DATA"] = "zoneData"
G["LIBSETS_TABLEKEY_DUNGEONFINDER_DATA"] = "dungeonFinderData"
G["LIBSETS_TABLEKEY_ACHIEVEMENT_CATEGORY_NAMES"] = "achievementCategory" + LIBSETS_TABLEKEY_NAMES
G["LIBSETS_TABLEKEY_COLLECTIBLE_DLC_NAMES"] = "collectible_DLC" + LIBSETS_TABLEKEY_NAMES
G["LIBSETS_TABLEKEY_COLLECTIBLE_NAMES"] = "collectible" + LIBSETS_TABLEKEY_NAMES
G["LIBSETS_TABLEKEY_WAYSHRINENODEID2ZONEID"] = "wayshrineNodeId2zoneId"
G["LIBSETS_TABLEKEY_DROPMECHANIC"] = "dropMechanic"
G["LIBSETS_TABLEKEY_DROPMECHANIC_SORTED"] = "dropMechanicSorted"
G["LIBSETS_TABLEKEY_DROPMECHANIC_NAMES"] = LIBSETS_TABLEKEY_DROPMECHANIC + LIBSETS_TABLEKEY_NAMES
G["LIBSETS_TABLEKEY_DROPMECHANIC_TOOLTIP_NAMES"] =
  LIBSETS_TABLEKEY_DROPMECHANIC + "Tooltip" + LIBSETS_TABLEKEY_NAMES
G["LIBSETS_TABLEKEY_DROPMECHANIC_LOCATION_NAMES"] =
  LIBSETS_TABLEKEY_DROPMECHANIC + "DropLocation" + LIBSETS_TABLEKEY_NAMES
G["LIBSETS_TABLEKEY_MIXED_SETNAMES"] = "MixedSetNamesForDataAll"
G["LIBSETS_TABLEKEY_SET_PROCS_ALLOWED_IN_PVP"] = "setProcsAllowedInPvP"
G["LIBSETS_TABLEKEY_SET_ITEM_COLLECTIONS_ZONE_MAPPING"] = "setItemCollectionsZoneMapping"
G["LIBSETS_TABLEKEY_ENCHANT_SEARCHCATEGORY_TYPES"] = "enchantSearchCategories"
G["LIBSETS_TABLEKEY_DUNGEON_ZONE_MAPPING"] = "dungeonZoneMapping"
G["LIBSETS_TABLEKEY_PUBLICDUNGEON_ZONE_MAPPING"] = "publicDungeonZoneMapping"
G["LIBSETS_TABLEKEY_TABLENAME"] = "tableName"

G["LIBSETS_SET_ITEMID_TABLE_VALUE_OK"] = 1
G["LIBSETS_SET_ITEMID_TABLE_VALUE_NOTOK"] = 2

G["LIBSETS_SET_COLLECTIONS_CATEGORY_TOPMOST_NODE"] = -1

G["LIBSETS_SETPROC_CHECKTYPE_ABILITY_EVENT_EFFECT_CHANGED"] = 1
G["LIBSETS_SETPROC_CHECKTYPE_ABILITY_EVENT_COMBAT_EVENT"] = 2
G["LIBSETS_SETPROC_CHECKTYPE_EVENT_POWER_UPDATE"] = 4
G["LIBSETS_SETPROC_CHECKTYPE_EVENT_BOSSES_CHANGED"] = 5
G["LIBSETS_SETPROC_CHECKTYPE_SPECIAL"] = 99
