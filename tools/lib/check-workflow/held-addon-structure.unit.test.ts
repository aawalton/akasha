import { describe, expect, test } from "bun:test"
import { type AddonStructureFacts, scanAddonStructure } from "./held-addon-structure.ts"

const clean: AddonStructureFacts = {
  addon: "TemperCompanions",
  rosterDir: "temper/game-companions-addon",
  mapPackageDir: "temper/game-companions-addon",
  generatedFiles: ["temper/game-companions-addon/src/generated/skills.generated.ts"],
}

describe("scanAddonStructure", () => {
  test("a conformant addon on both the roster and the map produces no issues", () => {
    expect(scanAddonStructure([clean])).toEqual([])
  })

  test("flags a generated file outside a generated/ directory, at that file", () => {
    const stray = "temper/game-companions-addon/src/skills.generated.ts"
    const issues = scanAddonStructure([{ ...clean, generatedFiles: [stray] }])
    expect(issues).toHaveLength(1)
    expect(issues[0]?.file).toBe(stray)
  })

  test("does NOT flag a generated file nested under generated/", () => {
    const issues = scanAddonStructure([
      {
        ...clean,
        generatedFiles: ["temper/game-companions-addon/src/generated/deep/x.generated.ts"],
      },
    ])
    expect(issues).toEqual([])
  })

  test("a map entry pointing elsewhere is flagged, naming both the map's path and the real one", () => {
    const issues = scanAddonStructure([
      { ...clean, mapPackageDir: "temper/addons-companions" },
    ])
    expect(issues).toHaveLength(1)
    expect(issues[0]?.file).toBe("temper/addons-companions")
    expect(issues[0]?.message).toContain("temper/addons-companions")
    expect(issues[0]?.message).toContain("temper/game-companions-addon")
  })

  test("a map entry for an addon the roster does not discover is flagged as stale", () => {
    const issues = scanAddonStructure([
      {
        addon: "TemperGhost",
        rosterDir: null,
        mapPackageDir: "temper/addons-ghost",
        generatedFiles: [],
      },
    ])
    expect(issues).toHaveLength(1)
    expect(issues[0]?.file).toBe("temper/addons-ghost")
    expect(issues[0]?.message).toContain("stale")
  })

  test("an addon on the roster and off the map is judged, and its absence is not a finding", () => {
    const offMap: AddonStructureFacts = {
      addon: "TemperSales",
      rosterDir: "temper/shared-capture-sales-addon",
      mapPackageDir: null,
      generatedFiles: [],
    }
    expect(scanAddonStructure([offMap])).toEqual([])
    const stray = "temper/shared-capture-sales-addon/src/ids.generated.ts"
    const issues = scanAddonStructure([{ ...offMap, generatedFiles: [stray] }])
    expect(issues).toHaveLength(1)
    expect(issues[0]?.addon).toBe("TemperSales")
    expect(issues[0]?.file).toBe(stray)
  })

  test("raises on a member neither source contributed rather than passing it over", () => {
    expect(() =>
      scanAddonStructure([
        { addon: "TemperNowhere", rosterDir: null, mapPackageDir: null, generatedFiles: [] },
      ])
    ).toThrow("neither a roster directory nor a map entry")
  })

  test("reports issues sorted by addon then file", () => {
    const issues = scanAddonStructure([
      { ...clean, addon: "ZAddon", mapPackageDir: "z" },
      { ...clean, addon: "AAddon", mapPackageDir: "a" },
    ])
    expect(issues.map((i) => i.addon)).toEqual(["AAddon", "ZAddon"])
  })

  test("an empty fact set produces no issues", () => {
    expect(scanAddonStructure([])).toEqual([])
  })
})
