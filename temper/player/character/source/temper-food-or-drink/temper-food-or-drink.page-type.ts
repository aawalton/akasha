import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperFoodOrDrink = {
  id: "01a0df76-1665-75ef-8534-195cf1c4fa76",
  type: "page-type/page-type",
  slug: "temper-food-or-drink",
  definition: "a food or drink a character takes for its boons, or taking none",
  extends: ["page-type/temper-thing"],
  parts: ["text-property/food-or-drink-kind", "number-property/consumable-seconds"],
  properties: [
    { pageProperty: "text-property/food-or-drink-kind", required: true, many: false },
    { pageProperty: "number-property/item-id", required: true, many: false },
    { pageProperty: "number-property/ability-id", required: true, many: false },
    { pageProperty: "number-property/consumable-seconds", required: true, many: false },
    { pageProperty: "text-property/item-level", required: false, many: false },
    {
      pageProperty: "record-property/source-effects",
      required: false,
      many: true,
      maxCount: null,
    },
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
  ],
  types: "ts",
  schema: "jsonl",
  hashIndexed: ["hashPlace"],
} as const satisfies PageType
