import { SAVED_VARIABLES_NAME } from "../keybinder-constants/keybinder-constants.module.code.ts"
import { initialize } from "../keybinder-init/keybinder-init.module.code.ts"
import {
  type AccountData,
  KEYBINDER_STATE,
} from "../keybinder-state/keybinder-state.module.code.ts"

const ACCOUNT_DEFAULTS: AccountData = { Keybindings: {} }

export function initializeSavedVariables(this: void): undefined {
  KEYBINDER_STATE.account = ZO_SavedVars.New<AccountData>(
    SAVED_VARIABLES_NAME,
    1,
    undefined,
    ACCOUNT_DEFAULTS,
    "Default",
    "$Machine",
    "$UserProfileWide"
  )
  initialize()
}
