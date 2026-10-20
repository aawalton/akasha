import {
  dataOf,
  fieldOf,
  heldTable,
  type LuaData,
  type Reader,
  tableAt,
  tableIn,
  textAt,
} from "akasha/command/pages/temper/eso/memory/modules/hks-table-reading/hks-table-reading.module.code.ts"
import type { BuildReading } from "akasha/temper/player/character/stat/modules/build-reading-lines/build-reading-lines.module.code.ts"
import {
  type Fight,
  fightsOf,
} from "akasha/temper/watcher/modules/watcher-import-fights/watcher-import-fights.module.code.ts"

export const CHARACTERS_GLOBAL = "TemperCharacters_SavedVariables"

export const FIGHTS_GLOBAL = "TemperCombat_FightCaptures"

const STRING = 4

const BARS = ["frontBar", "backBar"] as const

const ACCOUNT = "@"

export type Roots = { readonly characters: bigint | null; readonly fights: bigint | null }

export type Seen = {
  readonly readings: Set<string>
  readonly fights: Set<string>
}

export type Captured = {
  readonly readings: readonly BuildReading[]
  readonly fights: readonly Fight[]
  readonly readingsSeen: readonly string[]
  readonly fightsSeen: readonly string[]
}

const KEPT_READINGS = "keptReadings"

type Character = { readonly name: string; readonly buildHash: string; readonly table: bigint }

export function seenAfresh(): Seen {
  return { readings: new Set(), fights: new Set() }
}

function fieldData(read: Reader, table: bigint, name: string): LuaData | undefined {
  const held = fieldOf(read, table, name)
  return held === null ? undefined : dataOf(read, held)
}

function textField(read: Reader, table: bigint, name: string): string | null {
  const held = fieldData(read, table, name)
  return typeof held === "string" ? held : null
}

function numberField(read: Reader, table: bigint, name: string): number | null {
  const held = fieldData(read, table, name)
  return typeof held === "number" ? held : null
}

function accountIn(read: Reader, defaults: bigint): bigint | null {
  for (const entry of tableAt(read, defaults)?.entries ?? []) {
    if (entry.key.type !== STRING) continue
    if (!(textAt(read, entry.key.value) ?? "").startsWith(ACCOUNT)) continue
    return tableIn(entry.value)
  }
  return null
}

function charactersTable(read: Reader, root: bigint): bigint | null {
  const defaults = tableIn(fieldOf(read, root, "Default"))
  const account = defaults === null ? null : accountIn(read, defaults)
  const wide = account === null ? null : tableIn(fieldOf(read, account, "$AccountWide"))
  return wide === null ? null : tableIn(fieldOf(read, wide, "characters"))
}

function charactersIn(read: Reader, root: bigint): readonly Character[] {
  const characters = charactersTable(read, root)
  if (characters === null) return []
  const found: Character[] = []
  for (const entry of tableAt(read, characters)?.entries ?? []) {
    const table = tableIn(entry.value)
    if (table === null) continue
    const name = textField(read, table, "name")
    const buildHash = textField(read, table, "buildHash")
    if (name !== null && buildHash !== null) found.push({ name, buildHash, table })
  }
  return found
}

function isRecord(data: LuaData | undefined): data is { readonly [key: string]: LuaData } {
  return data !== undefined && data !== null && typeof data === "object"
}

type ReadingsFound = {
  readonly readings: BuildReading[]
  readonly seen: string[]
}

export function readingKeyOf(character: string, bar: string, capturedAt: number): string {
  return `${character}:${bar}:${String(capturedAt)}`
}

function taken(
  read: Reader,
  character: string,
  bar: string,
  table: bigint,
  seen: Seen,
  found: ReadingsFound
): undefined {
  const at = numberField(read, table, "capturedAt")
  if (at === null) return undefined
  const key = readingKeyOf(character, bar, at)
  if (seen.readings.has(key) || found.seen.includes(key)) return undefined
  const reading = dataOf(read, heldTable(table))
  if (!isRecord(reading) || numberField(read, table, "capturedAt") !== at) return undefined
  const one = buildReadingOf(character, bar, reading)
  if (one !== null) found.readings.push(one)
  found.seen.push(key)
  return undefined
}

