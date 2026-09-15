import type { EsoCollectibleId } from "akasha/temper/catalog/temper-pursuit/thing/properties/eso-collectible-id.number-property.types.ts"
import type { TemperCatalogThing } from "akasha/temper/catalog/thing/temper-catalog-thing.page-type.types.ts"

export type TemperPursuitThing = TemperCatalogThing & {
  esoCollectibleId?: EsoCollectibleId
}
