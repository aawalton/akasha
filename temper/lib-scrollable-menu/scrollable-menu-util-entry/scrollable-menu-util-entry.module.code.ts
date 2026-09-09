import {
  asControl,
  asLsmCastComboBoxLikeUndefined,
} from "../scrollable-menu-casts-1a/scrollable-menu-casts-1a.module.code.ts"
import {
  asLsmCastGetDataSourceThisUnknownUnknown,
  asLsmCastGetNumSelectedEntriesThisUnknownNumber,
  asLsmCastGetOptionsThisUnknownRecordStringUnknown,
} from "../scrollable-menu-casts-1b/scrollable-menu-casts-1b.module.code.ts"
import {
  asLsmCastRecordStringUnknown,
  asLsmCastRecordStringUnknownUndefined,
  asLsmCastRecordStringZoColorDef,
} from "../scrollable-menu-casts-2b/scrollable-menu-casts-2b.module.code.ts"
import {
  asLsmCastSetColorThisUnknownRNumberGNumberBNumberANumbe,
  asLsmCastThisVoidArgsUnknownUndefinedUndefined2,
  asLsmCastThisVoidAUnknownUnknown,
} from "../scrollable-menu-casts-3a/scrollable-menu-casts-3a.module.code.ts"
import {
  asLsmCastThisVoidDataOrControlUnknownRecordStringUnknow,
  asLsmCastThisVoidListControlDataToRefreshUnknownUndefin,
} from "../scrollable-menu-casts-3b/scrollable-menu-casts-3b.module.code.ts"
import {
  asLsmCastUnknown,
  asLsmCastUnknownUndefined,
  asObject,
  asString,
  asZoColorDef,
} from "../scrollable-menu-casts-4/scrollable-menu-casts-4.module.code.ts"

type LsmCastLocalTypeofRecursiveOverEntries = typeof recursiveOverEntries
function asLsmCastLocalTypeofRecursiveOverEntries(
  value: unknown
): LsmCastLocalTypeofRecursiveOverEntries {
  return value as LsmCastLocalTypeofRecursiveOverEntries
}

type LsmCastLocalTypeofCheckIfSubmenuEntriesAreCurrentlySelecte =
  typeof checkIfSubmenuEntriesAreCurrentlySelectedForMultiSelect
function asLsmCastLocalTypeofCheckIfSubmenuEntriesAreCurrentlySelecte(
  value: unknown
): LsmCastLocalTypeofCheckIfSubmenuEntriesAreCurrentlySelecte {
  return value as LsmCastLocalTypeofCheckIfSubmenuEntriesAreCurrentlySelecte
}

type LsmCastLocalTypeofRecursiveMultiSelectSubmenuOpeningContro =
  typeof recursiveMultiSelectSubmenuOpeningControlUpdate
function asLsmCastLocalTypeofRecursiveMultiSelectSubmenuOpeningContro(
  value: unknown
): LsmCastLocalTypeofRecursiveMultiSelectSubmenuOpeningContro {
  return value as LsmCastLocalTypeofRecursiveMultiSelectSubmenuOpeningContro
}

import {
  constants,
  getValueOrCallback,
} from "../scrollable-menu-constants-core/scrollable-menu-constants-core.module.code.ts"
import { lib } from "../scrollable-menu-lib-state/scrollable-menu-lib-state.module.code.ts"

const libUtil = lib.Util

const libDebug = lib.Debug

const dlog = asLsmCastThisVoidArgsUnknownUndefinedUndefined2(libDebug.DebugLog)

const tos = tostring

const FUNCTION_TYPE = "function"

const ZO_ScrollList_RefreshVisible_ = asLsmCastThisVoidListControlDataToRefreshUnknownUndefin(
  ZO_ScrollList_RefreshVisible
)

const TABLE_TYPE = "table"

const colorConstants = asLsmCastRecordStringZoColorDef(constants.colors)

const getDataSource = asLsmCastThisVoidDataOrControlUnknownRecordStringUnknow(libUtil.getDataSource)

