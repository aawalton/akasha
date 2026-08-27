import { describe, expect, test } from "bun:test"
import {
  collectColonMethodNames,
  findForceColonGuardViolations,
  formatIssue,
  scanBundle,
} from "./tstl-colon-dot-self-shift"
import {
  COLON_DOT_ALLOW,
  type ColonDotAllowEntry,
  FORCE_COLON_METHODS,
} from "./tstl-colon-dot-self-shift.manifest"

type _Allow = ColonDotAllowEntry
const CORE = "temper/addons/types/eso/ui.d.ts"

const COLON = new Set(["SetColor", "SetAnchor", "CreateControl", "GetControl", "ReleaseAllObjects"])

describe("scanBundle (emitted-Lua scan)", () => {
  test("flags a dot-call of a colon method", () => {
    const issues = scanBundle(`bg.SetColor(1, 0, 0)`, "b.lua", COLON, [])
    expect(issues).toHaveLength(1)
    expect(issues[0]?.method).toBe("SetColor")
    expect(issues[0]?.receiver).toBe("bg")
  })

  test("passes the colon-call form", () => {
    expect(scanBundle(`bg:SetColor(1, 0, 0)`, "b.lua", COLON, [])).toHaveLength(0)
  })

  test("recovers a multi-char receiver token and call-result receivers", () => {
    const issues = scanBundle(`local c = asAnyTable(pin).GetControl()`, "b.lua", COLON, [])
    expect(issues).toHaveLength(1)
    expect(issues[0]?.receiver).toBe("asAnyTable(pin)")
    expect(issues[0]?.method).toBe("GetControl")
  })

  test("ignores a bare global call (no receiver dot)", () => {
    expect(scanBundle(`local s = GetControl(name)`, "b.lua", COLON, [])).toHaveLength(0)
  })

  test("ignores a static dot-call whose name is not in the colon set", () => {
    expect(scanBundle(`ZO_MapPin.CreatePinTypeId(1)`, "b.lua", COLON, [])).toHaveLength(0)
  })

  test("ignores a method name inside a Lua line comment", () => {
    expect(scanBundle(`-- bg.SetColor(1, 0, 0) explains the fix`, "b.lua", COLON, [])).toHaveLength(
      0
    )
  })

  test("ignores a method name inside a string literal", () => {
    expect(scanBundle(`d("calls bg.SetColor(r) when active")`, "b.lua", COLON, [])).toHaveLength(0)
  })

  test("ignores a `function recv.Method(...)` definition", () => {
    expect(scanBundle(`function bg.SetColor(self, r, g, b) end`, "b.lua", COLON, [])).toHaveLength(
      0
    )
  })

  test("ignores a dot-call that passes `self` explicitly (super-call)", () => {
    expect(
      scanBundle(`ZO_SortFilterList.SetColor(self, 1, 0, 0)`, "b.lua", COLON, [])
    ).toHaveLength(0)
    expect(scanBundle(`ZO_SortFilterList.SetColor(self)`, "b.lua", COLON, [])).toHaveLength(0)
  })

  test("ignores a dot-call that passes its own receiver as arg #1", () => {
    expect(scanBundle(`ctrl.GetControl(ctrl, "OnShow")`, "b.lua", COLON, [])).toHaveLength(0)
    expect(scanBundle(`asAnyTable(node).GetControl(node)`, "b.lua", COLON, [])).toHaveLength(0)
  })

  test("still flags a no-argument dot-call (self dropped, nothing supplied)", () => {
    expect(scanBundle(`asAnyTable(scene).ReleaseAllObjects()`, "b.lua", COLON, [])).toHaveLength(1)
  })

  test("ignores a multi-line call passing the receiver as arg #1", () => {
    const lua = `GAMEPAD_TOOLTIPS.SetColor(\n    GAMEPAD_TOOLTIPS,\n    resolvedType\n)`
    expect(scanBundle(lua, "b.lua", COLON, [])).toHaveLength(0)
  })

  test("still flags when a non-receiver value shifts into self", () => {
    expect(scanBundle(`asAnyTable(scene).SetColor(FRAGMENT)`, "b.lua", COLON, [])).toHaveLength(1)
  })

  test("still flags when `self.field` (not bare `self`) is the first argument", () => {
    expect(scanBundle(`bg.SetColor(self.color, 0, 0)`, "b.lua", COLON, [])).toHaveLength(1)
  })

  test("flags an uppercase ESO singleton receiver", () => {
    const issues = scanBundle(`WORLD_MAP_FRAGMENT.ReleaseAllObjects()`, "b.lua", COLON, [])
    expect(issues).toHaveLength(1)
    expect(issues[0]?.receiver).toBe("WORLD_MAP_FRAGMENT")
  })

  test("flags a self-dropping crafting GetResultItemLink dot-call", () => {
    const colon = new Set(["GetResultItemLink"])
    expect(
      scanBundle(`local l = ENCHANTING.GetResultItemLink()`, "TTC.lua", colon, [])
    ).toHaveLength(1)
    expect(scanBundle(`local l = ALCHEMY.GetResultItemLink()`, "TTC.lua", colon, [])).toHaveLength(
      1
    )
    expect(
      scanBundle(`local l = ENCHANTING:GetResultItemLink()`, "TTC.lua", colon, [])
    ).toHaveLength(0)
  })

  test("honors an allowlist entry pinned by method + receiver", () => {
    const allow: readonly _Allow[] = [
      { method: "SetColor", receiver: "bg", reason: "test: genuine same-named static" },
    ]
    expect(scanBundle(`bg.SetColor(1, 0, 0)`, "b.lua", COLON, allow)).toHaveLength(0)
    expect(scanBundle(`fg.SetColor(1, 0, 0)`, "b.lua", COLON, allow)).toHaveLength(1)
  })

  test("returns nothing when the colon set is empty", () => {
    expect(scanBundle(`bg.SetColor(1, 0, 0)`, "b.lua", new Set(), [])).toHaveLength(0)
  })

  test("reports an actionable, located message", () => {
    const issues = scanBundle(`  bg.SetColor(1, 0, 0)`, "b.lua", COLON, [])
    expect(
      formatIssue(
        issues[0] ?? {
          file: "",
          line: 0,
          col: 0,
          receiver: "",
          method: "",
          hint: "",
          loadScope: false,
        }
      )
    ).toContain("b.lua:1:3")
  })
})

