import { asApiComboBoxObjectLike } from "./casts-1a"
import { asLsmCastIsDropdownVisibleThisUnknownBooleanUndefined } from "./casts-2a"
import { asLsmCastRecordStringUnknown } from "./casts-2b"
import { asLsmCastThisVoidArgUnknownArgsUnknownUnknown, asLsmCastThisVoidComboBoxRecordStringUnknownGroupIndexU } from "./casts-3a"
import { asLsmCastUnknown } from "./casts-4"

type LsmCastLocalContextMenuLikeUndefined = ContextMenuLike | undefined
function asLsmCastLocalContextMenuLikeUndefined(
  value: unknown
): LsmCastLocalContextMenuLikeUndefined {
  return value as LsmCastLocalContextMenuLikeUndefined
}

import { updateContextMenuRef } from "./api"
import { LSM_UPDATE_MODE_BOTH, LSM_UPDATE_MODE_MAINMENU, LSM_UPDATE_MODE_SUBMENU } from "./constants-core"
import { lib } from "./lib-state"

const LSM_UPDATE_MODE_SUBMENU_local = LSM_UPDATE_MODE_SUBMENU
const LSM_UPDATE_MODE_MAINMENU_local = LSM_UPDATE_MODE_MAINMENU
const LSM_UPDATE_MODE_BOTH_local = LSM_UPDATE_MODE_BOTH

const constants = lib.constants
const entryTypeConstants = asLsmCastRecordStringUnknown(constants.entryTypes)

const libUtil = lib.Util
const getValueOrCallback = asLsmCastThisVoidArgUnknownArgsUnknownUnknown(libUtil.getValueOrCallback)
const getButtonGroupOfEntryType = asLsmCastThisVoidComboBoxRecordStringUnknownGroupIndexU(
  libUtil.getButtonGroupOfEntryType
)

function LSM_RefreshLibScrollableMenu(
  this: void,
  mocCtrl?: unknown,
  updateMode?: unknown,
  comboBox?: unknown
): undefined {
  if (mocCtrl === undefined) {
    mocCtrl = moc()
  }
  if (mocCtrl !== undefined) {
    const moc = asApiComboBoxObjectLike(mocCtrl)
    if (comboBox === undefined) {
      comboBox = (moc.m_comboBox ?? moc.m_owner?.m_comboBox) || undefined
    }
    if (comboBox === undefined) {
      return
    }
    if (
      updateMode === LSM_UPDATE_MODE_BOTH_local ||
      updateMode === LSM_UPDATE_MODE_MAINMENU_local
    ) {
      const mainMenuComboBox = moc.m_owner?.m_comboBox || undefined
      const mainMenuDropdown = mainMenuComboBox?.m_dropdownObject || undefined
      if (mainMenuDropdown !== undefined) {
        if (asApiComboBoxObjectLike(mainMenuComboBox).IsDropdownVisible?.() === true) {
          asApiComboBoxObjectLike(mainMenuDropdown).SubmenuOrCurrentListRefresh?.(
            mocCtrl,
            true,
            true
          )
        }
      }
    }

    if (updateMode === LSM_UPDATE_MODE_BOTH_local || updateMode === LSM_UPDATE_MODE_SUBMENU_local) {
      if (
        moc.m_dropdownObject &&
        comboBox &&
        asApiComboBoxObjectLike(comboBox).IsDropdownVisible?.() === true
      ) {
        asApiComboBoxObjectLike(moc.m_dropdownObject).SubmenuOrCurrentListRefresh?.(
          mocCtrl,
          true,
          false
        )
      }
    }
  }
}
RefreshCustomScrollableMenu = LSM_RefreshLibScrollableMenu

function LSM_IsContextMenuCurrentlyShown(this: void): boolean {
  const g_contextMenu = asLsmCastLocalContextMenuLikeUndefined(updateContextMenuRef())
  if (g_contextMenu === undefined) {
    return false
  }
  let isDropdownVisible = g_contextMenu.IsDropdownVisible()
  if (!isDropdownVisible) {
    isDropdownVisible = g_contextMenu.m_dropdownObject.control.IsHidden()
  }
  return isDropdownVisible
}
_G.IsCustomScrollableContextMenuShown = LSM_IsContextMenuCurrentlyShown

function LSM_IsLSMCurrentlyShown(this: void): boolean {
  const LSM_menus = asLsmCastRecordStringUnknown(lib._objects)
  if (ZO_IsTableEmpty(LSM_menus)) {
    return false
  }
  for (const [, LSM_menuValue] of ipairs(asLsmCastUnknown(LSM_menus))) {
    const LSM_menu = asLsmCastIsDropdownVisibleThisUnknownBooleanUndefined(LSM_menuValue)
    if (LSM_menu !== undefined && LSM_menu.IsDropdownVisible !== undefined) {
      if (LSM_menu.IsDropdownVisible()) {
        return true
      }
    }
  }
  return LSM_IsContextMenuCurrentlyShown()
}
IsCustomScrollableMenuShown = LSM_IsLSMCurrentlyShown

function preventCustomScrollableContextMenuHideImpl(this: void): undefined {
  lib.preventLSMClosingZO_Menu = true
}
_G.PreventCustomScrollableContextMenuHide = preventCustomScrollableContextMenuHideImpl
const preventCustomScrollableContextMenuHide = preventCustomScrollableContextMenuHideImpl

