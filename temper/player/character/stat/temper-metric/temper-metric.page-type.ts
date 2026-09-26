import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperMetric = {
  id: "01a0de62-56d1-75d0-b8d4-a408bdd782f2",
  type: "page-type/page-type",
  slug: "temper-metric",
  definition: "a number measuring a character build",
  extends: ["page-type/temper-thing"],
  parts: [
    "text-property/metric-value-type",
    "text-property/metric-polarity",
    "text-property/eso-stat-constant-name",
    "text-property/eso-stat-value-part",
    "number-property/metric-divisor",
    "number-property/metric-cap",
    "boolean-property/fully-implemented",
    "code-file-property/metric-formula",
  ],
  properties: [
    { pageProperty: "text-property/category", required: false, many: false },
    { pageProperty: "text-property/metric-value-type", required: true, many: false },
    { pageProperty: "text-property/metric-polarity", required: true, many: false },
    { pageProperty: "text-property/eso-stat-constant-name", required: false, many: false },
    { pageProperty: "text-property/eso-stat-value-part", required: false, many: false },
    { pageProperty: "number-property/metric-divisor", required: false, many: false },
    { pageProperty: "number-property/metric-cap", required: false, many: false },
    { pageProperty: "boolean-property/fully-implemented", required: true, many: false },
    { pageProperty: "code-file-property/metric-formula", required: false, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A stat's name is its title.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A stat's slug is the id builds and effects name it by.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A stat's formula is code in a file beside its page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A stat stating no formula is worked out by nothing.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
