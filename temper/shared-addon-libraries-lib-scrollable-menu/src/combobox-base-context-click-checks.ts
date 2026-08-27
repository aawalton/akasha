import { asLsmCastGetParentThisUnknownUnknown } from "./casts-1b"
import { asLsmCastRecordNumberString, asLsmCastRecordStringUnknown } from "./casts-2b"
import { asLsmCastThisVoidControlUnknownRecordStringUnknown } from "./casts-3b"
import { asNumber } from "./casts-4"

import { getContextMenu, lib } from "./lib-state"

const constants = lib.constants
const entryTypeConstants = asLsmCastRecordStringUnknown(constants.entryTypes)
const entryTypeToButtonChildName = asLsmCastRecordNumberString(
  entryTypeConstants.entryTypeToButtonChildName
)

const libUtil = lib.Util
const getControlData = asLsmCastThisVoidControlUnknownRecordStringUnknown(libUtil.getControlData)

function wasTextSearchContextMenuEntryClickedCheck(
  this: void,
  selfVar: ComboBoxBase,
  mocCtrl: Record<string, unknown> | undefined,
  wasTextSearchContextMenuEntryClicked: unknown,
  isContextMenu: unknown
): unknown {
  if (wasTextSearchContextMenuEntryClicked === true) {
    lib.preventerVars.suppressNextOnEntryMouseUpDisableCounter = undefined

    if (mocCtrl === undefined || mocCtrl.closeOnSelect === undefined) {
      if (mocCtrl && asLsmCastGetParentThisUnknownUnknown(mocCtrl).GetParent() !== ZO_Menu) {
        if (isContextMenu) {
          lib.preventerVars.suppressNextOnEntryMouseUp = true
        }
        return true
      }
    } else if (mocCtrl !== undefined && mocCtrl.closeOnSelect !== undefined) {
      if (isContextMenu && wasTextSearchContextMenuEntryClicked) {
        lib.preventerVars.suppressNextOnEntryMouseUp = true

        const data = getControlData(mocCtrl)
        if (data?.entryType) {
          const buttonChildName = entryTypeToButtonChildName[asNumber(data.entryType)]
          if (buttonChildName !== undefined) {
            lib.preventerVars.suppressNextOnEntryMouseUpDisableCounter = 2
          }
        }
      }
    }
  }

  if (isContextMenu) {
    if (wasTextSearchContextMenuEntryClicked) {
      lib.preventerVars.suppressNextOnGlobalMouseUp = true
    }
    return false
  } else {
    return (mocCtrl?.closeOnSelect || undefined) && !selfVar.m_enableMultiSelect
  }
}

lib.lsmWasTextSearchContextMenuEntryClickedCheck = wasTextSearchContextMenuEntryClickedCheck

interface ContextMenuLike {
  IsDropdownVisible: (this: void) => boolean
}

type LsmCastLocalContextMenuLike3 = ContextMenuLike
function asLsmCastLocalContextMenuLike3(value: unknown): LsmCastLocalContextMenuLike3 {
  return value as LsmCastLocalContextMenuLike3
}

let clearCustomScrollableMenu: typeof ClearCustomScrollableMenu | undefined

function closeContextMenuAndSuppressClickCheck(
  this: void,
  checkOnlyMultiSelectionAtContextMenu: unknown,
  isMouseOverOwningDropdown: unknown,
  clickedEntryBelongsToContextMenu: unknown
): boolean | undefined {
  lib.preventerVars.wasContextMenuOpenedAsOnMouseUpWasSuppressed = undefined
  lib.preventerVars.suppressNextOnEntryMouseUp = undefined
  const g_contextMenu = asLsmCastLocalContextMenuLike3(getContextMenu())
  if (!g_contextMenu.IsDropdownVisible()) {
    return
  }
  if (
    !checkOnlyMultiSelectionAtContextMenu ||
    (checkOnlyMultiSelectionAtContextMenu &&
      asLsmCastRecordStringUnknown(g_contextMenu).m_enableMultiSelect === true)
  ) {
    if (!isMouseOverOwningDropdown && !clickedEntryBelongsToContextMenu) {
      clearCustomScrollableMenu = clearCustomScrollableMenu ?? ClearCustomScrollableMenu
      clearCustomScrollableMenu()
      lib.preventerVars.suppressNextOnEntryMouseUp = true

      if (
        checkOnlyMultiSelectionAtContextMenu === true &&
        isMouseOverOwningDropdown === undefined &&
        clickedEntryBelongsToContextMenu === false
      ) {
        lib.preventerVars.wasContextMenuOpenedAsOnMouseUpWasSuppressed = true
      }
    }
    return true
  } else {
    if (!isMouseOverOwningDropdown && !clickedEntryBelongsToContextMenu) {
      clearCustomScrollableMenu = clearCustomScrollableMenu ?? ClearCustomScrollableMenu
      clearCustomScrollableMenu()
      lib.preventerVars.suppressNextOnEntryMouseUp = true

      if (
        checkOnlyMultiSelectionAtContextMenu === true &&
        isMouseOverOwningDropdown === undefined &&
        clickedEntryBelongsToContextMenu === false
      ) {
        lib.preventerVars.wasContextMenuOpenedAsOnMouseUpWasSuppressed = true
      }
      return true
    }
  }
  return undefined
}

lib.lsmCloseContextMenuAndSuppressClickCheck = closeContextMenuAndSuppressClickCheck
