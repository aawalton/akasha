import { existsSync } from "node:fs"
import { seatAbove } from "../../akasha/seat-system/subagent-naming/subagent-naming.module.code.ts"
import { type SeatTurnReading, type SeatTurnState, seatTurnStateOf } from "./seat-turn-state.ts"
import { subagentPagePathFor } from "./subagent-page-read.ts"

const SEAT_GONE: SeatTurnState = "stopped"

export function subagentStands(agent: string): boolean {
  const page = subagentPagePathFor(agent)
  return page !== null && existsSync(page)
}

export function readSubagentTurn(stands: boolean, above: SeatTurnState): SeatTurnReading {
  if (!stands) return { state: "stopped", waitingOn: null }
  if (above === SEAT_GONE) return { state: "stopped", waitingOn: null }
  return { state: "working", waitingOn: null }
}

export function subagentTurnOf(agent: string): SeatTurnReading {
  const seat = seatAbove(agent)
  const above = seat === null ? SEAT_GONE : seatTurnStateOf(seat).state
  return readSubagentTurn(subagentStands(agent), above)
}
