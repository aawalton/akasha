import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperItemAction = {
  id: "01a071e1-92d5-7458-b0c0-499ac75aeb8b",
  type: "page-type/page-type",
  slug: "temper-item-action",
  definition: "a thing an item rule does to an item the rule matches",
  extends: ["page-type/temper-progress-thing"],
  properties: [{ pageProperty: "text-property/description", required: true, many: false }],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The slug is the action an item rule writes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The title is the action a reader is shown.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
