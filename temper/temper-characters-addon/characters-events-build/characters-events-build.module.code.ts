import {
  saveSkillMorphProgress,
  updateAccountSkillMorphProgress,
  updateSkillMorphProgress,
} from "@akasha/temper-characters-skills-morphs-addon/skill-morph-tracking"
import { ADDON_NAME } from "@akasha/temper-player-completion-state/completion-addon-constants"
import { captureAndSaveCharacterStats } from "../characters-player-stats/characters-player-stats.module.code.ts"
import {
  updateAccountSkillLineProgress,
  updateSkillLineProgress,
} from "../characters-skill-lines/characters-skill-lines.module.code.ts"
import { scheduleTaskAutoCompletionCheck } from "../characters-task-auto-complete/characters-task-auto-complete.module.code.ts"

export const BUILD_CAPTURE_UPDATE = ADDON_NAME + "_BuildCaptureDelay"

export function scheduleBuildCapture(): undefined {
  EVENT_MANAGER.UnregisterForUpdate(BUILD_CAPTURE_UPDATE)
  EVENT_MANAGER.RegisterForUpdate(BUILD_CAPTURE_UPDATE, 500, function (this: void): undefined {
    EVENT_MANAGER.UnregisterForUpdate(BUILD_CAPTURE_UPDATE)
    captureAndSaveCharacterStats()
  })
}

function onSkillLineChanged(this: void, skillType: number, skillLineIndex: number): undefined {
  updateSkillLineProgress(skillType, skillLineIndex)
  updateSkillMorphProgress(skillType, skillLineIndex)
  updateAccountSkillLineProgress(skillType, skillLineIndex)
  updateAccountSkillMorphProgress(skillType, skillLineIndex)
}

function onSkillsRebuilt(this: void): undefined {
  scheduleBuildCapture()
  saveSkillMorphProgress()
  scheduleTaskAutoCompletionCheck()
}

function onBuildTouched(this: void): undefined {
  scheduleBuildCapture()
}

export function registerBuildEvents(): undefined {
  const equipEventName = ADDON_NAME + "_EquipmentChanged"
  EVENT_MANAGER.RegisterForEvent(equipEventName, EVENT_INVENTORY_SINGLE_SLOT_UPDATE, onBuildTouched)
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
    onBuildTouched
  )

  EVENT_MANAGER.RegisterForEvent(
    ADDON_NAME + "_AttributeUpdated",
    EVENT_ATTRIBUTE_UPGRADE_UPDATED,
    onBuildTouched
  )

  EVENT_MANAGER.RegisterForEvent(
    ADDON_NAME + "_SkillBuildSelection",
    EVENT_SKILL_BUILD_SELECTION_UPDATED,
    onSkillsRebuilt
  )

  EVENT_MANAGER.RegisterForEvent(
    ADDON_NAME + "_SkillsFullUpdate",
    EVENT_SKILLS_FULL_UPDATE,
    onSkillsRebuilt
  )

  EVENT_MANAGER.RegisterForEvent(
    ADDON_NAME + "_SkillXPUpdate",
    EVENT_SKILL_XP_UPDATE,
    function (this: void, _event: number, skillType: number, skillLineIndex: number): undefined {
      onSkillLineChanged(skillType, skillLineIndex)
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
      onSkillLineChanged(skillType, skillLineIndex)
    }
  )
}
