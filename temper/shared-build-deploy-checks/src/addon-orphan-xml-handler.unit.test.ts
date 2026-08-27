import { describe, expect, test } from "bun:test"
import {
  collectSourceSymbols,
  detectOrphans,
  parseInlineHandlers,
} from "./addon-orphan-xml-handler"

const NAMESPACES = new Set(["TemperCrafting"])
const MEMBER_UNIVERSE = new Set(["Queue", "ShowMain", "Account", "Tooltip"])

function detect(xml: string) {
  return detectOrphans({
    xmlPath: "temper/game-crafting-addon/metadata/XML/UI/CraftStore.xml",
    xml,
    namespaces: NAMESPACES,
    memberUniverse: MEMBER_UNIVERSE,
  })
}

describe("collectSourceSymbols — declared namespaces", () => {
  test("captures globalThis.X = {} property publishes", () => {
    const src = `const state = {}\nglobalThis.TemperCrafting = { Queue: fn, ShowMain: fn }\n`
    expect(collectSourceSymbols(src, "public-api.ts").namespaces).toEqual(["TemperCrafting"])
  })

  test("captures globalThis['X'] element-access publishes and ignores reads", () => {
    const src = `globalThis["CSPS"] = {}\nconst x = globalThis.TemperLeads?.foo\n`
    expect(collectSourceSymbols(src, "state.ts").namespaces).toEqual(["CSPS"])
  })

  test("a comment mentioning globalThis.X is not a declaration", () => {
    const src = `// publishes globalThis.TemperCrafting elsewhere\nconst y = 1\n`
    expect(collectSourceSymbols(src, "x.ts").namespaces).toEqual([])
  })

  test("an assignment off a receiver other than globalThis defines a member and declares nothing", () => {
    const symbols = collectSourceSymbols(`CSPS.Queue = fn\nother["Zap"] = g\n`, "attach.ts")
    expect(symbols.namespaces).toEqual([])
    expect(symbols.members).toEqual(["Queue", "Zap"])
  })
})

describe("collectSourceSymbols — defined-member universe", () => {
  test("collects object-literal keys, shorthand, methods, and bare attach targets", () => {
    const src = [
      "globalThis.CSPS = { showBuild: fn, Account }",
      "function f() { return { Tooltip() {} } }",
      "CSPS.updateTransferCombo = g",
      `CSPS["openTreeToSection"] = h`,
    ].join("\n")
    const universe = collectSourceSymbols(src, "public-api.ts").members
    expect(universe).toContain("showBuild")
    expect(universe).toContain("Account")
    expect(universe).toContain("Tooltip")
    expect(universe).toContain("updateTransferCombo")
    expect(universe).toContain("openTreeToSection")
  })

  test("a namespace publish also defines the namespace name as a member", () => {
    expect(collectSourceSymbols("globalThis.CSPS = {}", "p.ts").members).toContain("CSPS")
  })
})

describe("parseInlineHandlers", () => {
  test("extracts handler name, body, and 1-based line; skips self-closing", () => {
    const xml = [
      "<GuiXml>",
      "  <TopLevelControl name='X'>",
      "    <OnInitialized/>",
      "    <OnClicked>TemperCrafting.ShowMain()</OnClicked>",
      "  </TopLevelControl>",
      "</GuiXml>",
    ].join("\n")
    const handlers = parseInlineHandlers(xml)
    expect(handlers.map((h) => h.name)).toEqual(["OnClicked"])
    expect(handlers[0]?.line).toBe(4)
    expect(handlers[0]?.body).toBe("TemperCrafting.ShowMain()")
  })

  test("handles multi-line bodies and preserves opening-tag line", () => {
    const xml = [
      "<x>",
      "<OnMouseUp>",
      "  if upInside then",
      "    TemperCrafting.Queue()",
      "  end",
      "</OnMouseUp>",
      "</x>",
    ].join("\n")
    const handlers = parseInlineHandlers(xml)
    expect(handlers).toHaveLength(1)
    expect(handlers[0]?.line).toBe(2)
    expect(handlers[0]?.body).toContain("TemperCrafting.Queue()")
  })

  test("a handler quoted inside an XML comment is not parsed", () => {
    const xml = "<x>\n<!-- <OnUpdate>TemperCrafting.Queue()</OnUpdate> -->\n</x>"
    expect(parseInlineHandlers(xml)).toHaveLength(0)
  })
})

