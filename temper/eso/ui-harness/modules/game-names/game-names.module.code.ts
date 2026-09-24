import { luaStringLiteral } from "akasha/temper/eso/lua-runner/modules/lua-marshal/lua-marshal.module.code.ts"

const DEFINED = /^function ([A-Za-z_]\w*)\s*\(|^([A-Za-z_]\w*)\s*=(?!=)/gm

export function definedNames(text: string): readonly string[] {
  const found = new Set<string>()
  for (const match of text.matchAll(DEFINED)) {
    const name = match[1] ?? match[2]
    if (name !== undefined) found.add(name)
  }
  return [...found]
}

export function namesUnstubbedLua(texts: readonly string[]): string {
  const found = new Set<string>()
  for (const text of texts) for (const name of definedNames(text)) found.add(name)
  const listed = [...found].sort().map(luaStringLiteral).join(",")
  return `return __eso_leave_names_unstubbed({${listed}})`
}
