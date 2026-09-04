import {
  asLangRecord,
  asPresent,
  asUnknownArray,
} from "../lib-sets-casts/lib-sets-casts.module.code.ts"
import {
  asLibZoneOpt,
  asWayshrineSV,
} from "../lib-sets-debug-casts/lib-sets-debug-casts.module.code.ts"
import {
  clientLang,
  DEBUG_HOLDER,
  DEBUG_OUTPUT_START_LINE,
  libPrefix,
  libPrefixWithVersion,
  MAJOR,
  storedInSVFileLibSetsInTable,
  UNKNOWN_NAME,
} from "../lib-sets-debug-debug-state/lib-sets-debug-debug-state.module.code.ts"

const lib = LibSets

const tsort = table.sort
const zostrfor = zo_strformat
const zocstrfor = ZO_CachedStrFormat

const UPPER_CASE_FIRST_FORMATTER = "<<C:1>>"

function getAllZoneInfo(this: void): { [lang: string]: { [zoneId: number]: string } } | undefined {
  if (lib.nonOfficialLanguages[clientLang] !== undefined) {
    return undefined
  }

  d(
    DEBUG_OUTPUT_START_LINE +
      libPrefixWithVersion +
      "GetAllZoneInfo, language: " +
      tostring(clientLang)
  )
  const maxZoneId = 2000
  const zoneData: { [lang: string]: { [zoneId: number]: string } } = {}
  zoneData[clientLang] = {}
  const zoneDataForLang = asPresent(zoneData[clientLang])
  const zoneIndex1ZoneId = GetZoneId(1)
  for (const zoneId of $range(1, maxZoneId, 1)) {
    const zi = GetZoneIndex(zoneId)
    if (zi !== undefined) {
      const pzid = GetParentZoneId(zoneId)
      if ((zi === 1 && zoneId === zoneIndex1ZoneId) || zi !== 1) {
        const zoneNameClean = zostrfor(UPPER_CASE_FIRST_FORMATTER, GetZoneNameByIndex(zi))
        if (zoneNameClean !== undefined) {
          zoneDataForLang[zoneId] = zoneId + "|" + zi + "|" + pzid + "|" + zoneNameClean
        }
      }
    }
  }
  return zoneData
}

function getWayshrineInfo(this: void): { [nodeId: number]: string } | undefined {
  d(DEBUG_OUTPUT_START_LINE + libPrefixWithVersion + "GetWayshrineInfo")
  const errorMapNavigateText =
    " Please open the map and navigate to a zone map first before running this function!"
  const wayshrines: { [nodeId: number]: string } = {}
  const currentMapIndex = GetCurrentMapIndex()
  if (currentMapIndex === undefined) {
    d("<-Error: map index missing." + errorMapNavigateText)
  }
  const currentMapId = GetCurrentMapId()
  if (currentMapId === undefined) {
    d("<-Error: map id missing." + errorMapNavigateText)
    return undefined
  }
  const currentMapsZoneIndex = GetCurrentMapZoneIndex()
  if (currentMapsZoneIndex === undefined) {
    d("<-Error: map zone index missing." + errorMapNavigateText)
    return undefined
  }
  const currentZoneId = GetZoneId(currentMapsZoneIndex)
  if (currentZoneId === undefined) {
    d("<-Error: map zone id missing." + errorMapNavigateText)
    return undefined
  }
  const currentMapName = zocstrfor(
    UPPER_CASE_FIRST_FORMATTER,
    currentMapIndex !== undefined
      ? GetMapNameByIndex(currentMapIndex)
      : GetMapNameById(currentMapId)
  )
  const currentZoneName = zocstrfor(
    UPPER_CASE_FIRST_FORMATTER,
    GetZoneNameByIndex(currentMapsZoneIndex)
  )
  d(
    "->mapIndex: " +
      tostring(currentMapIndex) +
      ", mapId: " +
      tostring(currentMapId) +
      ", mapName: " +
      tostring(currentMapName) +
      ", mapZoneIndex: " +
      tostring(currentMapsZoneIndex) +
      ", zoneId: " +
      tostring(currentZoneId) +
      ", zoneName: " +
      tostring(currentZoneName)
  )
  for (const i of $range(1, GetNumFastTravelNodes(), 1)) {
    const [, wsname, , , , , wspoiType, wsisShownInCurrentMap] = GetFastTravelNodeInfo(i)
    if (wsisShownInCurrentMap) {
      const wsNameStripped = zocstrfor(UPPER_CASE_FIRST_FORMATTER, wsname)
      d("->[" + tostring(i) + "] " + tostring(wsNameStripped))
      wayshrines[i] =
        tostring(i) +
        "|" +
        tostring(currentMapIndex) +
        "|" +
        tostring(currentMapId) +
        "|" +
        tostring(currentMapName) +
        "|" +
        tostring(currentMapsZoneIndex) +
        "|" +
        tostring(currentZoneId) +
        "|" +
        tostring(currentZoneName) +
        "|" +
        tostring(wspoiType) +
        "|" +
        tostring(wsNameStripped)
    }
  }
  return wayshrines
}
lib.DebugGetWayshrineInfo = getWayshrineInfo

