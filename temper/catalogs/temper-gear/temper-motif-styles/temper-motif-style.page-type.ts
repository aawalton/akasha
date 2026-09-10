import type { PageType } from "akasha/pages/types/page-type.page-type.types.ts"

export const temperMotifStyle = {
  id: "01a05fd1-d433-75e8-b089-3c870c7d6917",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "temper-motif-style",
  definition: "a crafting style a piece is made in the look of",
  pluralSlug: "temper-motif-styles",
  extends: ["page-type/temper-catalog-thing"],
  parts: [
    "number-property/collection-index",
    "text-property/drop-sources",
    "text-property/source-description",
  ],
  properties: [
    { pageProperty: "number-property/collection-index", required: true, many: false },
    { pageProperty: "text-property/source-description", required: true, many: false },
    { pageProperty: "text-property/drop-sources", required: false, many: true, maxCount: null },
  ],
  types: "ts",
} as const satisfies PageType
