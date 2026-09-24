import { afterAll, beforeAll, describe, expect, test } from "bun:test"
import {
  openUiHarness,
  type UiControl,
  type UiHarness,
} from "akasha/temper/eso/ui-harness/modules/ui-harness/ui-harness.module.code.ts"

const ADDON = `
local window = WINDOW_MANAGER:CreateTopLevelWindow("TemperProbeWindow")
window:SetDimensions(400, 300)
window:SetHidden(true)

local title = WINDOW_MANAGER:CreateControl("TemperProbeWindowTitle", window, CT_LABEL)
title:SetAnchor(TOP, window, TOP, 0, 12)
title:SetText("Probe")
title:SetFont("ZoFontWinH3")

local close = WINDOW_MANAGER:CreateControlFromVirtual("TemperProbeWindowClose", window, "ZO_CloseButton")
close:SetHandler("OnClicked", function(self)
  self:GetParent():SetHidden(true)
end)

TemperProbeShown = false
window:SetHandler("OnShow", function(self)
  TemperProbeShown = true
  self:SetHidden(false)
end)
`

const HELD = `
local frame = WINDOW_MANAGER:CreateTopLevelWindow("TemperHeldFrame")
frame:SetDimensions(400, 300)

local capped = WINDOW_MANAGER:CreateControl("TemperHeldCapped", frame, CT_CONTROL)
capped:SetDimensions(500, 20)
capped:SetDimensionConstraints(0, 0, 200, 0)

local floored = WINDOW_MANAGER:CreateControl("TemperHeldFloored", frame, CT_CONTROL)
floored:SetDimensions(10, 10)
floored:SetDimensionConstraints(50, 40, 0, 0)

local spanned = WINDOW_MANAGER:CreateControl("TemperHeldSpanned", frame, CT_CONTROL)
spanned:SetAnchor(TOPLEFT, frame, TOPLEFT, 10, 10)
spanned:SetAnchor(BOTTOMRIGHT, frame, BOTTOMRIGHT, -10, -10)
spanned:SetDimensionConstraints(0, 0, 100, 50)

local centered = WINDOW_MANAGER:CreateControl("TemperHeldCentered", frame, CT_CONTROL)
centered:SetAnchor(CENTER, frame, CENTER, 0, 0)
centered:SetDimensions(300, 300)
centered:SetDimensionConstraints(0, 0, 100, 100)

local worded = WINDOW_MANAGER:CreateControl("TemperHeldWorded", frame, CT_LABEL)
worded:SetText("a line of text far wider than its greatest")
worded:SetDimensionConstraints(0, 500, 60, 0)
`

function childNamed(control: UiControl, name: string): UiControl | undefined {
  return control.children.find((child) => child.name === name)
}

describe("ui-harness", () => {
  let harness: UiHarness

  beforeAll(async () => {
    harness = await openUiHarness()
    await harness.load(ADDON)
    await harness.load(HELD)
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
    expect(title?.font).toBe("ZoFontWinH3")
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
