import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperComparisonOp = {
  id: "01a05fc9-9a02-7bf9-8334-b9a9baaf4ee4",
  type: "page-type/page-type",
  slug: "temper-comparison-op",
  definition: "a way of comparing a number an item rule reads",
  extends: ["page-type/temper-progress-thing"],
  parts: ["module/comparison-op-pages"],
  properties: [{ pageProperty: "text-property/key", required: true, many: false }],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The key is the operator an item rule writes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The title is the operator a reader is shown.",
    },
  ],
  types: "ts",
  schema: "jsonl",
  createdAt: "2026-09-02T01:44:02.818Z",
  updatedAt: "2026-09-25T13:04:51.000Z",
} as const satisfies PageType
