import { describe, expect, test } from "bun:test"
import {
  findTestBearingRoots,
  generateTestSteps,
  groupTestFilesByType,
  TEST_ESCAPE_HATCH_DISPATCH_NODES,
} from "./test-step-paths.ts"

describe("findTestBearingRoots", () => {
  const workspaces = [
    "shared/pages-access",
    "shared/pages-core",
    "temper/catalog-core",
    "infra/ci-workflows",
  ]

  test("assigns a test file to the containing workspace", () => {
    const roots = findTestBearingRoots(
      ["shared/pages-access/src/foo.unit.test.ts"],
      workspaces
    )
    expect(roots).toEqual(["shared/pages-access"])
  })

  test("dedupes multiple test files from the same workspace", () => {
    const roots = findTestBearingRoots(
      [
        "temper/catalog-core/src/a.unit.test.ts",
        "temper/catalog-core/src/b.unit.test.ts",
        "temper/catalog-core/src/c.unit.test.ts",
      ],
      workspaces
    )
    expect(roots).toEqual(["temper/catalog-core"])
  })

  test("handles multiple workspaces at once and returns sorted unique roots", () => {
    const roots = findTestBearingRoots(
      [
        "infra/ci-workflows/src/dispatcher/x.unit.test.ts",
        "temper/catalog-core/src/a.unit.test.ts",
        "shared/pages-core/src/b.unit.test.ts",
      ],
      workspaces
    )
    expect(roots).toEqual([
      "infra/ci-workflows",
      "shared/pages-core",
      "temper/catalog-core",
    ])
  })

  test("nested workspaces: longest matching prefix wins", () => {
    const nested = ["shared", "shared/pages-access"]
    const roots = findTestBearingRoots(
      ["shared/pages-access/src/foo.unit.test.ts"],
      nested
    )
    expect(roots).toEqual(["shared/pages-access"])
  })

  test("drops test files that fall outside every workspace root", () => {
    const roots = findTestBearingRoots(
      ["elsewhere/foo.unit.test.ts", "temper/catalog-core/src/a.unit.test.ts"],
      workspaces
    )
    expect(roots).toEqual(["temper/catalog-core"])
  })
})

describe("groupTestFilesByType", () => {
  test("buckets each file by its test-type suffix", () => {
    expect(
      groupTestFilesByType([
        "shared/a/src/x.unit.test.ts",
        "shared/a/src/y.property.test.ts",
        "shared/a/src/z.component.test.tsx",
      ])
    ).toEqual({
      unit: ["shared/a/src/x.unit.test.ts"],
      property: ["shared/a/src/y.property.test.ts"],
      component: ["shared/a/src/z.component.test.tsx"],
    })
  })

  test("handles `.test.ts` and `.test.tsx` for every type", () => {
    const grouped = groupTestFilesByType([
      "shared/a/x.unit.test.ts",
      "shared/a/x.unit.test.tsx",
      "shared/a/x.property.test.ts",
      "shared/a/x.property.test.tsx",
      "shared/a/x.component.test.ts",
      "shared/a/x.component.test.tsx",
    ])
    expect(grouped.unit).toEqual(["shared/a/x.unit.test.ts", "shared/a/x.unit.test.tsx"])
    expect(grouped.property).toEqual([
      "shared/a/x.property.test.ts",
      "shared/a/x.property.test.tsx",
    ])
    expect(grouped.component).toEqual([
      "shared/a/x.component.test.ts",
      "shared/a/x.component.test.tsx",
    ])
  })

  test("returns empty arrays for absent types", () => {
    expect(groupTestFilesByType(["shared/a/x.unit.test.ts"])).toEqual({
      unit: ["shared/a/x.unit.test.ts"],
      property: [],
      component: [],
    })
  })

  test("ignores non-CI suffixes (database, cli, smoke, browser, plain)", () => {
    const grouped = groupTestFilesByType([
      "shared/a/x.unit.test.ts",
      "shared/a/x.database.test.ts",
      "shared/a/x.cli.test.ts",
      "shared/a/x.smoke.test.ts",
      "shared/a/x.browser.test.ts",
      "shared/a/x.test.ts",
      "shared/a/x.ts",
    ])
    expect(grouped).toEqual({
      unit: ["shared/a/x.unit.test.ts"],
      property: [],
      component: [],
    })
  })

  test("returns sorted lists within each bucket", () => {
    const grouped = groupTestFilesByType([
      "shared/z/x.unit.test.ts",
      "shared/a/x.unit.test.ts",
      "shared/m/x.unit.test.ts",
    ])
    expect(grouped.unit).toEqual([
      "shared/a/x.unit.test.ts",
      "shared/m/x.unit.test.ts",
      "shared/z/x.unit.test.ts",
    ])
  })
})

