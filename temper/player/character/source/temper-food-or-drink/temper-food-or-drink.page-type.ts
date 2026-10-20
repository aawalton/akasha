import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperFoodOrDrink = {
  id: "01a0df76-1665-75ef-8534-195cf1c4fa76",
  type: "page-type/page-type",
  slug: "temper-food-or-drink",
  definition: "a food or drink a character takes for its boons, or taking none",
  extends: ["page-type/temper-thing"],
  parts: [
    "text-property/food-or-drink-kind",
    "number-property/consumable-seconds",
    "number-property/food-or-drink-item-ids",
    "text-property/food-or-drink-status",
  ],
  properties: [
    { pageProperty: "text-property/food-or-drink-kind", required: true, many: false },
    { pageProperty: "number-property/item-id", required: true, many: false },
    {
      pageProperty: "number-property/food-or-drink-item-ids",
      required: false,
      many: true,
      maxCount: null,
    },
    { pageProperty: "number-property/ability-id", required: false, many: false },
    { pageProperty: "number-property/consumable-seconds", required: true, many: false },
    { pageProperty: "text-property/item-level", required: false, many: false },
    {
      pageProperty: "record-property/source-effects",
      required: false,
      many: true,
      maxCount: null,
    },
    { pageProperty: "text-property/food-or-drink-status", required: false, many: false },
    { pageProperty: "number-property/hash-place", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A food or drink's title is the name its effect source shows.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A food or drink's icon is the path the game gives its art.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A food or drink's hash place is the index a build hash has for it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "One food or drink holds every item whose buff reads the same.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A food or drink whose buff's game ability is unknown states no ability.",
    },
  ],
  types: "ts",
  schema: "jsonl",
  hashIndexed: ["hashPlace"],
  createdAt: "2026-09-26T20:44:13.285Z",
  updatedAt: "2026-10-20T15:55:44.875Z",
} as const satisfies PageType
