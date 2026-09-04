import type { PageType } from "@akasha/pages-system/page-type"
import type { TemperCatalogThing } from "../../temper-catalog-things/temper-catalog-thing.page-type.ts"

export type TemperDebuffMajor = TemperCatalogThing

export const temperDebuffMajor = {
  id: "01a05fc5-94cf-7021-9a7d-21e4794bdc95",
  pageTypeSlug: "page-type",
  slug: "temper-debuff-major",
  definition: "a harmful effect the game names Major",
  pluralSlug: "temper-debuff-majors",
  extendsSlug: "page-type/temper-catalog-thing",
  properties: [
    { pagePropertySlug: "key", required: true, many: false },
    { pagePropertySlug: "description", required: true, many: false },
    { pagePropertySlug: "effects", required: true, many: false },
  ],
} as const satisfies PageType
