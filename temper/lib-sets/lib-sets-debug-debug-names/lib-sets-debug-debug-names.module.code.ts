import {
  asLangRecord,
  asNumRecordOpt,
  asPresent,
} from "../lib-sets-casts/lib-sets-casts.module.code.ts"
import {
  asDungeonFinderKeyboard,
  asNewSetIdsSV,
  asSetNamesTable,
  asSetNamesTableOpt,
} from "../lib-sets-debug-casts/lib-sets-debug-casts.module.code.ts"
import {
  apiVersion,
  clientLang,
  DEBUG_HOLDER,
  fallbackLang,
  libPrefix,
  MAJOR,
  NON_OFFICIAL_LANGUAGES,
  SCAN_STATE,
  UNKNOWN_NAME,
  worldName,
} from "../lib-sets-debug-debug-state/lib-sets-debug-debug-state.module.code.ts"

const lib = LibSets

const zocstrfor = ZO_CachedStrFormat

const UPPER_CASE_FIRST_FORMATTER = "<<C:1>>"

let preventEndlessCallDungeonFinderData = false
let retTableDungeons: string[] | undefined
const getDungeonFinderDataFromChildNodes = lib.GetDungeonFinderDataFromChildNodes
const openDungeonFinder = lib.OpenDungeonFinder

function freshDungeonTable(this: void): string[] | undefined {
  return undefined
}

function debugGetDungeonFinderData(
  this: void,
  dungeonFinderIndex?: number,
  noReloadInfo?: boolean
): undefined {
  const noReload = noReloadInfo ?? false
  d(libPrefix + "Start to load all dungeon data from the keyboard dungeon finder...")
  const dfIndex = dungeonFinderIndex ?? 3

  retTableDungeons = freshDungeonTable()
  let dungeonsAddedNormal = 0
  let dungeonsAddedVet = 0
  let dungeonsAdded = 0
  let openDungeonFinderNow = false

  const dungeonFinder = asDungeonFinderKeyboard(DUNGEON_FINDER_KEYBOARD)
  if (
    dungeonFinder !== undefined &&
    dungeonFinder.navigationTree !== undefined &&
    dungeonFinder.navigationTree.rootNode !== undefined
  ) {
    const dfRootNode = dungeonFinder.navigationTree.rootNode
    if (dfRootNode.children !== undefined) {
      if (dfIndex === 3) {
        let dungeonsData = dfRootNode.children[1]
        if (dungeonsData !== undefined) {
          dungeonsAddedNormal = getDungeonFinderDataFromChildNodes(
            dungeonsData,
            retTableDungeons,
            undefined
          )
        }
        dungeonsData = dfRootNode.children[2]
        if (dungeonsData !== undefined) {
          dungeonsAddedVet = getDungeonFinderDataFromChildNodes(
            dungeonsData,
            retTableDungeons,
            undefined
          )
        }
        dungeonsAdded = dungeonsAddedNormal + dungeonsAddedVet
      } else {
        const dungeonsData = dfRootNode.children[dfIndex]
        dungeonsAdded = getDungeonFinderDataFromChildNodes(
          dungeonsData,
          retTableDungeons,
          undefined
        )
      }
    } else {
      if (preventEndlessCallDungeonFinderData === true) {
        d(
          "<Please open the dungeon finder and choose the 'Specific dungeon' entry from the dropdown box at the top-right edge! Then try this function again."
        )
        preventEndlessCallDungeonFinderData = false
        return
      } else {
        preventEndlessCallDungeonFinderData = true
        openDungeonFinderNow = true
      }
    }
  }
  if (
    !openDungeonFinderNow &&
    retTableDungeons !== undefined &&
    retTableDungeons.length > 0 &&
    dungeonsAdded > 0
  ) {
    lib.LoadSavedVariables()
    const sv = asPresent(lib.svDebugData)
    sv[LIBSETS_TABLEKEY_DUNGEONFINDER_DATA] = retTableDungeons
    d(
      "->Stored " +
        tostring(dungeonsAdded) +
        " entries in SaveVariables file '" +
        MAJOR +
        ".lua', in the table '" +
        LIBSETS_TABLEKEY_DUNGEONFINDER_DATA +
        "', language: '" +
        tostring(clientLang) +
        "'"
    )
    if (noReload === true) {
      return
    }
    d(">Please do a /reloadui to update the file properly!")
  } else {
    if (openDungeonFinderNow === true) {
      d("<No dungeon data was found! Opening the dungeon finder now")
      openDungeonFinder(dfIndex, lib.DebugGetDungeonFinderData, noReload)
    }
  }
}
lib.DebugGetDungeonFinderData = debugGetDungeonFinderData
DEBUG_HOLDER.debugGetDungeonFinderData = debugGetDungeonFinderData

