import type { Id } from "akasha/page/properties/id.text-property.types.ts"
import type { CharacterConditions } from "akasha/temper/player/progress/temper-inventory-rule/properties/character-conditions.record-property.types.ts"
import type { TargetQuantity } from "akasha/temper/player/progress/temper-inventory-rule/properties/target-quantity.number-property.types.ts"
import type { Destination } from "akasha/temper/player/progress/temper-rule/properties/destination.text-property.types.ts"

export type DestinationChain = "jsonl"

export type DestinationChainRow = {
  id: Id
  destination: Destination
  targetQuantity?: TargetQuantity
  characterConditions?: CharacterConditions
}
