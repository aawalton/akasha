import { isRecord } from "@akasha/utils-narrow/is-record"
import { joinPath } from "@akasha/utils-narrow/join-path"
import type {
  AccountCompletion,
  CharacterCompletion,
} from "@akasha/temper-completion/completion-progress"
import { COMPLETION_CARD_CHECKERS } from "./completion-card-checkers"
import { ACCOUNT_COMPLETION_CARD_CHECKERS } from "./account-checkers"
import { type AnyCompletionCardId, isAnyCompletionCardId } from "./completion-card-id"
import { resolveTaskProgress } from "./completion-card-progress-resolver"
import { getItemPickerLevels } from "./completion-item-options"
import {
  type CompletionCharacterEntry,
  resolveNextCharacter,
} from "./completion-next-character-resolver"

export type ScalarProgress = { current: number; total: number }

export type CrossCharacterEntry = {
  current: number
  total: number
  sortOrder: number
  label?: string
  href: string
}

export function buildCrossCharacterEntryHref(characterId: string, cardId: string): string {
  const ch = encodeURIComponent(characterId)
  const c = encodeURIComponent(cardId)
  return `/completion?tab=characters&character=${ch}&scrollTo=${c}`
}

export type CrossCharacterProgress = {
  current: number
  total: number
  activeEntryKey?: string
  entries: Record<string, CrossCharacterEntry>
}

export type SlimCrossCharacterProgress = {
  current: number
  total: number
  activeEntryKey?: string
  entries: Record<string, { current: number; total: number }>
}

export type CrossCharacterCompletionIndex = {
  characters: Record<string, { label: string; sortOrder: number }>
  paths: Record<string, SlimCrossCharacterProgress>
}

type ItemPath = readonly (string | number)[]

function enumeratePaths(
  cardId: AnyCompletionCardId,
  completions: readonly CharacterCompletion[]
): readonly ItemPath[] {
  const paths: ItemPath[] = []

  function walk(currentPath: ItemPath): undefined {
    paths.push(currentPath)
    const level = getItemPickerLevels(cardId, completions, currentPath)
    if (level === null) return
    for (const option of level.options) {
      walk([...currentPath, option.value])
    }
    return
  }

  walk([])
  return paths
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
  const cardIds = asCardIds(Object.keys(COMPLETION_CARD_CHECKERS))
  const charRow = { id: characterId, completion: characterCompletion }

  for (const cardId of cardIds) {
    const paths = enumeratePaths(cardId, [characterCompletion])
    for (const path of paths) {
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
  const cardIds = asCardIds(Object.keys(ACCOUNT_COMPLETION_CARD_CHECKERS))

  for (const cardId of cardIds) {
    const paths = enumeratePaths(cardId, [])
    for (const path of paths) {
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
  for (const rosterEntry of roster) {
    characters[rosterEntry.id] = {
      label: rosterEntry.firstName !== "" ? rosterEntry.firstName : rosterEntry.name,
      sortOrder: rosterEntry.sortOrder ?? Number.MAX_SAFE_INTEGER,
    }
  }

  const paths: Record<string, SlimCrossCharacterProgress> = {}
  const cardIds = asCardIds(Object.keys(COMPLETION_CARD_CHECKERS))

  const completions: CharacterCompletion[] = []
  for (const entry of roster) {
    if (entry.completion) completions.push(entry.completion)
  }

  for (const cardId of cardIds) {
    const itemPaths = enumeratePaths(cardId, completions)
    for (const path of itemPaths) {
      const entries: SlimCrossCharacterProgress["entries"] = {}
      let rolledCurrent = 0
      let rolledTotal = 0

      for (const rosterEntry of roster) {
        const progress = resolveTaskProgress(
          cardId,
          path,
          rosterEntry.completion,
          accountCompletion,
          { id: rosterEntry.id, completion: rosterEntry.completion }
        )
        if (progress === undefined) continue
        entries[rosterEntry.id] = { current: progress.current, total: progress.total }
        rolledCurrent += progress.current
        rolledTotal += progress.total
      }

      if (Object.keys(entries).length === 0) continue

      const next = resolveNextCharacter(roster, cardId, path)
      const value: SlimCrossCharacterProgress =
        next === null
          ? { current: rolledCurrent, total: rolledTotal, entries }
          : {
              current: rolledCurrent,
              total: rolledTotal,
              activeEntryKey: next.characterId,
              entries,
            }

      paths[joinPath(cardId, path)] = value
    }
  }

  return { characters, paths }
}

function parseSlimProgress(value: unknown): SlimCrossCharacterProgress | null {
  if (!isRecord(value)) return null
  if (typeof value.current !== "number" || typeof value.total !== "number") return null
  if (!isRecord(value.entries)) return null

  const entries: SlimCrossCharacterProgress["entries"] = {}
  for (const [characterId, raw] of Object.entries(value.entries)) {
    if (!isRecord(raw)) return null
    if (typeof raw.current !== "number" || typeof raw.total !== "number") return null
    entries[characterId] = { current: raw.current, total: raw.total }
  }

  return typeof value.activeEntryKey === "string"
    ? { current: value.current, total: value.total, activeEntryKey: value.activeEntryKey, entries }
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
): CrossCharacterProgress | null {
  if (!isRecord(index)) return null
  const { characters, paths } = index
  if (!isRecord(characters) || !isRecord(paths)) return null

  const slim = parseSlimProgress(paths[pathKey])
  if (slim === null) return null

  const cardId = pathKey.split("/")[0] ?? pathKey
  const entries: Record<string, CrossCharacterEntry> = {}
  for (const [characterId, entry] of Object.entries(slim.entries)) {
    const meta = parseCharacterMeta(characters[characterId])
    const href = buildCrossCharacterEntryHref(characterId, cardId)
    entries[characterId] =
      meta === null
        ? { current: entry.current, total: entry.total, sortOrder: Number.MAX_SAFE_INTEGER, href }
        : {
            current: entry.current,
            total: entry.total,
            sortOrder: meta.sortOrder,
            label: meta.label,
            href,
          }
  }

  return slim.activeEntryKey === undefined
    ? { current: slim.current, total: slim.total, entries }
    : {
        current: slim.current,
        total: slim.total,
        activeEntryKey: slim.activeEntryKey,
        entries,
      }
}
