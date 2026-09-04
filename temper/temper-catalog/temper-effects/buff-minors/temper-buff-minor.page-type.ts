import type { PageType } from "@akasha/pages-system/page-type"
import type { TemperCatalogThing } from "../../temper-catalog-things/temper-catalog-thing.page-type.ts"

export type TemperBuffMinor = TemperCatalogThing

export const temperBuffMinor = {
  id: "01a05fc5-94ce-7bed-8828-2d7236ba09a9",
  pageTypeSlug: "page-type",
  slug: "temper-buff-minor",
  definition: "a helpful effect the game names Minor",
  pluralSlug: "temper-buff-minors",
  extendsSlug: "page-type/temper-catalog-thing",
  properties: [
    { pagePropertySlug: "key", required: true, many: false },
    { pagePropertySlug: "description", required: true, many: false },
    { pagePropertySlug: "effects", required: true, many: false },
  ],
} as const satisfies PageType
