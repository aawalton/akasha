import { principalSeatIdOf } from "./seat-principal.ts"
import { type Seated, seatsPresent } from "./seat-roster.ts"

export function seatChildrenOf(parentAgentId: string): readonly Seated[] {
  return seatsPresent().filter((one) => principalSeatIdOf(one.id) === parentAgentId)
}

export function countLiveSeatChildren(parentAgentId: string): number {
  return seatChildrenOf(parentAgentId).length
}
