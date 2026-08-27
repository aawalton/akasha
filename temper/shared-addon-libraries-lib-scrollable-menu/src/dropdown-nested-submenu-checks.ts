import { asControl, asDropdownClassPrivate, asDropdownObject, asDropdownRowControl } from "./casts-1a"
import { asLsmCastDropdownClassPrivateDoOnMouseEnterNestedSubmen, asLsmCastDropdownClassPrivateDoSubmenuOnMouseEnterNeste } from "./casts-1b"
import { asLsmCastReadonlyUnknown, asLsmCastRecordStringUnknown } from "./casts-2b"
import { asLsmCastThisVoidArgsUnknownUndefined } from "./casts-3a"
import { asLsmCastThisVoidControlUnknownAltUnknownString, asLsmCastThisVoidControlUnknownRecordStringUnknown } from "./casts-3b"
import { asLsmCastThisVoidSubentryUnknownComboBoxUnknownBoolean } from "./casts-4"

import { getValueOrCallback } from "./constants-core"
import { lib } from "./lib-state"

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
