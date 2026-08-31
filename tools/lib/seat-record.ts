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

// FIVE KEYS REACH HERE THAT AKASHA CARRIES NOTHING FOR, AND THEY ARE NAMED RATHER THAN SAID:
// `turn-state`, `turn-end-reading`, `turn-pending-source`, `claude-code-session-uuid` and
// `turn-working`. Each used to land in the old store and be read back out of it. Their reads have
// answered null since the reads moved to akasha, so sealing the write made an existing loss
// visible rather than causing one.
//
// SAYING IT AT THE WRITE WAS WRONG AND WAS TAKEN BACK OUT WITHIN THE HOUR. These are written every
// beat by every seat, so a refusal per write is not a report, it is one line per seat per beat —
// and this runs inside a live agent's terminal, where stderr is that agent's screen. It printed
// into astra's prompt while she was working. A diagnostic that interrupts eleven people to tell
// them something already known and written down costs more than the silence it replaces.
//
// So the refusal stands where it belongs, at `keepBeside`, which refuses a key akasha does not
// carry instead of dropping it. A caller here gets its quiet return, because no caller can do
// anything about it; what carries a key is a declaration on the seat page type, which is a change
// to make once and not a thing to discover at runtime.
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
