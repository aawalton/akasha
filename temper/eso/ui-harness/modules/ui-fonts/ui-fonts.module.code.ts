import { existsSync, readdirSync, readFileSync } from "node:fs"
import { join } from "node:path"
import { firstCapture } from "akasha/code/type/narrowing/modules/first-capture/first-capture.module.code.ts"
import { luaStringLiteral } from "akasha/temper/eso/lua-runner/modules/lua-marshal/lua-marshal.module.code.ts"

const STRINGS_AT: readonly string[] = ["fontstrings/western/defaultfontstrings_western.xml"]

const FONTS_AT: readonly string[] = [
  "fontdefs/keyboard/defaultfontdefs_keyboard.xml",
  "fontdefs/gamepad/defaultfontdefs_gamepad.xml",
]

const STRING = /<String\s+name="([^"]+)"\s+value="([^"]*)"/g

const FONT = /<Font\s+name="([^"]+)"\s+font="([^"]*)"/g

const PLACEHOLDER = /\$\(([A-Za-z0-9_]+)\)/g

const FONT_NAMED = /\$\(([A-Z_0-9]+)\)/

const FONT_FILE = /([^/\\]+)\.(?:slug|otf|ttf)$/i

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

export function faceKey(face: string): string {
  const named = firstCapture(FONT_NAMED.exec(face))
  if (named !== null) return named
  return firstCapture(FONT_FILE.exec(face))?.toLowerCase() ?? ""
}

export function gameFontStrings(root: string): Readonly<Record<string, string>> {
  return fontStrings(textsAt(root, STRINGS_AT))
}

export function gameFonts(root: string): Readonly<Record<string, GameFont>> {
  return fontsIn(textsAt(root, FONTS_AT), gameFontStrings(root))
}

export function fontsLua(fonts: Readonly<Record<string, GameFont>>): string {
  const written = Object.entries(fonts).map(
    ([name, one]) =>
      `[${luaStringLiteral(name)}] = { face = ${luaStringLiteral(one.face)}, size = ${String(one.size)}, effect = ${luaStringLiteral(one.effect)} }`
  )
  return `__ui_fonts({ ${written.join(", ")} })`
}

export const FACES_UNDER = "fonts"

const FACE_KEPT = /([^/\\]+)\.(?:otf|ttf)$/i

const SHORT = 2

const TABLE_COUNT_AT = 4

const TABLES_FROM = 12

const TABLE_RECORD = 16

const TABLE_OFFSET_AT = 8

const TAG_LENGTH = 4

const PER_EM_AT = 18

const ASCENDER_AT = 4

const DESCENDER_AT = 6

const LINE_GAP_AT = 8

const METERED_AT = 34

const METRIC = 4

const MAPS_AT = 2

const MAPS_FROM = 4

const MAP_RECORD = 8

const MAP_OFFSET_AT = 4

const MAPPING_PLATFORMS: readonly number[] = [0, 3]

const SEGMENTS_AT = 6

const ENDS_FROM = 14

const NO_CHARACTER = 0xffff

const GROUPS_AT = 12

const GROUPS_FROM = 16

const GROUP = 12

const GROUP_END_AT = 4

const GROUP_GLYPH_AT = 8

const SEGMENTED = 4

const GROUPED = 12

export type Face = {
  readonly perEm: number
  readonly line: number
  readonly missing: number
  readonly advances: ReadonlyMap<number, number>
}

function tablesIn(view: DataView): ReadonlyMap<string, number> {
  const found = new Map<string, number>()
  for (let one = 0; one < view.getUint16(TABLE_COUNT_AT); one += 1) {
    const record = TABLES_FROM + one * TABLE_RECORD
    const tag = Array.from({ length: TAG_LENGTH }, (_, letter) =>
      String.fromCharCode(view.getUint8(record + letter))
    ).join("")
    found.set(tag, view.getUint32(record + TABLE_OFFSET_AT))
  }
  return found
}

function tableAt(tables: ReadonlyMap<string, number>, tag: string): number {
  const at = tables.get(tag)
  if (at === undefined)
    throw new Error(`this face holds no \`${tag}\` table, so its widths are unknown`)
  return at
}

function segmentedInto(view: DataView, at: number, into: Map<number, number>): undefined {
  const span = view.getUint16(at + SEGMENTS_AT)
  const ends = at + ENDS_FROM
  const starts = ends + span + SHORT
  const deltas = starts + span
  const ranges = deltas + span
  for (let segment = 0; segment < span; segment += SHORT) {
    const start = view.getUint16(starts + segment)
    const delta = view.getUint16(deltas + segment)
    const range = view.getUint16(ranges + segment)
    const end = view.getUint16(ends + segment)
    for (let code = start; code <= end && code !== NO_CHARACTER; code += 1) {
      const held =
        range === 0 ? code : view.getUint16(ranges + segment + range + SHORT * (code - start))
      const glyph = range !== 0 && held === 0 ? 0 : (held + delta) & NO_CHARACTER
      if (glyph !== 0) into.set(code, glyph)
    }
  }
}

function groupedInto(view: DataView, at: number, into: Map<number, number>): undefined {
  for (let group = 0; group < view.getUint32(at + GROUPS_AT); group += 1) {
    const one = at + GROUPS_FROM + group * GROUP
    const start = view.getUint32(one)
    const first = view.getUint32(one + GROUP_GLYPH_AT)
    for (let code = start; code <= view.getUint32(one + GROUP_END_AT); code += 1) {
      into.set(code, first + code - start)
    }
  }
}

function glyphsIn(view: DataView, cmap: number): ReadonlyMap<number, number> {
  const formats = new Map<number, number>()
  for (let one = 0; one < view.getUint16(cmap + MAPS_AT); one += 1) {
    const record = cmap + MAPS_FROM + one * MAP_RECORD
    const at = cmap + view.getUint32(record + MAP_OFFSET_AT)
    if (MAPPING_PLATFORMS.includes(view.getUint16(record))) formats.set(view.getUint16(at), at)
  }
  const found = new Map<number, number>()
  const grouped = formats.get(GROUPED)
  const segmented = formats.get(SEGMENTED)
  if (grouped !== undefined) groupedInto(view, grouped, found)
  else if (segmented !== undefined) segmentedInto(view, segmented, found)
  else throw new Error("this face maps no character in a form read here, so its widths are unknown")
  return found
}

export function faceIn(bytes: Uint8Array): Face {
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength)
  const tables = tablesIn(view)
  const hhea = tableAt(tables, "hhea")
  const hmtx = tableAt(tables, "hmtx")
  const metered = view.getUint16(hhea + METERED_AT)
  const advanceOf = (glyph: number): number =>
    view.getUint16(hmtx + METRIC * Math.min(glyph, metered - 1))
  const advances = new Map<number, number>()
  for (const [code, glyph] of glyphsIn(view, tableAt(tables, "cmap"))) {
    advances.set(code, advanceOf(glyph))
  }
  return {
    perEm: view.getUint16(tableAt(tables, "head") + PER_EM_AT),
    line:
      view.getInt16(hhea + ASCENDER_AT) -
      view.getInt16(hhea + DESCENDER_AT) +
      view.getInt16(hhea + LINE_GAP_AT),
    missing: advanceOf(0),
    advances,
  }
}

export function keptFaces(dir: string): Readonly<Record<string, Face>> {
  if (!existsSync(dir)) return {}
  const found: Record<string, Face> = {}
  for (const name of readdirSync(dir, { recursive: true, encoding: "utf8" })) {
    const key = firstCapture(FACE_KEPT.exec(name))
    if (key !== null) found[key.toLowerCase()] = faceIn(readFileSync(join(dir, name)))
  }
  return found
}

function faceLua(face: Face): string {
  const advances = [...face.advances].map(([code, wide]) => `[${code}] = ${wide}`).join(", ")
  return `{ perEm = ${face.perEm}, line = ${face.line}, missing = ${face.missing}, advances = { ${advances} } }`
}

export function facesLua(
  faces: Readonly<Record<string, Face>>,
  strings: Readonly<Record<string, string>>,
  at: string
): string {
  const held = Object.entries(faces).map(
    ([key, face]) => `[${luaStringLiteral(key)}] = ${faceLua(face)}`
  )
  const spelled = Object.entries(strings).map(
    ([name, value]) => `[${luaStringLiteral(name)}] = ${luaStringLiteral(value)}`
  )
  return `__ui_faces({ ${held.join(", ")} }, { ${spelled.join(", ")} }, ${luaStringLiteral(at)})`
}
