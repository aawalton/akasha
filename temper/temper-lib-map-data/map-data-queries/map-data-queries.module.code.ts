import { INTERNAL, LIB } from "../map-data-lib-state/map-data-lib-state.module.code.ts"
import type { Internal, Lib } from "../map-data-types/map-data-types.module.code.ts"

export function initMapQueries(this: void): undefined {
  LIB.RegisterCallback = function (
    this: Lib,
    callbackName: string,
    callback: (this: void, ...args: unknown[]) => void
  ): undefined {
    LIB.callbackObject.RegisterCallback(callbackName, callback)
  }

  LIB.UnregisterCallback = function (
    this: Lib,
    callbackName: string,
    callback: (this: void, ...args: unknown[]) => void
  ): undefined {
    LIB.callbackObject.UnregisterCallback(callbackName, callback)
  }

  LIB.FireCallbacks = function (this: Lib, callbackName: string, ...args: unknown[]): undefined {
    LIB.callbackObject.FireCallbacks(callbackName, ...args)
  }

  LIB.GetMapIdByTileTexture = function (this: Lib, tileTexture: string): number[] | undefined {
    const found = LIB.textureNamesLookup[tileTexture]
    if (found !== undefined) return found
    return undefined
  }

  LIB.GetMapIdByMapName = function (this: Lib, mapName: string): number[] | undefined {
    const found = LIB.mapNamesLookup[mapName]
    if (found !== undefined) return found
    return undefined
  }

  LIB.ReturnSingleIndex = function (
    this: Lib,
    indexTable: Record<number, number> | undefined
  ): number | undefined {
    if (indexTable === undefined) {
      INTERNAL.dm("Warn", "ReturnSingleIndex Failed, no indexes found or table is nil")
      return undefined
    }
    const count = NonContiguousCount(indexTable)
    if (count === 1) return indexTable[1]
    if (count > 1) {
      INTERNAL.dm("Warn", "ReturnSingleIndex Failed, multiple indexes found")
      return undefined
    }
    return undefined
  }

  LIB.GetParentMapIdFromMapId = function (this: Lib, mapId: number): number {
    const [, , , zoneIndex] = GetMapInfoById(mapId)
    const zoneId = GetZoneId(zoneIndex)
    const zoneMapZoneId = GetParentZoneId(zoneId)
    return GetMapIdByZoneId(zoneMapZoneId)
  }

  LIB.GetParentMapIdFromZoneId = function (this: Lib, zoneId: number): number {
    const zoneMapZoneId = GetParentZoneId(zoneId)
    return GetMapIdByZoneId(zoneMapZoneId)
  }

  LIB.GetMapTileTextureFromMapId = function (this: Lib, mapId: number): undefined {
    const raw = GetMapTileTextureForMapId(mapId, 1)
    const lowered = string.lower(raw)
    const [noPrefix] = string.gsub(lowered, "^.*/maps/", "")
    const [noSuffix] = string.gsub(noPrefix, "%.dds$", "")
    LIB.mapTexture = noSuffix
  }

  LIB.SetMapIdFromAPI = function (this: Lib): undefined {
    LIB.mapId = GetCurrentMapId()
  }

  LIB.IsOverlandMap = function (this: Lib): boolean {
    const mapIndex = LIB.mapIndex
    if (mapIndex === undefined) return false
    const entry = LIB.mapIndexData[mapIndex]
    if (entry === undefined) return false
    if (entry.mapIndex === mapIndex && entry.mapTexture === LIB.mapTexture) return true
    return false
  }

  INTERNAL.ContainsIndex = function (
    this: Internal,
    indexTable: Record<string, number[]>,
    indexToFind: number | undefined
  ): boolean {
    if (indexToFind === undefined) return true
    let foundId = false
    for (const [, indexes] of pairs(indexTable)) {
      for (const [, index] of pairs(indexes)) {
        if (index === indexToFind) foundId = true
      }
    }
    return foundId
  }
}
