import type { PageType } from "@akasha/pages/page-type"
import type { TemperCatalogThing } from "../../../temper-catalog/things/temper-catalog-thing.page-type.ts"
import type { AlchemyEffects } from "../properties/alchemy-effects.text-property.ts"

export type TemperReagent = TemperCatalogThing & {
  alchemyEffects: AlchemyEffects
}

export const temperReagent = {
  id: "01a05fd1-d440-7e50-9ee1-512f735a1900",
  pageTypeSlug: "page-type",
  slug: "temper-reagent",
  definition: "a plant or part brewed into a drink",
  pluralSlug: "temper-reagents",
  extends: ["page-type/temper-catalog-thing"],
  parts: ["text-property/alchemy-effects"],
  properties: [
    { pageProperty: "text-property/key", required: true, many: false },
    { pageProperty: "text-property/icon", required: true, many: false },
    { pageProperty: "number-property/item-id", required: true, many: false },
    {
      pageProperty: "text-property/alchemy-effects",
      required: true,
      many: true,
      maxCount: null,
    },
  ],
} as const satisfies PageType
