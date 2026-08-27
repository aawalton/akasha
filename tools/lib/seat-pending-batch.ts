
import { everyRecipient, messagesTo } from "./message-file.ts"
import { readOwed } from "./owed-read.ts"
import { countOpenQuestions } from "./pending-read.ts"
import { principalSeatIdOf } from "./seat-principal.ts"
import { seatRecord } from "./seat-facts.ts"
import { seatsPresent } from "./seat-roster.ts"
import type { TurnPendingComponent } from "./seat-turn-pending.ts"
import { seatTurnStateOf, turnStillToCome } from "./seat-turn-state.ts"

export interface SeatPending {
  readonly seat: string
  readonly values: Partial<Record<TurnPendingComponent, boolean>>
}

const BLOCKED = "blocked"

export function sendersStandingBlocked(): ReadonlySet<string> {
  const found = new Set<string>()
  for (const to of everyRecipient()) {
    for (const one of messagesTo(to)) {
      if (one.warrant === BLOCKED) found.add(one.from)
    }
  }
  return found
}

export function childrenByPrincipal(): ReadonlyMap<string, number> {
  const found = new Map<string, number>()
  for (const one of seatsPresent()) {
    const principal = principalSeatIdOf(one.id)
    if (principal === null) continue
    if (!turnStillToCome(seatTurnStateOf(one.id).state)) continue
    found.set(principal, (found.get(principal) ?? 0) + 1)
  }
  return found
}

function standsOwed(agent: string): boolean {
  try {
    return readOwed(agent) === "owed"
  } catch {
    return false
  }
}

export function pendingFromFiles(): readonly SeatPending[] {
  const blocked = sendersStandingBlocked()
  const children = childrenByPrincipal()
  return seatsPresent().map((one) => ({
    seat: one.id,
    values: {
      "live-child": (children.get(one.id) ?? 0) > 0,
      "send-in-flight": one.name !== null && blocked.has(one.name),
      owed: standsOwed(one.id),
    },
  }))
}

export async function pendingFromQuestions(): Promise<readonly SeatPending[]> {
  const found: SeatPending[] = []
  for (const one of seatsPresent()) {
    const seat = seatRecord(one.id)
    let open = 0
    try {
      open = await countOpenQuestions(one.id, seat?.name ?? null, seat?.persona ?? null)
    } catch {
      continue
    }
    found.push({ seat: one.id, values: { "open-question": open > 0 } })
  }
  return found
}
