import type { PageType } from "@akasha/pages/page-type"

export const temperLocationType = {
  id: "01a05fc4-7a8f-792b-b559-e6c98c4ec4bb",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "temper-location-type",
  definition: "a sort of place a character's things are held",
  pluralSlug: "temper-location-types",
  extends: ["page-type/temper-catalog-thing"],
  properties: [
    { pageProperty: "text-property/key", required: true, many: false },
    { pageProperty: "number-property/display-order", required: true, many: false },
  ],
  types: "ts",
} as const satisfies PageType
