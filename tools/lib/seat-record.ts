import { akashaSeatRecordOf } from "./seat-akasha-read.ts"
import { dropBeside, keepBeside } from "./seat-beside.ts"
import { seatPageForAgent } from "./seat-presence-read.ts"

export interface SeatRecord {
  readonly value: string
  readonly at: number
}

// WHAT A SEAT OBSERVES IS READ FROM AKASHA. This read the old store first and akasha second, on the
// stated understanding that the first read goes when no writer writes outside akasha. It goes now,
// a step ahead of that rather than behind it: a reader still on the old store is a reader that
// silently freezes the moment the writes stop, and there is no signal for it — the values simply
// stop moving. Moving the reads first makes the writes safe to stop.
//
// Checked value by value across the fleet before it changed, over every key a seat carries: akasha
// answers the same as the old store for all of them.
//
// THE STAMP IS NOT THE SAME AND CANNOT BE. The old store kept the moment each value was written
// beside the value; akasha keeps the value, and the moment is the seat's sidecar being written. So
// a stamp read here is the newest the value could be rather than the moment it was set.
export function seatRecordOf(agent: string, key: string): SeatRecord | null {
  if (agent === "") return null
  return akashaSeatRecordOf(agent, key)
}

export function keepSeatRecord(
  agent: string,
  key: string,
  value: string,
  at: number = Date.now()
): void {
  if (agent === "" || value === "") return
  const page = seatPageForAgent(agent)
  if (page === null) return
  try {
    keepBeside(page, { [key]: { value, at } })
  } catch {
    return
  }
}

export function backfillSeatRecord(agent: string, key: string, held: string | null): void {
  if (held === null || held === "") return
  if (seatRecordOf(agent, key) !== null) return
  keepSeatRecord(agent, key, held)
}

export function dropSeatRecord(agent: string, key: string): void {
  if (agent === "") return
  const page = seatPageForAgent(agent)
  if (page === null) return
  try {
    dropBeside(page, [key])
  } catch {
    return
  }
}
