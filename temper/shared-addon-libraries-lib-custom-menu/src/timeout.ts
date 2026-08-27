import { SUBMENU_SHOW_TIMEOUT } from "./constants"

const HANDLE_PREFIX = "LibCustomMenuSubMenuTimeout"

let submenuCallLaterHandle: string | undefined
let nextId = 1

export function ClearTimeout(this: void): undefined {
  if (submenuCallLaterHandle !== undefined) {
    EVENT_MANAGER.UnregisterForUpdate(submenuCallLaterHandle)
    submenuCallLaterHandle = undefined
  }
}

export function SetTimeout(this: void, callback: (() => void) | undefined): undefined {
  if (submenuCallLaterHandle !== undefined) {
    ClearTimeout()
  }
  submenuCallLaterHandle = `${HANDLE_PREFIX}${nextId}`
  nextId = nextId + 1

  EVENT_MANAGER.RegisterForUpdate(
    submenuCallLaterHandle,
    SUBMENU_SHOW_TIMEOUT,
    function (this: void): undefined {
      ClearTimeout()
      if (callback !== undefined) {
        callback()
      }
    }
  )
}
