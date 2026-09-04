import { resolve } from "node:path"
import type { Answer, Given } from "@akasha/command-system/calling"
import { refused } from "@akasha/command-system/calling"
import { whyOf } from "@akasha/command-system/fault-saying"
import { savedVarsFile } from "@akasha/temper-eso-paths/eso-paths-resolve"
import { STYLE_TO_CHAPTERS } from "@akasha/temper-items-core/motif-chapter-set"
import {
  type CharacterKnowledge,
  loadTemperCharactersFromPath,
} from "../inventory-characters-reading/inventory-characters-reading.module.code.ts"

const INPUT = 1

const OPERATIONAL = 3

const CHAR = "--char"

const ITEM_KEY = "--item-key"

const CHARACTERS_PATH = "--characters-path"

const JSON_FLAG = "--json"

const CHARACTERS_LUA = "TemperCharacters.lua"

const MASTER = "master"

type RecipeKey = { readonly kind: "recipe"; readonly resultItemId: number }

type MotifKey = {
  readonly kind: "motif"
  readonly styleId: number
  readonly chapterId: number | null
}

type ScriptKey = { readonly kind: "script"; readonly scriptId: number }

type ItemKey = RecipeKey | MotifKey | ScriptKey

export type Read =
  | {
      readonly charId: string | null
      readonly itemKey: string | null
      readonly charactersPath: string | null
      readonly json: boolean
    }
  | { readonly refused: readonly string[] }

export function readIn(argv: readonly string[]): Read {
  const refusals: string[] = []
  let charId: string | null = null
  let itemKey: string | null = null
  let charactersPath: string | null = null
  let json = false
  for (let at = 0; at < argv.length; at += 1) {
    const one = argv[at]
    if (one === undefined) continue
    if (one === JSON_FLAG) {
      json = true
      continue
    }
    if (one === CHAR || one === ITEM_KEY || one === CHARACTERS_PATH) {
      const value = argv[at + 1]
      at += 1
      if (value === undefined) {
        refusals.push(`\`${one}\` takes a value, and none followed it`)
        continue
      }
      if (one === CHAR) charId = value
      else if (one === ITEM_KEY) itemKey = value
      else charactersPath = value
      continue
    }
    refusals.push(
      `\`${one}\` is nothing this takes — it takes \`${CHAR}\`, \`${ITEM_KEY}\`, ` +
        `\`${CHARACTERS_PATH}\` and \`${JSON_FLAG}\``
    )
  }
  if (refusals.length > 0) return { refused: refusals }
  return { charId, itemKey, charactersPath, json }
}

function wholeNumberIn(said: string): number | null {
  if (!/^\d+$/.test(said)) return null
  const held = Number(said)
  return Number.isInteger(held) && held >= 0 ? held : null
}

export function itemKeyIn(raw: string): ItemKey | string {
  const colon = raw.indexOf(":")
  if (colon === -1) {
    return `\`${ITEM_KEY}\` takes \`<kind>:<args>\`, and \`${raw}\` carries no \`:\``
  }
  const kind = raw.slice(0, colon)
  const rest = raw.slice(colon + 1)
  if (kind === "recipe") {
    const resultItemId = wholeNumberIn(rest)
    if (resultItemId === null) {
      return `\`${ITEM_KEY} recipe:\` takes a whole number, and \`${rest}\` is none`
    }
    return { kind: "recipe", resultItemId }
  }
  if (kind === "script") {
    const scriptId = wholeNumberIn(rest)
    if (scriptId === null) {
      return `\`${ITEM_KEY} script:\` takes a whole number, and \`${rest}\` is none`
    }
    return { kind: "script", scriptId }
  }
  if (kind === "motif") {
    const sep = rest.indexOf(":")
    if (sep === -1) {
      return `\`${ITEM_KEY} motif:\` takes \`<styleId>:<chapterId|${MASTER}>\`, said \`motif:${rest}\``
    }
    const styleId = wholeNumberIn(rest.slice(0, sep))
    if (styleId === null) {
      return `\`${ITEM_KEY} motif:\` takes a whole number style, said \`motif:${rest}\``
    }
    const chapterRaw = rest.slice(sep + 1)
    if (chapterRaw === MASTER) return { kind: "motif", styleId, chapterId: null }
    const chapterId = wholeNumberIn(chapterRaw)
    if (chapterId === null) {
      return `\`${ITEM_KEY} motif:\` takes a whole number chapter or \`${MASTER}\`, said \`motif:${rest}\``
    }
    return { kind: "motif", styleId, chapterId }
  }
  return `\`${ITEM_KEY}\` carries \`recipe\`, \`motif\` and \`script\`, and \`${kind}\` is none of them`
}

