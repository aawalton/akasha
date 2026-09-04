import {
  asControl,
  asDropdownClassPrivate,
  asDropdownObject,
  asDropdownRowControl,
} from "../scrollable-menu-casts-1a/scrollable-menu-casts-1a.module.code.ts"
import {
  asLsmCastDropdownClassPrivateDoOnMouseEnterNestedSubmen,
  asLsmCastDropdownClassPrivateDoSubmenuOnMouseEnterNeste,
} from "../scrollable-menu-casts-1b/scrollable-menu-casts-1b.module.code.ts"
import {
  asLsmCastReadonlyUnknown,
  asLsmCastRecordStringUnknown,
} from "../scrollable-menu-casts-2b/scrollable-menu-casts-2b.module.code.ts"
import { asLsmCastThisVoidArgsUnknownUndefined } from "../scrollable-menu-casts-3a/scrollable-menu-casts-3a.module.code.ts"
import {
  asLsmCastThisVoidControlUnknownAltUnknownString,
  asLsmCastThisVoidControlUnknownRecordStringUnknown,
} from "../scrollable-menu-casts-3b/scrollable-menu-casts-3b.module.code.ts"
import { asLsmCastThisVoidSubentryUnknownComboBoxUnknownBoolean } from "../scrollable-menu-casts-4/scrollable-menu-casts-4.module.code.ts"

import { getValueOrCallback } from "../scrollable-menu-constants-core/scrollable-menu-constants-core.module.code.ts"
import { lib } from "../scrollable-menu-lib-state/scrollable-menu-lib-state.module.code.ts"

const libDebug = lib.Debug
const dlog = asLsmCastThisVoidArgsUnknownUndefined(libDebug.DebugLog)

const tos = tostring

const classes = asLsmCastRecordStringUnknown(lib.classes)

const getControlName = asLsmCastThisVoidControlUnknownAltUnknownString(lib.Util.getControlName)
const getControlData = asLsmCastThisVoidControlUnknownRecordStringUnknown(lib.Util.getControlData)
const getIsNew = asLsmCastThisVoidSubentryUnknownComboBoxUnknownBoolean(lib.Util.getIsNew)

const dropdownClassPrivate = asDropdownClassPrivate(classes.dropdownClassPrivate)

function updateSubmenuNewStatus(this: void, comboBox: unknown, control: unknown): undefined {
  if (libDebug.doDebug) {
    dlog(libDebug.LSM_LOGTYPE_VERBOSE, 31)
  }
  let isNew = false

  const data = getControlData(control)
  const submenuEntries = asLsmCastReadonlyUnknown(getValueOrCallback(data.entries, data) || [])

  for (const [, subentry] of ipairs(submenuEntries)) {
    if (getIsNew(subentry, undefined)) {
      isNew = true
    }
  }

  if (isNew !== data.isNew) {
    data.isNew = isNew

    lib.FireCallbacks("NewStatusUpdated", control, data)
    if (libDebug.doDebug) {
      dlog(libDebug.LSM_LOGTYPE_DEBUG_CALLBACK, 33, tos(getControlName(control)))
    }
  }

  if (!isNew) {
    ZO_ScrollList_RefreshVisible(
      asControl(asDropdownObject(asDropdownRowControl(control).m_dropdownObject).scrollControl)
    )

    const parent = data.m_parentControl
    if (parent) {
      updateSubmenuNewStatus(comboBox, parent)
    }
  }
}

function checkNormalOnMouseEnterTasks(
  this: void,
  selfVar: unknown,
  control: unknown,
  data: Record<string, unknown>
): undefined {
  if (libDebug.doDebug) {
    dlog(libDebug.LSM_LOGTYPE_VERBOSE, 32)
  }

  if (data.isNew) {
    if (data.entries === undefined) {
      data.isNew = false
      lib.FireCallbacks("NewStatusUpdated", control, data)
      if (libDebug.doDebug) {
        dlog(libDebug.LSM_LOGTYPE_DEBUG_CALLBACK, 33, tos(getControlName(control)))
      }

      asDropdownObject(asDropdownRowControl(control).m_dropdownObject).Refresh(data)

      const parent = data.m_parentControl
      if (parent) {
        updateSubmenuNewStatus(selfVar, parent)
      }
    }
  }
}

function doSubmenuOnMouseEnterNestedSubmenuChecks(
  this: void,
  _selfVar: unknown,
  _control: unknown,
  _data: unknown
): undefined {
  if (libDebug.doDebug) {
    dlog(libDebug.LSM_LOGTYPE_VERBOSE, 182)
  }
}
dropdownClassPrivate.doSubmenuOnMouseEnterNestedSubmenuChecks =
  asLsmCastDropdownClassPrivateDoSubmenuOnMouseEnterNeste(doSubmenuOnMouseEnterNestedSubmenuChecks)

function doOnMouseEnterNestedSubmenuChecks(
  this: void,
  selfVar: unknown,
  control: unknown,
  data: Record<string, unknown>
): undefined {
  if (libDebug.doDebug) {
    dlog(libDebug.LSM_LOGTYPE_VERBOSE, 30)
  }
  checkNormalOnMouseEnterTasks(selfVar, control, data)
}
dropdownClassPrivate.doOnMouseEnterNestedSubmenuChecks =
  asLsmCastDropdownClassPrivateDoOnMouseEnterNestedSubmen(doOnMouseEnterNestedSubmenuChecks)
