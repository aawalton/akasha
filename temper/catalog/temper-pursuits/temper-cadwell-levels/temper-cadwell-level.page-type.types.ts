import type { CadwellStops } from "akasha/temper/catalog/temper-pursuits/temper-cadwell-levels/properties/cadwell-stops.page-property-entry.types.ts"
import type { TemperPursuitThing } from "akasha/temper/catalog/temper-pursuits/temper-pursuit-things/temper-pursuit-thing.page-type.types.ts"
import type { DisplayOrder } from "akasha/temper/things/properties/display-order.number-property.types.ts"

export type TemperCadwellLevel = TemperPursuitThing & {
  displayOrder: DisplayOrder
  cadwellStops: CadwellStops
}