export function knowsItem(
  one: CharacterKnowledge,
  key: ItemKey,
  styleToChapters: Readonly<Record<number, readonly number[]>>
): boolean {
  if (key.kind === "recipe") return one.recipeResultItemIds.has(key.resultItemId)
  if (key.kind === "script") return one.unlockedScriptIds.has(key.scriptId)
  const known = one.motifChaptersByStyle.get(key.styleId)
  if (known === undefined) return false
  if (key.chapterId === null) {
    const chapters = styleToChapters[key.styleId]
    if (chapters === undefined || chapters.length === 0) return false
    return known.size === chapters.length
  }
  return known.has(key.chapterId)
}

function motifBookCount(one: CharacterKnowledge): number {
  let total = 0
  for (const chapters of one.motifChaptersByStyle.values()) total += chapters.size
  return total
}

export async function temperInventoryKnowledge(
  argv: readonly string[] = [],
  given?: Given
): Promise<Answer> {
  const read = readIn(argv)
  if ("refused" in read) return { report: [], refusals: read.refused, code: INPUT }
  const key = read.itemKey === null ? null : itemKeyIn(read.itemKey)
  if (typeof key === "string") return refused(key, INPUT)
  const root = given === undefined ? process.cwd() : resolve(given.root)
  const at =
    read.charactersPath === null
      ? savedVarsFile(CHARACTERS_LUA)
      : resolve(root, read.charactersPath)
  let characters: ReadonlyArray<CharacterKnowledge>
  try {
    characters = await loadTemperCharactersFromPath(at)
  } catch (thrown) {
    return refused(whyOf(thrown), OPERATIONAL)
  }
  let selected: ReadonlyArray<CharacterKnowledge> = characters
  if (read.charId !== null) {
    const match = characters.find((one) => one.id === read.charId)
    if (match === undefined) {
      return refused(
        `\`${CHAR} ${read.charId}\` names no character in ${CHARACTERS_LUA} at ${at}`,
        INPUT
      )
    }
    selected = [match]
  }
  if (key !== null) {
    const rows = selected.map((one) => ({
      id: one.id,
      name: one.name,
      knows: knowsItem(one, key, STYLE_TO_CHAPTERS),
    }))
    if (read.json) return { report: [JSON.stringify(rows)], refusals: [], code: 0 }
    return {
      report: rows.map((one) => `${one.id}\t${one.name ?? ""}\t${one.knows}`),
      refusals: [],
      code: 0,
    }
  }
  const rows = selected.map((one) => ({
    id: one.id,
    name: one.name,
    recipeCount: one.recipeResultItemIds.size,
    motifCount: motifBookCount(one),
    scriptCount: one.unlockedScriptIds.size,
  }))
  if (read.json) {
    const first = rows[0]
    const held = read.charId !== null && first !== undefined ? first : rows
    return { report: [JSON.stringify(held)], refusals: [], code: 0 }
  }
  return {
    report: rows.map(
      (one) =>
        `${one.id}\t${one.name ?? ""}\t${one.recipeCount}\t${one.motifCount}\t${one.scriptCount}`
    ),
    refusals: [],
    code: 0,
  }
}
