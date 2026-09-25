import { joinPath } from "akasha/code/type/narrowing/modules/join-path/join-path.module.code.ts"
import { uuidVersion7 } from "akasha/page/id/modules/uuid-version-7/uuid-version-7.module.code.ts"
import {
  type CrossCharacterReading,
  materializeCrossCharacterProgress,
} from "akasha/temper/player/completion/temper-player-completion/modules/completion-progress-index/completion-progress-index.module.code.ts"
import { z } from "zod"

const CHARACTER_TYPE = "temper-account-character"

const PROGRESS_ROW = z.object({
  id: z.string(),
  character: z.string(),
  progressTotal: z.number(),
  progressCurrent: z.number(),
  displayOrder: z.number(),
})

export type ProgressRow = Readonly<z.infer<typeof PROGRESS_ROW>>

export type TaskFacts = {
  readonly slug: string
  readonly scope?: string
  readonly completionCardId?: string
  readonly completionItemPath?: readonly string[]
  readonly character?: string
}

const ROTATING_SCOPES: readonly string[] = ["next_character", "all_characters"]

export function rotatesOverCharacters(task: TaskFacts): boolean {
  return task.scope !== undefined && ROTATING_SCOPES.includes(task.scope)
}

export type Refreshed = {
  readonly slug: string
  readonly progressCurrent: number
  readonly progressTotal: number
  readonly effectiveCharacter: string | null
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
    let held: ReturnType<typeof PROGRESS_ROW.safeParse>
    try {
      held = PROGRESS_ROW.safeParse(JSON.parse(line))
    } catch {
      continue
    }
    if (held.success) kept.push(held.data)
  }
  return kept
}

export type Refusing = (said: string) => void

export type Characters = {
  readonly slugs: ReadonlySet<string>
  readonly refuse: Refusing
}

export function characterAddress(slug: string): string {
  return `${CHARACTER_TYPE}/${slug}`
}

export function unpagedWhy(task: string, slug: string): string {
  return `Task ${task}: no ${CHARACTER_TYPE} page is \`${slug}\`, so that character's line was refused rather than written`
}

export function idsByCharacter(rows: readonly ProgressRow[]): ReadonlyMap<string, string> {
  const by = new Map<string, string>()
  for (const one of rows) if (!by.has(one.character)) by.set(one.character, one.id)
  return by
}

export function rowsFrom(
  task: string,
  reading: CrossCharacterReading,
  held: ReadonlyMap<string, string>,
  characters: Characters,
  mint: Minting = uuidVersion7
): readonly ProgressRow[] {
  const rows: ProgressRow[] = []
  for (const one of reading.rows) {
    if (!characters.slugs.has(one.characterId)) {
      characters.refuse(unpagedWhy(task, one.characterId))
      continue
    }
    const character = characterAddress(one.characterId)
    rows.push({
      id: held.get(character) ?? mint(),
      character,
      progressTotal: one.progressTotal,
      progressCurrent: one.progressCurrent,
      displayOrder: one.displayOrder,
    })
  }
  return rows
}

function summed(rows: readonly ProgressRow[], key: "progressCurrent" | "progressTotal"): number {
  return rows.reduce((sum, one) => sum + one[key], 0)
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
  characters: Characters,
  mint: Minting = uuidVersion7
): Refreshed | null {
  const key = pathKeyFor(task)
  if (key === null) return null
  const reading = materializeCrossCharacterProgress(index, key, task.character)
  if (reading === null) return null
  const rows = rowsFrom(task.slug, reading, idsByCharacter(rowsIn(held)), characters, mint)
  if (rows.length === 0) return null
  return {
    slug: task.slug,
    progressCurrent: summed(rows, "progressCurrent"),
    progressTotal: summed(rows, "progressTotal"),
    effectiveCharacter: reading.effectiveCharacterId ?? null,
    rows,
  }
}
