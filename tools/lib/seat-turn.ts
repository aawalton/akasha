
import { keepSeatRecord, type SeatRecord, seatRecordOf } from "./seat-record.ts"

export type TurnRecord = SeatRecord

const TURN_KEY = "turn"

const START_KEY = "turn-start-source"

const STARTED_KEY = "turn-start"

const STATE_KEY = "turn-state"

export function turnOf(agent: string): TurnRecord | null {
  return seatRecordOf(agent, TURN_KEY)
}

export function setTurn(agent: string, value: string): void {
  keepSeatRecord(agent, TURN_KEY, value)
}

export function turnStartOf(agent: string): TurnRecord | null {
  return seatRecordOf(agent, STARTED_KEY)
}

export function setTurnStart(agent: string, value: string): void {
  keepSeatRecord(agent, STARTED_KEY, value)
}

export function turnStateOf(agent: string): TurnRecord | null {
  return seatRecordOf(agent, STATE_KEY)
}

export function setTurnState(agent: string, value: string): void {
  keepSeatRecord(agent, STATE_KEY, value)
}

export function turnStartSourceOf(agent: string): TurnRecord | null {
  return seatRecordOf(agent, START_KEY)
}

export function setTurnStartSource(agent: string, value: string): void {
  keepSeatRecord(agent, START_KEY, value)
}

function keptLine(label: string, recorded: TurnRecord | null, absent: string): string {
  const said =
    recorded === null ? absent : `${recorded.value} (read ${new Date(recorded.at).toISOString()})`
  return `  ${label.padEnd(8)} ${said}`
}

export function turnLine(recorded: TurnRecord | null): string {
  return keptLine("turn", recorded, "— no turn end read")
}

export function turnStartSourceLine(recorded: TurnRecord | null): string {
  return keptLine("source", recorded, "— no turn end measured")
}

export function turnStartLine(recorded: TurnRecord | null): string {
  return keptLine("started", recorded, "— no turn start stamped")
}