function debugGetAllAchievementCategoryNames(
  this: void,
  achievementStartId?: number,
  achievementEndId?: number,
  noReloadInfo?: boolean,
  ingameList?: boolean
): undefined {
  const startId = achievementStartId ?? 1
  let endId = achievementEndId ?? lib.debugMaxCollectibleIds
  const noReload = noReloadInfo ?? false
  const inGame = ingameList ?? false

  if (NON_OFFICIAL_LANGUAGES[clientLang] !== undefined) {
    return
  }

  if (endId < startId) {
    endId = startId
  }
  d(
    libPrefix +
      "Start to load all achievements with start ID " +
      startId +
      " to end ID " +
      endId +
      "..."
  )
  let achievementCategoriesAdded = 0
  const achievementDataScanned: { [topLevelIndex: number]: string } = {}
  const alreadyAdded: { [name: string]: boolean } = {}
  for (const i of $range(startId, endId, 1)) {
    const [topLevelIndex] = GetCategoryInfoFromAchievementId(i)
    if (topLevelIndex !== undefined) {
      const [categoryNameRaw] = GetAchievementCategoryInfo(topLevelIndex)
      const achievementCategoryName = zocstrfor(UPPER_CASE_FIRST_FORMATTER, categoryNameRaw)
      if (
        achievementCategoryName !== undefined &&
        achievementCategoryName !== "" &&
        alreadyAdded[achievementCategoryName] === undefined
      ) {
        alreadyAdded[achievementCategoryName] = true
        achievementDataScanned[topLevelIndex] =
          (!inGame ? tostring(topLevelIndex) + "|" : "") + achievementCategoryName
        achievementCategoriesAdded = achievementCategoriesAdded + 1
      }
    }
  }
  if (achievementCategoriesAdded > 0) {
    lib.LoadSavedVariables()
    const sv = asPresent(lib.svDebugData)
    if (sv[LIBSETS_TABLEKEY_ACHIEVEMENT_CATEGORY_NAMES] === undefined) {
      sv[LIBSETS_TABLEKEY_ACHIEVEMENT_CATEGORY_NAMES] = {}
    }
    const achSV = asLangRecord(sv[LIBSETS_TABLEKEY_ACHIEVEMENT_CATEGORY_NAMES])
    achSV[clientLang] = achievementDataScanned
    d(
      "->Stored " +
        tostring(achievementCategoriesAdded) +
        " entries in SaveVariables file '" +
        MAJOR +
        ".lua', in the table '" +
        LIBSETS_TABLEKEY_ACHIEVEMENT_CATEGORY_NAMES +
        "', language: '" +
        tostring(clientLang) +
        "'\nPlease do a /reloadui or logout to update the SavedVariables data now!"
    )
    if (noReload === true) {
      return
    }
    d("Please do a /reloadui or logout to update the SavedVariables data now!")
  }
}
lib.DebugGetAllAchievementCategoryNames = debugGetAllAchievementCategoryNames
DEBUG_HOLDER.debugGetAllAchievementCategoryNames = debugGetAllAchievementCategoryNames

