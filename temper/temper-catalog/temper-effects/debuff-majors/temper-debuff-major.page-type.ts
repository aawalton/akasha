import type { PageType } from "@akasha/pages/page-type"
import type { TemperCatalogThing } from "../../temper-catalog-things/temper-catalog-thing.page-type.ts"

export type TemperDebuffMajor = TemperCatalogThing

export const temperDebuffMajor = {
  id: "01a05fc5-94cf-7021-9a7d-21e4794bdc95",
  pageTypeSlug: "page-type",
  slug: "temper-debuff-major",
  definition: "a harmful effect the game names Major",
  pluralSlug: "temper-debuff-majors",
  extends: ["page-type/temper-catalog-thing"],
  properties: [
    { pagePropertySlug: "text-property/key", required: true, many: false },
    { pagePropertySlug: "text-property/description", required: true, many: false },
    { pagePropertySlug: "page-property-entry/effects", required: true, many: false },
  ],
} as const satisfies PageType
