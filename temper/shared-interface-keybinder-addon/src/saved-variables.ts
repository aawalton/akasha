import { SAVED_VARIABLES_NAME } from "./constants"
import { initialize } from "./init"
import { type AccountData, state } from "./state"

const ACCOUNT_DEFAULTS: AccountData = { Keybindings: {} }

export function Initialize(this: void): undefined {
  state.account = ZO_SavedVars.New<AccountData>(
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
