
import { seatPageForAgent } from "./seat-presence-read.ts"
import { type SeatTurnReading, seatTurnStateOf } from "./seat-turn-state.ts"
import { seatAbove } from "./subagent.ts"
import { subagentStands, subagentTurnOf } from "./subagent-turn.ts"

export function agentTurnStateOf(agent: string): SeatTurnReading {
  return seatAbove(agent) === null ? seatTurnStateOf(agent) : subagentTurnOf(agent)
}

export function agentStands(agent: string): boolean {
  return seatAbove(agent) === null ? seatPageForAgent(agent) !== null : subagentStands(agent)
}