function getWayshrineNames(
  this: void
): { [lang: string]: { [nodeId: number]: string } } | undefined {
  if (lib.nonOfficialLanguages[clientLang] !== undefined) {
    return undefined
  }

  d(
    DEBUG_OUTPUT_START_LINE +
      libPrefixWithVersion +
      "GetWayshrineNames, language: " +
      tostring(clientLang)
  )

  const wsNames: { [lang: string]: { [nodeId: number]: string } } = {}
  wsNames[clientLang] = {}
  const wsNamesForLang = asPresent(wsNames[clientLang])
  for (const wsNodeId of $range(1, GetNumFastTravelNodes(), 1)) {
    const [, wsLocalizedName] = GetFastTravelNodeInfo(wsNodeId)
    if (wsLocalizedName !== undefined) {
      const wsLocalizedNameClean = zocstrfor(UPPER_CASE_FIRST_FORMATTER, wsLocalizedName)
      wsNamesForLang[wsNodeId] = tostring(wsNodeId) + "|" + wsLocalizedNameClean
    }
  }
  return wsNames
}

function getMapNames(this: void, lang?: string): { [mapIndex: number]: string } | undefined {
  const langToUse = lang ?? clientLang

  if (lib.nonOfficialLanguages[langToUse] !== undefined) {
    return undefined
  }

  d(
    DEBUG_OUTPUT_START_LINE + libPrefixWithVersion + "GetMapNames, language: " + tostring(langToUse)
  )
  const lz = asLibZoneOpt(lib.libZone)
  if (lz === undefined) {
    if (langToUse !== clientLang) {
      d("ERROR: Library 'LibZone' must be loaded to get a zoneName in another language!")
      return undefined
    }
  }
  let zoneIds: { [lang: string]: { [zoneId: number]: string } } | undefined
  let zoneIdsLocalized: { [zoneId: number]: string }
  if (lz !== undefined) {
    if (lz.GetAllZoneData !== undefined) {
      zoneIds = lz.GetAllZoneData()
    } else if (lz.givenZoneData !== undefined) {
      zoneIds = lz.givenZoneData
    }
    if (zoneIds === undefined) {
      d("ERROR: Library 'LibZone' givenZoneData is missing!")
      return undefined
    }
    const localized = zoneIds[langToUse]
    if (localized === undefined) {
      d('ERROR: Language "' + tostring(langToUse) + "\" is not scanned yet in library 'LibZone'")
      return undefined
    }
    zoneIdsLocalized = localized
  } else {
    zoneIdsLocalized = {}
  }
  for (const zoneIndex of $range(0, GetNumZones(), 1)) {
    const zoneId = GetZoneId(zoneIndex)
    if (zoneId !== undefined && zoneIdsLocalized[zoneId] === undefined) {
      let zoneName = GetZoneNameByIndex(zoneIndex)
      if (zoneName === undefined || zoneName === "") {
        zoneName = UNKNOWN_NAME
      }
      zoneIdsLocalized[zoneId] = zocstrfor(UPPER_CASE_FIRST_FORMATTER, zoneName)
    }
  }
  const mapNames: { [mapIndex: number]: string } = {}
  for (const [zoneId, zoneNameLocalized] of pairs(zoneIdsLocalized)) {
    const mapIndex = GetMapIndexByZoneId(asPresent(zoneId))
    if (mapIndex !== undefined) {
      const mapId = GetMapIdByIndex(mapIndex)
      const mapName = zocstrfor(UPPER_CASE_FIRST_FORMATTER, GetMapNameByIndex(mapIndex))
      if (mapName !== undefined) {
        mapNames[mapIndex] =
          tostring(mapId) +
          "|" +
          tostring(mapIndex) +
          "|" +
          mapName +
          "|" +
          tostring(zoneId) +
          "|" +
          zoneNameLocalized
      }
    }
  }
  return mapNames
}

