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

// A WRITE THAT DID NOT LAND SAYS SO. This swallowed whatever the write threw, which was survivable
// while the old store was taking the value regardless. It is not survivable now: five keys reach
// here that akasha carries nothing for — `turn-state`, `turn-end-reading`, `turn-pending-source`,
// `claude-code-session-uuid` and `turn-working` — and each of them used to land in the old store
// and be read back out of it.
//
// Their reads already answer null, and have since the reads moved to akasha; sealing the write is
// what makes that visible rather than what causes it. A caller still gets its quiet return, because
// none of them can do anything about it, but the refusal is said once where a supervisor log will
// hold it.
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
  } catch (thrown) {
    process.stderr.write(
      `${key} was not kept for ${agent}: ${thrown instanceof Error ? thrown.message : String(thrown)}\n`
    )
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
