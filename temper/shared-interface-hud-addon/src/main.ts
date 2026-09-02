import "./public-api"

import { registerAddonInit } from "@akasha/temper-addon-init/addon-init"
import { installBuiltinFields, resetSession } from "./builtins"
import { initializeTemperCommands } from "./commands"
import { initializeComponentHiding } from "./hide-init"
import { initializeHudBar } from "./hud-bar"
import { initializeSavedVariables } from "./saved-variables"
import { initializeSettingsPanel } from "./settings-panel"

const ADDON_NAME = "TemperHud"

function initialize(this: void): undefined {
  initializeSavedVariables()
  initializeHudBar()
  initializeComponentHiding()
  initializeSettingsPanel()
  installBuiltinFields()
  initializeTemperCommands()

  EVENT_MANAGER.RegisterForEvent(
    `${ADDON_NAME}_PlayerActivated`,
    EVENT_PLAYER_ACTIVATED,
    function (this: void, _eventCode: number, initial: boolean): undefined {
      if (initial) resetSession()
    }
  )
}

registerAddonInit(ADDON_NAME, initialize)
