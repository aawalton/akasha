import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperBaseStat = {
  id: "01a0df46-e492-7e35-a44f-6d004d07a1c9",
  type: "page-type/page-type",
  slug: "temper-base-stat",
  definition: "a stat every character starts with before race, class or gear says anything",
  extends: ["page-type/temper-thing"],
  parts: ["relation-property/base-stat-metric"],
  properties: [
    { pageProperty: "relation-property/base-stat-metric", required: true, many: false },
    { pageProperty: "text-property/metric-effect-type", required: true, many: false },
    { pageProperty: "number-property/effect-value", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A base stat is one stat moved by one flat amount.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every character starts with every base stat, in the base source category.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A base stat's slug is the slug of the stat it moves.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
