import { describe, expect, test } from "bun:test"
import { engineConstantsTable } from "akasha/temper/eso/constant/modules/engine-constants-seeding/engine-constants-seeding.module.code.ts"
import {
  virtualsFrom,
  virtualsLua,
} from "akasha/temper/eso/ui-harness/modules/ui-virtuals/ui-virtuals.module.code.ts"

const HELD = engineConstantsTable().numbers

const ROW = `<GuiXml><Controls>
  <Control name="TemperRow" virtual="true" mouseEnabled="true">
    <Dimensions x="300" y="52" />
    <Controls>
      <Texture name="$(parent)Bg" textureFile="EsoUI/Art/listItem.dds" alpha="0.4">
        <AnchorFill />
      </Texture>
      <Texture name="$(parent)Icon">
        <Dimensions x="40" y="40" />
        <Anchor point="TOPLEFT" relativeTo="$(parent)" relativePoint="TOPLEFT" offsetX="13" offsetY="5" />
      </Texture>
      <Label name="$(parent)Qty" font="ZoFontGameShadow" horizontalAlignment="RIGHT" verticalAlignment="CENTER">
        <Dimensions x="44" y="50" />
        <Anchor point="TOPLEFT" relativeTo="$(parent)Icon" relativePoint="TOPRIGHT" offsetX="8" offsetY="-3" />
      </Label>
    </Controls>
  </Control>
</Controls></GuiXml>`

const INHERITING = `<GuiXml><Controls>
  <Control name="TemperBase" virtual="true">
    <Dimensions x="10" y="20" />
    <Controls><Label name="$(parent)One" text="from the base" /></Controls>
  </Control>
  <Control name="TemperOver" virtual="true" inherits="TemperBase">
    <Dimensions x="30" />
    <Controls><Label name="$(parent)Two" text="its own" /></Controls>
  </Control>
</Controls></GuiXml>`

const COLORED = `<GuiXml><Controls>
  <Backdrop name="TemperBack" virtual="true">
    <CenterColor r="0" g="0" b="0" a="0.85" />
    <EdgeColor r="1" g="0.5" b="0" a="1" />
  </Backdrop>
  <Label name="TemperTinted" virtual="true" color="FF8000" />
</Controls></GuiXml>`

const READY = `<GuiXml><Controls>
  <Control name="TemperReady" virtual="true">
    <OnInitialized>ZO_Ready(self)</OnInitialized>
  </Control>
</Controls></GuiXml>`

const QUOTED = `<GuiXml><Controls>
  <Label name="TemperQuoted" virtual="true" text="he said &quot;no&quot;" />
</Controls></GuiXml>`

