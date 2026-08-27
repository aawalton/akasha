
import { describe, expect, it } from "bun:test"
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import {
  collectModelGatewayVersionTreeFiles,
  collectVersionTreeFilesFrom,
  computeModelGatewayTreeVersion,
  computeVersionTreeHashFrom,
} from "../lib/model-gateway-tree-version.ts"

function fixture(files: Readonly<Record<string, string>>): string {
  const root = mkdtempSync("/var/tmp/model-gateway-version-fixture-")
  for (const [rel, body] of Object.entries(files)) {
    const full = join(root, rel)
    mkdirSync(dirname(full), { recursive: true })
    writeFileSync(full, body)
  }
  return root
}

function withFixture<T>(files: Readonly<Record<string, string>>, fn: (root: string) => T): T {
  const root = fixture(files)
  try {
    return fn(root)
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
}

function hashOf(files: Readonly<Record<string, string>>): string {
  return withFixture(files, (root) => computeVersionTreeHashFrom(root, join(root, "main.ts")))
}

function refusalFrom(files: Readonly<Record<string, string>>): string {
  return withFixture(files, (root) => {
    try {
      collectVersionTreeFilesFrom(root, join(root, "main.ts"))
      return ""
    } catch (thrown) {
      return thrown instanceof Error ? thrown.message : String(thrown)
    }
  })
}

describe("the ported gateway's version stamp follows its import closure", () => {
  it("answers a 64-char lowercase hex sha256, stable across calls", () => {
    expect(computeModelGatewayTreeVersion()).toMatch(/^[0-9a-f]{64}$/)
    expect(computeModelGatewayTreeVersion()).toBe(computeModelGatewayTreeVersion())
  })

  it("collects no test file, since nothing the gateway runs imports one", () => {
    expect(collectModelGatewayVersionTreeFiles().every((f) => !f.endsWith(".test.ts"))).toBe(true)
  })

  it("moves when a file the entrypoint reaches only indirectly changes", () => {
    const build = (deep: string): string =>
      hashOf({
        "main.ts": 'import { near } from "./near.ts"\nexport const main = near',
        "near.ts": 'export { deep as near } from "./nested/deep.ts"',
        "nested/deep.ts": deep,
      })
    expect(build("export const deep = 1")).not.toBe(build("export const deep = 2"))
  })

  it("moves when a file reached by climbing out of the directory changes", () => {
    const build = (outside: string): string =>
      withFixture(
        {
          "gw/main.ts": 'import { x } from "../outside.ts"\nexport const main = x',
          "outside.ts": outside,
        },
        (root) => computeVersionTreeHashFrom(root, join(root, "gw", "main.ts"))
      )
    expect(build("export const x = 1")).not.toBe(build("export const x = 2"))
  })

  it("stands still when a file nothing imports changes", () => {
    const build = (stranger: string): string =>
      hashOf({ "main.ts": "export const main = 1", "stranger.ts": stranger })
    expect(build("export const s = 1")).toBe(build("export const s = 2"))
  })

  it("follows a side-effect import and a dynamic one, not only a named import", () => {
    const sideEffect = (body: string): string =>
      hashOf({ "main.ts": 'import "./effect.ts"\nexport const main = 1', "effect.ts": body })
    const dynamic = (body: string): string =>
      hashOf({
        "main.ts": 'export const main = () => import("./late.ts")',
        "late.ts": body,
      })
    expect(sideEffect("export const e = 1")).not.toBe(sideEffect("export const e = 2"))
    expect(dynamic("export const l = 1")).not.toBe(dynamic("export const l = 2"))
  })

  it("walks a cycle once instead of running forever", () => {
    const files = withFixture(
      {
        "main.ts": 'import { b } from "./b.ts"\nexport const a = b',
        "b.ts": 'import { a } from "./main.ts"\nexport const b = a',
      },
      (root) => collectVersionTreeFilesFrom(root, join(root, "main.ts"))
    )
    expect(files).toEqual(["b.ts", "main.ts"])
  })

  it("ignores a bare or node: specifier, which names no file of ours", () => {
    const files = withFixture(
      { "main.ts": 'import { join } from "node:path"\nimport x from "some-package"\nexport const m = join' },
      (root) => collectVersionTreeFilesFrom(root, join(root, "main.ts"))
    )
    expect(files).toEqual(["main.ts"])
  })

  it("refuses a relative import that resolves to nothing, rather than dropping it", () => {
    const message = refusalFrom({ "main.ts": 'import { gone } from "./gone.ts"\nexport const m = gone' })
    expect(message).toContain("not a readable file")
    expect(message).toContain("gone.ts")
  })

  it("refuses a relative import carrying no extension, rather than dropping it", () => {
    const message = refusalFrom({
      "main.ts": 'import { x } from "./bare"\nexport const m = x',
      "bare.ts": "export const x = 1",
    })
    expect(message).toContain("no `.ts` extension")
  })
})
