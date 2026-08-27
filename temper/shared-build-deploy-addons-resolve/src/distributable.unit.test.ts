import { describe, expect, test } from "bun:test"
import { type AddonDependencies, resolveDistributableSet } from "./distributable"

function roster(
  entries: Record<string, { dependsOn?: string[]; optionalDependsOn?: string[] }>
): ReadonlyMap<string, AddonDependencies> {
  return new Map(
    Object.entries(entries).map(([name, edges]) => [
      name,
      { dependsOn: edges.dependsOn ?? [], optionalDependsOn: edges.optionalDependsOn },
    ])
  )
}

describe("resolveDistributableSet", () => {
  test("every addon we build ships, whether or not anything depends on it", () => {
    const set = resolveDistributableSet(roster({ A: {}, B: {}, Lonely: {} }))
    expect(set.included).toEqual(["A", "B", "Lonely"])
    expect(set.external).toEqual([])
  })

  test("an addon added to the roster ships with no list edited anywhere", () => {
    const before = resolveDistributableSet(roster({ A: {} }))
    const after = resolveDistributableSet(roster({ A: {}, Newcomer: {} }))
    expect(before.included).toEqual(["A"])
    expect(after.included).toEqual(["A", "Newcomer"])
  })

  test("a dependency we do not build is external, never shipped", () => {
    const set = resolveDistributableSet(
      roster({ TemperInventory: { optionalDependsOn: ["TamrielTradeCentre"] } })
    )
    expect(set.included).toEqual(["TemperInventory"])
    expect(set.external).toEqual(["TamrielTradeCentre"])
  })

  test("a required dependency we do not build is external too", () => {
    const set = resolveDistributableSet(roster({ A: { dependsOn: ["Absent"] } }))
    expect(set.included).toEqual(["A"])
    expect(set.external).toEqual(["Absent"])
  })

  test("an external dependency's own name is never invented from a version suffix", () => {
    const set = resolveDistributableSet(roster({ A: { dependsOn: ["Missing>=100"] } }))
    expect(set.external).toEqual(["Missing"])
  })

  test("a versioned dependency on an addon we build is not external", () => {
    const set = resolveDistributableSet(
      roster({ TemperHud: { dependsOn: ["LibAddonMenu-2.0>=43"] }, "LibAddonMenu-2.0": {} })
    )
    expect(set.included).toEqual(["LibAddonMenu-2.0", "TemperHud"])
    expect(set.external).toEqual([])
  })

  test("one absent dependency named by two addons is reported once", () => {
    const set = resolveDistributableSet(
      roster({ A: { dependsOn: ["Absent"] }, B: { dependsOn: ["Absent>=3"] } })
    )
    expect(set.external).toEqual(["Absent"])
  })

  test("both answers are sorted, whatever order the roster was built in", () => {
    const forward = resolveDistributableSet(
      roster({ Zulu: { dependsOn: ["Nope"] }, Alpha: { dependsOn: ["Absent"] } })
    )
    const reversed = resolveDistributableSet(
      roster({ Alpha: { dependsOn: ["Absent"] }, Zulu: { dependsOn: ["Nope"] } })
    )
    expect(forward.included).toEqual(["Alpha", "Zulu"])
    expect(forward.external).toEqual(["Absent", "Nope"])
    expect(forward).toEqual(reversed)
  })

  test("an addon depending on itself ships once and is not external", () => {
    const set = resolveDistributableSet(roster({ A: { dependsOn: ["A"] } }))
    expect(set.included).toEqual(["A"])
    expect(set.external).toEqual([])
  })
})
