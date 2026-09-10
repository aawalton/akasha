import type { PageType } from "akasha/pages/types/page-type.page-type.types.ts"

export const temperScribingThing = {
  id: "01a05fca-cb8c-73ea-beae-bd4ddb3a41f3",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "temper-scribing-thing",
  definition: "anything a scribed skill is written out of",
  pluralSlug: "temper-scribing-things",
  extends: ["page-type/temper-catalog-thing"],
  parts: ["number-property/uesp-id"],
  properties: [
    { pageProperty: "text-property/key", required: true, many: false },
    { pageProperty: "number-property/item-id", required: true, many: false },
    { pageProperty: "number-property/uesp-id", required: true, many: false },
  ],
  types: "ts",
} as const satisfies PageType
