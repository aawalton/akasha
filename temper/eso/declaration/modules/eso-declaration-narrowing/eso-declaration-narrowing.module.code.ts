import { readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { statedIn } from "akasha/check/code/pages/global-declared-once/global-declared-once.check-code.decision.code.ts"
import {
  type Group,
  nameIn,
} from "akasha/temper/eso/declaration/modules/eso-declaration-chunking/eso-declaration-chunking.module.code.ts"
import ts from "typescript"

const ALIAS = /^type ([A-Za-z0-9_$]+) = (.+)$/

const LIBS = ["lib.es5.d.ts", "lib.dom.d.ts"]

export function compilerNames(): ReadonlySet<string> {
  const at = dirname(ts.getDefaultLibFilePath({}))
  const found = new Set<string>()
  for (const one of LIBS) {
    let text: string
    try {
      text = readFileSync(join(at, one), "utf8")
    } catch {
      continue
    }
    for (const stated of statedIn(one, text)) found.add(stated.name)
  }
  return found
}

export type Narrowing = {
  readonly byHand: ReadonlySet<string>
  readonly byCompiler: ReadonlySet<string>
}

function namedAs(line: string, named: Map<string, string>): string {
  let held = line
  for (const [one, is] of named) held = held.replace(new RegExp(`\\b${one}\\b`, "g"), is)
  return held
}

function keptLine(line: string, held: Narrowing, named: Map<string, string>): boolean {
  const one = nameIn(line)
  if (one === null) return true
  if (held.byHand.has(one)) return false
  if (!held.byCompiler.has(one)) return true
  const alias = ALIAS.exec(line)
  if (alias === null) return true
  const is = alias[2]
  if (is !== undefined) named.set(one, is)
  return false
}

function keptIn(group: Group, held: Narrowing, named: Map<string, string>): Group {
  const head = group[0]
  if (head === undefined) return []
  const one = nameIn(head)
  if (one !== null && ALIAS.exec(head) === null && held.byHand.has(one)) return []
  return group.filter((line) => keptLine(line, held, named))
}

export function narrowed(
  kinds: readonly (readonly Group[])[],
  held: Narrowing
): readonly (readonly Group[])[] {
  const named = new Map<string, string>()
  const kept = kinds.map((groups) =>
    groups.map((group) => keptIn(group, held, named)).filter((group) => group.length > 0)
  )
  if (named.size === 0) return kept
  return kept.map((groups) => groups.map((group) => group.map((line) => namedAs(line, named))))
}
