import { describe, expect, test } from "bun:test"
import { readFileSync } from "node:fs"
import { resolve } from "node:path"
import { decideTestSelection, placeWorkspace } from "../lib/ci-test-fanout/select-tests.ts"

const NON_TS_CLASS: readonly { readonly label: string; readonly path: string }[] = [
  { label: "md (docs)", path: "docs/guide.md" },
  { label: "css", path: "packages/x/src/globals.css" },
  { label: "yaml", path: "packages/infra/k8s/foo.yaml" },
  { label: "yml", path: "packages/infra/k8s/bar.yml" },
  { label: "lua", path: "packages/temper/addon/src/Foo.lua" },
  { label: "sh (shell)", path: "packages/infra/scripts/do-thing.sh" },
  { label: "rust", path: "packages/x/native/src/lib.rs" },
  { label: "toml", path: "packages/x/Cargo.toml" },
  { label: "dockerfile", path: "packages/x/Dockerfile" },
]

const SUMMARY = {
  testFiles: ["packages/x/src/a.unit.test.ts"],
  reverseMap: { "packages/x/src/a.ts": ["packages/x/src/a.unit.test.ts"] },
} as const

describe("select-tests: non-TS change forces run-all (Layer B — MAP present)", () => {
  for (const { label, path } of NON_TS_CLASS) {
    test(`a ${label}-only change → run-all`, () => {
      expect(decideTestSelection(SUMMARY, [path]).kind).toBe("run-all")
    })

    test(`a ${label} change mixed with a precisely-mapped TS file → still run-all`, () => {
      expect(decideTestSelection(SUMMARY, ["packages/x/src/a.ts", path]).kind).toBe("run-all")
    })
  }

  test("empty changed-files list → run-all (never run nothing)", () => {
    expect(decideTestSelection(SUMMARY, []).kind).toBe("run-all")
  })

  test("workspace absent from the artifact → run-all", () => {
    expect(decideTestSelection(undefined, ["packages/x/src/a.ts"]).kind).toBe("run-all")
  })

  test("control: a precisely-mapped TS-only change → narrowed subset, NOT run-all", () => {
    const sel = decideTestSelection(SUMMARY, ["packages/x/src/a.ts"])
    expect(sel.kind).toBe("subset")
    if (sel.kind === "subset") {
      expect(sel.tests).toEqual(["packages/x/src/a.unit.test.ts"])
    }
  })

  test("control: a TS file absent from the reverseMap → subset with no tests (run nothing)", () => {
    const sel = decideTestSelection(SUMMARY, ["packages/x/src/unrelated.ts"])
    expect(sel.kind).toBe("subset")
    if (sel.kind === "subset") expect(sel.tests).toEqual([])
  })
})

describe("placeWorkspace: which no-entry case a workspace is in", () => {
  const artifact = {
    schemaVersion: 2,
    byWorkspace: { "packages/x": {} },
    outsideMap: ["packages/y"],
  }

  test("a workspace with an entry is mapped", () => {
    expect(placeWorkspace(artifact, "packages/x")).toBe("mapped")
  })

  test("a workspace the producer named as outside the map is outside it", () => {
    expect(placeWorkspace(artifact, "packages/y")).toBe("outside-map")
  })

  test("a workspace in neither was never discovered, which is not routine", () => {
    expect(placeWorkspace(artifact, "packages/z")).toBe("undiscovered")
  })

  test("an artifact from before the population was stated answers neither way", () => {
    expect(placeWorkspace({ schemaVersion: 1, byWorkspace: {} }, "packages/y")).toBe("unstated")
  })

  test("and a schemaVersion that claims the field while omitting it is unstated too", () => {
    expect(placeWorkspace({ schemaVersion: 2, byWorkspace: {} }, "packages/y")).toBe("unstated")
  })
})

describe("run-workspace-tests.sh: missing-MAP fallback runs all (Layer A — MAP absent)", () => {
  const script = readFileSync(
    resolve(import.meta.dir, "..", "lib", "ci-test-fanout", "run-workspace-tests.sh"),
    "utf8"
  )

  test("the missing-MAP guard short-circuits to run-all BEFORE reaching select-tests.ts", () => {
    const guardIdx = script.indexOf('if [ ! -f "$MAP_PATH" ] || [ ! -f "$CHANGED_PATH" ]; then')
    const selectIdx = script.indexOf("${FANOUT_DIR}/select-tests.ts")

    expect(guardIdx).toBeGreaterThan(-1)
    expect(selectIdx).toBeGreaterThan(-1)
    expect(guardIdx).toBeLessThan(selectIdx)

    const guardBody = script.slice(guardIdx, selectIdx)
    expect(guardBody).toContain("enumerate_workspace_tests")
  })

  test("enumerate_workspace_tests runs the full eligible test set (the run-all primitive)", () => {
    const fnIdx = script.indexOf("enumerate_workspace_tests() {")
    expect(fnIdx).toBeGreaterThan(-1)
    const fnBody = script.slice(fnIdx, fnIdx + 400)
    expect(fnBody).toContain("*.test.ts")
    expect(fnBody).toContain("*.test.tsx")
    expect(fnBody).toContain('grep -E "$CI_TEST_REGEX"')
  })

  test("both enumeration paths exclude check fixture trees", () => {
    expect(script).toContain("FIXTURE_PATH_REGEX='(^|/)__fixtures__/'")

    const excludeSite = 'grep -Ev "$FIXTURE_PATH_REGEX"'
    expect(script.split(excludeSite).length - 1).toBe(2)

    const fnIdx = script.indexOf("enumerate_workspace_tests() {")
    expect(script.slice(fnIdx, fnIdx + 400)).toContain('grep -Ev "$FIXTURE_PATH_REGEX"')
    expect(script).toContain(
      'SELECTED=$(echo "$SELECTED" | grep -E "$CI_TEST_REGEX" | grep -Ev "$FIXTURE_PATH_REGEX" || true)'
    )
  })
})
