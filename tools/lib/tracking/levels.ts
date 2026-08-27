import type { Page } from "../daily-tracking/tracking-types.ts"
import { inputError } from "../exit.ts"
import { fieldStr } from "./format.ts"

const SAFETY_MIN = -2
const SAFETY_MAX = 5
const DIFFICULTY_MIN = 0
const DIFFICULTY_MAX = 5

export const SAFETY_LEVEL_KEY = "safetyLevel"
export const DIFFICULTY_LEVEL_KEY = "difficultyLevel"

function canonicalLevel(n: number): string {
  if (Number.isInteger(n)) return String(n)
  const sign = n < 0 ? "-" : ""
  return `${sign}${Math.floor(Math.abs(n))}.5`
}

function parseLevel(raw: string, min: number, max: number, label: string): string {
  const n = Number(raw)
  if (raw.trim() === "" || Number.isNaN(n)) {
    throw inputError(`${label} must be a number, got "${raw}"`)
  }
  if (!Number.isInteger(n * 2)) {
    throw inputError(`${label} must be a half-step (e.g. 2 or 2.5), got "${raw}"`)
  }
  if (n < min || n > max) {
    throw inputError(`${label} must be between ${min} and ${max}, got "${raw}"`)
  }
  return canonicalLevel(n)
}

export function parseSafety(raw: string): string {
  return parseLevel(raw, SAFETY_MIN, SAFETY_MAX, "safety")
}

export function parseDifficulty(raw: string): string {
  return parseLevel(raw, DIFFICULTY_MIN, DIFFICULTY_MAX, "difficulty")
}

export function resolveCarriedSafety(
  prior: Page | null,
  safetyRaw: string | undefined
): string | undefined {
  if (safetyRaw !== undefined) return parseSafety(safetyRaw)
  return prior !== null ? fieldStr(prior, SAFETY_LEVEL_KEY) : undefined
}

export interface ActivityDifficulty {
  readonly title: string
  readonly defaultDifficulty: number | undefined
}

export function resolveActivityDifficulty(
  title: string,
  activities: readonly ActivityDifficulty[]
): string | undefined {
  const hay = title.toLowerCase()
  let best: number | undefined
  for (const activity of activities) {
    const needle = activity.title.trim().toLowerCase()
    if (needle === "") continue
    const value = activity.defaultDifficulty
    if (value === undefined || !Number.isFinite(value)) continue
    if (!hay.includes(needle)) continue
    if (best === undefined || value > best) best = value
  }
  return best === undefined ? undefined : canonicalLevel(best)
}

export function resolveDifficulty(
  difficultyRaw: string | undefined,
  title: string,
  activities: readonly ActivityDifficulty[]
): string {
  if (difficultyRaw !== undefined) return parseDifficulty(difficultyRaw)
  const fromActivity = resolveActivityDifficulty(title, activities)
  if (fromActivity === undefined) {
    throw inputError(
      `no session-activity default matches "${title}" and no --difficulty was given — ` +
        "rate this block with `--difficulty <0…5>`, or teach the catalog with " +
        '`ops tracking activity-set "<activity>" --difficulty <0…5>` so every block ' +
        "naming it rates itself"
    )
  }
  return fromActivity
}
