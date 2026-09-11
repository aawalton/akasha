import type { Description } from "akasha/pages/properties/description.text-property.ts"
import type { TemperProgressThing } from "akasha/temper/progressions/things/temper-progress-thing.page-type.types.ts"
import type { DisplayOrder } from "akasha/temper/things/properties/display-order.number-property.types.ts"

export type TemperRuleGoal = TemperProgressThing & {
  description: Description
  displayOrder: DisplayOrder
}
