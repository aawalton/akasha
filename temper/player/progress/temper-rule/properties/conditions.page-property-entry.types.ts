import type { Id } from "akasha/page/properties/id.text-property.types.ts"
import type { ConditionField } from "akasha/temper/player/progress/temper-rule/properties/condition-field.relation-property.types.ts"
import type { ConditionValue } from "akasha/temper/player/progress/temper-rule/properties/condition-value.text-property.types.ts"

export type Conditions = "jsonl"

export type ConditionsRow = {
  id: Id
  conditionField: ConditionField
  conditionValue: ConditionValue
}
