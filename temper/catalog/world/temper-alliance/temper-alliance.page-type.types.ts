import type { HashPlace } from "akasha/temper/catalog/companion/trait/properties/hash-place.number-property.types.ts"
import type { TemperCatalogThing } from "akasha/temper/catalog/thing/temper-catalog-thing.page-type.types.ts"
import type { EsoAllianceId } from "akasha/temper/catalog/world/temper-alliance/properties/eso-alliance-id.number-property.types.ts"

export type TemperAlliance = TemperCatalogThing & {
  esoAllianceId: EsoAllianceId
  hashPlace?: HashPlace
}
