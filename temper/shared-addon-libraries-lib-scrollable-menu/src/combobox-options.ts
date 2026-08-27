import { asLsmCastNumberNumber, asLsmCastRecordStringRecordStringRecordStringUnknown, asLsmCastRecordStringRecordStringUnknown, asLsmCastRecordStringString, asLsmCastRecordStringUnknown, asLsmCastRecordStringUnknownUndefined } from "./casts-2b"
import { asLsmCastSetHiddenThisUnknownHiddenBooleanUndefined } from "./casts-3a"
import { asLsmCastThisVoidLogTypeNumberMsgIdNumberArgsUnknownUnd, asLsmCastThisVoidObjectUnknownMixinsUnknownUndefined } from "./casts-3b"
import {
  asLsmCastThisVoidSelfComboBoxObjectNewValueUnknownUndef,
  asLsmCastThisVoidSelfComboBoxObjectUndefined,
  asLsmComboBoxOptions,
  asLsmEventContainer,
  asObject,
} from "./casts-4"

import { comboBoxClass } from "./combobox"
import { getValueOrCallback } from "./constants-core"
import { lib } from "./lib-state"

const libDebug = lib.Debug
const dlog = asLsmCastThisVoidLogTypeNumberMsgIdNumberArgsUnknownUnd(libDebug.DebugLog)

const constants = lib.constants
const comboBoxConstants = asLsmCastRecordStringUnknown(constants.comboBox)
const comboBoxMappingConstants = asLsmCastRecordStringUnknown(comboBoxConstants.mapping)
const comboBoxDefaults = asLsmCastRecordStringUnknown(comboBoxConstants.defaults)
const comboBoxDefaultsContextualInitValues = asLsmCastRecordStringUnknown(
  comboBoxConstants.defaultsContextualInitValues
)

const LSMOptionsKeyToZO_ComboBoxOptionsKey = asLsmCastRecordStringString(
  comboBoxMappingConstants.LSMOptionsKeyToZO_ComboBoxOptionsKey
)
const LSMOptionsToZO_ComboBoxOptionsCallbacks = asLsmCastRecordStringUnknown(
  comboBoxMappingConstants.LSMOptionsToZO_ComboBoxOptionsCallbacks
)

const libUtil = lib.Util
const mixinTableAndSkipExisting = asLsmCastThisVoidObjectUnknownMixinsUnknownUndefined(
  libUtil.mixinTableAndSkipExisting
)

const tos = tostring

comboBoxClass.SetDefaults = function (this: ComboBoxObject): undefined {
  this.defaults = asLsmCastRecordStringUnknown({})
  for (const [k, v] of pairs(comboBoxDefaults)) {
    if (v && asLsmCastRecordStringUnknown(this)[k] !== v) {
      asLsmCastRecordStringUnknown(this.defaults)[k] = v
    }
  }
}

comboBoxClass.ResetToDefaults = function (
  this: ComboBoxObject,
  initExistingComboBox?: unknown
): undefined {
  if (libDebug.doDebug) {
    dlog(libDebug.LSM_LOGTYPE_VERBOSE, 134)
  }
  const defaults = ZO_DeepTableCopy(comboBoxDefaults)
  zo_mixin(defaults, asObject(this.defaults))

  if (initExistingComboBox === true) {
    mixinTableAndSkipExisting(this, defaults, comboBoxDefaultsContextualInitValues, undefined)
  } else {
    zo_mixin(asObject(this), defaults)
  }
  this.SetOptions(undefined)
}

comboBoxClass.SetOption = function (
  this: ComboBoxObject,
  LSMOptionsKey: string,
  doDebugNow?: boolean
): undefined {
  const currentZO_ComboBoxValueKey = LSMOptionsKeyToZO_ComboBoxOptionsKey[LSMOptionsKey]
  if (libDebug.doDebug) {
    dlog(libDebug.LSM_LOGTYPE_VERBOSE, 135, tos(LSMOptionsKey), tos(currentZO_ComboBoxValueKey))
  }
  if (currentZO_ComboBoxValueKey === undefined) {
    return
  }
  const selfRec = asLsmCastRecordStringUnknown(this)
  const currentValue = selfRec[currentZO_ComboBoxValueKey]

  const options = this.GetOptions()
  const LSM_Debug = asLsmCastRecordStringRecordStringRecordStringUnknown(_G.LSM_Debug)
  if (doDebugNow) {
    asLsmCastRecordStringUnknown(LSM_Debug.SetOption)[LSMOptionsKey] = {
      selfBefore: ZO_ShallowTableCopy(this),
      before: ZO_ShallowTableCopy(options),
    }
  }
  let newValue: unknown =
    (options !== undefined && getValueOrCallback(options[LSMOptionsKey], options)) || undefined
  if (doDebugNow) {
    d(">options: " + tos(options) + "; newValue: " + tos(newValue))
  }
  if (newValue === undefined) {
    newValue = currentValue
    if (doDebugNow) {
      d(
        ">LSMOptionsKey: " +
          tos(LSMOptionsKey) +
          " -> Is nil in options. newValue = currentValue: " +
          tos(newValue)
      )
    }
  }
  if (newValue === undefined) {
    return
  }
  asLsmCastRecordStringUnknown(this.updatedOptions)[LSMOptionsKey] = newValue

  const setOptionFuncOrKey = LSMOptionsToZO_ComboBoxOptionsCallbacks[LSMOptionsKey]
  if (type(setOptionFuncOrKey) === "function") {
    asLsmCastThisVoidSelfComboBoxObjectNewValueUnknownUndef(setOptionFuncOrKey)(this, newValue)
  } else {
    selfRec[currentZO_ComboBoxValueKey] = newValue
  }

  if (doDebugNow) {
    const setOptionDump = asLsmCastRecordStringUnknown(
      asLsmCastRecordStringRecordStringUnknown(LSM_Debug.SetOption)[LSMOptionsKey]
    )
    setOptionDump.after = ZO_ShallowTableCopy(options)
    setOptionDump.selfAfter = ZO_ShallowTableCopy(this)
  }
}

