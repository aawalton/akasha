import type { CadwellStops } from "akasha/temper/catalog/temper-pursuit/temper-cadwell-level/properties/cadwell-stops.page-property-entry.types.ts"
import type { TemperPursuitThing } from "akasha/temper/catalog/temper-pursuit/thing/temper-pursuit-thing.page-type.types.ts"
import type { DisplayOrder } from "akasha/temper/thing/properties/display-order.number-property.types.ts"

export type TemperCadwellLevel = TemperPursuitThing & {
  displayOrder: DisplayOrder
  cadwellStops: CadwellStops
}
