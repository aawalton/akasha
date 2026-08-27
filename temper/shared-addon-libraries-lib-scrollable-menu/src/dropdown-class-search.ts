import { asDropdownClass, asDropdownClassPrivate, asDropdownComboBox } from "./casts-1a"
import { asLsmCastContextMenuObjectContextMenuIssuingControlUnkn, asLsmCastDropdownComboBoxM_dropdownObjectIsOwnedByCombo, asLsmCastEntryTypeNumberKeyStringUnknown } from "./casts-1b"
import { asLsmCastIsContextMenuBooleanUndefined } from "./casts-2a"
import { asLsmCastRecordNumberUnknown, asLsmCastRecordStringUnknown } from "./casts-2b"
import { asLsmCastRunItemCallbackThisUnknownItemUnknownIgnoreCal, asLsmCastRunSpecialCallbackThisUnknownCallbackNameStrin, asLsmCastSelectItemByIndexThisUnknownIndexNumberIgnoreC, asLsmCastThisVoidArgsUnknownUndefined, asLsmCastThisVoidBoolean, asLsmCastThisVoidComboBoxUnknownControlUnknownDataUnkno, asLsmCastThisVoidContextMenuObject } from "./casts-3a"
import { asLsmCastThisVoidControlUnknownAltUnknownString, asLsmCastThisVoidControlUnknownComboBoxUnknownButtonUnk, asLsmCastThisVoidControlUnknownRecordStringUnknown, asLsmCastThisVoidFnThisVoidUndefinedDelayNumberSuffixSt } from "./casts-3b"
import {
  asLsmCastThisVoidSelfUnknownEntryTypeUnknownUndefined,
  asLsmCastUpdateHeightThisUnknownControlUnknownUndefined,
  asLsmCastUpdateWidthThisUnknownControlUnknownUndefined,
  asNumber,
} from "./casts-4"

import { lib, setContextMenu } from "./lib-state"

const libDebug = lib.Debug
const debugPrefix = libDebug.prefix
const dlog = asLsmCastThisVoidArgsUnknownUndefined(libDebug.DebugLog)

const tos = tostring

const getControlName = asLsmCastThisVoidControlUnknownAltUnknownString(lib.Util.getControlName)
const getControlData = asLsmCastThisVoidControlUnknownRecordStringUnknown(lib.Util.getControlData)
const getContextMenuReference = asLsmCastThisVoidContextMenuObject(lib.Util.getContextMenuReference)
const playSelectedSoundCheck = asLsmCastThisVoidSelfUnknownEntryTypeUnknownUndefined(
  lib.Util.playSelectedSoundCheck
)
const throttledCall = asLsmCastThisVoidFnThisVoidUndefinedDelayNumberSuffixSt(
  lib.Util.throttledCall
)
const checkIfContextMenuOpenedButOtherControlWasClicked =
  asLsmCastThisVoidControlUnknownComboBoxUnknownButtonUnk(
    lib.Util.checkIfContextMenuOpenedButOtherControlWasClicked
  )
const checkNextOnEntryMouseUpShouldExecute = asLsmCastThisVoidBoolean(
  lib.Util.checkNextOnEntryMouseUpShouldExecute
)

const classes = asLsmCastRecordStringUnknown(lib.classes)
const dropdownClassPrivate = asDropdownClassPrivate(classes.dropdownClassPrivate)
const dropdownClass = asDropdownClass(classes.dropdownClass)

const onEntryMouseUpExcludeEntryTypes = dropdownClassPrivate.onEntryMouseUpExcludeEntryTypes
const runHandler = dropdownClassPrivate.runHandler
const handlerFunctions = dropdownClassPrivate.handlerFunctions

