import { asZoneDataEntry } from "../zone-casts/zone-casts.module.code.ts"
import { LIB_NAME } from "../zone-constants/zone-constants.module.code.ts"
import {
  checkMaxZoneIndicesAndIds,
  parseLuaCapture,
} from "../zone-internal-helpers/zone-internal-helpers.module.code.ts"
import { lib } from "../zone-lib-state/zone-lib-state.module.code.ts"
import type { Lib, ZoneDataEntry } from "../zone-types/zone-types.module.code.ts"

export function initZoneQueries(this: void): undefined {
  lib.GetParentMapId = function (this: Lib, mapId: number): number {
    const [, , , zoneIndex] = GetMapInfoById(mapId)
    const zoneId = GetZoneId(zoneIndex)
    const parentZoneId = GetParentZoneId(zoneId)
    return GetMapIdByZoneId(parentZoneId)
  }

  lib.GetCurrentZoneIds = function (
    this: Lib
  ): LuaMultiReturn<
    [number, number, number | undefined, number, number, number | undefined, number]
  > {
    const currentZoneIndex = GetUnitZoneIndex("player")
    const currentZoneId = GetZoneId(currentZoneIndex ?? 0)
    const currentZoneParentId = GetParentZoneId(currentZoneId)
    const currentZoneParentIndex = GetZoneIndex(currentZoneParentId)
    const mapId = GetCurrentMapId()
    const mapIndex = GetCurrentMapIndex()
    const parentMapId = GetMapIdByIndex(currentZoneParentIndex)
    return $multi(
      currentZoneId,
      currentZoneParentId,
      currentZoneIndex,
      currentZoneParentIndex,
      mapId,
      mapIndex,
      parentMapId
    )
  }

  lib.GetAllZoneData = function (this: Lib): Record<string, Record<number, string>> {
    return lib.preloadedZoneNames
  }

  lib.GetZoneDataBySubZone = function (
    this: Lib,
    subZoneId: number,
    language?: string
  ): Record<number, { parentZoneId: number; name: string }> | undefined {
    assert(
      subZoneId !== undefined,
      `['${LIB_NAME}':GetZoneDataBySubZone]Error: Missing SubZoneId!`
    )[0]
    const lang = language ?? lib.currentClientLanguage
    const parentZoneId = GetParentZoneId(subZoneId)
    if (parentZoneId === 0) return undefined
    const retParentZoneTable: Record<number, { parentZoneId: number; name: string }> = {}
    retParentZoneTable[subZoneId] = {
      parentZoneId,
      name: lib.GetZoneName(parentZoneId, lang),
    }
    return retParentZoneTable
  }

  lib.GetZoneData = function (
    this: Lib,
    zoneId: number,
    subZoneId?: number,
    language?: string
  ): LuaMultiReturn<[ZoneDataEntry | undefined, ZoneDataEntry | undefined]> {
    assert(zoneId !== undefined, `['${LIB_NAME}':GetZoneData]Error: Missing zoneId!`)[0]
    const lang = language ?? lib.currentClientLanguage
    let readZoneData: ZoneDataEntry | undefined
    let readSubZoneData: ZoneDataEntry | undefined
    const zoneData = lib.zoneData
    const localizedZoneData = lib.preloadedZoneNames[lang]
    if (localizedZoneData !== undefined) {
      const rawZoneData = zoneData[zoneId]
      readZoneData = rawZoneData === undefined ? undefined : asZoneDataEntry(rawZoneData)
      const readZoneName = localizedZoneData[zoneId]
      if (readZoneData !== undefined && readZoneName !== undefined && readZoneName !== "") {
        readZoneData.name = readZoneName
      }
      if (subZoneId !== undefined) {
        const parentZoneId = GetParentZoneId(subZoneId)
        if (parentZoneId === zoneId) {
          const rawSubZoneData = zoneData[subZoneId]
          readSubZoneData =
            rawSubZoneData === undefined ? undefined : asZoneDataEntry(rawSubZoneData)
          const readSubZoneName = localizedZoneData[subZoneId]
          if (readSubZoneData !== undefined) {
            readSubZoneData.name = readSubZoneName
          }
        }
      }
    } else {
      d(`['${LIB_NAME}':GetZoneData]Error: Missing zoneData for language "${tostring(lang)}"!`)
    }
    return $multi(readZoneData, readSubZoneData)
  }

  lib.ShowZoneData = function (
    this: Lib,
    zoneId: number,
    subZoneId?: number,
    language?: string
  ): undefined {
    assert(zoneId !== undefined, `['${LIB_NAME}':ShowZoneData]Error: Missing zoneId!`)[0]
    const lang = language ?? lib.currentClientLanguage
    const [zoneIdData, subZoneIdData] = lib.GetZoneData(zoneId, subZoneId, lang)
    if (zoneIdData !== undefined) {
      d(
        `[${LIB_NAME}]ShowZoneData for zoneId "${tostring(zoneId)}", subZoneId: "${tostring(subZoneId)}", language: "${tostring(lang)}"`
      )
      d(`>Zone name: ${tostring(zoneIdData.name)}`)
      if (zoneIdData.zoneIndex !== undefined) d(`>Zone index: ${tostring(zoneIdData.zoneIndex)}`)
      if (subZoneIdData !== undefined) {
        d(`>>SubZone name: ${tostring(subZoneIdData.name)}`)
        if (subZoneIdData.zoneIndex !== undefined)
          d(`>SubZone index: ${tostring(subZoneIdData.zoneIndex)}`)
      }
    } else {
      d(
        `['${LIB_NAME}']ShowZoneData for zoneId "${tostring(zoneId)}", subZoneId: "${tostring(subZoneId)}"\nNo zone data was found for language "${tostring(lang)}"!`
      )
    }
  }

  lib.GetZoneName = function (this: Lib, zoneId: number, language?: string): string {
    assert(zoneId !== undefined, `['${LIB_NAME}':GetZoneName]Error: Missing zoneId!`)[0]
    const lang = language ?? lib.currentClientLanguage
    const localizedZoneIdData = lib.preloadedZoneNames[lang]
    if (localizedZoneIdData === undefined) {
      let retName = ""
      if (lang === lib.currentClientLanguage) {
        retName = ZO_CachedStrFormat("<<C:1>>", GetZoneNameById(zoneId))
      }
      return retName
    }
    const localizedZoneName = localizedZoneIdData[zoneId]
    if (localizedZoneName === undefined) return ""
    return localizedZoneName
  }

  lib.GetZoneNamesByIds = function (
    this: Lib,
    zoneIdsTable: Record<number, number>,
    language?: string
  ): Record<number, string> {
    assert(
      zoneIdsTable !== undefined && type(zoneIdsTable) === "table",
      `['${LIB_NAME}':GetZoneNamesByIds]Error: Missing zoneId table.\nTable's format must be "[number TableIndex] = number ZoneId,"!`
    )[0]
    const lang = language ?? lib.currentClientLanguage
    const retNameTable: Record<number, string> = {}
    for (const [, zoneId] of pairs(zoneIdsTable)) {
      if (type(zoneId) === "number") {
        const zoneName = lib.GetZoneName(zoneId, lang)
        if (zoneName !== "") {
          retNameTable[zoneId] = zoneName
        }
      }
    }
    return retNameTable
  }

  lib.GetZoneDataByIds = function (
    this: Lib,
    zoneIdsTable: Record<number, number>,
    language?: string
  ): Record<number, ZoneDataEntry> {
    assert(
      zoneIdsTable !== undefined && type(zoneIdsTable) === "table",
      `['${LIB_NAME}':GetZoneDataByIds]Error: Missing zoneId table.\nTable's format must be "[number TableIndex] = number ZoneId,"!`
    )[0]
    const lang = language ?? lib.currentClientLanguage
    const retZoneDataTable: Record<number, ZoneDataEntry> = {}
    for (const [, zoneId] of pairs(zoneIdsTable)) {
      if (type(zoneId) === "number") {
        const [zoneData] = lib.GetZoneData(zoneId, undefined, lang)
        if (zoneData !== undefined) {
          retZoneDataTable[zoneId] = zoneData
        }
      }
    }
    return retZoneDataTable
  }

  lib.GetZoneNameByLocalizedSearchString = function (
    this: Lib,
    searchStr: string,
    searchLanguage: string | undefined,
    returnLanguage: string
  ): Record<number, string> {
    assert(
      searchStr !== undefined && searchStr !== "",
      `['${LIB_NAME}':GetZoneNameByLocalizedSearchString]Error: Missing parameter "searchStr"!`
    )[0]
    assert(
      returnLanguage !== undefined && type(returnLanguage) === "string",
      `[LibZone:GetZoneNameByLocalizedSearchString]Error: Missing or wrong parameter "returnLanguage"!`
    )[0]
    assert(
      lib.checkIfLanguageIsSupported(returnLanguage),
      `['${LIB_NAME}':GetZoneNameByLocalizedSearchString]Error: Return language "${tostring(returnLanguage)}" is not supported!`
    )[0]
    const searchLang = searchLanguage ?? lib.currentClientLanguage
    assert(
      lib.checkIfLanguageIsSupported(searchLang),
      `['${LIB_NAME}':GetZoneNameByLocalizedSearchString]Error: Search language "${tostring(searchLang)}" is not supported!`
    )[0]
    const retZoneIdsTable: number[] = []
    const retZoneLocalizedZoneNamesTable: Record<number, string> = {}
    const [localizedSearchZoneData] = assert(
      lib.preloadedZoneNames[searchLang],
      `['${LIB_NAME}':GetZoneNameByLocalizedSearchString]Error: Missing localized search zone data with language "${tostring(searchLang)}"!`
    )
    const [zoneReturnLocalizedData] = assert(
      lib.preloadedZoneNames[returnLanguage],
      `['${LIB_NAME}':GetZoneNameByLocalizedSearchString]Error: Missing localized return zone data with language "${tostring(returnLanguage)}"!`
    )
    for (const [zoneId, zoneName] of pairs(localizedSearchZoneData)) {
      if (zoneName !== "" && zo_plainstrfind(string.lower(zoneName), string.lower(searchStr))) {
        retZoneIdsTable.push(zoneId)
      }
    }
    if (retZoneIdsTable.length > 0) {
      for (const [, zoneId] of ipairs(retZoneIdsTable)) {
        const returnLocalizedZoneName = zoneReturnLocalizedData[zoneId]
        if (returnLocalizedZoneName !== undefined && returnLocalizedZoneName !== "") {
          retZoneLocalizedZoneNamesTable[zoneId] = returnLocalizedZoneName
        }
      }
    }
    return retZoneLocalizedZoneNamesTable
  }

  lib.GetMaxZoneId = function (this: Lib): LuaMultiReturn<[number, number]> {
    checkMaxZoneIndicesAndIds()
    return $multi(lib.maxZoneIds, lib.maxZoneIndices)
  }

  lib.GetZoneNameByMapTexture = function (
    this: Lib,
    mapTileTextureName?: string,
    patternToUse?: string,
    chatOutput?: boolean
  ): LuaMultiReturn<
    [string | undefined, string | undefined, string | undefined, string | undefined]
  > {
    const doChatOutput = chatOutput ?? false
    const textureName = mapTileTextureName ?? GetMapTileTexture()
    if (textureName === "") return $multi(undefined, undefined, undefined, undefined)
    let lowered = string.lower(textureName)
    ;[lowered] = string.gsub(lowered, "ui_map_", "")
    ;[lowered] = string.gsub(lowered, "%.dds$", "")
    ;[lowered] = string.gsub(lowered, "_%d*$", "")
    const pattern =
      patternToUse === undefined || patternToUse === ""
        ? "([%/]?.*%/maps%/)(%w+)%/(.*)"
        : patternToUse
    const [, zoneNameRaw, subzoneNameRaw] = string.match(lowered, pattern)
    const zoneName = parseLuaCapture(zoneNameRaw)
    const subzoneName = parseLuaCapture(subzoneNameRaw)
    if (doChatOutput) {
      d(
        `[${LIB_NAME}]GetZoneNameByMapTexture\nzone: ${tostring(zoneName)}, subZone: ${tostring(subzoneName)}\nmapTileTexture: ${tostring(lowered)}`
      )
    }
    return $multi(zoneName, subzoneName, lowered, textureName)
  }
}
