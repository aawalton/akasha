import { describe, expect, test } from "bun:test"
import type { UiControl } from "akasha/temper/eso/ui-harness/modules/ui-harness/ui-harness.module.code.ts"
import { layOut } from "akasha/temper/eso/ui-harness/modules/ui-layout/ui-layout.module.code.ts"

const TOPLEFT = 1
const TOPRIGHT = 4
const CENTER = 16
const BOTTOMRIGHT = 256

type Part = {
  readonly name?: string
  readonly width?: number
  readonly height?: number
  readonly anchors?: UiControl["anchors"]
  readonly children?: readonly UiControl[]
}

function control(part: Part): UiControl {
  return {
    name: part.name,
    controlType: 1,
    hidden: false,
    width: part.width ?? 0,
    height: part.height ?? 0,
    alpha: 1,
    anchors: part.anchors ?? [],
    handlers: [],
    children: part.children ?? [],
  }
}

function anchor(
  point: number,
  relativeTo: string | undefined,
  relativePoint: number,
  offsetX: number,
  offsetY: number
): UiControl["anchors"][number] {
  return { point, relativeTo, relativePoint, offsetX, offsetY }
}

describe("layOut", () => {
  test("gives the root the screen where the root states no size", () => {
    const [root] = layOut(control({ name: "Frame" }))
    expect(root?.rect).toEqual({ left: 0, top: 0, width: 1920, height: 1080 })
  })

  test("keeps the size the root states", () => {
    const [root] = layOut(control({ name: "Frame", width: 360, height: 640 }))
    expect(root?.rect).toEqual({ left: 0, top: 0, width: 360, height: 640 })
  })

  test("fills a parent where two anchors take opposite corners", () => {
    const boxes = layOut(
      control({
        name: "Frame",
        width: 360,
        height: 640,
        children: [
          control({
            name: "FrameBG",
            anchors: [
              anchor(TOPLEFT, "Frame", TOPLEFT, 0, 0),
              anchor(BOTTOMRIGHT, "Frame", BOTTOMRIGHT, 0, 0),
            ],
          }),
        ],
      })
    )
    expect(boxes[1]?.rect).toEqual({ left: 0, top: 0, width: 360, height: 640 })
  })

  test("spans the width and keeps the height a control states", () => {
    const boxes = layOut(
      control({
        name: "Frame",
        width: 360,
        height: 640,
        children: [
          control({
            name: "FrameTitle",
            height: 30,
            anchors: [
              anchor(TOPLEFT, "Frame", TOPLEFT, 8, 8),
              anchor(TOPRIGHT, "Frame", TOPRIGHT, -8, 8),
            ],
          }),
        ],
      })
    )
    expect(boxes[1]?.rect).toEqual({ left: 8, top: 8, width: 344, height: 30 })
  })

  test("centres a control anchored middle to middle", () => {
    const boxes = layOut(
      control({
        name: "Frame",
        width: 400,
        height: 400,
        children: [
          control({
            name: "FrameDot",
            width: 100,
            height: 50,
            anchors: [anchor(CENTER, "Frame", CENTER, 0, 0)],
          }),
        ],
      })
    )
    expect(boxes[1]?.rect).toEqual({ left: 150, top: 175, width: 100, height: 50 })
  })

  test("sits at the top left of the parent where a control has no anchor", () => {
    const boxes = layOut(
      control({
        name: "Frame",
        width: 400,
        height: 400,
        children: [control({ name: "FrameLoose", width: 20, height: 10 })],
      })
    )
    expect(boxes[1]?.rect).toEqual({ left: 0, top: 0, width: 20, height: 10 })
  })

  test("answers an anchor naming a control outside the snapshot with the screen", () => {
    const boxes = layOut(
      control({
        name: "Frame",
        width: 200,
        height: 100,
        anchors: [anchor(CENTER, "GuiRoot", CENTER, 0, 0)],
      })
    )
    expect(boxes[0]?.rect).toEqual({ left: 0, top: 0, width: 200, height: 100 })
  })

  test("takes an anchor to a sibling settled later", () => {
    const boxes = layOut(
      control({
        name: "Frame",
        width: 400,
        height: 400,
        children: [
          control({
            name: "FrameSecond",
            width: 50,
            height: 50,
            anchors: [anchor(TOPLEFT, "FrameFirst", TOPRIGHT, 0, 0)],
          }),
          control({
            name: "FrameFirst",
            width: 30,
            height: 20,
            anchors: [anchor(TOPLEFT, "Frame", TOPLEFT, 10, 10)],
          }),
        ],
      })
    )
    expect(boxes[1]?.rect).toEqual({ left: 40, top: 10, width: 50, height: 50 })
  })

  test("hands back the controls in the order the game paints them", () => {
    const boxes = layOut(
      control({
        name: "Frame",
        children: [
          control({ name: "FrameOne", children: [control({ name: "FrameOneDeep" })] }),
          control({ name: "FrameTwo" }),
        ],
      })
    )
    expect(boxes.map((one) => one.control.name)).toEqual([
      "Frame",
      "FrameOne",
      "FrameOneDeep",
      "FrameTwo",
    ])
    expect(boxes.map((one) => one.depth)).toEqual([0, 1, 2, 1])
  })
})
