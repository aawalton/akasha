import {
  PINS_COMPASS,
  SKYSHARDS_PINDATA_ACHIEVEMENTID,
  SKYSHARDS_PINDATA_LOCX,
  SKYSHARDS_PINDATA_LOCY,
  SKYSHARDS_PINDATA_ZONEGUIDEINDEX,
} from "../constants"
import type { SkyshardPin } from "../data/types"
import { getLocalData } from "../data-accessors"

export function asSkyshardPin(this: void, pinTag: unknown): SkyshardPin {
  return pinTag as SkyshardPin
}

function asNumber(this: void, value: unknown): number {
  return value as number
}

export function field(this: void, pin: SkyshardPin, index: number): number {
  return asNumber(pin[index])
}

export function optionalField(this: void, pin: SkyshardPin, index: number): number | undefined {
  return pin[index]
}

export function GetSkyshardIdByCriteria(
  this: void,
  zoneId: number,
  _achievementId: number,
  criteriaIndex: number,
  expectedX: number,
  expectedY: number
): number | undefined {
  const numSkyshards = GetNumSkyshardsInZone(zoneId)

  if (criteriaIndex <= numSkyshards) {
    const shardId = GetZoneSkyshardId(zoneId, criteriaIndex)
    const [x, z] = GetNormalizedPositionForSkyshardId(shardId)
    if (x != null && z != null) {
      const distance = zo_sqrt((x - expectedX) ** 2 + (z - expectedY) ** 2)
      if (distance < 0.1) {
        return shardId
      }
    }
  }

  let bestShardId: number | undefined
  let bestDistance = math.huge
  for (const i of $range(1, numSkyshards)) {
    const shardId = GetZoneSkyshardId(zoneId, i)
    const [x, z] = GetNormalizedPositionForSkyshardId(shardId)
    if (x != null && z != null) {
      const distance = zo_sqrt((x - expectedX) ** 2 + (z - expectedY) ** 2)
      if (distance < bestDistance) {
        bestDistance = distance
        bestShardId = shardId
      }
    }
  }

  if (bestDistance < 0.1) {
    return bestShardId
  }

  if (criteriaIndex <= numSkyshards) {
    return GetZoneSkyshardId(zoneId, criteriaIndex)
  }

  return undefined
}

let skyshards: readonly SkyshardPin[] | undefined
let lastZone = ""

export function getCurrentSkyshards(this: void): readonly SkyshardPin[] | undefined {
  return skyshards
}

export function getLastZone(this: void): string {
  return lastZone
}

export function UpdateSkyshardsData(this: void, zone: string, subzone: string): undefined {
  skyshards = getLocalData(zone, subzone)
  COMPASS_PINS.RefreshPins(PINS_COMPASS)
  lastZone = GetMapTileTexture()
}

export function resolveShardId(this: void, pinData: SkyshardPin): number | undefined {
  const zoneId = GetSkyshardAchievementZoneId(field(pinData, SKYSHARDS_PINDATA_ACHIEVEMENTID))
  return GetSkyshardIdByCriteria(
    zoneId,
    field(pinData, SKYSHARDS_PINDATA_ACHIEVEMENTID),
    field(pinData, SKYSHARDS_PINDATA_ZONEGUIDEINDEX),
    field(pinData, SKYSHARDS_PINDATA_LOCX),
    field(pinData, SKYSHARDS_PINDATA_LOCY)
  )
}
