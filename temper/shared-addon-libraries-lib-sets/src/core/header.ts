import { asTyped } from "../casts"
import { asScrollableMenuHandleOpt } from "./casts-tables"

const lib = LibSets

let lsm: { version?: string } | undefined
let lsmWasChecked = false

function checkOptionalLibraryLibScrollableMenu(this: void): undefined {
  if (!lsmWasChecked && lsm === undefined) {
    lsm = asScrollableMenuHandleOpt(LibScrollableMenu)
    lsmWasChecked = true
    if (lsm !== undefined && (lsm.version ?? "") >= "2.43") {
      lib.LSM = lsm
    }
  }
}

function checkOptionalLibraries(this: void): undefined {
  checkOptionalLibraryLibScrollableMenu()
  lib.libCustomMenu = LibCustomMenu
  lib.libAddonMenu = LibAddonMenu2
  lib.libSlashCommander = LibSlashCommander
  lib.libZone = LibZone
}
lib.CheckOptionalLibraries = checkOptionalLibraries

function checkLSM(this: void): boolean {
  checkOptionalLibraryLibScrollableMenu()
  return lsm !== undefined
}
lib.CheckLSM = checkLSM

lib.lookupTableItemSetIdToItemSetCollectionsCategory = {}

const callHelpParams: { [param: string]: boolean } = {
  list: true,
  help: true,
  hilfe: true,
  aide: true,
  ヘルプ: true,
  ayuda: true,
  помощь: true,
  帮助: true,
}
const callSearchParams: { [param: string]: boolean } = {
  search: true,
  suche: true,
  cherche: true,
  検索: true,
  buscar: true,
  поиск: true,
  搜索: true,
}
const callDebugParams: { [param: string]: string | ((this: void) => void) } = {
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
libInternal["_callHelpParams"] = callHelpParams
libInternal["_callSearchParams"] = callSearchParams
libInternal["_callDebugParams"] = callDebugParams
