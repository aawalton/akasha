import { registerCatalogDomain } from "../../catalog-core/domain-registry/domain-registry.module.code.ts"
import { getSavedVariables } from "../../catalog-core/saved-variables-accessor/saved-variables-accessor.module.code.ts"
import { buildArmorTypes } from "../armor-type-constants/armor-type-constants.module.code.ts"
import { buildDisplayCategories } from "../display-category-constants/display-category-constants.module.code.ts"
import { buildEnumValueLabels } from "../enum-value-labels/enum-value-labels.module.code.ts"
import { buildEquipTypes } from "../equip-type-constants/equip-type-constants.module.code.ts"
import { buildItemFilterTypes } from "../item-filter-type-constants/item-filter-type-constants.module.code.ts"
import { buildItemTypes } from "../item-type-constants/item-type-constants.module.code.ts"
import { buildSpecializedItemTypes } from "../specialized-item-type-constants/specialized-item-type-constants.module.code.ts"
import { buildWeaponTypes } from "../weapon-type-constants/weapon-type-constants.module.code.ts"

export function collectInventoryConstantsCatalog(
  this: void,
  onComplete: (this: void) => void
): undefined {
  const savedVars = getSavedVariables()

  const itemTypes = buildItemTypes()
  const itemFilterTypes = buildItemFilterTypes()
  const displayCategories = buildDisplayCategories()

  savedVars.inventoryConstantsCatalog = {
    itemTypes,
    itemFilterTypes,
    specializedItemTypes: buildSpecializedItemTypes(),
    displayCategories,
    itemTypeLabels: buildEnumValueLabels(itemTypes, "SI_ITEMTYPE"),
    itemFilterTypeLabels: buildEnumValueLabels(itemFilterTypes, "SI_ITEMFILTERTYPE"),
    displayCategoryLabels: buildEnumValueLabels(displayCategories, "SI_ITEMTYPEDISPLAYCATEGORY"),
    equipTypes: buildEquipTypes(),
    weaponTypes: buildWeaponTypes(),
    armorTypes: buildArmorTypes(),
  }
  onComplete()
}
registerCatalogDomain({
  key: "inventoryConstantsCatalog",
  collect: collectInventoryConstantsCatalog,
})
