import { asPresent, asString } from "../lib-sets-casts/lib-sets-casts.module.code.ts"
import {
  asLibCmdFns,
  asLibDispatchFns,
  asLibSlots,
  asToBooleanFn,
  asVoidFn,
} from "../lib-sets-core-casts/lib-sets-core-casts.module.code.ts"
import {
  asDebugParamMap,
  asParamBoolMap,
} from "../lib-sets-core-casts-tables/lib-sets-core-casts-tables.module.code.ts"

const lib = LibSets

const tos = tostring
const strgmatch = string.gmatch
const strlower = string.lower
const libPrefix = lib.prefix
const IsConsole = lib.IsConsole

const libInternal = asLibSlots(lib)

const toboolean = asToBooleanFn(libInternal["_toboolean"])

const CALL_HELP_PARAMS = asParamBoolMap(libInternal["_callHelpParams"])
const CALL_SEARCH_PARAMS = asParamBoolMap(libInternal["_callSearchParams"])
const CALL_DEBUG_PARAMS = asDebugParamMap(libInternal["_callDebugParams"])

const POSSIBLE_DLC_TYPES = lib.possibleDlcTypes
const dlcAndChapterCollectibleIds = lib.dlcAndChapterCollectibleIds
const cleanDLCTimeStamp = lib.CleanDLCTimeStamp

function getOptionsFromSlashCommandString(this: void, slashCommandString: string): unknown[] {
  const options: unknown[] = []
  for (const [param] of strgmatch(slashCommandString, "([^%s]+)%s*")) {
    if (param !== undefined && param !== "") {
      const paramBoolOrOther = toboolean(strlower(param))
      options[options.length] = paramBoolOrOther
    }
  }
  return options
}

function slashSearch(this: void, slashOptions?: unknown[]): undefined {
  if (LibSets_SearchUI_Shared_IsShown() === true) {
    if (slashOptions !== undefined && slashOptions.length > 0) {
      LibSets_SearchUI_Shared_UpdateSearch(slashOptions)
    } else {
      LibSets_SearchUI_Shared_ToggleUI()
    }
  } else {
    LibSets_SearchUI_Shared_ToggleUI(slashOptions)
  }
}

function slashSearchHelper(this: void, args: string): undefined {
  const options = getOptionsFromSlashCommandString(args)
  slashSearch(options)
}

let dlcsInOrderLookupTable: { dlcId: number; name: string }[] | undefined
let chaptersInOrderLookupTable: { dlcId: number; name: string }[] | undefined

function outputDLCorChapterRow(
  this: void,
  dlcId: number,
  dlcName: string,
  dlcType?: number
): undefined {
  let dlcTypeSuffix = ""
  if (dlcType !== undefined && dlcType > DLC_TYPE_BASE_GAME) {
    dlcTypeSuffix = "  (" + tos(POSSIBLE_DLC_TYPES[dlcType]) + ")"
  }
  const releaseDateTimestamp = asPresent(dlcAndChapterCollectibleIds[dlcId]).releaseDate
  const [, onlyDateWithoutTimeStr] = cleanDLCTimeStamp(releaseDateTimestamp)
  d("> [" + tos(dlcId) + "] " + onlyDateWithoutTimeStr + dlcName + dlcTypeSuffix)
}

function slashCommandDlcs(this: void): undefined {
  if (lib.DLCAndCHAPTERData === undefined) {
    return
  }
  if (dlcsInOrderLookupTable === undefined) {
    for (const [, dlcId] of ipairs(lib.DLCAndCHAPTERDataOrdered)) {
      const dlcName = lib.DLCAndCHAPTERData[dlcId]
      const dlcType = asPresent(dlcAndChapterCollectibleIds[dlcId]).type
      if (dlcType === DLC_TYPE_DUNGEONS || dlcType === DLC_TYPE_ZONE) {
        dlcsInOrderLookupTable = dlcsInOrderLookupTable ?? []
        dlcsInOrderLookupTable.push({ dlcId: dlcId, name: asPresent(dlcName) })
      }
    }
  }
  d(libPrefix + "DLCs in order of appearance [<LibSetsDLCId>] <name>  (<LibSetsDLCtype>)")
  for (const [, chapterData] of ipairs(asPresent(dlcsInOrderLookupTable))) {
    const dlcId = chapterData.dlcId
    outputDLCorChapterRow(
      dlcId,
      chapterData.name,
      asPresent(dlcAndChapterCollectibleIds[dlcId]).type
    )
  }
}

