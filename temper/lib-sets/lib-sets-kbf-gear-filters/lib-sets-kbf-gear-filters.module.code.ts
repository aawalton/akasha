import { asNumber } from "../lib-sets-casts/lib-sets-casts.module.code.ts"
import type { FilterBuildContext } from "../lib-sets-kbf-filter-context/lib-sets-kbf-filter-context.module.code.ts"
import { LSM_DEFAULT_COMBO_BOX_OPTIONS } from "../lib-sets-kbf-lsm-options/lib-sets-kbf-lsm-options.module.code.ts"
import { sortFilterComboBox } from "../lib-sets-kbf-sorting/lib-sets-kbf-sorting.module.code.ts"
import {
  defaultMultiSelectSelectedText,
  setupFilterDropdown,
} from "../lib-sets-search-ui-keyboard-filters-setup/lib-sets-search-ui-keyboard-filters-setup.module.code.ts"

const lib = LibSets
const zoitf = zo_iconTextFormat
const getLocalizedText = lib.GetLocalizedText
const buildSetTypeInfo = lib.buildSetTypeInfo
const getEquipSlotTexture = lib.GetEquipSlotTexture
const getArmorTypeTexture = lib.GetArmorTypeTexture
const getWeaponTypeTexture = lib.GetWeaponTypeTexture

export function buildSetTypeFilter(this: void, ctx: FilterBuildContext): undefined {
  const { self, filters, isLSMEnabled, onEnter, onExit } = ctx
  const filterTypeText = getLocalizedText("setType")
  const setTypeDropdown = setupFilterDropdown({
    self,
    filters,
    control: self.setTypeFiltersControl,
    filterTypeText,
    multiSelectSelectedText: defaultMultiSelectSelectedText(filterTypeText),
    sortsItems: false,
    lsmOptions: LSM_DEFAULT_COMBO_BOX_OPTIONS,
    isLSMEnabled,
    onEnter,
    onExit,
  })
  self.setTypeFiltersDropdown = setTypeDropdown
  for (const [setType, isValid] of pairs(lib.allowedSetTypes)) {
    if (isValid === true) {
      const [setTypeName, setTypeTexture] = buildSetTypeInfo({ setType: asNumber(setType) }, true)
      let setTypeNameStr = setTypeName
      if (setTypeTexture !== undefined) {
        setTypeNameStr = zoitf(setTypeTexture, 24, 24, setTypeName, undefined)
      }
      const entry = setTypeDropdown.CreateItemEntry(setTypeNameStr)
      entry.filterType = asNumber(setType)
      entry.nameClean = setTypeName
      setTypeDropdown.AddItem(entry, ZO_COMBOBOX_SUPPRESS_UPDATE)
    }
  }
  sortFilterComboBox(setTypeDropdown, "nameClean")
}

export function buildArmorTypeFilter(this: void, ctx: FilterBuildContext): undefined {
  const { self, filters, isLSMEnabled, onEnter, onExit } = ctx
  const filterTypeText = getLocalizedText("armorType")
  const armorTypeDropdown = setupFilterDropdown({
    self,
    filters,
    control: self.armorTypeFiltersControl,
    filterTypeText,
    multiSelectSelectedText: SI_ITEM_SETS_BOOK_APPAREL_TYPES_DROPDOWN_TEXT,
    sortsItems: false,
    lsmOptions: LSM_DEFAULT_COMBO_BOX_OPTIONS,
    isLSMEnabled,
    onEnter,
    onExit,
  })
  self.armorTypeFiltersDropdown = armorTypeDropdown
  for (const [armorType] of pairs(lib.armorTypesSets)) {
    const [, armorTypeNameStr, armorTypeName] = getArmorTypeTexture(asNumber(armorType))
    const entry = armorTypeDropdown.CreateItemEntry(armorTypeNameStr)
    entry.filterType = asNumber(armorType)
    entry.nameClean = armorTypeName
    armorTypeDropdown.AddItem(entry, ZO_COMBOBOX_SUPPRESS_UPDATE)
  }
  sortFilterComboBox(armorTypeDropdown, "nameClean")
}

export function buildWeaponTypeFilter(this: void, ctx: FilterBuildContext): undefined {
  const { self, filters, isLSMEnabled, onEnter, onExit } = ctx
  const filterTypeText = getLocalizedText("weaponType")
  const weaponTypeDropdown = setupFilterDropdown({
    self,
    filters,
    control: self.weaponTypeFiltersControl,
    filterTypeText,
    multiSelectSelectedText: SI_ITEM_SETS_BOOK_WEAPON_TYPES_DROPDOWN_TEXT,
    sortsItems: false,
    lsmOptions: LSM_DEFAULT_COMBO_BOX_OPTIONS,
    isLSMEnabled,
    onEnter,
    onExit,
  })
  self.weaponTypeFiltersDropdown = weaponTypeDropdown
  for (const [weaponType] of pairs(lib.weaponTypesSets)) {
    const [, weaponTypeNameStr, weaponTypeName] = getWeaponTypeTexture(asNumber(weaponType))
    const entry = weaponTypeDropdown.CreateItemEntry(weaponTypeNameStr ?? "")
    entry.filterType = asNumber(weaponType)
    entry.nameClean = weaponTypeName
    weaponTypeDropdown.AddItem(entry, ZO_COMBOBOX_SUPPRESS_UPDATE)
  }
  sortFilterComboBox(weaponTypeDropdown, "nameClean")
}

export function buildEquipmentTypeFilter(this: void, ctx: FilterBuildContext): undefined {
  const { self, filters, isLSMEnabled, onEnter, onExit } = ctx
  const filterTypeText = getLocalizedText("equipmentType")
  const equipmentTypeDropdown = setupFilterDropdown({
    self,
    filters,
    control: self.equipmentTypeFiltersControl,
    filterTypeText,
    multiSelectSelectedText: defaultMultiSelectSelectedText(filterTypeText),
    sortsItems: false,
    lsmOptions: LSM_DEFAULT_COMBO_BOX_OPTIONS,
    isLSMEnabled,
    onEnter,
    onExit,
  })
  self.equipmentTypeFiltersDropdown = equipmentTypeDropdown
  for (const [equipType, isValid] of pairs(lib.equipTypesValid)) {
    if (isValid === true) {
      const [, equipTypeNameStr, equipTypeName] = getEquipSlotTexture(asNumber(equipType))
      const entry = equipmentTypeDropdown.CreateItemEntry(equipTypeNameStr)
      entry.filterType = asNumber(equipType)
      entry.nameClean = equipTypeName
      equipmentTypeDropdown.AddItem(entry, ZO_COMBOBOX_SUPPRESS_UPDATE)
    }
  }
  sortFilterComboBox(equipmentTypeDropdown, "nameClean")
}
