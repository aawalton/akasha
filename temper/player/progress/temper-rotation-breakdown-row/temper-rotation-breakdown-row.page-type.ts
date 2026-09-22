import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperRotationBreakdownRow = {
  id: "01a05fc9-9a03-795c-b95b-c04997733011",
  type: "page-type/page-type",
  slug: "temper-rotation-breakdown-row",
  definition: "a figure out of a broken-down rotation",
  extends: ["page-type/temper-progress-thing"],
  parts: ["text-property/full-name"],
  properties: [
    { pageProperty: "text-property/key", required: true, many: false },
    { pageProperty: "text-property/description", required: true, many: false },
    { pageProperty: "text-property/full-name", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The title is the short name a narrow column is headed by.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