function slashCommandChapters(this: void): undefined {
  if (lib.DLCAndCHAPTERData === undefined) {
    return
  }
  if (chaptersInOrderLookupTable === undefined) {
    for (const [, dlcId] of ipairs(lib.DLCAndCHAPTERDataOrdered)) {
      const dlcName = lib.DLCAndCHAPTERData[dlcId]
      const entryType = asPresent(dlcAndChapterCollectibleIds[dlcId]).type
      if (entryType === DLC_TYPE_CHAPTER || entryType === DLC_TYPE_SEASON_PART) {
        chaptersInOrderLookupTable = chaptersInOrderLookupTable ?? []
        chaptersInOrderLookupTable.push({ dlcId: dlcId, name: asPresent(dlcName) })
      }
    }
  }
  d(libPrefix + "Chapters in order of appearance [<LibSetsDLCId>] <name>  (DLC_TYPE_CHAPTER)")
  for (const [, chapterData] of ipairs(asPresent(chaptersInOrderLookupTable))) {
    const dlcId = chapterData.dlcId
    outputDLCorChapterRow(
      dlcId,
      chapterData.name,
      asPresent(dlcAndChapterCollectibleIds[dlcId]).type
    )
  }
}

function slashCommandDlcsAndChapter(this: void): undefined {
  if (lib.DLCAndCHAPTERData === undefined) {
    return
  }
  d(
    libPrefix + "DLCs & chapters in order of appearance [<LibSetsDLCId>] <name>  (<LibSetsDLCtype>)"
  )
  for (const [, dlcId] of ipairs(lib.DLCAndCHAPTERDataOrdered)) {
    const dlcName = lib.DLCAndCHAPTERData[dlcId]
    outputDLCorChapterRow(
      dlcId,
      asPresent(dlcName),
      asPresent(dlcAndChapterCollectibleIds[dlcId]).type
    )
  }
}

function slashHelp(this: void): undefined {
  d(">>> [" + lib.name + "] |c0000FFSlash command help -|r BEGIN >>>")
  d("|-> '/libsets help'              Write this information to the chat")
  d("|-> '/libsets chapters'          Write the list of chapters to the chat")
  d("|-> '/libsets dlcs'              Write the list of dlcs to the chat")
  d("|-> '/libsets dlcsandchapters'   Write the list of dlcs and chapters to the chat")
  if (!IsConsole && !IsInGamepadPreferredMode()) {
    d(
      "|-> '/lss' or 'libsets search' <optional search term>        Show the search UI. If <optional search term> was provided the search UI will search this set name directly."
    )
  }
  d(
    "|-> '/lsp' <optional search term>'        Start a set search in the chat editbox and show found sets directly (only if LibSlashCommander is activated!). You can search by name or setId. Selecting a found set will show a preview of a set's item, and (if enabled in your LibSets settings menu) provide the itemlink in the chat editbox too."
  )
  d(
    "|-> '/libsets debug' <optional debug option>       Write debugging information to the chat. If <optional debug option> was provided, this function will be called (if valid)."
  )
  d("<<< [" + lib.name + "] |c0000FFSlash command help -|r END <<<")
}

function slashDebugHelp(this: void): undefined {
  d(">>> [" + lib.name + "] |c0000FFSlash command DEBUG help -|r BEGIN >>>")
  d("|--------------------------------------------------------")
  d("| DEBUGING ")
  d(
    "|-> '/libSets debug' <optional debug option>       Write debugging information to the chat. If <optional debug option> was provided, this function will be called (if valid)."
  )
  d("|-> Valid functions are:")
  d("|--------------------------------------------------------")
  d(
    "|-> 'getall'               Scan all set's and itemIds, maps, zones, wayshrines, dungeons, update the language dependent variables and put them into the SavedVariables.\n|cFF0000Attention:|r |cFFFFFFThe UI will reload several times for the supported languages of the library!|r"
  )
  d(
    "|-> 'getallnames'          Get all names (sets, zones, maps, wayshrines, DLCs) of the current client language"
  )
  d(
    "|-> 'getallnoitemids'      Scan all set's (no itemIds!) and maps, zones, wayshrines, dungeons, update the language dependent variables and put them into the SavedVariables.\n|cFF0000Attention:|r |cFFFFFFThe UI will reload several times for the supported languages of the library!|r"
  )
  d("|-> 'getzones'             Get all zone data")
  d("|-> 'getmapnamess'         Get all map names of the current client language")
  d(
    "|-> 'getwayshrines'        Get all wayshrine data of the currently shown zone. If the map is not opened it will be opened"
  )
  d("|-> 'getwayshrinenames'    Get all wayshrine names of the current client language")
  d("|-> 'getsetnames'          Get all set names of the current client language")
  d(
    "|-> 'getdungeons'          Get the dungeon data. If the dungeon's view at the group window is not yet opened it will be opened."
  )
  d(
    "|-> 'getachievementcategorynames'  Get the achievement category names of all achievements of the current client language."
  )
  d("|-> 'getdlcnames'          Get the DLC collectible names of the current client language.")
  d(
    "|-> 'shownewsets'          Show the new setIds and names of sets which were scanned and found but not transfered to the preoaded data yet. Needs to run 'scanitemids' first!"
  )
  d("|-> 'scanitemids'          Scan all itemIds of sets")
  d("|-> 'resetsv'              Resets the SavedVariables")
  d("<<< [" + lib.name + "] |c0000FFSlash command DEBUG help -|r END <<<")
}

