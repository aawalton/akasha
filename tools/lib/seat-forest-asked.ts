import { answer } from "./page-query.ts"
import { AKASHA, resolveRoots, rootFor } from "../../repo/roots/roots.ts"
import { FLEET } from "./compose-seat-name.ts"
import type { ForestRow } from "./seat-forest.ts"
import { statedProcessPresence } from "./seat-proc-key.ts"
import { colorOfState } from "./seat-turn-color.ts"
import { TURN_PENDING_COMPONENTS } from "./seat-turn-pending.ts"
import { type SeatTurnRecords, type SeatTurnState, readSeatTurn } from "./seat-turn-state.ts"
import { TURN_WORKING_COMPONENTS } from "./seat-turn-working.ts"

export interface ForestReading extends ForestRow {
  readonly state: SeatTurnState
  readonly waitingOn: string | null
  readonly color: string | null
}

const SEAT_KEYS = [
  "id",
  "slug",
  "person-slug",
  "principal-seat-name",
  "start-mode",
  "role-slug",
  "supervisor-process",
  "turn-state",
  "turn-pending-source",
  "turn-end-reading",
  ...TURN_WORKING_COMPONENTS.map((one) => `turn-working-${one}`),
  ...TURN_PENDING_COMPONENTS.map((one) => `turn-pending-${one}`),
] as const

type Values = Readonly<Record<string, unknown>>

function textAt(values: Values, key: string): string | null {
  const held = values[key]
  return typeof held === "string" && held !== "" ? held : null
}

function recordOf(values: Values, key: string): { readonly value: string; readonly at: number } | null {
  const held = textAt(values, key)
  return held === null ? null : { value: held, at: 0 }
}

function componentsOf(
  values: Values,
  prefix: string,
  names: readonly string[]
): Record<string, { readonly value: boolean; readonly at: number }> {
  const found: Record<string, { readonly value: boolean; readonly at: number }> = {}
  for (const name of names) {
    const held = textAt(values, `${prefix}-${name}`)
    if (held === null) continue
    found[name] = { value: held === "true", at: 0 }
  }
  return found
}

function turnRecordsOf(values: Values): SeatTurnRecords {
  return {
    stamped: recordOf(values, "turn-state"),
    source: recordOf(values, "turn-pending-source"),
    pending: componentsOf(values, "turn-pending", TURN_PENDING_COMPONENTS),
    working: componentsOf(values, "turn-working", TURN_WORKING_COMPONENTS),
    reading: recordOf(values, "turn-end-reading"),
  }
}

export function askSeatForest(): readonly ForestReading[] {
  const roots = resolveRoots()
  const akasha = rootFor(roots, AKASHA)
  const asked = answer(roots, { pageType: "seat", keys: [...SEAT_KEYS], sortBy: "slug" })
  const colours = new Map<SeatTurnState, string | null>()
  const idByName = new Map<string, string>()
  for (const row of asked?.rows ?? []) {
    const name = textAt(row.values, "slug")
    const id = textAt(row.values, "id")
    if (name !== null && id !== null) idByName.set(name, id)
  }
  const found: ForestReading[] = []
  for (const row of asked?.rows ?? []) {
    const values = row.values
    const person = textAt(values, "person-slug")
    const parentName = textAt(values, "principal-seat-name")
    const reading = readSeatTurn(turnRecordsOf(values))
    if (!colours.has(reading.state)) colours.set(reading.state, colorOfState(reading.state, akasha))
    found.push({
      id: textAt(values, "id") ?? "",
      name: textAt(values, "slug"),
      parent_agent_id: parentName === null ? null : (idByName.get(parentName) ?? null),
      principal: person ?? (parentName === null ? null : FLEET),
      launch: person !== null ? "opened" : parentName !== null ? "spawned" : null,
      mode: textAt(values, "start-mode"),
      live: statedProcessPresence(textAt(values, "supervisor-process")) === "present",
      state: reading.state,
      waitingOn: reading.waitingOn,
      color: colours.get(reading.state) ?? null,
    })
  }
  return found
}
