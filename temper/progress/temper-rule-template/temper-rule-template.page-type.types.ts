import type { Description } from "akasha/page/properties/description.text-property.types.ts"
import type { Action } from "akasha/temper/progress/temper-rule/properties/action.relation-property.types.ts"
import type { Active } from "akasha/temper/progress/temper-rule/properties/active.boolean-property.types.ts"
import type { Goal } from "akasha/temper/progress/temper-rule/properties/goal.relation-property.types.ts"
import type { TemperRule } from "akasha/temper/progress/temper-rule/temper-rule.page-type.types.ts"
import type { CategoryId } from "akasha/temper/thing/properties/category-id.text-property.types.ts"
import type { DisplayOrder } from "akasha/temper/thing/properties/display-order.number-property.types.ts"
import type { Key } from "akasha/temper/thing/properties/key.text-property.types.ts"

export type TemperRuleTemplate = TemperRule & {
  key: Key
  description: Description
  categoryId: CategoryId
  displayOrder: DisplayOrder
  action: Action
  active: Active
  goal: Goal
}
