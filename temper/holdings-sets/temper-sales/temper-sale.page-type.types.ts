import type { ItemId } from "akasha/temper/catalog/things/properties/item-id.number-property.types.ts"
import type { ItemName } from "akasha/temper/characters/temper-mines/properties/item-name.text-property.types.ts"
import type { BuyerName } from "akasha/temper/holdings-sets/temper-sales/properties/buyer-name.text-property.types.ts"
import type { GuildName } from "akasha/temper/holdings-sets/temper-sales/properties/guild-name.text-property.types.ts"
import type { NetPayout } from "akasha/temper/holdings-sets/temper-sales/properties/net-payout.number-property.types.ts"
import type { SaleId } from "akasha/temper/holdings-sets/temper-sales/properties/sale-id.text-property.types.ts"
import type { SalePrice } from "akasha/temper/holdings-sets/temper-sales/properties/sale-price.number-property.types.ts"
import type { SaleQuantity } from "akasha/temper/holdings-sets/temper-sales/properties/sale-quantity.number-property.types.ts"
import type { SoldAt } from "akasha/temper/holdings-sets/temper-sales/properties/sold-at.instant-property.types.ts"
import type { Tax } from "akasha/temper/holdings-sets/temper-sales/properties/tax.number-property.types.ts"
import type { AccountPage } from "akasha/temper/things/properties/account-page.text-property.types.ts"
import type { TemperThing } from "akasha/temper/things/temper-thing.page-type.types.ts"

export type TemperSale = TemperThing & {
  accountPage: AccountPage
  saleId: SaleId
  salePrice: SalePrice
  tax: Tax
  netPayout: NetPayout
  name?: ItemName
  itemId?: ItemId
  quantity?: SaleQuantity
  guildName?: GuildName
  buyerName?: BuyerName
  soldAt?: SoldAt
}
