import { applySkills } from "./apply-build"
import { decodeCompanionBuild } from "./codec/companion-decoder"
import { ADDON_NAME } from "./constants"
import {
  addCompanionSkillLine,
  collectCompanionProgress,
  handleCompanionRapportUpdate,
  refreshAllCompanionSkillLines,
  updateCompanionExperience,
  updateCompanionSkillLine,
} from "./tracking/companion-progress"
import { notifyCompanionRapportChange } from "./ui/companion-overview-rapport"
import { captureAndSaveActiveCompanionBuild, setSelectedCompanionId } from "./ui/companion-selector"
import { getTargetBuildHash } from "./ui/target-build-input"
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