let recursiveOverEntries: (
  this: void,
  entry: Record<string, unknown>,
  comboBox: unknown,
  callback: unknown,
  ...args: unknown[]
) => unknown
let recursiveMultiSelectSubmenuOpeningControlUpdate: (
  this: void,
  selfVar: unknown,
  item: Record<string, unknown>,
  newValue: unknown,
  parentDepth?: number
) => undefined
let checkIfSubmenuEntriesAreCurrentlySelectedForMultiSelect: (
  this: void,
  item: Record<string, unknown> | undefined,
  comboBox: ComboBoxLike | undefined
) => unknown

let alreadyCheckedSubmenuOpeningItems: Record<string, boolean> = {}

libUtil.getEditBoxData = function (
  this: void,
  _control: unknown,
  data: Record<string, unknown>
): Record<string, unknown> | undefined {
  const editBoxData = getValueOrCallback(data.editBoxData, data)
  if (type(editBoxData) === "table") {
    return asLsmCastRecordStringUnknown(editBoxData)
  }
  return undefined
}

libUtil.getSliderData = function (
  this: void,
  _control: unknown,
  data: Record<string, unknown>
): Record<string, unknown> | undefined {
  const sliderData = getValueOrCallback(data.sliderData, data)
  if (type(sliderData) === "table") {
    return asLsmCastRecordStringUnknown(sliderData)
  }
  return undefined
}

libUtil.compareDropdownDataList = function (
  this: void,
  _selfVar: unknown,
  scrollControl: Control,
  item: unknown
): unknown {
  const dataList = ZO_ScrollList_GetDataList<Record<string, unknown>>(scrollControl)

  if (dataList !== undefined) {
    for (const [, data] of ipairs(dataList)) {
      if (asLsmCastGetDataSourceThisUnknownUnknown(data).GetDataSource() === item) {
        return data
      }
    }
  }
  return undefined
}

let endlessLoopPreventionCounter = 0

libUtil.recursiveOverEntries = function (
  this: void,
  entry: Record<string, unknown>,
  comboBox: unknown,
  callback: unknown,
  ...args: unknown[]
): unknown {
  recursiveOverEntries =
    recursiveOverEntries ?? asLsmCastLocalTypeofRecursiveOverEntries(libUtil.recursiveOverEntries)
  endlessLoopPreventionCounter = 0
  if (type(callback) !== FUNCTION_TYPE) {
    if (libDebug.doDebug === true && dlog !== undefined) {
      dlog(libDebug.LSM_LOGTYPE_VERBOSE, 19, 0, tos(false))
    }
    return false
  }

  let result = asLsmCastThisVoidAUnknownUnknown(callback)(entry, comboBox, ...args)
  const submenu =
    (entry.entries !== undefined &&
      asLsmCastRecordStringUnknownUndefined(getValueOrCallback(entry.entries, entry))) ||
    {}

  if (endlessLoopPreventionCounter >= 5000) {
    d(
      "[" +
        lib.name +
        "]ERROR recursiveOverEntries - EEEEEEEEEEEEEEE   --ABORT ENDLESS LOOP--   EEEEEEEEEEEEEE"
    )
    return undefined
  }

  if (type(submenu) === TABLE_TYPE && asLsmCastUnknown(submenu).length > 0) {
    for (const [, subEntry] of pairs(asLsmCastRecordStringUnknown(submenu))) {
      const subEntryResult = recursiveOverEntries(
        asLsmCastRecordStringUnknown(subEntry),
        comboBox,
        callback,
        ...args
      )
      if (subEntryResult !== undefined && subEntryResult !== false) {
        result = subEntryResult
      }
    }
  }
  if (libDebug.doDebug === true && dlog !== undefined) {
    dlog(libDebug.LSM_LOGTYPE_VERBOSE, 19, tos(asLsmCastUnknown(submenu).length), tos(result))
  }
  return result
}
recursiveOverEntries = asLsmCastLocalTypeofRecursiveOverEntries(libUtil.recursiveOverEntries)

