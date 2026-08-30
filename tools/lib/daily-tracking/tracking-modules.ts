export {
  pathspecsForPrefix,
  pathspecsForPrefixes,
  resolvePointsPrefixes,
} from "@alanwalton/personas-core/git-byte-pathspecs"
export { GREEN_DAY_POINTS_FIELD } from "@alanwalton/personas-core/green-day-fraction"
export { PERSONA_POINTS_SOURCE_COHERENCE_RULES } from "@alanwalton/personas-core/points-source-coherence"
export { decideTotalPointsWrite } from "@alanwalton/personas-core/totals"
export { evaluateCoherenceRules } from "@shared/pages-core/schema/coherence-rules"
export { askNamed, patchPage } from "@shared/pages-query"
export { askComposed } from "@shared/pages-query/ask"
export { getEsoDayStr, getEsoDayStrOffset, getEsoDayWindow } from "@shared/recurrence/reset-times"
export { cardioReading, readSessionPages } from "@shared/status-bar-access/readings"
export { assertNever } from "@shared/utils-narrow/assert-never"
export const SOURCE_POINTS_FIELD = "sourcePoints"
export { createNetBytesAccumulator } from "../../../alan/persona/ledger/ledger.ts"
export { DEFAULT_GREEN_DAY_POINTS } from "../../../readouts/ring/ladder/ladder.ts"
export { wakeWindow } from "../../../readouts/session-readings.ts"

export const WRITER = "daily-tracking"

export function kebabKey(key: string): string {
  return key.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase()
}

export function numberOf(value: unknown): number | undefined {
  if (typeof value === "number") return Number.isFinite(value) ? value : undefined
  if (typeof value !== "string") return undefined
  const trimmed = value.trim()
  if (trimmed === "") return undefined
  const parsed = Number(trimmed)
  return Number.isFinite(parsed) ? parsed : undefined
}

export function textOf(value: unknown): string | undefined {
  return typeof value === "string" && value.length > 0 ? value : undefined
}
