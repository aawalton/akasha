import type { DisplayOrder } from "../../../things/properties/display-order.number-property.ts"
import type { Parent } from "../../../things/properties/parent.text-property.ts"
import type { TemperPursuitThing } from "../temper-pursuit-things/temper-pursuit-thing.page-type.types.ts"
import type { Traits } from "./properties/traits.page-property-entry.ts"

export type TemperResearchLine = TemperPursuitThing & {
  parent: Parent
  displayOrder: DisplayOrder
  traits: Traits
}
