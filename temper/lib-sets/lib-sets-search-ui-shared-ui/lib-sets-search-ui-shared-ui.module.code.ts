const CM = CALLBACK_MANAGER

import {
  asLibSetsSearchRowData,
  asNumberOrString,
  asSearchUIComboBox,
} from "../lib-sets-search-ui-casts/lib-sets-search-ui-casts.module.code.ts"
import { getSharedSearchUIClass } from "../lib-sets-search-ui-shared-class/lib-sets-search-ui-shared-class.module.code.ts"
import { updateSetsInfoWithDataAndNames } from "../lib-sets-search-ui-shared-helpers/lib-sets-search-ui-shared-helpers.module.code.ts"
import {
  getComboBoxFromDropdownControl,
  isItemFilterTypeMatching,
  searchUI,
  searchUIName,
} from "../lib-sets-search-ui-shared-state/lib-sets-search-ui-shared-state.module.code.ts"

const sharedClass = getSharedSearchUIClass()

sharedClass.Initialize = function (this: LibSetsSearchUISharedObject, control: SearchUIControl) {
  this.control = control
  control._object = this

  const filters = this.control.GetNamedChild("Filters")
  this.filtersControl = filters
  const content = this.control.GetNamedChild("Content")
  this.contentControl = content

  this.lastSearchParams = undefined
  this.searchParams = undefined

  this.stringSearch = ZO_StringSearch.New()
  this.stringSearch.AddProcessor(
    searchUI.searchTypeDefault,
    (stringSearch, data, searchTerm, cache) =>
      this.ProcessItemEntry(stringSearch, asLibSetsSearchRowData(data), searchTerm, cache)
  )
}

sharedClass.SetSearchCallbacks = function (
  this: LibSetsSearchUISharedObject,
  searchDoneCallback?: (this: void, selfVar: LibSetsSearchUISharedObject) => void,
  searchErrorCallback?: (this: void, selfVar: LibSetsSearchUISharedObject) => void,
  searchCanceledCallback?: (this: void, selfVar: LibSetsSearchUISharedObject) => void
) {
  this.searchDoneCallback = searchDoneCallback
  this.searchErrorCallback = searchErrorCallback
  this.searchCanceledCallback = searchCanceledCallback
}

sharedClass.ResetInternal = function (this: LibSetsSearchUISharedObject) {
  this.searchParams = undefined
}

sharedClass.ResetUI = function (this: LibSetsSearchUISharedObject) {}

sharedClass.Reset = function (this: LibSetsSearchUISharedObject) {
  this.ResetInternal()
  this.ResetUI()
  this.StartSearch(undefined, true)
}

sharedClass.ResetMultiSelectDropdown = function (
  this: LibSetsSearchUISharedObject,
  dropdownControl: SearchUIControl
) {
  const comboBox = getComboBoxFromDropdownControl(dropdownControl)
  if (comboBox.GetNumSelectedEntries() === 0) {
    return
  }
  comboBox.ClearAllSelections()
}

sharedClass.SelectAllAtMultiSelectDropdown = function (
  this: LibSetsSearchUISharedObject,
  dropdownControl: SearchUIControl
) {
  const comboBox = getComboBoxFromDropdownControl(dropdownControl)
  comboBox.ClearAllSelections()
  for (const [index] of ipairs(comboBox.GetItems())) {
    comboBox.SetSelected(index, true)
  }
}

sharedClass.SelectInvertMultiSelectDropdown = function (
  this: LibSetsSearchUISharedObject,
  dropdownControl: SearchUIControl
) {
  const comboBox = getComboBoxFromDropdownControl(dropdownControl)
  for (const [index, item] of ipairs(comboBox.GetItems())) {
    const isCurrentlySelected = comboBox.IsItemSelected(item)
    comboBox.SetSelected(index, !isCurrentlySelected)
  }
}

sharedClass.SelectMultiSelectDropdownEntries = function (
  this: LibSetsSearchUISharedObject,
  dropdownControl: SearchUIControl,
  entriesToSelect: unknown[],
  refreshResultsListAfterwards?: boolean
) {
  const refresh = refreshResultsListAfterwards ?? false
  if (ZO_IsTableEmpty(entriesToSelect)) {
    return
  }
  const comboBox = getComboBoxFromDropdownControl(dropdownControl)
  comboBox.ClearAllSelections()
  for (const [, filterType] of ipairs(entriesToSelect)) {
    const index = comboBox.GetIndexByEval((item) =>
      isItemFilterTypeMatching(item, asNumberOrString(filterType))
    )
    if (index !== undefined) {
      asSearchUIComboBox(dropdownControl.m_comboBox).SetSelected(index, true)
    }
  }

  if (refresh === true) {
    this.OnFilterChanged(dropdownControl)
    this.StartSearch(undefined, false)
  }
}

sharedClass.IsShown = function (this: LibSetsSearchUISharedObject): boolean {
  return !this.control.IsHidden()
}

sharedClass.ShowUI = function (this: LibSetsSearchUISharedObject) {
  if (this.IsShown()) {
    return
  }
  updateSetsInfoWithDataAndNames(this)

  this.control.SetHidden(false)

  CM.FireCallbacks(`${searchUIName}_IsShown`, this)
}

sharedClass.HideUI = function (this: LibSetsSearchUISharedObject) {
  if (!this.IsShown()) {
    return
  }
  this.control.SetHidden(true)

  CM.FireCallbacks(`${searchUIName}_IsHidden`, this)
}

sharedClass.Show = function (
  this: LibSetsSearchUISharedObject,
  searchParams?: LibSetsSearchParams,
  searchDoneCallback?: (this: void, selfVar: LibSetsSearchUISharedObject) => void,
  searchErrorCallback?: (this: void, selfVar: LibSetsSearchUISharedObject) => void,
  searchCanceledCallback?: (this: void, selfVar: LibSetsSearchUISharedObject) => void
) {
  if (searchParams !== undefined && !ZO_IsTableEmpty(searchParams)) {
    this.searchParams = searchParams
    this.ApplySearchParamsToUI()
  }

  this.SetSearchCallbacks(searchDoneCallback, searchErrorCallback, searchCanceledCallback)

  this.ShowUI()
}

sharedClass.ToggleUI = function (this: LibSetsSearchUISharedObject, slashOptions?: unknown) {
  if (this.IsShown()) {
    this.HideUI()
  } else {
    this.ShowUI(slashOptions)
  }
}

sharedClass.UpdateSearchButtonEnabledState = function (
  this: LibSetsSearchUISharedObject,
  isEnabled: boolean | undefined
) {
  if (isEnabled === undefined) {
    return
  }
  const searchButton = this.searchButton
  if (searchButton === undefined) {
    return
  }
  searchButton.SetEnabled(isEnabled)
  searchButton.SetMouseEnabled(isEnabled)
}
