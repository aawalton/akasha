import { ADDON_NAME } from "akasha/temper/catalog/world/lorebook/modules/lorebooks-constants/lorebooks-constants.module.code.ts"
import { loreBooksGetMissingEideticBooks } from "akasha/temper/catalog/world/lorebook/modules/lorebooks-data-accessors/lorebooks-data-accessors.module.code.ts"
import {
  onBookLearned,
  onHideBook,
  onShowBook,
} from "akasha/temper/catalog/world/lorebook/modules/lorebooks-events/lorebooks-events.module.code.ts"
import { rebuildLoreLibrary } from "akasha/temper/catalog/world/lorebook/modules/lorebooks-library/lorebooks-library.module.code.ts"
import { initializeLocales } from "akasha/temper/catalog/world/lorebook/modules/lorebooks-locales/lorebooks-locales.module.code.ts"
import { onGamepadPreferredModeChanged } from "akasha/temper/catalog/world/lorebook/modules/lorebooks-pins-callbacks/lorebooks-pins-callbacks.module.code.ts"
import { initializePins } from "akasha/temper/catalog/world/lorebook/modules/lorebooks-pins-init/lorebooks-pins-init.module.code.ts"
import { initializeSavedVariables } from "akasha/temper/catalog/world/lorebook/modules/lorebooks-saved-variables/lorebooks-saved-variables.module.code.ts"
import { createLamPanel } from "akasha/temper/catalog/world/lorebook/modules/lorebooks-settings-panel/lorebooks-settings-panel.module.code.ts"
import {
  createEideticLorebookLocation,
  createFakeEideticLorebookLocation,
  createFakeLorebookPin,
} from "akasha/temper/catalog/world/lorebook/modules/lorebooks-slash-command/lorebooks-slash-command.module.code.ts"
import { registerUiStrings } from "akasha/temper/catalog/world/lorebook/modules/lorebooks-ui-strings/lorebooks-ui-strings.module.code.ts"
import "akasha/temper/eso/type/eso-event-manager/eso-event-manager.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-events/eso-events.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"

registerUiStrings()

export function initLoreBooks(this: void): undefined {
  initializeSavedVariables()
  initializeLocales()
  createLamPanel()
  rebuildLoreLibrary()
  onGamepadPreferredModeChanged()
  initializePins()

  SLASH_COMMANDS["/lbpos"] = function (this: void): undefined {
    createEideticLorebookLocation()
  }
  SLASH_COMMANDS["/lbfake"] = function (this: void): undefined {
    createFakeEideticLorebookLocation()
  }
  SLASH_COMMANDS["/lbfakebook"] = function (this: void): undefined {
    createFakeLorebookPin()
  }
  SLASH_COMMANDS["/lunk"] = loreBooksGetMissingEideticBooks

  EVENT_MANAGER.RegisterForEvent(ADDON_NAME, EVENT_SHOW_BOOK, onShowBook)
  EVENT_MANAGER.RegisterForEvent(ADDON_NAME, EVENT_HIDE_BOOK, onHideBook)
  EVENT_MANAGER.RegisterForEvent(ADDON_NAME, EVENT_LORE_BOOK_LEARNED, onBookLearned)
  EVENT_MANAGER.RegisterForEvent(
    ADDON_NAME,
    EVENT_GAMEPAD_PREFERRED_MODE_CHANGED,
    onGamepadPreferredModeChanged
  )
  return undefined
}
