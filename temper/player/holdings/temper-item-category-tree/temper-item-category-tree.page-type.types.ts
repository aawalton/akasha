import type { ArmorTypes } from "akasha/temper/player/holdings/temper-item-category-tree/properties/armor-types.number-property.types.ts"
import type { EquipTypes } from "akasha/temper/player/holdings/temper-item-category-tree/properties/equip-types.number-property.types.ts"
import type { FilterTypes } from "akasha/temper/player/holdings/temper-item-category-tree/properties/filter-types.number-property.types.ts"
import type { FurnitureCategoryIds } from "akasha/temper/player/holdings/temper-item-category-tree/properties/furniture-category-ids.number-property.types.ts"
import type { FurnitureSubcategoryIds } from "akasha/temper/player/holdings/temper-item-category-tree/properties/furniture-subcategory-ids.number-property.types.ts"
import type { ItemCategoryParent } from "akasha/temper/player/holdings/temper-item-category-tree/properties/item-category-parent.relation-property.types.ts"
import type { ItemNameContains } from "akasha/temper/player/holdings/temper-item-category-tree/properties/item-name-contains.text-property.types.ts"
import type { ItemTypes } from "akasha/temper/player/holdings/temper-item-category-tree/properties/item-types.number-property.types.ts"
import type { PriorityOrder } from "akasha/temper/player/holdings/temper-item-category-tree/properties/priority-order.number-property.types.ts"
import type { SpecializedItemTypes } from "akasha/temper/player/holdings/temper-item-category-tree/properties/specialized-item-types.number-property.types.ts"
import type { TraitTypeRange } from "akasha/temper/player/holdings/temper-item-category-tree/properties/trait-type-range.number-property.types.ts"
import type { WeaponTypes } from "akasha/temper/player/holdings/temper-item-category-tree/properties/weapon-types.number-property.types.ts"
import type { DisplayOrder } from "akasha/temper/thing/properties/display-order.number-property.types.ts"
import type { TemperThing } from "akasha/temper/thing/temper-thing.page-type.types.ts"

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
  parent?: ItemCategoryParent
}
