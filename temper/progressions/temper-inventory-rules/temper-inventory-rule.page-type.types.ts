import type { AccountPage } from "../../things/properties/account-page.text-property.ts"
import type { CategoryId } from "../../things/properties/category-id.text-property.ts"
import type { DisplayOrder } from "../../things/properties/display-order.number-property.ts"
import type { Action } from "../temper-rules/properties/action.relation-property.ts"
import type { Active } from "../temper-rules/properties/active.boolean-property.types.ts"
import type { TemperRule } from "../temper-rules/temper-rule.page-type.types.ts"
import type { DestinationChain } from "./properties/destination-chain.page-property-entry.types.ts"
import type { FromTemplate } from "./properties/from-template.relation-property.ts"
import type { RuleLocked } from "./properties/rule-locked.boolean-property.types.ts"
import type { UpdatedAt } from "./properties/updated-at.instant-property.types.ts"

export type TemperInventoryRule = TemperRule & {
  accountPage: AccountPage
  categoryId: CategoryId
  displayOrder: DisplayOrder
  action: Action
  active: Active
  updatedAt: UpdatedAt
  locked?: RuleLocked
  fromTemplate?: FromTemplate
  destinationChain?: DestinationChain
}
