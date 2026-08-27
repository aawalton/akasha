import { asEventIndexable, asLib } from "./casts"
import { EVENT_NAMES, LIB_IDENTIFIER } from "./constants"
import type { CursorTLC, Lib, ShifterBox, ValidateFn } from "./types"

export const CM = CALLBACK_MANAGER
export const EM = EVENT_MANAGER
export const WM = WINDOW_MANAGER

export const lib: Lib = asLib({
  name: LIB_IDENTIFIER,
  version: "0.7.0",
  doDebug: false,
})

lib.allowedEventNames = EVENT_NAMES

export const allowedShifterBoxEvents = new LuaTable<number, boolean>()
const libEvents = asEventIndexable(lib)
for (const [value, eventName] of ipairs(EVENT_NAMES)) {
  libEvents[eventName] = value
  allowedShifterBoxEvents.set(value, true)
}

export const existingShifterBoxes = new LuaTable<AnyNotNil, LuaTable<AnyNotNil, ShifterBox>>()
lib.existingShifterBoxes = existingShifterBoxes

export const validationTypeToFunc = new LuaTable<string, ValidateFn>()

export const cursorState: { tlc: CursorTLC | undefined } = { tlc: undefined }
