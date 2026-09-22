import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperSourceCategory = {
  id: "01a05fc4-7a95-78b9-afe6-0a16b2b185e3",
  type: "page-type/page-type",
  slug: "temper-source-category",
  definition: "a group holding the sources of a character's numbers",
  extends: ["page-type/temper-catalog-thing"],
  properties: [
    { pageProperty: "text-property/category-id", required: true, many: false },
    { pageProperty: "number-property/display-order", required: true, many: false },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
