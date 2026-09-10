import type { DisplayOrder } from "../../../things/properties/display-order.number-property.ts"
import type { TemperPursuitThing } from "../temper-pursuit-things/temper-pursuit-thing.page-type.types.ts"
import type { CadwellStops } from "./properties/cadwell-stops.page-property-entry.ts"

export type TemperCadwellLevel = TemperPursuitThing & {
  displayOrder: DisplayOrder
  cadwellStops: CadwellStops
}
