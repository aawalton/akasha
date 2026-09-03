import { initiativeOf } from "../../akasha/seat-system/seat-initiative/seat-initiative.module.code.ts"
import { seatPageAgents } from "../../akasha/seat-system/seat-presence-read/seat-presence-read.module.code.ts"
import { SEAT_TURN_STATES, type SeatTurnState, seatTurnStateOf } from "./seat-turn-state.ts"

export interface SeatHolding {
  readonly initiative: string | null
  readonly state: SeatTurnState
}

export interface SeatWork {
  readonly byInitiative: ReadonlyMap<string, SeatTurnState>
}

export function louder(a: SeatTurnState, b: SeatTurnState): SeatTurnState {
  return SEAT_TURN_STATES.indexOf(a) <= SEAT_TURN_STATES.indexOf(b) ? a : b
}

function keep(into: Map<string, SeatTurnState>, key: string | null, state: SeatTurnState): void {
  if (key === null) return
  const standing = into.get(key)
  into.set(key, standing === undefined ? state : louder(standing, state))
}

export function foldSeatWork(held: readonly SeatHolding[]): SeatWork {
  const byInitiative = new Map<string, SeatTurnState>()
  for (const one of held) {
    keep(byInitiative, one.initiative, one.state)
  }
  return { byInitiative }
}

export function seatHoldingsNow(): readonly SeatHolding[] {
  return seatPageAgents().map((agent) => ({
    initiative: initiativeOf(agent)?.value ?? null,
    state: seatTurnStateOf(agent).state,
  }))
}

export function seatWorkNow(): SeatWork {
  return foldSeatWork(seatHoldingsNow())
}
