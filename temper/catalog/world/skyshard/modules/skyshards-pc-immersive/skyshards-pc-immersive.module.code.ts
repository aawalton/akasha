import { GPS } from "akasha/temper/addon/pages/world/gps/modules/gps-public-api/gps-public-api.module.code.ts"
import { getImmersiveModeCondition } from "akasha/temper/catalog/world/skyshard/modules/skyshards-data-accessors/skyshards-data-accessors.module.code.ts"
import { getDb } from "akasha/temper/catalog/world/skyshard/modules/skyshards-pc-state/skyshards-pc-state.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-03/eso-functions-03.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-04/eso-functions-04.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-09/eso-functions-09.type-declaration.d.ts"

type ReadonlyNumberArray = readonly number[]

function allConditionsCompleted(
  this: void,
  conditionData: number | readonly number[] | boolean | undefined
): boolean {
  if (type(conditionData) === "table") {
    for (const achievementIndex of conditionData as ReadonlyNumberArray) {
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
      return allConditionsCompleted(conditionData)
    } else if (db.immersiveMode === 3) {
      if (mapIndex !== 14) {
        return conditionData as boolean
      }
    } else if (db.immersiveMode === 4) {
      return allConditionsCompleted(conditionData)
    } else if (db.immersiveMode === 5) {
      return allConditionsCompleted(conditionData)
    }
  }

  return true
}
