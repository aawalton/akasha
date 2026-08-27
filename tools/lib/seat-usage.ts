import { keepSeatRecord, type SeatRecord, seatRecordOf } from "./seat-record.ts"

export type UsageRecord = SeatRecord

export const MODEL_KEY = "model"

export const CONTEXT_TOKENS_KEY = "context-tokens"

export const COST_USD_KEY = "cost-usd"

export interface UsageReading {
  readonly model: string | null
  readonly contextTokens: string | null
  readonly costUsd: string | null
}

function objectAt(held: unknown, key: string): unknown {
  if (held === null || typeof held !== "object" || Array.isArray(held)) return null
  return (held as Record<string, unknown>)[key] ?? null
}

function textOf(held: unknown): string | null {
  if (typeof held === "string" && held !== "") return held
  if (typeof held === "number" && Number.isFinite(held)) return String(held)
  return null
}

export function usageIn(stated: unknown): UsageReading {
  return {
    model: textOf(objectAt(objectAt(stated, "model"), "id")),
    contextTokens: textOf(objectAt(objectAt(stated, "context_window"), "total_input_tokens")),
    costUsd: textOf(objectAt(objectAt(stated, "cost"), "total_cost_usd")),
  }
}

export function keepSeatUsage(agent: string, reading: UsageReading, at?: number): void {
  const now = at ?? Date.now()
  if (reading.model !== null) keepSeatRecord(agent, MODEL_KEY, reading.model, now)
  if (reading.contextTokens !== null)
    keepSeatRecord(agent, CONTEXT_TOKENS_KEY, reading.contextTokens, now)
  if (reading.costUsd !== null) keepSeatRecord(agent, COST_USD_KEY, reading.costUsd, now)
}

export function modelOf(agent: string): UsageRecord | null {
  return seatRecordOf(agent, MODEL_KEY)
}

export function contextTokensOf(agent: string): UsageRecord | null {
  return seatRecordOf(agent, CONTEXT_TOKENS_KEY)
}

export function costUsdOf(agent: string): UsageRecord | null {
  return seatRecordOf(agent, COST_USD_KEY)
}