function debugGetAllCollectibleDLCNames(this: void, noReloadInfo?: boolean): undefined {
  const noReload = noReloadInfo ?? false

  if (NON_OFFICIAL_LANGUAGES[clientLang] !== undefined) {
    return
  }

  const dlcNames: { [collectibleId: number]: string } = {}
  let collectiblesAdded = 0
  d(libPrefix + "Start to load all DLC collectibles")
  for (const collectibleIndex of $range(
    1,
    GetTotalCollectiblesByCategoryType(COLLECTIBLE_CATEGORY_TYPE_DLC)
  )) {
    const collectibleId = GetCollectibleIdFromType(COLLECTIBLE_CATEGORY_TYPE_DLC, collectibleIndex)
    const [rawName] = GetCollectibleInfo(collectibleId)
    const collectibleName = zocstrfor(UPPER_CASE_FIRST_FORMATTER, rawName)
    dlcNames[collectibleId] = collectibleId + "|DLC|" + collectibleName
    collectiblesAdded = collectiblesAdded + 1
  }
  for (const collectibleIndex of $range(
    1,
    GetTotalCollectiblesByCategoryType(COLLECTIBLE_CATEGORY_TYPE_CHAPTER)
  )) {
    const collectibleId = GetCollectibleIdFromType(
      COLLECTIBLE_CATEGORY_TYPE_CHAPTER,
      collectibleIndex
    )
    const [rawName] = GetCollectibleInfo(collectibleId)
    const collectibleName = zocstrfor(UPPER_CASE_FIRST_FORMATTER, rawName)
    dlcNames[collectibleId] = collectibleId + "|CHAPTER|" + collectibleName
    collectiblesAdded = collectiblesAdded + 1
  }
  if (collectiblesAdded > 0) {
    lib.LoadSavedVariables()
    const sv = asPresent(lib.svDebugData)
    if (sv[LIBSETS_TABLEKEY_COLLECTIBLE_DLC_NAMES] === undefined) {
      sv[LIBSETS_TABLEKEY_COLLECTIBLE_DLC_NAMES] = {}
    }
    const dlcSV = asLangRecord(sv[LIBSETS_TABLEKEY_COLLECTIBLE_DLC_NAMES])
    dlcSV[clientLang] = dlcNames
    d(
      "->Stored " +
        tostring(collectiblesAdded) +
        " entries in SaveVariables file '" +
        MAJOR +
        ".lua', in the table '" +
        LIBSETS_TABLEKEY_COLLECTIBLE_DLC_NAMES +
        "', language: '" +
        tostring(clientLang) +
        "'"
    )
    if (noReload === true) {
      return
    }
    d("Please do a /reloadui or logout to update the SavedVariables data now!")
  }
}
lib.DebugGetAllCollectibleDLCNames = debugGetAllCollectibleDLCNames
DEBUG_HOLDER.debugGetAllCollectibleDLCNames = debugGetAllCollectibleDLCNames

function debugGetAllCollectibleNames(this: void, noReloadInfo?: boolean): undefined {
  const noReload = noReloadInfo ?? false

  if (NON_OFFICIAL_LANGUAGES[clientLang] !== undefined) {
    return
  }

  const collectibleNames: { [collectibleId: number]: string } = {}
  let collectiblesAdded = 0
  d(libPrefix + "Start to load all collectibles")

  for (const collectibleCategoryIndex of $range(1, GetNumCollectibleCategories(), 1)) {
    for (const collectibleIndex of $range(
      1,
      GetTotalCollectiblesByCategoryType(collectibleCategoryIndex)
    )) {
      const collectibleId = GetCollectibleIdFromType(collectibleCategoryIndex, collectibleIndex)
      if (collectibleId !== undefined && collectibleId !== 0) {
        const [rawName] = GetCollectibleInfo(collectibleId)
        if (rawName !== undefined && rawName !== "") {
          const collectibleName = zocstrfor(UPPER_CASE_FIRST_FORMATTER, rawName)
          collectibleNames[collectibleId] = collectibleId + "|DLC|" + collectibleName
          collectiblesAdded = collectiblesAdded + 1
        }
      }
    }
  }
  if (collectiblesAdded > 0) {
    lib.LoadSavedVariables()
    const sv = asPresent(lib.svDebugData)
    if (sv[LIBSETS_TABLEKEY_COLLECTIBLE_NAMES] === undefined) {
      sv[LIBSETS_TABLEKEY_COLLECTIBLE_NAMES] = {}
    }
    const colSV = asLangRecord(sv[LIBSETS_TABLEKEY_COLLECTIBLE_NAMES])
    colSV[clientLang] = collectibleNames
    d(
      "->Stored " +
        tostring(collectiblesAdded) +
        " entries in SaveVariables file '" +
        MAJOR +
        ".lua', in the table '" +
        LIBSETS_TABLEKEY_COLLECTIBLE_NAMES +
        "', language: '" +
        tostring(clientLang) +
        "'"
    )
    if (noReload === true) {
      return
    }
    d("Please do a /reloadui or logout to update the SavedVariables data now!")
  }
}
lib.DebugGetAllCollectibleNames = debugGetAllCollectibleNames

