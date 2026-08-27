import { asControl, asDropdownClass, asDropdownClassPrivate, asDropdownComboBox, asDropdownRowControl } from "./casts-1a"
import { asLsmCastHideDropdownThisUnknownUndefined, asLsmCastIsAutomaticRefreshEnabledThisUnknownLuaMultiRe, asLsmCastIsDropdownVisibleThisUnknownBoolean } from "./casts-2a"
import { asLsmCastRecordStringUnknown } from "./casts-2b"
import { asLsmCastShowSubmenuThisUnknownControlUnknownUndefined, asLsmCastShowThisUnknownUndefined, asLsmCastThisVoidArgsUnknownUndefined } from "./casts-3a"
import { asLsmCastThisVoidControlUnknownAltUnknownString, asLsmCastThisVoidListControlSelectedDataUnknownUndefine } from "./casts-3b"
import {
  asLsmCastThisVoidSelfUnknownControlUnknownDataUnknownHa,
  asLsmCastThisVoidSelfUnknownScrollControlUnknownItemUnk,
} from "./casts-4"

import { lib } from "./lib-state"

const libDebug = lib.Debug
const dlog = asLsmCastThisVoidArgsUnknownUndefined(libDebug.DebugLog)

const tos = tostring

const LSM_normalMenuRefreshDone = 1
const LSM_submenuRefreshDone = 2

const getControlName = asLsmCastThisVoidControlUnknownAltUnknownString(lib.Util.getControlName)
const showTooltip = asLsmCastThisVoidSelfUnknownControlUnknownDataUnknownHa(lib.Util.showTooltip)
const compareDropdownDataList = asLsmCastThisVoidSelfUnknownScrollControlUnknownItemUnk(
  lib.Util.compareDropdownDataList
)

const classes = asLsmCastRecordStringUnknown(lib.classes)
const dropdownClassPrivate = asDropdownClassPrivate(classes.dropdownClassPrivate)
const dropdownClass = asDropdownClass(classes.dropdownClass)

dropdownClass.ShowSubmenu = function (this: DropdownObject, control: unknown): undefined {
  if (libDebug.doDebug) {
    dlog(libDebug.LSM_LOGTYPE_VERBOSE, 80, tos(getControlName(control)))
  }
  if (this.owner) {
    dropdownClassPrivate.clearTimeout()
    asLsmCastShowSubmenuThisUnknownControlUnknownUndefined(this.owner).ShowSubmenu(control)
  }
}

dropdownClass.ShowTooltip = function (
  this: DropdownObject,
  control: unknown,
  data: { hasSubmenu?: unknown; [key: string]: unknown }
): undefined {
  if (libDebug.doDebug) {
    dlog(libDebug.LSM_LOGTYPE_VERBOSE, 81, tos(getControlName(control)), tos(data.hasSubmenu))
  }
  showTooltip(this, control, data, data.hasSubmenu)
}

dropdownClass.HideDropdown = function (this: DropdownObject): undefined {
  if (libDebug.doDebug) {
    dlog(libDebug.LSM_LOGTYPE_VERBOSE, 82)
  }
  if (this.owner) {
    asLsmCastHideDropdownThisUnknownUndefined(this.owner).HideDropdown()
  }
}

dropdownClass.IsAutomaticRefreshEnabled = function (
  this: DropdownObject
): LuaMultiReturn<[unknown, unknown]> {
  if (this.m_comboBox) {
    return asLsmCastIsAutomaticRefreshEnabledThisUnknownLuaMultiRe(
      this.m_comboBox
    ).IsAutomaticRefreshEnabled()
  }
  return $multi(undefined, undefined)
}

dropdownClass.SubmenuOrCurrentListRefresh = function (
  this: DropdownObject,
  control: unknown,
  override?: unknown,
  refreshMainMenuOrSubmenu?: unknown
): unknown {
  override = override || false
  if (libDebug.doDebug) {
    dlog(libDebug.LSM_LOGTYPE_VERBOSE, 192, tos(getControlName(control)))
  }
  const comboBox = this.m_comboBox
  if (!comboBox || !asLsmCastIsDropdownVisibleThisUnknownBoolean(comboBox).IsDropdownVisible()) {
    return
  }

  let [automaticRefresh, automaticSubmenuRefresh] = this.IsAutomaticRefreshEnabled()
  if (override === true) {
    automaticRefresh = true
    automaticSubmenuRefresh = true
  }

  if (
    automaticRefresh === true &&
    (!this.m_parentMenu ||
      (refreshMainMenuOrSubmenu !== undefined && refreshMainMenuOrSubmenu === true))
  ) {
    zo_callLater(function (this: void): undefined {
      asLsmCastShowThisUnknownUndefined(comboBox).Show()
    }, 15)
    dropdownClassPrivate.checkIfContextMenuVisibleAndBringToTopAgain(this, comboBox, 25)
    return LSM_normalMenuRefreshDone
  } else if (
    automaticSubmenuRefresh === true &&
    (this.m_parentMenu !== undefined ||
      (refreshMainMenuOrSubmenu !== undefined && refreshMainMenuOrSubmenu === false))
  ) {
    const owner = (control !== undefined && asDropdownRowControl(control).m_owner) || this.owner
    if (owner !== undefined && asDropdownComboBox(owner).openingControl !== undefined) {
      dropdownClassPrivate.clearTimeout()
      this.ShowSubmenu(asDropdownComboBox(owner).openingControl)
      dropdownClassPrivate.checkIfContextMenuVisibleAndBringToTopAgain(this, comboBox, 10)
      return LSM_submenuRefreshDone
    }
  }
  return false
}

dropdownClass.Refresh = function (
  this: DropdownObject,
  item?: { m_owner?: { m_scroll?: Control }; [key: string]: unknown }
): undefined {
  let entryData: unknown
  let scrollControl: Control | undefined = asControl(this.scrollControl)

  if (item) {
    scrollControl = item.m_owner?.m_scroll || undefined
    if (scrollControl !== undefined) {
      entryData = compareDropdownDataList(this, scrollControl, item)
    }

    if (entryData === undefined) {
      scrollControl = asControl(this.scrollControl)
      entryData = compareDropdownDataList(this, scrollControl, item)
    }
  }
  const refreshVisible = asLsmCastThisVoidListControlSelectedDataUnknownUndefine(
    ZO_ScrollList_RefreshVisible
  )
  refreshVisible(asControl(scrollControl), entryData)
}
