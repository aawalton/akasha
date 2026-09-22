import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperRuleGoal = {
  id: "01a071f5-62e6-7b98-ab84-2e3e9f91b5e3",
  type: "page-type/page-type",
  slug: "temper-rule-goal",
  definition: "a player's reason for keeping an item",
  extends: ["page-type/temper-progress-thing"],
  properties: [
    { pageProperty: "text-property/description", required: true, many: false },
    { pageProperty: "number-property/display-order", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The slug is the goal an item rule writes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A goal earlier in the display order wins where two goals want one item.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A rule wanting the item for nothing states no goal.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
