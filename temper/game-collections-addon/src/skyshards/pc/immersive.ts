import { getImmersiveModeCondition } from "../data-accessors"
import { getDb } from "./state"

type ReadonlyNumberArray = readonly number[]

function asReadonlyNumberArray(this: void, value: unknown): ReadonlyNumberArray {
  return value as ReadonlyNumberArray
}

function asNumber(this: void, value: unknown): number {
  return value as number
}

function asBoolean(this: void, value: unknown): boolean {
  return value as boolean
}

function allConditionsCompleted(
  this: void,
  conditionData: number | readonly number[] | boolean | undefined
): boolean {
  if (type(conditionData) === "table") {
    for (const achievementIndex of asReadonlyNumberArray(conditionData)) {
      const [, , , , completed] = GetAchievementInfo(achievementIndex)
      if (!completed) {
        return false
      }
    }
    return true
  }
  const [, , , , completed] = GetAchievementInfo(asNumber(conditionData))
  return completed
}

export function ShouldDisplaySkyshards(this: void): boolean {
  const db = getDb()

  if (db.immersiveMode === 1) {
    return true
  }

  let mapIndex = GetCurrentMapIndex()

  if (mapIndex == null && IsInImperialCity()) {
    mapIndex = GetImperialCityMapIndex()
  }

  if (mapIndex == null) {
    const measurements = LibGPS3?.GetCurrentMapMeasurement()
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
        return asBoolean(conditionData)
      }
    } else if (db.immersiveMode === 4) {
      return allConditionsCompleted(conditionData)
    } else if (db.immersiveMode === 5) {
      return allConditionsCompleted(conditionData)
    }
  }

  return true
}
