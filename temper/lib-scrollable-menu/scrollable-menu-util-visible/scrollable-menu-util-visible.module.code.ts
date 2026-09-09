import { asLsmCastIsDropdownVisibleThisUnknownBoolean } from "../scrollable-menu-casts-2a/scrollable-menu-casts-2a.module.code.ts"
import { asLsmCastRecordStringUnknown } from "../scrollable-menu-casts-2b/scrollable-menu-casts-2b.module.code.ts"
import { asLsmCastThisVoidPreventerVarNameStringLuaMultiReturnBo } from "../scrollable-menu-casts-3b/scrollable-menu-casts-3b.module.code.ts"
import { asLsmCastUnknown } from "../scrollable-menu-casts-4/scrollable-menu-casts-4.module.code.ts"

type LsmCastLocalTypeofGetControlName2 = typeof getControlName
function asLsmCastLocalTypeofGetControlName2(value: unknown): LsmCastLocalTypeofGetControlName2 {
  return value as LsmCastLocalTypeofGetControlName2
}

import { lib } from "../scrollable-menu-lib-state/scrollable-menu-lib-state.module.code.ts"

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
