import type { DestinationChain } from "akasha/temper/progressions/temper-inventory-rules/properties/destination-chain.page-property-entry.types.ts"
import type { FromTemplate } from "akasha/temper/progressions/temper-inventory-rules/properties/from-template.relation-property.types.ts"
import type { RuleLocked } from "akasha/temper/progressions/temper-inventory-rules/properties/rule-locked.boolean-property.types.ts"
import type { UpdatedAt } from "akasha/temper/progressions/temper-inventory-rules/properties/updated-at.instant-property.types.ts"
import type { Action } from "akasha/temper/progressions/temper-rules/properties/action.relation-property.types.ts"
import type { Active } from "akasha/temper/progressions/temper-rules/properties/active.boolean-property.types.ts"
import type { TemperRule } from "akasha/temper/progressions/temper-rules/temper-rule.page-type.types.ts"
import type { AccountPage } from "akasha/temper/things/properties/account-page.text-property.types.ts"
import type { CategoryId } from "akasha/temper/things/properties/category-id.text-property.types.ts"
import type { DisplayOrder } from "akasha/temper/things/properties/display-order.number-property.types.ts"

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
