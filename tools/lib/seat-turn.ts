
import { keepSeatRecord, type SeatRecord, seatRecordOf } from "./seat-record.ts"

export type TurnRecord = SeatRecord

const READING_KEY = "turn-end-reading"

const PENDING_SOURCE_KEY = "turn-pending-source"

const STATE_KEY = "turn-state"

export function turnEndReadingOf(agent: string): TurnRecord | null {
  return seatRecordOf(agent, READING_KEY)
}

export function setTurnEndReading(agent: string, value: string): void {
  keepSeatRecord(agent, READING_KEY, value)
}

export function turnStateOf(agent: string): TurnRecord | null {
  return seatRecordOf(agent, STATE_KEY)
}

export function setTurnState(agent: string, value: string): void {
  keepSeatRecord(agent, STATE_KEY, value)
}

export function turnPendingSourceOf(agent: string): TurnRecord | null {
  return seatRecordOf(agent, PENDING_SOURCE_KEY)
}

export function setTurnPendingSource(agent: string, value: string): void {
  keepSeatRecord(agent, PENDING_SOURCE_KEY, value)
}

function keptLine(label: string, recorded: TurnRecord | null, absent: string): string {
  const said =
    recorded === null ? absent : `${recorded.value} (read ${new Date(recorded.at).toISOString()})`
  return `  ${label.padEnd(8)} ${said}`
}

export function turnEndReadingLine(recorded: TurnRecord | null): string {
  return keptLine("reading", recorded, "— no turn end read")
}

export function turnPendingSourceLine(recorded: TurnRecord | null): string {
  return keptLine("source", recorded, "— no turn end measured")
}
