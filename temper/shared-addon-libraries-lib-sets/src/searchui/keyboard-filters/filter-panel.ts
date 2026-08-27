import { getKeyboardSearchUIClass } from "../keyboard-class"
import {
  onFilterDropdownEntryMouseEnterCallback,
  onFilterDropdownEntryMouseExitCallback,
} from "../keyboard-init"
import { buildDlcFilter } from "./dlc-filter"
import {
  buildDropLocationFilter,
  buildDropMechanicFilter,
  buildDropZoneFilter,
} from "./drop-filters"
import { buildFavoritesFilter } from "./favorites-filter"
import type { FilterBuildContext } from "./filter-context"
import {
  buildArmorTypeFilter,
  buildEquipmentTypeFilter,
  buildSetTypeFilter,
  buildWeaponTypeFilter,
} from "./gear-filters"
import { buildEnchantmentSearchCategoryFilter, buildNumBonusFilter } from "./set-bonus-filters"

const lib = LibSets
const checkLSM = lib.CheckLSM

const keyboardClass = getKeyboardSearchUIClass()

keyboardClass.InitializeFilters = function (this: LibSetsSearchUIKeyboardObject): undefined {
  const isLSMEnabled = checkLSM()
  if (isLSMEnabled) {
    this.LSM_Dropdowns = {}
  }

  const ctx: FilterBuildContext = {
    self: this,
    filters: this.filtersControl,
    isLSMEnabled,
    onEnter: onFilterDropdownEntryMouseEnterCallback,
    onExit: onFilterDropdownEntryMouseExitCallback,
  }

  this.UpdateSearchButtonEnabledState(false)

  buildSetTypeFilter(ctx)
  buildArmorTypeFilter(ctx)
  buildWeaponTypeFilter(ctx)
  buildEquipmentTypeFilter(ctx)
  buildDlcFilter(ctx)
  buildEnchantmentSearchCategoryFilter(ctx)
  buildFavoritesFilter(ctx)
  buildNumBonusFilter(ctx)
  buildDropZoneFilter(ctx)
  buildDropMechanicFilter(ctx)
  buildDropLocationFilter(ctx)
}