describe("virtualsFrom", () => {
  test("keys a template by the name the element carries", () => {
    const table = virtualsFrom([ROW])
    expect(Object.keys(table)).toEqual(["TemperRow"])
  })

  test("takes the kind of control off the element's own tag", () => {
    const table = virtualsFrom([ROW])
    expect(table.TemperRow?.controlType).toBe(HELD.CT_CONTROL)
    expect(table.TemperRow?.children[0]?.controlType).toBe(HELD.CT_TEXTURE)
    expect(table.TemperRow?.children[2]?.controlType).toBe(HELD.CT_LABEL)
  })

  test("takes the size the template states", () => {
    const row = virtualsFrom([ROW]).TemperRow
    expect(row?.width).toBe(300)
    expect(row?.height).toBe(52)
    expect(row?.mouseEnabled).toBe(true)
  })

  test("turns a point named by word into the number the game holds", () => {
    const qty = virtualsFrom([ROW]).TemperRow?.children[2]
    expect(qty?.anchors[0]).toEqual({
      point: HELD.TOPLEFT ?? 0,
      relativeTo: "$(parent)Icon",
      relativePoint: HELD.TOPRIGHT ?? 0,
      offsetX: 8,
      offsetY: -3,
    })
  })

  test("reads the alignment a label states", () => {
    const qty = virtualsFrom([ROW]).TemperRow?.children[2]
    expect(qty?.alignH).toBe(HELD.TEXT_ALIGN_RIGHT)
    expect(qty?.alignV).toBe(HELD.TEXT_ALIGN_CENTER)
    expect(qty?.font).toBe("ZoFontGameShadow")
  })

  test("reads a fill where the template says to fill", () => {
    const background = virtualsFrom([ROW]).TemperRow?.children[0]
    expect(background?.anchorFill).toBe(true)
    expect(background?.alpha).toBe(0.4)
    expect(background?.texture).toBe("EsoUI/Art/listItem.dds")
  })

  test("takes an inherited template's children before its own", () => {
    const over = virtualsFrom([INHERITING]).TemperOver
    expect(over?.children.map((one) => one.text)).toEqual(["from the base", "its own"])
  })

  test("gives a control nested in a template the templates that control inherits", () => {
    const nested = `<GuiXml><Controls>
      <Control name="TemperHeader" virtual="true">
        <Controls><Label name="$(parent)Name" text="header" /></Controls>
      </Control>
      <Control name="TemperList" virtual="true">
        <Controls><Control name="$(parent)Sort" inherits="TemperHeader" /></Controls>
      </Control>
    </Controls></GuiXml>`
    const sort = virtualsFrom([nested]).TemperList?.children[0]
    expect(sort?.children.map((one) => one.text)).toEqual(["header"])
  })

  test("lets a child override a control deeper in what it inherits, by the name both resolve to", () => {
    const deep = `<GuiXml><Controls>
      <Control name="TemperScroll" virtual="true">
        <Controls><Scroll name="$(parent)Scroll">
          <Controls><Control name="$(parent)Child" /></Controls>
        </Scroll></Controls>
      </Control>
      <Control name="TemperDialog" virtual="true" inherits="TemperScroll">
        <Controls><Control name="$(parent)ScrollChild" override="true">
          <Dimensions x="100" />
        </Control></Controls>
      </Control>
    </Controls></GuiXml>`
    const dialog = virtualsFrom([deep]).TemperDialog
    expect(dialog?.children).toHaveLength(1)
    const child = dialog?.children[0]?.children[0]
    expect(child?.name).toBe("$(parent)Child")
    expect(child?.width).toBe(100)
  })

  test("keeps what a template overrides and what the template leaves alone", () => {
    const over = virtualsFrom([INHERITING]).TemperOver
    expect(over?.width).toBe(30)
    expect(over?.height).toBe(20)
  })

  test("reads a backdrop's middle and edge", () => {
    const back = virtualsFrom([COLORED]).TemperBack
    expect(back?.controlType).toBe(HELD.CT_BACKDROP)
    expect(back?.centerColor).toEqual([0, 0, 0, 0.85])
    expect(back?.edgeColor).toEqual([1, 0.5, 0, 1])
  })

  test("reads a color written as six hex digits", () => {
    const tinted = virtualsFrom([COLORED]).TemperTinted
    expect(tinted?.color?.[0]).toBe(1)
    expect(tinted?.color?.[2]).toBe(0)
    expect(tinted?.color?.[3]).toBe(1)
  })

  test("leaves out an element that is no template", () => {
    const table = virtualsFrom([
      '<GuiXml><Controls><Control name="TemperReal" /></Controls></GuiXml>',
    ])
    expect(Object.keys(table)).toEqual([])
  })

  test("reads the handler an element writes inline", () => {
    const table = virtualsFrom([READY])
    expect(table.TemperReady?.handlers.OnInitialized).toContain("ZO_Ready(self)")
  })
})

describe("virtualsLua", () => {
  test("writes each template into a chunk the sandbox reads", () => {
    const chunks = virtualsLua(virtualsFrom([ROW]), 10)
    expect(chunks).toHaveLength(1)
    expect(chunks[0]).toContain("__ui_virtuals({")
    expect(chunks[0]).toContain('["TemperRow"]')
    expect(chunks[0]).toContain(`controlType = ${String(HELD.CT_CONTROL)}`)
    expect(chunks[0]).toContain("width = 300")
    expect(chunks[0]).toContain("anchorFill = true")
  })

  test("writes a handler as a Lua function the sandbox compiles", () => {
    const chunks = virtualsLua(virtualsFrom([READY]), 10)
    expect(chunks[0]).toContain('["OnInitialized"] = function(self, ...)')
    expect(chunks[0]).toContain("ZO_Ready(self)")
  })

  test("breaks the templates into batches of the size it is given", () => {
    expect(virtualsLua(virtualsFrom([INHERITING]), 1)).toHaveLength(2)
  })

  test("escapes a quotation mark inside text", () => {
    const chunks = virtualsLua(virtualsFrom([QUOTED]), 10)
    expect(chunks[0]).toContain('he said \\"no\\"')
  })
})
