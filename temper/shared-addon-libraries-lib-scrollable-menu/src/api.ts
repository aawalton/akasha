import { asComboBoxClassLike, asControl } from "./casts-1a"
import { asLsmCastContextMenuObjectUndefined } from "./casts-1b"
import { asLsmCastRecordStringUnknown, asLsmCastRecordStringUnknownIsInstanceOfThisUnknownBase, asLsmCastRecordStringUnknownUndefined } from "./casts-2b"
import { asLsmCastThisVoidArgUnknownArgsUnknownUnknown, asLsmCastThisVoidControlRecordStringUnknownRecordString, asLsmCastThisVoidControlUnknownAlternativeControlUnknow } from "./casts-3a"
import { asLsmCastThisVoidLogTypeNumberMsgIdNumberArgsUnknownUnd } from "./casts-3b"
import {
  asLsmCastThisVoidTextUnknownEntryTypeUnknownAdditionalD,
  asNumber,
  asString,
} from "./casts-4"

type LsmCastLocalThisVoidContextMenuLikeUndefined = (this: void) => ContextMenuLike | undefined
function asLsmCastLocalThisVoidContextMenuLikeUndefined(
  value: unknown
): LsmCastLocalThisVoidContextMenuLikeUndefined {
  return value as LsmCastLocalThisVoidContextMenuLikeUndefined
}

type LsmCastLocalContextMenuLikeUndefined2 = ContextMenuLike | undefined
function asLsmCastLocalContextMenuLikeUndefined2(
  value: unknown
): LsmCastLocalContextMenuLikeUndefined2 {
  return value as LsmCastLocalContextMenuLikeUndefined2
}

type LsmCastLocalContextMenuLike2 = ContextMenuLike
function asLsmCastLocalContextMenuLike2(value: unknown): LsmCastLocalContextMenuLike2 {
  return value as LsmCastLocalContextMenuLike2
}

import { getContextMenu, lib, setContextMenu } from "./lib-state"

const MAJOR = lib.name

const libDebug = lib.Debug
const debugPrefix = libDebug.prefix

const dlog = asLsmCastThisVoidLogTypeNumberMsgIdNumberArgsUnknownUnd(libDebug.DebugLog)

const tos = tostring
const sfor = string.format

const tableType = "table"

const classes = asLsmCastRecordStringUnknown(lib.classes)
const comboBoxClass = asComboBoxClassLike(classes.comboBoxClass)

const constants = lib.constants
const entryTypeConstants = asLsmCastRecordStringUnknown(constants.entryTypes)

const libDivider = lib.DIVIDER

const libUtil = lib.Util
const getControlName = asLsmCastThisVoidControlUnknownAlternativeControlUnknow(
  libUtil.getControlName
)
const getValueOrCallback = asLsmCastThisVoidArgUnknownArgsUnknownUnknown(libUtil.getValueOrCallback)
const getContextMenuReference = asLsmCastLocalThisVoidContextMenuLikeUndefined(
  libUtil.getContextMenuReference
)
const checkEntryType = asLsmCastThisVoidTextUnknownEntryTypeUnknownAdditionalD(
  libUtil.checkEntryType
)

export function updateContextMenuRef(this: void): ContextMenuLike | undefined {
  let g_contextMenu = asLsmCastLocalContextMenuLikeUndefined2(getContextMenu())
  g_contextMenu = g_contextMenu ?? getContextMenuReference()
  setContextMenu(asLsmCastContextMenuObjectUndefined(g_contextMenu))
  return g_contextMenu
}

lib.persistentMenus = false
lib.GetPersistentMenus = function (this: void): unknown {
  if (libDebug.doDebug) {
    dlog(libDebug.LSM_LOGTYPE_DEBUG, 159, tos(lib.persistentMenus))
  }
  return lib.persistentMenus
}
lib.SetPersistentMenus = function (this: void, persistent: unknown): undefined {
  if (libDebug.doDebug) {
    dlog(libDebug.LSM_LOGTYPE_DEBUG, 160, tos(persistent))
  }
  lib.persistentMenus = persistent
}

function addCustomScrollableComboBoxDropdownMenuImpl(
  this: void,
  parent: unknown,
  comboBoxContainer: unknown,
  options?: unknown
): unknown {
  if (!(parent !== undefined && comboBoxContainer !== undefined)) {
    error(
      MAJOR +
        " - AddCustomScrollableComboBoxDropdownMenu ERROR: Parameters parent and comboBoxContainer must be provided!"
    )
  }

  const comboBox = asLsmCastRecordStringUnknownIsInstanceOfThisUnknownBase(
    ZO_ComboBox_ObjectFromContainer(asControl(comboBoxContainer))
  )
  if (!comboBox?.IsInstanceOf?.(ZO_ComboBox)) {
    error(
      MAJOR +
        ' | The comboBoxContainer you supplied must be a valid ZO_ComboBox container. "comboBoxContainer.m_comboBox:IsInstanceOf(ZO_ComboBox)"'
    )
  }

  if (libDebug.doDebug) {
    dlog(
      libDebug.LSM_LOGTYPE_DEBUG,
      161,
      tos(getControlName(parent)),
      tos(getControlName(comboBoxContainer)),
      tos(options)
    )
  }
  comboBoxClass.UpdateMetatable(comboBox, parent, comboBoxContainer, options)

  return asLsmCastRecordStringUnknown(comboBox).m_dropdownObject
}
AddCustomScrollableComboBoxDropdownMenu = addCustomScrollableComboBoxDropdownMenuImpl

