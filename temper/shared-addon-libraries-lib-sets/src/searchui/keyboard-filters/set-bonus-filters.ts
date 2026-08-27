import { asString } from "../../casts"
import { defaultMultiSelectSelectedText, setupFilterDropdown } from "../keyboard-filters-setup"
import { searchUI } from "../shared-state"
import type { FilterBuildContext } from "./filter-context"
import { LSM_defaultComboBoxOptions } from "./lsm-options"
import { sortFilterComboBox } from "./sorting"

const lib = LibSets
const getLocalizedText = lib.GetLocalizedText

const MAX_NUM_SET_BONUS = searchUI.MAX_NUM_SET_BONUS

export function buildEnchantmentSearchCategoryFilter(
  this: void,
  ctx: FilterBuildContext
): undefined {
  const { self, filters, isLSMEnabled, onEnter, onExit } = ctx
  const filterTypeText = getLocalizedText("enchantmentSearchCategory")
  const enchantmentSearchCategoryTypeDropdown = setupFilterDropdown({
    self,
    filters,
    control: self.enchantSearchCategoryTypeFiltersControl,
    filterTypeText,
    multiSelectSelectedText: defaultMultiSelectSelectedText(filterTypeText),
    sortsItems: true,
    lsmOptions: LSM_defaultComboBoxOptions,
    isLSMEnabled,
    onEnter,
    onExit,
  })
  self.enchantSearchCategoryTypeFiltersDropdown = enchantmentSearchCategoryTypeDropdown
  for (const [enchantSearchCategoryType, isValid] of pairs(lib.enchantSearchCategoryTypesValid)) {
    if (isValid === true && enchantSearchCategoryType !== "all") {
      const enchantmentSearchCategoryName = GetString(
        "SI_ENCHANTMENTSEARCHCATEGORYTYPE",
        asString(enchantSearchCategoryType)
      )
      if (enchantmentSearchCategoryName !== "") {
        const entry = enchantmentSearchCategoryTypeDropdown.CreateItemEntry(
          enchantmentSearchCategoryName
        )
        entry.filterType = asString(enchantSearchCategoryType)
        entry.nameClean = enchantmentSearchCategoryName
        enchantmentSearchCategoryTypeDropdown.AddItem(entry, ZO_COMBOBOX_SUPPRESS_UPDATE)
      }
    }
  }
  sortFilterComboBox(enchantmentSearchCategoryTypeDropdown, "nameClean")
}

export function buildNumBonusFilter(this: void, ctx: FilterBuildContext): undefined {
  const { self, filters, isLSMEnabled, onEnter, onExit } = ctx
  const filterTypeText = getLocalizedText("numBonuses")
  const numBonusDropdown = setupFilterDropdown({
    self,
    filters,
    control: self.numBonusFiltersControl,
    filterTypeText,
    multiSelectSelectedText: defaultMultiSelectSelectedText(filterTypeText),
    sortsItems: true,
    lsmOptions: LSM_defaultComboBoxOptions,
    isLSMEnabled,
    onEnter,
    onExit,
  })
  self.numBonusFiltersDropdown = numBonusDropdown
  for (let numBonus = 1; numBonus <= MAX_NUM_SET_BONUS; numBonus += 1) {
    const entry = numBonusDropdown.CreateItemEntry(tostring(numBonus))
    entry.filterType = numBonus
    numBonusDropdown.AddItem(entry, ZO_COMBOBOX_SUPPRESS_UPDATE)
  }
  numBonusDropdown.UpdateItems()
}
