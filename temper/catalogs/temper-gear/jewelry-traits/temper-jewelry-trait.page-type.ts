import type { PageType } from "@akasha/pages/page-type"
import type { TemperCatalogThing } from "../../../temper-catalog/things/temper-catalog-thing.page-type.ts"

export type TemperJewelryTrait = TemperCatalogThing

export const temperJewelryTrait = {
  id: "01a05fd1-d433-7c53-933e-ed171c6f7cf9",
  pageTypeSlug: "page-type",
  slug: "temper-jewelry-trait",
  definition: "a property a piece of jewelry is worked with",
  pluralSlug: "temper-jewelry-traits",
  extends: ["page-type/temper-catalog-thing"],
  properties: [
    { pageProperty: "text-property/key", required: true, many: false },
    { pageProperty: "number-property/display-order", required: true, many: false },
    { pageProperty: "text-property/eso-trait-constant-name", required: true, many: false },
  ],
} as const satisfies PageType
