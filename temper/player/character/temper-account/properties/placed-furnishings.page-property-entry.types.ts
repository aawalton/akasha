import type { Id } from "akasha/page/properties/id.text-property.types.ts"
import type { Title } from "akasha/page/properties/title.text-property.types.ts"
import type { AmountCount } from "akasha/temper/player/character/temper-account/properties/amount-count.number-property.types.ts"
import type { CollectibleLink } from "akasha/temper/player/character/temper-account/properties/collectible-link.text-property.types.ts"
import type { FurnishingKey } from "akasha/temper/player/character/temper-account/properties/furnishing-key.text-property.types.ts"
import type { ItemLink } from "akasha/temper/player/character/temper-account/properties/item-link.text-property.types.ts"
import type { LocationId } from "akasha/temper/player/character/temper-account/properties/location-id.text-property.types.ts"
import type { MarketValue } from "akasha/temper/player/character/temper-account/properties/market-value.number-property.types.ts"
import type { MinPrice } from "akasha/temper/player/character/temper-account/properties/min-price.number-property.types.ts"
import type { SaleAmountCount } from "akasha/temper/player/character/temper-account/properties/sale-amount-count.number-property.types.ts"
import type { SaleAvg } from "akasha/temper/player/character/temper-account/properties/sale-avg.number-property.types.ts"
import type { SuggestedPrice } from "akasha/temper/player/character/temper-account/properties/suggested-price.number-property.types.ts"
import type { ItemQuality } from "akasha/temper/player/character/temper-mine/properties/item-quality.number-property.types.ts"

export type PlacedFurnishings = "jsonl"

export type PlacedFurnishingsRow = {
  id: Id
  locationId: LocationId
  furnishingKey: FurnishingKey
  title: Title
  quality?: ItemQuality
  itemLink?: ItemLink
  collectibleLink?: CollectibleLink
  saleAvg?: SaleAvg
  minPrice?: MinPrice
  amountCount?: AmountCount
  saleAmountCount?: SaleAmountCount
  suggestedPrice?: SuggestedPrice
  marketValue?: MarketValue
}
