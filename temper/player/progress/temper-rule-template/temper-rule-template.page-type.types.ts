import type { Description } from "akasha/page/properties/description.text-property.types.ts"
import type { Action } from "akasha/temper/player/progress/temper-rule/properties/action.relation-property.types.ts"
import type { Active } from "akasha/temper/player/progress/temper-rule/properties/active.boolean-property.types.ts"
import type { Goal } from "akasha/temper/player/progress/temper-rule/properties/goal.relation-property.types.ts"
import type { ItemCategory } from "akasha/temper/player/progress/temper-rule/properties/item-category.relation-property.types.ts"
import type { TemperRule } from "akasha/temper/player/progress/temper-rule/temper-rule.page-type.types.ts"
import type { DisplayOrder } from "akasha/temper/thing/properties/display-order.number-property.types.ts"
import type { Key } from "akasha/temper/thing/properties/key.text-property.types.ts"

export type TemperRuleTemplate = TemperRule & {
  key: Key
  description: Description
  displayOrder: DisplayOrder
  action: Action
  active: Active
  goal: Goal
  categoryId: ItemCategory
}
