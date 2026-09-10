import type { PageType } from "akasha/pages/types/page-type.page-type.types.ts"

export const temperSkillLine = {
  id: "01a05fca-cb8b-7189-8133-38b9f311342c",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "temper-skill-line",
  definition: "a track of skills a character raises together",
  pluralSlug: "temper-skill-lines",
  extends: ["page-type/temper-catalog-thing"],
  parts: [
    "number-property/eso-skill-line-id",
    "number-property/max-rank",
    "text-property/skill-line-class",
  ],
  properties: [
    { pageProperty: "text-property/key", required: true, many: false },
    { pageProperty: "number-property/display-order", required: true, many: false },
    { pageProperty: "number-property/eso-skill-line-id", required: true, many: false },
    { pageProperty: "number-property/max-rank", required: true, many: false },
    { pageProperty: "text-property/subcategory-id", required: true, many: false },
    { pageProperty: "text-property/skill-line-class", required: false, many: false },
  ],
  types: "ts",
} as const satisfies PageType
