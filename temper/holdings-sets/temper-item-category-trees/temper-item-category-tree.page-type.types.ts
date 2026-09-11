import type { ArmorTypes } from "akasha/temper/holdings-sets/temper-item-category-trees/properties/armor-types.number-property.types.ts"
import type { EquipTypes } from "akasha/temper/holdings-sets/temper-item-category-trees/properties/equip-types.number-property.types.ts"
import type { FilterTypes } from "akasha/temper/holdings-sets/temper-item-category-trees/properties/filter-types.number-property.types.ts"
import type { FurnitureCategoryIds } from "akasha/temper/holdings-sets/temper-item-category-trees/properties/furniture-category-ids.number-property.types.ts"
import type { FurnitureSubcategoryIds } from "akasha/temper/holdings-sets/temper-item-category-trees/properties/furniture-subcategory-ids.number-property.types.ts"
import type { ItemNameContains } from "akasha/temper/holdings-sets/temper-item-category-trees/properties/item-name-contains.text-property.types.ts"
import type { ItemTypes } from "akasha/temper/holdings-sets/temper-item-category-trees/properties/item-types.number-property.types.ts"
import type { PriorityOrder } from "akasha/temper/holdings-sets/temper-item-category-trees/properties/priority-order.number-property.types.ts"
import type { SpecializedItemTypes } from "akasha/temper/holdings-sets/temper-item-category-trees/properties/specialized-item-types.number-property.types.ts"
import type { TraitTypeRange } from "akasha/temper/holdings-sets/temper-item-category-trees/properties/trait-type-range.number-property.types.ts"
import type { WeaponTypes } from "akasha/temper/holdings-sets/temper-item-category-trees/properties/weapon-types.number-property.types.ts"
import type { DisplayOrder } from "akasha/temper/things/properties/display-order.number-property.types.ts"
import type { TemperThing } from "akasha/temper/things/temper-thing.page-type.types.ts"

export type TemperItemCategoryTree = TemperThing & {
  displayOrder: DisplayOrder
  armorTypes?: ArmorTypes
  equipTypes?: EquipTypes
  filterTypes?: FilterTypes
  furnitureCategoryIds?: FurnitureCategoryIds
  furnitureSubcategoryIds?: FurnitureSubcategoryIds
  itemTypes?: ItemTypes
  specializedItemTypes?: SpecializedItemTypes
  traitTypeRange?: TraitTypeRange
  weaponTypes?: WeaponTypes
  priorityOrder?: PriorityOrder
  itemNameContains?: ItemNameContains
}
