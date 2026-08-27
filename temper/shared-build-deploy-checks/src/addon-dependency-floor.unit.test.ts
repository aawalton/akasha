import { describe, expect, test } from "bun:test"
import {
  type AddonFloorInput,
  auditDependencyFloors,
  parseDependencyToken,
} from "./addon-dependency-floor"

describe("parseDependencyToken", () => {
  test("a bare name carries no floor", () => {
    expect(parseDependencyToken("TemperHud")).toEqual({ kind: "bare", provider: "TemperHud" })
  })

  test("parses a `>=` floor", () => {
    expect(parseDependencyToken("LibAddonMenu-2.0>=43")).toEqual({
      kind: "floor",
      provider: "LibAddonMenu-2.0",
      floor: 43,
    })
  })

  test("normalizes a zero-padded floor the manifest emitter would unpad", () => {
    expect(parseDependencyToken("LibShifterBox>=000700")).toEqual({
      kind: "floor",
      provider: "LibShifterBox",
      floor: 700,
    })
  })

  test("tolerates whitespace around the name and the constraint", () => {
    expect(parseDependencyToken("  LibGPS >= 73 ")).toEqual({
      kind: "floor",
      provider: "LibGPS",
      floor: 73,
    })
  })

  test("a non-`>=` comparator is unevaluable, never silently a floor", () => {
    expect(parseDependencyToken("LibFoo<=9")).toEqual({
      kind: "unevaluable",
      provider: "LibFoo",
      constraint: "<=9",
      reason: "comparator",
    })
    expect(parseDependencyToken("LibFoo=3")).toEqual({
      kind: "unevaluable",
      provider: "LibFoo",
      constraint: "=3",
      reason: "comparator",
    })
    expect(parseDependencyToken("LibFoo>5")).toEqual({
      kind: "unevaluable",
      provider: "LibFoo",
      constraint: ">5",
      reason: "comparator",
    })
  })

  test("a non-numeric `>=` version is unevaluable, never silently a floor", () => {
    expect(parseDependencyToken("LibFoo>=1.2")).toEqual({
      kind: "unevaluable",
      provider: "LibFoo",
      constraint: ">=1.2",
      reason: "version",
    })
    expect(parseDependencyToken("LibFoo>=")).toEqual({
      kind: "unevaluable",
      provider: "LibFoo",
      constraint: ">=",
      reason: "version",
    })
  })
})

