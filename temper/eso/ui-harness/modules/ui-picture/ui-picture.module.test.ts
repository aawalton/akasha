import { describe, expect, test } from "bun:test"
import { engineConstantsTable } from "akasha/temper/eso/constant/modules/engine-constants-seeding/engine-constants-seeding.module.code.ts"
import type { UiControl } from "akasha/temper/eso/ui-harness/modules/ui-harness/ui-harness.module.code.ts"
import { pictureHtml } from "akasha/temper/eso/ui-harness/modules/ui-picture/ui-picture.module.code.ts"

const DRAWN = engineConstantsTable().numbers

const CT_CONTROL = DRAWN.CT_CONTROL ?? 0

const CT_LABEL = DRAWN.CT_LABEL ?? 1

const CT_TEXTURE = DRAWN.CT_TEXTURE ?? 3

const CT_BACKDROP = DRAWN.CT_BACKDROP ?? 14

const CT_BUTTON = DRAWN.CT_BUTTON ?? 2

type Part = {
  readonly name?: string
  readonly controlType?: number
  readonly hidden?: boolean
  readonly left?: number
  readonly top?: number
  readonly width?: number
  readonly height?: number
  readonly text?: string
  readonly font?: string
  readonly texture?: string
  readonly color?: readonly number[]
  readonly centerColor?: readonly number[]
  readonly edgeColor?: readonly number[]
  readonly edgeTexture?: string
  readonly edgeSize?: number
  readonly centerTexture?: string
  readonly textureCoords?: readonly number[]
  readonly normalTexture?: string
  readonly insets?: readonly number[]
  readonly alpha?: number
  readonly children?: readonly UiControl[]
}

function control(part: Part): UiControl {
  return {
    name: part.name,
    controlType: part.controlType ?? CT_CONTROL,
    hidden: part.hidden ?? false,
    left: part.left ?? 0,
    top: part.top ?? 0,
    width: part.width ?? 0,
    height: part.height ?? 0,
    alpha: part.alpha ?? 1,
    text: part.text,
    font: part.font,
    texture: part.texture,
    color: part.color,
    centerColor: part.centerColor,
    edgeColor: part.edgeColor,
    edgeTexture: part.edgeTexture,
    edgeSize: part.edgeSize,
    centerTexture: part.centerTexture,
    textureCoords: part.textureCoords,
    normalTexture: part.normalTexture,
    insets: part.insets,
    anchors: [],
    handlers: [],
    children: part.children ?? [],
  }
}