libUtil.checkIfSubmenuEntriesAreCurrentlySelectedForMultiSelect = function (
  this: void,
  item: Record<string, unknown> | undefined,
  comboBox: ComboBoxLike | undefined
): unknown {
  checkIfSubmenuEntriesAreCurrentlySelectedForMultiSelect =
    checkIfSubmenuEntriesAreCurrentlySelectedForMultiSelect ??
    asLsmCastLocalTypeofCheckIfSubmenuEntriesAreCurrentlySelecte(
      libUtil.checkIfSubmenuEntriesAreCurrentlySelectedForMultiSelect
    )
  endlessLoopPreventionCounter = endlessLoopPreventionCounter + 1
  if (endlessLoopPreventionCounter >= 10000) {
    return false
  }

  if (item === undefined || comboBox === undefined) {
    return false
  }
  if (!comboBox.m_enableMultiSelect) {
    return false
  }

  alreadyCheckedSubmenuOpeningItems[asString(item)] = true

  let result: unknown = false
  const itemOwner = asLsmCastRecordStringUnknownUndefined(item.m_owner)
  const currentSubmenuItems =
    (itemOwner !== undefined && asLsmCastUnknownUndefined(itemOwner.m_sortedItems)) || undefined
  if (currentSubmenuItems !== undefined && !ZO_IsTableEmpty(asObject(currentSubmenuItems))) {
    const multiSelectedItemData = asLsmCastUnknownUndefined(comboBox.m_multiSelectItemData)
    if (multiSelectedItemData !== undefined && !ZO_IsTableEmpty(asObject(multiSelectedItemData))) {
      for (const [, currentSubmenuItem] of ipairs(asLsmCastUnknown(currentSubmenuItems))) {
        for (const [, selectedSubmenuItem] of ipairs(multiSelectedItemData)) {
          if (selectedSubmenuItem === currentSubmenuItem) {
            if (comboBox.m_dropdownObject !== undefined && comboBox.openingControl !== undefined) {
              const openingControl = asLsmCastRecordStringUnknown(comboBox.openingControl)
              const dataEntry = asLsmCastRecordStringUnknownUndefined(openingControl.dataEntry)
              const dataEntryOfOpeningControl =
                (dataEntry !== undefined &&
                  asLsmCastRecordStringUnknownUndefined(dataEntry.data)) ||
                undefined
              ZO_ScrollList_RefreshVisible_(
                asControl(asLsmCastRecordStringUnknown(comboBox.m_dropdownObject).scrollControl),
                dataEntryOfOpeningControl
              )
            }
            return true
          } else if (
            item !== currentSubmenuItem &&
            !alreadyCheckedSubmenuOpeningItems[asString(currentSubmenuItem)] &&
            asLsmCastRecordStringUnknown(currentSubmenuItem).entries !== undefined
          ) {
            result = recursiveOverEntries(
              asLsmCastRecordStringUnknown(currentSubmenuItem),
              comboBox,
              checkIfSubmenuEntriesAreCurrentlySelectedForMultiSelect
            )
          }
        }
      }
    }
  }
  return result
}
checkIfSubmenuEntriesAreCurrentlySelectedForMultiSelect =
  asLsmCastLocalTypeofCheckIfSubmenuEntriesAreCurrentlySelecte(
    libUtil.checkIfSubmenuEntriesAreCurrentlySelectedForMultiSelect
  )

