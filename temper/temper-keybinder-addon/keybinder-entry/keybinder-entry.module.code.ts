import "../keybinder-public-api/keybinder-public-api.module.code.ts"

import { registerAddonInit } from "@akasha/temper-addon-init/addon-init"
import { bindingFunctionsAvailable } from "../keybinder-binding-fns/keybinder-binding-fns.module.code.ts"
import { ADDON_NAME } from "../keybinder-constants/keybinder-constants.module.code.ts"
import { installBuildMasterListHook } from "../keybinder-filter/keybinder-filter.module.code.ts"
import { registerBindingEvents } from "../keybinder-keybind-events/keybinder-keybind-events.module.code.ts"
import { initializeSavedVariables } from "../keybinder-saved-variables/keybinder-saved-variables.module.code.ts"
import { resetBindingSyncState } from "../keybinder-state/keybinder-state.module.code.ts"

if (bindingFunctionsAvailable()) {
  registerBindingEvents()
  installBuildMasterListHook()
  resetBindingSyncState()
  registerAddonInit(ADDON_NAME, initializeSavedVariables)
}
