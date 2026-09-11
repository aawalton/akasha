import type { MoveToDestination } from "akasha/temper/items-rules-core/inventory-rule-types/inventory-rule-types.module.code.ts"
import type { CharacterId } from "akasha/temper/items-rules-core/use-destination-types/use-destination-types.module.code.ts"

export interface TierAllocation {
  readonly tierIndex: number
  readonly destination: MoveToDestination
  readonly charId?: CharacterId
  readonly count: number
}
