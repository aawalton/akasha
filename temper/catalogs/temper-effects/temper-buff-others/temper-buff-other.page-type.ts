import type { PageType } from "@akasha/pages/page-type"

export const temperBuffOther = {
  id: "01a05fc5-94cf-702c-9d2a-71e8577501c9",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "temper-buff-other",
  definition: "a helpful effect the game names neither Major nor Minor",
  pluralSlug: "temper-buff-others",
  extends: ["page-type/temper-catalog-thing"],
  properties: [
    { pageProperty: "text-property/key", required: true, many: false },
    { pageProperty: "text-property/description", required: true, many: false },
  ],
  types: "ts",
} as const satisfies PageType
