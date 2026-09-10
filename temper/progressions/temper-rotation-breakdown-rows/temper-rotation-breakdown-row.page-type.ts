import type { PageType } from "akasha/pages/types/page-type.page-type.types.ts"

export const temperRotationBreakdownRow = {
  id: "01a05fc9-9a03-795c-b95b-c04997733011",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "temper-rotation-breakdown-row",
  definition: "one figure a rotation is broken down into",
  pluralSlug: "temper-rotation-breakdown-rows",
  extends: ["page-type/temper-progress-thing"],
  parts: ["text-property/full-name"],
  properties: [
    { pageProperty: "text-property/key", required: true, many: false },
    { pageProperty: "text-property/description", required: true, many: false },
    { pageProperty: "text-property/full-name", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The title is the short name a narrow column is headed by.",
    },
  ],
  types: "ts",
} as const satisfies PageType
