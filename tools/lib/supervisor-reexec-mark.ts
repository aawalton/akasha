import { keepSeatRecord, seatRecordOf } from "./seat-record.ts"

/**
 * The ask that a supervisor be replaced in place, written where the seat's other state is written.
 *
 * A KEY RATHER THAN A SIGNAL, because the flag this stands in for lives in the supervisor's memory
 * where nothing outside can set it. As a key, the whole act is one anything can perform: write
 * this, then SIGTERM the pid the sidecar records — both of which `ops seat stop` already does.
 *
 * SIGTERM IS STILL THE SIGNAL, which is what makes this safe to land before the fleet carries it.
 * A supervisor with none of this code takes the SIGTERM and shuts down as it always has. A signal
 * of its own would have been fatal to exactly those supervisors, its default disposition being to
 * terminate.
 *
 * TAKEN RATHER THAN DELETED, and taken by whoever came up for it. An ask left standing would turn
 * every later SIGTERM into a re-exec, and the seat could never be stopped at all.
 */
const KEY = "reexec-asked"

/**
 * WORDS NO YAML READS AS A BOOLEAN. `yes` and `no` are booleans under YAML 1.1, so a reader other
 * than the one writing here would hand back `true` and the comparison below would quietly never
 * match — an ask that reads as absent, and a SIGTERM that ends the seat instead of replacing its
 * supervisor. These two say the same thing and cannot be read as anything but text.
 */
const ASKED = "asked"

const TAKEN = "taken"

export function reExecAsked(agent: string | null): boolean {
  if (agent === null || agent === "") return false
  return seatRecordOf(agent, KEY)?.value === ASKED
}

export function askReExec(agent: string): undefined {
  keepSeatRecord(agent, KEY, ASKED)
}

export function takeReExecAsk(agent: string | null): undefined {
  if (agent === null || agent === "") return
  if (!reExecAsked(agent)) return
  keepSeatRecord(agent, KEY, TAKEN)
}
