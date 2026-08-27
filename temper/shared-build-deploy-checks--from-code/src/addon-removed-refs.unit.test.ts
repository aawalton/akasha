import { describe, expect, test } from "bun:test"
import { join } from "node:path"
import { formatIssue, type RemovedRefIssue, scanBundle, scanBundleFile } from "./addon-removed-refs"
import { REMOVED_EXTERNAL_ADDON_GLOBALS } from "./addon-removed-refs.manifest"

const FIXTURES = join(import.meta.dir, "..", "__fixtures__", "addon-removed-refs")

describe("addon-removed-refs", () => {
  describe("manifest", () => {
    test("blocks the removed addons and nothing legitimately kept", () => {
      const globals = REMOVED_EXTERNAL_ADDON_GLOBALS.map((e) => e.global)
      expect(globals).toContain("AwesomeGuildStore")
      expect(globals).toContain("AdvancedFilters")
      expect(globals).toContain("LibFilters")
      expect(globals).toContain("LibFilters3")
      expect(globals).toContain("IIFA_DATABASE")
      expect(globals).not.toContain("TamrielTradeCentrePrice")
      expect(globals).not.toContain("LibAddonMenu")
      expect(globals).not.toContain("LibCustomMenu")
      expect(globals).not.toContain("AGS")
    })

    test("every entry names a remedy citing the project that removed its addon", () => {
      expect(REMOVED_EXTERNAL_ADDON_GLOBALS.length).toBeGreaterThan(0)
      for (const entry of REMOVED_EXTERNAL_ADDON_GLOBALS) {
        expect(entry.remedy.trim()).not.toBe("")
        expect(entry.remedy).toMatch(/#\d{4,}/)
      }
    })
  })

  describe("scanBundle", () => {
    test("flags a bare reference to a removed addon global", () => {
      const issues = scanBundle("if AwesomeGuildStore then end", "t.lua")
      expect(issues.length).toBe(1)
      expect(issues[0]?.symbol).toBe("AwesomeGuildStore")
      expect(issues[0]?.addon).toBe("AwesomeGuildStore")
      expect(issues[0]?.line).toBe(1)
      expect(issues[0]?.col).toBe(4)
    })

    test("flags every reference on a line", () => {
      const issues = scanBundle("local a = AwesomeGuildStore; local b = AwesomeGuildStore", "t.lua")
      expect(issues.length).toBe(2)
    })

    test("ignores a removed-addon name inside a string literal", () => {
      expect(scanBundle('local s = "AwesomeGuildStore"', "t.lua")).toEqual([])
      expect(scanBundle("local s = 'AdvancedFilters'", "t.lua")).toEqual([])
    })

    test("does not flag the legitimately-kept optional integrations", () => {
      expect(scanBundle("local p = TamrielTradeCentrePrice.GetPriceInfo(x)", "t.lua")).toEqual([])
    })

    test("flags a bare reference to the retired IIfA global", () => {
      const issues = scanBundle("if IIFA_DATABASE ~= nil then end", "t.lua")
      expect(issues.length).toBe(1)
      expect(issues[0]?.symbol).toBe("IIFA_DATABASE")
      expect(issues[0]?.addon).toBe("IIfA")
    })

    test("LibFilters whole-word match does not match the distinct LibFilters3 token", () => {
      const onlyV3 = scanBundle("local x = LibFilters3", "t.lua")
      expect(onlyV3.length).toBe(1)
      expect(onlyV3[0]?.symbol).toBe("LibFilters3")
    })

    test("blank and whitespace-only lines produce no issues", () => {
      expect(scanBundle("\n   \n\t\n", "t.lua")).toEqual([])
    })

    test("each issue carries the remedy of the entry that matched, not a shared one", () => {
      for (const entry of REMOVED_EXTERNAL_ADDON_GLOBALS) {
        const issues = scanBundle(`local x = ${entry.global}`, "t.lua")
        expect(issues.length).toBe(1)
        expect(issues[0]?.symbol).toBe(entry.global)
        expect(issues[0]?.hint).toContain(entry.remedy)
      }
    })
  })

  describe("fixtures", () => {
    test("clean.lua has zero removed-addon references", () => {
      expect(scanBundleFile(join(FIXTURES, "clean.lua"))).toEqual([])
    })

    test("ref-ags.lua flags AwesomeGuildStore", () => {
      const issues = scanBundleFile(join(FIXTURES, "ref-ags.lua"))
      expect(issues.length).toBeGreaterThan(0)
      expect(issues.every((i: RemovedRefIssue) => i.symbol === "AwesomeGuildStore")).toBe(true)
    })

    test("ref-libfilters.lua flags both LibFilters and LibFilters3", () => {
      const symbols = scanBundleFile(join(FIXTURES, "ref-libfilters.lua")).map((i) => i.symbol)
      expect(symbols).toContain("LibFilters")
      expect(symbols).toContain("LibFilters3")
    })
  })

  describe("formatIssue", () => {
    test("renders file:line:col with the [removed-addon-ref] tag and addon name", () => {
      const issue: RemovedRefIssue = {
        file: "TemperInventory.lua",
        line: 12,
        col: 4,
        symbol: "AwesomeGuildStore",
        addon: "AwesomeGuildStore",
        hint: "ported to the Temper-native filter substrate",
      }
      const rendered = formatIssue(issue)
      expect(rendered).toContain("TemperInventory.lua:12:4")
      expect(rendered).toContain("[removed-addon-ref]")
      expect(rendered).toContain("AwesomeGuildStore")
    })
  })
})
