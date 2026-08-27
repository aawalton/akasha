import { asControl, asTableKey, asUnknownArray } from "./casts"
import { DATA_DEFAULT_CATEGORY } from "./constants"
import { ShifterBoxProto } from "./shifterbox-class"
import { existingShifterBoxes, lib } from "./state"
import type { Lib, ShifterBox } from "./types"

lib.DEFAULT_CATEGORY = DATA_DEFAULT_CATEGORY

lib.GetShifterBox = function (
  this: void,
  uniqueAddonName: unknown,
  uniqueShifterBoxName: unknown
): ShifterBox | undefined {
  const addonShifterBoxes = existingShifterBoxes.get(asTableKey(uniqueAddonName))
  if (addonShifterBoxes !== undefined) {
    return addonShifterBoxes.get(asTableKey(uniqueShifterBoxName))
  }
  return undefined
}

lib.GetControl = function (
  this: void,
  uniqueAddonName: unknown,
  uniqueShifterBoxName: unknown
): LuaMultiReturn<[Control | undefined, ShifterBox | undefined]> {
  const shifterBox = lib.GetShifterBox(uniqueAddonName, uniqueShifterBoxName)
  if (shifterBox !== undefined) {
    return $multi(shifterBox.shifterBoxControl, shifterBox)
  }
  return $multi(undefined, undefined)
}

lib.Create = function (this: void, ...args: unknown[]): ShifterBox {
  return ShifterBoxProto.New(
    args[0],
    args[1],
    asControl(args[2]),
    args[3],
    asUnknownArray(args[4]),
    asUnknownArray(args[5]),
    args[6],
    args[7]
  )
}

setmetatable(lib, {
  __call(this: Lib, ...args: unknown[]): ShifterBox {
    return lib.Create(...args)
  },
})
