import { asGlobalTable, asTyped } from "../lib-sets-casts/lib-sets-casts.module.code.ts"
import { asScrollableMenuHandleOpt } from "../lib-sets-core-casts-tables/lib-sets-core-casts-tables.module.code.ts"

const lib = LibSets

let lsm: { version?: string } | undefined
let LSM_WAS_CHECKED = false

function checkOptionalLibraryLibScrollableMenu(this: void): undefined {
  if (!LSM_WAS_CHECKED && lsm === undefined) {
    lsm = asScrollableMenuHandleOpt(LibScrollableMenu)
    LSM_WAS_CHECKED = true
    if (lsm !== undefined && (lsm.version ?? "") >= "2.43") {
      lib.LSM = lsm
    }
  }
}

function checkOptionalLibraries(this: void): undefined {
  checkOptionalLibraryLibScrollableMenu()
  lib.libCustomMenu = LibCustomMenu
  lib.libAddonMenu = LibAddonMenu2
  lib.libSlashCommander = asGlobalTable(globalThis).LibSlashCommander
  lib.libZone = asGlobalTable(globalThis).LibZone
}
lib.CheckOptionalLibraries = checkOptionalLibraries

function checkLSM(this: void): boolean {
  checkOptionalLibraryLibScrollableMenu()
  return lsm !== undefined
}
lib.CheckLSM = checkLSM

lib.lookupTableItemSetIdToItemSetCollectionsCategory = {}

const CALL_HELP_PARAMS: { [param: string]: boolean } = {
  list: true,
  help: true,
  hilfe: true,
  aide: true,
  ヘルプ: true,
  ayuda: true,
  помощь: true,
  帮助: true,
}
const CALL_SEARCH_PARAMS: { [param: string]: boolean } = {
  search: true,
  suche: true,
  cherche: true,
  検索: true,
  buscar: true,
  поиск: true,
  搜索: true,
}
const CALL_DEBUG_PARAMS: { [param: string]: string | ((this: void) => void) } = {
  resetsv: "DebugResetSavedVariables",
  scanitemids: "DebugScanAllSetData",

  getall: "DebugGetAllData",
  getallnoitemids: () => {
    lib.DebugGetAllData(true, true, false)
  },
  getallnames: "DebugGetAllNames",

  getzones: "DebugGetAllZoneInfo",
  getmapnamess: "DebugGetAllMapNames",

  getwayshrines: "DebugGetAllWayshrineInfo",
  getwayshrinenames: "DebugGetAllWayshrineNames",

  getsetnames: "DebugGetAllSetNames",
  shownewsets: "DebugShowNewSetIds",

  getdungeons: "DebugGetDungeonFinderData",
  getachievementcategorynames: "DebugGetAllAchievementCategoryNames",
  getdlcnames: "DebugGetAllCollectibleDLCNames",
}

const libInternal = asTyped<{ [slot: string]: unknown }>(lib)
libInternal["_callHelpParams"] = CALL_HELP_PARAMS
libInternal["_callSearchParams"] = CALL_SEARCH_PARAMS
libInternal["_callDebugParams"] = CALL_DEBUG_PARAMS
