import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperItemRule = {
  id: "01a0d8c2-d1e1-7eb6-8142-715519387e65",
  type: "page-type/page-type",
  slug: "temper-item-rule",
  definition: "a rule a player has in force over one item they carry",
  extends: ["page-type/temper-rule"],
  properties: [
    { pageProperty: "relation-property/account-page", required: true, many: false },
    { pageProperty: "number-property/item-id", required: true, many: false },
    { pageProperty: "text-property/item-name", required: true, many: false },
    { pageProperty: "number-property/display-order", required: true, many: false },
    { pageProperty: "relation-property/action", required: true, many: false },
    { pageProperty: "boolean-property/active", required: true, many: false },
    { pageProperty: "instant-property/updated-at", required: true, many: false },
    { pageProperty: "boolean-property/rule-locked", required: false, many: false },
    { pageProperty: "page-property-entry/destination-chain", required: false, many: false },
    { pageProperty: "number-property/stock-quantity", required: false, many: false },
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
      statement: "A rule states a destination or a chain of destinations, and never both.",
    },
  ],
  types: "ts",
  schema: "jsonl",
  parts: ["number-property/stock-quantity"],
} as const satisfies PageType
