import type { PageType } from "@akasha/pages-system/page-type"
import type { TemperCatalogThing } from "../../temper-catalog-things/temper-catalog-thing.page-type.ts"
import type { JewelryTypeId } from "../properties/jewelry-type-id.text-property.ts"

export type TemperJewelrySlot = TemperCatalogThing & {
  typeId: JewelryTypeId
}

export const temperJewelrySlot = {
  id: "01a05fd1-d432-7a5c-af26-2d6a3db12c15",
  pageTypeSlug: "page-type",
  slug: "temper-jewelry-slot",
  definition: "a place on the body a piece of jewelry is worn",
  pluralSlug: "temper-jewelry-slots",
  extendsSlug: ["page-type/temper-catalog-thing"],
  partSlugs: ["text-property/jewelry-type-id"],
  properties: [
    { pagePropertySlug: "key", required: true, many: false },
    { pagePropertySlug: "display-order", required: true, many: false },
    { pagePropertySlug: "icon", required: true, many: false },
    { pagePropertySlug: "jewelry-type-id", required: true, many: false },
  ],
} as const satisfies PageType
