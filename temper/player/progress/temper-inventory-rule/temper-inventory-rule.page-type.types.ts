import type { CraftShortfall } from "akasha/temper/player/progress/temper-inventory-rule/properties/craft-shortfall.boolean-property.types.ts"
import type { DestinationChain } from "akasha/temper/player/progress/temper-inventory-rule/properties/destination-chain.page-property-entry.types.ts"
import type { FromTemplate } from "akasha/temper/player/progress/temper-inventory-rule/properties/from-template.relation-property.types.ts"
import type { RuleLocked } from "akasha/temper/player/progress/temper-inventory-rule/properties/rule-locked.boolean-property.types.ts"
import type { UpdatedAt } from "akasha/temper/player/progress/temper-inventory-rule/properties/updated-at.instant-property.types.ts"
import type { Action } from "akasha/temper/player/progress/temper-rule/properties/action.relation-property.types.ts"
import type { Active } from "akasha/temper/player/progress/temper-rule/properties/active.boolean-property.types.ts"
import type { ItemCategory } from "akasha/temper/player/progress/temper-rule/properties/item-category.relation-property.types.ts"
import type { TemperRule } from "akasha/temper/player/progress/temper-rule/temper-rule.page-type.types.ts"
import type { AccountPage } from "akasha/temper/thing/properties/account-page.relation-property.types.ts"
import type { DisplayOrder } from "akasha/temper/thing/properties/display-order.number-property.types.ts"

export type TemperInventoryRule = TemperRule & {
  accountPage: AccountPage
  displayOrder: DisplayOrder
  action: Action
  active: Active
  updatedAt: UpdatedAt
  locked?: RuleLocked
  fromTemplate?: FromTemplate
  destinationChain?: DestinationChain
  categoryId: ItemCategory
  craftShortfall?: CraftShortfall
}
