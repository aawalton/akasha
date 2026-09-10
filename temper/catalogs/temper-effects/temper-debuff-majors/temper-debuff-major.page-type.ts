import type { PageType } from "akasha/pages/types/page-type.page-type.types.ts"

export const temperDebuffMajor = {
  id: "01a05fc5-94cf-7021-9a7d-21e4794bdc95",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "temper-debuff-major",
  definition: "a harmful effect the game names Major",
  pluralSlug: "temper-debuff-majors",
  extends: ["page-type/temper-catalog-thing"],
  properties: [
    { pageProperty: "text-property/key", required: true, many: false },
    { pageProperty: "text-property/description", required: true, many: false },
    { pageProperty: "page-property-entry/effects", required: true, many: false },
  ],
  types: "ts",
} as const satisfies PageType
