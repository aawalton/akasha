import type { PageType } from "@akasha/pages-system/page-type"
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
  extendsSlug: "page-type/temper-gear-thing",
  partSlugs: ["record-property/recipes", "text-property/reagent-names"],
  properties: [
    { pagePropertySlug: "key", required: true, many: false },
    { pagePropertySlug: "description", required: true, many: false },
    { pagePropertySlug: "icon", required: true, many: false },
    { pagePropertySlug: "item-level", required: true, many: false },
    { pagePropertySlug: "potion-seconds", required: true, many: false },
    { pagePropertySlug: "record-property/recipes", required: true, many: true, max: null },
  ],
} as const satisfies PageType
