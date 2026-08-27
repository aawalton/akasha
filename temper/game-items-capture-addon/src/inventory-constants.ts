import { registerCatalogDomain } from "@temper/catalog-core/registry"
import { getSavedVariables } from "@temper/catalog-core/saved-variables-accessor"
import { buildArmorTypes } from "./inventory-constants/armor-type"
import {
  buildDisplayCategories,
  buildDisplayCategoryLabels,
} from "./inventory-constants/display-category"
import { buildEquipTypes } from "./inventory-constants/equip-type"
import {
  buildItemFilterTypeLabels,
  buildItemFilterTypes,
} from "./inventory-constants/item-filter-type"
import { buildItemTypeLabels, buildItemTypes } from "./inventory-constants/item-type"
import { buildSpecializedItemTypes } from "./inventory-constants/specialized-item-type"
import { buildWeaponTypes } from "./inventory-constants/weapon-type"
export function collectInventoryConstantsCatalog(
  this: void,
  onComplete: (this: void) => void
): undefined {
  const savedVars = getSavedVariables()

  const itemTypes = buildItemTypes()
  const itemFilterTypes = buildItemFilterTypes()
  const specializedItemTypes = buildSpecializedItemTypes()
  const itemTypeLabels = buildItemTypeLabels(itemTypes)
  const itemFilterTypeLabels = buildItemFilterTypeLabels(itemFilterTypes)
  const displayCategories = buildDisplayCategories()
  const displayCategoryLabels = buildDisplayCategoryLabels(displayCategories)
  const equipTypes = buildEquipTypes()
  const weaponTypes = buildWeaponTypes()
  const armorTypes = buildArmorTypes()

  savedVars.inventoryConstantsCatalog = {
    itemTypes,
    itemFilterTypes,
    specializedItemTypes,
    displayCategories,
    itemTypeLabels,
    itemFilterTypeLabels,
    displayCategoryLabels,
    equipTypes,
    weaponTypes,
    armorTypes,
  }
  onComplete()
}
registerCatalogDomain({
  key: "inventoryConstantsCatalog",
  collect: collectInventoryConstantsCatalog,
})
