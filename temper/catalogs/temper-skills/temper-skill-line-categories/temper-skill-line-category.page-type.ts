import type { PageType } from "@akasha/pages/page-type"
import type { TemperCatalogThing } from "../../../temper-catalog/things/temper-catalog-thing.page-type.types.ts"

export type TemperSkillLineCategory = TemperCatalogThing

export const temperSkillLineCategory = {
  id: "01a05fca-cb8b-713e-b910-7148de1f3dbd",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "temper-skill-line-category",
  definition: "a group the skill lines are gathered under",
  pluralSlug: "temper-skill-line-categories",
  extends: ["page-type/temper-catalog-thing"],
  properties: [
    { pageProperty: "text-property/key", required: true, many: false },
    { pageProperty: "number-property/display-order", required: true, many: false },
  ],
} as const satisfies PageType
