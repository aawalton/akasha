import { asNumber, asStringOpt, asStrRecord } from "../../casts"
import { defaultMultiSelectSelectedText, setupFilterDropdown } from "../keyboard-filters-setup"
import type { FilterBuildContext } from "./filter-context"
import { LSM_defaultComboBoxOptions } from "./lsm-options"
import { SORT_BY_ALL, sortFilterComboBox } from "./sorting"

const lib = LibSets
const getLocalizedText = lib.GetLocalizedText
const lib_CleanDLCTimeStamp = lib.CleanDLCTimeStamp

const LSM_comboBoxOptionsDLCID = asStrRecord(ZO_ShallowTableCopy(LSM_defaultComboBoxOptions))

export function buildDlcFilter(this: void, ctx: FilterBuildContext): undefined {
  const { self, filters, isLSMEnabled, onEnter, onExit } = ctx
  const lsmDropdowns = self.LSM_Dropdowns
  const dropdownToParamName = self.multiSelectFilterDropdownToSearchParamName
  const filterTypeText = getLocalizedText("dlc")
  const DLCIdDropdown = setupFilterDropdown({
    self,
    filters,
    control: self.DCLIdFiltersControl,
    filterTypeText,
    multiSelectSelectedText: defaultMultiSelectSelectedText(filterTypeText),
    sortsItems: true,
    lsmOptions: LSM_comboBoxOptionsDLCID,
    isLSMEnabled: false,
    onEnter,
    onExit,
  })
  self.DLCIdFiltersDropdown = DLCIdDropdown
  if (isLSMEnabled && lsmDropdowns !== undefined) {
    LSM_comboBoxOptionsDLCID.customFilterFunc = function (
      this: void,
      p_item: SearchUIComboBoxItem,
      p_filterString: string
    ): boolean {
      let found = false
      const name = p_item.label ?? p_item.name
      const tooltip = p_item.tooltipText
      const filterStringLower = zo_strlower(p_filterString)
      if (name !== undefined && name !== "") {
        found = string.find(zo_strlower(name), filterStringLower)[0] !== undefined
      }
      if (!found && tooltip !== undefined && tooltip !== "") {
        found = string.find(zo_strlower(tooltip), filterStringLower)[0] !== undefined
      }
      return found
    }

    const getCurrentDLCIDSortKey = (): string =>
      lib.svData?.setSearchDLCDropdownSortBy === 2 ? "releaseDateTimeStamp" : "nameClean"
    const DLCIDCustomSortFunc = function (
      this: void,
      _item1: SearchUIComboBoxItem,
      _item2: SearchUIComboBoxItem,
      comboBoxObject: SearchUIComboBox
    ): undefined {
      const sortKey = getCurrentDLCIDSortKey()
      sortFilterComboBox(comboBoxObject, sortKey, false)
    }
    LSM_comboBoxOptionsDLCID.customSortKeys = SORT_BY_ALL
    LSM_comboBoxOptionsDLCID.customSortKey = getCurrentDLCIDSortKey()
    LSM_comboBoxOptionsDLCID.customSortFunc = DLCIDCustomSortFunc
    LSM_comboBoxOptionsDLCID.enableSort = true
    const dlcParamName = dropdownToParamName.get(self.DCLIdFiltersControl)
    if (dlcParamName !== undefined) {
      lsmDropdowns[dlcParamName] = AddCustomScrollableComboBoxDropdownMenu(
        filters,
        self.DCLIdFiltersControl,
        LSM_comboBoxOptionsDLCID
      )
    }
  }

  for (const [DLCId, isValid] of pairs(lib.allowedDLCIds)) {
    if (isValid === true) {
      const [dlcName, releaseDateTimestamp] = lib.GetDLCInfo(asNumber(DLCId))
      const entry = DLCIdDropdown.CreateItemEntry(dlcName)
      entry.filterType = asNumber(DLCId)
      entry.nameClean = dlcName
      entry.releaseDateTimeStamp = releaseDateTimestamp
      const [, cleanedReleaseDate] = lib_CleanDLCTimeStamp(releaseDateTimestamp, true)
      entry.tooltipText = asStringOpt(cleanedReleaseDate)
      DLCIdDropdown.AddItem(entry, ZO_COMBOBOX_SUPPRESS_UPDATE)
    }
  }
  DLCIdDropdown._sortFunc = function (this: void): undefined {}

  DLCIdDropdown.SetSortsItems(true)
}
