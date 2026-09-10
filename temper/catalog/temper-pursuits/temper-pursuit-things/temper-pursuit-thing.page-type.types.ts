import type { TemperCatalogThing } from "../../things/temper-catalog-thing.page-type.types.ts"
import type { EsoCollectibleId } from "./properties/eso-collectible-id.number-property.ts"

export type TemperPursuitThing = TemperCatalogThing & {
  esoCollectibleId?: EsoCollectibleId
}
