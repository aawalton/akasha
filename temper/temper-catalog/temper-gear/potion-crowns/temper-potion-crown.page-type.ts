import type { PageType } from "@akasha/pages-system/page-type"
import type { TemperGearThing } from "../temper-gear-things/temper-gear-thing.page-type.ts"

export type TemperPotionCrown = TemperGearThing

export const temperPotionCrown = {
  id: "01a05fd1-d434-7ce2-a20b-6926bf033e6f",
  pageTypeSlug: "page-type",
  slug: "temper-potion-crown",
  definition: "a drink bought from the crown store",
  pluralSlug: "temper-potion-crowns",
  extendsSlug: ["page-type/temper-gear-thing"],
  properties: [
    { pagePropertySlug: "key", required: true, many: false },
    { pagePropertySlug: "description", required: true, many: false },
    { pagePropertySlug: "display-order", required: true, many: false },
    { pagePropertySlug: "icon", required: true, many: false },
    { pagePropertySlug: "item-id", required: true, many: false },
    { pagePropertySlug: "category-id", required: true, many: false },
    { pagePropertySlug: "subcategory-id", required: true, many: false },
    { pagePropertySlug: "item-level", required: true, many: false },
    { pagePropertySlug: "potion-seconds", required: true, many: false },
  ],
} as const satisfies PageType
