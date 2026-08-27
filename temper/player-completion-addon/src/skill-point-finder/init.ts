import "./public-api"

import { initSetup } from "./char-list"
import {
  ADDON_NAME,
  SAVED_VARIABLES_NAME,
  SAVED_VARIABLES_VERSION,
  SLASH_COMMAND,
} from "./constants"
import {
  achComplete,
  levelUp,
  playerActivated,
  playerDeactivated,
  questRemoved,
  skillPointsUpdate,
} from "./events"
import { registerStrings } from "./locale/ui-strings"
import { setupMenu } from "./menu"
import { loadSettings, migrateSavedVariables } from "./saved-variables"
import { buildDefaultSavedVariables, state } from "./state"
import { badSlash, helpSlash, setupValues, toggleWindow } from "./window"

registerStrings()

export function initializeSkillPointFinder(): undefined {
  const world = GetWorldName()
  state.sVar =
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