describe("auditDependencyFloors", () => {
  test("floor equal to the shipped version is satisfied (zero headroom)", () => {
    const inputs: readonly AddonFloorInput[] = [
      {
        addonName: "TemperCrafting",
        addonVersion: 100,
        dependsOn: ["LibSets>=9020"],
        optionalDependsOn: [],
      },
      { addonName: "LibSets", addonVersion: 9020, dependsOn: [], optionalDependsOn: [] },
    ]
    const audit = auditDependencyFloors(inputs)
    expect(audit.violations).toEqual([])
    expect(audit.counts.satisfied).toBe(1)
    expect(audit.edges[0]).toEqual({
      status: "satisfied",
      consumer: "TemperCrafting",
      provider: "LibSets",
      directive: "dependsOn",
      raw: "LibSets>=9020",
      floor: 9020,
      shippedVersion: 9020,
    })
  })

  test("floor below the shipped version is satisfied (headroom)", () => {
    const inputs: readonly AddonFloorInput[] = [
      {
        addonName: "TemperCrafting",
        addonVersion: 100,
        dependsOn: ["LibShifterBox>=38"],
        optionalDependsOn: [],
      },
      { addonName: "LibShifterBox", addonVersion: 700, dependsOn: [], optionalDependsOn: [] },
    ]
    const audit = auditDependencyFloors(inputs)
    expect(audit.violations).toEqual([])
    expect(audit.counts.satisfied).toBe(1)
  })

  test("floor above the shipped version is a violation naming all four facts", () => {
    const inputs: readonly AddonFloorInput[] = [
      {
        addonName: "TemperCrafting",
        addonVersion: 100,
        dependsOn: ["LibSets>=9021"],
        optionalDependsOn: [],
      },
      { addonName: "LibSets", addonVersion: 9020, dependsOn: [], optionalDependsOn: [] },
    ]
    const audit = auditDependencyFloors(inputs)
    expect(audit.counts.violated).toBe(1)
    expect(audit.counts.satisfied).toBe(0)
    expect(audit.violations).toHaveLength(1)
    const v = audit.violations[0]
    expect(v?.consumer).toBe("TemperCrafting")
    expect(v?.provider).toBe("LibSets")
    expect(v?.floor).toBe(9021)
    expect(v?.shippedVersion).toBe(9020)
    expect(v?.message).toContain("TemperCrafting")
    expect(v?.message).toContain("LibSets")
    expect(v?.message).toContain("9021")
    expect(v?.message).toContain("9020")
  })

  test("a required-floor refusal names `dependsOn` and ESO's documented load refusal", () => {
    const inputs: readonly AddonFloorInput[] = [
      {
        addonName: "TemperCrafting",
        addonVersion: 100,
        dependsOn: ["LibSets>=9021"],
        optionalDependsOn: [],
      },
      { addonName: "LibSets", addonVersion: 9020, dependsOn: [], optionalDependsOn: [] },
    ]
    const v = auditDependencyFloors(inputs).violations[0]
    expect(v?.directive).toBe("dependsOn")
    expect(v?.message).toContain("via `dependsOn`")
    expect(v?.message).toContain("refuses to load TemperCrafting")
  })

  test("an optional floor is audited, and its refusal claims no load-time consequence", () => {
    const inputs: readonly AddonFloorInput[] = [
      {
        addonName: "TemperCrafting",
        addonVersion: 100,
        dependsOn: [],
        optionalDependsOn: ["LibSets>=9021"],
      },
      { addonName: "LibSets", addonVersion: 9020, dependsOn: [], optionalDependsOn: [] },
    ]
    const audit = auditDependencyFloors(inputs)
    expect(audit.counts.violated).toBe(1)
    const v = audit.violations[0]
    expect(v?.directive).toBe("optionalDependsOn")
    expect(v?.message).toContain("via `optionalDependsOn`")
    expect(v?.message).toContain("not established here")
    expect(v?.message).not.toContain("refuses to load")
  })

  test("both lists are audited, each edge carrying the directive that declared it", () => {
    const inputs: readonly AddonFloorInput[] = [
      {
        addonName: "TemperCrafting",
        addonVersion: 100,
        dependsOn: ["LibSets>=9020"],
        optionalDependsOn: ["LibGPS>=73"],
      },
      { addonName: "LibSets", addonVersion: 9020, dependsOn: [], optionalDependsOn: [] },
      { addonName: "LibGPS", addonVersion: 73, dependsOn: [], optionalDependsOn: [] },
    ]
    const audit = auditDependencyFloors(inputs)
    expect(audit.counts.satisfied).toBe(2)
    expect(audit.edges.map((e) => [e.provider, e.directive])).toEqual([
      ["LibSets", "dependsOn"],
      ["LibGPS", "optionalDependsOn"],
    ])
  })

  test("a bare dependency name is `no-floor`, never counted as satisfied", () => {
    const inputs: readonly AddonFloorInput[] = [
      {
        addonName: "TemperCrafting",
        addonVersion: 100,
        dependsOn: ["TemperHud"],
        optionalDependsOn: [],
      },
      { addonName: "TemperHud", addonVersion: 100, dependsOn: [], optionalDependsOn: [] },
    ]
    const audit = auditDependencyFloors(inputs)
    expect(audit.counts["no-floor"]).toBe(1)
    expect(audit.counts.satisfied).toBe(0)
    expect(audit.counts.violated).toBe(0)
    expect(audit.edges[0]?.status).toBe("no-floor")
  })

  test("a floor against a provider outside the fleet is unverifiable, never satisfied", () => {
    const inputs: readonly AddonFloorInput[] = [
      {
        addonName: "TemperListings",
        addonVersion: 100,
        dependsOn: ["MasterMerchant>=999999"],
        optionalDependsOn: [],
      },
    ]
    const audit = auditDependencyFloors(inputs)
    expect(audit.counts["unverifiable-external"]).toBe(1)
    expect(audit.counts.satisfied).toBe(0)
    expect(audit.counts.violated).toBe(0)
    expect(audit.violations).toEqual([])
    expect(audit.edges[0]).toEqual({
      status: "unverifiable-external",
      consumer: "TemperListings",
      provider: "MasterMerchant",
      directive: "dependsOn",
      raw: "MasterMerchant>=999999",
      floor: 999999,
    })
  })

  test("a non-`>=` constraint is unverifiable, never coerced to a `>=` comparison", () => {
    const inputs: readonly AddonFloorInput[] = [
      {
        addonName: "TemperCrafting",
        addonVersion: 100,
        dependsOn: ["LibSets<=9019"],
        optionalDependsOn: [],
      },
      { addonName: "LibSets", addonVersion: 9020, dependsOn: [], optionalDependsOn: [] },
    ]
    const audit = auditDependencyFloors(inputs)
    expect(audit.counts["unverifiable-constraint"]).toBe(1)
    expect(audit.counts.satisfied).toBe(0)
    expect(audit.counts.violated).toBe(0)
    expect(audit.edges[0]).toEqual({
      status: "unverifiable-constraint",
      consumer: "TemperCrafting",
      provider: "LibSets",
      directive: "dependsOn",
      raw: "LibSets<=9019",
      constraint: "<=9019",
      reason: "comparator",
    })
  })

  test("a zero-padded floor compares against the unpadded shipped version", () => {
    const inputs: readonly AddonFloorInput[] = [
      {
        addonName: "TemperCrafting",
        addonVersion: 100,
        dependsOn: ["LibShifterBox>=000700"],
        optionalDependsOn: [],
      },
      { addonName: "LibShifterBox", addonVersion: 700, dependsOn: [], optionalDependsOn: [] },
    ]
    const audit = auditDependencyFloors(inputs)
    expect(audit.violations).toEqual([])
    expect(audit.counts.satisfied).toBe(1)
  })

  test("differing upstream numbering schemes compare numerically, not by scheme", () => {
    const inputs: readonly AddonFloorInput[] = [
      {
        addonName: "TemperCrafting",
        addonVersion: 100,
        dependsOn: ["LibMainMenu-2.0>=432"],
        optionalDependsOn: [],
      },
      { addonName: "LibMainMenu-2.0", addonVersion: 40500, dependsOn: [], optionalDependsOn: [] },
    ]
    expect(auditDependencyFloors(inputs).violations).toEqual([])
  })

  test("empty and whitespace-only dependency tokens produce no edge", () => {
    const inputs: readonly AddonFloorInput[] = [
      {
        addonName: "TemperCrafting",
        addonVersion: 100,
        dependsOn: ["", "   "],
        optionalDependsOn: [],
      },
    ]
    const audit = auditDependencyFloors(inputs)
    expect(audit.edges).toEqual([])
  })

  test("violations are sorted for stable output", () => {
    const inputs: readonly AddonFloorInput[] = [
      { addonName: "Zeta", addonVersion: 1, dependsOn: ["LibA>=2"], optionalDependsOn: [] },
      { addonName: "Alpha", addonVersion: 1, dependsOn: ["LibA>=3"], optionalDependsOn: [] },
      { addonName: "LibA", addonVersion: 1, dependsOn: [], optionalDependsOn: [] },
    ]
    const audit = auditDependencyFloors(inputs)
    expect(audit.violations.map((v) => v.consumer)).toEqual(["Alpha", "Zeta"])
  })

  test("sum invariant: every edge lands in exactly one status bucket", () => {
    const inputs: readonly AddonFloorInput[] = [
      {
        addonName: "TemperCrafting",
        addonVersion: 100,
        dependsOn: [
          "LibSets>=9020",
          "LibSets>=9021",
          "TemperHud",
          "MasterMerchant>=1",
          "LibSets<=1",
        ],
        optionalDependsOn: [],
      },
      { addonName: "LibSets", addonVersion: 9020, dependsOn: [], optionalDependsOn: [] },
      { addonName: "TemperHud", addonVersion: 100, dependsOn: [], optionalDependsOn: [] },
    ]
    const audit = auditDependencyFloors(inputs)
    const total = Object.values(audit.counts).reduce((a, b) => a + b, 0)
    expect(total).toBe(audit.edges.length)
    expect(audit.edges).toHaveLength(5)
    expect(audit.counts).toEqual({
      satisfied: 1,
      violated: 1,
      "unverifiable-external": 1,
      "unverifiable-constraint": 1,
      "no-floor": 1,
    })
  })

  test("violations are the projection of exactly the `violated` edges", () => {
    const inputs: readonly AddonFloorInput[] = [
      {
        addonName: "A",
        addonVersion: 1,
        dependsOn: ["LibA>=2", "LibA>=1", "Ext>=9"],
        optionalDependsOn: [],
      },
      { addonName: "LibA", addonVersion: 1, dependsOn: [], optionalDependsOn: [] },
    ]
    const audit = auditDependencyFloors(inputs)
    expect(audit.violations).toHaveLength(audit.edges.filter((e) => e.status === "violated").length)
    expect(audit.violations.length).toBe(audit.counts.violated)
  })
})
