import type { EsoCollectibleId } from "akasha/temper/catalog/temper-pursuits/temper-pursuit-things/properties/eso-collectible-id.number-property.types.ts"
import type { TemperCatalogThing } from "akasha/temper/catalog/things/temper-catalog-thing.page-type.types.ts"

export type TemperPursuitThing = TemperCatalogThing & {
  esoCollectibleId?: EsoCollectibleId
}
