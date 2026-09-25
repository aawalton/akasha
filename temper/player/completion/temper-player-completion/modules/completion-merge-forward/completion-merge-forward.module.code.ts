import { isRecord } from "akasha/code/type/narrowing/modules/is-record/is-record.module.code.ts"
import {
  type AccountCompletion,
  accountCompletionSchema,
  type CharacterCompletion,
  type CompanionCompletion,
  characterCompletionSchema,
  companionCompletionSchema,
} from "akasha/temper/player/completion/modules/completion-record/completion-record.module.code.ts"
import type { z } from "zod"

const NESTED_LWW_KEYS: ReadonlySet<string> = new Set(["currentMorph", "unassigned"])

function isNumberArray(value: readonly unknown[]): value is readonly number[] {
  return value.every((entry) => typeof entry === "number")
}

function unionNumberArrays(
  existing: readonly number[],
  incoming: readonly number[]
): readonly number[] {
  const seen = new Set<number>(existing)
  for (const entry of incoming) seen.add(entry)
  return [...seen].sort((a, b) => a - b)
}

function holdsLists(entries: readonly unknown[]): boolean {
  return entries.every((entry) => isRecord(entry) || Array.isArray(entry))
}

function mergeByPosition(existing: readonly unknown[], incoming: readonly unknown[]): unknown[] {
  const length = Math.max(existing.length, incoming.length)
  return Array.from({ length }, (_, position) =>
    deepForward(existing[position], incoming[position])
  )
}

export function deepForward(existing: unknown, incoming: unknown): unknown {
  if (incoming === undefined) return existing
  if (existing === undefined) return incoming

  if (typeof existing === "number" && typeof incoming === "number") {
    return existing >= incoming ? existing : incoming
  }
  if (typeof existing === "boolean" && typeof incoming === "boolean") {
    return existing || incoming
  }
  if (Array.isArray(existing) && Array.isArray(incoming)) {
    if (isNumberArray(existing) && isNumberArray(incoming)) {
      return unionNumberArrays(existing, incoming)
    }
    if (holdsLists(existing) && holdsLists(incoming)) return mergeByPosition(existing, incoming)
    return incoming
  }
  if (isRecord(existing) && isRecord(incoming)) {
    return mergeRecordForward(existing, incoming)
  }
  return incoming
}

function mergeRecordForward(
  existing: Record<string, unknown>,
  incoming: Record<string, unknown>
): Record<string, unknown> {
  const merged: Record<string, unknown> = {}
  const keys = new Set<string>([...Object.keys(existing), ...Object.keys(incoming)])
  for (const key of keys) {
    if (NESTED_LWW_KEYS.has(key)) {
      merged[key] = incoming[key] === undefined ? existing[key] : incoming[key]
      continue
    }
    merged[key] = deepForward(existing[key], incoming[key])
  }
  return merged
}

function mergeTypedCompletion<T>(
  shape: z.ZodType<T>,
  existing: T | undefined,
  incoming: T | undefined,
  lwwKeys: ReadonlySet<string>,
  stateKeys: ReadonlySet<string> = NO_KEYS
): T | undefined {
  if (existing === undefined) return incoming
  if (incoming === undefined) return existing
  if (!isRecord(existing) || !isRecord(incoming)) return incoming

  const merged: Record<string, unknown> = {}
  const keys = new Set<string>([...Object.keys(existing), ...Object.keys(incoming)])
  for (const key of keys) {
    if (stateKeys.has(key)) {
      if (incoming[key] !== undefined) merged[key] = incoming[key]
      continue
    }
    if (lwwKeys.has(key)) {
      merged[key] = incoming[key] === undefined ? existing[key] : incoming[key]
      continue
    }
    merged[key] = deepForward(existing[key], incoming[key])
  }
  return shape.parse(merged)
}

const CHARACTER_LWW_KEYS: ReadonlySet<string> = new Set([
  "buildHash",
  "gender",
  "classId",
  "allianceId",
  "raceId",
  "className",
  "classIcon",
  "dailyWrits",
  "dailyWritStates",
])

const CHARACTER_STATE_KEYS: ReadonlySet<string> = new Set(["curseState"])

const NO_KEYS: ReadonlySet<string> = new Set<string>()

const COMPANION_LWW_KEYS: ReadonlySet<string> = new Set([
  "build",
  "selectedBuild",
  "targetBuildHash",
  "currentXP",
])

export function mergeCharacterCompletionForward(
  existing: CharacterCompletion | undefined,
  incoming: CharacterCompletion | undefined
): CharacterCompletion | undefined {
  return mergeTypedCompletion(
    characterCompletionSchema,
    existing,
    incoming,
    CHARACTER_LWW_KEYS,
    CHARACTER_STATE_KEYS
  )
}

export function mergeAccountCompletionForward(
  existing: AccountCompletion | undefined,
  incoming: AccountCompletion | undefined
): AccountCompletion | undefined {
  return mergeTypedCompletion(accountCompletionSchema, existing, incoming, NO_KEYS)
}

export function mergeCompanionCompletionForward(
  existing: CompanionCompletion | undefined,
  incoming: CompanionCompletion | undefined
): CompanionCompletion | undefined {
  return mergeTypedCompletion(companionCompletionSchema, existing, incoming, COMPANION_LWW_KEYS)
}
