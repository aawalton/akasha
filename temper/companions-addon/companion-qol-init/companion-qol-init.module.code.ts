import "../../addon-library-types/lib-addon-menu/lib-addon-menu.type-declaration.d.ts"
import "akasha/temper/eso-types/eso-api/eso-api.type-declaration.d.ts"
import "akasha/temper/eso-types/eso-api-2/eso-api-2.type-declaration.d.ts"
import "akasha/temper/eso-types/eso-enums-01/eso-enums-01.type-declaration.d.ts"
import "akasha/temper/eso-types/eso-enums-02/eso-enums-02.type-declaration.d.ts"
import "akasha/temper/eso-types/eso-enums-05/eso-enums-05.type-declaration.d.ts"
import "akasha/temper/eso-types/eso-enums-06/eso-enums-06.type-declaration.d.ts"
import "akasha/temper/eso-types/eso-enums-15/eso-enums-15.type-declaration.d.ts"
import "akasha/temper/eso-types/eso-enums-17/eso-enums-17.type-declaration.d.ts"
import "akasha/temper/eso-types/eso-enums-18/eso-enums-18.type-declaration.d.ts"
import "akasha/temper/eso-types/eso-enums-19/eso-enums-19.type-declaration.d.ts"
import "akasha/temper/eso-types/eso-event-manager/eso-event-manager.type-declaration.d.ts"
import "akasha/temper/eso-types/eso-events/eso-events.type-declaration.d.ts"
import "akasha/temper/eso-types/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso-types/eso-functions-02/eso-functions-02.type-declaration.d.ts"
import "akasha/temper/eso-types/eso-functions-07/eso-functions-07.type-declaration.d.ts"
import "akasha/temper/eso-types/eso-functions-08/eso-functions-08.type-declaration.d.ts"
import "akasha/temper/eso-types/eso-functions-09/eso-functions-09.type-declaration.d.ts"
import "akasha/temper/eso-types/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso-types/eso-interface-extra-2/eso-interface-extra-2.type-declaration.d.ts"
import "akasha/temper/eso-types/eso-string-ids/eso-string-ids.type-declaration.d.ts"
import "akasha/temper/eso-types/eso-ui/eso-ui.type-declaration.d.ts"
import "akasha/temper/eso-types/eso-ui-2/eso-ui-2.type-declaration.d.ts"
import "akasha/temper/eso-types/eso-ui-3/eso-ui-3.type-declaration.d.ts"
import "akasha/temper/eso-types/eso-lua-sandbox/eso-lua-sandbox.type-declaration.d.ts"
import "akasha/temper/eso-types/lua-language-extensions/lua-language-extensions.type-declaration.d.ts"
import "../companion-qol-globals/companion-qol-globals.module.code.ts"

import "../companion-qol-constants/companion-qol-constants.module.code.ts"
import "../companion-qol-core/companion-qol-core.module.code.ts"
import "../companion-qol-rapport/companion-qol-rapport.module.code.ts"
import "../companion-qol-compass/companion-qol-compass.module.code.ts"
import "../companion-qol-saved-variables/companion-qol-saved-variables.module.code.ts"
import "../companion-qol-interaction-handlers/companion-qol-interaction-handlers.module.code.ts"
import "../companion-qol-settings-menu/companion-qol-settings-menu.module.code.ts"

import { registerBindingStringIds } from "../companion-qol-bindings/companion-qol-bindings.module.code.ts"
import { FCOCO } from "../companion-qol-state/companion-qol-state.module.code.ts"
import { registerUiStrings } from "../companion-qol-ui-strings/companion-qol-ui-strings.module.code.ts"

registerUiStrings()
registerBindingStringIds()

export function initializeFcoCompanion(): undefined {
  if (FCOCO.isCompanionUnlocked) {
    FCOCO.addonLoaded(FCOCO.addonVars.addonName, FCOCO.addonVars.addonName)
  }
  return undefined
}
