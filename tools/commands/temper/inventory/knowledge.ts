export const summary = "Inspect per-character knowledge (recipes, motifs, scripts) from TemperCharacters.lua"

import type { CommandHelp } from "../../../ops/surface.ts"
import { codeModule } from "../../../lib/code-import.ts"
import { inputError } from "../../../lib/exit.ts"
import { parseArgs } from "../../../lib/parse-args.ts"
import { TEMPER_CHARACTERS_LUA, savedVarsFile } from "../../../lib/temper-inventory-paths.ts"
import { loadTemperCharactersFromPath } from "../../../lib/temper-inventory/parse-temper-characters.ts"

const MOTIF_CHAPTER_SET = "@temper/game-items-core/motif-chapter-set"

export const help: CommandHelp = {
  flags: [
    {
      name: "--char",
      argLabel: "<id>",
      valueShape: "token",
      description: "Restrict output to a single character id.",
    },
    {
      name: "--item-key",
      argLabel: "<kind>:<args>",
      valueShape: "token",
      description:
        "Switch to knows-mode. One of recipe:<resultItemId>, motif:<styleId>:<chapterId|master>, script:<scriptId>.",
    },
    {
      name: "--characters-path",
      argLabel: "<path>",
      valueShape: "token",
      description: `Path to TemperCharacters.lua (default: ${TEMPER_CHARACTERS_LUA})`,
    },
    {
      name: "--json",
      description: "Emit JSON instead of TSV.",
    },
  ],
  examples: [
    "ops temper inventory knowledge",
    "ops temper inventory knowledge --char 8796093022338107",
    "ops temper inventory knowledge --item-key recipe:1234",
    "ops temper inventory knowledge --item-key motif:15:4 --json",
    "ops temper inventory knowledge --item-key motif:15:master --json",
    "ops temper inventory knowledge --item-key script:9999 --char 8796093022338107",
  ],
}

interface CharacterKnowledge {
  readonly id: string
  readonly name: string | null
  readonly recipeResultItemIds: ReadonlySet<number>
  readonly motifChaptersByStyle: ReadonlyMap<number, ReadonlySet<number>>
  readonly unlockedScriptIds: ReadonlySet<number>
}

interface CharactersLoader {
  readonly loadTemperCharactersFromPath: (
    path: string
  ) => Promise<ReadonlyArray<CharacterKnowledge>>
}

interface MotifChapterSet {
  readonly STYLE_TO_CHAPTERS: Readonly<Record<number, readonly number[]>>
}

interface RecipeKey {
  readonly kind: "recipe"
  readonly resultItemId: number
}
interface MotifKey {
  readonly kind: "motif"
  readonly styleId: number
  readonly chapterId: number | null
}
interface ScriptKey {
  readonly kind: "script"
  readonly scriptId: number
}
type ItemKey = RecipeKey | MotifKey | ScriptKey

interface CountRow {
  readonly id: string
  readonly name: string | null
  readonly recipeCount: number
  readonly motifCount: number
  readonly scriptCount: number
}

interface KnowsRow {
  readonly id: string
  readonly name: string | null
  readonly knows: boolean
}

function parsePositiveInt(raw: string): number | null {
  if (!/^\d+$/.test(raw)) return null
  const n = Number(raw)
  return Number.isInteger(n) && n >= 0 ? n : null
}

async function parseItemKey(raw: string): Promise<ItemKey> {
  const colon = raw.indexOf(":")
  if (colon === -1) {
    throw inputError(
      `--item-key: expected '<kind>:<args>', got '${raw}'. Forms: recipe:<id>, motif:<collection>:<book>, script:<id>.`
    )
  }
  const kind = raw.slice(0, colon)
  const rest = raw.slice(colon + 1)
  if (kind === "recipe") {
    const resultItemId = parsePositiveInt(rest)
    if (resultItemId === null) {
      throw inputError(`--item-key recipe: expected integer resultItemId, got '${rest}'.`)
    }
    return { kind: "recipe", resultItemId }
  }
  if (kind === "motif") {
    const sep = rest.indexOf(":")
    if (sep === -1) {
      throw inputError(
        `--item-key motif: expected 'motif:<styleId>:<chapterId|master>', got 'motif:${rest}'.`
      )
    }
    const styleId = parsePositiveInt(rest.slice(0, sep))
    const chapterRaw = rest.slice(sep + 1)
    if (styleId === null) {
      throw inputError(`--item-key motif: expected integer styleId, got 'motif:${rest}'.`)
    }
    if (chapterRaw === "master") {
      return { kind: "motif", styleId, chapterId: null }
    }
    const chapterId = parsePositiveInt(chapterRaw)
    if (chapterId === null) {
      throw inputError(
        `--item-key motif: expected integer chapterId or 'master', got 'motif:${rest}'.`
      )
    }
    return { kind: "motif", styleId, chapterId }
  }
  if (kind === "script") {
    const scriptId = parsePositiveInt(rest)
    if (scriptId === null) {
      throw inputError(`--item-key script: expected integer scriptId, got '${rest}'.`)
    }
    return { kind: "script", scriptId }
  }
  throw inputError(
    `--item-key: unknown kind '${kind}'. Forms: recipe:<id>, motif:<collection>:<book>, script:<id>.`
  )
}

