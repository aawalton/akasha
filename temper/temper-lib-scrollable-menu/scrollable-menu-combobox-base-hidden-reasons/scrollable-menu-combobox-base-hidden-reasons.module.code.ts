import { asComboBoxBaseClass } from "../scrollable-menu-casts-1a/scrollable-menu-casts-1a.module.code.ts"
import {
  asLsmCastGetOwningWindowThisVoidUnknown,
  asLsmCastGetParentThisUnknownRecordStringUnknownUndefined,
} from "../scrollable-menu-casts-1b/scrollable-menu-casts-1b.module.code.ts"
import { asLsmCastIsMouseEnabledThisVoidBoolean } from "../scrollable-menu-casts-2a/scrollable-menu-casts-2a.module.code.ts"
import {
  asLsmCastRecordNumberBoolean,
  asLsmCastRecordStringUnknown,
  asLsmCastRecordStringUnknownUndefined,
} from "../scrollable-menu-casts-2b/scrollable-menu-casts-2b.module.code.ts"
import {
  asLsmCastThisVoidArgsUnknownUnknownUndefined,
  asLsmCastThisVoidContextMenuObject,
  asLsmCastThisVoidControlUnknownAlternativeControlUnknow,
} from "../scrollable-menu-casts-3a/scrollable-menu-casts-3a.module.code.ts"
import {
  asLsmCastThisVoidControlUnknownRecordStringUnknown,
  asLsmCastThisVoidControlUnknownRecordStringUnknownUndef,
  asLsmCastThisVoidCtrlUnknownBoolean,
  asLsmCastThisVoidLogTypeNumberMsgIdNumberArgsUnknownUnd,
} from "../scrollable-menu-casts-3b/scrollable-menu-casts-3b.module.code.ts"
import {
  asLsmCastThisVoidRecordStringUnknownUndefined,
  asLsmCastThisVoidScrollUnknownMocCtrlUnknownBoolean,
  asNumber,
  asString,
  asUnknown,
} from "../scrollable-menu-casts-4/scrollable-menu-casts-4.module.code.ts"
import { contextMenuClickFlags } from "../scrollable-menu-combobox-base-hidden-clicks/scrollable-menu-combobox-base-hidden-clicks.module.code.ts"

type LsmCastLocalContextMenuLike3 = ContextMenuLike
function asLsmCastLocalContextMenuLike3(value: unknown): LsmCastLocalContextMenuLike3 {
  return value as LsmCastLocalContextMenuLike3
}

type LsmCastLocalDropdownObjectLike = DropdownObjectLike
function asLsmCastLocalDropdownObjectLike(value: unknown): LsmCastLocalDropdownObjectLike {
  return value as LsmCastLocalDropdownObjectLike
}

import {
  getContextMenu,
  lib,
  setContextMenu,
} from "../scrollable-menu-lib-state/scrollable-menu-lib-state.module.code.ts"

const libDebug = lib.Debug
const dlog = asLsmCastThisVoidLogTypeNumberMsgIdNumberArgsUnknownUnd(libDebug.DebugLog)
const debugPrefix = asString(libDebug.prefix)

const tos = tostring

const moc = asLsmCastThisVoidRecordStringUnknownUndefined(asLsmCastRecordStringUnknown(_G).moc)

const constants = lib.constants
const entryTypeConstants = asLsmCastRecordStringUnknown(constants.entryTypes)
const IS_ENTRY_TYPE_WITH_PARENT_MOC_CTRL = asLsmCastRecordNumberBoolean(
  entryTypeConstants.isEntryTypeWithParentMocCtrl
)

const libUtil = lib.Util
const getControlName = asLsmCastThisVoidControlUnknownAlternativeControlUnknow(
  libUtil.getControlName
)
const getControlData = asLsmCastThisVoidControlUnknownRecordStringUnknown(libUtil.getControlData)
const getComboBox = asLsmCastThisVoidControlUnknownRecordStringUnknownUndef(libUtil.getComboBox)
const belongsToContextMenuCheck = asLsmCastThisVoidCtrlUnknownBoolean(
  libUtil.belongsToContextMenuCheck
)
const isScrollBarClicked = asLsmCastThisVoidScrollUnknownMocCtrlUnknownBoolean(
  libUtil.isScrollBarClicked
)
const getContextMenuReference = asLsmCastThisVoidContextMenuObject(libUtil.getContextMenuReference)

