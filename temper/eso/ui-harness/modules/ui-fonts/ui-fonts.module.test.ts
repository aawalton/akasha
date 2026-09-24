import { describe, expect, test } from "bun:test"
import {
  fontStrings,
  fontsIn,
  fontsLua,
} from "akasha/temper/eso/ui-harness/modules/ui-fonts/ui-fonts.module.code.ts"

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
