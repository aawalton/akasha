import type { ItemId } from "akasha/temper/catalog/thing/properties/item-id.number-property.types.ts"
import type { ItemName } from "akasha/temper/player/holdings/temper-sale/properties/item-name.text-property.types.ts"
import type { BuyTargetQuantity } from "akasha/temper/player/progress/temper-buy-rule/properties/buy-target-quantity.number-property.types.ts"
import type { RuleLocked } from "akasha/temper/player/progress/temper-inventory-rule/properties/rule-locked.boolean-property.types.ts"
import type { UpdatedAt } from "akasha/temper/player/progress/temper-inventory-rule/properties/updated-at.instant-property.types.ts"
import type { Active } from "akasha/temper/player/progress/temper-rule/properties/active.boolean-property.types.ts"
import type { Goal } from "akasha/temper/player/progress/temper-rule/properties/goal.relation-property.types.ts"
import type { TemperProgressThing } from "akasha/temper/player/progress/thing/temper-progress-thing.page-type.types.ts"
import type { AccountPage } from "akasha/temper/thing/properties/account-page.relation-property.types.ts"
import type { DisplayOrder } from "akasha/temper/thing/properties/display-order.number-property.types.ts"

export type TemperBuyRule = TemperProgressThing & {
  accountPage: AccountPage
  itemId: ItemId
  name: ItemName
  displayOrder: DisplayOrder
  active: Active
  updatedAt: UpdatedAt
  locked?: RuleLocked
  goal?: Goal
  targetQuantity: BuyTargetQuantity
}
