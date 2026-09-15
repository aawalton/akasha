import type { TemperPursuitThing } from "akasha/temper/catalog/temper-pursuits/temper-pursuit-thing/temper-pursuit-thing.page-type.types.ts"
import type { Traits } from "akasha/temper/catalog/temper-pursuits/temper-research-line/properties/traits.page-property-entry.types.ts"
import type { DisplayOrder } from "akasha/temper/thing/properties/display-order.number-property.types.ts"
import type { Parent } from "akasha/temper/thing/properties/parent.text-property.types.ts"

export type TemperResearchLine = TemperPursuitThing & {
  parent: Parent
  displayOrder: DisplayOrder
  traits: Traits
}
