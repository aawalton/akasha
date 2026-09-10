import type { Description } from "../../../pages/properties/description.text-property.ts"
import type { CategoryId } from "../../things/properties/category-id.text-property.ts"
import type { DisplayOrder } from "../../things/properties/display-order.number-property.ts"
import type { Key } from "../../things/properties/key.text-property.ts"
import type { Action } from "../temper-rules/properties/action.relation-property.ts"
import type { Active } from "../temper-rules/properties/active.boolean-property.ts"
import type { Goal } from "../temper-rules/properties/goal.relation-property.ts"
import type { TemperRule } from "../temper-rules/temper-rule.page-type.types.ts"

export type TemperRuleTemplate = TemperRule & {
  key: Key
  description: Description
  categoryId: CategoryId
  displayOrder: DisplayOrder
  action: Action
  active: Active
  goal: Goal
}
