import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperAttribute = {
  id: "01a0df4d-9bd9-7911-8b81-1b30b84f24e0",
  type: "page-type/page-type",
  slug: "temper-attribute",
  definition: "a pool a character spends attribute points on, and what one point buys",
  extends: ["page-type/temper-thing"],
  parts: ["relation-property/source-effect-metric"],
  properties: [
    { pageProperty: "relation-property/source-effect-metric", required: true, many: false },
    { pageProperty: "number-property/effect-value", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An attribute point raises one stat by one flat amount.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An attribute's title is the name its effect source shows.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
