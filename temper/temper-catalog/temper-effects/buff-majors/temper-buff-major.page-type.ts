import type { PageType } from "@akasha/pages-system/page-type"
import type { TemperCatalogThing } from "../../temper-catalog-things/temper-catalog-thing.page-type.ts"

export type TemperBuffMajor = TemperCatalogThing

export const temperBuffMajor = {
  id: "01a05fc5-94ce-7166-8475-467d3eb17bf9",
  pageTypeSlug: "page-type",
  slug: "temper-buff-major",
  definition: "a helpful effect the game names Major",
  pluralSlug: "temper-buff-majors",
  extendsSlug: ["page-type/temper-catalog-thing"],
  properties: [
    { pagePropertySlug: "key", required: true, many: false },
    { pagePropertySlug: "description", required: true, many: false },
    { pagePropertySlug: "effects", required: true, many: false },
  ],
} as const satisfies PageType
