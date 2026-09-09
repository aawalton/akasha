import type { PageType } from "@akasha/pages/page-type"
import type { TemperCatalogThing } from "../../../temper-catalog/temper-catalog-things/temper-catalog-thing.page-type.ts"

export type TemperBuffMajor = TemperCatalogThing

export const temperBuffMajor = {
  id: "01a05fc5-94ce-7166-8475-467d3eb17bf9",
  pageTypeSlug: "page-type",
  slug: "temper-buff-major",
  definition: "a helpful effect the game names Major",
  pluralSlug: "temper-buff-majors",
  extends: ["page-type/temper-catalog-thing"],
  properties: [
    { pagePropertySlug: "text-property/key", required: true, many: false },
    { pagePropertySlug: "text-property/description", required: true, many: false },
    { pagePropertySlug: "page-property-entry/effects", required: true, many: false },
  ],
} as const satisfies PageType
