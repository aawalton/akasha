import type { PageType } from "@akasha/pages-system/page-type"
import type { TemperCatalogThing } from "../../temper-catalog-things/temper-catalog-thing.page-type.ts"

export type TemperArmorTrait = TemperCatalogThing

export const temperArmorTrait = {
  id: "01a05fb0-3ceb-7229-9089-127418274d52",
  pageTypeSlug: "page-type",
  slug: "temper-armor-trait",
  definition: "a property a piece of armor is worked with",
  pluralSlug: "temper-armor-traits",
  extendsSlug: ["page-type/temper-catalog-thing"],
  properties: [
    { pagePropertySlug: "key", required: true, many: false },
    { pagePropertySlug: "display-order", required: true, many: false },
    { pagePropertySlug: "eso-trait-constant-name", required: true, many: false },
  ],
} as const satisfies PageType
