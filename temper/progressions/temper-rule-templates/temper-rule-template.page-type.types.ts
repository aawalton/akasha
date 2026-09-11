import type { Description } from "akasha/pages/properties/description.text-property.types.ts"
import type { Action } from "akasha/temper/progressions/temper-rules/properties/action.relation-property.types.ts"
import type { Active } from "akasha/temper/progressions/temper-rules/properties/active.boolean-property.types.ts"
import type { Goal } from "akasha/temper/progressions/temper-rules/properties/goal.relation-property.types.ts"
import type { TemperRule } from "akasha/temper/progressions/temper-rules/temper-rule.page-type.types.ts"
import type { CategoryId } from "akasha/temper/things/properties/category-id.text-property.types.ts"
import type { DisplayOrder } from "akasha/temper/things/properties/display-order.number-property.types.ts"
import type { Key } from "akasha/temper/things/properties/key.text-property.types.ts"

export type TemperRuleTemplate = TemperRule & {
  key: Key
  description: Description
  categoryId: CategoryId
  displayOrder: DisplayOrder
  action: Action
  active: Active
  goal: Goal
}
