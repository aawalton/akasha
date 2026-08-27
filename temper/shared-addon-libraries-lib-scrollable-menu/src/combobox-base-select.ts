import { asComboBoxBaseClass } from "./casts-1a"
import { asLsmCastIsOwnedByComboBoxThisVoidComboBoxUnknownBoolea } from "./casts-2a"
import { asLsmCastRecordNumberLsmEntryUndefined, asLsmCastRecordStringUnknown, asLsmCastRecordStringUnknownUndefined } from "./casts-2b"
import { asLsmCastThisVoidComboBoxComboBoxBaseNameUnknownItemUnk2, asLsmCastThisVoidComboBoxComboBoxBaseNameUnknownItemUnk3 } from "./casts-3a"
import { asLsmCastThisVoidControlUnknownRecordStringUnknown, asLsmCastThisVoidDropdownObjectUnknownEntryTypeUnknownU, asLsmCastThisVoidItemUnknownUnknown, asLsmCastThisVoidLsmRowControlUndefined } from "./casts-3b"
import { asNumber, asString } from "./casts-4"

import { lib } from "./lib-state"

const moc = asLsmCastThisVoidLsmRowControlUndefined(asLsmCastRecordStringUnknown(_G).moc)

const constants = lib.constants
const searchFilterConstants = asLsmCastRecordStringUnknown(constants.searchFilter)
const noEntriesResultsText = asString(
  asLsmCastRecordStringUnknown(searchFilterConstants.noEntriesResults).name
)
const noEntriesSubmenuResults = asLsmCastRecordStringUnknown(
  searchFilterConstants.noEntriesSubmenuResults
)
const noEntriesSubmenuResultsText = asString(noEntriesSubmenuResults.name)
const itemTextsOfNothingFound: Record<string, boolean> = {
  [noEntriesSubmenuResultsText]: true,
  [noEntriesResultsText]: true,
}

const libUtil = lib.Util
const getControlData = asLsmCastThisVoidControlUnknownRecordStringUnknown(libUtil.getControlData)
const playSelectedSoundCheck = asLsmCastThisVoidDropdownObjectUnknownEntryTypeUnknownU(
  libUtil.playSelectedSoundCheck
)

const classes = asLsmCastRecordStringUnknown(lib.classes)
const comboBox_base = asComboBoxBaseClass(classes.comboboxBaseClass)

comboBox_base.CheckIfNoEntryFoundWasClicked = function (
  this: ComboBoxBase,
  item: LsmEntry
): boolean {
  const itemTbl = asLsmCastRecordStringUnknown(item)
  if (item && itemTbl.callback) {
    if (itemTbl.isNoEntriesResult) {
      lib.preventerVars.suppressNextOnGlobalMouseUp = MOUSE_BUTTON_INDEX_LEFT
      return true
    }

    let itemText = asString(itemTbl.label || itemTbl.name)
    if (!itemTextsOfNothingFound[itemText]) {
      const mocCtrl = moc()
      if (mocCtrl) {
        const data = getControlData(mocCtrl)
        if (data) {
          itemText = asString(data.label || data.name)
        }
      }
    }
    if (itemTextsOfNothingFound[itemText]) {
      lib.preventerVars.suppressNextOnGlobalMouseUp = MOUSE_BUTTON_INDEX_LEFT
      return true
    }
  }
  return false
}

comboBox_base.ItemSelectedClickHelper = function (
  this: ComboBoxBase,
  item: LsmEntry,
  ignoreCallback: unknown
): boolean {
  const itemTbl = asLsmCastRecordStringUnknown(item)
  if (itemTbl.enabled === false) {
    return false
  }

  if (this.CheckIfNoEntryFoundWasClicked(item)) {
    return false
  }

  const oldItem = asLsmCastRecordStringUnknownUndefined(this.m_selectedItemData)
  if (this.dontSetSelectedTextOnSelection !== true) {
    this.SetSelectedItemText(asString(itemTbl.name))
  }
  this.m_selectedItemData = item

  if (itemTbl.callback && !ignoreCallback) {
    let selectionChanged = oldItem !== itemTbl
    if (!selectionChanged && oldItem && item) {
      selectionChanged = itemTbl.name !== oldItem.name
    }
    asLsmCastThisVoidComboBoxComboBoxBaseNameUnknownItemUnk2(itemTbl.callback)(
      this,
      itemTbl.name,
      item,
      selectionChanged,
      oldItem
    )
  }

  return true
}

comboBox_base.SelectItem = function (
  this: ComboBoxBase,
  item: LsmEntry | undefined,
  ignoreCallback: unknown
): boolean | undefined {
  if (!item) {
    return
  }
  const itemTbl = asLsmCastRecordStringUnknown(item)

  if (!this.m_enableMultiSelect) {
    return this.ItemSelectedClickHelper(item, ignoreCallback)
  }

  if (itemTbl.enabled === false) {
    return false
  }

  if (this.CheckIfNoEntryFoundWasClicked(item)) {
    return false
  }

  const newSelectionStatus = !this.IsItemSelected(item)
  if (newSelectionStatus) {
    if (
      this.m_maxNumSelections === undefined ||
      this.GetNumSelectedEntries() < asNumber(this.m_maxNumSelections)
    ) {
      this.AddItemToSelected(item)
    } else {
      if (
        !this.onSelectionBlockedCallback ||
        asLsmCastThisVoidItemUnknownUnknown(this.onSelectionBlockedCallback)(item) !== true
      ) {
        const alertText = this.GetSelectionBlockedErrorText()
        if (ZO_REMOTE_SCENE_CHANGE_ORIGIN === SCENE_MANAGER_MESSAGE_ORIGIN_INTERNAL) {
          RequestAlert(UI_ALERT_CATEGORY_ALERT, asString(SOUNDS.GENERAL_ALERT_ERROR), alertText)
        } else if (ZO_REMOTE_SCENE_CHANGE_ORIGIN === SCENE_MANAGER_MESSAGE_ORIGIN_INGAME) {
          ZO_Alert(UI_ALERT_CATEGORY_ALERT, asString(SOUNDS.GENERAL_ALERT_ERROR), alertText)
        }
        return false
      }
    }
  } else {
    this.RemoveItemFromSelected(item)
  }
  playSelectedSoundCheck(this.m_dropdownObject, itemTbl.entryType)

  if (itemTbl.callback && !ignoreCallback) {
    asLsmCastThisVoidComboBoxComboBoxBaseNameUnknownItemUnk3(itemTbl.callback)(
      this,
      itemTbl.name,
      item
    )
  }
  this.RefreshSelectedItemText()
  const dropdownObject = asLsmCastIsOwnedByComboBoxThisVoidComboBoxUnknownBoolea(
    this.m_dropdownObject
  )
  if (dropdownObject.IsOwnedByComboBox(this)) {
    dropdownObject.Refresh(item)
  }

  return true
}

comboBox_base.SetSelected = function (
  this: ComboBoxBase,
  index: number,
  ignoreCallback: unknown
): undefined {
  const sortedItems = asLsmCastRecordNumberLsmEntryUndefined(this.m_sortedItems)
  const item = sortedItems[index]
  if (item === undefined) {
    return
  }

  this.SelectItem(item, ignoreCallback)

  if (!this.m_enableMultiSelect) {
    this.HideDropdown()
  }
}