function debugShowNewSetIds(this: void, noChatOutput?: boolean): undefined {
  const noChat = noChatOutput ?? false
  if (!noChat) {
    d(libPrefix + "DebugShowNewSetIds - Checking for new setIds...")
  }

  const newSetsLoadedFromSV = false
  let tempSetNamesOfClientLang: { [setId: number]: string } | undefined
  asPresent(DEBUG_HOLDER.checkForNewSetIds)(
    asNumRecordOpt(lib.setDataPreloaded[LIBSETS_TABLEKEY_SETITEMIDS]),
    undefined,
    true,
    true
  )
  const newSetsFound = SCAN_STATE.newSetIdsFound.length
  if (newSetsFound > 0) {
    if (!noChat) {
      d(">Found " + tostring(newSetsFound) + " new setIds!")
    }
    const preloadedSetNames = asSetNamesTableOpt(lib.setDataPreloaded[LIBSETS_TABLEKEY_SETNAMES])
    for (const [, newSetId] of ipairs(SCAN_STATE.newSetIdsFound)) {
      const entry = preloadedSetNames[newSetId]
      let newSetName = entry !== undefined ? (entry[clientLang] ?? entry[fallbackLang]) : undefined
      if (newSetName === undefined || newSetName === "") {
        newSetName = asPresent(DEBUG_HOLDER.getNewSetName)(newSetId)
      }
      newSetName = zocstrfor(UPPER_CASE_FIRST_FORMATTER, newSetName)
      if (!noChat) {
        df(">>New setId found: %s -> name: %s", tostring(newSetId), tostring(newSetName))
      }
      if (newSetName !== undefined && newSetName !== UNKNOWN_NAME) {
        if (tempSetNamesOfClientLang === undefined) {
          tempSetNamesOfClientLang = {}
        }
        tempSetNamesOfClientLang[newSetId] = newSetName
      }
    }
  }
  if (newSetsFound === 0) {
    if (!noChat) {
      return
    }
    d("<No new setIds were found!\nDid you run function 'LibSets.DebugScanAllSetData()' already?")
    d(
      "Please read the function's description text in file 'LibSets_Debug.lua' to be able to update the internal needed tables 'LibSets.setDataPreloaded['setItemIds'] properly, before you try to search for new setIds!"
    )
  } else {
    if (!newSetsLoadedFromSV) {
      lib.LoadSavedVariables()
    }
    const sv = asPresent(lib.svDebugData)
    const apiVersionUpdatedStr = tostring(apiVersion) + "_UpdateInfo"
    if (sv[LIBSETS_TABLEKEY_NEWSETIDS] === undefined) {
      sv[LIBSETS_TABLEKEY_NEWSETIDS] = {}
    }
    const newSetIdsSV = asNewSetIdsSV(sv[LIBSETS_TABLEKEY_NEWSETIDS])
    if (newSetIdsSV[worldName] === undefined) {
      newSetIdsSV[worldName] = {}
    }
    const newSetIdsSVForWorld = asPresent(newSetIdsSV[worldName])
    newSetIdsSVForWorld[tostring(apiVersion)] = SCAN_STATE.newSetIdsFound
    newSetIdsSVForWorld[apiVersionUpdatedStr] = {
      UpdateType: "LibSets.DebugShowNewSetIds()",
      DateTime: os.date("%c"),
    }
    if (tempSetNamesOfClientLang !== undefined) {
      if (sv[LIBSETS_TABLEKEY_SETNAMES] === undefined) {
        sv[LIBSETS_TABLEKEY_SETNAMES] = {}
      }
      const setNamesSV = asSetNamesTable(sv[LIBSETS_TABLEKEY_SETNAMES])
      for (const [setId, setName] of pairs(tempSetNamesOfClientLang)) {
        if (setNamesSV[setId] === undefined) {
          setNamesSV[setId] = {}
        }
        setNamesSV[setId][clientLang] = setName
      }
    }
  }
}
lib.DebugShowNewSetIds = debugShowNewSetIds
DEBUG_HOLDER.debugShowNewSetIds = debugShowNewSetIds

function debugGetAllNames(this: void, noReloadInfo?: boolean): undefined {
  const noReload = noReloadInfo ?? false
  debugGetAllAchievementCategoryNames(undefined, undefined, noReload)
  d(">>>--------------->>>")
  debugGetAllCollectibleDLCNames(noReload)
  d(">>>--------------->>>")
  asPresent(DEBUG_HOLDER.debugGetAllMapNames)()
  d(">>>--------------->>>")
  asPresent(DEBUG_HOLDER.debugGetAllWayshrineNames)()
  d(">>>--------------->>>")
  asPresent(DEBUG_HOLDER.debugGetAllZoneInfo)()
  d(">>>--------------->>>")
  asPresent(DEBUG_HOLDER.debugGetAllSetNames)(noReload)
}
lib.DebugGetAllNames = debugGetAllNames
DEBUG_HOLDER.debugGetAllNames = debugGetAllNames
