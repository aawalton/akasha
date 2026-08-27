import { internal, lib } from "./lib-state"
import type { Internal, Lib } from "./types"

export function initMapQueries(this: void): undefined {
  lib.RegisterCallback = function (
    this: Lib,
    callbackName: string,
    callback: (this: void, ...args: unknown[]) => void
  ): undefined {
    lib.callbackObject.RegisterCallback(callbackName, callback)
  }

  lib.UnregisterCallback = function (
    this: Lib,
    callbackName: string,
    callback: (this: void, ...args: unknown[]) => void
  ): undefined {
    lib.callbackObject.UnregisterCallback(callbackName, callback)
  }

  lib.FireCallbacks = function (this: Lib, callbackName: string, ...args: unknown[]): undefined {
    lib.callbackObject.FireCallbacks(callbackName, ...args)
  }

  lib.GetMapIdByTileTexture = function (this: Lib, tileTexture: string): number[] | undefined {
    const found = lib.textureNamesLookup[tileTexture]
    if (found !== undefined) return found
    return undefined
  }

  lib.GetMapIdByMapName = function (this: Lib, mapName: string): number[] | undefined {
    const found = lib.mapNamesLookup[mapName]
    if (found !== undefined) return found
    return undefined
  }

  lib.ReturnSingleIndex = function (
    this: Lib,
    indexTable: Record<number, number> | undefined
  ): number | undefined {
    if (indexTable === undefined) {
      internal.dm("Warn", "ReturnSingleIndex Failed, no indexes found or table is nil")
      return undefined
    }
    const count = NonContiguousCount(indexTable)
    if (count === 1) return indexTable[1]
    if (count > 1) {
      internal.dm("Warn", "ReturnSingleIndex Failed, multiple indexes found")
      return undefined
    }
    return undefined
  }

  lib.GetParentMapIdFromMapId = function (this: Lib, mapId: number): number {
    const [, , , zoneIndex] = GetMapInfoById(mapId)
    const zoneId = GetZoneId(zoneIndex)
    const zoneMapZoneId = GetParentZoneId(zoneId)
    return GetMapIdByZoneId(zoneMapZoneId)
  }

  lib.GetParentMapIdFromZoneId = function (this: Lib, zoneId: number): number {
    const zoneMapZoneId = GetParentZoneId(zoneId)
    return GetMapIdByZoneId(zoneMapZoneId)
  }

  lib.GetMapTileTextureFromMapId = function (this: Lib, mapId: number): undefined {
    const raw = GetMapTileTextureForMapId(mapId, 1)
    const lowered = string.lower(raw)
    const [noPrefix] = string.gsub(lowered, "^.*/maps/", "")
    const [noSuffix] = string.gsub(noPrefix, "%.dds$", "")
    lib.mapTexture = noSuffix
  }

  lib.SetMapIdFromAPI = function (this: Lib): undefined {
    lib.mapId = GetCurrentMapId()
  }

  lib.IsOverlandMap = function (this: Lib): boolean {
    const mapIndex = lib.mapIndex
    if (mapIndex === undefined) return false
    const entry = lib.mapIndexData[mapIndex]
    if (entry === undefined) return false
    if (entry.mapIndex === mapIndex && entry.mapTexture === lib.mapTexture) return true
    return false
  }

  internal.ContainsIndex = function (
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
