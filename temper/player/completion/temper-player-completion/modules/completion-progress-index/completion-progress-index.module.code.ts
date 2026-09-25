import { isRecord } from "akasha/code/type/narrowing/modules/is-record/is-record.module.code.ts"
import { joinPath } from "akasha/code/type/narrowing/modules/join-path/join-path.module.code.ts"
import type { CharacterCompletion } from "akasha/temper/player/completion/modules/completion-record/completion-record.module.code.ts"
import type { AccountCheckerInput } from "akasha/temper/player/completion/temper-player-completion/modules/completion-card-checker-types/completion-card-checker-types.module.code.ts"
import { COMPLETION_CARD_CHECKERS } from "akasha/temper/player/completion/temper-player-completion/modules/completion-card-checkers/completion-card-checkers.module.code.ts"
import {
  type AnyCompletionCardId,
  isAnyCompletionCardId,
} from "akasha/temper/player/completion/temper-player-completion/modules/completion-card-id/completion-card-id.module.code.ts"
import { resolveTaskProgress } from "akasha/temper/player/completion/temper-player-completion/modules/completion-card-task-progress/completion-card-task-progress.module.code.ts"
import { enumeratePaths } from "akasha/temper/player/completion/temper-player-completion/modules/completion-item-picker/completion-item-picker.module.code.ts"
import {
  type CompletionCharacterEntry,
  resolveNextCharacter,
} from "akasha/temper/player/completion/temper-player-completion/modules/completion-next-character/completion-next-character.module.code.ts"

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
  characterId: string
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

export type NamedPath = {
  readonly cardId: string
  readonly itemPath: readonly (string | number)[]
}

function pathsFor(
  cardId: AnyCompletionCardId,
  completions: readonly CharacterCompletion[],
  named: readonly NamedPath[]
): readonly (readonly (string | number)[])[] {
  const found = [...enumeratePaths(cardId, completions)]
  const seen = new Set(found.map((one) => joinPath(cardId, one)))
  for (const one of named) {
    if (one.cardId !== cardId) continue
    const key = joinPath(cardId, one.itemPath)
    if (seen.has(key)) continue
    seen.add(key)
    found.push(one.itemPath)
  }
  return found
}

export function buildCrossCharacterCompletionIndex(
  roster: readonly CompletionCharacterEntry[],
  account: AccountCheckerInput,
  named: readonly NamedPath[] = []
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
    for (const path of pathsFor(cardId, completions, named)) {
      const entries: Record<string, ScalarProgress> = {}
      let rolledCurrent = 0
      let rolledTotal = 0

      for (const entry of roster) {
        const progress = resolveTaskProgress(cardId, path, entry.completion, account, {
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

  const labelled: { label: string; row: CrossCharacterRow }[] = []
  for (const [characterId, entry] of Object.entries(slim.entries)) {
    const meta = parseCharacterMeta(characters[characterId])
    labelled.push({
      label: meta === null ? characterId : meta.label,
      row: {
        characterId,
        progressCurrent: entry.current,
        progressTotal: entry.total,
        displayOrder: meta === null ? Number.MAX_SAFE_INTEGER : meta.sortOrder,
      },
    })
  }
  labelled.sort((a, b) => {
    const order = a.row.displayOrder - b.row.displayOrder
    return order !== 0 ? order : a.label.localeCompare(b.label)
  })
  const rows = labelled.map((one) => one.row)

  return slim.effectiveCharacterId === undefined
    ? { progressCurrent: slim.current, progressTotal: slim.total, rows }
    : {
        progressCurrent: slim.current,
        progressTotal: slim.total,
        effectiveCharacterId: slim.effectiveCharacterId,
        rows,
      }
}
