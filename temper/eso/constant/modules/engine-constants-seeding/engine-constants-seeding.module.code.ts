import { readFileSync } from "node:fs"
import { join } from "node:path"
import { akashaRoot } from "akasha/page/modules/checkout-roots/checkout-roots.module.code.ts"
import {
  luaStringLiteral,
  marshalLuaValue,
} from "akasha/temper/eso/lua-runner/modules/lua-marshal/lua-marshal.module.code.ts"

export const CONSTANTS_AT =
  "temper/eso/constant/modules/engine-constants/engine-constants.data-table.data.json"

const PER_CHUNK = 2000

type Held = number | string

export interface EngineConstantsTable {
  readonly apiVersion: number
  readonly numbers: Readonly<Record<string, number>>
  readonly words: Readonly<Record<string, string>>
}

export function engineConstantsTable(root: string = akashaRoot()): EngineConstantsTable {
  return JSON.parse(readFileSync(join(root, CONSTANTS_AT), "utf8")) as EngineConstantsTable
}

function heldIn(table: EngineConstantsTable): readonly (readonly [string, Held])[] {
  const found = new Map<string, Held>()
  for (const [name, value] of Object.entries(table.numbers)) found.set(name, value)
  for (const [name, value] of Object.entries(table.words)) found.set(name, value)
  return [...found.entries()].sort((a, b) => (a[0] < b[0] ? -1 : 1))
}

export function constantsLua(
  table: EngineConstantsTable,
  perChunk: number = PER_CHUNK
): readonly string[] {
  const held = heldIn(table)
  const chunks: string[] = []
  for (let at = 0; at < held.length; at += perChunk) {
    const body = held
      .slice(at, at + perChunk)
      .map(([name, value]) => `[${luaStringLiteral(name)}]=${marshalLuaValue(value)}`)
      .join(",")
    chunks.push(`__eso_constants({${body}})`)
  }
  return chunks
}
