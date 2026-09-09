import type { PageType } from "@akasha/pages/page-type"
import type { Recipes } from "../properties/recipes.record-property.ts"
import type { TemperGearThing } from "../temper-gear-things/temper-gear-thing.page-type.ts"

export type TemperPotionCrafted = TemperGearThing & {
  reagents: Recipes
}

export const temperPotionCrafted = {
  id: "01a05fd1-d434-76cd-b1db-563c237e6de6",
  pageTypeSlug: "page-type",
  slug: "temper-potion-crafted",
  definition: "a drink brewed from reagents",
  pluralSlug: "temper-potion-crafteds",
  extends: ["page-type/temper-gear-thing"],
  partSlugs: ["record-property/recipes", "text-property/reagent-names"],
  properties: [
    { pagePropertySlug: "text-property/key", required: true, many: false },
    { pagePropertySlug: "text-property/description", required: true, many: false },
    { pagePropertySlug: "text-property/icon", required: true, many: false },
    { pagePropertySlug: "text-property/item-level", required: true, many: false },
    { pagePropertySlug: "number-property/potion-seconds", required: true, many: false },
    { pagePropertySlug: "record-property/recipes", required: true, many: true, maxCount: null },
  ],
} as const satisfies PageType