function debugResetSavedVariables(
  this: void,
  noReloadInfo?: boolean,
  onlyNames?: boolean
): undefined {
  const only = onlyNames ?? false
  const noReload = noReloadInfo ?? false
  const onlyNamesText = !only ? "" : " of names"
  lib.LoadSavedVariables()
  const sv = asPresent(lib.svDebugData)
  if (only === true) {
    sv[LIBSETS_TABLEKEY_MAPS] = undefined
    sv[LIBSETS_TABLEKEY_WAYSHRINE_NAMES] = undefined
    sv[LIBSETS_TABLEKEY_ZONE_DATA] = undefined
    sv[LIBSETS_TABLEKEY_MIXED_SETNAMES] = undefined
    sv[LIBSETS_TABLEKEY_SETNAMES] = undefined
    sv[LIBSETS_TABLEKEY_ACHIEVEMENT_CATEGORY_NAMES] = undefined
    sv[LIBSETS_TABLEKEY_COLLECTIBLE_DLC_NAMES] = undefined
    sv[LIBSETS_TABLEKEY_COLLECTIBLE_NAMES] = undefined
  } else {
    sv[LIBSETS_TABLEKEY_SETITEMIDS] = undefined
    sv[LIBSETS_TABLEKEY_SETITEMIDS_NO_SETID] = undefined
    sv[LIBSETS_TABLEKEY_SETITEMIDS_COMPRESSED] = undefined
    sv[LIBSETS_TABLEKEY_SETS_EQUIP_TYPES] = undefined
    sv[LIBSETS_TABLEKEY_SETS_ARMOR_TYPES] = undefined
    sv[LIBSETS_TABLEKEY_SETS_JEWELRY] = undefined
    sv[LIBSETS_TABLEKEY_SETS_WEAPONS_TYPES] = undefined
    sv[LIBSETS_TABLEKEY_WAYSHRINES] = undefined
    sv[LIBSETS_TABLEKEY_DUNGEONFINDER_DATA] = undefined

    sv[LIBSETS_TABLEKEY_MAPS] = undefined
    sv[LIBSETS_TABLEKEY_WAYSHRINE_NAMES] = undefined
    sv[LIBSETS_TABLEKEY_ZONE_DATA] = undefined
    sv[LIBSETS_TABLEKEY_MIXED_SETNAMES] = undefined
    sv[LIBSETS_TABLEKEY_SETNAMES] = undefined
    sv[LIBSETS_TABLEKEY_ACHIEVEMENT_CATEGORY_NAMES] = undefined
    sv[LIBSETS_TABLEKEY_COLLECTIBLE_DLC_NAMES] = undefined
    sv[LIBSETS_TABLEKEY_COLLECTIBLE_NAMES] = undefined
  }
  d(libPrefix + "Cleared all SavedVariables" + onlyNamesText + " in file '" + MAJOR + ".lua'.")
  if (noReload === true) {
    return
  }
  d(">Please do a /reloadui or logout to update the SavedVariables data now!")
}
lib.DebugResetSavedVariables = debugResetSavedVariables
DEBUG_HOLDER.debugResetSavedVariables = debugResetSavedVariables

function debugGetAllZoneInfo(this: void): undefined {
  const zoneData = getAllZoneInfo()
  if (zoneData !== undefined) {
    lib.LoadSavedVariables()
    const sv = asPresent(lib.svDebugData)
    if (sv[LIBSETS_TABLEKEY_ZONE_DATA] === undefined) {
      sv[LIBSETS_TABLEKEY_ZONE_DATA] = {}
    }
    const zoneSV = asLangRecord(sv[LIBSETS_TABLEKEY_ZONE_DATA])
    zoneSV[clientLang] = zoneData[clientLang]
    d(
      storedInSVFileLibSetsInTable +
        "'" +
        LIBSETS_TABLEKEY_ZONE_DATA +
        "', language: '" +
        tostring(clientLang) +
        "'"
    )
  }
}
lib.DebugGetAllZoneInfo = debugGetAllZoneInfo
DEBUG_HOLDER.debugGetAllZoneInfo = debugGetAllZoneInfo

