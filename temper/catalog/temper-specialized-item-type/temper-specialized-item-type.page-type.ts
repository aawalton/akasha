import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperSpecializedItemType = {
  id: "01a0e10b-e4c6-74e8-9d5b-3cb6c399bae5",
  type: "page-type/page-type",
  slug: "temper-specialized-item-type",
  definition: "a narrower sort of item the game names by a SPECIALIZED_ITEMTYPE number",
  extends: ["page-type/temper-catalog-thing"],
  parts: ["number-property/eso-specialized-item-type-number"],
  properties: [
    {
      pageProperty: "number-property/eso-specialized-item-type-number",
      required: true,
      many: false,
    },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A narrower sort's number is the value of its SPECIALIZED_ITEMTYPE constant.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A narrower sort is offered under its page's title.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A narrower sort no filter offers has no page.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