function knowsItem(
  c: CharacterKnowledge,
  key: ItemKey,
  styleToChapters: Readonly<Record<number, readonly number[]>>
): boolean {
  if (key.kind === "recipe") return c.recipeResultItemIds.has(key.resultItemId)
  if (key.kind === "script") return c.unlockedScriptIds.has(key.scriptId)
  const knownChapters = c.motifChaptersByStyle.get(key.styleId)
  if (knownChapters === undefined) return false
  if (key.chapterId === null) {
    const styleChapters = styleToChapters[key.styleId]
    if (styleChapters === undefined || styleChapters.length === 0) return false
    return knownChapters.size === styleChapters.length
  }
  return knownChapters.has(key.chapterId)
}

function motifBookCount(c: CharacterKnowledge): number {
  let total = 0
  for (const chapters of c.motifChaptersByStyle.values()) total += chapters.size
  return total
}

function buildCountRow(c: CharacterKnowledge): CountRow {
  return {
    id: c.id,
    name: c.name,
    recipeCount: c.recipeResultItemIds.size,
    motifCount: motifBookCount(c),
    scriptCount: c.unlockedScriptIds.size,
  }
}

function formatCountTsv(rows: readonly CountRow[]): string {
  const lines = rows.map(
    (r) => `${r.id}\t${r.name ?? ""}\t${r.recipeCount}\t${r.motifCount}\t${r.scriptCount}`
  )
  return `${lines.join("\n")}\n`
}

function formatKnowsTsv(rows: readonly KnowsRow[]): string {
  const lines = rows.map((r) => `${r.id}\t${r.name ?? ""}\t${r.knows}`)
  return `${lines.join("\n")}\n`
}

async function selectCharacters(
  all: ReadonlyArray<CharacterKnowledge>,
  charId: string | undefined
): Promise<ReadonlyArray<CharacterKnowledge>> {
  if (charId === undefined) return all
  const match = all.find((c) => c.id === charId)
  if (!match) {
    throw inputError(
      `--char ${charId}: no such character in TemperCharacters.lua. Run without --char to list known ids.`
    )
  }
  return [match]
}

export default async function temperInventoryKnowledge(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const charId = parsed.string("--char")
  const itemKeyRaw = parsed.string("--item-key")
  const charactersPath =
    parsed.string("--characters-path") ?? (await savedVarsFile("TemperCharacters.lua"))
  const json = parsed.boolean("--json")

  const itemKey = itemKeyRaw === undefined ? null : await parseItemKey(itemKeyRaw)
  const characters = await loadTemperCharactersFromPath(charactersPath)
  const selected = await selectCharacters(characters, charId)

  if (itemKey !== null) {
    const { STYLE_TO_CHAPTERS } = await codeModule<MotifChapterSet>(MOTIF_CHAPTER_SET)
    const rows = selected.map((c) => ({
      id: c.id,
      name: c.name,
      knows: knowsItem(c, itemKey, STYLE_TO_CHAPTERS),
    }))
    if (json) {
      process.stdout.write(`${JSON.stringify(rows)}\n`)
      return
    }
    process.stdout.write(formatKnowsTsv(rows))
    return
  }

  const rows = selected.map(buildCountRow)
  if (json) {
    if (charId !== undefined && rows[0] !== undefined) {
      process.stdout.write(`${JSON.stringify(rows[0])}\n`)
      return
    }
    process.stdout.write(`${JSON.stringify(rows)}\n`)
    return
  }
  process.stdout.write(formatCountTsv(rows))
}
