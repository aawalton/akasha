import type { PageType } from "@akasha/pages-system/page-type"
import type { TemperCatalogThing } from "../../temper-catalog-things/temper-catalog-thing.page-type.ts"

export type TemperSkillSlot = TemperCatalogThing

export const temperSkillSlot = {
  id: "01a05fca-cb8b-79ed-ae49-1fdf5f38602a",
  pageTypeSlug: "page-type",
  slug: "temper-skill-slot",
  definition: "a place on the bar a skill is set into",
  pluralSlug: "temper-skill-slots",
  extendsSlug: ["page-type/temper-catalog-thing"],
  properties: [{ pagePropertySlug: "key", required: true, many: false }],
} as const satisfies PageType
