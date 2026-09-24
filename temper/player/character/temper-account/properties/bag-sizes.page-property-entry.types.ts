import type { Id } from "akasha/page/properties/id.text-property.types.ts"
import type { Bag } from "akasha/temper/player/character/temper-account/properties/bag.number-property.types.ts"
import type { BagSize } from "akasha/temper/player/character/temper-account/properties/bag-size.number-property.types.ts"
import type { LocationId } from "akasha/temper/player/character/temper-account/properties/location-id.text-property.types.ts"

export type BagSizes = "jsonl"

export type BagSizesRow = {
  id: Id
  locationId: LocationId
  bag: Bag
  bagSize: BagSize
}
