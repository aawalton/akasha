import { reloadUI } from "akasha/temper/ui-reload/modules/reload-ui/reload-ui.module.code.ts"

export function slashCommands(this: void): undefined {
  const leaveGroup = (): undefined => {
    if (IsUnitGrouped("player")) {
      GroupLeave()
    }
  }
  SLASH_COMMANDS["/gl"] = leaveGroup
  SLASH_COMMANDS["/groupleave"] = leaveGroup
  SLASH_COMMANDS["/ungroup"] = leaveGroup

  SLASH_COMMANDS["/rl"] = reloadUI
  SLASH_COMMANDS["/rlui"] = reloadUI
  SLASH_COMMANDS["/reload"] = reloadUI

  const logoutNow = (): undefined => {
    Logout()
  }
  SLASH_COMMANDS["/lo"] = logoutNow

  const quitNow = (): undefined => {
    Quit()
  }
  SLASH_COMMANDS["/q"] = quitNow

  SLASH_COMMANDS["/esc"] = (): undefined => {
    ZO_SceneManager_ToggleGameMenuBinding()
  }
}
