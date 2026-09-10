import type { DisplayOrder } from "../../things/properties/display-order.number-property.types.ts"
import type { TemperThing } from "../../things/temper-thing.page-type.types.ts"
import type { ArmorTypes } from "./properties/armor-types.number-property.types.ts"
import type { EquipTypes } from "./properties/equip-types.number-property.types.ts"
import type { FilterTypes } from "./properties/filter-types.number-property.types.ts"
import type { FurnitureCategoryIds } from "./properties/furniture-category-ids.number-property.types.ts"
import type { FurnitureSubcategoryIds } from "./properties/furniture-subcategory-ids.number-property.types.ts"
import type { ItemNameContains } from "./properties/item-name-contains.text-property.ts"
import type { ItemTypes } from "./properties/item-types.number-property.types.ts"
import type { PriorityOrder } from "./properties/priority-order.number-property.types.ts"
import type { SpecializedItemTypes } from "./properties/specialized-item-types.number-property.types.ts"
import type { TraitTypeRange } from "./properties/trait-type-range.number-property.types.ts"
import type { WeaponTypes } from "./properties/weapon-types.number-property.types.ts"

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
