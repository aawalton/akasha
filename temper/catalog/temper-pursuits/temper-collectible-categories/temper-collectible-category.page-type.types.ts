import type { TemperPursuitThing } from "../temper-pursuit-things/temper-pursuit-thing.page-type.types.ts"
import type { Collectibles } from "./properties/collectibles.page-property-entry.types.ts"
import type { EsoCategoryIndex } from "./properties/eso-category-index.number-property.types.ts"

export type TemperCollectibleCategory = TemperPursuitThing & {
  esoCategoryIndex?: EsoCategoryIndex
  collectibles?: Collectibles
}
