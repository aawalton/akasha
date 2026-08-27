import { CustomPins } from "./custom-pins-config"
import { type IdSet, type NumberMap } from "./data/data-types"
import { AchievementsId } from "./data/generated/achievements-id-data.generated"
import { BossesAchievements } from "./data/generated/bosses-achievements-data.generated"
import { FishingAchievements } from "./data/generated/fishing-achievements-data.generated"
import { SkyShardsAchievements } from "./data/generated/sky-shards-achievements-data.generated"
import { getSavedVars } from "./saved-variables"
import { getPinTypeId, state } from "./state"

const achievementsId: NumberMap = AchievementsId
const skyShardsAchievements: IdSet = SkyShardsAchievements
const fishingAchievements: IdSet = FishingAchievements
const bossesAchievements: IdSet = BossesAchievements

function parseLuaCapture(this: void, captured: string | undefined): string | undefined {
  return captured
}

function refreshCompass(this: void, n: number): undefined {
  const pin = CustomPins[n]
  if (pin === undefined) return
  if (COMPASS_PINS !== undefined) COMPASS_PINS.RefreshPins(pin.name)
}

export function onAchievementUpdate(this: void, achievementId: number): undefined {
  state.lastAchivement = achievementId

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
