import type { PageType } from "akasha/pages/types/page-type.page-type.types.ts"

export const temperSkillType = {
  id: "01a05fca-cb8c-73c3-984c-28544089d7ee",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "temper-skill-type",
  definition: "the sort of use a skill is put to",
  pluralSlug: "temper-skill-types",
  extends: ["page-type/temper-catalog-thing"],
  properties: [
    { pageProperty: "text-property/key", required: true, many: false },
    { pageProperty: "text-property/description", required: true, many: false },
  ],
  types: "ts",
} as const satisfies PageType
