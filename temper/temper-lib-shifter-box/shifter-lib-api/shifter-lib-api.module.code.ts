import { ShifterBoxProto } from "../shifter-box-class/shifter-box-class.module.code.ts"
import {
  asAnchorOptions,
  asControl,
  asTableKey,
  asUnknownArray,
} from "../shifter-casts/shifter-casts.module.code.ts"
import { DATA_DEFAULT_CATEGORY } from "../shifter-constants/shifter-constants.module.code.ts"
import { existingShifterBoxes, lib } from "../shifter-state/shifter-state.module.code.ts"
import type { Lib, ShifterBox } from "../shifter-types/shifter-types.module.code.ts"

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
    asAnchorOptions(args[4]),
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
