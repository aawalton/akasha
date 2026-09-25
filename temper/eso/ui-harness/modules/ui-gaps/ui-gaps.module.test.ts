import { describe, expect, test } from "bun:test"
import { offStepGaps } from "akasha/temper/eso/ui-harness/modules/ui-gaps/ui-gaps.module.code.ts"
import type { UiControl } from "akasha/temper/eso/ui-harness/modules/ui-harness/ui-harness.module.code.ts"

type Part = {
  readonly name?: string
  readonly at: readonly [number, number, number, number]
  readonly hidden?: boolean
  readonly alpha?: number
  readonly virtual?: string
  readonly children?: readonly UiControl[]
}

function control(part: Part): UiControl {
  const [left, top, width, height] = part.at
  return {
    ...(part.name === undefined ? {} : { name: part.name }),
    ...(part.virtual === undefined ? {} : { virtual: part.virtual }),
    controlType: 0,
    hidden: part.hidden ?? false,
    left,
    top,
    width,
    height,
    alpha: part.alpha ?? 1,
    anchors: [],
    handlers: [],
    children: part.children ?? [],
  }
}

function window(...children: readonly UiControl[]): UiControl {
  return control({ name: "Window", at: [0, 0, 800, 600], children })
}

describe("offStepGaps", () => {
  test("passes controls parted by a step across and down", () => {
    const tree = window(
      control({ name: "A", at: [0, 0, 100, 25] }),
      control({ name: "B", at: [108, 0, 100, 25] }),
      control({ name: "C", at: [0, 41, 100, 25] })
    )
    expect(offStepGaps(tree)).toEqual([])
  })

  test("refuses a gap across that is no step", () => {
    const tree = window(
      control({ name: "A", at: [0, 0, 100, 25] }),
      control({ name: "B", at: [110, 0, 100, 25] })
    )
    expect(offStepGaps(tree)).toEqual([{ direction: "across", gap: 10, from: "A", to: "B" }])
  })

  test("refuses a gap down that is no step", () => {
    const tree = window(
      control({ name: "A", at: [0, 0, 100, 25] }),
      control({ name: "B", at: [0, 30, 100, 25] })
    )
    expect(offStepGaps(tree)).toEqual([{ direction: "down", gap: 5, from: "A", to: "B" }])
  })

  test("measures only to the nearest control", () => {
    const tree = window(
      control({ name: "A", at: [0, 0, 100, 25] }),
      control({ name: "B", at: [104, 0, 100, 25] }),
      control({ name: "C", at: [214, 0, 100, 25] })
    )
    expect(offStepGaps(tree)).toEqual([{ direction: "across", gap: 10, from: "B", to: "C" }])
  })

  test("parts no controls that touch, overlap, or are a column apart", () => {
    const tree = window(
      control({ name: "A", at: [0, 0, 100, 25] }),
      control({ name: "B", at: [90, 0, 100, 25] }),
      control({ name: "C", at: [190, 0, 100, 25] }),
      control({ name: "D", at: [330, 0, 100, 25] })
    )
    expect(offStepGaps(tree)).toEqual([])
  })

  test("judges a gap to the half pixel", () => {
    const tree = window(
      control({ name: "A", at: [0, 0, 100, 25] }),
      control({ name: "B", at: [108.2, 0, 100, 25] }),
      control({ name: "C", at: [0, 35.5, 100, 25] })
    )
    expect(offStepGaps(tree)).toEqual([{ direction: "down", gap: 10.5, from: "A", to: "C" }])
  })

  test("measures the controls each control holds", () => {
    const row = control({
      name: "Row",
      at: [0, 0, 400, 25],
      children: [
        control({ name: "Label", at: [0, 0, 100, 25] }),
        control({ name: "Field", at: [101, 0, 100, 25] }),
      ],
    })
    expect(offStepGaps(window(row))).toEqual([
      { direction: "across", gap: 1, from: "Label", to: "Field" },
    ])
  })

  test("names a control without a name by where it sits in its holder", () => {
    const tree = window(control({ at: [10, 20, 50, 25] }), control({ at: [70, 20, 50, 25] }))
    expect(offStepGaps(tree)).toEqual([
      {
        direction: "across",
        gap: 10,
        from: "the control at 10, 20 in Window",
        to: "the control at 70, 20 in Window",
      },
    ])
  })

  test("leaves out hidden, faded and empty controls with what they hold", () => {
    const inner = [
      control({ name: "X", at: [0, 0, 10, 10] }),
      control({ name: "Y", at: [11, 0, 10, 10] }),
    ]
    const tree = window(
      control({ name: "A", at: [0, 0, 100, 25] }),
      control({ name: "Gone", at: [101, 0, 100, 25], hidden: true, children: inner }),
      control({ name: "Faded", at: [0, 26, 100, 25], alpha: 0, children: inner }),
      control({ name: "Empty", at: [0, 60, 0, 25] })
    )
    expect(offStepGaps(tree)).toEqual([])
  })

  test("leaves what a template made inside a control to the template", () => {
    const dropdown = control({
      name: "Dropdown",
      virtual: "ZO_ScrollableComboBox",
      at: [0, 0, 200, 25],
      children: [
        control({ name: "Text", at: [0, 0, 170, 25] }),
        control({ name: "Open", at: [171, 0, 25, 25] }),
      ],
    })
    expect(offStepGaps(window(dropdown))).toEqual([])
  })
})
