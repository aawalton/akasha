
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
  const written: Record<string, PendingRecord> = {}
  for (const component of TURN_PENDING_COMPONENTS) {
    const value = values[component]
    if (typeof value !== "boolean") continue
    if (standing[component]?.value === value) continue
    written[component] = { value, at }
  }
  if (Object.keys(written).length === 0) return
  try {
    keepBesideUnder(page, PENDING_KEY, written)
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