function debugGetAllMapNames(this: void): undefined {
  const maps = getMapNames(clientLang)
  if (maps !== undefined) {
    tsort(asUnknownArray(maps))
    lib.LoadSavedVariables()
    const sv = asPresent(lib.svDebugData)
    if (sv[LIBSETS_TABLEKEY_MAPS] === undefined) {
      sv[LIBSETS_TABLEKEY_MAPS] = {}
    }
    const mapsSV = asLangRecord(sv[LIBSETS_TABLEKEY_MAPS])
    mapsSV[clientLang] = maps
    d(
      storedInSVFileLibSetsInTable +
        "'" +
        LIBSETS_TABLEKEY_MAPS +
        "', language: '" +
        tostring(clientLang) +
        "'"
    )
  }
}
lib.DebugGetAllMapNames = debugGetAllMapNames
DEBUG_HOLDER.debugGetAllMapNames = debugGetAllMapNames

function debugGetAllWayshrineInfoOfCurrentMap(this: void): undefined {
  let delay = 0
  let wayshrinesAvailable = false
  if (!ZO_WorldMap_IsWorldMapShowing()) {
    if (ZO_WorldMap_ShowWorldMap !== undefined) {
      ZO_WorldMap_ShowWorldMap()
    }
    delay = 250
  }
  let mapRightClickCounter = 1
  while (mapRightClickCounter <= 5 && wayshrinesAvailable === false) {
    mapRightClickCounter = mapRightClickCounter + 1
    wayshrinesAvailable =
      ZO_WorldMap_IsPinGroupShown(MAP_FILTER_WAYSHRINES) && GetCurrentMapIndex() !== undefined
    if (wayshrinesAvailable === false) {
      ZO_WorldMap_MouseUp(undefined, MOUSE_BUTTON_INDEX_RIGHT, true)
    } else {
      mapRightClickCounter = 9
      wayshrinesAvailable = true
      break
    }
  }
  if (wayshrinesAvailable === true) {
    zo_callLater((): undefined => {
      const ws = getWayshrineInfo()
      if (ws !== undefined) {
        tsort(asUnknownArray(ws))
        lib.LoadSavedVariables()
        const sv = asPresent(lib.svDebugData)
        if (sv[LIBSETS_TABLEKEY_WAYSHRINES] === undefined) {
          sv[LIBSETS_TABLEKEY_WAYSHRINES] = {}
        }
        const wsSV = asWayshrineSV(sv[LIBSETS_TABLEKEY_WAYSHRINES])
        for (const [wsNodeId, wsData] of pairs(ws)) {
          wsSV[wsNodeId] = wsData
        }
        d(storedInSVFileLibSetsInTable + "'" + LIBSETS_TABLEKEY_WAYSHRINES + "'")
      }
    }, delay)
  }
}
lib.DebugGetAllWayshrineInfoOfCurrentMap = debugGetAllWayshrineInfoOfCurrentMap
DEBUG_HOLDER.debugGetAllWayshrineInfoOfCurrentMap = debugGetAllWayshrineInfoOfCurrentMap

function debugGetAllWayshrineNames(this: void): undefined {
  const wsNames = getWayshrineNames()
  if (wsNames !== undefined && wsNames[clientLang] !== undefined) {
    lib.LoadSavedVariables()
    const sv = asPresent(lib.svDebugData)
    if (sv[LIBSETS_TABLEKEY_WAYSHRINE_NAMES] === undefined) {
      sv[LIBSETS_TABLEKEY_WAYSHRINE_NAMES] = {}
    }
    const wsNamesSV = asLangRecord(sv[LIBSETS_TABLEKEY_WAYSHRINE_NAMES])
    wsNamesSV[clientLang] = wsNames[clientLang]
    d(
      storedInSVFileLibSetsInTable +
        "'" +
        LIBSETS_TABLEKEY_WAYSHRINE_NAMES +
        "', language: '" +
        tostring(clientLang) +
        "'"
    )
  }
}
lib.DebugGetAllWayshrineNames = debugGetAllWayshrineNames
DEBUG_HOLDER.debugGetAllWayshrineNames = debugGetAllWayshrineNames
