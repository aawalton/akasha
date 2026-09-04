import type { PageType } from "@akasha/pages-system/page-type"
import type { TemperCatalogThing } from "../../temper-catalog-things/temper-catalog-thing.page-type.ts"

export type TemperLocationType = TemperCatalogThing

export const temperLocationType = {
  id: "01a05fc4-7a8f-792b-b559-e6c98c4ec4bb",
  pageTypeSlug: "page-type",
  slug: "temper-location-type",
  definition: "a sort of place a character's things are held",
  pluralSlug: "temper-location-types",
  extendsSlug: "page-type/temper-catalog-thing",
  properties: [
    { pagePropertySlug: "key", required: true, many: false },
    { pagePropertySlug: "display-order", required: true, many: false },
  ],
} as const satisfies PageType
