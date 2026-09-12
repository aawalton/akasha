import "akasha/temper/combat-addon/combat-controls-title/combat-controls-title.type-declaration.d.ts"
import "akasha/temper/combat-addon/combat-controls-report/combat-controls-report.type-declaration.d.ts"
import "akasha/temper/combat-addon/combat-controls-panels/combat-controls-panels.type-declaration.d.ts"
import "akasha/temper/combat-addon/combat-string-ids/combat-string-ids.type-declaration.d.ts"
import "akasha/temper/combat-addon/combat-string-ids-report/combat-string-ids-report.type-declaration.d.ts"
import "akasha/temper/combat-addon/combat-string-ids-menus/combat-string-ids-menus.type-declaration.d.ts"
import "akasha/temper/combat-addon/combat-menu-string-ids/combat-menu-string-ids.type-declaration.d.ts"
import "akasha/temper/combat-addon/modules/combat-public-api/combat-public-api.module.code.ts"
import "akasha/temper/combat-addon/modules/combat-ui-context-menus/combat-ui-context-menus.module.code.ts"
import "akasha/temper/combat-addon/modules/combat-ui-selection/combat-ui-selection.module.code.ts"
import "akasha/temper/combat-addon/modules/combat-ui-tooltips/combat-ui-tooltips.module.code.ts"

import { registerAddonInit } from "akasha/temper/addon-init/modules/addon-init/addon-init.module.code.ts"
import { ADDON_NAME } from "akasha/temper/combat-addon/modules/combat-constants/combat-constants.module.code.ts"
import { setCombatLogStringFormatter } from "akasha/temper/combat-addon/modules/combat-core-events/combat-core-events.module.code.ts"
import { initializeCore } from "akasha/temper/combat-addon/modules/combat-core-init/combat-core-init.module.code.ts"
import { resetFight } from "akasha/temper/combat-addon/modules/combat-lib-fight/combat-lib-fight.module.code.ts"
import { getCombatLogString } from "akasha/temper/combat-addon/modules/combat-lib-log-strings/combat-lib-log-strings.module.code.ts"
import { registerStrings } from "akasha/temper/combat-addon/modules/combat-strings/combat-strings.module.code.ts"

registerStrings()

setCombatLogStringFormatter(getCombatLogString)

TemperCombat.ResetFight = resetFight

function initialize(this: void): undefined {
  initializeCore()
}

registerAddonInit(ADDON_NAME, initialize)
