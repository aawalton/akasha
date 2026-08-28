import { seatHolderProcess, seatPageForAgent, seatPresence } from "./seat-presence-read.ts"
import { parseSeatProcKey, type SeatPresence } from "./seat-proc-key.ts"
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

function supervisorPidOf(page: string | null): number | null {
  if (page === null) return null
  const stated = seatHolderProcess(page)
  return stated === null ? null : (parseSeatProcKey(stated)?.pid ?? null)
}

export function seatRecord(agentId: string): SeatRecord | null {
  const whoami = seatWhoami(agentId)
  if (whoami === null) return null
  const page = seatPageForAgent(agentId)
  const presence: SeatPresence = page === null ? "absent" : seatPresence(page)
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
    supervisorPid: supervisorPidOf(page),
  }
}
