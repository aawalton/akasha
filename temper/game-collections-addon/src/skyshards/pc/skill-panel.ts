import { getAchievementIDs } from "../data-accessors"

const GAMEPAD_SKYSHARD_SKILLSPANEL_FORMAT_DETAILED = "|cffffff<<1>>/<<2>>|r"

const GAMEPAD_SKYSHARD_SKILLPOINTS_TO_SPEND = "|cffffff<<1>>|r"
const GAMEPAD_SKYSHARD_SKILLPOINTS_TO_SPEND_SSP = "|cffffff<<1>>/<<2>>|r"

let ssp = false

export function setSSP(this: void, value: boolean): undefined {
  ssp = value
}

let collectedSkyShards = 0
let totalSkyShards = 0

function GetNumFoundSkyShards(this: void): undefined {
  collectedSkyShards = 0
  totalSkyShards = 1

  const ids = getAchievementIDs()
  for (const [achievementId] of pairs(ids)) {
    const zoneId = GetSkyshardAchievementZoneId(achievementId)
    const numSkyshards = GetNumSkyshardsInZone(zoneId)
    if (numSkyshards !== 0) {
      totalSkyShards = totalSkyShards + numSkyshards
      for (const skyshardIndex of $range(1, numSkyshards)) {
        const skyshardId = GetZoneSkyshardId(zoneId, skyshardIndex)
        const completed = GetSkyshardDiscoveryStatus(skyshardId)
        if (completed === SKYSHARD_DISCOVERY_STATUS_ACQUIRED) {
          collectedSkyShards = collectedSkyShards + 1
        }
      }
    }
  }

  if (HasCompletedQuest(4296)) {
    collectedSkyShards = collectedSkyShards + 1
  }
}

function PostHookRefreshPointsDisplay(this: void, self: GamepadSkillsScene): undefined {
  GetNumFoundSkyShards()
  const availablePoints = SKILL_POINT_ALLOCATION_MANAGER.GetAvailableSkillPoints()

  let skillPointsLabel = zo_strformat(GAMEPAD_SKYSHARD_SKILLPOINTS_TO_SPEND, availablePoints)
  if (ssp) {
    skillPointsLabel = zo_strformat(
      GAMEPAD_SKYSHARD_SKILLPOINTS_TO_SPEND_SSP,
      availablePoints,
      SKILL_POINT_ALLOCATION_MANAGER.GetTotalNumSkillPoints()
    )
  }
  self.headerData.data1Text = skillPointsLabel

  const skyshardsLabel = zo_strformat(
    GAMEPAD_SKYSHARD_SKILLSPANEL_FORMAT_DETAILED,
    collectedSkyShards,
    totalSkyShards
  )
  self.headerData.data2Text = skyshardsLabel
  ZO_GamepadGenericHeader_RefreshData(self.header, self.headerData)
}

export function AlterSkyShardsIndicator(this: void): undefined {
  GetNumFoundSkyShards()
  ZO_PostHook(GAMEPAD_SKILLS, "RefreshPointsDisplay", PostHookRefreshPointsDisplay)
}
