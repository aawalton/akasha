import type { PageType } from "@akasha/pages/page-type"
import type { JewelryTypeId } from "../../../catalogs/temper-gear/properties/jewelry-type-id.text-property.ts"
import type { TemperCatalogThing } from "../../things/temper-catalog-thing.page-type.ts"

export type TemperJewelrySlot = TemperCatalogThing & {
  typeId: JewelryTypeId
}

export const temperJewelrySlot = {
  id: "01a05fd1-d432-7a5c-af26-2d6a3db12c15",
  pageTypeSlug: "page-type",
  slug: "temper-jewelry-slot",
  definition: "a place on the body a piece of jewelry is worn",
  pluralSlug: "temper-jewelry-slots",
  extends: ["page-type/temper-catalog-thing"],
  parts: ["text-property/jewelry-type-id"],
  properties: [
    { pageProperty: "text-property/key", required: true, many: false },
    { pageProperty: "number-property/display-order", required: true, many: false },
    { pageProperty: "text-property/icon", required: true, many: false },
    { pageProperty: "text-property/jewelry-type-id", required: true, many: false },
  ],
} as const satisfies PageType
