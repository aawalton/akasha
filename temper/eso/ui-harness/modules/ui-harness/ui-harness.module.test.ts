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

function childNamed(control: UiControl, name: string): UiControl | undefined {
  return control.children.find((child) => child.name === name)
}

describe("ui-harness", () => {
  let harness: UiHarness

  beforeAll(async () => {
    harness = await openUiHarness()
    await harness.load(ADDON)
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
