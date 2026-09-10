import type { TemperCatalogThing } from "../../../temper-catalog/things/temper-catalog-thing.page-type.types.ts"
import type { EsoAllianceId } from "../properties/eso-alliance-id.number-property.ts"

export type TemperAlliance = TemperCatalogThing & {
  esoAllianceId: EsoAllianceId
}
