import { isValidPin } from "../zone-internal-helpers/zone-internal-helpers.module.code.ts"
import { lib } from "../zone-lib-state/zone-lib-state.module.code.ts"
import type { Lib } from "../zone-types/zone-types.module.code.ts"

export function initGeoParent(this: void): undefined {
  const allianceZone2TheHarborage: Record<number, number> = {
    [ALLIANCE_ALDMERI_DOMINION]: 381,
    [ALLIANCE_DAGGERFALL_COVENANT]: 3,
    [ALLIANCE_EBONHEART_PACT]: 41,
  }

  const adjustedParentZoneIds: Record<number, number> = {
    [689]: 684,
    [678]: 584,
    [688]: 584,
    [1209]: 1208,
    [1463]: 267,
    [1399]: 1413,
    [1400]: 1413,
    [1401]: 1413,
    [1416]: 1413,
  }
  const harborageHome = allianceZone2TheHarborage[GetUnitAlliance("player")]
  if (harborageHome !== undefined) {
    adjustedParentZoneIds[199] = harborageHome
  }
  lib.adjustedParentZoneIds = adjustedParentZoneIds

  lib.adjustedParentMultiZoneIds = {
    [385]: {
      [58]: true,
      [101]: true,
      [104]: true,
    },
  }

  lib.GetZoneMapPinInfo = function (
    this: Lib,
    zoneId: number,
    parentZoneId?: number
  ): LuaMultiReturn<
    [number | undefined, number | undefined, number | undefined, boolean | undefined]
  > {
    if (type(zoneId) !== "number") return $multi(undefined, undefined, undefined, undefined)
    let resolvedParentZoneId = parentZoneId
    let poiIndex: number | undefined
    const geoData = lib.geoDataReferenceTable[zoneId]
    if (geoData !== undefined) {
      if (resolvedParentZoneId !== undefined) {
        poiIndex = geoData[resolvedParentZoneId]
      }
      if (poiIndex === undefined) {
        for (const [nextParent, nextPoi] of pairs(geoData)) {
          resolvedParentZoneId = nextParent
          poiIndex = nextPoi
          break
        }
      }
      const parentZoneIndex =
        resolvedParentZoneId === undefined ? undefined : GetZoneIndex(resolvedParentZoneId)
      return $multi(resolvedParentZoneId, parentZoneIndex, poiIndex, isValidPin(poiIndex))
    }
    return $multi(undefined, undefined, undefined, undefined)
  }

  lib.GetZoneGeographicalParentZoneId = function (this: Lib, zoneId: number): number | undefined {
    if (type(zoneId) !== "number") return undefined
    let parentZoneId: number | undefined
    const zoneInfo = lib.adjustedParentMultiZoneIds[zoneId]
    if (zoneInfo !== undefined) {
      const [currentZoneId] = GetUnitWorldPosition("player")
      if (zoneInfo[currentZoneId] !== undefined) {
        parentZoneId = currentZoneId
      } else {
        for (const [firstKey] of pairs(zoneInfo)) {
          parentZoneId = firstKey
          break
        }
      }
    }
    if (parentZoneId === undefined) {
      const adjusted = lib.adjustedParentZoneIds[zoneId]
      if (adjusted !== undefined) {
        parentZoneId = adjusted
      } else {
        const [pinParent] = lib.GetZoneMapPinInfo(zoneId)
        if (pinParent !== undefined) {
          parentZoneId = pinParent
        }
      }
    }
    return parentZoneId
  }

  lib.GetZoneGeographicalParentMapId = function (this: Lib, zoneId: number): number | undefined {
    if (type(zoneId) !== "number") return undefined
    const parentZoneId = lib.GetZoneGeographicalParentZoneId(zoneId)
    if (parentZoneId === undefined) return undefined
    return GetMapIdByZoneId(parentZoneId)
  }

  lib.GetGeographicalParentMapId = function (this: Lib, mapId: number): number | undefined {
    if (type(mapId) !== "number") return undefined
    const [, , , zoneIndex] = GetMapInfoById(mapId)
    return lib.GetZoneGeographicalParentMapId(GetZoneId(zoneIndex))
  }
}
