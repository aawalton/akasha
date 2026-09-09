import type { ItemName } from "../../characters/temper-mines/properties/item-name.text-property.ts"
import type { ItemId } from "../../temper-catalog/things/properties/item-id.number-property.ts"
import type { AccountPage } from "../../things/properties/account-page.text-property.ts"
import type { TemperThing } from "../../things/temper-thing.page-type.ts"
import type { BuyerName } from "./properties/buyer-name.text-property.ts"
import type { GuildName } from "./properties/guild-name.text-property.ts"
import type { NetPayout } from "./properties/net-payout.number-property.ts"
import type { SaleId } from "./properties/sale-id.text-property.ts"
import type { SalePrice } from "./properties/sale-price.number-property.ts"
import type { SaleQuantity } from "./properties/sale-quantity.number-property.ts"
import type { SoldAt } from "./properties/sold-at.instant-property.ts"
import type { Tax } from "./properties/tax.number-property.ts"

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
