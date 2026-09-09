import "../combat-controls-title/combat-controls-title.type-declaration.d.ts"
import "../combat-controls-report/combat-controls-report.type-declaration.d.ts"
import "../combat-controls-panels/combat-controls-panels.type-declaration.d.ts"
import "../combat-string-ids/combat-string-ids.type-declaration.d.ts"
import "../combat-string-ids-report/combat-string-ids-report.type-declaration.d.ts"
import "../combat-string-ids-menus/combat-string-ids-menus.type-declaration.d.ts"
import "../combat-menu-string-ids/combat-menu-string-ids.type-declaration.d.ts"
import "../combat-public-api/combat-public-api.module.code.ts"
import "../combat-ui-context-menus/combat-ui-context-menus.module.code.ts"
import "../combat-ui-selection/combat-ui-selection.module.code.ts"
import "../combat-ui-tooltips/combat-ui-tooltips.module.code.ts"

import { registerAddonInit } from "akasha/temper/addon-init/addon-init/addon-init.module.code.ts"
import { ADDON_NAME } from "../combat-constants/combat-constants.module.code.ts"
import { setCombatLogStringFormatter } from "../combat-core-events/combat-core-events.module.code.ts"
import { initializeCore } from "../combat-core-init/combat-core-init.module.code.ts"
import { resetFight } from "../combat-lib-fight/combat-lib-fight.module.code.ts"
import { getCombatLogString } from "../combat-lib-log-strings/combat-lib-log-strings.module.code.ts"
import { registerStrings } from "../combat-strings/combat-strings.module.code.ts"

registerStrings()

setCombatLogStringFormatter(getCombatLogString)

TemperCombat.ResetFight = resetFight

function initialize(this: void): undefined {
  initializeCore()
}

registerAddonInit(ADDON_NAME, initialize)