GetCustomScrollableMenuRowData = asLsmCastThisVoidControlRecordStringUnknownRecordString(
  libUtil.getControlData
)

function addCustomScrollableMenuEntryImpl(
  this: void,
  text: unknown,
  callback: unknown,
  entryType: unknown,
  entries: unknown,
  additionalData: unknown
): LuaMultiReturn<[number | undefined, Record<string, unknown> | undefined]> {
  const g_contextMenu = updateContextMenuRef()
  const options = asLsmCastLocalContextMenuLike2(g_contextMenu).GetOptions()

  const addDataType = (additionalData !== undefined && type(additionalData)) || undefined
  const isAddDataTypeTable =
    (addDataType !== undefined && addDataType === tableType && true) || false

  entryType = checkEntryType(
    text,
    entryType,
    asLsmCastRecordStringUnknownUndefined(additionalData),
    isAddDataTypeTable,
    options
  )
  entryType = entryType ?? asNumber(entryTypeConstants.LSM_ENTRY_TYPE_NORMAL)

  let generatedText: unknown

  const generatedEntryType = getValueOrCallback(
    entryType,
    (isAddDataTypeTable && additionalData) || options
  )

  if (generatedEntryType === entryTypeConstants.LSM_ENTRY_TYPE_DIVIDER) {
    text = libDivider
  }

  const addData = asLsmCastRecordStringUnknownUndefined(additionalData)

  if (isAddDataTypeTable === true && addData !== undefined) {
    if (text !== undefined) {
      addData.name = text
    }
    generatedText = getValueOrCallback(addData.label ?? addData.name, addData)
  }
  generatedText =
    generatedText ?? ((text !== undefined && getValueOrCallback(text, options)) || undefined)

  if (!(generatedText !== undefined && generatedText !== "" && generatedEntryType !== undefined)) {
    error(
      sfor(
        "[" +
          MAJOR +
          ":AddCustomScrollableMenuEntry] text/additionalData.label/additionalData.name: String or function returning a string, got %q; entryType: number LSM_ENTRY_TYPE_* or function returning the entryType expected, got %q",
        tos(generatedText),
        tos(generatedEntryType)
      )
    )
  }
  if (
    asLsmCastRecordStringUnknown(entryTypeConstants.allowedEntryTypesForContextMenu)[
      asString(generatedEntryType)
    ] !== true
  ) {
    error(
      sfor(
        "[" + MAJOR + ":AddCustomScrollableMenuEntry] entryType %q is not allowed",
        tos(generatedEntryType)
      )
    )
  }

  if (
    generatedEntryType !== undefined &&
    !asLsmCastRecordStringUnknown(
      entryTypeConstants.entryTypesForContextMenuWithoutMandatoryCallback
    )[asString(generatedEntryType)] &&
    entries === undefined
  ) {
    const callbackFuncType = type(callback)
    if (callbackFuncType !== "function") {
      error(
        sfor(
          "[" +
            MAJOR +
            ":AddCustomScrollableMenuEntry] Callback function expected for entryType %q, callback's type: %s, name: %q",
          tos(generatedEntryType),
          tos(callbackFuncType),
          tos(generatedText)
        )
      )
    }
  }

  const isDivider =
    generatedEntryType === entryTypeConstants.LSM_ENTRY_TYPE_DIVIDER || generatedText === libDivider
  if (isDivider) {
    callback = undefined
  }

  const isNew =
    (isAddDataTypeTable && addData?.isNew) || (!isAddDataTypeTable && additionalData) || false

  const newEntry: Record<string, unknown> = {
    entryType,
    label: (isAddDataTypeTable && addData?.label) || undefined,
    name: (isAddDataTypeTable && addData?.name) || text,

    callback,

    entries,

    isNew,
  }

  if (isAddDataTypeTable) {
    newEntry.additionalData = additionalData
  }

  if (libDebug.doDebug) {
    dlog(libDebug.LSM_LOGTYPE_DEBUG, 162, tos(text), tos(callback), tos(entryType), tos(entries))
  }

  const cm = asLsmCastLocalContextMenuLike2(g_contextMenu)
  const indexAdded = cm.AddContextMenuItem(newEntry, ZO_COMBOBOX_SUPPRESS_UPDATE)

  return $multi(indexAdded, newEntry)
}
AddCustomScrollableMenuEntry = addCustomScrollableMenuEntryImpl
