import { asLsmCastLSM_DATA_SUBTABLEStringLSM_DATA_SUBTABLE_ORIGI } from "./casts-2a"
import { asLsmCastRecordStringNumber, asLsmCastRecordStringUnknown, asLsmCastRecordStringUnknownUndefined2 } from "./casts-2b"
import { asLsmCastThisVoidArgsUnknownUndefinedUndefined2 } from "./casts-3a"
import { asLsmCastThisVoidDataOrControlUnknownRecordStringUnknow, asLsmCastThisVoidDataUnknownUndefined } from "./casts-3b"

import { constants, getValueOrCallback } from "./constants-core"
import { lib } from "./lib-state"

const libUtil = lib.Util

const libDebug = lib.Debug

const dlog = asLsmCastThisVoidArgsUnknownUndefinedUndefined2(libDebug.DebugLog)

const tos = tostring

const entryTypeConstants = asLsmCastRecordStringUnknown(constants.entryTypes)
const subTableConstants = asLsmCastLSM_DATA_SUBTABLEStringLSM_DATA_SUBTABLE_ORIGI(
  asLsmCastRecordStringUnknown(constants.data).subtables
)

const libDivider = lib.DIVIDER
const NIL_CHECK_TABLE = constants.NIL_CHECK_TABLE

const additionalDataKeyToLSMEntryType = asLsmCastRecordStringNumber(
  entryTypeConstants.additionalDataKeyToLSMEntryType
)

const getDataSource = asLsmCastThisVoidDataOrControlUnknownRecordStringUnknow(libUtil.getDataSource)

libUtil.validateEntryType = function (this: void, item: Record<string, unknown>): undefined {
  let entryType = getValueOrCallback(item.entryType, item)

  const isDivider =
    (item.label !== undefined && item.label === libDivider) ||
    item.name === libDivider ||
    (item.isDivider !== undefined && getValueOrCallback(item.isDivider, item)) ||
    entryTypeConstants.LSM_ENTRY_TYPE_DIVIDER === entryType
  const isHeader =
    (item.isHeader !== undefined && getValueOrCallback(item.isHeader, item)) ||
    entryTypeConstants.LSM_ENTRY_TYPE_HEADER === entryType
  const isButton =
    (item.isButton !== undefined && getValueOrCallback(item.isButton, item)) ||
    entryTypeConstants.LSM_ENTRY_TYPE_BUTTON === entryType
  const isRadioButton =
    (item.isRadioButton !== undefined && getValueOrCallback(item.isRadioButton, item)) ||
    entryTypeConstants.LSM_ENTRY_TYPE_RADIOBUTTON === entryType
  const isCheckbox =
    (item.isCheckbox !== undefined && getValueOrCallback(item.isCheckbox, item)) ||
    entryTypeConstants.LSM_ENTRY_TYPE_CHECKBOX === entryType
  const hasSubmenu =
    (item.entries !== undefined && getValueOrCallback(item.entries, item) !== undefined) ||
    entryTypeConstants.LSM_ENTRY_TYPE_SUBMENU === entryType

  if (!entryType || entryType === entryTypeConstants.LSM_ENTRY_TYPE_NORMAL) {
    entryType =
      (hasSubmenu && entryTypeConstants.LSM_ENTRY_TYPE_SUBMENU) ||
      (isDivider && entryTypeConstants.LSM_ENTRY_TYPE_DIVIDER) ||
      (isHeader && entryTypeConstants.LSM_ENTRY_TYPE_HEADER) ||
      (isCheckbox && entryTypeConstants.LSM_ENTRY_TYPE_CHECKBOX) ||
      (isButton && entryTypeConstants.LSM_ENTRY_TYPE_BUTTON) ||
      (isRadioButton && entryTypeConstants.LSM_ENTRY_TYPE_RADIOBUTTON) ||
      entryTypeConstants.LSM_ENTRY_TYPE_NORMAL
  }

  item.isHeader = isHeader
  item.isButton = isButton
  item.isRadioButton = isRadioButton
  item.isDivider = isDivider
  item.isCheckbox = isCheckbox
  item.hasSubmenu = hasSubmenu

  item.entryType = entryType
}

function checkTablesKeyAndGetEntryType(
  this: void,
  dataTable: Record<string, unknown>,
  _text: unknown
): number | undefined {
  for (const [key, entryType] of pairs(additionalDataKeyToLSMEntryType)) {
    if (dataTable[key] !== undefined) {
      if (getValueOrCallback(dataTable[key], dataTable) === true) {
        return entryType
      }
    }
  }
  return undefined
}

libUtil.checkEntryType = function (
  this: void,
  text: unknown,
  entryType: unknown,
  additionalData: Record<string, unknown> | undefined,
  isAddDataTypeTable: boolean | undefined,
  options: Record<string, unknown> | undefined
): unknown {
  if (entryType === undefined) {
    isAddDataTypeTable = isAddDataTypeTable ?? false
    if (isAddDataTypeTable === true) {
      if (additionalData === undefined) {
        isAddDataTypeTable = false
      }
    }
    let l_entryType: unknown

    if (text !== undefined) {
      if (
        getValueOrCallback(text, (isAddDataTypeTable && additionalData) || options) === libDivider
      ) {
        return entryTypeConstants.LSM_ENTRY_TYPE_DIVIDER
      }
    }

    if (additionalData !== undefined && isAddDataTypeTable === true) {
      if (additionalData.entryType !== undefined) {
        l_entryType = getValueOrCallback(additionalData.entryType, additionalData)
        if (l_entryType !== undefined) {
          return l_entryType
        }
      }

      l_entryType = checkTablesKeyAndGetEntryType(additionalData, text)
      if (l_entryType !== undefined) {
        return l_entryType
      }

      const name = additionalData.name
      if (name !== undefined) {
        if (getValueOrCallback(name, additionalData) === libDivider) {
          return entryTypeConstants.LSM_ENTRY_TYPE_DIVIDER
        }
      }
      const label = additionalData.label
      if (name === undefined && label !== undefined) {
        if (getValueOrCallback(label, additionalData) === libDivider) {
          return entryTypeConstants.LSM_ENTRY_TYPE_DIVIDER
        }
      }
    }
  }
  return entryType
}

libUtil.updateDataByFunctions = function (this: void, data: unknown): undefined {
  data = getDataSource(data)

  if (libDebug.doDebug === true && dlog !== undefined) {
    dlog(libDebug.LSM_LOGTYPE_VERBOSE, 13, tos(data))
  }
  const lsmData =
    asLsmCastRecordStringUnknownUndefined2(
      asLsmCastRecordStringUnknown(data)[subTableConstants.LSM_DATA_SUBTABLE]
    ) ?? NIL_CHECK_TABLE
  const funcData =
    asLsmCastRecordStringUnknownUndefined2(
      lsmData[subTableConstants.LSM_DATA_SUBTABLE_CALLBACK_FUNCTIONS]
    ) ?? NIL_CHECK_TABLE

  for (const [, updateFN] of pairs(funcData)) {
    asLsmCastThisVoidDataUnknownUndefined(updateFN)(data)
  }
}
