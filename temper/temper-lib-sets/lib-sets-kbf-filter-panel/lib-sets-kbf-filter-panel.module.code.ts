import { buildDlcFilter } from "../lib-sets-kbf-dlc-filter/lib-sets-kbf-dlc-filter.module.code.ts"
import {
  buildDropLocationFilter,
  buildDropMechanicFilter,
  buildDropZoneFilter,
} from "../lib-sets-kbf-drop-filters/lib-sets-kbf-drop-filters.module.code.ts"
import { buildFavoritesFilter } from "../lib-sets-kbf-favorites-filter/lib-sets-kbf-favorites-filter.module.code.ts"
import type { FilterBuildContext } from "../lib-sets-kbf-filter-context/lib-sets-kbf-filter-context.module.code.ts"
import {
  buildArmorTypeFilter,
  buildEquipmentTypeFilter,
  buildSetTypeFilter,
  buildWeaponTypeFilter,
} from "../lib-sets-kbf-gear-filters/lib-sets-kbf-gear-filters.module.code.ts"
import {
  buildEnchantmentSearchCategoryFilter,
  buildNumBonusFilter,
} from "../lib-sets-kbf-set-bonus-filters/lib-sets-kbf-set-bonus-filters.module.code.ts"
import { getKeyboardSearchUIClass } from "../lib-sets-search-ui-keyboard-class/lib-sets-search-ui-keyboard-class.module.code.ts"
import {
  onFilterDropdownEntryMouseEnterCallback,
  onFilterDropdownEntryMouseExitCallback,
} from "../lib-sets-search-ui-keyboard-init/lib-sets-search-ui-keyboard-init.module.code.ts"

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
