import { seatPageForAgent } from "./seat-presence-read.ts"
import {
  dropUncommitted,
  patchUncommitted,
  readUncommitted,
} from "../../page/uncommitted/uncommitted.ts"

export interface SeatRecord {
  readonly value: string
  readonly at: number
}

export function seatRecordIn(stored: unknown): SeatRecord | null {
  if (stored === null || typeof stored !== "object" || Array.isArray(stored)) return null
  const { value, at } = stored as { value?: unknown; at?: unknown }
  if (typeof value !== "string" || value === "") return null
  if (typeof at !== "number" || !Number.isFinite(at)) return null
  return { value, at }
}

export function seatRecordOf(agent: string, key: string): SeatRecord | null {
  if (agent === "") return null
  const page = seatPageForAgent(agent)
  return page === null ? null : seatRecordIn(readUncommitted(page)?.[key])
}

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
    patchUncommitted(page, { [key]: { value, at } })
  } catch {
    return
  }
}

export function dropSeatRecord(agent: string, key: string): void {
  if (agent === "") return
  const page = seatPageForAgent(agent)
  if (page === null) return
  try {
    dropUncommitted(page, [key])
  } catch {
    return
  }
}
