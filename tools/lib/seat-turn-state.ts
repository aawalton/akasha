
import {
  type TurnRecord,
  turnEndReadingOf,
  turnPendingSourceOf,
  turnStateOf,
} from "./seat-turn.ts"
import { type TurnPending, anyPendingRead, pendingOf, pendingOn } from "./seat-turn-pending.ts"
import { type TurnWorking, anyWorking, anyWorkingRead, workingOf } from "./seat-turn-working.ts"

export const SEAT_TURN_STAMPS = ["idle", "stopped"] as const

export type SeatTurnStamp = (typeof SEAT_TURN_STAMPS)[number]

export const SEAT_TURN_STATES = ["working", "idle-pending", "idle", "stopped"] as const

export type SeatTurnState = (typeof SEAT_TURN_STATES)[number]

export interface SeatTurnRecords {
  readonly stamped: TurnRecord | null
  readonly source: TurnRecord | null
  readonly pending: TurnPending
  readonly working: TurnWorking
  readonly reading: TurnRecord | null
}

export interface SeatTurnReading {
  readonly state: SeatTurnState
  readonly waitingOn: string | null
}

const NOTHING_ARRANGED = "none"

const UNSTAMPED: SeatTurnStamp = "idle"

const NO_TURN_TAKEN: SeatTurnState = "stopped"

function idleIn(): SeatTurnReading {
  return { state: "idle", waitingOn: null }
}

export function turnStillToCome(state: SeatTurnState): boolean {
  return state === "working" || state === "idle-pending"
}

export function stampIn(recorded: TurnRecord | null): SeatTurnStamp {
  if (recorded === null) return UNSTAMPED
  const stood = SEAT_TURN_STAMPS.find((one) => one === recorded.value)
  return stood ?? UNSTAMPED
}

export function tookATurn(kept: SeatTurnRecords): boolean {
  if (anyPendingRead(kept.pending)) return true
  if (anyWorkingRead(kept.working)) return true
  return [kept.stamped, kept.source, kept.reading].some((one) => one !== null)
}

export function readSeatTurn(kept: SeatTurnRecords): SeatTurnReading {
  if (!tookATurn(kept)) return { state: NO_TURN_TAKEN, waitingOn: null }
  if (stampIn(kept.stamped) === "stopped") return { state: "stopped", waitingOn: null }
  if (anyWorking(kept.working)) return { state: "working", waitingOn: null }
  if (anyPendingRead(kept.pending)) {
    const on = pendingOn(kept.pending)
    if (on.length === 0) return idleIn()
    return { state: "idle-pending", waitingOn: on.join(", ") }
  }
  const { source } = kept
  if (source !== null && source.value !== NOTHING_ARRANGED) {
    return { state: "idle-pending", waitingOn: source.value }
  }
  return idleIn()
}

export function seatTurnRecordsOf(agent: string): SeatTurnRecords {
  return {
    stamped: turnStateOf(agent),
    source: turnPendingSourceOf(agent),
    pending: pendingOf(agent),
    working: workingOf(agent),
    reading: turnEndReadingOf(agent),
  }
}

export function seatTurnStateOf(agent: string): SeatTurnReading {
  return readSeatTurn(seatTurnRecordsOf(agent))
}

export function seatTurnStateLine(reading: SeatTurnReading): string {
  const said = reading.waitingOn === null ? reading.state : `${reading.state} on ${reading.waitingOn}`
  return `  ${"state".padEnd(8)} ${said}`
}