comboBoxClass.UpdateOptions = function (
  this: ComboBoxObject,
  options: LsmComboBoxOptions | undefined,
  onInit?: unknown,
  isContextMenu?: unknown,
  initExistingComboBox?: unknown
): undefined {
  onInit = onInit || false
  let optionsChanged = this.optionsChanged

  const doDebugNow = false

  if (libDebug.doDebug) {
    dlog(libDebug.LSM_LOGTYPE_VERBOSE, 136, tos(options), tos(onInit), tos(optionsChanged))
  }
  if (doDebugNow) {
    d("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
    d(
      libDebug.prefix +
        "comboBoxClass:UpdateOptions - options: " +
        tos(options) +
        ", onInit: " +
        tos(onInit) +
        ", isContextMenu: " +
        tos(isContextMenu) +
        ", initExistingComboBox: " +
        tos(initExistingComboBox) +
        ", optionsChanged: " +
        tos(optionsChanged)
    )
  }
  if (onInit === true) {
    if (doDebugNow) {
      d(">1 onInit -> optionsChanged = false")
    }
    optionsChanged = false
  } else {
    optionsChanged = optionsChanged || options !== this.options
    if (doDebugNow) {
      d(">2 optionsChanged: " + tos(optionsChanged))
    }
  }

  const areOptionsEmpty = ZO_IsTableEmpty(asObject(options))
  if (!isContextMenu && (optionsChanged === true || onInit === true) && areOptionsEmpty) {
    optionsChanged = false
    const isInit = (onInit === true && initExistingComboBox) || undefined
    if (doDebugNow) {
      d(">>3 resetting options to defaults! isInit: " + tos(isInit))
    }
    this.ResetToDefaults(isInit)
  } else if (isContextMenu || optionsChanged === true || ZO_IsTableEmpty(asObject(this.options))) {
    optionsChanged = false

    if (areOptionsEmpty && isContextMenu) {
      if (doDebugNow) {
        d(">options are nil - using contextMenu defaults")
      }
      options = asLsmComboBoxOptions(comboBoxDefaults)
    }
    options = options || asLsmComboBoxOptions({})

    if (type(options) !== "table") {
      options = asLsmComboBoxOptions({ visibleRowsDropdown: options })
    }

    if (doDebugNow) {
      d(">4 OptionsChanged or empty self.options -> Setting options to self now: " + tos(options))
    }

    this.SetOptions(options)

    this.updatedOptions = asLsmCastRecordStringUnknown({})

    if (doDebugNow) {
      _G.LSM_Debug = asLsmCastRecordStringUnknownUndefined(_G.LSM_Debug) || {}
      asLsmCastRecordStringUnknown(_G.LSM_Debug)["SetOption"] = {}
    }

    if (!ZO_IsTableEmpty(asObject(options))) {
      for (const [key] of pairs(asLsmCastRecordStringUnknown(options))) {
        if (doDebugNow) {
          d(">>setting option key: " + tos(key))
        }
        this.SetOption(key, doDebugNow)
      }
    }

    this.updatedOptions = undefined

    if (doDebugNow) {
      d("> SetOption and for ... do SetOptions looped - END ")
    }
  }

  this.AddCustomEntryTemplates(options, isContextMenu)
}

comboBoxClass.UpdateResults = function (
  this: ComboBoxObject,
  _comingFromFilters?: unknown
): undefined {
  const submenu = this.m_submenu
  if (submenu?.IsDropdownVisible()) {
    submenu.HideDropdown()
  }
  this.Show()
}

comboBoxClass.ShowDropdown = function (this: ComboBoxObject): undefined {
  if (this.m_preshowDropdownFn) {
    asLsmCastThisVoidSelfComboBoxObjectUndefined(this.m_preshowDropdownFn)(this)
  }

  if (!this.IsDropdownVisible()) {
    this.UpdateDropdownHeader()
  }
  this.ShowDropdownInternal()
}

comboBoxClass.ShowDropdownInternal = function (this: ComboBoxObject): undefined {
  const selfVar = this
  const container = asLsmEventContainer(this.m_container)
  container.RegisterForEvent(
    EVENT_GLOBAL_MOUSE_UP,
    function (this: void, ...args: unknown[]): undefined {
      selfVar.OnGlobalMouseUp(...asLsmCastNumberNumber(args))
    }
  )
}

comboBoxClass.ShowDropdownOnMouseUp = function (this: ComboBoxObject): undefined {
  if (this.IsEnabled()) {
    asLsmCastSetHiddenThisUnknownHiddenBooleanUndefined(this.m_dropdownObject).SetHidden(false)
    this.AddMenuItems()

    this.SetVisible(true)
  } else {
    const container = asLsmEventContainer(this.m_container)
    container.UnregisterForEvent(EVENT_GLOBAL_MOUSE_UP)
  }
}

export { comboBoxClass }
