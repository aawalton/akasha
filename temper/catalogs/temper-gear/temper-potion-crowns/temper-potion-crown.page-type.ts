import type { PageType } from "@akasha/pages/page-type"

export const temperPotionCrown = {
  id: "01a05fd1-d434-7ce2-a20b-6926bf033e6f",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "temper-potion-crown",
  definition: "a drink bought from the crown store",
  pluralSlug: "temper-potion-crowns",
  extends: ["page-type/temper-gear-thing"],
  properties: [
    { pageProperty: "text-property/key", required: true, many: false },
    { pageProperty: "text-property/description", required: true, many: false },
    { pageProperty: "number-property/display-order", required: true, many: false },
    { pageProperty: "text-property/icon", required: true, many: false },
    { pageProperty: "number-property/item-id", required: true, many: false },
    { pageProperty: "text-property/category-id", required: true, many: false },
    { pageProperty: "text-property/subcategory-id", required: true, many: false },
    { pageProperty: "text-property/item-level", required: true, many: false },
    { pageProperty: "number-property/potion-seconds", required: true, many: false },
  ],
  types: "ts",
} as const satisfies PageType
