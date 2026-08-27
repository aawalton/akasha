import { describe, expect, test } from "bun:test"
import {
  findTestBearingRoots,
  generateTestSteps,
  groupTestFilesByType,
  TEST_ESCAPE_HATCH_DISPATCH_NODES,
} from "./test-step-paths.ts"

describe("findTestBearingRoots", () => {
  const workspaces = [
    "packages/shared/pages/access",
    "packages/shared/pages/core",
    "packages/temper/codec",
    "packages/infra/ci/orchestrator",
  ]

  test("assigns a test file to the containing workspace", () => {
    const roots = findTestBearingRoots(
      ["packages/shared/pages/access/src/foo.unit.test.ts"],
      workspaces
    )
    expect(roots).toEqual(["packages/shared/pages/access"])
  })

  test("dedupes multiple test files from the same workspace", () => {
    const roots = findTestBearingRoots(
      [
        "packages/temper/codec/src/a.unit.test.ts",
        "packages/temper/codec/src/b.unit.test.ts",
        "packages/temper/codec/src/c.unit.test.ts",
      ],
      workspaces
    )
    expect(roots).toEqual(["packages/temper/codec"])
  })

  test("handles multiple workspaces at once and returns sorted unique roots", () => {
    const roots = findTestBearingRoots(
      [
        "packages/infra/ci/orchestrator/src/dispatcher/x.unit.test.ts",
        "packages/temper/codec/src/a.unit.test.ts",
        "packages/shared/pages/core/src/b.unit.test.ts",
      ],
      workspaces
    )
    expect(roots).toEqual([
      "packages/infra/ci/orchestrator",
      "packages/shared/pages/core",
      "packages/temper/codec",
    ])
  })

  test("nested workspaces: longest matching prefix wins", () => {
    const nested = ["packages/shared", "packages/shared/pages/access"]
    const roots = findTestBearingRoots(
      ["packages/shared/pages/access/src/foo.unit.test.ts"],
      nested
    )
    expect(roots).toEqual(["packages/shared/pages/access"])
  })

  test("drops test files that fall outside every workspace root", () => {
    const roots = findTestBearingRoots(
      ["packages/elsewhere/foo.unit.test.ts", "packages/temper/codec/src/a.unit.test.ts"],
      workspaces
    )
    expect(roots).toEqual(["packages/temper/codec"])
  })
})

describe("groupTestFilesByType", () => {
  test("buckets each file by its test-type suffix", () => {
    expect(
      groupTestFilesByType([
        "packages/a/src/x.unit.test.ts",
        "packages/a/src/y.property.test.ts",
        "packages/a/src/z.component.test.tsx",
      ])
    ).toEqual({
      unit: ["packages/a/src/x.unit.test.ts"],
      property: ["packages/a/src/y.property.test.ts"],
      component: ["packages/a/src/z.component.test.tsx"],
    })
  })

  test("handles `.test.ts` and `.test.tsx` for every type", () => {
    const grouped = groupTestFilesByType([
      "packages/a/x.unit.test.ts",
      "packages/a/x.unit.test.tsx",
      "packages/a/x.property.test.ts",
      "packages/a/x.property.test.tsx",
      "packages/a/x.component.test.ts",
      "packages/a/x.component.test.tsx",
    ])
    expect(grouped.unit).toEqual(["packages/a/x.unit.test.ts", "packages/a/x.unit.test.tsx"])
    expect(grouped.property).toEqual([
      "packages/a/x.property.test.ts",
      "packages/a/x.property.test.tsx",
    ])
    expect(grouped.component).toEqual([
      "packages/a/x.component.test.ts",
      "packages/a/x.component.test.tsx",
    ])
  })

  test("returns empty arrays for absent types", () => {
    expect(groupTestFilesByType(["packages/a/x.unit.test.ts"])).toEqual({
      unit: ["packages/a/x.unit.test.ts"],
      property: [],
      component: [],
    })
  })

  test("ignores non-CI suffixes (database, cli, smoke, browser, plain)", () => {
    const grouped = groupTestFilesByType([
      "packages/a/x.unit.test.ts",
      "packages/a/x.database.test.ts",
      "packages/a/x.cli.test.ts",
      "packages/a/x.smoke.test.ts",
      "packages/a/x.browser.test.ts",
      "packages/a/x.test.ts",
      "packages/a/x.ts",
    ])
    expect(grouped).toEqual({
      unit: ["packages/a/x.unit.test.ts"],
      property: [],
      component: [],
    })
  })

  test("returns sorted lists within each bucket", () => {
    const grouped = groupTestFilesByType([
      "packages/z/x.unit.test.ts",
      "packages/a/x.unit.test.ts",
      "packages/m/x.unit.test.ts",
    ])
    expect(grouped.unit).toEqual([
      "packages/a/x.unit.test.ts",
      "packages/m/x.unit.test.ts",
      "packages/z/x.unit.test.ts",
    ])
  })
})

