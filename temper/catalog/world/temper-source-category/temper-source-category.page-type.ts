import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperSourceCategory = {
  id: "01a05fc4-7a95-78b9-afe6-0a16b2b185e3",
  type: "page-type/page-type",
  slug: "temper-source-category",
  definition: "a group holding the sources of a character's numbers",
  extends: ["page-type/temper-catalog-thing"],
  properties: [
    { pageProperty: "number-property/display-order", required: true, many: false },
    { pageProperty: "text-property/key", required: true, many: false },
    { pageProperty: "text-property/metric-subject", required: false, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A companion's numbers are grouped by the source categories whose subject is companion.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A source category's slug is the id sources and formulas name it by.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A source category's name is its title, and its place is its display order.",
    },
  ],
  types: "ts",
  schema: "jsonl",
  parts: ["change-generator/source-category-ids-keeping", "data-table/source-category-ids"],
} as const satisfies PageType
