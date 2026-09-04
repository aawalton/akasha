import "@akasha/temper-eso-types/eso-api"
import "@akasha/temper-eso-types/eso-chat"
import "@akasha/temper-eso-types/eso-enums-01"
import "@akasha/temper-eso-types/eso-enums-12"
import "@akasha/temper-eso-types/eso-enums-13"
import "@akasha/temper-eso-types/eso-enums-17"
import "@akasha/temper-eso-types/eso-event-manager"
import "@akasha/temper-eso-types/eso-events"
import "@akasha/temper-eso-types/eso-functions-02"
import "@akasha/temper-eso-types/eso-functions-03"
import "@akasha/temper-eso-types/eso-functions-04"
import "@akasha/temper-eso-types/eso-functions-05"
import "@akasha/temper-eso-types/eso-functions-07"
import "@akasha/temper-eso-types/eso-functions-08"
import "@akasha/temper-eso-types/eso-globals"
import "@akasha/temper-eso-types/eso-string-ids"
import "@akasha/temper-eso-types/eso-ui"
import "@akasha/temper-eso-types/eso-ui-2"
import "@akasha/temper-eso-types/eso-ui-3"
import "@akasha/temper-eso-types/tstl-language-extensions"
import { applySkills } from "../companions-apply-build/companions-apply-build.module.code.ts"
import { ADDON_NAME } from "../companions-constants/companions-constants.module.code.ts"
import { decodeCompanionBuild } from "../companions-decoder/companions-decoder.module.code.ts"
import { notifyCompanionRapportChange } from "../companions-overview-rapport/companions-overview-rapport.module.code.ts"
import {
  addCompanionSkillLine,
  collectCompanionProgress,
  handleCompanionRapportUpdate,
  refreshAllCompanionSkillLines,
  updateCompanionExperience,
  updateCompanionSkillLine,
} from "../companions-progress/companions-progress.module.code.ts"
import {
  captureAndSaveActiveCompanionBuild,
  setSelectedCompanionId,
} from "../companions-selector/companions-selector.module.code.ts"
import { getTargetBuildHash } from "../companions-target-build-input/companions-target-build-input.module.code.ts"
export function registerCompanionEvents(): undefined {
  EVENT_MANAGER.RegisterForEvent(
    ADDON_NAME + "_CompanionActivated",
    EVENT_COMPANION_ACTIVATED,
    function (this: void): undefined {
      captureAndSaveActiveCompanionBuild()
      collectCompanionProgress()
      const companionId = GetActiveCompanionDefId()
      setSelectedCompanionId(companionId)

      const automation = TemperInventory?.getSavedVariables()?.automation
      const companionToggles = automation?.companions?.[tostring(companionId)]
      if (companionToggles?.skills) {
        const hash = getTargetBuildHash(companionId)
        if (hash !== undefined) {
          const build = decodeCompanionBuild(hash)
          if (build !== undefined) {
            zo_callLater(() => {
              if (
                HasActiveCompanion() &&
                GetActiveCompanionDefId() === companionId &&
                !IsUnitInCombat("player")
              ) {
                applySkills(build)
              }
            }, 1500)
          }
        }
      }
    }
  )

  EVENT_MANAGER.RegisterForEvent(
    ADDON_NAME + "_CompanionDeactivated",
    EVENT_COMPANION_DEACTIVATED,
    function (this: void): undefined {
      TemperCharacters.TabManager.RefreshActivePanel()
    }
  )

  EVENT_MANAGER.RegisterForEvent(
    ADDON_NAME + "_CompanionXP",
    EVENT_COMPANION_EXPERIENCE_GAIN,
    function (
      this: void,
      _event: number,
      _companionId: number,
      level: number,
      _prevXP: number,
      currentXP: number
    ): undefined {
      updateCompanionExperience(level, currentXP)
    }
  )

  EVENT_MANAGER.RegisterForEvent(
    ADDON_NAME + "_CompanionRapport",
    EVENT_COMPANION_RAPPORT_UPDATE,
    function (
      this: void,
      _event: number,
      companionId: number,
      prevRapport: number,
      currentRapport: number
    ): undefined {
      handleCompanionRapportUpdate(currentRapport)
      notifyCompanionRapportChange(companionId, prevRapport, currentRapport)
    }
  )

  EVENT_MANAGER.RegisterForEvent(
    ADDON_NAME + "_CompanionSkillXP",
    EVENT_COMPANION_SKILL_XP_UPDATE,
    function (this: void, _event: number, skillLineId: number): undefined {
      updateCompanionSkillLine(skillLineId)
    }
  )

  EVENT_MANAGER.RegisterForEvent(
    ADDON_NAME + "_CompanionSkillRank",
    EVENT_COMPANION_SKILL_RANK_UPDATE,
    function (this: void, _event: number, skillLineId: number): undefined {
      updateCompanionSkillLine(skillLineId)
    }
  )

  EVENT_MANAGER.RegisterForEvent(
    ADDON_NAME + "_CompanionSkillLineAdded",
    EVENT_COMPANION_SKILL_LINE_ADDED,
    function (this: void, _event: number, skillLineId: number): undefined {
      addCompanionSkillLine(skillLineId)
    }
  )

  EVENT_MANAGER.RegisterForEvent(
    ADDON_NAME + "_CompanionSkillsFullUpdate",
    EVENT_COMPANION_SKILLS_FULL_UPDATE,
    function (this: void): undefined {
      refreshAllCompanionSkillLines()
    }
  )
}
