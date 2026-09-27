import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperBuyAction = {
  id: "01a0e26e-81e8-733a-ad6e-2c287252b8b9",
  type: "page-type/page-type",
  slug: "temper-buy-action",
  definition: "a thing a buy rule does to the item the rule names",
  extends: ["page-type/temper-progress-thing"],
  properties: [
    { pageProperty: "text-property/key", required: true, many: false },
    { pageProperty: "number-property/display-order", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A buy action is no item action, so no item rule can name one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The key is the action the addon's confirmation settings write.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The title is spelled as the game spells the action.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
