import { describe, expect, test } from "bun:test"
import {
  type DispatchFinding,
  detectNonDispatchHandlers,
  isSingleDispatch,
} from "./addon-inline-handler-dispatch"

const NS = "TemperCrafting"
const GOVERNED = new Set([NS])

function detect(xml: string): readonly DispatchFinding[] {
  return detectNonDispatchHandlers({
    xmlPath: "temper/game-crafting-addon/metadata/XML/UI/CraftStore.xml",
    xml,
    governed: GOVERNED,
  })
}

describe("isSingleDispatch", () => {
  test("bare no-arg dispatch passes", () => {
    expect(isSingleDispatch("TemperCrafting.HideStyles()", NS)).toBe(true)
  })

  test("dispatch with self + string args passes", () => {
    expect(isSingleDispatch('TemperCrafting.SaveCoords(self,"style")', NS)).toBe(true)
  })

  test("dispatch with single const arg passes", () => {
    expect(isSingleDispatch("TemperCrafting.RuneCraftGlyph(ITEMTYPE_GLYPH_ARMOR)", NS)).toBe(true)
  })

  test("colon-call dispatch passes", () => {
    expect(isSingleDispatch("TemperCrafting:HideStyles()", NS)).toBe(true)
  })

  test("surrounding whitespace is tolerated", () => {
    expect(isSingleDispatch("  TemperCrafting.OpenSettings()  ", NS)).toBe(true)
  })

  test("two statements separated by `;` fail", () => {
    expect(
      isSingleDispatch("TemperCrafting.RuneSetValue(6);TemperCrafting.RuneShowMode()", NS)
    ).toBe(false)
  })

  test("three-statement glyph body fails", () => {
    expect(
      isSingleDispatch(
        "TemperCrafting.RuneSetValue(1,ITEMTYPE_GLYPH_ARMOR);TemperCrafting.RuneSetValue(6);TemperCrafting.RuneShowMode()",
        NS
      )
    ).toBe(false)
  })

  test("inline table assignment fails (no call after leading member)", () => {
    expect(
      isSingleDispatch("TemperCrafting.coords.overview={1=self:GetLeft(),2=self:GetTop()}", NS)
    ).toBe(false)
  })

  test("namespace read embedded in a larger expression fails", () => {
    expect(
      isSingleDispatch(
        'self:SetText("|cFFAA33"..TemperCrafting.title.."|r "..TemperCrafting.version)',
        NS
      )
    ).toBe(false)
  })

  test("namespace passed as an argument to a foreign call fails", () => {
    expect(isSingleDispatch("LibAddonMenu2:OpenToPanel(TemperCrafting.LAM)", NS)).toBe(false)
  })

  test("embedded second namespace reference in args fails", () => {
    expect(isSingleDispatch("TemperCrafting.Foo(TemperCrafting.Bar())", NS)).toBe(false)
  })

  test("trailing call after the dispatch fails", () => {
    expect(isSingleDispatch("TemperCrafting.A() extra()", NS)).toBe(false)
  })

  test("body not referencing the namespace is not a dispatch", () => {
    expect(isSingleDispatch("self:SetAlpha(1)", NS)).toBe(false)
  })

  test("empty body is not a dispatch", () => {
    expect(isSingleDispatch("   ", NS)).toBe(false)
  })
})

describe("detectNonDispatchHandlers", () => {
  test("a single-dispatch governed handler is clean", () => {
    const xml = `<OnClicked>TemperCrafting.HideStyles()</OnClicked>`
    expect(detect(xml)).toEqual([])
  })

  test("a multi-statement governed handler is flagged once", () => {
    const xml = `<OnClicked>TemperCrafting.RuneSetValue(6);TemperCrafting.RuneShowMode()</OnClicked>`
    const findings = detect(xml)
    expect(findings.length).toBe(1)
    expect(findings[0]?.handler).toBe("OnClicked")
    expect(findings[0]?.namespace).toBe(NS)
  })

  test("an inline table-assignment governed handler is flagged", () => {
    const xml = `<OnMouseUp>TemperCrafting.coords.style={1=self:GetLeft(),2=self:GetTop()}</OnMouseUp>`
    expect(detect(xml).length).toBe(1)
  })

  test("engine-only handlers referencing no governed namespace are never flagged", () => {
    const xml = `<OnMouseEnter>WINDOW_MANAGER:SetMouseCursor(12);self:SetAlpha(1)</OnMouseEnter>
      <OnInitialized>self:SetParent(self:GetParent():GetNamedChild("Scroll"));self:SetAnchor(3,nil,3,0,0)</OnInitialized>`
    expect(detect(xml)).toEqual([])
  })

  test("empty handler bodies are skipped", () => {
    const xml = `<OnUpdate></OnUpdate>`
    expect(detect(xml)).toEqual([])
  })

  test("no governed namespaces declared → no findings", () => {
    const findings = detectNonDispatchHandlers({
      xmlPath: "x.xml",
      xml: `<OnClicked>TemperCrafting.coords.x={}</OnClicked>`,
      governed: new Set(),
    })
    expect(findings).toEqual([])
  })

  test("line numbers are reported on the opening tag", () => {
    const xml = `<Controls>\n  <Button>\n    <OnClicked>TemperCrafting.A();TemperCrafting.B()</OnClicked>\n  </Button>\n</Controls>`
    expect(detect(xml)[0]?.line).toBe(3)
  })

  test("a comment-quoted handler-shaped string is not parsed as a handler", () => {
    const xml = `<!-- <OnClicked>TemperCrafting.x={}</OnClicked> -->\n<OnClicked>TemperCrafting.HideStyles()</OnClicked>`
    expect(detect(xml)).toEqual([])
  })
})
