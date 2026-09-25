import type { ItemId } from "akasha/temper/catalog/thing/properties/item-id.number-property.types.ts"
import type { ItemName } from "akasha/temper/player/holdings/temper-sale/properties/item-name.text-property.types.ts"
import type { DestinationChain } from "akasha/temper/player/progress/temper-inventory-rule/properties/destination-chain.page-property-entry.types.ts"
import type { RuleLocked } from "akasha/temper/player/progress/temper-inventory-rule/properties/rule-locked.boolean-property.types.ts"
import type { UpdatedAt } from "akasha/temper/player/progress/temper-inventory-rule/properties/updated-at.instant-property.types.ts"
import type { StockQuantity } from "akasha/temper/player/progress/temper-item-rule/properties/stock-quantity.number-property.types.ts"
import type { Action } from "akasha/temper/player/progress/temper-rule/properties/action.relation-property.types.ts"
import type { Active } from "akasha/temper/player/progress/temper-rule/properties/active.boolean-property.types.ts"
import type { TemperRule } from "akasha/temper/player/progress/temper-rule/temper-rule.page-type.types.ts"
import type { AccountPage } from "akasha/temper/thing/properties/account-page.relation-property.types.ts"
import type { DisplayOrder } from "akasha/temper/thing/properties/display-order.number-property.types.ts"

export type TemperItemRule = TemperRule & {
  accountPage: AccountPage
  itemId: ItemId
  name: ItemName
  displayOrder: DisplayOrder
  action: Action
  active: Active
  updatedAt: UpdatedAt
  locked?: RuleLocked
  destinationChain?: DestinationChain
  stockQuantity?: StockQuantity
}
