import { describe, expect, test } from "bun:test"
import { validateExcludeShape, validateNestedPackageContainment } from "../../../infra/cluster-checks/src/lib/tsconfig-source-layout.ts"

describe("validateExcludeShape", () => {
  const WS = "scope/lib"

  test("the bare prefix is canonical", () => {
    expect(validateExcludeShape(WS, { exclude: ["node_modules", "dist"] })).toBeNull()
  })

  test("every stated test pattern may follow the prefix", () => {
    expect(
      validateExcludeShape(WS, {
        exclude: ["node_modules", "dist", "**/*.test.ts", "**/*.test.tsx", "tests/**/*"],
      })
    ).toBeNull()
  })

  test("a missing exclude passes — excluding nothing drops nothing", () => {
    expect(validateExcludeShape(WS, {})).toBeNull()
  })

  test("an explicitly undefined exclude passes on the same warrant", () => {
    expect(validateExcludeShape(WS, { exclude: undefined })).toBeNull()
  })

  test("an empty exclude array must still carry the prefix", () => {
    expect(validateExcludeShape(WS, { exclude: [] })?.rule).toBe("excludeShape")
  })

  test("a non-array exclude is a violation rather than a crash, and names the required opening", () => {
    const result = validateExcludeShape(WS, { exclude: "dist" })
    expect(result?.rule).toBe("excludeShape")
    expect(result?.message).toContain("node_modules")
  })

  test("a null exclude is a malformed field rather than an absent one", () => {
    expect(validateExcludeShape(WS, { exclude: null })?.rule).toBe("excludeShape")
  })

  test("the prefix is ORDERED — the same two spellings reversed are refused", () => {
    expect(validateExcludeShape(WS, { exclude: ["dist", "node_modules"] })?.rule).toBe(
      "excludeShape"
    )
  })

  test("a prefix that is merely present rather than leading is refused", () => {
    expect(validateExcludeShape(WS, { exclude: ["build", "node_modules", "dist"] })?.rule).toBe(
      "excludeShape"
    )
  })

  test.each([
    ["cli/src"],
    ["postgres/gfs-promoter/src"],
    ["scripts/**/*.ts"],
    ["src/generated"],
  ])("a non-test source path after the prefix is refused, and the message names it: %s", (offender) => {
    const result = validateExcludeShape(WS, { exclude: ["node_modules", "dist", offender] })
    expect(result?.rule).toBe("excludeShape")
    expect(result?.message).toContain(offender)
  })

  test("a stated pattern beside an unstated one does not excuse the unstated one", () => {
    const result = validateExcludeShape(WS, {
      exclude: ["node_modules", "dist", "**/*.test.ts", "src/secret.ts"],
    })
    expect(result?.rule).toBe("excludeShape")
    expect(result?.message).toContain("src/secret.ts")
  })

  test("a non-string element after the prefix is refused rather than passed over", () => {
    expect(
      validateExcludeShape(WS, { exclude: ["node_modules", "dist", { glob: "x" }] })?.rule
    ).toBe("excludeShape")
  })
})

describe("validateNestedPackageContainment", () => {
  test("flat siblings produce no violation", () => {
    expect(
      validateNestedPackageContainment([
        "scope/foo",
        "scope/bar",
        "scope/baz",
      ])
    ).toEqual([])
  })

  test("nested workspace as sibling of parent's src/ produces no violation", () => {
    expect(
      validateNestedPackageContainment(["scope/parent", "scope/parent/child"])
    ).toEqual([])
  })

  test("nested workspace inside parent's src/ is a violation", () => {
    const result = validateNestedPackageContainment([
      "scope/parent",
      "scope/parent/src/child",
    ])
    expect(result).toHaveLength(1)
    expect(result[0]?.rule).toBe("nestedContainment")
    expect(result[0]?.workspace).toBe("scope/parent/src/child")
    expect(result[0]?.message).toMatch(/src\//)
    expect(result[0]?.message).toMatch(/scope\/parent/)
  })

  test("deep workspace inside parent's src/ is a violation against the direct parent", () => {
    const result = validateNestedPackageContainment([
      "scope/a",
      "scope/a/src/deep/nested",
    ])
    expect(result).toHaveLength(1)
    expect(result[0]?.workspace).toBe("scope/a/src/deep/nested")
  })

  test("similar prefix without slash boundary is not a false positive", () => {
    expect(
      validateNestedPackageContainment(["scope/foo", "scope/foobar"])
    ).toEqual([])
  })

  test("workspace path that equals 'parent/src' alone is a violation", () => {
    const result = validateNestedPackageContainment([
      "scope/parent",
      "scope/parent/src",
    ])
    expect(result).toHaveLength(1)
    expect(result[0]?.workspace).toBe("scope/parent/src")
  })

  test("'srclike' is not 'src/' — only the literal src/ remainder triggers", () => {
    expect(
      validateNestedPackageContainment([
        "scope/parent",
        "scope/parent/srclike/child",
      ])
    ).toEqual([])
  })

  test("nested workspace whose remainder does not start with 'src/' is allowed", () => {
    expect(
      validateNestedPackageContainment(["scope/parent", "scope/parent/child"])
    ).toEqual([])
  })

  test("multiple violations are reported for multiple offenders under the same parent", () => {
    const result = validateNestedPackageContainment([
      "scope/parent",
      "scope/parent/src/a",
      "scope/parent/src/b",
    ])
    expect(result).toHaveLength(2)
    expect(result.map((v) => v.workspace).sort()).toEqual([
      "scope/parent/src/a",
      "scope/parent/src/b",
    ])
  })

  test("empty workspace list produces no violations", () => {
    expect(validateNestedPackageContainment([])).toEqual([])
  })
})
