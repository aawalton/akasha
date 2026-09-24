import { COMPASS_PINS } from "akasha/temper/addon/pages/world/navigation/modules/compass-pins-global/compass-pins-global.module.code.ts"
import {
  PINS_COMPASS,
  SKYSHARDS_PINDATA_ACHIEVEMENTID,
  SKYSHARDS_PINDATA_LOCX,
  SKYSHARDS_PINDATA_LOCY,
  SKYSHARDS_PINDATA_ZONEGUIDEINDEX,
} from "akasha/temper/catalog/world/skyshard/modules/skyshards-constants/skyshards-constants.module.code.ts"
import { getLocalData } from "akasha/temper/catalog/world/skyshard/modules/skyshards-data-accessors/skyshards-data-accessors.module.code.ts"
import type { SkyshardPin } from "akasha/temper/catalog/world/skyshard/modules/skyshards-types/skyshards-types.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/design/language/lua-compiler/language-extensions/language-extensions.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-03/eso-functions-03.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-05/eso-functions-05.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-07/eso-functions-07.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-08/eso-functions-08.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"

export function field(this: void, pin: SkyshardPin, index: number): number {
  return pin[index] as number
}

export function optionalField(this: void, pin: SkyshardPin, index: number): number | undefined {
  return pin[index]
}

export function getSkyshardIdByCriteria(
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
let LAST_ZONE = ""

export function getCurrentSkyshards(this: void): readonly SkyshardPin[] | undefined {
  return skyshards
}

export function getLastZone(this: void): string {
  return LAST_ZONE
}

export function updateSkyshardsData(this: void, zone: string, subzone: string): undefined {
  skyshards = getLocalData(zone, subzone)
  COMPASS_PINS.RefreshPins(PINS_COMPASS)
  LAST_ZONE = GetMapTileTexture()
}

export function resolveShardId(this: void, pinData: SkyshardPin): number | undefined {
  const zoneId = GetSkyshardAchievementZoneId(field(pinData, SKYSHARDS_PINDATA_ACHIEVEMENTID))
  return getSkyshardIdByCriteria(
    zoneId,
    field(pinData, SKYSHARDS_PINDATA_ACHIEVEMENTID),
    field(pinData, SKYSHARDS_PINDATA_ZONEGUIDEINDEX),
    field(pinData, SKYSHARDS_PINDATA_LOCX),
    field(pinData, SKYSHARDS_PINDATA_LOCY)
  )
}
