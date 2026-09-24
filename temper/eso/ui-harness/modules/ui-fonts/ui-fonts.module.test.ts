import { describe, expect, test } from "bun:test"
import {
  faceIn,
  facesLua,
  fontStrings,
  fontsIn,
  fontsLua,
  keptFaces,
} from "akasha/temper/eso/ui-harness/modules/ui-fonts/ui-fonts.module.code.ts"

const PER_EM = 1000

const ASCENDER = 824

const DESCENDER = -376

const MISSING = 250

const ADVANCES: readonly (readonly [string, number])[] = [
  ["P", 556],
  ["r", 333],
  ["o", 500],
  ["b", 500],
]

const TABLES = ["head", "hhea", "hmtx", "cmap"]

const HEAD = 12 + TABLES.length * 16

const HHEA = HEAD + 54

const HMTX = HHEA + 36

const CMAP = HMTX + (ADVANCES.length + 1) * 4

const FOUR = CMAP + 12

const SEGMENTS = ADVANCES.length + 1

const LAST = 0xffff

function segmentAt(view: DataView, one: number, code: number, glyph: number): undefined {
  view.setUint16(FOUR + 14 + one * 2, code)
  view.setUint16(FOUR + 16 + SEGMENTS * 2 + one * 2, code)
  view.setUint16(FOUR + 16 + SEGMENTS * 4 + one * 2, (glyph - code) & LAST)
  return undefined
}

function faceBytes(): Uint8Array {
  const bytes = new Uint8Array(FOUR + 16 + SEGMENTS * 8)
  const view = new DataView(bytes.buffer)
  view.setUint16(4, TABLES.length)
  TABLES.forEach((tag, one) => {
    for (let letter = 0; letter < tag.length; letter += 1) {
      view.setUint8(12 + one * 16 + letter, tag.charCodeAt(letter))
    }
    view.setUint32(12 + one * 16 + 8, [HEAD, HHEA, HMTX, CMAP][one] ?? 0)
  })
  view.setUint16(HEAD + 18, PER_EM)
  view.setInt16(HHEA + 4, ASCENDER)
  view.setInt16(HHEA + 6, DESCENDER)
  view.setUint16(HHEA + 34, ADVANCES.length + 1)
  view.setUint16(HMTX, MISSING)
  view.setUint16(CMAP + 2, 1)
  view.setUint16(CMAP + 4, 3)
  view.setUint16(CMAP + 6, 1)
  view.setUint32(CMAP + 8, FOUR - CMAP)
  view.setUint16(FOUR, 4)
  view.setUint16(FOUR + 6, SEGMENTS * 2)
  ADVANCES.forEach(([character, wide], one) => {
    view.setUint16(HMTX + (one + 1) * 4, wide)
    segmentAt(view, one, character.codePointAt(0) ?? 0, one + 1)
  })
  segmentAt(view, ADVANCES.length, LAST, 0)
  return bytes
}

const STRINGS = `<GuiXml>
    <String name="BOLD_FONT" value="EsoUI/Common/Fonts/Univers67.slug"/>
    <String name="KB_18" value="18"/>
</GuiXml>`

const FONTS = `<GuiXml>
    <Font name="ZoFontWinH4" font="$(BOLD_FONT)|$(KB_18)|soft-shadow-thick"/>
    <Font name="ZoFontOdd" font="$(NOWHERE)|big"/>
</GuiXml>`

describe("fontsIn", () => {
  test("reads a font's face, size and effect with its placeholders filled", () => {
    const fonts = fontsIn([FONTS], fontStrings([STRINGS]))
    expect(fonts.ZoFontWinH4).toEqual({
      face: "EsoUI/Common/Fonts/Univers67.slug",
      size: 18,
      effect: "soft-shadow-thick",
    })
  })

  test("leaves a placeholder no string fills, and reads a size that is no number as zero", () => {
    const fonts = fontsIn([FONTS], fontStrings([STRINGS]))
    expect(fonts.ZoFontOdd).toEqual({ face: "$(NOWHERE)", size: 0, effect: "" })
  })
})

describe("fontsLua", () => {
  test("hands every font over in one call", () => {
    const lua = fontsLua(fontsIn([FONTS], fontStrings([STRINGS])))
    expect(lua.startsWith("__ui_fonts({")).toBe(true)
    expect(lua).toContain(
      '["ZoFontWinH4"] = { face = "EsoUI/Common/Fonts/Univers67.slug", size = 18'
    )
  })
})

describe("faceIn", () => {
  test("reads the advance a face gives each character it maps", () => {
    const face = faceIn(faceBytes())
    const mapped = ADVANCES.map(([character, wide]): readonly [number, number] => [
      character.codePointAt(0) ?? 0,
      wide,
    ])
    expect(face.advances).toEqual(new Map(mapped))
  })

  test("reads a face's units, its missing glyph, and its line from ascender and descender", () => {
    const face = faceIn(faceBytes())
    expect(face.perEm).toBe(PER_EM)
    expect(face.missing).toBe(MISSING)
    expect(face.line).toBe(ASCENDER - DESCENDER)
  })

  test("refuses a face holding no table of advances", () => {
    const bytes = faceBytes()
    new DataView(bytes.buffer).setUint16(4, 0)
    expect(() => faceIn(bytes)).toThrow(/no `hhea` table/)
  })
})

describe("keptFaces", () => {
  test("answers no face where nothing is kept", () => {
    expect(keptFaces("/nowhere/at/all")).toEqual({})
  })
})

describe("facesLua", () => {
  test("hands every face over with the game's font strings and where the faces are kept", () => {
    const face = { perEm: 1000, line: 1200, missing: 500, advances: new Map([[80, 556]]) }
    const lua = facesLua({ univers57: face }, { KB_18: "18" }, "/kept")
    expect(lua).toBe(
      '__ui_faces({ ["univers57"] = { perEm = 1000, line = 1200, missing = 500, advances = { [80] = 556 } } }, { ["KB_18"] = "18" }, "/kept")'
    )
  })
})