describe("pictureHtml", () => {
  test("puts a control where the snapshot says", () => {
    const html = pictureHtml(
      control({
        name: "Frame",
        width: 360,
        height: 640,
        children: [
          control({
            name: "FrameTitle",
            controlType: CT_LABEL,
            left: 8,
            top: 8,
            width: 344,
            height: 30,
            text: "Cross-Character Inventory",
          }),
        ],
      })
    )
    expect(html).toContain("left:8px;top:8px;width:344px;height:30px;")
    expect(html).toContain("Cross-Character Inventory")
  })

  test("moves everything by the origin a caller names", () => {
    const html = pictureHtml(
      control({ name: "Frame", left: 780, top: 220, width: 360, height: 640 }),
      { origin: { left: 780, top: 220 } }
    )
    expect(html).toContain("left:0px;top:0px;width:360px;height:640px;")
  })

  test("reads a color the game states from nought to one", () => {
    const html = pictureHtml(
      control({
        name: "FrameBG",
        controlType: CT_BACKDROP,
        width: 10,
        height: 10,
        centerColor: [0, 0, 0, 0.85],
      })
    )
    expect(html).toContain("background:rgba(0, 0, 0, 0.85)")
  })

  test("draws no edge where the backdrop was given no edge texture", () => {
    const html = pictureHtml(
      control({
        name: "FrameBG",
        controlType: CT_BACKDROP,
        width: 10,
        height: 10,
        centerColor: [0, 0, 0, 1],
        edgeColor: [1, 1, 1, 0.1],
      })
    )
    expect(html).not.toContain("box-shadow")
  })

  test("edges a backdrop given an edge texture, tinted by its edge color", () => {
    const html = pictureHtml(
      control({
        name: "FrameBG",
        controlType: CT_BACKDROP,
        width: 10,
        height: 10,
        centerColor: [0, 0, 0, 1],
        edgeColor: [1, 1, 1, 0.1],
        edgeTexture: "EsoUI/Art/Tooltips/UI-Border.dds",
      })
    )
    expect(html).toContain("box-shadow:inset 0 0 0 1px rgba(255, 255, 255, 0.1)")
  })

  test("draws an edge texture with no edge color untinted", () => {
    const html = pictureHtml(
      control({
        name: "FrameBG",
        controlType: CT_BACKDROP,
        width: 10,
        height: 10,
        edgeTexture: "EsoUI/Art/Tooltips/UI-Border.dds",
      })
    )
    expect(html).toContain("box-shadow:inset 0 0 0 1px rgba(255, 255, 255, 1)")
  })

  test("reads a font's size and weight off the name given", () => {
    const html = pictureHtml(
      control({
        name: "FrameTitle",
        controlType: CT_LABEL,
        width: 10,
        height: 10,
        text: "Temper",
        font: "$(BOLD_FONT)|18|shadow",
      })
    )
    expect(html).toContain("font-weight:700")
    expect(html).toContain("font-size:18px")
    expect(html).toContain("text-shadow:1px 1px 0 rgba(0, 0, 0, 0.95)")
  })

  test("leaves out a hidden control and everything under it", () => {
    const html = pictureHtml(
      control({
        name: "Frame",
        width: 100,
        height: 100,
        children: [
          control({
            name: "FrameGone",
            hidden: true,
            children: [control({ name: "FrameUnder", controlType: CT_LABEL, text: "buried" })],
          }),
          control({ name: "FrameHere", controlType: CT_LABEL, text: "shown" }),
        ],
      })
    )
    expect(html).toContain("shown")
    expect(html).not.toContain("buried")
    expect(html).not.toContain("FrameGone")
  })

  test("pictures the control a caller names even where that control is hidden", () => {
    const html = pictureHtml(control({ name: "Frame", hidden: true, width: 10, height: 10 }))
    expect(html).toContain("Frame")
  })

  test("names a texture with no file behind it", () => {
    const html = pictureHtml(
      control({
        name: "FrameIcon",
        controlType: CT_TEXTURE,
        width: 40,
        height: 40,
        texture: "EsoUI/Art/Icons/icon.dds",
      })
    )
    expect(html).not.toContain("<img")
    expect(html).toContain("FrameIcon")
  })

  test("takes the file a caller says is behind a texture", () => {
    const html = pictureHtml(
      control({
        name: "FrameIcon",
        controlType: CT_TEXTURE,
        width: 40,
        height: 40,
        texture: "EsoUI/Art/Icons/icon.dds",
      }),
      { textureAt: () => "icon.png" }
    )
    expect(html).toContain('<canvas class="c" title="FrameIcon" width="40" height="40"')
    expect(html).toContain('data-src="icon.png"')
  })

  test("carries the part of its file a texture shows, and its tint", () => {
    const html = pictureHtml(
      control({
        controlType: CT_TEXTURE,
        width: 40,
        height: 40,
        texture: "EsoUI/Art/Icons/icon.dds",
        textureCoords: [0, 0.5, 0.25, 1],
        color: [1, 0.5, 0, 1],
      }),
      { textureAt: () => "icon.png" }
    )
    expect(html).toContain('data-coords="0,0.5,0.25,1"')
    expect(html).toContain('data-tint="1,0.5,0,1"')
  })

  test("carries a backdrop's edge and center art where a caller says which files are behind them", () => {
    const html = pictureHtml(
      control({
        controlType: CT_BACKDROP,
        width: 100,
        height: 50,
        edgeTexture: "EsoUI/Art/Tooltips/UI-Border.dds",
        edgeSize: 16,
        centerTexture: "EsoUI/Art/Tooltips/UI-TooltipCenter.dds",
        insets: [16, 16, -16, -16],
      }),
      { textureAt: (named) => (named.includes("Border") ? "edge.png" : "center.png") }
    )
    expect(html).toContain('data-art="backdrop"')
    expect(html).toContain('data-edge="edge.png"')
    expect(html).toContain('data-center="center.png"')
    expect(html).toContain('data-size="16"')
    expect(html).toContain('data-insets="16,16,-16,-16"')
    expect(html).not.toContain("box-shadow")
  })

  test("sets a button's own art behind its text, and frames it no more", () => {
    const html = pictureHtml(
      control({
        controlType: CT_BUTTON,
        width: 100,
        height: 30,
        text: "Go",
        normalTexture: "EsoUI/Art/Buttons/up.dds",
      }),
      { textureAt: () => "up.png" }
    )
    expect(html).toContain('data-src="up.png"')
    expect(html).toContain(">Go</div>")
    expect(html).not.toContain("box-shadow")
  })

  test("draws text the markup colors in that color, back to the label's own after", () => {
    const html = pictureHtml(
      control({ controlType: CT_LABEL, width: 10, height: 10, text: "a |cFF8000gold|r b" })
    )
    expect(html).toContain('a <span style="color:#FF8000">gold</span> b')
  })

  test("closes a color the markup never closes", () => {
    const html = pictureHtml(
      control({ controlType: CT_LABEL, width: 10, height: 10, text: "|c00FF00on" })
    )
    expect(html).toContain('<span style="color:#00FF00">on</span>')
  })

  test("leaves out an icon with no file behind it", () => {
    const html = pictureHtml(
      control({ controlType: CT_LABEL, width: 10, height: 10, text: "x|t32:32:EsoUI/Art/a.dds|ty" })
    )
    expect(html).toContain(">xy</div>")
  })

  test("draws an icon the markup names where a caller says which file is behind it", () => {
    const html = pictureHtml(
      control({
        controlType: CT_LABEL,
        width: 10,
        height: 10,
        text: "|t100%:100%:EsoUI/Art/a.dds|t",
      }),
      { textureAt: () => "a.png" }
    )
    expect(html).toContain('<img style="width:1em;height:1em;vertical-align:middle" src="a.png">')
  })

  test("escapes text the game would show", () => {
    const html = pictureHtml(
      control({ name: "FrameText", controlType: CT_LABEL, width: 10, height: 10, text: "<b>&</b>" })
    )
    expect(html).toContain("&lt;b&gt;&amp;&lt;/b&gt;")
  })
})
