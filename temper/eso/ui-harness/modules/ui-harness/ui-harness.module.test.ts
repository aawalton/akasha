import { afterAll, beforeAll, describe, expect, test } from "bun:test"
import {
  openUiHarness,
  type UiControl,
  type UiHarness,
} from "akasha/temper/eso/ui-harness/modules/ui-harness/ui-harness.module.code.ts"
import {
  ADVANCES,
  GAME_SIZE,
  LINE,
  openProbed,
  PER_EM,
  SIZE,
} from "akasha/temper/eso/ui-harness/modules/ui-harness/ui-harness.module.test-fixtures.ts"

const PROBE = 2389

const SPACE = 250

const DOTS = 3 * SPACE

const AVA_SHAPED = 1791

function childNamed(control: UiControl, name: string): UiControl | undefined {
  return control.children.find((child) => child.name === name)
}

describe("ui-harness", () => {
  let harness: UiHarness

  beforeAll(async () => {
    harness = await openProbed()
  })

  afterAll(async () => {
    await harness.close()
  })

  test("a window the addon made is under the screen with its children", async () => {
    const window = await harness.snapshot("TemperProbeWindow")
    expect(window?.name).toBe("TemperProbeWindow")
    expect(window?.width).toBe(400)
    expect(window?.height).toBe(300)
    expect(window?.children.map((child) => child.name)).toEqual([
      "TemperProbeWindowTitle",
      "TemperProbeWindowClose",
    ])
  })

  test("a label carries the text and the font it was given", async () => {
    const window = await harness.snapshot("TemperProbeWindow")
    const title = window === null ? undefined : childNamed(window, "TemperProbeWindowTitle")
    expect(title?.text).toBe("Probe")
    expect(title?.font).toBe("EsoUI/Common/Fonts/Univers67.slug|22|soft-shadow-thick")
  })

  test("a label is as wide as its face's advances and as tall as its lines, at its size", async () => {
    const window = await harness.snapshot("TemperProbeMeasuring")
    const label = window === null ? undefined : childNamed(window, "TemperProbeMeasuringLabel")
    const advanced = ADVANCES.reduce((all, [, wide]) => all + wide, 0)
    expect(label?.width).toBeCloseTo((advanced * SIZE) / PER_EM)
    expect(label?.height).toBeCloseTo((2 * LINE * SIZE) / PER_EM)
  })

  test("a label is measured with the kerning its face gives each pair, as HarfBuzz shapes it", async () => {
    const window = await harness.snapshot("TemperProbeMeasuring")
    const kerned = window === null ? undefined : childNamed(window, "TemperProbeMeasuringKerned")
    expect(kerned?.width).toBeCloseTo((AVA_SHAPED * SIZE) / PER_EM)
  })

  test("a label's text wraps at the last space that fits, and its height grows by its lines", async () => {
    const two = await harness.snapshot("TemperWrappedTwo")
    expect(two?.width).toBe(101)
    expect(two?.height).toBeCloseTo((2 * LINE * SIZE) / PER_EM)
  })

  test("a word wider than its label breaks at the last character that fits", async () => {
    const word = await harness.snapshot("TemperWrappedWord")
    expect(word?.height).toBeCloseTo((2 * LINE * SIZE) / PER_EM)
  })

  test("a label two anchors give a width wraps at that width", async () => {
    const spanning = await harness.snapshot("TemperWrappedSpanning")
    expect(spanning?.width).toBe(101)
    expect(spanning?.height).toBeCloseTo((2 * LINE * SIZE) / PER_EM)
  })

  test("a label's lines stop at its greatest line count, the rest cut off", async () => {
    const capped = await harness.snapshot("TemperWrappedCapped")
    expect(capped?.height).toBeCloseTo((LINE * SIZE) / PER_EM)
    const wide = await harness.load("return TemperWrappedCapped:GetTextWidth()")
    expect(wide).toBeCloseTo(((2 * PROBE + SPACE) * SIZE) / PER_EM)
  })

  test("a label wrapping with an ellipsis ends its last line in one that fits", async () => {
    const wide = await harness.load("return TemperWrappedCut:GetTextWidth()")
    const shown = PROBE + SPACE + (PROBE - 2 * 500) + DOTS
    expect(wide).toBeCloseTo((shown * SIZE) / PER_EM)
  })

  test("a label its document gives a wrap mode and a greatest line count wraps as one given them in Lua", async () => {
    const declared = await harness.snapshot("TemperWrappedDeclared")
    expect(declared?.height).toBeCloseTo((LINE * SIZE) / PER_EM)
    const wide = await harness.load("return TemperWrappedDeclared:GetTextWidth()")
    const lua = await harness.load("return TemperWrappedCut:GetTextWidth()")
    expect(wide).toBeCloseTo(Number(lua))
  })

  test("a tooltip's lines sit inside the padding its template gives, and the padding adds to its height", async () => {
    const tip = await harness.snapshot("TemperTip")
    const line = tip?.children[0]
    expect(line?.left).toBe(12)
    expect(line?.top).toBe(15)
    expect(line?.width).toBe(176)
    expect(tip?.height).toBeCloseTo((LINE * GAME_SIZE) / PER_EM + 30)
  })

  test("a tooltip given no width is its widest line and its padding across", async () => {
    const tip = await harness.snapshot("TemperTipGrown")
    const widest = ((2 * PROBE + SPACE) * GAME_SIZE) / PER_EM
    expect(tip?.width).toBeCloseTo(widest + 25)
    expect(tip?.children[0]?.left).toBeCloseTo(12.5)
    expect(tip?.children[0]?.width).toBeCloseTo(widest)
    expect(tip?.children[1]?.width).toBeCloseTo(widest)
  })

  test("a tooltip whose lines run past its template's greatest width is held to it, and its lines wrap", async () => {
    const tip = await harness.snapshot("TemperTipHeld")
    const line = tip?.children[0]
    expect(tip?.width).toBe(350)
    expect(line?.width).toBe(325)
    expect(line?.height).toBeGreaterThan((LINE * GAME_SIZE) / PER_EM)
  })

  test("a tooltip held narrower than its padding leaves its lines no width rather than less", async () => {
    const tip = await harness.snapshot("TemperTipPinched")
    expect(tip?.width).toBe(10)
    expect(tip?.children[0]?.width).toBe(0)
  })

  test("a label naming no font is measured as the game's own ZoFontGame", async () => {
    const window = await harness.snapshot("TemperProbeMeasuring")
    const bare = window === null ? undefined : childNamed(window, "TemperProbeMeasuringBare")
    const advanced = ADVANCES.reduce((all, [, wide]) => all + wide, 0)
    expect(bare?.width).toBeCloseTo((advanced * GAME_SIZE) / PER_EM)
  })

  test("a label whose font names no face kept refuses to be measured", async () => {
    await expect(harness.snapshot("TemperProbeUnkept")).rejects.toThrow(
      /TemperProbeUnkeptLabel.*ZoFontNowhere/
    )
  })

  test("an anchor says what it was anchored to", async () => {
    const window = await harness.snapshot("TemperProbeWindow")
    const title = window === null ? undefined : childNamed(window, "TemperProbeWindowTitle")
    expect(title?.anchors[0]?.relativeTo).toBe("TemperProbeWindow")
    expect(title?.anchors[0]?.offsetY).toBe(12)
  })

  test("a control made from a virtual remembers which virtual", async () => {
    const window = await harness.snapshot("TemperProbeWindow")
    const close = window === null ? undefined : childNamed(window, "TemperProbeWindowClose")
    expect(close?.virtual).toBe("ZO_CloseButton")
  })

  test("every control the addon named is listed", async () => {
    const names = await harness.names()
    expect(names).toContain("TemperProbeWindow")
    expect(names).toContain("TemperProbeWindowClose")
  })

  test("a handler runs when the caller names the control and the event", async () => {
    expect(await harness.fire("TemperProbeWindow", "OnShow")).toBe(true)
    const window = await harness.snapshot("TemperProbeWindow")
    expect(window?.hidden).toBe(false)
    expect(await harness.fire("TemperProbeWindowClose", "OnClicked")).toBe(true)
    const closed = await harness.snapshot("TemperProbeWindow")
    expect(closed?.hidden).toBe(true)
  })

  test("an event the control has no handler for answers false", async () => {
    expect(await harness.fire("TemperProbeWindow", "OnMouseUp")).toBe(false)
  })

  test("a size past a control's greatest is held to it, and a zero holds nothing", async () => {
    const capped = await harness.snapshot("TemperHeldCapped")
    expect(capped?.width).toBe(200)
    expect(capped?.height).toBe(20)
  })

  test("a size under a control's least is raised to it", async () => {
    const floored = await harness.snapshot("TemperHeldFloored")
    expect(floored?.width).toBe(50)
    expect(floored?.height).toBe(40)
  })

  test("a size two anchors leave is held, and the control keeps its first anchor", async () => {
    const spanned = await harness.snapshot("TemperHeldSpanned")
    expect(spanned?.width).toBe(100)
    expect(spanned?.height).toBe(50)
    expect(spanned?.left).toBe(10)
    expect(spanned?.top).toBe(10)
  })

  test("a control held to a size is placed by that size", async () => {
    const centered = await harness.snapshot("TemperHeldCentered")
    expect(centered?.width).toBe(100)
    expect(centered?.left).toBe(150)
    expect(centered?.top).toBe(100)
  })

  test("a size a label takes from its text is held too", async () => {
    const worded = await harness.snapshot("TemperHeldWorded")
    expect(worded?.width).toBe(60)
    expect(worded?.height).toBe(500)
  })

  test("a control named nothing is answered with nothing", async () => {
    expect(await harness.snapshot("NoSuchControl")).toBeNull()
  })

  test("a second control taking a name already held fails the load", async () => {
    const twin = await openUiHarness()
    try {
      await twin.load(`WINDOW_MANAGER:CreateTopLevelWindow("TemperTwin")`)
      await expect(twin.load(`WINDOW_MANAGER:CreateTopLevelWindow("TemperTwin")`)).rejects.toThrow(
        /named TemperTwin already/
      )
    } finally {
      await twin.close()
    }
  })
})
