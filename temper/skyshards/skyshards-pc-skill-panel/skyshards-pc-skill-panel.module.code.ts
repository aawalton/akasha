import { getAchievementIDs } from "../skyshards-data-accessors/skyshards-data-accessors.module.code.ts"

const GAMEPAD_SKYSHARD_SKILLSPANEL_FORMAT_DETAILED = "|cffffff<<1>>/<<2>>|r"

const GAMEPAD_SKYSHARD_SKILLPOINTS_TO_SPEND = "|cffffff<<1>>|r"
const GAMEPAD_SKYSHARD_SKILLPOINTS_TO_SPEND_SSP = "|cffffff<<1>>/<<2>>|r"

let SSP = false

export function setSSP(this: void, value: boolean): undefined {
  SSP = value
}

let COLLECTED_SKY_SHARDS = 0
let TOTAL_SKY_SHARDS = 0

function getNumFoundSkyShards(this: void): undefined {
  COLLECTED_SKY_SHARDS = 0
  TOTAL_SKY_SHARDS = 1

  const ids = getAchievementIDs()
  for (const [achievementId] of pairs(ids)) {
    const zoneId = GetSkyshardAchievementZoneId(achievementId)
    const numSkyshards = GetNumSkyshardsInZone(zoneId)
    if (numSkyshards !== 0) {
      TOTAL_SKY_SHARDS = TOTAL_SKY_SHARDS + numSkyshards
      for (const skyshardIndex of $range(1, numSkyshards)) {
        const skyshardId = GetZoneSkyshardId(zoneId, skyshardIndex)
        const completed = GetSkyshardDiscoveryStatus(skyshardId)
        if (completed === SKYSHARD_DISCOVERY_STATUS_ACQUIRED) {
          COLLECTED_SKY_SHARDS = COLLECTED_SKY_SHARDS + 1
        }
      }
    }
  }

  if (HasCompletedQuest(4296)) {
    COLLECTED_SKY_SHARDS = COLLECTED_SKY_SHARDS + 1
  }
}

function postHookRefreshPointsDisplay(this: void, self: GamepadSkillsScene): undefined {
  getNumFoundSkyShards()
  const availablePoints = SKILL_POINT_ALLOCATION_MANAGER.GetAvailableSkillPoints()

  let skillPointsLabel = zo_strformat(GAMEPAD_SKYSHARD_SKILLPOINTS_TO_SPEND, availablePoints)
  if (SSP) {
    skillPointsLabel = zo_strformat(
      GAMEPAD_SKYSHARD_SKILLPOINTS_TO_SPEND_SSP,
      availablePoints,
      SKILL_POINT_ALLOCATION_MANAGER.GetTotalNumSkillPoints()
    )
  }
  self.headerData.data1Text = skillPointsLabel

  const skyshardsLabel = zo_strformat(
    GAMEPAD_SKYSHARD_SKILLSPANEL_FORMAT_DETAILED,
    COLLECTED_SKY_SHARDS,
    TOTAL_SKY_SHARDS
  )
  self.headerData.data2Text = skyshardsLabel
  ZO_GamepadGenericHeader_RefreshData(self.header, self.headerData)
}

export function alterSkyShardsIndicator(this: void): undefined {
  getNumFoundSkyShards()
  ZO_PostHook(GAMEPAD_SKILLS, "RefreshPointsDisplay", postHookRefreshPointsDisplay)
}
