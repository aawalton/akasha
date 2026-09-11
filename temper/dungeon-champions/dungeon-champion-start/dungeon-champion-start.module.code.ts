import "akasha/temper/dungeon-champions/dungeon-champion-global/dungeon-champion-global.module.code.ts"

import { ADDON_NAME } from "akasha/temper/dungeon-champions/dungeon-champion-names/dungeon-champion-names.module.code.ts"
import { registerPins } from "akasha/temper/dungeon-champions/dungeon-champion-pin-register/dungeon-champion-pin-register.module.code.ts"
import {
  onAchievementAwarded,
  onAchievementUpdate,
} from "akasha/temper/dungeon-champions/dungeon-champion-pins/dungeon-champion-pins.module.code.ts"
import { initializeSavedVariables } from "akasha/temper/dungeon-champions/dungeon-champion-saved-vars/dungeon-champion-saved-vars.module.code.ts"
import { createSettingsMenu } from "akasha/temper/dungeon-champions/dungeon-champion-settings/dungeon-champion-settings.module.code.ts"
import { registerSlashCommands } from "akasha/temper/dungeon-champions/dungeon-champion-slash/dungeon-champion-slash.module.code.ts"

export function initDungeonChampions(this: void): undefined {
  initializeSavedVariables()
  registerPins()
  createSettingsMenu()
  registerSlashCommands()

  EVENT_MANAGER.RegisterForEvent(ADDON_NAME, EVENT_ACHIEVEMENT_UPDATED, onAchievementUpdate)
  EVENT_MANAGER.RegisterForEvent(ADDON_NAME, EVENT_ACHIEVEMENT_AWARDED, onAchievementAwarded)

  return undefined
}
