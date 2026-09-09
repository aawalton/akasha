import type { PageType } from "@akasha/pages/page-type"
import type { ItemName } from "../../characters/temper-mines/properties/item-name.text-property.ts"
import type { ItemId } from "../../temper-catalog/things/properties/item-id.number-property.ts"
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
  saleId: SaleId
  salePrice: SalePrice
  tax: Tax
  netPayout: NetPayout
  itemName?: ItemName
  itemId?: ItemId
  quantity?: SaleQuantity
  guildName?: GuildName
  buyerName?: BuyerName
  soldAt?: SoldAt
}

export const temperSale = {
  id: "019f71f3-8523-7dcc-a2c3-ae8bbddd28ad",
  pageTypeSlug: "page-type",
  slug: "temper-sale",
  definition: "one item sold through a guild store, and what it fetched",
  pluralSlug: "temper-sales",
  extends: ["page-type/temper-thing"],
  parts: [
    "instant-property/sold-at",
    "number-property/net-payout",
    "number-property/sale-price",
    "number-property/sale-quantity",
    "number-property/tax",
    "text-property/buyer-name",
    "text-property/guild-name",
    "text-property/item-name",
    "text-property/sale-id",
  ],
  properties: [
    { pageProperty: "text-property/account-page", required: true, many: false },
    { pageProperty: "text-property/sale-id", required: true, many: false },
    { pageProperty: "number-property/sale-price", required: true, many: false },
    { pageProperty: "number-property/tax", required: true, many: false },
    { pageProperty: "number-property/net-payout", required: true, many: false },
    { pageProperty: "text-property/item-name", required: false, many: false },
    { pageProperty: "number-property/item-id", required: false, many: false },
    { pageProperty: "number-property/sale-quantity", required: false, many: false },
    { pageProperty: "text-property/guild-name", required: false, many: false },
    { pageProperty: "text-property/buyer-name", required: false, many: false },
    { pageProperty: "instant-property/sold-at", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A sale is under the account the seller signed in as.",
    },
    {
      invariantKind: "departure",
      statement:
        "A sale's slug is the sale id in lower case with each run of other characters a dash.",
    },
    {
      invariantKind: "departure",
      statement: "A sale a capture states no price or no tax for reads that value as zero.",
    },
    {
      invariantKind: "departure",
      statement: "A sale carrying no sold-at time is kept with no sold-at value.",
    },
    {
      invariantKind: "departure",
      statement: "A title is the name of the item that sold.",
    },
  ],
} as const satisfies PageType