describe("generateTestSteps", () => {
  const closure = new Map<string, Set<string>>([
    ["shared/a", new Set(["shared/a"])],
    ["shared/b", new Set(["shared/b"])],
    ["shared/c", new Set(["shared/c"])],
  ])
  const rootToName = new Map<string, string>([
    ["shared/a", "@scope/a"],
    ["shared/b", "@scope/b"],
    ["shared/c", "@scope/c"],
  ])
  const workspaceRoots = ["shared/a", "shared/b", "shared/c"]

  test("emits one step per non-empty test-type bucket", () => {
    const steps = generateTestSteps({
      testsByType: {
        unit: ["shared/a/x.unit.test.ts"],
        property: [],
        component: ["shared/b/x.component.test.tsx"],
      },
      workspaceRoots,
      closure,
      rootToName,
    })
    expect(steps).toHaveLength(2)
    expect(steps.map((s) => s.testType)).toEqual(["unit", "component"])
  })

  test("emits zero steps when every bucket is empty", () => {
    const steps = generateTestSteps({
      testsByType: { unit: [], property: [], component: [] },
      workspaceRoots,
      closure,
      rootToName,
    })
    expect(steps).toEqual([])
  })

  test("step name is `<testType>-tests`", () => {
    const steps = generateTestSteps({
      testsByType: {
        unit: ["shared/a/x.unit.test.ts"],
        property: ["shared/a/x.property.test.ts"],
        component: ["shared/a/x.component.test.tsx"],
      },
      workspaceRoots,
      closure,
      rootToName,
    })
    expect(steps.map((s) => s.name)).toEqual(["unit-tests", "property-tests", "component-tests"])
  })

  test("steps appear in canonical order: unit → property → component", () => {
    const steps = generateTestSteps({
      testsByType: {
        component: ["shared/a/x.component.test.tsx"],
        unit: ["shared/a/x.unit.test.ts"],
        property: ["shared/a/x.property.test.ts"],
      },
      workspaceRoots,
      closure,
      rootToName,
    })
    expect(steps.map((s) => s.testType)).toEqual(["unit", "property", "component"])
  })

  test("step.testBearingRoots is sorted and deduped", () => {
    const steps = generateTestSteps({
      testsByType: {
        unit: [
          "shared/c/x.unit.test.ts",
          "shared/a/x.unit.test.ts",
          "shared/a/y.unit.test.ts",
          "shared/b/x.unit.test.ts",
        ],
        property: [],
        component: [],
      },
      workspaceRoots,
      closure,
      rootToName,
    })
    const [unit] = steps
    if (unit === undefined) throw new Error("expected unit step")
    expect(unit.testBearingRoots).toEqual(["shared/a", "shared/b", "shared/c"])
  })

  test("dispatchNodes contain a package seed for every workspace in testBearingRoots", () => {
    const steps = generateTestSteps({
      testsByType: {
        unit: ["shared/a/x.unit.test.ts", "shared/b/x.unit.test.ts"],
        property: [],
        component: [],
      },
      workspaceRoots,
      closure,
      rootToName,
    })
    const [unit] = steps
    if (unit === undefined) throw new Error("expected unit step")
    expect(unit.dispatchNodes).toContain("package:code:@scope/a")
    expect(unit.dispatchNodes).toContain("package:code:@scope/b")
  })

  test("dispatchNodes contain a package seed for every transitive workspace-dep closure entry", () => {
    const closureWithDeps = new Map<string, Set<string>>([
      ["shared/a", new Set(["shared/a", "shared/dep1", "shared/dep2"])],
    ])
    const namesWithDeps = new Map<string, string>([
      ["shared/a", "@scope/a"],
      ["shared/dep1", "@scope/dep1"],
      ["shared/dep2", "@scope/dep2"],
    ])
    const steps = generateTestSteps({
      testsByType: {
        unit: ["shared/a/x.unit.test.ts"],
        property: [],
        component: [],
      },
      workspaceRoots: ["shared/a", "shared/dep1", "shared/dep2"],
      closure: closureWithDeps,
      rootToName: namesWithDeps,
    })
    const [unit] = steps
    if (unit === undefined) throw new Error("expected unit step")
    expect(unit.dispatchNodes).toContain("package:code:@scope/a")
    expect(unit.dispatchNodes).toContain("package:code:@scope/dep1")
    expect(unit.dispatchNodes).toContain("package:code:@scope/dep2")
  })

  test("dispatchNodes contain every escape-hatch entry at the tail in canonical order", () => {
    const steps = generateTestSteps({
      testsByType: {
        unit: ["shared/a/x.unit.test.ts"],
        property: [],
        component: [],
      },
      workspaceRoots,
      closure,
      rootToName,
    })
    const [unit] = steps
    if (unit === undefined) throw new Error("expected unit step")
    const tail = unit.dispatchNodes.slice(-TEST_ESCAPE_HATCH_DISPATCH_NODES.length)
    expect(tail).toEqual([...TEST_ESCAPE_HATCH_DISPATCH_NODES])
  })

  test("package seeds are sorted and unique across the union", () => {
    const closureWithOverlap = new Map<string, Set<string>>([
      ["shared/a", new Set(["shared/a", "shared/dep1"])],
      ["shared/b", new Set(["shared/b", "shared/dep1", "shared/dep2"])],
    ])
    const namesWithOverlap = new Map<string, string>([
      ["shared/a", "@scope/a"],
      ["shared/b", "@scope/b"],
      ["shared/dep1", "@scope/dep1"],
      ["shared/dep2", "@scope/dep2"],
    ])
    const steps = generateTestSteps({
      testsByType: {
        unit: ["shared/a/x.unit.test.ts", "shared/b/x.unit.test.ts"],
        property: [],
        component: [],
      },
      workspaceRoots: ["shared/a", "shared/b", "shared/dep1", "shared/dep2"],
      closure: closureWithOverlap,
      rootToName: namesWithOverlap,
    })
    const [unit] = steps
    if (unit === undefined) throw new Error("expected unit step")
    const packageSeeds = unit.dispatchNodes.filter((s) => s.startsWith("package:code:"))
    const escapeHatchPackages = TEST_ESCAPE_HATCH_DISPATCH_NODES.filter((n) =>
      n.startsWith("package:code:")
    )
    const dedupedNonHatch = packageSeeds.filter((s) => !escapeHatchPackages.includes(s))
    expect(dedupedNonHatch).toEqual([...dedupedNonHatch].sort())
    expect(new Set(dedupedNonHatch).size).toBe(dedupedNonHatch.length)
    expect(dedupedNonHatch).toEqual([
      "package:code:@scope/a",
      "package:code:@scope/b",
      "package:code:@scope/dep1",
      "package:code:@scope/dep2",
    ])
  })

  test("invariant: every emitted step's dispatchNodes is a superset of TEST_ESCAPE_HATCH_DISPATCH_NODES", () => {
    const steps = generateTestSteps({
      testsByType: {
        unit: ["shared/a/x.unit.test.ts"],
        property: ["shared/b/x.property.test.ts"],
        component: ["shared/c/x.component.test.tsx"],
      },
      workspaceRoots,
      closure,
      rootToName,
    })
    for (const step of steps) {
      for (const hatch of TEST_ESCAPE_HATCH_DISPATCH_NODES) {
        expect(step.dispatchNodes).toContain(hatch)
      }
    }
  })

  test("test-bearing workspaces with no name in rootToName contribute neither testBearingRoots nor seeds", () => {
    const steps = generateTestSteps({
      testsByType: {
        unit: ["shared/a/x.unit.test.ts", "shared/unnamed/x.unit.test.ts"],
        property: [],
        component: [],
      },
      workspaceRoots: ["shared/a", "shared/unnamed"],
      closure: new Map([
        ["shared/a", new Set(["shared/a"])],
        ["shared/unnamed", new Set(["shared/unnamed"])],
      ]),
      rootToName: new Map([["shared/a", "@scope/a"]]),
    })
    const [unit] = steps
    if (unit === undefined) throw new Error("expected unit step")
    expect(unit.testBearingRoots).toEqual(["shared/a"])
    expect(unit.dispatchNodes).toContain("package:code:@scope/a")
    expect(unit.dispatchNodes.some((n) => n.includes("unnamed"))).toBe(false)
  })
})
