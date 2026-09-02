import "./public-api"

import { registerAddonInit } from "@akasha/temper-addon-init/addon-init"
import { bindingFunctionsAvailable } from "./binding-fns"
import { ADDON_NAME } from "./constants"
import { installBuildMasterListHook } from "./filter"
import { registerBindingEvents } from "./keybind-events"
import { Initialize } from "./saved-variables"
import { resetBindingSyncState } from "./state"

if (bindingFunctionsAvailable()) {
  registerBindingEvents()
  installBuildMasterListHook()
  resetBindingSyncState()
  registerAddonInit(ADDON_NAME, Initialize)
}
