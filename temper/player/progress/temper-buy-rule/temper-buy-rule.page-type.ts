import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperBuyRule = {
  id: "01a0d8c2-d1e0-71d4-925b-ccd78a3cee1b",
  type: "page-type/page-type",
  slug: "temper-buy-rule",
  definition: "a rule a player has in force over how many of one item to keep bought",
  extends: ["page-type/temper-progress-thing"],
  properties: [
    { pageProperty: "relation-property/account-page", required: true, many: false },
    { pageProperty: "number-property/item-id", required: true, many: false },
    { pageProperty: "text-property/item-name", required: true, many: false },
    { pageProperty: "number-property/display-order", required: true, many: false },
    { pageProperty: "boolean-property/active", required: true, many: false },
    { pageProperty: "instant-property/updated-at", required: true, many: false },
    { pageProperty: "boolean-property/rule-locked", required: false, many: false },
    { pageProperty: "relation-property/goal", required: false, many: false },
    { pageProperty: "number-property/buy-target-quantity", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A rule here names its item by the item's number in the game and by its name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Where two rules name one item, the rule later in display order acts.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A rule here states no source, since a merchant is the only source it buys from.",
    },
  ],
  types: "ts",
  schema: "jsonl",
  parts: ["number-property/buy-target-quantity"],
} as const satisfies PageType
