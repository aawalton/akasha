import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperItemCategoryTree = {
  id: "01a05fcb-fd33-7e42-b0df-2c021ee52730",
  type: "page-type/page-type",
  slug: "temper-item-category-tree",
  definition: "a branch of the tree sorting an inventory",
  extends: ["page-type/temper-thing"],
  parts: [
    "number-property/armor-types",
    "number-property/equip-types",
    "number-property/filter-types",
    "number-property/furniture-category-ids",
    "number-property/furniture-subcategory-ids",
    "number-property/item-types",
    "number-property/priority-order",
    "number-property/specialized-item-types",
    "number-property/trait-type-range",
    "number-property/weapon-types",
    "text-property/item-name-contains",
    "relation-property/item-category-parent",
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
    { pageProperty: "relation-property/item-category-parent", required: false, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A branch takes an item that answers to every test the branch states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A branch naming no parent is a root.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The branch stating no test takes every item, and every rule may name it.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