describe("collectColonMethodNames (force-colon override)", () => {
  const CCFV_SOURCES = [
    {
      file: CORE,
      text: `interface WindowManager { CreateControlFromVirtual(name: string, parent: Control, tmpl: string): Control }`,
      core: true,
    },
    {
      file: "x/types/eso/ui-2.d.ts",
      text: `declare function CreateControlFromVirtual(name: string, parent: Control, tmpl: string, suffix?: string): Control`,
      core: false,
    },
  ]

  test("keeps a force-listed name despite a same-named bare-global static (default list)", () => {
    expect(collectColonMethodNames(CCFV_SOURCES).has("CreateControlFromVirtual")).toBe(true)
  })

  test("without the override the same name is still subtracted (the leak)", () => {
    expect(collectColonMethodNames(CCFV_SOURCES, []).has("CreateControlFromVirtual")).toBe(false)
  })

  test("a custom force list keeps an arbitrary colliding name", () => {
    const sources = [
      { file: CORE, text: `interface Ctl { Forced(x: number): void }`, core: true },
      { file: "a/util.ts", text: `declare function Forced(x: number): void`, core: false },
    ]
    expect(collectColonMethodNames(sources, []).has("Forced")).toBe(false)
    expect(collectColonMethodNames(sources, ["Forced"]).has("Forced")).toBe(true)
  })

  test("forcing does NOT resurrect a name with no colon evidence (static only)", () => {
    const sources = [{ file: "a/util.ts", text: `declare function OnlyStatic(x: number): void` }]
    expect(collectColonMethodNames(sources, ["OnlyStatic"]).has("OnlyStatic")).toBe(false)
  })
})

describe("findForceColonGuardViolations (force-colon self-guard)", () => {
  test("flags a dot-call of a force-colon name (default list)", () => {
    const v = findForceColonGuardViolations(`wm.CreateControlFromVirtual("n", p, "t")`, "b.lua")
    expect(v).toHaveLength(1)
    expect(v[0]?.method).toBe("CreateControlFromVirtual")
  })

  test("passes the colon-call form (no self dropped)", () => {
    expect(
      findForceColonGuardViolations(`wm:CreateControlFromVirtual("n", p, "t")`, "b.lua")
    ).toHaveLength(0)
  })

  test("passes a bare-global call (the qualifying static shape — no receiver dot)", () => {
    expect(
      findForceColonGuardViolations(`CreateControlFromVirtual("n", p, "t")`, "b.lua")
    ).toHaveLength(0)
  })

  test("excludes an explicit-self super-call (consistent with scanBundle)", () => {
    expect(
      findForceColonGuardViolations(`Parent.CreateControlFromVirtual(self, p, "t")`, "b.lua")
    ).toHaveLength(0)
  })

  test("honors a custom force list and returns nothing for an empty list", () => {
    expect(findForceColonGuardViolations(`x.Foo(1)`, "b.lua", ["Foo"])).toHaveLength(1)
    expect(findForceColonGuardViolations(`x.Foo(1)`, "b.lua", [])).toHaveLength(0)
  })
})

describe("manifest", () => {
  test("ships with an empty allowlist pending landing policy", () => {
    expect(COLON_DOT_ALLOW).toHaveLength(0)
  })

  test("force-colon list holds CreateControlFromVirtual and excludes SetSelected / SetText", () => {
    expect(FORCE_COLON_METHODS).toContain("CreateControlFromVirtual")
    expect(FORCE_COLON_METHODS).not.toContain("SetSelected")
    expect(FORCE_COLON_METHODS).not.toContain("SetText")
  })
})
