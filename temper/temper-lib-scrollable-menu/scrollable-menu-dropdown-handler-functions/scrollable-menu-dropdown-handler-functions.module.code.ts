import {
  asControl,
  asDropdownClassPrivate,
  asDropdownComboBox,
  asDropdownObject,
} from "../scrollable-menu-casts-1a/scrollable-menu-casts-1a.module.code.ts"
import { asLsmCastDropdownClassPrivateHandlerFunctions } from "../scrollable-menu-casts-1b/scrollable-menu-casts-1b.module.code.ts"
import { asLsmCastRecordStringUnknown } from "../scrollable-menu-casts-2b/scrollable-menu-casts-2b.module.code.ts"
import { asLsmCastThisVoidArgsUnknownUndefined } from "../scrollable-menu-casts-3a/scrollable-menu-casts-3a.module.code.ts"
import {
  asLsmCastThisVoidControlUnknownAltUnknownString,
  asLsmCastThisVoidControlUnknownUndefined,
} from "../scrollable-menu-casts-3b/scrollable-menu-casts-3b.module.code.ts"
import { asNumber } from "../scrollable-menu-casts-4/scrollable-menu-casts-4.module.code.ts"

import { lib } from "../scrollable-menu-lib-state/scrollable-menu-lib-state.module.code.ts"

const libDebug = lib.Debug
const dlog = asLsmCastThisVoidArgsUnknownUndefined(libDebug.DebugLog)

const tos = tostring

const HAS_SUBMENU = true
const NO_SUBMENU = false

const constants = lib.constants
const entryTypeConstants = asLsmCastRecordStringUnknown(constants.entryTypes)

const getControlName = asLsmCastThisVoidControlUnknownAltUnknownString(lib.Util.getControlName)
const hideTooltip = asLsmCastThisVoidControlUnknownUndefined(lib.Util.hideTooltip)

const classes = asLsmCastRecordStringUnknown(lib.classes)
const dropdownClassPrivate = asDropdownClassPrivate(classes.dropdownClassPrivate)

const LSM_ENTRY_TYPE_NORMAL = asNumber(entryTypeConstants.LSM_ENTRY_TYPE_NORMAL)
const LSM_ENTRY_TYPE_HEADER = asNumber(entryTypeConstants.LSM_ENTRY_TYPE_HEADER)
const LSM_ENTRY_TYPE_DIVIDER = asNumber(entryTypeConstants.LSM_ENTRY_TYPE_DIVIDER)
const LSM_ENTRY_TYPE_SUBMENU = asNumber(entryTypeConstants.LSM_ENTRY_TYPE_SUBMENU)
const LSM_ENTRY_TYPE_CHECKBOX = asNumber(entryTypeConstants.LSM_ENTRY_TYPE_CHECKBOX)
const LSM_ENTRY_TYPE_BUTTON = asNumber(entryTypeConstants.LSM_ENTRY_TYPE_BUTTON)
const LSM_ENTRY_TYPE_RADIOBUTTON = asNumber(entryTypeConstants.LSM_ENTRY_TYPE_RADIOBUTTON)
const LSM_ENTRY_TYPE_EDITBOX = asNumber(entryTypeConstants.LSM_ENTRY_TYPE_EDITBOX)
const LSM_ENTRY_TYPE_SLIDER = asNumber(entryTypeConstants.LSM_ENTRY_TYPE_SLIDER)

type LsmClearTimeout = (this: void) => undefined
function asLsmClearTimeout(value: unknown): LsmClearTimeout {
  return value as LsmClearTimeout
}
const clearTimeout = asLsmClearTimeout(dropdownClassPrivate.clearTimeout)

const doOnMouseEnterNestedSubmenuChecks = dropdownClassPrivate.doOnMouseEnterNestedSubmenuChecks
const doSubmenuOnMouseEnterNestedSubmenuChecks =
  dropdownClassPrivate.doSubmenuOnMouseEnterNestedSubmenuChecks

function checkForMultiSelectEnabled(
  this: void,
  selfVar: DropdownObject,
  control: DropdownRowControl,
  isOnMouseUp?: boolean
): unknown {
  const isMultiSelectEnabled =
    (selfVar.owner && asDropdownComboBox(selfVar.owner).m_enableMultiSelect) || false
  if (isOnMouseUp) {
    if (isMultiSelectEnabled) {
      return false
    }
    return control.closeOnSelect
  } else {
    return (!isMultiSelectEnabled && !control.closeOnSelect) || false
  }
}

function onMouseEnter(
  this: void,
  control: DropdownRowControl,
  data: unknown,
  hasSubmenu: boolean
): DropdownObject {
  const dropdown = asDropdownObject(control.m_dropdownObject)
  if (libDebug.doDebug) {
    dlog(libDebug.LSM_LOGTYPE_VERBOSE, 49, tos(getControlName(control)), tos(hasSubmenu))
  }
  lib.FireCallbacks("EntryOnMouseEnter", control, data)
  dropdown.Narrate("OnEntryMouseEnter", control, data, hasSubmenu)
  if (libDebug.doDebug) {
    dlog(libDebug.LSM_LOGTYPE_DEBUG_CALLBACK, 50, tos(getControlName(control)), tos(hasSubmenu))
  }

  return dropdown
}

