import type { MoveToDestination } from "./inventory-rule-types"
import type { CharacterId } from "./use-destination-types"

export interface TierAllocation {
  readonly tierIndex: number
  readonly destination: MoveToDestination
  readonly charId?: CharacterId
  readonly count: number
}
