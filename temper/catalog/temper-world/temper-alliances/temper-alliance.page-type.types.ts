import type { EsoAllianceId } from "akasha/temper/catalog/temper-world/properties/eso-alliance-id.number-property.types.ts"
import type { TemperCatalogThing } from "akasha/temper/catalog/things/temper-catalog-thing.page-type.types.ts"

export type TemperAlliance = TemperCatalogThing & {
  esoAllianceId: EsoAllianceId
}
