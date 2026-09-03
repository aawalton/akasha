import { seatNameForAgent } from "../../akasha/seat-system/seat-presence-read/seat-presence-read.module.code.ts"
import { seatAbove } from "../../akasha/seat-system/subagent-naming/subagent-naming.module.code.ts"
import { type SeatTurnReading, seatTurnStateOf } from "./seat-turn-state.ts"
import { subagentStands, subagentTurnOf } from "./subagent-turn.ts"

export function agentTurnStateOf(agent: string): SeatTurnReading {
  return seatAbove(agent) === null ? seatTurnStateOf(agent) : subagentTurnOf(agent)
}

export function agentStands(agent: string): boolean {
  return seatAbove(agent) === null ? seatNameForAgent(agent) !== null : subagentStands(agent)
}
