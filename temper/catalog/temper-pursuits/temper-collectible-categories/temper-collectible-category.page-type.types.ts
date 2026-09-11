import type { Collectibles } from "akasha/temper/catalog/temper-pursuits/temper-collectible-categories/properties/collectibles.page-property-entry.types.ts"
import type { EsoCategoryIndex } from "akasha/temper/catalog/temper-pursuits/temper-collectible-categories/properties/eso-category-index.number-property.types.ts"
import type { TemperPursuitThing } from "akasha/temper/catalog/temper-pursuits/temper-pursuit-things/temper-pursuit-thing.page-type.types.ts"

export type TemperCollectibleCategory = TemperPursuitThing & {
  esoCategoryIndex?: EsoCategoryIndex
  collectibles?: Collectibles
}
