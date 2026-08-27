import {
  saveSkillMorphProgress,
  updateAccountSkillMorphProgress,
  updateSkillMorphProgress,
} from "@temper/game-characters-skills-morphs-addon/tracking/skill-morphs"
import { ADDON_NAME } from "./constants"
import { captureAndSaveCharacterStats } from "./player-stats"
import { scheduleTaskAutoCompletionCheck } from "./task-auto-complete"
import { updateAccountSkillLineProgress, updateSkillLineProgress } from "./tracking/skill-lines"
export const BUILD_CAPTURE_UPDATE = ADDON_NAME + "_BuildCaptureDelay"

export function scheduleBuildCapture(): undefined {
  EVENT_MANAGER.UnregisterForUpdate(BUILD_CAPTURE_UPDATE)
  EVENT_MANAGER.RegisterForUpdate(BUILD_CAPTURE_UPDATE, 500, function (this: void): undefined {
    EVENT_MANAGER.UnregisterForUpdate(BUILD_CAPTURE_UPDATE)
    captureAndSaveCharacterStats()
  })
}

export function registerBuildEvents(): undefined {
  const equipEventName = ADDON_NAME + "_EquipmentChanged"
  EVENT_MANAGER.RegisterForEvent(
    equipEventName,
    EVENT_INVENTORY_SINGLE_SLOT_UPDATE,
    function (this: void): undefined {
      scheduleBuildCapture()
    }
  )
  EVENT_MANAGER.AddFilterForEvent(
    equipEventName,
    EVENT_INVENTORY_SINGLE_SLOT_UPDATE,
    REGISTER_FILTER_BAG_ID,
    BAG_WORN
  )

  EVENT_MANAGER.RegisterForEvent(
    ADDON_NAME + "_HotbarsUpdated",
    EVENT_ACTION_SLOTS_ALL_HOTBARS_UPDATED,
    function (this: void): undefined {
      scheduleBuildCapture()
      scheduleTaskAutoCompletionCheck()
    }
  )

  EVENT_MANAGER.RegisterForEvent(
    ADDON_NAME + "_ChampionPurchase",
    EVENT_CHAMPION_PURCHASE_RESULT,
    function (this: void): undefined {
      scheduleBuildCapture()
    }
  )

  EVENT_MANAGER.RegisterForEvent(
    ADDON_NAME + "_AttributeUpdated",
    EVENT_ATTRIBUTE_UPGRADE_UPDATED,
    function (this: void): undefined {
      scheduleBuildCapture()
    }
  )

  EVENT_MANAGER.RegisterForEvent(
    ADDON_NAME + "_SkillBuildSelection",
    EVENT_SKILL_BUILD_SELECTION_UPDATED,
    function (this: void): undefined {
      scheduleBuildCapture()
      saveSkillMorphProgress()
      scheduleTaskAutoCompletionCheck()
    }
  )

  EVENT_MANAGER.RegisterForEvent(
    ADDON_NAME + "_SkillsFullUpdate",
    EVENT_SKILLS_FULL_UPDATE,
    function (this: void): undefined {
      scheduleBuildCapture()
      saveSkillMorphProgress()
      scheduleTaskAutoCompletionCheck()
    }
  )

  EVENT_MANAGER.RegisterForEvent(
    ADDON_NAME + "_SkillXPUpdate",
    EVENT_SKILL_XP_UPDATE,
    function (this: void, _event: number, skillType: number, skillLineIndex: number): undefined {
      updateSkillLineProgress(skillType, skillLineIndex)
      updateSkillMorphProgress(skillType, skillLineIndex)
      updateAccountSkillLineProgress(skillType, skillLineIndex)
      updateAccountSkillMorphProgress(skillType, skillLineIndex)
      scheduleTaskAutoCompletionCheck()
    }
  )

  EVENT_MANAGER.RegisterForEvent(
    ADDON_NAME + "_AbilityRankUpdate",
    EVENT_ABILITY_PROGRESSION_RANK_UPDATE,
    function (this: void, _event: number, progressionIndex: number): undefined {
      const [skillType, skillLineIndex] =
        GetSkillAbilityIndicesFromProgressionIndex(progressionIndex)
      updateSkillMorphProgress(skillType, skillLineIndex)
      updateAccountSkillMorphProgress(skillType, skillLineIndex)
      scheduleTaskAutoCompletionCheck()
    }
  )

  EVENT_MANAGER.RegisterForEvent(
    ADDON_NAME + "_SkillLineAdded",
    EVENT_SKILL_LINE_ADDED,
    function (this: void, _event: number, skillType: number, skillLineIndex: number): undefined {
      updateSkillLineProgress(skillType, skillLineIndex)
      updateSkillMorphProgress(skillType, skillLineIndex)
      updateAccountSkillLineProgress(skillType, skillLineIndex)
      updateAccountSkillMorphProgress(skillType, skillLineIndex)
    }
  )
}
