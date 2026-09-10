import type { PageType } from "@akasha/pages/page-type"

export const temperArmorSlot = {
  id: "01a05fd1-d430-78b6-bef0-e0208b62ccf9",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "temper-armor-slot",
  definition: "a place on the body a piece of armor is worn",
  pluralSlug: "temper-armor-slots",
  extends: ["page-type/temper-catalog-thing"],
  properties: [
    { pageProperty: "text-property/key", required: true, many: false },
    { pageProperty: "number-property/display-order", required: true, many: false },
    { pageProperty: "text-property/icon", required: true, many: false },
  ],
  types: "ts",
} as const satisfies PageType
