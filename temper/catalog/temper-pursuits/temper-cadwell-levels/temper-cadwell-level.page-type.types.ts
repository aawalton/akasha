import type { DisplayOrder } from "../../../things/properties/display-order.number-property.types.ts"
import type { TemperPursuitThing } from "../temper-pursuit-things/temper-pursuit-thing.page-type.types.ts"
import type { CadwellStops } from "./properties/cadwell-stops.page-property-entry.types.ts"

export type TemperCadwellLevel = TemperPursuitThing & {
  displayOrder: DisplayOrder
  cadwellStops: CadwellStops
}
