import { parseSeatProcKey, type SeatPresence } from "@akasha/seat-system/seat-proc-key"
import { agentHolderProcess, agentPresence } from "./seat-presence-read.ts"
import { seatRoster } from "./seat-roster.ts"
import { seatWhoami } from "./seat-whoami.ts"

export const SEAT_MODE_INTERACTIVE = "interactive"

export interface SeatFacts {
  readonly name: string
}

export function readSeatFacts(sessionIds: readonly string[]): Map<string, SeatFacts> {
  const wanted = new Set(sessionIds)
  const found = new Map<string, SeatFacts>()
  for (const seat of [...seatRoster(true), ...seatRoster(false)]) {
    const session = seat.session
    if (session === null || !wanted.has(session) || found.has(session)) continue
    found.set(session, { name: seat.name ?? seat.id })
  }
  return found
}

export interface SeatRecord {
  readonly id: string
  readonly name: string | null
  readonly persona: string | null
  readonly domain: string | null
  readonly role: string | null
  readonly mode: string | null
  readonly parentAgentId: string | null
  readonly present: boolean
  readonly presence: SeatPresence
  readonly interactive: boolean
  readonly supervisorPid: number | null
}

// THE HOLDER IS ASKED FOR BY THE AGENT'S ID RATHER THAN BY ITS PAGE. This took the old page's path
// and opened it for the id it states, only to ask akasha that id for the holder. The id is what the
// caller already has.
function supervisorPidOf(agentId: string): number | null {
  const stated = agentHolderProcess(agentId)
  return stated === null ? null : (parseSeatProcKey(stated)?.pid ?? null)
}

export function seatRecord(agentId: string): SeatRecord | null {
  const whoami = seatWhoami(agentId)
  if (whoami === null) return null
  const presence: SeatPresence = agentPresence(agentId)
  return {
    id: agentId,
    name: whoami.name,
    persona: whoami.persona,
    domain: whoami.domain,
    role: whoami.role,
    mode: whoami.mode,
    parentAgentId: whoami.parentAgentId,
    present: presence === "present",
    presence,
    interactive: whoami.mode === SEAT_MODE_INTERACTIVE,
    supervisorPid: supervisorPidOf(agentId),
  }
}