function onMouseExit(
  this: void,
  control: DropdownRowControl,
  data: unknown,
  hasSubmenu: boolean
): DropdownObject {
  const dropdown = asDropdownObject(control.m_dropdownObject)
  if (libDebug.doDebug) {
    dlog(libDebug.LSM_LOGTYPE_VERBOSE, 51, tos(getControlName(control)), tos(hasSubmenu))
  }
  lib.FireCallbacks("EntryOnMouseExit", control, data)
  dropdown.Narrate("OnEntryMouseExit", control, data, hasSubmenu)
  if (libDebug.doDebug) {
    dlog(libDebug.LSM_LOGTYPE_DEBUG_CALLBACK, 52, tos(getControlName(control)), tos(hasSubmenu))
  }

  return dropdown
}

function onMouseUp(
  this: void,
  control: DropdownRowControl,
  data: Record<string, unknown>,
  hasSubmenu: boolean
): DropdownObject {
  const dropdown = asDropdownObject(control.m_dropdownObject)

  lib.FireCallbacks("OnEntrySelected", control, data)
  dropdown.Narrate("OnEntrySelected", control, data, hasSubmenu)

  hideTooltip(control)

  const onMouseUpMenuRefreshResult = dropdown.SubmenuOrCurrentListRefresh(control)

  dropdownClassPrivate.checkIfEntryRaisesAutomaticUpdate(
    dropdown.m_comboBox,
    control,
    data,
    dropdownClassPrivate.checkFuncOnMouseUpRunHandler_NoCurrentMenuUpdate,
    onMouseUpMenuRefreshResult,
    control
  )
  return dropdown
}

