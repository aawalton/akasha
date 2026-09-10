import type { PageType } from "@akasha/pages/page-type"

export const temperPotionCrafted = {
  id: "01a05fd1-d434-76cd-b1db-563c237e6de6",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "temper-potion-crafted",
  definition: "a drink brewed from reagents",
  pluralSlug: "temper-potion-crafteds",
  extends: ["page-type/temper-gear-thing"],
  parts: ["record-property/recipes", "text-property/reagent-names"],
  properties: [
    { pageProperty: "text-property/key", required: true, many: false },
    { pageProperty: "text-property/description", required: true, many: false },
    { pageProperty: "text-property/icon", required: true, many: false },
    { pageProperty: "text-property/item-level", required: true, many: false },
    { pageProperty: "number-property/potion-seconds", required: true, many: false },
    { pageProperty: "record-property/recipes", required: true, many: true, maxCount: null },
  ],
  types: "ts",
} as const satisfies PageType
