import type { PageType } from "@akasha/pages/page-type"
import type { TemperGearThing } from "../temper-gear-things/temper-gear-thing.page-type.ts"

export type TemperPotionCrown = TemperGearThing

export const temperPotionCrown = {
  id: "01a05fd1-d434-7ce2-a20b-6926bf033e6f",
  pageTypeSlug: "page-type",
  slug: "temper-potion-crown",
  definition: "a drink bought from the crown store",
  pluralSlug: "temper-potion-crowns",
  extends: ["page-type/temper-gear-thing"],
  properties: [
    { pagePropertySlug: "text-property/key", required: true, many: false },
    { pagePropertySlug: "text-property/description", required: true, many: false },
    { pagePropertySlug: "number-property/display-order", required: true, many: false },
    { pagePropertySlug: "text-property/icon", required: true, many: false },
    { pagePropertySlug: "number-property/item-id", required: true, many: false },
    { pagePropertySlug: "text-property/category-id", required: true, many: false },
    { pagePropertySlug: "text-property/subcategory-id", required: true, many: false },
    { pagePropertySlug: "text-property/item-level", required: true, many: false },
    { pagePropertySlug: "number-property/potion-seconds", required: true, many: false },
  ],
} as const satisfies PageType
