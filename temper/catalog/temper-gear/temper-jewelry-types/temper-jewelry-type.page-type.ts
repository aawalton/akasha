import type { PageType } from "akasha/pages/types/page-type.page-type.types.ts"

export const temperJewelryType = {
  id: "01a05fd1-d433-7778-b5e5-05081a435bde",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "temper-jewelry-type",
  definition: "a kind of jewelry piece",
  pluralSlug: "temper-jewelry-types",
  extends: ["page-type/temper-gear-thing"],
  properties: [
    { pageProperty: "text-property/key", required: true, many: false },
    { pageProperty: "text-property/valid-slots", required: true, many: true, maxCount: null },
  ],
  types: "ts",
} as const satisfies PageType
