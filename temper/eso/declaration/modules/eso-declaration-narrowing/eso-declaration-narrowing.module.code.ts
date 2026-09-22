import {
  type Group,
  nameIn,
} from "akasha/temper/eso/declaration/modules/eso-declaration-chunking/eso-declaration-chunking.module.code.ts"

const ALIAS = /^type ([A-Za-z0-9_$]+) = (.+)$/

export type Narrowing = {
  readonly byHand: ReadonlySet<string>
  readonly byCompiler: ReadonlySet<string>
}

function namedAs(line: string, named: Map<string, string>): string {
  let held = line
  for (const [one, is] of named) held = held.replace(new RegExp(`\\b${one}\\b`, "g"), is)
  return held
}

export function narrowed(
  kinds: readonly (readonly Group[])[],
  held: Narrowing
): readonly (readonly Group[])[] {
  const named = new Map<string, string>()
  const kept = kinds.map((groups) =>
    groups
      .map((group) =>
        group.filter((line) => {
          const one = nameIn(line)
          if (one === null) return true
          if (held.byHand.has(one)) return false
          if (!held.byCompiler.has(one)) return true
          const alias = ALIAS.exec(line)
          if (alias === null) return true
          const is = alias[2]
          if (is !== undefined) named.set(one, is)
          return false
        })
      )
      .filter((group) => group.length > 0)
  )
  if (named.size === 0) return kept
  return kept.map((groups) => groups.map((group) => group.map((line) => namedAs(line, named))))
}
