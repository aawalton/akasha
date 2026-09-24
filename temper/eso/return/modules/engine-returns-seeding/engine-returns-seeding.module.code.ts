import { readFileSync } from "node:fs"
import { join } from "node:path"
import { akashaRoot } from "akasha/page/modules/checkout-roots/checkout-roots.module.code.ts"
import { luaStringLiteral } from "akasha/temper/eso/lua-runner/modules/lua-marshal/lua-marshal.module.code.ts"
import type {
  EngineReturns,
  ReturnKind,
} from "akasha/temper/eso/return/modules/engine-returns-reading/engine-returns-reading.module.code.ts"

export const RETURNS_AT =
  "temper/eso/return/modules/engine-returns/engine-returns.data-table.data.json"

const PER_CHUNK = 1000

const EMPTY: Readonly<Record<ReturnKind, string>> = {
  number: "0",
  word: '""',
  truth: "false",
  thing: "__eso_make_stub()",
  nothing: "nil",
}

export function engineReturnsTable(root: string = akashaRoot()): EngineReturns {
  return JSON.parse(readFileSync(join(root, RETURNS_AT), "utf8")) as EngineReturns
}

export function answerLua(kinds: readonly ReturnKind[]): string {
  if (kinds.length === 0) return "function() end"
  return `function() return ${kinds.map((kind) => EMPTY[kind]).join(",")} end`
}

export function controlMethodsLua(held: EngineReturns): string {
  return `return __ui_control_methods({${held.controlMethods.map(luaStringLiteral).join(",")}})`
}

export function returnsLua(held: EngineReturns, perChunk: number = PER_CHUNK): readonly string[] {
  const named = Object.keys(held.returns).sort()
  const chunks: string[] = []
  for (let at = 0; at < named.length; at += perChunk) {
    const body = named
      .slice(at, at + perChunk)
      .map((name) => `[${luaStringLiteral(name)}]=${answerLua(held.returns[name] ?? [])}`)
      .join(",")
    chunks.push(`__eso_defaults({${body}})`)
  }
  return chunks
}
