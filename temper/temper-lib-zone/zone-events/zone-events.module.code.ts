import {
  asDebugInfoList,
  asSavedVarsTable,
  libSlashCommander,
} from "../zone-casts/zone-casts.module.code.ts"
import { LIB_NAME } from "../zone-constants/zone-constants.module.code.ts"
import { checkMaxZoneIndicesAndIds } from "../zone-internal-helpers/zone-internal-helpers.module.code.ts"
import { lib } from "../zone-lib-state/zone-lib-state.module.code.ts"
import type { SavedVarsTable } from "../zone-types/zone-types.module.code.ts"

function librarySavedVariables(this: void): undefined {
  const info = lib.libraryInfo
  const svVersion = info.svVersion
  const worldName = lib.worldName
  lib.zoneData = ZO_SavedVars.NewAccountWide<SavedVarsTable>(
    info.svDataName,
    svVersion,
    info.svDataTableName,
    {},
    worldName,
    "$AllAccounts"
  )
  lib.localizedZoneData = ZO_SavedVars.NewAccountWide<SavedVarsTable>(
    info.svLocalizedDataName,
    svVersion,
    info.svMissingZoneDataTableName,
    {},
    worldName,
    "$AllAccounts"
  )
  lib.geoDebugData = ZO_SavedVars.NewAccountWide<SavedVarsTable>(
    info.svGeoDebugDataName,
    svVersion,
    undefined,
    {},
    worldName,
    "$AllAccounts"
  )
}

function checkLanguagesZoneDataAndTransferFromSavedVariables(this: void): undefined {
  const clientLang = lib.currentClientLanguage
  const localizedZoneDataSV = lib.localizedZoneData
  const preloadedZoneNamesTable = lib.preloadedZoneNames
  if (lib.checkIfLanguageIsSupported(clientLang) && localizedZoneDataSV[clientLang] !== undefined) {
    const preloadedZoneNamesForLanguage = preloadedZoneNamesTable[clientLang]
    if (preloadedZoneNamesForLanguage !== undefined) {
      const localizedZoneDataSVForLanguage = asSavedVarsTable(localizedZoneDataSV[clientLang])
      checkMaxZoneIndicesAndIds()
      const maxZoneIds = lib.maxZoneIds
      for (const zoneId of $range(0, maxZoneIds)) {
        if (
          lib.zoneData[zoneId] !== undefined &&
          preloadedZoneNamesForLanguage[zoneId] === undefined &&
          localizedZoneDataSVForLanguage[zoneId] !== undefined
        ) {
          preloadedZoneNamesForLanguage[zoneId] = tostring(localizedZoneDataSVForLanguage[zoneId])
        }
      }
    }
  }
}

function didAPIVersionChangeCheck(this: void): LuaMultiReturn<[number, number | undefined]> {
  const currentAPIVersion = lib.currentAPIVersion
  const clientLang = lib.currentClientLanguage
  let lastCheckedZoneAPIVersion: number | undefined
  const allLanguages = lib.zoneData.__lastZoneCheckAPIVersion__
  const ofClientLanguage =
    allLanguages === undefined ? undefined : asSavedVarsTable(allLanguages)[clientLang]
  if (ofClientLanguage !== undefined) {
    const debugInfo = asSavedVarsTable(ofClientLanguage).__debugInfo__
    if (debugInfo !== undefined) {
      const debugInfoList = asDebugInfoList(debugInfo)
      let count = debugInfoList.length
      if (count === 0) count = NonContiguousCount(debugInfoList)
      if (count > 0) {
        const lastData = debugInfoList[count]
        if (lastData !== undefined) {
          lastCheckedZoneAPIVersion = lastData.APIVersionLastUpdate ?? lastData.APIVersion
        }
      }
    }
  }
  return $multi(currentAPIVersion, lastCheckedZoneAPIVersion)
}

function onLibraryLoaded(this: void, _event: number, name: string): undefined {
  const [zoPrefixStart] = string.find(name, "^ZO_")
  if (zoPrefixStart !== undefined) return
  if (name === LIB_NAME) {
    EVENT_MANAGER.UnregisterForEvent(LIB_NAME, EVENT_ADD_ON_LOADED)

    checkMaxZoneIndicesAndIds()
    librarySavedVariables()

    const [currentAPIVersion, lastCheckedZoneAPIVersion] = didAPIVersionChangeCheck()
    const forceZoneIdUpdateDueToAPIChange =
      lastCheckedZoneAPIVersion === undefined || lastCheckedZoneAPIVersion !== currentAPIVersion

    lib.GetAllZoneDataById(forceZoneIdUpdateDueToAPIChange, false)
    checkLanguagesZoneDataAndTransferFromSavedVariables()

    lib.LSC = lib.LSC ?? libSlashCommander()
    lib.buildLSCZoneSearchAutoComplete()
  }
}

export function initEvents(this: void): undefined {
  EVENT_MANAGER.UnregisterForEvent(LIB_NAME, EVENT_ADD_ON_LOADED)
  EVENT_MANAGER.RegisterForEvent(LIB_NAME, EVENT_ADD_ON_LOADED, onLibraryLoaded)
}
