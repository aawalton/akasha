import "akasha/temper/keybinder-addon/keybinder-public-api/keybinder-public-api.module.code.ts"

import { registerAddonInit } from "akasha/temper/addon-init/addon-init/addon-init.module.code.ts"
import { bindingFunctionsAvailable } from "akasha/temper/keybinder-addon/keybinder-binding-fns/keybinder-binding-fns.module.code.ts"
import { ADDON_NAME } from "akasha/temper/keybinder-addon/keybinder-constants/keybinder-constants.module.code.ts"
import { installBuildMasterListHook } from "akasha/temper/keybinder-addon/keybinder-filter/keybinder-filter.module.code.ts"
import { registerBindingEvents } from "akasha/temper/keybinder-addon/keybinder-keybind-events/keybinder-keybind-events.module.code.ts"
import { initializeSavedVariables } from "akasha/temper/keybinder-addon/keybinder-saved-variables/keybinder-saved-variables.module.code.ts"
import { resetBindingSyncState } from "akasha/temper/keybinder-addon/keybinder-state/keybinder-state.module.code.ts"

if (bindingFunctionsAvailable()) {
  registerBindingEvents()
  installBuildMasterListHook()
  resetBindingSyncState()
  registerAddonInit(ADDON_NAME, initializeSavedVariables)
}
