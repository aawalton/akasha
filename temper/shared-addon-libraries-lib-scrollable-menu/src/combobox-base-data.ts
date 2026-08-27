import { asLsmCastArgsUnknownUndefined, asLsmCastBringWindowToTopThisUnknownUndefined } from "./casts-1a"
import { asLsmCastNumberUndefined, asLsmCastRecordNumberLsmTemplateData, asLsmCastRecordStringRecordStringUnknown, asLsmCastRecordStringRecordStringUnknownUndefined, asLsmCastRecordStringString, asLsmCastRecordStringUnknown, asLsmCastRecordStringUnknownUndefined, asLsmCastRecordStringUnknownUnknown } from "./casts-2b"
import { asLsmCastStringUndefined } from "./casts-3a"
import { asLsmCastThisVoidDataUnknownUndefined, asLsmCastThisVoidEntryUnknownComboBoxUnknownCallbackFnT, asLsmCastThisVoidIconPathStringWidthNumberStringHeightN, asLsmCastThisVoidItemRecordStringUnknownUndefined, asLsmCastThisVoidItemUnknownComboBoxUnknownUnknown, asLsmCastThisVoidItemUnknownCustomEntryTemplateUnknownU, asLsmCastThisVoidLogTypeNumberMsgIdNumberArgsUnknownUnd, asLsmCastThisVoidPDataRecordStringUnknownUnknown } from "./casts-3b"
import {
  asLsmCastUnknown,
  asLsmMultiIconControl,
  asLsmRowControl,
  asLsmTemplateData,
  asNumber,
  asObject,
  asString,
  asUnknown,
  asZoColorDef,
} from "./casts-4"

import { getValueOrCallback } from "./constants-core"
import { lib } from "./lib-state"

const libDebug = lib.Debug
const dlog = asLsmCastThisVoidLogTypeNumberMsgIdNumberArgsUnknownUnd(libDebug.DebugLog)

const tos = tostring

const constants = lib.constants
const entryTypeConstants = asLsmCastRecordStringUnknown(constants.entryTypes)
const comboBoxConstants = asLsmCastRecordStringUnknown(constants.comboBox)
const comboBoxMappingConstants = asLsmCastRecordStringUnknown(comboBoxConstants.mapping)
const subTableConstants = asLsmCastRecordStringString(
  asLsmCastRecordStringUnknown(constants.data).subtables
)
const ST_LSM_DATA_SUBTABLE = asString(subTableConstants.LSM_DATA_SUBTABLE)
const ST_LSM_DATA_SUBTABLE_ORIGINAL_DATA = asString(
  subTableConstants.LSM_DATA_SUBTABLE_ORIGINAL_DATA
)
const ST_LSM_DATA_SUBTABLE_CALLBACK_FUNCTIONS = asString(
  subTableConstants.LSM_DATA_SUBTABLE_CALLBACK_FUNCTIONS
)

const classes = asLsmCastRecordStringUnknown(lib.classes)

const zo_iconTextFormatTinted =
  asLsmCastThisVoidIconPathStringWidthNumberStringHeightN(zo_iconTextFormat)
const textureConstants = asLsmCastRecordStringUnknown(constants.textures)
const narrationConstants = asLsmCastRecordStringUnknown(constants.narration)
const entryTypeDefaults = asLsmCastRecordStringUnknown(entryTypeConstants.defaults)

const libDivider = lib.DIVIDER
const WITHOUT_ICON_LABEL_DEFAULT_OFFSETX = asNumber(
  entryTypeDefaults.WITHOUT_ICON_LABEL_DEFAULT_OFFSETX
)
const iconNewIcon = asString(textureConstants.iconNewIcon)
const iconNarrationNewValue = asString(narrationConstants.iconNarrationNewValue)

const LSM_ENTRY_TYPE_SUBMENU = asNumber(entryTypeConstants.LSM_ENTRY_TYPE_SUBMENU)
const LSM_ENTRY_TYPE_DIVIDER = asNumber(entryTypeConstants.LSM_ENTRY_TYPE_DIVIDER)
const LSM_ENTRY_TYPE_HEADER = asNumber(entryTypeConstants.LSM_ENTRY_TYPE_HEADER)

