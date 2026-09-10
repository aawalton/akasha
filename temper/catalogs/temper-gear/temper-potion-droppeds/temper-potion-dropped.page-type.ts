import type { PageType } from "akasha/pages/types/page-type.page-type.types.ts"

export const temperPotionDropped = {
  id: "01a05fd1-d435-7e26-b0e7-584020995ebe",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "temper-potion-dropped",
  definition: "a drink found in the world rather than brewed",
  pluralSlug: "temper-potion-droppeds",
  extends: ["page-type/temper-gear-thing"],
  properties: [
    { pageProperty: "text-property/key", required: true, many: false },
    { pageProperty: "text-property/description", required: true, many: false },
    { pageProperty: "number-property/display-order", required: true, many: false },
    { pageProperty: "text-property/icon", required: true, many: false },
    { pageProperty: "number-property/item-id", required: true, many: false },
    { pageProperty: "text-property/item-level", required: true, many: false },
    { pageProperty: "number-property/potion-seconds", required: true, many: false },
  ],
  types: "ts",
} as const satisfies PageType
