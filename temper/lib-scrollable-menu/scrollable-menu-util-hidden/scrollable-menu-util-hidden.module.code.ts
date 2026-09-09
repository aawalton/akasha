import { asBoolean } from "../scrollable-menu-casts-1a/scrollable-menu-casts-1a.module.code.ts"
import { hiddenForContextMenuReasons } from "../scrollable-menu-util-hidden-context/scrollable-menu-util-hidden-context.module.code.ts"
import "../scrollable-menu-casts-1b/scrollable-menu-casts-1b.module.code.ts"
import {
  asLsmCastIsDropdownVisibleThisUnknownBooleanMDropdownO,
  asLsmCastIsOwnedByComboBoxThisUnknownComboBoxUnknownBoo,
} from "../scrollable-menu-casts-2a/scrollable-menu-casts-2a.module.code.ts"
import { asLsmCastRecordStringUnknown } from "../scrollable-menu-casts-2b/scrollable-menu-casts-2b.module.code.ts"
import { asLsmCastThisVoidContextMenuObjectUndefined } from "../scrollable-menu-casts-3a/scrollable-menu-casts-3a.module.code.ts"
import "../scrollable-menu-casts-3b/scrollable-menu-casts-3b.module.code.ts"
import { asObject } from "../scrollable-menu-casts-4/scrollable-menu-casts-4.module.code.ts"

import {
  lib,
  setContextMenu,
} from "../scrollable-menu-lib-state/scrollable-menu-lib-state.module.code.ts"

const libUtil = lib.Util

const libDebug = lib.Debug
const debugPrefix = libDebug.prefix

const tos = tostring

const getContextMenuReference = asLsmCastThisVoidContextMenuObjectUndefined(
  libUtil.getContextMenuReference
)
libUtil.checkIfHiddenForReasons = function (
  this: void,
  selfVar: Record<string, unknown>,
  button: number,
  isContextMenu: boolean | undefined,
  _owningWindow: unknown,
  mocCtrl: Record<string, unknown> | undefined,
  comboBox: Record<string, unknown> | undefined,
  entry: unknown,
  isSubmenu: unknown
): boolean {
  const gContextMenu = getContextMenuReference()
  setContextMenu(gContextMenu)
  isContextMenu = isContextMenu ?? false

  let returnValue = false
  const cm = asLsmCastIsDropdownVisibleThisUnknownBooleanMDropdownO(gContextMenu)

  const isContextMenuVisible = isContextMenu || cm.IsDropdownVisible()
  if (!isContextMenu && isContextMenuVisible === true) {
    isContextMenu = true
  }

  const dropdownObject = asLsmCastRecordStringUnknown(selfVar.m_dropdownObject)
  const contextMenuDropdownObject = asLsmCastRecordStringUnknown(cm.m_dropdownObject)
  const isOwnedByComboBox =
    asLsmCastIsOwnedByComboBoxThisUnknownComboBoxUnknownBoo(dropdownObject).IsOwnedByComboBox(
      comboBox
    )
  const isCntxtMenuOwnedByComboBox =
    asLsmCastIsOwnedByComboBoxThisUnknownComboBoxUnknownBoo(
      contextMenuDropdownObject
    ).IsOwnedByComboBox(comboBox)

  const doDebugNow = false
  if (doDebugNow) {
    d(
      debugPrefix +
        "[checkIfHiddenForReasons]isOwnedByCBox: " +
        tos(isOwnedByComboBox) +
        ", isCntxtMenVis: " +
        tos(isContextMenuVisible) +
        ", isCntxtMenOwnedByCBox: " +
        tos(isCntxtMenuOwnedByComboBox) +
        ", isSubmenu: " +
        tos(selfVar.isSubmenu)
    )
  }

  if (!isContextMenu) {
    if (button === MOUSE_BUTTON_INDEX_LEFT) {
      if (isOwnedByComboBox === true) {
        if (!comboBox) {
          if (doDebugNow) {
            d("<1not comboBox -> true")
          }
          returnValue = true
        } else {
          if (type(entry) === "table" && ZO_IsTableEmpty(asObject(entry))) {
            if (doDebugNow) {
              d("<1ZO_IsTableEmpty(entry) -> true")
            }
            returnValue = true
          } else {
            if (mocCtrl) {
              const owner = asLsmCastRecordStringUnknown(mocCtrl).m_owner
              if (owner) {
                if (doDebugNow) {
                  d("1>>owner found")
                }
                if (owner === comboBox) {
                  if (doDebugNow) {
                    d(
                      ">>1 - closeOnSelect: " +
                        tos(asLsmCastRecordStringUnknown(mocCtrl).closeOnSelect)
                    )
                  }
                  returnValue = asBoolean(asLsmCastRecordStringUnknown(mocCtrl).closeOnSelect)
                } else {
                  if (doDebugNow) {
                    d(">>1 - true")
                  }
                  returnValue = true
                }
              }
            } else {
              if (doDebugNow) {
                d(">>1 - no mocCtrl")
              }
            }
          }
        }
      } else if (isCntxtMenuOwnedByComboBox !== undefined) {
        if (doDebugNow) {
          d(">isCntxtMenuOwnedByComboBox: " + tos(isCntxtMenuOwnedByComboBox))
        }
        return !isCntxtMenuOwnedByComboBox
      } else {
        returnValue = true
      }
    } else if (button === MOUSE_BUTTON_INDEX_RIGHT) {
      returnValue = true
    }
  } else {
    return hiddenForContextMenuReasons(
      selfVar,
      button,
      mocCtrl,
      comboBox,
      entry,
      isSubmenu,
      gContextMenu,
      cm,
      contextMenuDropdownObject,
      isCntxtMenuOwnedByComboBox
    )
  }

  return returnValue
}