function keptIn(read: Reader, character: Character, seen: Seen, found: ReadingsFound): undefined {
  const kept = tableIn(fieldOf(read, character.table, KEPT_READINGS))
  if (kept === null) return undefined
  for (const entry of tableAt(read, kept)?.entries ?? []) {
    const one = tableIn(entry.value)
    if (one === null) continue
    const bar = textField(read, one, "bar")
    const reading = tableIn(fieldOf(read, one, "reading"))
    if (bar !== null && reading !== null) taken(read, character.name, bar, reading, seen, found)
  }
  return undefined
}

function capturedAtOf(one: BuildReading): number {
  const at = one.reading["capturedAt"]
  return typeof at === "number" ? at : 0
}

export function buildReadingOf(
  character: string,
  bar: string,
  held: { readonly [key: string]: LuaData }
): BuildReading | null {
  const { buildHash, ...reading } = held
  return typeof buildHash === "string" ? { character, buildHash, bar, reading } : null
}

function readingsIn(read: Reader, characters: readonly Character[], seen: Seen): ReadingsFound {
  const found: ReadingsFound = { readings: [], seen: [] }
  for (const character of characters) {
    keptIn(read, character, seen, found)
    const stats = tableIn(fieldOf(read, character.table, "reportedStats"))
    if (stats === null) continue
    for (const bar of BARS) {
      const table = tableIn(fieldOf(read, stats, bar))
      if (table !== null) taken(read, character.name, bar, table, seen, found)
    }
  }
  found.readings.sort((one, other) => capturedAtOf(one) - capturedAtOf(other))
  return found
}

function fightKeyIn(read: Reader, table: bigint): string | null {
  const at = numberField(read, table, "capturedAt")
  const seconds = numberField(read, table, "combatSeconds")
  return at === null || seconds === null ? null : `${at}:${seconds}`
}

type FightsFound = { readonly fights: Fight[]; readonly seen: string[] }

function fightsIn(
  read: Reader,
  root: bigint,
  builds: ReadonlyMap<string, string>,
  seen: Seen,
  looked: boolean
): FightsFound {
  const found: FightsFound = { fights: [], seen: [] }
  for (const entry of tableAt(read, root)?.entries ?? []) {
    const table = tableIn(entry.value)
    const key = table === null ? null : fightKeyIn(read, table)
    if (table === null || key === null || seen.fights.has(key)) continue
    const data = dataOf(read, heldTable(table))
    if (!isRecord(data)) continue
    const parsed = fightsOf([data])[0]
    if (parsed === undefined) continue
    const buildHash = looked ? builds.get(parsed.character) : undefined
    found.fights.push(buildHash === undefined ? parsed : { ...parsed, buildHash })
    found.seen.push(key)
  }
  return found
}

export function capturedFrom(read: Reader, roots: Roots, seen: Seen, looked: boolean): Captured {
  const characters = roots.characters === null ? [] : charactersIn(read, roots.characters)
  const builds = new Map(characters.map((one) => [one.name, one.buildHash]))
  const readings = readingsIn(read, characters, seen)
  const fights =
    roots.fights === null
      ? { fights: [], seen: [] }
      : fightsIn(read, roots.fights, builds, seen, looked)
  return {
    readings: readings.readings,
    fights: fights.fights,
    readingsSeen: readings.seen,
    fightsSeen: fights.seen,
  }
}

export function markSeen(seen: Seen, captured: Captured): undefined {
  for (const key of captured.readingsSeen) seen.readings.add(key)
  for (const key of captured.fightsSeen) seen.fights.add(key)
  return undefined
}
