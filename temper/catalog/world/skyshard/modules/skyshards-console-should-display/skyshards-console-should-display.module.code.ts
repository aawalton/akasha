import { GPS } from "akasha/temper/addon/pages/world/gps/modules/gps-public-api/gps-public-api.module.code.ts"
import { COMPASS_PINS } from "akasha/temper/addon/pages/world/navigation/modules/compass-pins-global/compass-pins-global.module.code.ts"
import {
  CONSOLE_STATE,
  getDb,
} from "akasha/temper/catalog/world/skyshard/modules/skyshards-console-state/skyshards-console-state.module.code.ts"
import { PINS_COMPASS } from "akasha/temper/catalog/world/skyshard/modules/skyshards-constants/skyshards-constants.module.code.ts"
import {
  getImmersiveModeCondition,
  getLocalData,
} from "akasha/temper/catalog/world/skyshard/modules/skyshards-data-accessors/skyshards-data-accessors.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/addon/type/custom-compass-pins/custom-compass-pins.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-03/eso-functions-03.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-04/eso-functions-04.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-09/eso-functions-09.type-declaration.d.ts"

type ReadonlyNumberArray = readonly number[]

export function updateSkyshardsData(this: void, zone: string, subzone: string): undefined {
  CONSOLE_STATE.skyshards = getLocalData(zone, subzone)
  COMPASS_PINS.RefreshPins(PINS_COMPASS)
  CONSOLE_STATE.lastZone = GetMapTileTexture()
}

function allConditionAchievementsCompleted(
  this: void,
  conditionData: number | readonly number[] | boolean | undefined
): boolean {
  if (type(conditionData) === "table") {
    for (const [, achievementIndex] of ipairs(conditionData as ReadonlyNumberArray)) {
      const [, , , , completed] = GetAchievementInfo(achievementIndex)
      if (!completed) {
        return false
      }
    }
    return true
  }
  const [, , , , completed] = GetAchievementInfo(conditionData as number)
  return completed
}

export function shouldDisplaySkyshards(this: void): boolean {
  const db = getDb()

  if (db.immersiveMode === 1) {
    return true
  }

  let mapIndex = GetCurrentMapIndex()

  if (mapIndex == null && IsInImperialCity()) {
    mapIndex = GetImperialCityMapIndex()
  }

  if (mapIndex == null) {
    const measurements = GPS.GetCurrentMapMeasurement()
    if (measurements != null) {
      mapIndex = measurements.mapIndex
    }
  }

  if (mapIndex != null) {
    const conditionData = getImmersiveModeCondition(db.immersiveMode, mapIndex)
    if (db.immersiveMode === 2) {
      return allConditionAchievementsCompleted(conditionData)
    } else if (db.immersiveMode === 3) {
      if (mapIndex !== 14) {
        return conditionData as boolean
      }
    } else if (db.immersiveMode === 4) {
      return allConditionAchievementsCompleted(conditionData)
    } else if (db.immersiveMode === 5) {
      return allConditionAchievementsCompleted(conditionData)
    }
  }

  return true
}
