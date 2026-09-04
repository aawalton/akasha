import type { PageType } from "@akasha/pages-system/page-type"
import type { TemperCatalogThing } from "../../temper-catalog-things/temper-catalog-thing.page-type.ts"

export type TemperSkillLineCategory = TemperCatalogThing

export const temperSkillLineCategory = {
  id: "01a05fca-cb8b-713e-b910-7148de1f3dbd",
  pageTypeSlug: "page-type",
  slug: "temper-skill-line-category",
  definition: "a group the skill lines are gathered under",
  pluralSlug: "temper-skill-line-categories",
  extendsSlug: ["page-type/temper-catalog-thing"],
  properties: [
    { pagePropertySlug: "key", required: true, many: false },
    { pagePropertySlug: "display-order", required: true, many: false },
  ],
} as const satisfies PageType
