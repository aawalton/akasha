import "../scrollable-menu-casts-1a/scrollable-menu-casts-1a.module.code.ts"
import {
  asLsmCastNumberUndefined,
  asLsmCastRecordNumberLsmTemplateData,
  asLsmCastRecordStringRecordStringUnknown,
  asLsmCastRecordStringRecordStringUnknownUndefined,
  asLsmCastRecordStringString,
  asLsmCastRecordStringUnknown,
  asLsmCastRecordStringUnknownUndefined,
} from "../scrollable-menu-casts-2b/scrollable-menu-casts-2b.module.code.ts"
import "../scrollable-menu-casts-3a/scrollable-menu-casts-3a.module.code.ts"
import {
  asLsmCastThisVoidDataUnknownUndefined,
  asLsmCastThisVoidEntryUnknownComboBoxUnknownCallbackFnT,
  asLsmCastThisVoidItemRecordStringUnknownUndefined,
  asLsmCastThisVoidItemUnknownComboBoxUnknownUnknown,
  asLsmCastThisVoidItemUnknownCustomEntryTemplateUnknownU,
  asLsmCastThisVoidLogTypeNumberMsgIdNumberArgsUnknownUnd,
  asLsmCastThisVoidPDataRecordStringUnknownUnknown,
} from "../scrollable-menu-casts-3b/scrollable-menu-casts-3b.module.code.ts"
import {
  asLsmCastUnknown,
  asLsmTemplateData,
  asNumber,
  asObject,
  asString,
} from "../scrollable-menu-casts-4/scrollable-menu-casts-4.module.code.ts"

import "../scrollable-menu-constants-core/scrollable-menu-constants-core.module.code.ts"
import { lib } from "../scrollable-menu-lib-state/scrollable-menu-lib-state.module.code.ts"

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

const libDivider = lib.DIVIDER
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
  const zoComboBoxEntryKey = asLsmCastRecordStringString(
    comboBoxMappingConstants.LSMEntryKeyZO_ComboBoxEntryKey
  )[key]
  if (zoComboBoxEntryKey !== undefined) {
    if (type(selfVar[zoComboBoxEntryKey]) !== "function") {
      selfVar[zoComboBoxEntryKey] = value
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
  const lsm =
    asLsmCastRecordStringRecordStringUnknownUndefined(data[ST_LSM_DATA_SUBTABLE]) ||
    asLsmCastRecordStringRecordStringUnknown({})
  lsm[subTB] = lsm[subTB] || {}

  lsm[subTB][key] = valueOrCallbackFunc
  data._LSM = lsm
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
  for (const [key, lNilToTrue] of pairs(
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
            if (value === undefined && lNilToTrue === true) {
              value = lNilToTrue
            }
            if (libDebug.doDebug) {
              dlog(libDebug.LSM_LOGTYPE_VERBOSE, 15, tos(key), tos(value))
            }

            pData[asString(key)] = value
          }
        )
      } else if (lNilToTrue === true && dataValue === undefined) {
        if (libDebug.doDebug) {
          dlog(libDebug.LSM_LOGTYPE_VERBOSE, 16, tos(key), tos(lNilToTrue))
        }
        data[asString(key)] = lNilToTrue
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

const POST_ITEM_SETUP_FUNCTIONS: Record<
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
  const postItemSetupFunc = POST_ITEM_SETUP_FUNCTIONS[asNumber(itemEntry.entryType)]
  if (postItemSetupFunc !== undefined) {
    postItemSetupFunc(comboBox, itemEntry)
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

export function addItemBase(
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
