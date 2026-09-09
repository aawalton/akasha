import type { PageType } from "@akasha/pages/page-type"
import type { TemperCatalogThing } from "../../temper-catalog-things/temper-catalog-thing.page-type.ts"

export type TemperArmorSlot = TemperCatalogThing

export const temperArmorSlot = {
  id: "01a05fd1-d430-78b6-bef0-e0208b62ccf9",
  pageTypeSlug: "page-type",
  slug: "temper-armor-slot",
  definition: "a place on the body a piece of armor is worn",
  pluralSlug: "temper-armor-slots",
  extends: ["page-type/temper-catalog-thing"],
  properties: [
    { pagePropertySlug: "text-property/key", required: true, many: false },
    { pagePropertySlug: "number-property/display-order", required: true, many: false },
    { pagePropertySlug: "text-property/icon", required: true, many: false },
  ],
} as const satisfies PageType
