import type { PageType } from "@akasha/pages/page-type"
import type { TemperPursuitThing } from "../temper-pursuit-things/temper-pursuit-thing.page-type.types.ts"
import type { Collectibles } from "./properties/collectibles.page-property-entry.ts"
import type { EsoCategoryIndex } from "./properties/eso-category-index.number-property.ts"

export type TemperCollectibleCategory = TemperPursuitThing & {
  esoCategoryIndex?: EsoCategoryIndex
  collectibles?: Collectibles
}

export const temperCollectibleCategory = {
  id: "01a06165-ae0e-7003-b36d-6529ae625fb0",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "temper-collectible-category",
  definition: "a heading the game files a collectible under",
  pluralSlug: "temper-collectible-categories",
  extends: ["page-type/temper-pursuit-thing"],
  parts: [
    "number-property/eso-category-index",
    "page-property-entry/collectibles",
    "text-property/collectible-name",
  ],
  properties: [
    { pageProperty: "number-property/eso-category-index", required: false, many: false },
    { pageProperty: "page-property-entry/collectibles", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A category stating no parent has the category index the game gives.",
    },
    {
      invariantKind: "departure",
      statement: "A category stating a parent hangs beneath the category the parent names.",
    },
    {
      invariantKind: "departure",
      statement: "A collectible a category has is a line of the file beside the page.",
    },
  ],
} as const satisfies PageType
