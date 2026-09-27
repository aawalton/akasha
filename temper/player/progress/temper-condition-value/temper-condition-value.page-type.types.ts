import type { ConditionValueField } from "akasha/temper/player/progress/temper-condition-value/properties/condition-value-field.relation-property.types.ts"
import type { TemperProgressThing } from "akasha/temper/player/progress/thing/temper-progress-thing.page-type.types.ts"
import type { DisplayOrder } from "akasha/temper/thing/properties/display-order.number-property.types.ts"
import type { Key } from "akasha/temper/thing/properties/key.text-property.types.ts"

export type TemperConditionValue = TemperProgressThing & {
  key: Key
  conditionField: ConditionValueField
  displayOrder: DisplayOrder
}
