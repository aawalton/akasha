import type { PageType } from "@akasha/pages/page-type"
import type { TemperGearThing } from "../things/temper-gear-thing.page-type.ts"

export type TemperPotionDropped = TemperGearThing

export const temperPotionDropped = {
  id: "01a05fd1-d435-7e26-b0e7-584020995ebe",
  pageTypeSlug: "page-type",
  slug: "temper-potion-dropped",
  definition: "a drink found in the world rather than brewed",
  pluralSlug: "temper-potion-droppeds",
  extends: ["page-type/temper-gear-thing"],
  properties: [
    { pagePropertySlug: "text-property/key", required: true, many: false },
    { pagePropertySlug: "text-property/description", required: true, many: false },
    { pagePropertySlug: "number-property/display-order", required: true, many: false },
    { pagePropertySlug: "text-property/icon", required: true, many: false },
    { pagePropertySlug: "number-property/item-id", required: true, many: false },
    { pagePropertySlug: "text-property/item-level", required: true, many: false },
    { pagePropertySlug: "number-property/potion-seconds", required: true, many: false },
  ],
} as const satisfies PageType