libUtil.recursiveMultiSelectSubmenuOpeningControlUpdate = function (
  this: void,
  _selfVar: unknown,
  item: Record<string, unknown>,
  newValue: unknown,
  parentDepth?: number
): undefined {
  recursiveMultiSelectSubmenuOpeningControlUpdate =
    recursiveMultiSelectSubmenuOpeningControlUpdate ??
    asLsmCastLocalTypeofRecursiveMultiSelectSubmenuOpeningContro(
      libUtil.recursiveMultiSelectSubmenuOpeningControlUpdate
    )
  parentDepth = parentDepth ?? 0

  const comboBoxOfItem = asLsmCastRecordStringUnknownUndefined(item.m_owner)
  if (comboBoxOfItem === undefined || !comboBoxOfItem.isSubmenu) {
    return
  }
  const openingControl = asLsmCastRecordStringUnknownUndefined(comboBoxOfItem.openingControl)

  if (openingControl !== undefined) {
    let foundStillSelectedItem: unknown = false
    const selectedEntries =
      asLsmCastGetNumSelectedEntriesThisUnknownNumber(comboBoxOfItem).GetNumSelectedEntries()
    const isAnyEntrySelected = selectedEntries > 0
    if (!isAnyEntrySelected) {
      newValue = undefined
    }

    if (newValue === true) {
      openingControl.isAnySubmenuEntrySelected = newValue
    }

    const openingControlOwner = asLsmCastRecordStringUnknownUndefined(openingControl.m_owner)
    const parentMenu =
      (openingControlOwner !== undefined &&
        asLsmCastRecordStringUnknownUndefined(openingControlOwner.m_parentMenu)) ||
      undefined
    if (parentMenu !== undefined && parentDepth < 100) {
      parentDepth = parentDepth + 1

      recursiveMultiSelectSubmenuOpeningControlUpdate(
        parentMenu,
        getDataSource(openingControl),
        newValue,
        parentDepth
      )
    }

    alreadyCheckedSubmenuOpeningItems = {}
    foundStillSelectedItem = recursiveOverEntries(
      item,
      comboBoxOfItem,
      checkIfSubmenuEntriesAreCurrentlySelectedForMultiSelect
    )
    if (!newValue && (!foundStillSelectedItem || !isAnyEntrySelected)) {
      openingControl.isAnySubmenuEntrySelected = undefined
    }

    if (newValue === true || (!newValue && (!isAnyEntrySelected || !foundStillSelectedItem))) {
      if (openingControl.m_dropdownObject !== undefined) {
        const dataEntry = asLsmCastRecordStringUnknown(openingControl.dataEntry)
        const dataOfOpeningControl = asLsmCastRecordStringUnknownUndefined(dataEntry.data)
        ZO_ScrollList_RefreshVisible_(
          asControl(asLsmCastRecordStringUnknown(openingControl.m_dropdownObject).scrollControl),
          dataOfOpeningControl
        )
      }
    }
  }
}
recursiveMultiSelectSubmenuOpeningControlUpdate =
  asLsmCastLocalTypeofRecursiveMultiSelectSubmenuOpeningContro(
    libUtil.recursiveMultiSelectSubmenuOpeningControlUpdate
  )

libUtil.subMenuArrowColor = function (
  this: void,
  control: Record<string, unknown>,
  _data: unknown
): undefined {
  if (control.m_arrow === undefined) {
    return
  }
  const comboBox = asLsmCastComboBoxLikeUndefined(control.m_owner)
  const isMultiSelectionEnabled = comboBox?.m_enableMultiSelect || false
  const isMultiSelectSubmenuEntrySelected =
    (isMultiSelectionEnabled === true && control.isAnySubmenuEntrySelected) || false

  const options =
    (comboBox !== undefined &&
      asLsmCastGetOptionsThisUnknownRecordStringUnknown(comboBox).GetOptions()) ||
    undefined
  const multiSelectSubmenuSelectedArrowColor =
    (isMultiSelectSubmenuEntrySelected === true &&
      options !== undefined &&
      getValueOrCallback(options.multiSelectSubmenuSelectedArrowColor, options)) ||
    colorConstants.DEFAULT_ARROW_COLOR
  const submenuArrowColor =
    (!isMultiSelectSubmenuEntrySelected &&
      options !== undefined &&
      getValueOrCallback(options.submenuArrowColor, options)) ||
    colorConstants.DEFAULT_ARROW_COLOR

  const newColor =
    (isMultiSelectSubmenuEntrySelected === true && multiSelectSubmenuSelectedArrowColor) ||
    (!isMultiSelectSubmenuEntrySelected && submenuArrowColor) ||
    colorConstants.DEFAULT_ARROW_COLOR
  if (newColor !== undefined) {
    const [r, g, b, a] = asZoColorDef(newColor).UnpackRGBA()
    asLsmCastSetColorThisUnknownRNumberGNumberBNumberANumbe(control.m_arrow).SetColor(r, g, b, a)
  }
}

libUtil.getIsNew = function (
  this: void,
  entry: Record<string, unknown>,
  _comboBox: unknown
): unknown {
  if (libDebug.doDebug === true && dlog !== undefined) {
    dlog(libDebug.LSM_LOGTYPE_VERBOSE, 17)
  }
  return getValueOrCallback(entry.isNew, entry) || false
}
