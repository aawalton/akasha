import type { CursorTLC } from "./types"

export const em = EVENT_MANAGER
export const wm = WINDOW_MANAGER
export const cm = CALLBACK_MANAGER

export const LAM = LibAddonMenu2
export const util = LAM.util

export const getStringFromValue = util.GetStringFromValue
export const getDefaultValue = util.GetDefaultValue

export const state: {
  cursorTLC: CursorTLC | undefined
  cursorTLCLabel: LabelControl | undefined
  orderListBoxCounter: number
} = {
  cursorTLC: undefined,
  cursorTLCLabel: undefined,
  orderListBoxCounter: 0,
}
