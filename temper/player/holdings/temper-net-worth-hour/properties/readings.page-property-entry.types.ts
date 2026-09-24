import type { Id } from "akasha/page/properties/id.text-property.types.ts"
import type { CapturedAt } from "akasha/temper/catalog/world/properties/captured-at.instant-property.types.ts"
import type { CurrencyGoldValue } from "akasha/temper/player/holdings/temper-net-worth-hour/properties/currency-gold-value.number-property.types.ts"
import type { ExcludedGuildBankValue } from "akasha/temper/player/holdings/temper-net-worth-hour/properties/excluded-guild-bank-value.number-property.types.ts"
import type { GoldAmount } from "akasha/temper/player/holdings/temper-net-worth-hour/properties/gold-amount.number-property.types.ts"
import type { ItemValue } from "akasha/temper/player/holdings/temper-net-worth-hour/properties/item-value.number-property.types.ts"
import type { TotalValue } from "akasha/temper/player/holdings/thing/properties/total-value.number-property.types.ts"
import type { AccountPage } from "akasha/temper/thing/properties/account-page.relation-property.types.ts"

export type Readings = "jsonl"

export type ReadingsRow = {
  id: Id
  accountPage: AccountPage
  capturedAt: CapturedAt
  totalValue: TotalValue
  goldAmount?: GoldAmount
  currencyGoldValue?: CurrencyGoldValue
  itemValue?: ItemValue
  excludedGuildBankValue?: ExcludedGuildBankValue
}
