import "./public-api"
import "./ui/context-menus"
import "./ui/selection-ui"
import "./ui/tooltips"

import { registerAddonInit } from "@temper/shared-build-deploy-addon-bundle-runtime/bundle-runtime"
import { ADDON_NAME } from "./constants"
import { setCombatLogStringFormatter } from "./core/events"
import { initializeCore } from "./core/initialize"
import { getCombatLogString } from "./lib-combat/combat-log-strings"
import { resetFight } from "./lib-combat/fight"
import { registerStrings } from "./text"

registerStrings()

setCombatLogStringFormatter(getCombatLogString)

TemperCombat.ResetFight = resetFight

function initialize(this: void): undefined {
  initializeCore()
}

registerAddonInit(ADDON_NAME, initialize)
