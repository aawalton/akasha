import { describe, expect, test } from "bun:test"
import type { UiControl } from "akasha/temper/eso/ui-harness/modules/ui-harness/ui-harness.module.code.ts"
import { pictureHtml } from "akasha/temper/eso/ui-harness/modules/ui-picture/ui-picture.module.code.ts"

const TOPLEFT = 1
const TOPRIGHT = 4

type Part = {
  readonly name?: string
  readonly controlType?: number
  readonly hidden?: boolean
  readonly width?: number
  readonly height?: number
  readonly text?: string
  readonly font?: string
  readonly texture?: string
  readonly color?: readonly number[]
  readonly centerColor?: readonly number[]
  readonly edgeColor?: readonly number[]
  readonly alpha?: number
  readonly anchors?: UiControl["anchors"]
  readonly children?: readonly UiControl[]
}

function control(part: Part): UiControl {
  return {
    name: part.name,
    controlType: part.controlType ?? 1,
    hidden: part.hidden ?? false,
    width: part.width ?? 0,
    height: part.height ?? 0,
    alpha: part.alpha ?? 1,
    text: part.text,
    font: part.font,
    texture: part.texture,
    color: part.color,
    centerColor: part.centerColor,
    edgeColor: part.edgeColor,
    anchors: part.anchors ?? [],
    handlers: [],
    children: part.children ?? [],
  }
}

function anchor(
  point: number,
  relativeTo: string,
  relativePoint: number,
  offsetX: number,
  offsetY: number
): UiControl["anchors"][number] {
  return { point, relativeTo, relativePoint, offsetX, offsetY }
}

describe("pictureHtml", () => {
  test("puts a control where the layout says", () => {
    const html = pictureHtml(
      control({
        name: "Frame",
        width: 360,
        height: 640,
        children: [
          control({
            name: "FrameTitle",
            controlType: 2,
            height: 30,
            text: "Cross-Character Inventory",
            anchors: [
              anchor(TOPLEFT, "Frame", TOPLEFT, 8, 8),
              anchor(TOPRIGHT, "Frame", TOPRIGHT, -8, 8),
            ],
          }),
        ],
      })
    )
    expect(html).toContain("left:8px;top:8px;width:344px;height:30px;")
    expect(html).toContain("Cross-Character Inventory")
  })

  test("reads a color the game states from nought to one", () => {
    const html = pictureHtml(
      control({
        name: "FrameBG",
        controlType: 8,
        width: 10,
        height: 10,
        centerColor: [0, 0, 0, 0.85],
      })
    )
    expect(html).toContain("background:rgba(0, 0, 0, 0.85)")
  })

  test("reads a font's size and weight off the name given", () => {
    const html = pictureHtml(
      control({
        name: "FrameTitle",
        controlType: 2,
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
            children: [control({ name: "FrameUnder", controlType: 2, text: "buried" })],
          }),
          control({ name: "FrameHere", controlType: 2, text: "shown" }),
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
        controlType: 3,
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
        controlType: 3,
        width: 40,
        height: 40,
        texture: "EsoUI/Art/Icons/icon.dds",
      }),
      { textureAt: () => "icon.png" }
    )
    expect(html).toContain('<img class="c"')
    expect(html).toContain('src="icon.png"')
  })

  test("escapes text the game would show", () => {
    const html = pictureHtml(
      control({ name: "FrameText", controlType: 2, width: 10, height: 10, text: "<b>&</b>" })
    )
    expect(html).toContain("&lt;b&gt;&amp;&lt;/b&gt;")
  })
})
