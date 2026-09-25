import { isRecord } from "akasha/code/type/narrowing/modules/is-record/is-record.module.code.ts"
import type {
  AccountCompletion,
  CharacterCompletion,
  CompanionCompletion,
} from "akasha/temper/player/completion/modules/completion-record/completion-record.module.code.ts"

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

function listEntries(value: Record<string, unknown>): readonly unknown[] | undefined {
  const length = Object.keys(value).length
  if (length === 0) return undefined
  const entries: unknown[] = []
  for (let position = 1; position <= length; position++) {
    const entry = value[String(position)]
    if (entry === undefined) return undefined
    entries.push(entry)
  }
  return entries
}

function unionListForward(
  existing: readonly number[],
  incoming: readonly number[]
): Record<string, number> {
  const seen = new Set<number>(incoming)
  for (const entry of existing) seen.add(entry)
  const merged: Record<string, number> = {}
  let position = 1
  for (const entry of seen) merged[String(position++)] = entry
  return merged
}

function holdsLists(entries: readonly unknown[]): boolean {
  return entries.every((entry) => isRecord(entry) || Array.isArray(entry))
}

function mergeListForward(
  existing: Record<string, unknown>,
  incoming: Record<string, unknown>
): unknown {
  const existingEntries = listEntries(existing)
  const incomingEntries = listEntries(incoming)
  if (existingEntries === undefined || incomingEntries === undefined) {
    return mergeRecordForward(existing, incoming)
  }
  if (isNumberArray(existingEntries) && isNumberArray(incomingEntries)) {
    return unionListForward(existingEntries, incomingEntries)
  }
  if (holdsLists(existingEntries) && holdsLists(incomingEntries)) {
    return mergeRecordForward(existing, incoming)
  }
  return incoming
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
    return incoming
  }
  if (isRecord(existing) && isRecord(incoming)) {
    return mergeListForward(existing, incoming)
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

function asT<T>(value: Record<string, unknown>): T {
  return value as T
}

function mergeTypedCompletion<T>(
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
  return asT<T>(merged)
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
  return mergeTypedCompletion(existing, incoming, CHARACTER_LWW_KEYS, CHARACTER_STATE_KEYS)
}

export function mergeAccountCompletionForward(
  existing: AccountCompletion | undefined,
  incoming: AccountCompletion | undefined
): AccountCompletion | undefined {
  return mergeTypedCompletion(existing, incoming, NO_KEYS)
}

export function mergeCompanionCompletionForward(
  existing: CompanionCompletion | undefined,
  incoming: CompanionCompletion | undefined
): CompanionCompletion | undefined {
  return mergeTypedCompletion(existing, incoming, COMPANION_LWW_KEYS)
}
