import { z } from "zod"

export const RUN_SENTINEL = "<<<__LUA_RUN__>>>"

export const DONE_SENTINEL = "<<<__LUA_DONE__>>>"

export const responseSchema = z.discriminatedUnion("ok", [
  z.object({ ok: z.literal(true), value: z.unknown() }).strict(),
  z.object({ ok: z.literal(false), error: z.string() }).strict(),
])

export type Response = z.infer<typeof responseSchema>

const KIND = "__lua_kind"

export function normalizeValue(value: unknown): unknown {
  if (value === null || typeof value !== "object") return value
  if (Array.isArray(value)) return value.map((entry) => normalizeValue(entry))
  const entries = Object.entries(value)
  if (entries.length === 1 && entries[0]?.[0] === KIND) {
    const kind = entries[0][1]
    if (kind === "nan") return Number.NaN
    if (kind === "inf") return Number.POSITIVE_INFINITY
    if (kind === "-inf") return Number.NEGATIVE_INFINITY
    if (kind === "function") return Object.freeze({ __lua_kind: "function" })
    return value
  }
  const held: Record<string, unknown> = {}
  for (const [key, one] of entries) {
    held[key] = normalizeValue(one)
  }
  return held
}