asLsmCastRecordStringUnknown(dropdownClass).OnEntryMouseUp = function (
  this: DropdownObject,
  control: DropdownRowControl,
  button: number,
  upInside: boolean,
  ignoreHandler?: unknown,
  ctrl?: unknown,
  alt?: unknown,
  shift?: unknown,
  lsmEntryType?: number
): undefined {
  if (libDebug.doDebug) {
    dlog(libDebug.LSM_LOGTYPE_VERBOSE, 71, tos(getControlName(control)), tos(button), tos(upInside))
  }
  lib.preventerVars.suppressNextOnGlobalMouseUp = undefined
  lib.preventerVars.suppressNextOnEntryMouseUp = undefined
  lib.preventerVars.suppressNextHideContextMenuClearItems = undefined

  if (upInside) {
    const data = getControlData(control)
    const comboBox = asLsmCastDropdownComboBoxM_dropdownObjectIsOwnedByCombo(control.m_owner)
    if (data.enabled) {
      if (button === MOUSE_BUTTON_INDEX_LEFT) {
        if (onEntryMouseUpExcludeEntryTypes[asNumber(lsmEntryType)] === true) {
          return
        }

        if (checkIfContextMenuOpenedButOtherControlWasClicked(control, comboBox, button) === true) {
          lib.preventerVars.suppressNextOnGlobalMouseUp = true
          return
        }

        const isMultiSelectionEnabledAtParentMenu = comboBox.m_parentMenu?.m_enableMultiSelect
        const isMultiSelectionEnabled = comboBox.m_enableMultiSelect

        const isSubmenu = comboBox.isSubmenu
        if (isSubmenu) {
          if (isMultiSelectionEnabledAtParentMenu === true && isMultiSelectionEnabled === false) {
            const owner = asDropdownComboBox(this.owner)
            owner.m_enableMultiSelect = true
          }
        }

        if (checkNextOnEntryMouseUpShouldExecute()) {
          if (
            isSubmenu &&
            !isMultiSelectionEnabled &&
            lib.preventerVars.wasContextMenuOpenedAsOnMouseUpWasSuppressed
          ) {
            lib.preventerVars.suppressNextOnGlobalMouseUp = true
          }
          lib.preventerVars.wasContextMenuOpenedAsOnMouseUpWasSuppressed = undefined
          return
        }

        if (
          !ignoreHandler &&
          runHandler(
            this,
            asLsmCastRecordNumberUnknown(handlerFunctions["onMouseUp"]),
            control,
            data,
            button,
            upInside,
            ctrl,
            alt,
            shift
          )
        ) {
          this.OnEntrySelected(control)
        } else {
          this.RunItemCallback(asLsmCastEntryTypeNumberKeyStringUnknown(data), data.ignoreCallback)
        }
      } else if (button === MOUSE_BUTTON_INDEX_RIGHT) {
        const g_contextMenu = asLsmCastContextMenuObjectContextMenuIssuingControlUnkn(
          getContextMenuReference()
        )
        setContextMenu(g_contextMenu)
        g_contextMenu.contextMenuIssuingControl = undefined
        const rightClickCallback =
          asLsmCastThisVoidComboBoxUnknownControlUnknownDataUnkno(data.contextMenuCallback) ??
          asLsmCastThisVoidComboBoxUnknownControlUnknownDataUnkno(data.rightClickCallback)
        if (rightClickCallback && !g_contextMenu.m_dropdownObject.IsOwnedByComboBox(comboBox)) {
          if (libDebug.doDebug) {
            dlog(libDebug.LSM_LOGTYPE_VERBOSE, 72)
          }
          g_contextMenu.contextMenuIssuingControl = control
          rightClickCallback(comboBox, control, data)
        }
      }
    } else {
      if (comboBox.isSubmenu) {
        lib.preventerVars.suppressNextOnGlobalMouseUp = true
      }
    }
  }
}

