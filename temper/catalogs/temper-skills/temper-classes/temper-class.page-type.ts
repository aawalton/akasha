import type { PageType } from "@akasha/pages/page-type"

export const temperClass = {
  id: "01a05fca-cb89-7c15-a7d1-9bf0b42293c8",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "temper-class",
  definition: "a calling a character is made with",
  pluralSlug: "temper-classes",
  extends: ["page-type/temper-catalog-thing"],
  parts: ["number-property/eso-class-id"],
  properties: [
    { pageProperty: "text-property/key", required: true, many: false },
    { pageProperty: "number-property/eso-class-id", required: true, many: false },
  ],
  types: "ts",
} as const satisfies PageType
