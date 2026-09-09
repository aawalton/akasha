import type { PageType } from "@akasha/pages/page-type"
import type { TemperCatalogThing } from "../../../temper-catalog/things/temper-catalog-thing.page-type.ts"

export type TemperBuffMajor = TemperCatalogThing

export const temperBuffMajor = {
  id: "01a05fc5-94ce-7166-8475-467d3eb17bf9",
  pageTypeSlug: "page-type",
  slug: "temper-buff-major",
  definition: "a helpful effect the game names Major",
  pluralSlug: "temper-buff-majors",
  extends: ["page-type/temper-catalog-thing"],
  properties: [
    { pageProperty: "text-property/key", required: true, many: false },
    { pageProperty: "text-property/description", required: true, many: false },
    { pageProperty: "page-property-entry/effects", required: true, many: false },
  ],
} as const satisfies PageType
