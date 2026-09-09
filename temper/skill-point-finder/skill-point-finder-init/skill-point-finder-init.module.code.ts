import "../skill-point-finder-api/skill-point-finder-api.module.code.ts"

import { initSetup } from "../skill-point-finder-char-list/skill-point-finder-char-list.module.code.ts"
import {
  ADDON_NAME,
  SAVED_VARIABLES_NAME,
  SAVED_VARIABLES_VERSION,
  SLASH_COMMAND,
} from "../skill-point-finder-constants/skill-point-finder-constants.module.code.ts"
import {
  achComplete,
  levelUp,
  playerActivated,
  playerDeactivated,
  questRemoved,
  skillPointsUpdate,
} from "../skill-point-finder-events/skill-point-finder-events.module.code.ts"
import { setupMenu } from "../skill-point-finder-menu/skill-point-finder-menu.module.code.ts"
import {
  loadSettings,
  migrateSavedVariables,
} from "../skill-point-finder-saved-state/skill-point-finder-saved-state.module.code.ts"
import {
  buildDefaultSavedVariables,
  STATE,
} from "../skill-point-finder-state/skill-point-finder-state.module.code.ts"
import { registerStrings } from "../skill-point-finder-strings/skill-point-finder-strings.module.code.ts"
import {
  badSlash,
  helpSlash,
  setupValues,
  toggleWindow,
} from "../skill-point-finder-window/skill-point-finder-window.module.code.ts"

registerStrings()

export function initializeSkillPointFinder(): undefined {
  const world = GetWorldName()
  STATE.sVar =
    world === "NA Megaserver"
      ? ZO_SavedVars.NewAccountWide(
          SAVED_VARIABLES_NAME,
          SAVED_VARIABLES_VERSION,
          undefined,
          buildDefaultSavedVariables()
        )
      : ZO_SavedVars.NewAccountWide(
          SAVED_VARIABLES_NAME,
          SAVED_VARIABLES_VERSION,
          world,
          buildDefaultSavedVariables()
        )

  initSetup()

  ZO_CreateStringId("SI_BINDING_NAME_USPF_TOGGLE", "Show Skill Point Finder")

  SLASH_COMMANDS[SLASH_COMMAND] = (keyWord) => {
    if (string.lower(keyWord) === "help") {
      helpSlash()
    } else if (keyWord === "") {
      toggleWindow()
    } else {
      badSlash()
    }
  }

  const charId = GetCurrentCharacterId()
  loadSettings(charId)
  migrateSavedVariables()
  setupMenu(charId)
  setupValues()

  SCENE_MANAGER.RegisterTopLevel(USPF_GUI, false)

  EVENT_MANAGER.RegisterForEvent(ADDON_NAME, EVENT_SKILL_POINTS_CHANGED, skillPointsUpdate)
  EVENT_MANAGER.RegisterForEvent(ADDON_NAME, EVENT_QUEST_REMOVED, questRemoved)
  EVENT_MANAGER.RegisterForEvent(ADDON_NAME, EVENT_LEVEL_UPDATE, levelUp)
  EVENT_MANAGER.RegisterForEvent(ADDON_NAME, EVENT_ACHIEVEMENT_AWARDED, achComplete)
  EVENT_MANAGER.RegisterForEvent(ADDON_NAME, EVENT_PLAYER_ACTIVATED, playerActivated)
  EVENT_MANAGER.RegisterForEvent(ADDON_NAME, EVENT_PLAYER_DEACTIVATED, playerDeactivated)

  return undefined
}