describe("generateTestSteps", () => {
  const closure = new Map<string, Set<string>>([
    ["packages/a", new Set(["packages/a"])],
    ["packages/b", new Set(["packages/b"])],
    ["packages/c", new Set(["packages/c"])],
  ])
  const rootToName = new Map<string, string>([
    ["packages/a", "@scope/a"],
    ["packages/b", "@scope/b"],
    ["packages/c", "@scope/c"],
  ])
  const workspaceRoots = ["packages/a", "packages/b", "packages/c"]

  test("emits one step per non-empty test-type bucket", () => {
    const steps = generateTestSteps({
      testsByType: {
        unit: ["packages/a/x.unit.test.ts"],
        property: [],
        component: ["packages/b/x.component.test.tsx"],
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
        unit: ["packages/a/x.unit.test.ts"],
        property: ["packages/a/x.property.test.ts"],
        component: ["packages/a/x.component.test.tsx"],
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
        component: ["packages/a/x.component.test.tsx"],
        unit: ["packages/a/x.unit.test.ts"],
        property: ["packages/a/x.property.test.ts"],
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
          "packages/c/x.unit.test.ts",
          "packages/a/x.unit.test.ts",
          "packages/a/y.unit.test.ts",
          "packages/b/x.unit.test.ts",
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
    expect(unit.testBearingRoots).toEqual(["packages/a", "packages/b", "packages/c"])
  })

  test("dispatchNodes contain a package seed for every workspace in testBearingRoots", () => {
    const steps = generateTestSteps({
      testsByType: {
        unit: ["packages/a/x.unit.test.ts", "packages/b/x.unit.test.ts"],
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
      ["packages/a", new Set(["packages/a", "packages/dep1", "packages/dep2"])],
    ])
    const namesWithDeps = new Map<string, string>([
      ["packages/a", "@scope/a"],
      ["packages/dep1", "@scope/dep1"],
      ["packages/dep2", "@scope/dep2"],
    ])
    const steps = generateTestSteps({
      testsByType: {
        unit: ["packages/a/x.unit.test.ts"],
        property: [],
        component: [],
      },
      workspaceRoots: ["packages/a", "packages/dep1", "packages/dep2"],
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
        unit: ["packages/a/x.unit.test.ts"],
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
      ["packages/a", new Set(["packages/a", "packages/dep1"])],
      ["packages/b", new Set(["packages/b", "packages/dep1", "packages/dep2"])],
    ])
    const namesWithOverlap = new Map<string, string>([
      ["packages/a", "@scope/a"],
      ["packages/b", "@scope/b"],
      ["packages/dep1", "@scope/dep1"],
      ["packages/dep2", "@scope/dep2"],
    ])
    const steps = generateTestSteps({
      testsByType: {
        unit: ["packages/a/x.unit.test.ts", "packages/b/x.unit.test.ts"],
        property: [],
        component: [],
      },
      workspaceRoots: ["packages/a", "packages/b", "packages/dep1", "packages/dep2"],
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
        unit: ["packages/a/x.unit.test.ts"],
        property: ["packages/b/x.property.test.ts"],
        component: ["packages/c/x.component.test.tsx"],
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
        unit: ["packages/a/x.unit.test.ts", "packages/unnamed/x.unit.test.ts"],
        property: [],
        component: [],
      },
      workspaceRoots: ["packages/a", "packages/unnamed"],
      closure: new Map([
        ["packages/a", new Set(["packages/a"])],
        ["packages/unnamed", new Set(["packages/unnamed"])],
      ]),
      rootToName: new Map([["packages/a", "@scope/a"]]),
    })
    const [unit] = steps
    if (unit === undefined) throw new Error("expected unit step")
    expect(unit.testBearingRoots).toEqual(["packages/a"])
    expect(unit.dispatchNodes).toContain("package:code:@scope/a")
    expect(unit.dispatchNodes.some((n) => n.includes("unnamed"))).toBe(false)
  })
})
