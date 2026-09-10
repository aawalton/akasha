import type { PageType } from "akasha/pages/types/page-type.page-type.types.ts"

export const temperDebuffOther = {
  id: "01a05fc5-94d0-716b-82f3-5afa3e4c84e2",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "temper-debuff-other",
  definition: "a harmful effect the game names neither Major nor Minor",
  pluralSlug: "temper-debuff-others",
  extends: ["page-type/temper-catalog-thing"],
  properties: [
    { pageProperty: "text-property/key", required: true, many: false },
    { pageProperty: "text-property/description", required: true, many: false },
  ],
  types: "ts",
} as const satisfies PageType