const classes = asLsmCastRecordStringUnknown(lib.classes)
const comboBox_base = asComboBoxBaseClass(classes.comboboxBaseClass)

function asBoolean(this: void, value: boolean): boolean {
  return value
}

interface ContextMenuLike {
  IsDropdownVisible: (this: void) => boolean
  m_container?: unknown
  m_dropdownObject: { WasTextSearchContextMenuEntryClicked: (this: void) => boolean }
}

interface DropdownObjectLike {
  IsOwnedByComboBox: (this: void, comboBox: unknown) => boolean
  WasTextSearchContextMenuEntryClicked: (this: void) => boolean
}

function getMouseOverHiddenForInfo(
  this: void
): LuaMultiReturn<
  [
    unknown,
    Record<string, unknown> | undefined,
    Record<string, unknown> | undefined,
    Record<string, unknown>,
  ]
> {
  const mocCtrl = moc()
  const owningWindow = mocCtrl && asLsmCastGetOwningWindowThisVoidUnknown(mocCtrl).GetOwningWindow()
  const comboBox = getComboBox(owningWindow || mocCtrl)

  return $multi(owningWindow, mocCtrl, comboBox, getControlData(mocCtrl))
}

type LsmCloseContextMenuAndSuppressClickCheck = (
  this: void,
  checkOnlyMultiSelectionAtContextMenu: unknown,
  isMouseOverOwningDropdown: unknown,
  clickedEntryBelongsToContextMenu: unknown
) => boolean | undefined
function asLsmCloseContextMenuAndSuppressClickCheck(
  value: unknown
): LsmCloseContextMenuAndSuppressClickCheck {
  return value as LsmCloseContextMenuAndSuppressClickCheck
}

type LsmWasTextSearchContextMenuEntryClickedCheck = (
  this: void,
  selfVar: ComboBoxBase,
  mocCtrl: Record<string, unknown> | undefined,
  wasTextSearchContextMenuEntryClicked: unknown,
  isContextMenu: unknown
) => unknown
function asLsmWasTextSearchContextMenuEntryClickedCheck(
  value: unknown
): LsmWasTextSearchContextMenuEntryClickedCheck {
  return value as LsmWasTextSearchContextMenuEntryClickedCheck
}

