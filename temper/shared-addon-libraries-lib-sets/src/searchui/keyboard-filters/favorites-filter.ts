import { defaultMultiSelectSelectedText, setupFilterDropdown } from "../keyboard-filters-setup"
import { searchUI } from "../shared-state"
import type { FilterBuildContext } from "./filter-context"
import { LSM_defaultComboBoxOptions } from "./lsm-options"

const lib = LibSets
const getLocalizedText = lib.GetLocalizedText

const favoriteIconTexts = searchUI.favoriteIconTexts

export function buildFavoritesFilter(this: void, ctx: FilterBuildContext): undefined {
  const { self, filters, isLSMEnabled, onEnter, onExit } = ctx
  const filterTypeText = getLocalizedText("favorites")
  const favoritesDropdown = setupFilterDropdown({
    self,
    filters,
    control: self.favoritesFiltersControl,
    filterTypeText,
    multiSelectSelectedText: defaultMultiSelectSelectedText(filterTypeText),
    sortsItems: false,
    lsmOptions: LSM_defaultComboBoxOptions,
    isLSMEnabled,
    onEnter,
    onExit,
  })
  self.favoritesDropdown = favoritesDropdown
  const noFavEntry = favoritesDropdown.CreateItemEntry(GetString(SI_ARMORTYPE0))
  noFavEntry.filterType = 0
  noFavEntry.nameClean = "No favorite"
  favoritesDropdown.AddItem(noFavEntry)

  for (const favoriteCategoryData of lib.possibleSetSearchFavoriteCategories) {
    const favoriteCategory = favoriteCategoryData.category
    const favIcon = favoriteIconTexts[favoriteCategory] ?? ""
    const entry = favoritesDropdown.CreateItemEntry(
      `${favIcon} ${zo_strformat("<<C:1>>", favoriteCategory)}`
    )
    entry.filterType = favoriteCategory
    entry.nameClean = favoriteCategory
    favoritesDropdown.AddItem(entry, ZO_COMBOBOX_SUPPRESS_UPDATE)
  }
  favoritesDropdown.UpdateItems()
}
