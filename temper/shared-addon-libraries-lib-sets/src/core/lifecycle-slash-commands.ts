import { asPresent, asString } from "../casts"
import { asLibCmdFns, asLibDispatchFns, asLibSlots, asToBooleanFn, asVoidFn } from "./casts"
import { asDebugParamMap, asParamBoolMap } from "./casts-tables"

const lib = LibSets

const tos = tostring
const strgmatch = string.gmatch
const strlower = string.lower
const libPrefix = lib.prefix
const IsConsole = lib.IsConsole

const libInternal = asLibSlots(lib)

const toboolean = asToBooleanFn(libInternal["_toboolean"])

const callHelpParams = asParamBoolMap(libInternal["_callHelpParams"])
const callSearchParams = asParamBoolMap(libInternal["_callSearchParams"])
const callDebugParams = asDebugParamMap(libInternal["_callDebugParams"])

const possibleDlcTypes = lib.possibleDlcTypes
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

function slash_search(this: void, slashOptions?: unknown[]): undefined {
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

function slash_search_helper(this: void, args: string): undefined {
  const options = getOptionsFromSlashCommandString(args)
  slash_search(options)
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
    dlcTypeSuffix = "  (" + tos(possibleDlcTypes[dlcType]) + ")"
  }
  const releaseDateTimestamp = asPresent(dlcAndChapterCollectibleIds[dlcId]).releaseDate
  const [, onlyDateWithoutTimeStr] = cleanDLCTimeStamp(releaseDateTimestamp)
  d("> [" + tos(dlcId) + "] " + onlyDateWithoutTimeStr + dlcName + dlcTypeSuffix)
}

function slashcommand_dlcs(this: void): undefined {
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

function slashcommand_chapters(this: void): undefined {
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

function slashcommand_dlcsandchapter(this: void): undefined {
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

function slash_help(this: void): undefined {
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

function slash_debug_help(this: void): undefined {
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

function command_handler(this: void, args: string): undefined {
  const options = getOptionsFromSlashCommandString(args)

  const firstParam = options[0]
  const secondParam = options[1]
  if (
    options.length === 0 ||
    firstParam === undefined ||
    firstParam === "" ||
    callHelpParams[asString(firstParam)] === true
  ) {
    slash_help()
  } else if (firstParam !== undefined) {
    if (callSearchParams[asString(firstParam)] === true) {
      removeStandardDebugSlashCommandOptions(options)
      slash_search(options)
    } else if (firstParam === "dlcs") {
      slashcommand_dlcs()
    } else if (firstParam === "chapters") {
      slashcommand_chapters()
    } else if (firstParam === "dlcsandchapters") {
      slashcommand_dlcsandchapter()
    } else if (firstParam === "debug") {
      if (secondParam !== undefined) {
        const debugFunc = callDebugParams[asString(secondParam)]
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
        slash_debug_help()
      }
    }
  }
}

function createSetSearchSlashCommands(this: void, doAdd: boolean): undefined {
  if (doAdd) {
    if (!IsConsole && !IsInGamepadPreferredMode()) {
      if (SLASH_COMMANDS["/libsetssearch"] === undefined) {
        SLASH_COMMANDS["/libsetssearch"] = slash_search_helper
      }
      if (SLASH_COMMANDS["/lss"] === undefined) {
        SLASH_COMMANDS["/lss"] = slash_search_helper
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
  SLASH_COMMANDS["/libsets"] = command_handler
  if (SLASH_COMMANDS["/sets"] === undefined) {
    SLASH_COMMANDS["/sets"] = command_handler
  }
  if (SLASH_COMMANDS["/ls"] === undefined) {
    SLASH_COMMANDS["/ls"] = command_handler
  }

  SLASH_COMMANDS["/libsetsdlcsandchapters"] = slashcommand_dlcsandchapter
  SLASH_COMMANDS["/dlcsandchapters"] = slashcommand_dlcsandchapter
  SLASH_COMMANDS["/libsetsdlcs"] = slashcommand_dlcs
  SLASH_COMMANDS["/dlcs"] = slashcommand_dlcs
  SLASH_COMMANDS["/libsetschapters"] = slashcommand_chapters
  SLASH_COMMANDS["/chapters"] = slashcommand_chapters

  createSetSearchSlashCommands(true)
}
libInternal["_createSlashCommands"] = createSlashCommands