comboBox_base.HiddenForReasons = function (
  this: ComboBoxBase,
  button: number,
  isMouseOverOwningDropdown: unknown
): unknown {
  setContextMenu(getContextMenuReference())
  const wasTextSearchContextMenuEntryClickedCheck = asLsmWasTextSearchContextMenuEntryClickedCheck(
    lib.lsmWasTextSearchContextMenuEntryClickedCheck
  )
  const closeContextMenuAndSuppressClickCheck = asLsmCloseContextMenuAndSuppressClickCheck(
    lib.lsmCloseContextMenuAndSuppressClickCheck
  )
  const gContextMenu = asLsmCastLocalContextMenuLike3(getContextMenu())
  const [owningWindow, mocCtrlInit, comboBox, mocEntry] = getMouseOverHiddenForInfo()
  let mocCtrl = mocCtrlInit
  if (libDebug.doDebug) {
    dlog(libDebug.LSM_LOGTYPE_VERBOSE, 96, tos(button))
  }

  const mocCtrlOrig = mocCtrl
  if (mocCtrl !== undefined && mocCtrl.m_owner === undefined) {
    if (
      (mocCtrl.entryType !== undefined &&
        IS_ENTRY_TYPE_WITH_PARENT_MOC_CTRL[asNumber(mocCtrl.entryType)]) ||
      mocCtrl.toggleFunction
    ) {
      const parentCtrl =
        asLsmCastGetParentThisUnknownRecordStringUnknownUndefined(mocCtrl).GetParent()
      if (parentCtrl !== undefined) {
        mocCtrl = parentCtrl
      }
    }
  }

  const doDebugNow = false
  if (doDebugNow) {
    const tabEntryName = getControlName(mocCtrl) ?? "n/a"
    d(
      debugPrefix +
        "comboBox_base:HiddenForReasons - button: " +
        tos(button) +
        ", tabEntryName: " +
        tos(tabEntryName)
    )
    const globalTbl = asLsmCastRecordStringUnknown(_G)
    globalTbl.LSM_Debug = asLsmCastRecordStringUnknownUndefined(globalTbl.LSM_Debug) ?? {}
    const lsmDebug = asLsmCastRecordStringUnknown(globalTbl.LSM_Debug)
    lsmDebug.HiddenForReasons =
      asLsmCastRecordStringUnknownUndefined(lsmDebug.HiddenForReasons) ?? {}
    asLsmCastRecordStringUnknown(lsmDebug.HiddenForReasons)[tabEntryName] = {
      self: this,
      owningWindow,
      mocCtrlOrig,
      mocCtrl,
      mocEntry,
      comboBox,
      m_dropdownObject: this.m_dropdownObject,
      selfOwner: asLsmCastRecordStringUnknown(this).owner,
      dropdownObjectOwner: asLsmCastRecordStringUnknown(this.m_dropdownObject).owner,
    }
  }

  const dropdownObject = asLsmCastLocalDropdownObjectLike(this.m_dropdownObject)
  const isContextMenuVisible = gContextMenu.IsDropdownVisible()
  const isOwnedByComboBox = dropdownObject.IsOwnedByComboBox(comboBox)
  const [
    wasTextSearchContextMenuEntryClicked,
    wasFilterHeaderClicked,
    wasEditBoxClickedAtContextMenu,
    wasSliderClickedAtContextMenu,
    wasMultiIconClickedAtContextMenu,
  ] = contextMenuClickFlags(gContextMenu, dropdownObject, mocCtrl, isContextMenuVisible)

  if (
    isOwnedByComboBox === true ||
    wasTextSearchContextMenuEntryClicked === true ||
    wasFilterHeaderClicked === true ||
    wasEditBoxClickedAtContextMenu === true ||
    wasSliderClickedAtContextMenu === true ||
    wasMultiIconClickedAtContextMenu === true
  ) {
    const mocEntryTbl = asLsmCastRecordStringUnknown(mocEntry)
    if (
      type(mocEntry) === "table" &&
      (ZO_IsTableEmpty(mocEntry) ||
        (mocEntryTbl.enabled && mocEntryTbl.enabled !== false) ||
        (mocEntryTbl.IsMouseEnabled &&
          asLsmCastIsMouseEnabledThisVoidBoolean(mocEntryTbl).IsMouseEnabled()))
    ) {
      if (button === MOUSE_BUTTON_INDEX_LEFT) {
        if (isContextMenuVisible === true) {
          if (owningWindow !== gContextMenu.m_container) {
            if (wasTextSearchContextMenuEntryClicked === true) {
              return wasTextSearchContextMenuEntryClickedCheck(
                this,
                mocCtrl,
                wasTextSearchContextMenuEntryClicked,
                isContextMenuVisible
              )
            } else if (wasFilterHeaderClicked) {
              return false
            } else if (wasEditBoxClickedAtContextMenu) {
              return false
            } else if (wasSliderClickedAtContextMenu) {
              return false
            } else if (wasMultiIconClickedAtContextMenu) {
              return false
            } else {
              if (mocCtrl) {
                const mocOwner = asLsmCastRecordStringUnknownUndefined(mocCtrl.m_owner)
                const parentMenu =
                  mocOwner && asLsmCastRecordStringUnknownUndefined(mocOwner.m_parentMenu)
                const parentMenuDropdownObject =
                  parentMenu && asUnknown(parentMenu.m_dropdownObject)
                if (
                  mocOwner &&
                  parentMenu &&
                  parentMenuDropdownObject &&
                  parentMenuDropdownObject === this.m_dropdownObject
                ) {
                  return mocCtrl.closeOnSelect && !this.m_enableMultiSelect
                }
              }

              if (closeContextMenuAndSuppressClickCheck(false, undefined, undefined)) {
                return false
              }
            }
          } else {
            if (wasFilterHeaderClicked) {
              return false
            } else if (wasEditBoxClickedAtContextMenu) {
              return false
            } else if (wasSliderClickedAtContextMenu) {
              return false
            } else if (wasMultiIconClickedAtContextMenu) {
              return false
            }

            return asLsmCastRecordStringUnknown(mocCtrl).closeOnSelect && !this.m_enableMultiSelect
          }
        } else {
          return wasTextSearchContextMenuEntryClickedCheck(
            this,
            mocCtrl,
            wasTextSearchContextMenuEntryClicked,
            isContextMenuVisible
          )
        }
      } else if (button === MOUSE_BUTTON_INDEX_RIGHT) {
        return false
      }
    } else {
      if (isContextMenuVisible === true) {
        if (wasEditBoxClickedAtContextMenu) {
          return false
        } else if (wasSliderClickedAtContextMenu) {
          return false
        } else if (wasMultiIconClickedAtContextMenu) {
          return false
        }

        if (comboBox !== undefined && mocCtrl !== undefined) {
          if (isScrollBarClicked(comboBox.m_scroll, mocCtrl)) {
            return false
          }

          const comboBoxSubmenu = asLsmCastRecordStringUnknownUndefined(comboBox.m_submenu)
          const submenuScroll =
            (comboBoxSubmenu && asLsmCastRecordStringUnknownUndefined(comboBoxSubmenu.m_scroll)) ||
            undefined
          if (submenuScroll !== undefined) {
            if (submenuScroll.contents === mocCtrl) {
              return false
            } else if (isScrollBarClicked(submenuScroll, mocCtrl)) {
              return false
            }
          }
        }
      } else {
        const mocEntryEntryType = mocEntryTbl.entryType
        if (mocEntryEntryType !== undefined) {
          if (mocEntryTbl.enabled === true) {
            return wasTextSearchContextMenuEntryClickedCheck(
              this,
              mocCtrl,
              wasTextSearchContextMenuEntryClicked,
              isContextMenuVisible
            )
          }
        }
      }
    }
  } else {
    if (button === MOUSE_BUTTON_INDEX_LEFT) {
      let clickedEntryBelongsToContextMenu = false
      if (isContextMenuVisible === true) {
        if (comboBox !== undefined && mocCtrl !== undefined) {
          if (isScrollBarClicked(comboBox.m_scroll, mocCtrl)) {
            return false
          }

          const comboBoxSubmenu = asLsmCastRecordStringUnknownUndefined(comboBox.m_submenu)
          const submenuScroll =
            (comboBoxSubmenu && asLsmCastRecordStringUnknownUndefined(comboBoxSubmenu.m_scroll)) ||
            undefined
          if (submenuScroll !== undefined) {
            if (submenuScroll.contents === mocCtrl) {
              return false
            } else if (isScrollBarClicked(submenuScroll, mocCtrl)) {
              return false
            }
          }
        }

        if (
          asBoolean(wasEditBoxClickedAtContextMenu) === true ||
          asBoolean(wasSliderClickedAtContextMenu) === true ||
          asBoolean(wasMultiIconClickedAtContextMenu) === true
        ) {
          clickedEntryBelongsToContextMenu = true
        } else {
          clickedEntryBelongsToContextMenu = belongsToContextMenuCheck(mocCtrl)
        }
      }
      if (
        closeContextMenuAndSuppressClickCheck(
          true,
          isMouseOverOwningDropdown,
          clickedEntryBelongsToContextMenu
        )
      ) {
        return false
      }
    }
  }

  let hiddenForReasons: ((this: void, ...args: unknown[]) => unknown) | undefined
  if (!this.GetHiddenForReasons) {
    return false
  }
  hiddenForReasons = asLsmCastThisVoidArgsUnknownUnknownUndefined(this.GetHiddenForReasons(button))

  if (hiddenForReasons === undefined) {
    return false
  }
  const isHiddenForReasons = hiddenForReasons(owningWindow, mocCtrl, comboBox, mocEntry)
  return isHiddenForReasons
}
