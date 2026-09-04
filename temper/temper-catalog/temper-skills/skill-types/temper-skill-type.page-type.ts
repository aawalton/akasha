import type { PageType } from "@akasha/pages-system/page-type"
import type { TemperCatalogThing } from "../../temper-catalog-things/temper-catalog-thing.page-type.ts"

export type TemperSkillType = TemperCatalogThing

export const temperSkillType = {
  id: "01a05fca-cb8c-73c3-984c-28544089d7ee",
  pageTypeSlug: "page-type",
  slug: "temper-skill-type",
  definition: "the sort of use a skill is put to",
  pluralSlug: "temper-skill-types",
  extendsSlug: ["page-type/temper-catalog-thing"],
  properties: [
    { pagePropertySlug: "key", required: true, many: false },
    { pagePropertySlug: "description", required: true, many: false },
  ],
} as const satisfies PageType
