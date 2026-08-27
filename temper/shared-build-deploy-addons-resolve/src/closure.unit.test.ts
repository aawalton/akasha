import { describe, expect, test } from "bun:test"
import { join } from "node:path"
import { computeClosureForPackage } from "./closure"

const repoRoot = join(import.meta.dir, "..", "..", "..")

describe("computeClosureForPackage", () => {
  const scriptsClosure = computeClosureForPackage("@temper/scripts", repoRoot)

  test("includes the seed package's own dir", () => {
    expect(scriptsClosure).toContain("temper/scripts")
  })

  test("is sorted and deduped", () => {
    const sorted = [...scriptsClosure].sort()
    expect(scriptsClosure).toEqual(sorted)
    expect(new Set(scriptsClosure).size).toEqual(scriptsClosure.length)
  })

  test("transitively includes the controlled-rule package (#11698 regression)", () => {
    expect(scriptsClosure).toContain("temper/game-items-rules-core")
  })

  test("throws on an unknown package name", () => {
    expect(() => computeClosureForPackage("@temper/does-not-exist", repoRoot)).toThrow()
  })
})