const zo_comboBox_setItemEntryCustomTemplate =
  asLsmCastThisVoidItemUnknownCustomEntryTemplateUnknownU(ZO_ComboBox.SetItemEntryCustomTemplate)

const libUtil = lib.Util
const recursiveOverEntries = asLsmCastThisVoidEntryUnknownComboBoxUnknownCallbackFnT(
  libUtil.recursiveOverEntries
)
const getIsNew = asLsmCastThisVoidItemUnknownComboBoxUnknownUnknown(libUtil.getIsNew)
const validateEntryType = asLsmCastThisVoidItemRecordStringUnknownUndefined(
  libUtil.validateEntryType
)
const updateDataByFunctions = asLsmCastThisVoidDataUnknownUndefined(libUtil.updateDataByFunctions)

function updateVariable(
  this: void,
  selfVar: Record<string, unknown>,
  key: string,
  value: unknown
): undefined {
  const zo_ComboBoxEntryKey = asLsmCastRecordStringString(
    comboBoxMappingConstants.LSMEntryKeyZO_ComboBoxEntryKey
  )[key]
  if (zo_ComboBoxEntryKey !== undefined) {
    if (type(selfVar[zo_ComboBoxEntryKey]) !== "function") {
      selfVar[zo_ComboBoxEntryKey] = value
    }
  } else {
    if (selfVar[key] === undefined) {
      selfVar[key] = value
    }
  }
}

function updateAdditionalDataVariables(this: void, selfVar: Record<string, unknown>): undefined {
  const additionalData = asLsmCastRecordStringUnknownUndefined(selfVar.additionalData)
  if (additionalData === undefined) {
    return
  }
  for (const [key, value] of pairs(additionalData)) {
    updateVariable(selfVar, asString(key), value)
  }
}

function addEntryLSM(
  this: void,
  data: Record<string, unknown> | undefined,
  subTB: string,
  key: string,
  valueOrCallbackFunc: unknown
): undefined {
  if (libDebug.doDebug) {
    dlog(
      libDebug.LSM_LOGTYPE_VERBOSE,
      12,
      tos(data),
      tos(subTB),
      tos(key),
      tos(valueOrCallbackFunc)
    )
  }
  if (data === undefined || subTB === undefined || key === undefined) {
    return
  }
  const _lsm =
    asLsmCastRecordStringRecordStringUnknownUndefined(data[ST_LSM_DATA_SUBTABLE]) ||
    asLsmCastRecordStringRecordStringUnknown({})
  _lsm[subTB] = _lsm[subTB] || {}

  _lsm[subTB][key] = valueOrCallbackFunc
  data._LSM = _lsm
}

function updateDataValues(
  this: void,
  data: Record<string, unknown>,
  onlyTheseEntries?: unknown[]
): undefined {
  if (data && data[ST_LSM_DATA_SUBTABLE] === undefined) {
    addEntryLSM(data, ST_LSM_DATA_SUBTABLE_ORIGINAL_DATA, "data", ZO_ShallowTableCopy(data))
  }

  updateAdditionalDataVariables(data)

  if (data.name === undefined && data.label) {
    data.name = data.label
  }

  const checkOnlyProvidedKeys = !ZO_IsTableEmpty(asObject(onlyTheseEntries))
  for (const [key, l_nilToTrue] of pairs(
    asLsmCastRecordStringUnknown(comboBoxMappingConstants.possibleEntryDataWithFunction)
  )) {
    let goOn = true
    if (
      checkOnlyProvidedKeys === true &&
      !ZO_IsElementInNumericallyIndexedTable(asLsmCastUnknown(onlyTheseEntries), key)
    ) {
      goOn = false
    }
    if (goOn) {
      const dataValue = data[asString(key)]
      if (type(dataValue) === "function") {
        if (libDebug.doDebug) {
          dlog(libDebug.LSM_LOGTYPE_VERBOSE, 14, tos(key))
        }

        addEntryLSM(
          data,
          ST_LSM_DATA_SUBTABLE_CALLBACK_FUNCTIONS,
          asString(key),
          function (this: void, pData: Record<string, unknown>): undefined {
            let value = asLsmCastThisVoidPDataRecordStringUnknownUnknown(dataValue)(pData)
            if (value === undefined && l_nilToTrue === true) {
              value = l_nilToTrue
            }
            if (libDebug.doDebug) {
              dlog(libDebug.LSM_LOGTYPE_VERBOSE, 15, tos(key), tos(value))
            }

            pData[asString(key)] = value
          }
        )
      } else if (l_nilToTrue === true && dataValue === undefined) {
        if (libDebug.doDebug) {
          dlog(libDebug.LSM_LOGTYPE_VERBOSE, 16, tos(key), tos(l_nilToTrue))
        }
        data[asString(key)] = l_nilToTrue
      }
    }
  }

  updateDataByFunctions(data)
}

