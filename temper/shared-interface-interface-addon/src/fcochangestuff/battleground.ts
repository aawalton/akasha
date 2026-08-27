import { state } from "./state"

interface SavedAnchor {
  point: number
  relTo: Control | undefined
  relPoint: number
  x: number
  y: number
}

let standardAnchorOfBGHUD: SavedAnchor | undefined

export function BGHUDStandardSave(this: void): undefined {
  const bgHUDctrl = BATTLEGROUND_HUD_FRAGMENT.control
  if (bgHUDctrl !== undefined) {
    const [, point, relTo, relPoint, x, y] = bgHUDctrl.GetAnchor(0)
    standardAnchorOfBGHUD = { point, relTo, relPoint, x, y }
  }
}

export function BGHUDReset(this: void): undefined {
  const bgHUDctrl = BATTLEGROUND_HUD_FRAGMENT.control
  if (bgHUDctrl !== undefined) {
    if (standardAnchorOfBGHUD === undefined) {
      BGHUDStandardSave()
    }
    bgHUDctrl.ClearAnchors()
    if (standardAnchorOfBGHUD !== undefined) {
      bgHUDctrl.SetAnchor(
        standardAnchorOfBGHUD.point,
        standardAnchorOfBGHUD.relTo,
        standardAnchorOfBGHUD.relPoint,
        standardAnchorOfBGHUD.x,
        standardAnchorOfBGHUD.y
      )
    }
  }
}

let bgHUDMovableHooked = false

export function BGHUDMoveable(this: void): undefined {
  const settings = state.settingsVars.settings
  const settingsBGHUDCoordinates = settings.BGHUDcoordinates
  const shouldBeMovable = settings.enableBGHUDMoveable === true
  const bgHUDctrl = BATTLEGROUND_HUD_FRAGMENT.control
  if (bgHUDctrl !== undefined) {
    bgHUDctrl.SetMouseEnabled(shouldBeMovable)
    bgHUDctrl.SetMovable(shouldBeMovable)

    if (!shouldBeMovable) {
      BGHUDReset()
    } else {
      bgHUDctrl.ClearAnchors()
      if (settingsBGHUDCoordinates !== undefined) {
        bgHUDctrl.SetAnchor(
          TOPLEFT,
          GuiRoot,
          TOPLEFT,
          settingsBGHUDCoordinates.x,
          settingsBGHUDCoordinates.y
        )
      }
    }

    if (bgHUDMovableHooked) {
      return
    }

    if (bgHUDctrl.GetHandler("OnMoveStop") === undefined) {
      bgHUDctrl.SetHandler("OnMoveStop", (): undefined => {
        if (settings.enableBGHUDMoveable !== true) {
          return
        }
        const [x, y] = bgHUDctrl.GetScreenRect()
        const coords = settings.BGHUDcoordinates
        coords.x = x
        coords.y = y
      })
    }

    BATTLEGROUND_HUD_FRAGMENT.RegisterCallback(
      "StateChange",
      (_oldState: number, newState: number): undefined => {
        if (newState === SCENE_FRAGMENT_SHOWN) {
          if (settings.enableBGHUDMoveable !== true) {
            return
          }
          const innerBgHUDctrl = BATTLEGROUND_HUD_FRAGMENT.control
          if (innerBgHUDctrl !== undefined) {
            if (settingsBGHUDCoordinates !== undefined) {
              const [, point, relTo, relPoint] = innerBgHUDctrl.GetAnchor(0)
              innerBgHUDctrl.ClearAnchors()
              innerBgHUDctrl.SetAnchor(
                point,
                relTo,
                relPoint,
                settingsBGHUDCoordinates.x,
                settingsBGHUDCoordinates.y
              )
            }
          }
        }
      }
    )
    bgHUDMovableHooked = true
  }
}

export function bgModifications(this: void): undefined {
  BGHUDMoveable()
}
