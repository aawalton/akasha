import type { PageType } from "@akasha/pages/page-type"
import type { TemperCatalogThing } from "../../../temper-catalog/temper-catalog-things/temper-catalog-thing.page-type.ts"

export type TemperBuffMinor = TemperCatalogThing

export const temperBuffMinor = {
  id: "01a05fc5-94ce-7bed-8828-2d7236ba09a9",
  pageTypeSlug: "page-type",
  slug: "temper-buff-minor",
  definition: "a helpful effect the game names Minor",
  pluralSlug: "temper-buff-minors",
  extends: ["page-type/temper-catalog-thing"],
  properties: [
    { pagePropertySlug: "text-property/key", required: true, many: false },
    { pagePropertySlug: "text-property/description", required: true, many: false },
    { pagePropertySlug: "page-property-entry/effects", required: true, many: false },
  ],
} as const satisfies PageType
