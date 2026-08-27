import { asComboBoxBaseStatic, asComboBoxClassStatic, asContextMenuObject, asControl, asDropdownRowControl } from "./casts-1a"
import { asLsmCastControlControlLsmComboBoxOptionsUndefinedNumbe } from "./casts-1b"
import { asLsmCastIsOwnedByComboBoxThisVoidSelfUnknownBooleanSet, asLsmCastLsmMocControlUndefined, asLsmCastLuaMetatableSubmenuProxyObject, asLsmCastM_comboBoxComboBoxObject } from "./casts-2a"
import { asLsmCastNumberUndefined, asLsmCastRecordStringBoolean, asLsmCastRecordStringUnknown } from "./casts-2b"
import { asLsmCastThisVoidArgsUnknownUnknown, asLsmCastThisVoidArgUnknownArgsUnknownUnknown, asLsmCastThisVoidComboBoxUnknownRestUnknownUnknown, asLsmCastThisVoidContextMenuObjectUndefined, asLsmCastThisVoidControlUnknownAlternativeControlUnknow } from "./casts-3a"
import { asLsmCastThisVoidControlUnknownRecordStringUnknown, asLsmCastThisVoidLogTypeNumberMsgIdNumberArgsUnknownUnd } from "./casts-3b"
import {
  asLsmCastThisVoidSelfUnknownControlUnknownUndefined,
  asLsmCastThisVoidUndefined,
  asNumber,
  asSubmenuClass,
  asSubmenuObject,
  asSubmenuProxyObject,
} from "./casts-4"

import { getContextMenu, lib } from "./lib-state"

const libDebug = lib.Debug
const dlog = asLsmCastThisVoidLogTypeNumberMsgIdNumberArgsUnknownUnd(libDebug.DebugLog)

const tos = tostring

const classes = asLsmCastRecordStringUnknown(lib.classes)
const comboBox_base = asComboBoxBaseStatic(classes.comboboxBaseClass)
const comboBoxClass = asComboBoxClassStatic(classes.comboBoxClass)

const constants = lib.constants
const dropdownConstants = asLsmCastRecordStringUnknown(constants.dropdown)
const submenuConstants = asLsmCastRecordStringUnknown(constants.submenu)
const dropdownDefaults = asLsmCastRecordStringUnknown(dropdownConstants.defaults)

const submenuClass_exposedVariables = asLsmCastRecordStringBoolean(
  submenuConstants.submenuClass_exposedVariables
)
const submenuClass_exposedFunctions = asLsmCastRecordStringBoolean(
  submenuConstants.submenuClass_exposedFunctions
)

const libUtil = lib.Util
const getControlName = asLsmCastThisVoidControlUnknownAlternativeControlUnknow(
  libUtil.getControlName
)
const getControlData = asLsmCastThisVoidControlUnknownRecordStringUnknown(libUtil.getControlData)
const getValueOrCallback = asLsmCastThisVoidArgUnknownArgsUnknownUnknown(libUtil.getValueOrCallback)
const SubOrContextMenu_highlightControl = asLsmCastThisVoidSelfUnknownControlUnknownUndefined(
  libUtil.SubOrContextMenu_highlightControl
)
const checkIfHiddenForReasons = asLsmCastThisVoidArgsUnknownUnknown(libUtil.checkIfHiddenForReasons)
const getContextMenuReference = asLsmCastThisVoidContextMenuObjectUndefined(
  libUtil.getContextMenuReference
)

const submenuClass = asSubmenuClass(classes.submenuClass)

submenuClass.New = function (this: SubmenuClass, ...args: unknown[]): SubmenuObject {
  const newObject = setmetatable(
    asSubmenuProxyObject({}),
    asLsmCastLuaMetatableSubmenuProxyObject({
      __index: function (this: SubmenuProxyObject, key: string): unknown {
        if (submenuClass_exposedVariables[key]) {
          const value = asLsmCastRecordStringUnknown(this.m_comboBox)[key]
          if (value !== undefined) {
            return value
          }
        }

        const value = asLsmCastRecordStringUnknown(submenuClass)[key]
        if (value) {
          if (submenuClass_exposedFunctions[key]) {
            return function (
              this: void,
              proxySelf: SubmenuProxyObject,
              ...rest: unknown[]
            ): unknown {
              return asLsmCastThisVoidComboBoxUnknownRestUnknownUnknown(value)(
                proxySelf.m_comboBox,
                ...rest
              )
            }
          }

          return value
        }
        return undefined
      },
    })
  )

  newObject.__parentClasses = [this]
  asSubmenuObject(newObject).Initialize(
    ...asLsmCastControlControlLsmComboBoxOptionsUndefinedNumbe(args)
  )
  return asSubmenuObject(newObject)
}

submenuClass.Initialize = function (
  this: SubmenuObject,
  parent: Control,
  comboBoxContainer: Control,
  options: LsmComboBoxOptions | undefined,
  depth: number
): undefined {
  if (libDebug.doDebug) {
    dlog(
      libDebug.LSM_LOGTYPE_VERBOSE,
      140,
      tos(getControlName(parent)),
      tos(getControlName(comboBoxContainer)),
      tos(depth)
    )
  }
  const container = asLsmCastM_comboBoxComboBoxObject(comboBoxContainer)
  this.m_comboBox = container.m_comboBox
  this.isSubmenu = true
  this.m_parentMenu = parent

  comboBox_base.Initialize(this, parent, comboBoxContainer, options, depth, undefined)
  this.breadcrumbName = "SubmenuBreadcrumb"
}

