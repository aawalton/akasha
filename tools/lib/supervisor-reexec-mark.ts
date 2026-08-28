import { keepSeatRecord, seatRecordOf } from "./seat-record.ts"

const KEY = "reexec-asked"

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
