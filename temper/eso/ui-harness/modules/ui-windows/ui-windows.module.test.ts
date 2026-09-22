import { describe, expect, test } from "bun:test"
import {
  uiWindowNamed,
  uiWindowSlugs,
  windowsDeclaredOutright,
} from "akasha/temper/eso/ui-harness/modules/ui-windows/ui-windows.module.code.ts"

const MARKUP = `<GuiXml><Controls>
  <TopLevelControl name="TemperReport" hidden="true">
    <Dimensions x="400" y="300" />
  </TopLevelControl>
  <TopLevelControl name="TemperRowTemplate" virtual="true" />
  <Control name="TemperInner" />
</Controls></GuiXml>`

describe("uiWindowSlugs", () => {
  test("names every window a run has brought up", () => {
    expect(uiWindowSlugs()).toContain("inventory-browser")
  })
})

describe("uiWindowNamed", () => {
  test("carries what bringing a window up takes", () => {
    const window = uiWindowNamed("inventory-browser")
    expect(window?.addon).toBe("TemperItems")
    expect(window?.control).toBe("TemperItemsBrowser")
    expect(window?.savedVariables).toEqual(["TemperItems"])
    expect(window?.opens).toContain("toggleInventoryBrowser")
  })

  test("answers with nothing for a window it does not know", () => {
    expect(uiWindowNamed("no-such-window")).toBeUndefined()
  })
})

describe("windowsDeclaredOutright", () => {
  test("names a window the document declares rather than templates", () => {
    expect(windowsDeclaredOutright([MARKUP])).toEqual(["TemperReport"])
  })

  test("leaves out a window the document says is virtual", () => {
    expect(windowsDeclaredOutright([MARKUP])).not.toContain("TemperRowTemplate")
  })

  test("reads nothing out of a document declaring no window", () => {
    expect(windowsDeclaredOutright(["<GuiXml><Controls /></GuiXml>"])).toEqual([])
  })
})
