
import { readUncommitted } from "../../page/uncommitted/uncommitted.ts"
import { keepBesideUnder } from "./seat-beside.ts"
import { seatPageForAgent } from "./seat-presence-read.ts"

export const WORKING_KEY = "turn-working"

export const TURN_WORKING_COMPONENTS = ["active-turn", "compacting"] as const

export type TurnWorkingComponent = (typeof TURN_WORKING_COMPONENTS)[number]

export interface WorkingRecord {
  readonly value: boolean
  readonly at: number
}

export type TurnWorking = Partial<Record<TurnWorkingComponent, WorkingRecord>>

function recordIn(stored: unknown): WorkingRecord | null {
  if (stored === null || typeof stored !== "object" || Array.isArray(stored)) return null
  const { value, at } = stored as { value?: unknown; at?: unknown }
  if (typeof value !== "boolean") return null
  if (typeof at !== "number" || !Number.isFinite(at)) return null
  return { value, at }
}

export function workingIn(stored: unknown): TurnWorking {
  if (stored === null || typeof stored !== "object" || Array.isArray(stored)) return {}
  const held = stored as Record<string, unknown>
  const found: Record<string, WorkingRecord> = {}
  for (const component of TURN_WORKING_COMPONENTS) {
    const recorded = recordIn(held[component])
    if (recorded !== null) found[component] = recorded
  }
  return found
}

export function workingOn(working: TurnWorking): readonly TurnWorkingComponent[] {
  return TURN_WORKING_COMPONENTS.filter((one) => working[one]?.value === true)
}

export function anyWorking(working: TurnWorking): boolean {
  return workingOn(working).length > 0
}

export function anyWorkingRead(working: TurnWorking): boolean {
  return TURN_WORKING_COMPONENTS.some((one) => working[one] !== undefined)
}

export function workingOf(agent: string): TurnWorking {
  if (agent === "") return {}
  const page = seatPageForAgent(agent)
  return page === null ? {} : workingIn(readUncommitted(page)?.[WORKING_KEY])
}

export function setWorking(
  agent: string,
  values: Partial<Record<TurnWorkingComponent, boolean>>
): void {
  if (agent === "") return
  const page = seatPageForAgent(agent)
  if (page === null) return
  const at = Date.now()
  const standing = workingIn(readUncommitted(page)?.[WORKING_KEY])
  const written: Record<string, WorkingRecord> = {}
  for (const component of TURN_WORKING_COMPONENTS) {
    const value = values[component]
    if (typeof value !== "boolean") continue
    if (standing[component]?.value === value) continue
    written[component] = { value, at }
  }
  if (Object.keys(written).length === 0) return
  try {
    keepBesideUnder(page, WORKING_KEY, written)
  } catch {
    return
  }
}

export function workingLines(working: TurnWorking): readonly string[] {
  return TURN_WORKING_COMPONENTS.map((one) => {
    const recorded = working[one]
    const said =
      recorded === undefined
        ? "— unread"
        : `${recorded.value ? "on" : "off"} (read ${new Date(recorded.at).toISOString()})`
    return `  ${one.padEnd(15)} ${said}`
  })
}
