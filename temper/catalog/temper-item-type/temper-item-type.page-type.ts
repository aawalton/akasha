import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperItemType = {
  id: "01a0e108-f721-7d6e-bcf7-05c2c0c279ad",
  type: "page-type/page-type",
  slug: "temper-item-type",
  definition: "a sort of item the game names by an ITEMTYPE number",
  extends: ["page-type/temper-catalog-thing"],
  parts: ["number-property/eso-item-type-number"],
  properties: [
    { pageProperty: "number-property/eso-item-type-number", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A sort of item's number is the value of its ITEMTYPE constant.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A sort of item is offered under its page's title.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A sort of item no filter offers has no page.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
