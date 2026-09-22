import { ADDON_NAME } from "akasha/temper/catalog/world/dungeon-champion/modules/dungeon-champion-names/dungeon-champion-names.module.code.ts"
import { registerPins } from "akasha/temper/catalog/world/dungeon-champion/modules/dungeon-champion-pin-register/dungeon-champion-pin-register.module.code.ts"
import {
  onAchievementAwarded,
  onAchievementUpdate,
} from "akasha/temper/catalog/world/dungeon-champion/modules/dungeon-champion-pins/dungeon-champion-pins.module.code.ts"
import { initializeSavedVariables } from "akasha/temper/catalog/world/dungeon-champion/modules/dungeon-champion-saved-vars/dungeon-champion-saved-vars.module.code.ts"
import { createSettingsMenu } from "akasha/temper/catalog/world/dungeon-champion/modules/dungeon-champion-settings/dungeon-champion-settings.module.code.ts"
import { registerSlashCommands } from "akasha/temper/catalog/world/dungeon-champion/modules/dungeon-champion-slash/dungeon-champion-slash.module.code.ts"
import "akasha/temper/eso/type/eso-event-manager/eso-event-manager.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-events/eso-events.type-declaration.d.ts"

export function initDungeonChampions(this: void): undefined {
  initializeSavedVariables()
  registerPins()
  createSettingsMenu()
  registerSlashCommands()

  EVENT_MANAGER.RegisterForEvent(ADDON_NAME, EVENT_ACHIEVEMENT_UPDATED, onAchievementUpdate)
  EVENT_MANAGER.RegisterForEvent(ADDON_NAME, EVENT_ACHIEVEMENT_AWARDED, onAchievementAwarded)

  return undefined
}
