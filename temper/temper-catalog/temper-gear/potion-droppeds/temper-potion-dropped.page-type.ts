import type { PageType } from "@akasha/pages-system/page-type"
import type { TemperGearThing } from "../temper-gear-things/temper-gear-thing.page-type.ts"

export type TemperPotionDropped = TemperGearThing

export const temperPotionDropped = {
  id: "01a05fd1-d435-7e26-b0e7-584020995ebe",
  pageTypeSlug: "page-type",
  slug: "temper-potion-dropped",
  definition: "a drink found in the world rather than brewed",
  pluralSlug: "temper-potion-droppeds",
  extendsSlug: "page-type/temper-gear-thing",
  properties: [
    { pagePropertySlug: "key", required: true, many: false },
    { pagePropertySlug: "description", required: true, many: false },
    { pagePropertySlug: "display-order", required: true, many: false },
    { pagePropertySlug: "icon", required: true, many: false },
    { pagePropertySlug: "item-id", required: true, many: false },
    { pagePropertySlug: "item-level", required: true, many: false },
    { pagePropertySlug: "potion-seconds", required: true, many: false },
  ],
} as const satisfies PageType
