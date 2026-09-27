import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperItemAction = {
  id: "01a071e1-92d5-7458-b0c0-499ac75aeb8b",
  type: "page-type/page-type",
  slug: "temper-item-action",
  definition: "a thing an item rule does to an item the rule matches",
  extends: ["page-type/temper-progress-thing"],
  parts: ["module/item-action-pages"],
  properties: [
    { pageProperty: "text-property/description", required: true, many: false },
    { pageProperty: "text-property/key", required: true, many: false },
    { pageProperty: "number-property/display-order", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The slug is the action an item rule writes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The title is the action a reader is shown.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A title is spelled as the game spells the action, where the game spells it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The key is the slug, so the pages are read as keyed titles.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
