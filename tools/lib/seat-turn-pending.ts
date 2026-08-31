
import { readUncommitted } from "../../page/uncommitted/uncommitted.ts"
import { keepBesideUnder } from "./seat-beside.ts"
import { seatPageForAgent } from "./seat-presence-read.ts"

export const PENDING_KEY = "turn-pending"

export const TURN_PENDING_COMPONENTS = [
  "running-task",
  "live-child",
  "open-question",
  "send-in-flight",
  "owed",
] as const

export type TurnPendingComponent = (typeof TURN_PENDING_COMPONENTS)[number]

export interface PendingRecord {
  readonly value: boolean
  readonly at: number
}

export type TurnPending = Partial<Record<TurnPendingComponent, PendingRecord>>

function recordIn(stored: unknown): PendingRecord | null {
  if (stored === null || typeof stored !== "object" || Array.isArray(stored)) return null
  const { value, at } = stored as { value?: unknown; at?: unknown }
  if (typeof value !== "boolean") return null
  if (typeof at !== "number" || !Number.isFinite(at)) return null
  return { value, at }
}

export function pendingIn(stored: unknown): TurnPending {
  if (stored === null || typeof stored !== "object" || Array.isArray(stored)) return {}
  const held = stored as Record<string, unknown>
  const found: Record<string, PendingRecord> = {}
  for (const component of TURN_PENDING_COMPONENTS) {
    const recorded = recordIn(held[component])
    if (recorded !== null) found[component] = recorded
  }
  return found
}

export function pendingOn(pending: TurnPending): readonly TurnPendingComponent[] {
  return TURN_PENDING_COMPONENTS.filter((one) => pending[one]?.value === true)
}

export function anyPendingRead(pending: TurnPending): boolean {
  return TURN_PENDING_COMPONENTS.some((one) => pending[one] !== undefined)
}

export function pendingOf(agent: string): TurnPending {
  if (agent === "") return {}
  const page = seatPageForAgent(agent)
  return page === null ? {} : pendingIn(readUncommitted(page)?.[PENDING_KEY])
}

export function setPending(
  agent: string,
  values: Partial<Record<TurnPendingComponent, boolean>>
): void {
  if (agent === "") return
  const page = seatPageForAgent(agent)
  if (page === null) return
  const at = Date.now()
  const standing = pendingIn(readUncommitted(page)?.[PENDING_KEY])
  // THE WHOLE RECORD IS HANDED OVER RATHER THAN THE FIELDS THAT CHANGED. Both stores are written
  // from this one call and they merge at different depths: the old store merges within the key and
  // keeps what it is not told about, akasha merges at the top of the page and replaces the record
  // whole. Handing over the fields that changed alone meant something had to put the other fields
  // back before akasha saw them, and what did that was a read of the old store — which is the one
  // thing that has to go before a seat can stop being written outside akasha.
  //
  // Nothing has to put them back now, because they were never taken away. A field that did not
  // change is carried at the stamp it already held, so the record says when each field was last
  // read rather than when this write happened.
  const whole: Record<string, PendingRecord> = { ...standing }
  let changed = false
  for (const component of TURN_PENDING_COMPONENTS) {
    const value = values[component]
    if (typeof value !== "boolean") continue
    if (standing[component]?.value === value) continue
    whole[component] = { value, at }
    changed = true
  }
  if (!changed) return
  try {
    keepBesideUnder(page, PENDING_KEY, whole)
  } catch {
    return
  }
}

export function pendingLines(pending: TurnPending): readonly string[] {
  return TURN_PENDING_COMPONENTS.map((one) => {
    const recorded = pending[one]
    const said =
      recorded === undefined
        ? "— unread"
        : `${recorded.value ? "on" : "off"} (read ${new Date(recorded.at).toISOString()})`
    return `  ${one.padEnd(15)} ${said}`
  })
}
