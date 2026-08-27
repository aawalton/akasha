import { asLsmCastIsDropdownVisibleThisUnknownBoolean } from "./casts-2a"
import { asLsmCastRecordStringUnknown } from "./casts-2b"
import { asLsmCastThisVoidPreventerVarNameStringLuaMultiReturnBo } from "./casts-3b"
import { asLsmCastUnknown } from "./casts-4"

type LsmCastLocalTypeofGetControlName2 = typeof getControlName
function asLsmCastLocalTypeofGetControlName2(value: unknown): LsmCastLocalTypeofGetControlName2 {
  return value as LsmCastLocalTypeofGetControlName2
}

import { lib } from "./lib-state"

const libUtil = lib.Util

let getControlName: (this: void, control: unknown, alternativeControl?: unknown) => string

const libUtil_checkAndUpdatePreventerVar = asLsmCastThisVoidPreventerVarNameStringLuaMultiReturnBo(
  libUtil.checkAndUpdatePreventerVar
)

libUtil.isScrollBarClicked = function (
  this: void,
  scrollCtrl: Record<string, unknown> | undefined,
  compareCtrl: unknown
): boolean {
  if (scrollCtrl === undefined || compareCtrl === undefined || scrollCtrl.scrollbar === undefined) {
    return false
  }
  if (scrollCtrl.scrollbar === compareCtrl) {
    return true
  }
  if (scrollCtrl.upButton && scrollCtrl.upButton === compareCtrl) {
    return true
  }
  if (scrollCtrl.downButton && scrollCtrl.downButton === compareCtrl) {
    return true
  }
  return false
}

libUtil.checkNextOnEntryMouseUpShouldExecute = function (this: void): boolean {
  const preventerVars = asLsmCastRecordStringUnknown(lib.preventerVars)
  if (preventerVars.suppressNextOnEntryMouseUp === true) {
    const [wasProcessed, newPreventerVarNumber] = libUtil_checkAndUpdatePreventerVar(
      "suppressNextOnEntryMouseUpDisableCounter"
    )
    if (
      wasProcessed === true &&
      newPreventerVarNumber !== undefined &&
      newPreventerVarNumber === 0
    ) {
      preventerVars.suppressNextOnEntryMouseUp = undefined
      return false
    }
    preventerVars.suppressNextOnEntryMouseUp = undefined
    return true
  }
  return false
}

libUtil.isAnyLSMDropdownVisible = function (this: void, contextMenuToo: unknown): boolean {
  if (lib._objects === undefined) {
    return false
  }
  getControlName = getControlName ?? asLsmCastLocalTypeofGetControlName2(libUtil.getControlName)
  for (const [, lsmRef] of ipairs(asLsmCastUnknown(lib._objects))) {
    if (
      lsmRef !== undefined &&
      asLsmCastIsDropdownVisibleThisUnknownBoolean(lsmRef).IsDropdownVisible()
    ) {
      if (
        !contextMenuToo ||
        (contextMenuToo && asLsmCastRecordStringUnknown(lsmRef).isContextMenu)
      ) {
        return true
      }
    }
  }
  return false
}