type HandlerFn = (
  this: void,
  selfVar: DropdownObject,
  control: DropdownRowControl,
  data: Record<string, unknown>,
  ...rest: unknown[]
) => unknown
const HANDLER_FUNCTIONS: Record<string, Record<number, HandlerFn>> = {
  onMouseEnter: {
    [LSM_ENTRY_TYPE_NORMAL]: function (
      this: void,
      selfVar: DropdownObject,
      control: DropdownRowControl,
      data: Record<string, unknown>
    ): unknown {
      onMouseEnter(control, data, NO_SUBMENU)
      doOnMouseEnterNestedSubmenuChecks(selfVar, control, data)
      return checkForMultiSelectEnabled(selfVar, control)
    },
    [LSM_ENTRY_TYPE_HEADER]: function (
      this: void,
      _selfVar: DropdownObject,
      _control: DropdownRowControl
    ): unknown {
      return true
    },
    [LSM_ENTRY_TYPE_DIVIDER]: function (
      this: void,
      _selfVar: DropdownObject,
      _control: DropdownRowControl
    ): unknown {
      return true
    },
    [LSM_ENTRY_TYPE_SUBMENU]: function (
      this: void,
      selfVar: DropdownObject,
      control: DropdownRowControl,
      data: Record<string, unknown>
    ): unknown {
      const dropdown = onMouseEnter(control, data, HAS_SUBMENU)
      clearTimeout()
      doSubmenuOnMouseEnterNestedSubmenuChecks(selfVar, control, data)
      dropdown.ShowSubmenu(control)
      return false
    },
    [LSM_ENTRY_TYPE_CHECKBOX]: function (
      this: void,
      _selfVar: DropdownObject,
      control: DropdownRowControl,
      data: Record<string, unknown>
    ): unknown {
      onMouseEnter(control, data, NO_SUBMENU)
      return false
    },
    [LSM_ENTRY_TYPE_BUTTON]: function (
      this: void,
      _selfVar: DropdownObject,
      control: DropdownRowControl,
      data: Record<string, unknown>
    ): unknown {
      onMouseEnter(control, data, NO_SUBMENU)
      return false
    },
    [LSM_ENTRY_TYPE_RADIOBUTTON]: function (
      this: void,
      _selfVar: DropdownObject,
      control: DropdownRowControl,
      data: Record<string, unknown>
    ): unknown {
      onMouseEnter(control, data, NO_SUBMENU)
      return false
    },
    [LSM_ENTRY_TYPE_EDITBOX]: function (
      this: void,
      _selfVar: DropdownObject,
      control: DropdownRowControl,
      data: Record<string, unknown>
    ): unknown {
      onMouseEnter(control, data, NO_SUBMENU)
      return false
    },
    [LSM_ENTRY_TYPE_SLIDER]: function (
      this: void,
      _selfVar: DropdownObject,
      control: DropdownRowControl,
      data: Record<string, unknown>
    ): unknown {
      onMouseEnter(control, data, NO_SUBMENU)
      return false
    },
  },

  onMouseExit: {
    [LSM_ENTRY_TYPE_NORMAL]: function (
      this: void,
      selfVar: DropdownObject,
      control: DropdownRowControl,
      data: Record<string, unknown>
    ): unknown {
      onMouseExit(control, data, NO_SUBMENU)
      return checkForMultiSelectEnabled(selfVar, control)
    },
    [LSM_ENTRY_TYPE_HEADER]: function (
      this: void,
      _selfVar: DropdownObject,
      _control: DropdownRowControl
    ): unknown {
      return true
    },
    [LSM_ENTRY_TYPE_DIVIDER]: function (
      this: void,
      _selfVar: DropdownObject,
      _control: DropdownRowControl
    ): unknown {
      return true
    },
    [LSM_ENTRY_TYPE_SUBMENU]: function (
      this: void,
      _selfVar: DropdownObject,
      control: DropdownRowControl,
      data: Record<string, unknown>
    ): unknown {
      const dropdown = onMouseExit(control, data, HAS_SUBMENU)
      if (!(MouseIsOver(asControl(control)) || dropdown.IsEnteringSubmenu())) {
        dropdown.OnMouseExitTimeout(control)
      }
      return false
    },
    [LSM_ENTRY_TYPE_CHECKBOX]: function (
      this: void,
      _selfVar: DropdownObject,
      control: DropdownRowControl,
      data: Record<string, unknown>
    ): unknown {
      onMouseExit(control, data, NO_SUBMENU)
      return false
    },
    [LSM_ENTRY_TYPE_BUTTON]: function (
      this: void,
      _selfVar: DropdownObject,
      control: DropdownRowControl,
      data: Record<string, unknown>
    ): unknown {
      onMouseExit(control, data, NO_SUBMENU)
      return false
    },
    [LSM_ENTRY_TYPE_RADIOBUTTON]: function (
      this: void,
      _selfVar: DropdownObject,
      control: DropdownRowControl,
      data: Record<string, unknown>
    ): unknown {
      onMouseExit(control, data, NO_SUBMENU)
      return false
    },
    [LSM_ENTRY_TYPE_EDITBOX]: function (
      this: void,
      _selfVar: DropdownObject,
      _control: DropdownRowControl
    ): unknown {
      return false
    },
    [LSM_ENTRY_TYPE_SLIDER]: function (
      this: void,
      _selfVar: DropdownObject,
      _control: DropdownRowControl
    ): unknown {
      return false
    },
  },

  onMouseUp: {
    [LSM_ENTRY_TYPE_NORMAL]: function (
      this: void,
      _selfVar: DropdownObject,
      control: DropdownRowControl,
      data: Record<string, unknown>
    ): unknown {
      onMouseUp(control, data, NO_SUBMENU)
      return true
    },
    [LSM_ENTRY_TYPE_HEADER]: function (
      this: void,
      _selfVar: DropdownObject,
      _control: DropdownRowControl
    ): unknown {
      return false
    },
    [LSM_ENTRY_TYPE_DIVIDER]: function (
      this: void,
      _selfVar: DropdownObject,
      _control: DropdownRowControl
    ): unknown {
      return false
    },
    [LSM_ENTRY_TYPE_SUBMENU]: function (
      this: void,
      selfVar: DropdownObject,
      control: DropdownRowControl,
      data: Record<string, unknown>
    ): unknown {
      onMouseUp(control, data, HAS_SUBMENU)
      return checkForMultiSelectEnabled(selfVar, control, true)
    },
    [LSM_ENTRY_TYPE_CHECKBOX]: function (
      this: void,
      _selfVar: DropdownObject,
      control: DropdownRowControl,
      data: Record<string, unknown>
    ): unknown {
      onMouseUp(control, data, NO_SUBMENU)
      return false
    },
    [LSM_ENTRY_TYPE_BUTTON]: function (
      this: void,
      _selfVar: DropdownObject,
      control: DropdownRowControl,
      data: Record<string, unknown>
    ): unknown {
      onMouseUp(control, data, NO_SUBMENU)
      return false
    },
    [LSM_ENTRY_TYPE_RADIOBUTTON]: function (
      this: void,
      _selfVar: DropdownObject,
      control: DropdownRowControl,
      data: Record<string, unknown>
    ): unknown {
      onMouseUp(control, data, NO_SUBMENU)
      return false
    },
    [LSM_ENTRY_TYPE_EDITBOX]: function (
      this: void,
      _selfVar: DropdownObject,
      control: DropdownRowControl,
      data: Record<string, unknown>
    ): unknown {
      onMouseUp(control, data, NO_SUBMENU)
      return false
    },
    [LSM_ENTRY_TYPE_SLIDER]: function (
      this: void,
      _selfVar: DropdownObject,
      control: DropdownRowControl,
      data: Record<string, unknown>
    ): unknown {
      onMouseUp(control, data, NO_SUBMENU)
      return false
    },
  },
}
dropdownClassPrivate.handlerFunctions =
  asLsmCastDropdownClassPrivateHandlerFunctions(HANDLER_FUNCTIONS)
