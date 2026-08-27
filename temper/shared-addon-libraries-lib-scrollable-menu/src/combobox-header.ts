import { asBoolean, asControl } from "./casts-1a"
import { asLsmCastRecordStringLsmHeaderHostControlUndefined } from "./casts-2b"
import { asLsmCastThisVoidArgsUnknownUndefined, asLsmCastThisVoidControlUnknownAlternativeControlUnknow } from "./casts-3a"
import { asLsmCastThisVoidLogTypeNumberMsgIdNumberArgsUnknownUnd } from "./casts-3b"
import {
  asLsmCastThisVoidSelfUnknownLuaMultiReturnLsmHeaderCont,
  asLsmCastThisVoidSvNameStringKeyUnknownUnknown,
  asLsmCastThisVoidSvNameStringValueUnknownKeyUnknownUnde,
  asLsmDropdownHeaderHost,
  asLsmHeaderToggleButton,
} from "./casts-4"

import { comboBoxClass } from "./combobox-options"
import { getValueOrCallback } from "./constants-core"
import { lib } from "./lib-state"

const libDebug = lib.Debug
const dlog = asLsmCastThisVoidLogTypeNumberMsgIdNumberArgsUnknownUnd(libDebug.DebugLog)

const libUtil = lib.Util
const getSavedVariable = asLsmCastThisVoidSvNameStringKeyUnknownUnknown(libUtil.getSavedVariable)
const updateSavedVariable = asLsmCastThisVoidSvNameStringValueUnknownKeyUnknownUnde(
  libUtil.updateSavedVariable
)
const getControlName = asLsmCastThisVoidControlUnknownAlternativeControlUnknow(
  libUtil.getControlName
)
const getHeaderControl = asLsmCastThisVoidSelfUnknownLuaMultiReturnLsmHeaderCont(
  libUtil.getHeaderControl
)
const refreshDropdownHeader = asLsmCastThisVoidArgsUnknownUndefined(libUtil.refreshDropdownHeader)

const tos = tostring

const headerToggleControlTypesSaveTheParent: Record<number, boolean> = {
  [CT_SCROLL]: true,
}
function getHeaderToggleStateControlSavedVariableName(
  this: void,
  selfVar: ComboBoxObject
): string | undefined {
  const openingControlOrComboBoxName = selfVar.GetUniqueName()
  if (openingControlOrComboBoxName !== undefined) {
    const _G2 = asLsmCastRecordStringLsmHeaderHostControlUndefined(_G)
    const openingControlOrComboBoxCtrl = _G2[openingControlOrComboBoxName]
    const parentCtrl = openingControlOrComboBoxCtrl?.GetParent() || undefined
    if (parentCtrl?.GetType && headerToggleControlTypesSaveTheParent[parentCtrl.GetType()]) {
      return getControlName(parentCtrl)
    }
  }
  return openingControlOrComboBoxName
}

comboBoxClass.SetupDropdownHeader = function (this: ComboBoxObject): undefined {
  const dropdownControl = asLsmDropdownHeaderHost(this.m_dropdownObject.control)
  ApplyTemplateToControl(
    asControl(dropdownControl),
    "LibScrollableMenu_Dropdown_Template_WithHeader"
  )

  const options = this.GetOptions()
  if (options.headerCollapsible) {
    let headerCollapsed = options?.headerCollapsed
    if (headerCollapsed === undefined) {
      headerCollapsed = getSavedVariable(
        "collapsedHeaderState",
        getHeaderToggleStateControlSavedVariableName(this)
      )
    }
    if (headerCollapsed !== undefined) {
      if (dropdownControl.toggleButton) {
        ZO_CheckButton_SetCheckState(dropdownControl.toggleButton, asBoolean(headerCollapsed))
      }
    }
  }
}

const allowedHeaderCollapsedValues = new LuaTable<boolean, boolean>()
allowedHeaderCollapsedValues.set(false, true)
allowedHeaderCollapsedValues.set(true, true)
comboBoxClass.UpdateDropdownHeader = function (
  this: ComboBoxObject,
  toggleButtonCtrl?: LsmHeaderToggleButton,
  toggleFuncUsed?: unknown
): undefined {
  if (libDebug.doDebug) {
    dlog(
      libDebug.LSM_LOGTYPE_VERBOSE,
      139,
      tos(this.options),
      tos(toggleButtonCtrl),
      tos(toggleFuncUsed)
    )
  }

  const [headerControl, dropdownControl] = getHeaderControl(this)
  if (headerControl === undefined) {
    return
  }

  let headerCollapsed: boolean = false

  const options = this.GetOptions()
  if (options.headerCollapsible) {
    const dropdownCtrl = asLsmDropdownHeaderHost(dropdownControl)
    toggleButtonCtrl = toggleButtonCtrl || dropdownCtrl.toggleButton
    if (toggleButtonCtrl) {
      headerCollapsed = ZO_CheckButton_IsChecked(toggleButtonCtrl)

      if (options.headerCollapsed === undefined) {
        updateSavedVariable(
          "collapsedHeaderState",
          headerCollapsed,
          getHeaderToggleStateControlSavedVariableName(this)
        )
      } else {
        if (!toggleFuncUsed) {
          headerCollapsed = asBoolean(getValueOrCallback(options.headerCollapsed, options))
          if (headerCollapsed === undefined || !allowedHeaderCollapsedValues.get(headerCollapsed)) {
            headerCollapsed = true
          }
          ZO_CheckButton_SetCheckState(
            asLsmHeaderToggleButton(dropdownCtrl.toggleButton),
            headerCollapsed
          )
        }
      }
    }
  }

  refreshDropdownHeader(this, headerControl, headerCollapsed)
  this.UpdateWidth(asControl(dropdownControl))
  this.UpdateHeight(asControl(dropdownControl))
}

export { comboBoxClass }
