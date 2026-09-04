import { ACHIEVEMENTS_ID } from "../map-pins-achievements-id/map-pins-achievements-id.module.code.ts"
import { BOSSES_ACHIEVEMENTS } from "../map-pins-bosses-achievements/map-pins-bosses-achievements.module.code.ts"
import { CUSTOM_PINS } from "../map-pins-config/map-pins-config.module.code.ts"
import type { IdSet, NumberMap } from "../map-pins-data-types/map-pins-data-types.module.code.ts"
import { FISHING_ACHIEVEMENTS } from "../map-pins-fishing-achievements/map-pins-fishing-achievements.module.code.ts"
import { getSavedVars } from "../map-pins-saved-variables/map-pins-saved-variables.module.code.ts"
import { SKY_SHARDS_ACHIEVEMENTS } from "../map-pins-sky-shards-achievements/map-pins-sky-shards-achievements.module.code.ts"
import { getPinTypeId, STATE } from "../map-pins-state/map-pins-state.module.code.ts"

const achievementsId: NumberMap = ACHIEVEMENTS_ID
const skyShardsAchievements: IdSet = SKY_SHARDS_ACHIEVEMENTS
const fishingAchievements: IdSet = FISHING_ACHIEVEMENTS
const bossesAchievements: IdSet = BOSSES_ACHIEVEMENTS

function parseLuaCapture(this: void, captured: string | undefined): string | undefined {
  return captured
}

function refreshCompass(this: void, n: number): undefined {
  const pin = CUSTOM_PINS[n]
  if (pin === undefined) return
  if (COMPASS_PINS !== undefined) COMPASS_PINS.RefreshPins(pin.name)
}

export function onAchievementUpdate(this: void, achievementId: number): undefined {
  STATE.lastAchivement = achievementId

  const refreshPins = (name: number): undefined => {
    const namespace = "CallLater_" + tostring(name)
    EVENT_MANAGER.RegisterForUpdate(namespace, 1000, () => {
      EVENT_MANAGER.UnregisterForUpdate(namespace)
      ZO_WorldMap_RefreshCustomPinsOfType(name)
      if (COMPASS_PINS !== undefined) COMPASS_PINS.RefreshPins(name)
    })
  }

  const zoneAchPin = achievementsId[achievementId]
  if (skyShardsAchievements[achievementId] === true) {
    refreshPins(getPinTypeId(3))
  } else if (fishingAchievements[achievementId] === true && getSavedVars()[17] === true) {
    refreshPins(getPinTypeId(17))
  } else if (zoneAchPin !== undefined) {
    refreshPins(getPinTypeId(zoneAchPin))
  } else if (bossesAchievements[achievementId] === true) {
    const [achName] = GetAchievementCriterion(achievementId, 1)
    const [explorerCapture] = string.match(achName, "Explorer")
    const [groupChallengeCapture] = string.match(achName, "Group Challenge")
    const explorer = parseLuaCapture(explorerCapture)
    const groupChallenge = parseLuaCapture(groupChallengeCapture)
    if (explorer !== undefined || groupChallenge !== undefined) {
      refreshPins(getPinTypeId(1))
    }
  }
}

export function onSkyshardsUpdated(this: void): undefined {
  ZO_WorldMap_RefreshCustomPinsOfType(getPinTypeId(3))
  refreshCompass(3)
}

export function onBookLearned(this: void, _eventCode: number, categoryIndex: number): undefined {
  if (categoryIndex === 1) {
    ZO_WorldMap_RefreshCustomPinsOfType(getPinTypeId(5))
    refreshCompass(5)
  }
}