describe("layer 2 — OnUpdate storm vector (the CraftStoreFixed orphan)", () => {
  test("hard-blocks a non-empty inline OnUpdate referencing the own namespace, even with a DEFINED member", () => {
    const xml =
      "<x>\n<TopLevelControl name='CraftStoreFixed'>\n<OnInitialized/>\n<OnUpdate>TemperCrafting.Queue()</OnUpdate>\n</TopLevelControl>\n</x>"
    const findings = detect(xml)
    expect(findings).toHaveLength(1)
    expect(findings[0]?.reason).toBe("onupdate-storm-vector")
    expect(findings[0]?.handler).toBe("OnUpdate")
    expect(findings[0]?.namespace).toBe("TemperCrafting")
  })

  test("an EMPTY inline OnUpdate passes (the two real in-tree OnUpdates)", () => {
    const xml = "<x>\n<Control name='Y'>\n<OnUpdate></OnUpdate>\n</Control>\n</x>"
    expect(detect(xml)).toHaveLength(0)
  })

  test("a non-empty OnUpdate that touches only self/ESO/control names is not flagged", () => {
    const xml = "<x>\n<OnUpdate>self:SetAlpha(0.5) ZO_Tooltips_HideTextTooltip()</OnUpdate>\n</x>"
    expect(detect(xml)).toHaveLength(0)
  })
})

describe("layer 1 — undefined symbol (broader orphan family)", () => {
  test("hard-blocks a handler calling an own-namespace member defined nowhere", () => {
    const xml = "<x>\n<OnClicked>TemperCrafting.DoesNotExist()</OnClicked>\n</x>"
    const findings = detect(xml)
    expect(findings).toHaveLength(1)
    expect(findings[0]?.reason).toBe("undefined-symbol")
    expect(findings[0]?.member).toBe("DoesNotExist")
  })

  test("the refusal names the act that clears it, not only the diagnosis", () => {
    const findings = detect("<x>\n<OnClicked>TemperCrafting.DoesNotExist()</OnClicked>\n</x>")
    expect(findings[0]?.message).toContain("Delete the handler")
    expect(findings[0]?.message).toContain("define `DoesNotExist` on `TemperCrafting`")
  })

  test("a handler calling a DEFINED own-namespace member passes", () => {
    const xml =
      "<x>\n<OnClicked>TemperCrafting.ShowMain()</OnClicked>\n<OnMouseUp>TemperCrafting.Account.button = 1</OnMouseUp>\n</x>"
    expect(detect(xml)).toHaveLength(0)
  })

  test("colon-call (NS:method) resolves like dot-call", () => {
    const okXml = "<x>\n<OnMouseEnter>TemperCrafting:Tooltip(self)</OnMouseEnter>\n</x>"
    expect(detect(okXml)).toHaveLength(0)
    const badXml = "<x>\n<OnMouseEnter>TemperCrafting:Nope(self)</OnMouseEnter>\n</x>"
    expect(detect(badXml).map((f) => f.member)).toEqual(["Nope"])
  })

  test("a foreign/library prefix is never resolved (not our namespace)", () => {
    const xml = "<x>\n<OnClicked>WritWorthy.AnyThing() MatUI.Whatever()</OnClicked>\n</x>"
    expect(detect(xml)).toHaveLength(0)
  })

  test("a control name that prefixes the namespace string is not a namespace ref", () => {
    const xml = "<x>\n<OnClicked>TemperCraftingWindow:SetHidden(true)</OnClicked>\n</x>"
    expect(detect(xml)).toHaveLength(0)
  })
})

describe("addons with no declared namespace are skipped", () => {
  test("empty namespace set yields no findings regardless of XML", () => {
    const findings = detectOrphans({
      xmlPath: "lib/foo.xml",
      xml: "<x>\n<OnUpdate>SomeLib.tick()</OnUpdate>\n</x>",
      namespaces: new Set(),
      memberUniverse: new Set(),
    })
    expect(findings).toHaveLength(0)
  })
})
