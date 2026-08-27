import { describe, expect, test } from "bun:test"
import {
  type AddonMarkerFacts,
  findMarkerIssues,
  findRawTableCalls,
  isScannableSourceFile,
} from "./ti-clean-source-zero.ts"
import { TERRITORY_MAP_PATH } from "./territory-map.ts"

function facts(over: Partial<AddonMarkerFacts> = {}): AddonMarkerFacts {
  return { addon: "TemperThing", tiClean: true, tiCleanBlocked: false, siteCount: 0, ...over }
}

describe("findRawTableCalls", () => {
  test("clean source with no table.* calls produces no issues", () => {
    expect(findRawTableCalls("const xs = [1, 2, 3]\nxs.push(4)\n", "a.ts")).toEqual([])
  })

  test("flags a table.insert call site", () => {
    const issues = findRawTableCalls("table.insert(xs, v)\n", "a.ts")
    expect(issues).toHaveLength(1)
    expect(issues[0]?.line).toBe(1)
    expect(issues[0]?.file).toBe("a.ts")
    expect(issues[0]?.message).toContain("table.insert")
  })

  test("flags a table.remove call site", () => {
    const issues = findRawTableCalls("const x = table.remove(xs, i)\n", "a.ts")
    expect(issues).toHaveLength(1)
    expect(issues[0]?.message).toContain("table.remove")
  })

  test("matches table.insert with whitespace before the paren", () => {
    expect(findRawTableCalls("table.insert (xs, v)\n", "a.ts")).toHaveLength(1)
  })

  test("does NOT flag a line-comment mention", () => {
    expect(findRawTableCalls("// converted from table.insert(xs, v)\n", "a.ts")).toEqual([])
  })

  test("does NOT flag a trailing line-comment mention after real code", () => {
    expect(findRawTableCalls("xs.push(v) // was table.insert(xs, v)\n", "a.ts")).toEqual([])
  })

  test("does NOT flag a block-comment mention (single line)", () => {
    expect(findRawTableCalls("/* table.insert(xs, v) */\n", "a.ts")).toEqual([])
  })

  test("does NOT flag a block-comment mention spanning lines", () => {
    const src = "const a = 1\n/*\n table.insert(xs, v)\n table.remove(xs, i)\n*/\nconst b = 2\n"
    expect(findRawTableCalls(src, "a.ts")).toEqual([])
  })

  test("still flags a real call on a line that also carries a trailing comment", () => {
    const issues = findRawTableCalls("table.insert(xs, v) // append\n", "a.ts")
    expect(issues).toHaveLength(1)
    expect(issues[0]?.line).toBe(1)
  })

  test("flags multiple call sites, sorted by line", () => {
    const src = "table.remove(xs, 1)\nconst y = 2\ntable.insert(xs, 3)\n"
    const issues = findRawTableCalls(src, "a.ts")
    expect(issues.map((i) => i.line)).toEqual([1, 3])
  })

  test("does NOT flag unrelated table identifiers", () => {
    expect(findRawTableCalls("myTable.insert(x)\nsortTable(xs)\n", "a.ts")).toEqual([])
  })
})

describe("findMarkerIssues", () => {
  test("a marked addon at source-zero is what the ratchet holds, and is no finding", () => {
    expect(findMarkerIssues([facts()])).toEqual([])
  })

  test("an addon standing at source-zero and unmarked is a finding", () => {
    const issues = findMarkerIssues([facts({ addon: "TemperEvents", tiClean: false })])
    expect(issues).toHaveLength(1)
    expect(issues[0]?.addon).toBe("TemperEvents")
    expect(issues[0]?.message).toContain("tiClean")
  })

  test("the finding sites on the territory map, which is where the repair goes", () => {
    const issues = findMarkerIssues([facts({ tiClean: false })])
    expect(issues[0]?.file).toBe(TERRITORY_MAP_PATH)
  })

  test("a tiCleanBlocked addon that reached source-zero carries a stale exemption", () => {
    const issues = findMarkerIssues([facts({ tiClean: false, tiCleanBlocked: true })])
    expect(issues).toHaveLength(1)
    expect(issues[0]?.message).toContain("tiCleanBlocked")
  })

  test("an unmarked addon holding sites is backlog, not a finding", () => {
    expect(findMarkerIssues([facts({ tiClean: false, siteCount: 62 })])).toEqual([])
  })

  test("a blocked addon still holding its site is not a finding", () => {
    expect(
      findMarkerIssues([facts({ tiClean: false, tiCleanBlocked: true, siteCount: 1 })])
    ).toEqual([])
  })

  test("a marked addon holding sites is left to the call-site rule", () => {
    expect(findMarkerIssues([facts({ siteCount: 1 })])).toEqual([])
  })

  test("a node marked both ways is a malformed ledger and raises", () => {
    expect(() => findMarkerIssues([facts({ tiCleanBlocked: true })])).toThrow(/mutually exclusive/)
  })

  test("findings are sorted by addon name", () => {
    const issues = findMarkerIssues([
      facts({ addon: "Zeta", tiClean: false }),
      facts({ addon: "Alpha", tiClean: false }),
    ])
    expect(issues.map((i) => i.addon)).toEqual(["Alpha", "Zeta"])
  })
})

describe("isScannableSourceFile", () => {
  test("accepts .ts and .tsx source", () => {
    expect(isScannableSourceFile("temper/addons-x/src/main.ts")).toBe(true)
    expect(isScannableSourceFile("temper/addons-x/src/ui.tsx")).toBe(true)
  })

  test("rejects test files", () => {
    expect(isScannableSourceFile("temper/addons-x/src/x.unit.test.ts")).toBe(false)
    expect(isScannableSourceFile("temper/addons-x/src/x.test.ts")).toBe(false)
    expect(isScannableSourceFile("temper/addons-x/src/x.test.tsx")).toBe(false)
  })

  test("rejects non-TS files", () => {
    expect(isScannableSourceFile("temper/addons-x/src/data.json")).toBe(false)
    expect(isScannableSourceFile("temper/addons-x/addon.json")).toBe(false)
  })

  test("rejects declaration files", () => {
    expect(isScannableSourceFile("temper/addons-x/src/other-api.d.ts")).toBe(false)
  })
})
