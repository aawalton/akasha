import type { Description } from "akasha/page/properties/description.text-property.types.ts"
import type { TemperProgressThing } from "akasha/temper/progress/thing/temper-progress-thing.page-type.types.ts"
import type { DisplayOrder } from "akasha/temper/thing/properties/display-order.number-property.types.ts"

export type TemperRuleGoal = TemperProgressThing & {
  description: Description
  displayOrder: DisplayOrder
}
