export const em = EVENT_MANAGER
export const wm = WINDOW_MANAGER
export const cm = CALLBACK_MANAGER

export const LAM = LibAddonMenu2
export const util = LAM.util

export const getStringFromValue = util.GetStringFromValue
export const getDefaultValue = util.GetDefaultValue

export const STATE: {
  cursorTLC: LamCursorTLC | undefined
  cursorTLCLabel: LabelControl | undefined
  orderListBoxCounter: number
} = {
  cursorTLC: undefined,
  cursorTLCLabel: undefined,
  orderListBoxCounter: 0,
}
