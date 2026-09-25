import { describe, expect, test } from "bun:test"
import { engineConstantsTable } from "akasha/temper/eso/constant/modules/engine-constants-seeding/engine-constants-seeding.module.code.ts"
import type { UiControl } from "akasha/temper/eso/ui-harness/modules/ui-harness/ui-harness.module.code.ts"
import { shownIn } from "akasha/temper/eso/ui-harness/modules/ui-shown/ui-shown.module.code.ts"

const DRAWN = engineConstantsTable().numbers

const CT_CONTROL = DRAWN.CT_CONTROL ?? 0

const DL_BACKGROUND = DRAWN.DL_BACKGROUND ?? 0

type Part = {
  readonly name: string
  readonly hidden?: boolean
  readonly drawLayer?: number
  readonly drawLevel?: number
  readonly children?: readonly UiControl[]
}

function control(part: Part): UiControl {
  return {
    name: part.name,
    controlType: CT_CONTROL,
    hidden: part.hidden ?? false,
    left: 0,
    top: 0,
    width: 10,
    height: 10,
    alpha: 1,
    drawLayer: part.drawLayer,
    drawLevel: part.drawLevel,
    anchors: [],
    handlers: [],
    children: part.children ?? [],
  }
}

function namesOf(root: UiControl): readonly (string | undefined)[] {
  return shownIn(root).map((one) => one.name)
}

describe("shownIn", () => {
  test("puts a child on a layer below its parent's beneath that parent", () => {
    const button = control({
      name: "Go",
      children: [
        control({ name: "GoFill", drawLayer: DL_BACKGROUND }),
        control({ name: "GoMark" }),
      ],
    })
    expect(namesOf(control({ name: "Screen", children: [button] }))).toEqual([
      "Screen",
      "GoFill",
      "Go",
      "GoMark",
    ])
  })

  test("puts a lower level first within one layer", () => {
    const frame = control({
      name: "Frame",
      children: [
        control({ name: "High", drawLayer: DL_BACKGROUND, drawLevel: 2 }),
        control({ name: "Low", drawLayer: DL_BACKGROUND, drawLevel: 1 }),
      ],
    })
    expect(namesOf(control({ name: "Screen", children: [frame] }))).toEqual([
      "Screen",
      "Low",
      "High",
      "Frame",
    ])
  })

  test("keeps each window's controls together, whatever their layers", () => {
    const second = control({
      name: "Second",
      children: [control({ name: "SecondFill", drawLayer: DL_BACKGROUND })],
    })
    const screen = control({ name: "Screen", children: [control({ name: "First" }), second] })
    expect(namesOf(screen)).toEqual(["Screen", "First", "SecondFill", "Second"])
  })

  test("leaves out a hidden control and everything under it", () => {
    const gone = control({ name: "Gone", hidden: true, children: [control({ name: "Under" })] })
    expect(namesOf(control({ name: "Screen", children: [gone] }))).toEqual(["Screen"])
  })
})
