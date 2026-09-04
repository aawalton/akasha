import type { PageType } from "@akasha/pages-system/page-type"
import type { TemperPursuitThing } from "../temper-pursuit-things/temper-pursuit-thing.page-type.ts"
import type { Collectibles } from "./properties/collectibles.page-property-entry.ts"
import type { EsoCategoryIndex } from "./properties/eso-category-index.number-property.ts"

export type TemperCollectibleCategory = TemperPursuitThing & {
  esoCategoryIndex?: EsoCategoryIndex
  collectibles?: Collectibles
}

export const temperCollectibleCategory = {
  id: "01a06165-ae0e-7003-b36d-6529ae625fb0",
  pageTypeSlug: "page-type",
  slug: "temper-collectible-category",
  definition: "a heading the game files a collectible under",
  pluralSlug: "temper-collectible-categories",
  extendsSlug: "page-type/temper-pursuit-thing",
  partSlugs: [
    "number-property/eso-category-index",
    "page-property-entry/collectibles",
    "text-property/collectible-name",
  ],
  properties: [
    { pagePropertySlug: "eso-category-index", required: false, many: false },
    { pagePropertySlug: "collectibles", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A category stating no parent carries the category index the game gives.",
    },
    {
      invariantKind: "departure",
      statement: "A category stating a parent hangs beneath the category the parent names.",
    },
    {
      invariantKind: "departure",
      statement: "A collectible a category holds is a line of the file beside the page.",
    },
  ],
} as const satisfies PageType
