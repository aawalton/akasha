import type { ItemId } from "akasha/temper/catalog/thing/properties/item-id.number-property.types.ts"
import type { BuyerName } from "akasha/temper/player/holdings/temper-sale/properties/buyer-name.text-property.types.ts"
import type { ItemName } from "akasha/temper/player/holdings/temper-sale/properties/item-name.text-property.types.ts"
import type { NetPayout } from "akasha/temper/player/holdings/temper-sale/properties/net-payout.number-property.types.ts"
import type { SaleGuild } from "akasha/temper/player/holdings/temper-sale/properties/sale-guild.relation-property.types.ts"
import type { SaleId } from "akasha/temper/player/holdings/temper-sale/properties/sale-id.text-property.types.ts"
import type { SalePrice } from "akasha/temper/player/holdings/temper-sale/properties/sale-price.number-property.types.ts"
import type { SaleQuantity } from "akasha/temper/player/holdings/temper-sale/properties/sale-quantity.number-property.types.ts"
import type { SoldAt } from "akasha/temper/player/holdings/temper-sale/properties/sold-at.instant-property.types.ts"
import type { Tax } from "akasha/temper/player/holdings/temper-sale/properties/tax.number-property.types.ts"
import type { AccountPage } from "akasha/temper/thing/properties/account-page.relation-property.types.ts"
import type { TemperThing } from "akasha/temper/thing/temper-thing.page-type.types.ts"

export type TemperSale = TemperThing & {
  accountPage: AccountPage
  saleId: SaleId
  salePrice: SalePrice
  tax: Tax
  netPayout: NetPayout
  name?: ItemName
  itemId?: ItemId
  quantity?: SaleQuantity
  buyerName?: BuyerName
  soldAt?: SoldAt
  guild?: SaleGuild
}
