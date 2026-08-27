import "./public-api"

import { ADDON_NAME } from "./constants"
import { LoreBooks_GetMissingEideticBooks } from "./data-accessors"
import { onBookLearned, onHideBook, onShowBook } from "./events"
import { initializeLocales } from "./locales"
import { rebuildLoreLibrary } from "./lore-library"
import { onGamepadPreferredModeChanged } from "./pins-callbacks"
import { initializePins } from "./pins-init"
import { initializeSavedVariables } from "./saved-variables"
import { createLamPanel } from "./settings/panel"
import {
  createEideticLorebookLocation,
  createFakeEideticLorebookLocation,
  createFakeLorebookPin,
} from "./slash-commands"
import { registerUiStrings } from "./ui-strings"

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
  SLASH_COMMANDS["/lunk"] = LoreBooks_GetMissingEideticBooks

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
