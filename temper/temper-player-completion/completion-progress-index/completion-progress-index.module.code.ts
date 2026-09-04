import type {
  AccountCompletion,
  CharacterCompletion,
} from "@akasha/temper-completion/completion-progress"
import { isRecord } from "@akasha/utils-narrow/is-record"
import { joinPath } from "@akasha/utils-narrow/join-path"
import { ACCOUNT_COMPLETION_CARD_CHECKERS } from "../completion-account-checkers/completion-account-checkers.module.code.ts"
import { COMPLETION_CARD_CHECKERS } from "../completion-card-checkers/completion-card-checkers.module.code.ts"
import {
  type AnyCompletionCardId,
  isAnyCompletionCardId,
} from "../completion-card-id/completion-card-id.module.code.ts"
import { resolveTaskProgress } from "../completion-card-task-progress/completion-card-task-progress.module.code.ts"
import { enumeratePaths } from "../completion-item-picker/completion-item-picker.module.code.ts"
import {
  type CompletionCharacterEntry,
  resolveNextCharacter,
} from "../completion-next-character/completion-next-character.module.code.ts"

export type ScalarProgress = { current: number; total: number }

export type SlimCrossCharacterProgress = {
  current: number
  total: number
  effectiveCharacterId?: string
  entries: Record<string, ScalarProgress>
}

export type CrossCharacterCompletionIndex = {
  characters: Record<string, { label: string; sortOrder: number }>
  paths: Record<string, SlimCrossCharacterProgress>
}

export type CrossCharacterRow = {
  characterName: string
  progressCurrent: number
  progressTotal: number
  displayOrder: number
}

export type CrossCharacterReading = {
  progressCurrent: number
  progressTotal: number
  effectiveCharacterId?: string
  rows: readonly CrossCharacterRow[]
}

function asCardIds(keys: readonly string[]): readonly AnyCompletionCardId[] {
  const result: AnyCompletionCardId[] = []
  for (const key of keys) {
    if (isAnyCompletionCardId(key)) result.push(key)
  }
  return result
}

export function buildCharacterCompletionIndex(
  characterId: string,
  characterCompletion: CharacterCompletion
): Record<string, ScalarProgress> {
  const index: Record<string, ScalarProgress> = {}
  const charRow = { id: characterId, completion: characterCompletion }

  for (const cardId of asCardIds(Object.keys(COMPLETION_CARD_CHECKERS))) {
    for (const path of enumeratePaths(cardId, [characterCompletion])) {
      const progress = resolveTaskProgress(cardId, path, characterCompletion, null, charRow)
      if (progress === undefined) continue
      index[joinPath(cardId, path)] = { current: progress.current, total: progress.total }
    }
  }

  return index
}

export function buildAccountCompletionIndex(
  accountCompletion: AccountCompletion | null
): Record<string, ScalarProgress> {
  const index: Record<string, ScalarProgress> = {}

  for (const cardId of asCardIds(Object.keys(ACCOUNT_COMPLETION_CARD_CHECKERS))) {
    for (const path of enumeratePaths(cardId, [])) {
      const progress = resolveTaskProgress(cardId, path, null, accountCompletion)
      if (progress === undefined) continue
      index[joinPath(cardId, path)] = { current: progress.current, total: progress.total }
    }
  }

  return index
}

export function buildCrossCharacterCompletionIndex(
  roster: readonly CompletionCharacterEntry[],
  accountCompletion: AccountCompletion | null
): CrossCharacterCompletionIndex {
  const characters: CrossCharacterCompletionIndex["characters"] = {}
  for (const entry of roster) {
    characters[entry.id] = {
      label: entry.firstName !== "" ? entry.firstName : entry.name,
      sortOrder: entry.sortOrder ?? Number.MAX_SAFE_INTEGER,
    }
  }

  const paths: Record<string, SlimCrossCharacterProgress> = {}
  const completions: CharacterCompletion[] = []
  for (const entry of roster) {
    if (entry.completion) completions.push(entry.completion)
  }

  for (const cardId of asCardIds(Object.keys(COMPLETION_CARD_CHECKERS))) {
    for (const path of enumeratePaths(cardId, completions)) {
      const entries: Record<string, ScalarProgress> = {}
      let rolledCurrent = 0
      let rolledTotal = 0

      for (const entry of roster) {
        const progress = resolveTaskProgress(cardId, path, entry.completion, accountCompletion, {
          id: entry.id,
          completion: entry.completion,
        })
        if (progress === undefined) continue
        entries[entry.id] = { current: progress.current, total: progress.total }
        rolledCurrent += progress.current
        rolledTotal += progress.total
      }

      if (Object.keys(entries).length === 0) continue

      const next = resolveNextCharacter(roster, cardId, path)
      paths[joinPath(cardId, path)] =
        next === null
          ? { current: rolledCurrent, total: rolledTotal, entries }
          : {
              current: rolledCurrent,
              total: rolledTotal,
              effectiveCharacterId: next.characterId,
              entries,
            }
    }
  }

  return { characters, paths }
}

function parseSlimProgress(value: unknown): SlimCrossCharacterProgress | null {
  if (!isRecord(value)) return null
  if (typeof value.current !== "number" || typeof value.total !== "number") return null
  if (!isRecord(value.entries)) return null

  const entries: Record<string, ScalarProgress> = {}
  for (const [characterId, raw] of Object.entries(value.entries)) {
    if (!isRecord(raw)) return null
    if (typeof raw.current !== "number" || typeof raw.total !== "number") return null
    entries[characterId] = { current: raw.current, total: raw.total }
  }

  return typeof value.effectiveCharacterId === "string"
    ? {
        current: value.current,
        total: value.total,
        effectiveCharacterId: value.effectiveCharacterId,
        entries,
      }
    : { current: value.current, total: value.total, entries }
}

function parseCharacterMeta(value: unknown): { label: string; sortOrder: number } | null {
  if (!isRecord(value)) return null
  if (typeof value.label !== "string" || typeof value.sortOrder !== "number") return null
  return { label: value.label, sortOrder: value.sortOrder }
}

export function materializeCrossCharacterProgress(
  index: unknown,
  pathKey: string
): CrossCharacterReading | null {
  if (!isRecord(index)) return null
  const { characters, paths } = index
  if (!isRecord(characters) || !isRecord(paths)) return null

  const slim = parseSlimProgress(paths[pathKey])
  if (slim === null) return null

  const rows: CrossCharacterRow[] = []
  for (const [characterId, entry] of Object.entries(slim.entries)) {
    const meta = parseCharacterMeta(characters[characterId])
    rows.push({
      characterName: meta === null ? characterId : meta.label,
      progressCurrent: entry.current,
      progressTotal: entry.total,
      displayOrder: meta === null ? Number.MAX_SAFE_INTEGER : meta.sortOrder,
    })
  }
  rows.sort((a, b) => {
    const order = a.displayOrder - b.displayOrder
    return order !== 0 ? order : a.characterName.localeCompare(b.characterName)
  })

  return slim.effectiveCharacterId === undefined
    ? { progressCurrent: slim.current, progressTotal: slim.total, rows }
    : {
        progressCurrent: slim.current,
        progressTotal: slim.total,
        effectiveCharacterId: slim.effectiveCharacterId,
        rows,
      }
}

export function crossCharacterProgressValue(reading: CrossCharacterReading): ScalarProgress {
  return { current: reading.progressCurrent, total: reading.progressTotal }
}
