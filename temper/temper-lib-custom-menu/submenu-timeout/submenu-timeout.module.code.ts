import { SUBMENU_SHOW_TIMEOUT } from "../custom-menu-constants/custom-menu-constants.module.code.ts"

const HANDLE_PREFIX = "LibCustomMenuSubMenuTimeout"

let submenuCallLaterHandle: string | undefined
let NEXT_ID = 1

export function clearTimeout(this: void): undefined {
  if (submenuCallLaterHandle !== undefined) {
    EVENT_MANAGER.UnregisterForUpdate(submenuCallLaterHandle)
    submenuCallLaterHandle = undefined
  }
}

export function setTimeout(this: void, callback: (() => void) | undefined): undefined {
  if (submenuCallLaterHandle !== undefined) {
    clearTimeout()
  }
  submenuCallLaterHandle = `${HANDLE_PREFIX}${NEXT_ID}`
  NEXT_ID = NEXT_ID + 1

  EVENT_MANAGER.RegisterForUpdate(
    submenuCallLaterHandle,
    SUBMENU_SHOW_TIMEOUT,
    function (this: void): undefined {
      clearTimeout()
      if (callback !== undefined) {
        callback()
      }
    }
  )
}
