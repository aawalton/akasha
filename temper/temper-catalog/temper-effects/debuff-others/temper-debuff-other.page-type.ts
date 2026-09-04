import type { PageType } from "@akasha/pages-system/page-type"
import type { TemperCatalogThing } from "../../temper-catalog-things/temper-catalog-thing.page-type.ts"

export type TemperDebuffOther = TemperCatalogThing

export const temperDebuffOther = {
  id: "01a05fc5-94d0-716b-82f3-5afa3e4c84e2",
  pageTypeSlug: "page-type",
  slug: "temper-debuff-other",
  definition: "a harmful effect the game names neither Major nor Minor",
  pluralSlug: "temper-debuff-others",
  extendsSlug: "page-type/temper-catalog-thing",
  properties: [
    { pagePropertySlug: "key", required: true, many: false },
    { pagePropertySlug: "description", required: true, many: false },
  ],
} as const satisfies PageType
