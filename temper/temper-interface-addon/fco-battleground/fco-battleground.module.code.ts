import { STATE } from "../fco-state/fco-state.module.code.ts"

interface SavedAnchor {
  point: number
  relTo: Control | undefined
  relPoint: number
  x: number
  y: number
}

let standardAnchorOfBGHUD: SavedAnchor | undefined

export function bGHUDStandardSave(this: void): undefined {
  const bgHUDctrl = BATTLEGROUND_HUD_FRAGMENT.control
  if (bgHUDctrl !== undefined) {
    const [, point, relTo, relPoint, x, y] = bgHUDctrl.GetAnchor(0)
    standardAnchorOfBGHUD = { point, relTo, relPoint, x, y }
  }
}

export function bGHUDReset(this: void): undefined {
  const bgHUDctrl = BATTLEGROUND_HUD_FRAGMENT.control
  if (bgHUDctrl !== undefined) {
    if (standardAnchorOfBGHUD === undefined) {
      bGHUDStandardSave()
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

let BG_HUD_MOVABLE_HOOKED = false

export function bGHUDMoveable(this: void): undefined {
  const settings = STATE.settingsVars.settings
  const settingsBGHUDCoordinates = settings.BGHUDcoordinates
  const shouldBeMovable = settings.enableBGHUDMoveable === true
  const bgHUDctrl = BATTLEGROUND_HUD_FRAGMENT.control
  if (bgHUDctrl !== undefined) {
    bgHUDctrl.SetMouseEnabled(shouldBeMovable)
    bgHUDctrl.SetMovable(shouldBeMovable)

    if (!shouldBeMovable) {
      bGHUDReset()
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

    if (BG_HUD_MOVABLE_HOOKED) {
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
    BG_HUD_MOVABLE_HOOKED = true
  }
}

export function bgModifications(this: void): undefined {
  bGHUDMoveable()
}