dropdownClass.SelectItemByIndex = function (
  this: DropdownObject,
  index: number,
  ignoreCallback?: unknown
): unknown {
  if (libDebug.doDebug) {
    dlog(libDebug.LSM_LOGTYPE_VERBOSE, 73, tos(index), tos(ignoreCallback))
  }
  if (this.owner) {
    playSelectedSoundCheck(this, undefined)
    return asLsmCastSelectItemByIndexThisUnknownIndexNumberIgnoreC(this.owner).SelectItemByIndex(
      index,
      ignoreCallback
    )
  }
}

dropdownClass.RunItemCallback = function (
  this: DropdownObject,
  item: { entryType?: number; [key: string]: unknown },
  ignoreCallback?: unknown
): unknown {
  if (libDebug.doDebug) {
    dlog(libDebug.LSM_LOGTYPE_VERBOSE, 74, tos(item), tos(ignoreCallback))
  }
  if (this.owner) {
    playSelectedSoundCheck(this, item.entryType)
    return asLsmCastRunItemCallbackThisUnknownItemUnknownIgnoreCal(this.owner).RunItemCallback(
      item,
      ignoreCallback
    )
  }
}

dropdownClass.UpdateHeight = function (this: DropdownObject): undefined {
  if (libDebug.doDebug) {
    dlog(libDebug.LSM_LOGTYPE_VERBOSE, 77)
  }
  if (this.owner) {
    asLsmCastUpdateHeightThisUnknownControlUnknownUndefined(this.owner).UpdateHeight(this.control)
  }
}

dropdownClass.UpdateWidth = function (this: DropdownObject): undefined {
  if (libDebug.doDebug) {
    dlog(libDebug.LSM_LOGTYPE_VERBOSE, 178)
  }
  if (this.owner) {
    asLsmCastUpdateWidthThisUnknownControlUnknownUndefined(this.owner).UpdateWidth(this.control)
  }
}

dropdownClass.OnShow = function (this: DropdownObject, formattedEventName?: string): undefined {
  if (libDebug.doDebug) {
    dlog(libDebug.LSM_LOGTYPE_VERBOSE, 78)
  }

  if (formattedEventName !== undefined) {
    const anchorRight = this.anchorRight ? "Right" : "Left"
    const ctrl = this.control
    lib.FireCallbacks(formattedEventName, ctrl, this)

    const self = this
    throttledCall(
      function (this: void): undefined {
        self.Narrate(formattedEventName, ctrl, undefined, undefined, anchorRight)
      },
      100,
      "_DropdownClassOnShow"
    )
  }
}

dropdownClass.OnHide = function (this: DropdownObject, formattedEventName?: string): undefined {
  if (libDebug.doDebug) {
    dlog(libDebug.LSM_LOGTYPE_VERBOSE, 79)
  }

  const comboBox = asLsmCastIsContextMenuBooleanUndefined(this.m_comboBox)
  const isContextMenu = comboBox?.isContextMenu || false
  if (isContextMenu === true) {
    const owner = asLsmCastRunSpecialCallbackThisUnknownCallbackNameStrin(this.owner)
    if (owner?.RunSpecialCallback) {
      owner.RunSpecialCallback("onHideCallback")
    }
  }

  if (formattedEventName !== undefined) {
    const ctrl = this.control
    lib.FireCallbacks(formattedEventName, ctrl, this)
    this.Narrate(formattedEventName, ctrl)
  }
}

dropdownClass.XMLHandler = function (
  this: DropdownObject,
  selfVar: unknown,
  handlerName: string
): undefined {
  if (selfVar === undefined || handlerName === undefined) {
    return
  }

  if (handlerName === "OnEffectivelyHidden") {
    this.HideDropdown()
  } else if (handlerName === "OnMouseEnter") {
    this.OnMouseExitTimeout(selfVar)
  } else if (handlerName === "OnShow") {
    this.OnShow(this.GetFormattedNarrateEvent("Show"))
  } else if (handlerName === "OnHide") {
    this.OnHide(this.GetFormattedNarrateEvent("Hide"))
  }
}
