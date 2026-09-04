import "@akasha/temper-eso-types/eso-event-manager"
import "@akasha/temper-eso-types/eso-events"
import "../hud-addon-public-api/hud-addon-public-api.module.code.ts"

import { registerAddonInit } from "@akasha/temper-addon-init/addon-init"
import { initializeHudBar } from "../hud-addon-bar/hud-addon-bar.module.code.ts"
import {
  installBuiltinFields,
  resetSession,
} from "../hud-addon-builtins/hud-addon-builtins.module.code.ts"
import { initializeTemperCommands } from "../hud-addon-commands/hud-addon-commands.module.code.ts"
import { initializeComponentHiding } from "../hud-addon-hide-init/hud-addon-hide-init.module.code.ts"
import { initializeSavedVariables } from "../hud-addon-saved-variables/hud-addon-saved-variables.module.code.ts"
import { initializeSettingsPanel } from "../hud-addon-settings-panel/hud-addon-settings-panel.module.code.ts"

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
