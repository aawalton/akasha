import { describe, expect, test } from "bun:test"
import {
  ADDON_BUILD_CHECK_NAME,
  addonBuildDependents,
  withAddonBuildCoDep,
} from "./addon-build-co-dep.ts"
import type { CheckConfig } from "./check-configs-types"

function seedsOf(check: CheckConfig): readonly string[] {
  return [
    ...(check.dispatchNodes ?? []),
    ...(check.dispatchNodeTypes ?? []).map((seed) => JSON.stringify(seed)),
  ]
}

function uncovered(checks: readonly CheckConfig[]): readonly string[] {
  const build = checks.find((check) => check.name === ADDON_BUILD_CHECK_NAME)
  const carried = new Set(build === undefined ? [] : seedsOf(build))
  return addonBuildDependents(checks)
    .filter((dependent) => seedsOf(dependent).some((seed) => !carried.has(seed)))
    .map((dependent) => dependent.name)
}

const BUILD: CheckConfig = {
  name: ADDON_BUILD_CHECK_NAME,
  closurePolicy: "import-graph",
  dispatchNodes: ["package:code:@temper/addons"],
  script: "check-addon-build.ts",
}

const SCANNER: CheckConfig = {
  name: "post-emit-scanner",
  dependsOn: [ADDON_BUILD_CHECK_NAME],
  closurePolicy: "import-graph",
  dispatchNodes: [
    "package:code:@temper/addons",
    "ts-file:code:packages/checks/src/check-post-emit.ts",
  ],
  script: "check-post-emit.ts",
}

describe("withAddonBuildCoDep", () => {
  test("negative control: unwrapped, a scanner's own source is a seed the build does not carry", () => {
    expect(uncovered([BUILD, SCANNER])).toEqual(["post-emit-scanner"])
  })

  test("wrapped, the build carries every seed its dependents are selected on", () => {
    expect(uncovered(withAddonBuildCoDep([BUILD, SCANNER]))).toEqual([])
  })

  test("a file-type population on a dependent is folded in too, not dropped", () => {
    const typed: CheckConfig = {
      ...SCANNER,
      dispatchNodeTypes: [{ kind: "json-file", under: "packages/temper" }],
    }
    expect(uncovered(withAddonBuildCoDep([BUILD, typed]))).toEqual([])
  })

  test("nothing but the build entry is rewritten", () => {
    const wrapped = withAddonBuildCoDep([BUILD, SCANNER])
    expect(wrapped.map((check) => check.name)).toEqual([
      ADDON_BUILD_CHECK_NAME,
      "post-emit-scanner",
    ])
    expect(wrapped[1]).toBe(SCANNER)
  })

  test("a dependent on another closure policy is refused rather than under-covered", () => {
    const mismatched: CheckConfig = { ...SCANNER, closurePolicy: undefined }
    expect(() => withAddonBuildCoDep([BUILD, mismatched])).toThrow(/closurePolicy/)
  })

  test("an array with no build entry is refused rather than passed through", () => {
    expect(() => withAddonBuildCoDep([SCANNER])).toThrow(/addon-build/)
  })

  test("an array where nothing depends on the build is refused rather than certified", () => {
    expect(() => withAddonBuildCoDep([BUILD])).toThrow(/dependsOn/)
  })
})
