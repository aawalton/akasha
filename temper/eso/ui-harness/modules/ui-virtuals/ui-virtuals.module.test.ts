import { describe, expect, test } from "bun:test"
import { engineConstantsTable } from "akasha/temper/eso/constant/modules/engine-constants-seeding/engine-constants-seeding.module.code.ts"
import {
  declaredFrom,
  virtualsFrom,
} from "akasha/temper/eso/ui-harness/modules/ui-virtuals/ui-virtuals.module.code.ts"
import { virtualsLua } from "akasha/temper/eso/ui-harness/modules/ui-virtuals-lua/ui-virtuals-lua.module.code.ts"

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

  test("takes a point written as its number as that number", () => {
    const numbered = `<GuiXml><Controls>
      <Control name="TemperBelow" virtual="true">
        <Anchor point="1" relativePoint="4" relativeTo="$(parent)Top" offsetY="1" />
      </Control>
    </Controls></GuiXml>`
    const anchor = virtualsFrom([numbered]).TemperBelow?.anchors[0]
    expect(anchor?.point).toBe(1)
    expect(anchor?.relativePoint).toBe(4)
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

  test("reads a backdrop's colors written as attributes of the backdrop", () => {
    const flat = `<GuiXml><Controls>
      <Backdrop name="TemperFlat" virtual="true" centerColor="000000" edgeColor="202020">
        <Edge edgeSize="1" />
      </Backdrop>
    </Controls></GuiXml>`
    const back = virtualsFrom([flat]).TemperFlat
    expect(back?.centerColor).toEqual([0, 0, 0, 1])
    expect(back?.edgeColor?.[0]).toBeCloseTo(32 / 255)
    expect(back?.edgeSize).toBe(1)
  })

  test("reads the art a backdrop edges and fills itself with", () => {
    const framed = `<GuiXml><Controls>
      <Backdrop name="TemperFramed" virtual="true">
        <Edge file="EsoUI/Art/Tooltips/UI-Border.dds" edgeFileWidth="128" edgeFileHeight="16" />
        <Center file="EsoUI/Art/Tooltips/UI-TooltipCenter.dds" />
        <Insets left="16" top="16" right="-16" bottom="-16" />
      </Backdrop>
    </Controls></GuiXml>`
    const back = virtualsFrom([framed]).TemperFramed
    expect(back?.edgeTexture).toBe("EsoUI/Art/Tooltips/UI-Border.dds")
    expect(back?.edgeSize).toBe(16)
    expect(back?.centerTexture).toBe("EsoUI/Art/Tooltips/UI-TooltipCenter.dds")
    expect(back?.insets).toEqual([16, 16, -16, -16])
  })

  test("reads the part of its file a texture shows, and a button's art", () => {
    const parts = `<GuiXml><Controls>
      <Texture name="TemperPart" virtual="true" textureFile="EsoUI/Art/a.dds">
        <TextureCoords left="0.25" right="0.5" />
      </Texture>
      <Button name="TemperPress" virtual="true">
        <Textures normal="EsoUI/Art/up.dds" pressed="EsoUI/Art/down.dds" />
      </Button>
    </Controls></GuiXml>`
    const table = virtualsFrom([parts])
    expect(table.TemperPart?.textureCoords).toEqual([0.25, 0.5, 0, 1])
    expect(table.TemperPress?.normalTexture).toBe("EsoUI/Art/up.dds")
    expect(virtualsLua(table, 10)[0]).toContain("textureCoords = { 0.25, 0.5, 0, 1 }")
  })

  test("reads the padding a control keeps around what it grows to fit, as the game's tooltips write it", () => {
    const tips = `<GuiXml><Controls>
      <Tooltip name="TemperTipBase" virtual="true">
        <ResizeToFitPadding width="25" height="ZO_TIP_PADDING" />
      </Tooltip>
      <Tooltip name="TemperTip" virtual="true" inherits="TemperTipBase" />
      <Tooltip name="TemperWide" virtual="true"><ResizeToFitPadding width="32" /></Tooltip>
    </Controls></GuiXml>`
    const table = virtualsFrom([tips])
    expect(table.TemperTip?.padding).toEqual([25, "ZO_TIP_PADDING"])
    expect(table.TemperWide?.padding).toEqual([32, 0])
    expect(virtualsLua(table, 10)[0]).toContain('padding = { 25, "ZO_TIP_PADDING" }')
  })

  test("reads the least and greatest size a template holds a control to, as the game's tooltips write them", () => {
    const tips = `<GuiXml><Controls>
      <Tooltip name="TemperTipBase" virtual="true"><DimensionConstraints maxX="350" /></Tooltip>
      <Tooltip name="TemperTip" virtual="true" inherits="TemperTipBase" />
      <Tooltip name="TemperFixed" virtual="true">
        <DimensionConstraints minX="416" maxX="ZO_TIP_WIDTH" />
      </Tooltip>
    </Controls></GuiXml>`
    const table = virtualsFrom([tips])
    expect(table.TemperTip?.constraints).toEqual([0, 0, 350, 0])
    expect(table.TemperFixed?.constraints).toEqual([416, 0, "ZO_TIP_WIDTH", 0])
    expect(virtualsLua(table, 10)[0]).toContain('constraints = { 416, 0, "ZO_TIP_WIDTH", 0 }')
  })

  test("reads the wrap mode a label names by word, and its greatest line count", () => {
    const ellipsed = `<GuiXml><Controls>
      <Label name="TemperEllipsedBase" virtual="true" wrapMode="ELLIPSIS" maxLineCount="2" />
      <Label name="TemperEllipsed" virtual="true" inherits="TemperEllipsedBase" />
    </Controls></GuiXml>`
    const table = virtualsFrom([ellipsed])
    expect(table.TemperEllipsed?.wrapMode).toBe(HELD.TEXT_WRAP_MODE_ELLIPSIS)
    expect(table.TemperEllipsed?.maxLineCount).toBe(2)
    const chunk = virtualsLua(table, 10)[0]
    expect(chunk).toContain(`wrapMode = ${String(HELD.TEXT_WRAP_MODE_ELLIPSIS)}`)
    expect(chunk).toContain("maxLineCount = 2")
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

describe("declaredFrom", () => {
  const roots = `<GuiXml><Controls>
    <TopLevelControl name="TemperWindow" />
    <Control name="TemperCompass">
      <Controls><Label name="$(parent)Inner" /></Controls>
    </Control>
    <Control name="TemperTemplate" virtual="true" />
  </Controls></GuiXml>`

  test("declares every control the document holds at its root, of any kind", () => {
    const table = declaredFrom([roots], {})
    expect(Object.keys(table)).toEqual(["TemperWindow", "TemperCompass"])
    expect(table.TemperCompass?.controlType).toBe(HELD.CT_CONTROL)
  })

  test("leaves a control inside another to be made with the one holding it", () => {
    expect(declaredFrom([roots], {}).TemperCompass?.children[0]?.name).toBe("$(parent)Inner")
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

  test("writes the order handlers were added in, an inherited template's first", () => {
    const layered = `<GuiXml><Controls>
      <Control name="TemperBehavior" virtual="true">
        <OnInitialized name="TemperBehavior">ZO_Mix(self)</OnInitialized>
      </Control>
      <Control name="TemperUser" virtual="true" inherits="TemperBehavior">
        <OnInitialized>self:Use()</OnInitialized>
      </Control>
    </Controls></GuiXml>`
    const chunks = virtualsLua(virtualsFrom([layered]), 10)
    expect(chunks[0]).toContain(
      'handlerOrder = { "OnInitialized:TemperBehavior", "OnInitialized" }'
    )
  })

  test("keeps a size or an offset the document gives as a name, for the sandbox to look up", () => {
    const named = `<GuiXml><Controls>
      <Control name="TemperNamed" virtual="true">
        <Dimensions x="200" y="ZO_ROW_HEIGHT" />
        <Anchor point="LEFT" offsetX="-ZO_INDENT" />
      </Control>
    </Controls></GuiXml>`
    const table = virtualsFrom([named])
    expect(table.TemperNamed?.height).toBe("ZO_ROW_HEIGHT")
    expect(table.TemperNamed?.anchors[0]?.offsetX).toBe("-ZO_INDENT")
    const chunk = virtualsLua(table, 10)[0]
    expect(chunk).toContain('height = "ZO_ROW_HEIGHT"')
    expect(chunk).toContain('offsetX = "-ZO_INDENT"')
  })

  test("breaks the templates into batches of the size it is given", () => {
    expect(virtualsLua(virtualsFrom([INHERITING]), 1)).toHaveLength(2)
  })

  test("escapes a quotation mark inside text", () => {
    const chunks = virtualsLua(virtualsFrom([QUOTED]), 10)
    expect(chunks[0]).toContain('he said \\"no\\"')
  })
})
