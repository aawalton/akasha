
import { keepSeatRecord, seatRecordOf } from "./seat-record.ts"

export const FRESH = "startup"

export const RETAINED = "resume"

export const CONTEXT_REPLACED = "context-replaced"

export interface Epoch {
  readonly source: string
  readonly at: number
}

export function recordEpoch(agent: string, source: string, at: number = Date.now()): void {
  keepSeatRecord(agent, CONTEXT_REPLACED, source, at)
}

export function epochOf(agent: string): Epoch | null {
  const held = seatRecordOf(agent, CONTEXT_REPLACED)
  return held === null ? null : { source: held.value, at: held.at }
}

export function replacedAt(agent: string): number {
  const epoch = epochOf(agent)
  return epoch === null || epoch.source === RETAINED ? 0 : epoch.at
}