function preventCustomScrollableContextMenuEntryClickHideImpl(
  this: void,
  clickCount?: unknown
): undefined {
  if (clickCount !== undefined) {
    const preventerVars = asLsmCastRecordStringUnknown(LibScrollableMenu.preventerVars)
    preventerVars.suppressNextOnEntryMouseUp = true
    preventerVars.suppressNextOnGlobalMouseUp = true
    preventerVars.suppressNextOnEntryMouseUpDisableCounter = clickCount
  }
}
PreventCustomScrollableContextMenuEntryClickHide =
  preventCustomScrollableContextMenuEntryClickHideImpl
const preventCustomScrollableContextMenuEntryClickHide =
  PreventCustomScrollableContextMenuEntryClickHide

function oneTimeSuppressLSMCLose(this: void): undefined {
  preventCustomScrollableContextMenuEntryClickHide(1)
}

function buttonGroupDefaultContextMenu(
  this: void,
  comboBox: Record<string, unknown>,
  control: unknown,
  data: Record<string, unknown>,
  useZO_Menu?: unknown
): undefined {
  if (useZO_Menu === undefined) {
    useZO_Menu = LSM_IsContextMenuCurrentlyShown()
  }
  const buttonGroup = comboBox.m_buttonGroup
  if (buttonGroup === undefined) {
    return
  }
  const groupIndex = getValueOrCallback(data.buttonGroup, data)
  if (groupIndex === undefined) {
    return
  }
  const entryType = getValueOrCallback(data.entryType, data)
  if (entryType === undefined) {
    return
  }

  if (useZO_Menu === true) {
    ClearMenu()

    const buttonGroupSetAll = [
      {
        name: GetString(SI_LSM_CNTXT_CHECK_ALL),
        callback: function (this: void): unknown {
          oneTimeSuppressLSMCLose()
          const buttonGroupOfEntryType = getButtonGroupOfEntryType(comboBox, groupIndex, entryType)
          if (buttonGroupOfEntryType === undefined) {
            return
          }
          return buttonGroupOfEntryType.SetChecked(control, true, data.ignoreCallback)
        },
      },
      {
        name: GetString(SI_LSM_CNTXT_CHECK_NONE),
        callback: function (this: void): unknown {
          oneTimeSuppressLSMCLose()
          const buttonGroupOfEntryType = getButtonGroupOfEntryType(comboBox, groupIndex, entryType)
          if (buttonGroupOfEntryType === undefined) {
            return
          }
          return buttonGroupOfEntryType.SetChecked(control, false, data.ignoreCallback)
        },
      },
      {
        name: GetString(SI_LSM_CNTXT_CHECK_INVERT),
        callback: function (this: void): unknown {
          oneTimeSuppressLSMCLose()
          const buttonGroupOfEntryType = getButtonGroupOfEntryType(comboBox, groupIndex, entryType)
          if (buttonGroupOfEntryType === undefined) {
            return
          }
          return buttonGroupOfEntryType.SetInverse(control, data.ignoreCallback)
        },
      },
    ]
    for (const [, entryData] of ipairs(buttonGroupSetAll)) {
      AddMenuItem(entryData.name, entryData.callback)
    }

    preventCustomScrollableContextMenuHide()
    ShowMenu()
  } else {
    const buttonGroupSetAll = [
      {
        name: GetString(SI_LSM_CNTXT_CHECK_ALL),
        entryType: entryTypeConstants.LSM_ENTRY_TYPE_NORMAL,
        callback: function (this: void): unknown {
          const buttonGroupOfEntryType = getButtonGroupOfEntryType(comboBox, groupIndex, entryType)
          if (buttonGroupOfEntryType === undefined) {
            return
          }
          return buttonGroupOfEntryType.SetChecked(control, true, data.ignoreCallback)
        },
      },
      {
        name: GetString(SI_LSM_CNTXT_CHECK_NONE),
        entryType: entryTypeConstants.LSM_ENTRY_TYPE_NORMAL,
        callback: function (this: void): unknown {
          const buttonGroupOfEntryType = getButtonGroupOfEntryType(comboBox, groupIndex, entryType)
          if (buttonGroupOfEntryType === undefined) {
            return
          }
          return buttonGroupOfEntryType.SetChecked(control, false, data.ignoreCallback)
        },
      },
      {
        name: GetString(SI_LSM_CNTXT_CHECK_INVERT),
        entryType: entryTypeConstants.LSM_ENTRY_TYPE_NORMAL,
        callback: function (this: void): unknown {
          const buttonGroupOfEntryType = getButtonGroupOfEntryType(comboBox, groupIndex, entryType)
          if (buttonGroupOfEntryType === undefined) {
            return
          }
          return buttonGroupOfEntryType.SetInverse(control, data.ignoreCallback)
        },
      },
    ]

    ClearCustomScrollableMenu()
    const [addedEntriesIgnored] = AddCustomScrollableMenuEntries(buttonGroupSetAll)
    void addedEntriesIgnored
    ShowCustomScrollableMenu(undefined, undefined)
  }
}
lib.SetButtonGroupState = buttonGroupDefaultContextMenu
lib.ButtonGroupDefaultContextMenu = buttonGroupDefaultContextMenu