function preUpdateSubItems(this: void, item: Record<string, unknown>, comboBox: unknown): unknown {
  if (item[ST_LSM_DATA_SUBTABLE] === undefined) {
    updateDataValues(item)
  }

  return getIsNew(item, comboBox)
}

const postItemSetupFunctions: Record<
  number,
  (this: void, comboBox: ComboBoxBase, itemEntry: Record<string, unknown>) => undefined
> = {
  [LSM_ENTRY_TYPE_SUBMENU]: function (
    this: void,
    comboBox: ComboBoxBase,
    itemEntry: Record<string, unknown>
  ): undefined {
    itemEntry.isNew = recursiveOverEntries(itemEntry, comboBox, preUpdateSubItems)
  },
  [LSM_ENTRY_TYPE_HEADER]: function (
    this: void,
    comboBox: ComboBoxBase,
    itemEntry: Record<string, unknown>
  ): undefined {
    itemEntry.font = asLsmCastRecordStringUnknown(comboBox).headerFont || itemEntry.font
    itemEntry.color = asLsmCastRecordStringUnknown(comboBox).headerColor || itemEntry.color
  },
  [LSM_ENTRY_TYPE_DIVIDER]: function (
    this: void,
    _comboBox: ComboBoxBase,
    itemEntry: Record<string, unknown>
  ): undefined {
    itemEntry.name = libDivider
  },
}

function runPostItemSetupFunction(
  this: void,
  comboBox: ComboBoxBase,
  itemEntry: Record<string, unknown>
): undefined {
  const postItem_SetupFunc = postItemSetupFunctions[asNumber(itemEntry.entryType)]
  if (postItem_SetupFunc !== undefined) {
    postItem_SetupFunc(comboBox, itemEntry)
  }
}

function setItemEntryCustomTemplate(
  this: void,
  item: Record<string, unknown>,
  customEntryTemplates: Record<number, LsmTemplateData>
): undefined {
  const entryType = asLsmCastNumberUndefined(item.entryType)
  if (libDebug.doDebug) {
    dlog(libDebug.LSM_LOGTYPE_VERBOSE, 34, tos(item.label || item.name), tos(entryType))
  }

  if (entryType != null) {
    const customEntryTemplate = asLsmTemplateData(customEntryTemplates[entryType]).template
    zo_comboBox_setItemEntryCustomTemplate(item, customEntryTemplate)
  }
}

export function addItem_Base(
  this: void,
  self: ComboBoxBase,
  itemEntry: Record<string, unknown>
): undefined {
  if (libDebug.doDebug) {
    dlog(libDebug.LSM_LOGTYPE_VERBOSE, 35, tos(itemEntry))
  }

  updateDataValues(itemEntry)

  validateEntryType(itemEntry)

  if (!itemEntry.customEntryTemplate) {
    setItemEntryCustomTemplate(
      itemEntry,
      asLsmCastRecordNumberLsmTemplateData(self.XMLRowTemplates)
    )
  }

  runPostItemSetupFunction(self, itemEntry)
}
