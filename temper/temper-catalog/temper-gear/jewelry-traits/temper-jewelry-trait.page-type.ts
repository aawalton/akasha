import type { PageType } from "@akasha/pages/page-type"
import type { TemperCatalogThing } from "../../temper-catalog-things/temper-catalog-thing.page-type.ts"

export type TemperJewelryTrait = TemperCatalogThing

export const temperJewelryTrait = {
  id: "01a05fd1-d433-7c53-933e-ed171c6f7cf9",
  pageTypeSlug: "page-type",
  slug: "temper-jewelry-trait",
  definition: "a property a piece of jewelry is worked with",
  pluralSlug: "temper-jewelry-traits",
  extends: ["page-type/temper-catalog-thing"],
  properties: [
    { pagePropertySlug: "text-property/key", required: true, many: false },
    { pagePropertySlug: "number-property/display-order", required: true, many: false },
    { pagePropertySlug: "text-property/eso-trait-constant-name", required: true, many: false },
  ],
} as const satisfies PageType
