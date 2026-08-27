
import { afterAll, describe, expect, test } from "bun:test"
import { mkdtempSync, readFileSync, rmSync } from "node:fs"
import { excludesFor, type RepoReach, writeTsconfig } from "../lib/typecheck-run.ts"

const NOWHERE = "/no-such-root"

const PLANTED = new Map<string, string>([
  [
    `${NOWHERE}/packages/thing/tsconfig.json`,
    JSON.stringify({ exclude: ["node_modules", "dist", "**/*.test.ts"] }),
  ],
  [`${NOWHERE}/packages/bare/tsconfig.json`, JSON.stringify({ compilerOptions: {} })],
])

const REACH: RepoReach = {
  exists: (at) => PLANTED.has(at),
  read: (at) => PLANTED.get(at) ?? null,
}

const CLOSURE = [
  "packages/thing/src/a.ts",
  "packages/thing/src/a.test.ts",
  "packages/bare/src/b.ts",
  "loose.ts",
]

describe("what a package's own tsconfig keeps out of a write's typecheck", () => {
  test("an exclude reaches the package's own files, carrying the package's path", () => {
    const found = excludesFor(NOWHERE, CLOSURE, ["packages/thing/src/a.ts"], REACH)
    expect(found).toContain("packages/thing/**/*.test.ts")
    expect(found).toContain("packages/thing/dist")
  })

  test("the file being written is never excluded, whatever its package states", () => {
    const found = excludesFor(NOWHERE, CLOSURE, ["packages/thing/src/a.test.ts"], REACH)
    expect(found).not.toContain("packages/thing/**/*.test.ts")
    expect(found).toContain("packages/thing/dist")
  })

  test("a package stating no exclude contributes none, rather than a default of its own", () => {
    const found = excludesFor(NOWHERE, ["packages/bare/src/b.ts"], ["packages/bare/src/b.ts"], REACH)
    expect(found).toEqual([])
  })

  test("a file under no package contributes none, there being no tsconfig above it", () => {
    const found = excludesFor(NOWHERE, ["loose.ts"], ["loose.ts"], REACH)
    expect(found).toEqual([])
  })

  test("no file in a change set is excluded, whichever of them an exclude reaches", () => {
    const found = excludesFor(
      NOWHERE,
      CLOSURE,
      ["packages/thing/src/a.ts", "packages/thing/src/a.test.ts"],
      REACH
    )
    expect(found).not.toContain("packages/thing/**/*.test.ts")
    expect(found).toContain("packages/thing/dist")
  })

  test("a whole-repository run naming no subject keeps every exclude, nothing being written", () => {
    const found = excludesFor(NOWHERE, CLOSURE, [], REACH)
    expect(found).toContain("packages/thing/**/*.test.ts")
  })

  test("nothing is read from disk, the root here standing nowhere", () => {
    const blind: RepoReach = { exists: () => false, read: () => null }
    expect(excludesFor(NOWHERE, CLOSURE, [], blind)).toEqual([])
  })
})

const DIR = mkdtempSync("/var/tmp/typecheck-excludes-")

afterAll(() => {
  rmSync(DIR, { recursive: true, force: true })
})

describe("the config the gate writes", () => {
  test("node_modules stays excluded, an explicit exclude replacing the compiler's default", () => {
    writeTsconfig(DIR, "/types", ["packages/thing/dist"])
    const held = JSON.parse(readFileSync(`${DIR}/tsconfig.json`, "utf8")) as {
      exclude: readonly string[]
    }
    expect(held.exclude).toContain("node_modules")
    expect(held.exclude).toContain("packages/thing/dist")
  })

  test("node_modules is named once where a package states it too", () => {
    writeTsconfig(DIR, "/types", ["node_modules", "packages/thing/dist"])
    const held = JSON.parse(readFileSync(`${DIR}/tsconfig.json`, "utf8")) as {
      exclude: readonly string[]
    }
    expect(held.exclude.filter((one) => one === "node_modules")).toHaveLength(1)
  })
})