function removeStandardDebugSlashCommandOptions(this: void, options: unknown[]): undefined {
  options.shift()
  options.shift()
}

function commandHandler(this: void, args: string): undefined {
  const options = getOptionsFromSlashCommandString(args)

  const firstParam = options[0]
  const secondParam = options[1]
  if (
    options.length === 0 ||
    firstParam === undefined ||
    firstParam === "" ||
    CALL_HELP_PARAMS[asString(firstParam)] === true
  ) {
    slashHelp()
  } else if (firstParam !== undefined) {
    if (CALL_SEARCH_PARAMS[asString(firstParam)] === true) {
      removeStandardDebugSlashCommandOptions(options)
      slashSearch(options)
    } else if (firstParam === "dlcs") {
      slashCommandDlcs()
    } else if (firstParam === "chapters") {
      slashCommandChapters()
    } else if (firstParam === "dlcsandchapters") {
      slashCommandDlcsAndChapter()
    } else if (firstParam === "debug") {
      if (secondParam !== undefined) {
        const debugFunc = CALL_DEBUG_PARAMS[asString(secondParam)]
        if (debugFunc !== undefined) {
          if (type(debugFunc) === "function") {
            asVoidFn(debugFunc)()
          } else {
            const libDyn = asLibDispatchFns(lib)
            if (libDyn[asString(debugFunc)] !== undefined) {
              removeStandardDebugSlashCommandOptions(options)
              asPresent(libDyn[asString(debugFunc)])(...options)
            }
          }
        }
      } else {
        slashDebugHelp()
      }
    }
  }
}

function createSetSearchSlashCommands(this: void, doAdd: boolean): undefined {
  if (doAdd) {
    if (!IsConsole && !IsInGamepadPreferredMode()) {
      if (SLASH_COMMANDS["/libsetssearch"] === undefined) {
        SLASH_COMMANDS["/libsetssearch"] = slashSearchHelper
      }
      if (SLASH_COMMANDS["/lss"] === undefined) {
        SLASH_COMMANDS["/lss"] = slashSearchHelper
      }
    }
  } else {
    if (IsConsole || IsInGamepadPreferredMode()) {
      const slashCommandsClearable = asLibCmdFns(SLASH_COMMANDS)
      slashCommandsClearable["/libsetssearch"] = undefined
      slashCommandsClearable["/lss"] = undefined
    }
  }
}
libInternal["_createSetSearchSlashCommands"] = createSetSearchSlashCommands

function createSlashCommands(this: void): undefined {
  SLASH_COMMANDS["/libsets"] = commandHandler
  if (SLASH_COMMANDS["/sets"] === undefined) {
    SLASH_COMMANDS["/sets"] = commandHandler
  }
  if (SLASH_COMMANDS["/ls"] === undefined) {
    SLASH_COMMANDS["/ls"] = commandHandler
  }

  SLASH_COMMANDS["/libsetsdlcsandchapters"] = slashCommandDlcsAndChapter
  SLASH_COMMANDS["/dlcsandchapters"] = slashCommandDlcsAndChapter
  SLASH_COMMANDS["/libsetsdlcs"] = slashCommandDlcs
  SLASH_COMMANDS["/dlcs"] = slashCommandDlcs
  SLASH_COMMANDS["/libsetschapters"] = slashCommandChapters
  SLASH_COMMANDS["/chapters"] = slashCommandChapters

  createSetSearchSlashCommands(true)
}
libInternal["_createSlashCommands"] = createSlashCommands
