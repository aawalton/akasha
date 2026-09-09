import { joinPath } from "@akasha/utils/narrow/join-path"
import { uuidVersion7 } from "akasha/id-minting/uuid-version-7/uuid-version-7.module.code.ts"
import {
  type CrossCharacterReading,
  materializeCrossCharacterProgress,
} from "akasha/temper/temper-player-completion/completion-progress-index/completion-progress-index.module.code.ts"

export type ProgressRow = {
  readonly id: string
  readonly characterName: string
  readonly progressTotal: number
  readonly progressCurrent: number
  readonly displayOrder: number
}

export type TaskFacts = {
  readonly slug: string
  readonly completionCardId?: string
  readonly completionItemPath?: readonly string[]
}

export type Refreshed = {
  readonly slug: string
  readonly progressCurrent: number
  readonly progressTotal: number
  readonly rows: readonly ProgressRow[]
}

export type Minting = () => string

export function pathKeyFor(task: TaskFacts): string | null {
  const card = task.completionCardId
  if (card === undefined || card === "") return null
  return joinPath(card, task.completionItemPath ?? null)
}

export function rowsIn(text: string): readonly ProgressRow[] {
  const kept: ProgressRow[] = []
  for (const line of text.split("\n")) {
    if (line.trim() === "") continue
    let held: unknown
    try {
      held = JSON.parse(line)
    } catch {
      continue
    }
    if (held === null || typeof held !== "object") continue
    const said = held as Record<string, unknown>
    if (typeof said.id !== "string" || typeof said.characterName !== "string") continue
    if (typeof said.progressTotal !== "number") continue
    if (typeof said.progressCurrent !== "number") continue
    if (typeof said.displayOrder !== "number") continue
    kept.push({
      id: said.id,
      characterName: said.characterName,
      progressTotal: said.progressTotal,
      progressCurrent: said.progressCurrent,
      displayOrder: said.displayOrder,
    })
  }
  return kept
}

export function idsByName(rows: readonly ProgressRow[]): ReadonlyMap<string, string> {
  const by = new Map<string, string>()
  for (const one of rows) if (!by.has(one.characterName)) by.set(one.characterName, one.id)
  return by
}

export function rowsFrom(
  reading: CrossCharacterReading,
  held: ReadonlyMap<string, string>,
  mint: Minting = uuidVersion7
): readonly ProgressRow[] {
  return reading.rows.map((one) => ({
    id: held.get(one.characterName) ?? mint(),
    characterName: one.characterName,
    progressTotal: one.progressTotal,
    progressCurrent: one.progressCurrent,
    displayOrder: one.displayOrder,
  }))
}

export function bodyOfRows(rows: readonly ProgressRow[]): string {
  return rows
    .map((one) => JSON.stringify(one))
    .join("\n")
    .concat("\n")
}

export function refreshedFor(
  task: TaskFacts,
  index: unknown,
  held: string,
  mint: Minting = uuidVersion7
): Refreshed | null {
  const key = pathKeyFor(task)
  if (key === null) return null
  const reading = materializeCrossCharacterProgress(index, key)
  if (reading === null) return null
  const rows = rowsFrom(reading, idsByName(rowsIn(held)), mint)
  if (rows.length === 0) return null
  return {
    slug: task.slug,
    progressCurrent: reading.progressCurrent,
    progressTotal: reading.progressTotal,
    rows,
  }
}
