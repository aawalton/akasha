import { existsSync, readFileSync } from "node:fs"
import { join } from "node:path"
import { luaStringLiteral } from "akasha/temper/eso/lua-runner/modules/lua-marshal/lua-marshal.module.code.ts"

const STRINGS_AT: readonly string[] = ["fontstrings/western/defaultfontstrings_western.xml"]

const FONTS_AT: readonly string[] = [
  "fontdefs/keyboard/defaultfontdefs_keyboard.xml",
  "fontdefs/gamepad/defaultfontdefs_gamepad.xml",
]

const STRING = /<String\s+name="([^"]+)"\s+value="([^"]*)"/g

const FONT = /<Font\s+name="([^"]+)"\s+font="([^"]*)"/g

const PLACEHOLDER = /\$\(([A-Za-z0-9_]+)\)/g

export type GameFont = {
  readonly face: string
  readonly size: number
  readonly effect: string
}

function textsAt(root: string, at: readonly string[]): readonly string[] {
  return at
    .map((one) => join(root, one))
    .flatMap((one) => (existsSync(one) ? [readFileSync(one, "utf8")] : []))
}

export function fontStrings(documents: readonly string[]): Readonly<Record<string, string>> {
  const found: Record<string, string> = {}
  for (const text of documents) {
    for (const [, name = "", value = ""] of text.matchAll(STRING)) found[name] = value
  }
  return found
}

export function fontsIn(
  documents: readonly string[],
  strings: Readonly<Record<string, string>>
): Readonly<Record<string, GameFont>> {
  const found: Record<string, GameFont> = {}
  for (const text of documents) {
    for (const [, name = "", said = ""] of text.matchAll(FONT)) {
      const resolved = said.replace(PLACEHOLDER, (whole, key: string) => strings[key] ?? whole)
      const [face = "", size = "", effect = ""] = resolved.split("|")
      const worked = Number(size)
      found[name] = { face, size: Number.isFinite(worked) ? worked : 0, effect }
    }
  }
  return found
}

export function gameFonts(root: string): Readonly<Record<string, GameFont>> {
  return fontsIn(textsAt(root, FONTS_AT), fontStrings(textsAt(root, STRINGS_AT)))
}

export function fontsLua(fonts: Readonly<Record<string, GameFont>>): string {
  const written = Object.entries(fonts).map(
    ([name, one]) =>
      `[${luaStringLiteral(name)}] = { face = ${luaStringLiteral(one.face)}, size = ${String(one.size)}, effect = ${luaStringLiteral(one.effect)} }`
  )
  return `__ui_fonts({ ${written.join(", ")} })`
}
