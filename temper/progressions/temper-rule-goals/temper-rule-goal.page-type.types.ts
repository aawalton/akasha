import type { Description } from "../../../pages/properties/description.text-property.ts"
import type { DisplayOrder } from "../../things/properties/display-order.number-property.ts"
import type { TemperProgressThing } from "../things/temper-progress-thing.page-type.types.ts"

export type TemperRuleGoal = TemperProgressThing & {
  description: Description
  displayOrder: DisplayOrder
}
