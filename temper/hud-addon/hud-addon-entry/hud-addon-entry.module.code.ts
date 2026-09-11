import "akasha/temper/eso-types/eso-event-manager/eso-event-manager.type-declaration.d.ts"
import "akasha/temper/eso-types/eso-events/eso-events.type-declaration.d.ts"
import "akasha/temper/hud-addon/hud-addon-public-api/hud-addon-public-api.module.code.ts"

import { registerAddonInit } from "akasha/temper/addon-init/addon-init/addon-init.module.code.ts"
import { initializeHudBar } from "akasha/temper/hud-addon/hud-addon-bar/hud-addon-bar.module.code.ts"
import {
  installBuiltinFields,
  resetSession,
} from "akasha/temper/hud-addon/hud-addon-builtins/hud-addon-builtins.module.code.ts"
import { initializeTemperCommands } from "akasha/temper/hud-addon/hud-addon-commands/hud-addon-commands.module.code.ts"
import { initializeComponentHiding } from "akasha/temper/hud-addon/hud-addon-hide-init/hud-addon-hide-init.module.code.ts"
import { initializeSavedVariables } from "akasha/temper/hud-addon/hud-addon-saved-variables/hud-addon-saved-variables.module.code.ts"
import { initializeSettingsPanel } from "akasha/temper/hud-addon/hud-addon-settings-panel/hud-addon-settings-panel.module.code.ts"

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
