import type { PageType } from "@akasha/pages/page-type"
import type { TemperThing } from "../../things/temper-thing.page-type.types.ts"
import type { ArmorTypes } from "./properties/armor-types.number-property.ts"
import type { EquipTypes } from "./properties/equip-types.number-property.ts"
import type { FilterTypes } from "./properties/filter-types.number-property.ts"
import type { FurnitureCategoryIds } from "./properties/furniture-category-ids.number-property.ts"
import type { FurnitureSubcategoryIds } from "./properties/furniture-subcategory-ids.number-property.ts"
import type { ItemNameContains } from "./properties/item-name-contains.text-property.ts"
import type { ItemTypes } from "./properties/item-types.number-property.ts"
import type { PriorityOrder } from "./properties/priority-order.number-property.ts"
import type { SpecializedItemTypes } from "./properties/specialized-item-types.number-property.ts"
import type { TraitTypeRange } from "./properties/trait-type-range.number-property.ts"
import type { WeaponTypes } from "./properties/weapon-types.number-property.ts"

export type TemperItemCategoryTree = TemperThing & {
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

export const temperItemCategoryTree = {
  id: "01a05fcb-fd33-7e42-b0df-2c021ee52730",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "temper-item-category-tree",
  definition: "a branch of the tree an inventory is sorted into",
  pluralSlug: "temper-item-category-trees",
  extends: ["page-type/temper-thing"],
  parts: [
    "number-property/armor-types",
    "number-property/equip-types",
    "number-property/filter-types",
    "number-property/furniture-category-ids",
    "number-property/furniture-subcategory-ids",
    "number-property/item-types",
    "number-property/specialized-item-types",
    "number-property/trait-type-range",
    "number-property/weapon-types",
    "number-property/priority-order",
    "text-property/item-name-contains",
  ],
  properties: [
    { pageProperty: "number-property/display-order", required: true, many: false },
    {
      pageProperty: "number-property/armor-types",
      required: false,
      many: true,
      maxCount: null,
    },
    {
      pageProperty: "number-property/equip-types",
      required: false,
      many: true,
      maxCount: null,
    },
    {
      pageProperty: "number-property/filter-types",
      required: false,
      many: true,
      maxCount: null,
    },
    {
      pageProperty: "number-property/furniture-category-ids",
      required: false,
      many: true,
      maxCount: null,
    },
    {
      pageProperty: "number-property/furniture-subcategory-ids",
      required: false,
      many: true,
      maxCount: null,
    },
    { pageProperty: "number-property/item-types", required: false, many: true, maxCount: null },
    {
      pageProperty: "number-property/specialized-item-types",
      required: false,
      many: true,
      maxCount: null,
    },
    {
      pageProperty: "number-property/trait-type-range",
      required: false,
      many: true,
      maxCount: null,
    },
    {
      pageProperty: "number-property/weapon-types",
      required: false,
      many: true,
      maxCount: null,
    },
    { pageProperty: "number-property/priority-order", required: false, many: false },
    { pageProperty: "text-property/item-name-contains", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A branch takes an item that answers to every test the branch states.",
    },
    {
      invariantKind: "departure",
      statement: "A branch naming no parent is a root.",
    },
  ],
} as const satisfies PageType