submenuClass.UpdateOptions = function (
  this: SubmenuObject,
  options?: LsmComboBoxOptions,
  onInit?: unknown
): undefined {
  if (libDebug.doDebug) {
    dlog(libDebug.LSM_LOGTYPE_VERBOSE, 141, tos(options), tos(onInit))
  }

  this.AddCustomEntryTemplates(this.GetOptions())
}

submenuClass.AddMenuItems = function (this: SubmenuObject, parentControl: Control): undefined {
  if (libDebug.doDebug) {
    dlog(libDebug.LSM_LOGTYPE_VERBOSE, 142, tos(getControlName(parentControl)))
  }
  this.openingControl = parentControl
  this.RefreshSortedItems(parentControl)
  this.UpdateWidth()
  this.UpdateHeight()
  this.m_dropdownObject.AnchorToControl(asDropdownRowControl(parentControl))
}

submenuClass.GetEntries = function (this: SubmenuObject): unknown {
  const data = getControlData(this.openingControl)

  const entries = getValueOrCallback(data.entries, data)
  return entries
}

submenuClass.GetMaxRows = function (this: SubmenuObject): number {
  if (libDebug.doDebug) {
    dlog(
      libDebug.LSM_LOGTYPE_VERBOSE,
      143,
      tos(this.visibleRowsSubmenu ?? dropdownDefaults.DEFAULT_VISIBLE_ROWS)
    )
  }
  return (
    asLsmCastNumberUndefined(this.visibleRowsSubmenu) ??
    asNumber(dropdownDefaults.DEFAULT_VISIBLE_ROWS)
  )
}

submenuClass.GetMenuPrefix = function (this: SubmenuObject): string {
  if (libDebug.doDebug) {
    dlog(libDebug.LSM_LOGTYPE_VERBOSE, 144)
  }
  return "SubMenu"
}

submenuClass.ShowDropdownInternal = function (this: SubmenuObject): undefined {
  if (this.openingControl) {
    SubOrContextMenu_highlightControl(this, this.openingControl)
  }
}

submenuClass.HideDropdownInternal = function (this: SubmenuObject): undefined {
  if (libDebug.doDebug) {
    dlog(libDebug.LSM_LOGTYPE_VERBOSE, 145)
  }

  const dropdownObject = asLsmCastIsOwnedByComboBoxThisVoidSelfUnknownBooleanSet(
    this.m_dropdownObject
  )
  if (dropdownObject.IsOwnedByComboBox(this)) {
    dropdownObject.SetHidden(true)
  }
  this.SetVisible(false)
  if (this.onHideDropdownCallback) {
    if (libDebug.doDebug) {
      dlog(libDebug.LSM_LOGTYPE_VERBOSE, 146)
    }
    asLsmCastThisVoidUndefined(this.onHideDropdownCallback)()
  }
}

submenuClass.HideDropdown = function (this: SubmenuObject): boolean {
  return comboBox_base.HideDropdown(this)
}

submenuClass.HideOnMouseExit = function (
  this: SubmenuObject,
  mocCtrl?: LsmMocControl
): boolean | undefined {
  mocCtrl = mocCtrl || asLsmCastLsmMocControlUndefined(moc())
  if (libDebug.doDebug) {
    dlog(libDebug.LSM_LOGTYPE_VERBOSE, 147, tos(getControlName(mocCtrl)))
  }
  if (mocCtrl?.m_dropdownObject) {
    if (comboBoxClass.HideOnMouseExit(this)) {
      if (this.ShouldHideDropdown()) {
        return this.HideDropdown()
      }
    }
  }
  return undefined
}

submenuClass.ShouldHideDropdown = function (this: SubmenuObject): boolean {
  let isMouseOverAnyRelevantControl = false
  let g_contextMenu = getContextMenu()
  g_contextMenu = g_contextMenu || getContextMenuReference()
  const ctxMenu = asContextMenuObject(g_contextMenu)
  if (ctxMenu.IsDropdownVisible() && ctxMenu.m_container === this.m_container) {
    isMouseOverAnyRelevantControl = this.IsMouseOverControl() || this.IsMouseOverOpeningControl()
  } else {
    isMouseOverAnyRelevantControl = this.IsMouseOverControl() || this.IsMouseOverOpeningControl()
  }
  return this.IsDropdownVisible() && isMouseOverAnyRelevantControl === false
}

submenuClass.IsMouseOverOpeningControl = function (this: SubmenuObject): boolean {
  return MouseIsOver(asControl(this.openingControl))
}

submenuClass.GetHiddenForReasons = function (
  this: SubmenuObject,
  button: number
): (
  this: void,
  owningWindow: unknown,
  mocCtrl: unknown,
  comboBox: unknown,
  entry: unknown
) => unknown {
  if (libDebug.doDebug) {
    dlog(libDebug.LSM_LOGTYPE_VERBOSE, 148, tos(button))
  }
  const selfVar = this
  return function (
    this: void,
    owningWindow: unknown,
    mocCtrl: unknown,
    comboBox: unknown,
    entry: unknown
  ): unknown {
    return checkIfHiddenForReasons(
      selfVar,
      button,
      false,
      owningWindow,
      mocCtrl,
      comboBox,
      entry,
      true
    )
  }
}

export { submenuClass }
