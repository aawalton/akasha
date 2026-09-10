import type { PageType } from "@akasha/pages/page-type"

export const temperSourceCategory = {
  id: "01a05fc4-7a95-78b9-afe6-0a16b2b185e3",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "temper-source-category",
  definition: "a group the sources of a character's numbers fall into",
  pluralSlug: "temper-source-categories",
  extends: ["page-type/temper-catalog-thing"],
  properties: [
    { pageProperty: "text-property/category-id", required: true, many: false },
    { pageProperty: "number-property/display-order", required: true, many: false },
  ],
  types: "ts",
} as const satisfies PageType
