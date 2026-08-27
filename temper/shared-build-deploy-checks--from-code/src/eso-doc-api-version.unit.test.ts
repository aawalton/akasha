import { describe, expect, test } from "bun:test"
import {
  esoDocPathForLuaRoot,
  evaluateEsoTypingsFreshness,
  type StampedArtifact,
} from "./eso-doc-api-version"

const artifact = (
  label: string,
  version: number | null,
  overrides: Partial<StampedArtifact> = {}
): StampedArtifact => ({
  label,
  version,
  generator: "packages/temper/x/generate.ts",
  ...overrides,
})

describe("the population itself", () => {
  test("an empty artifact set refuses rather than passing", () => {
    const result = evaluateEsoTypingsFreshness({ artifacts: [] })
    expect(result.ok).toBe(false)
    expect(result.violations.join("\n")).toContain("no clone-derived ESO artifact was found")
  })

  test("an unstamped artifact is a violation, not a non-member", () => {
    const result = evaluateEsoTypingsFreshness({
      artifacts: [artifact("a", 101050), artifact("unstamped", null)],
    })
    expect(result.ok).toBe(false)
    expect(result.violations.join("\n")).toContain("unstamped")
    expect(result.violations.join("\n")).toContain("no ESO-API-Version stamp")
  })

  test("a violation names the generator that would repair it", () => {
    const result = evaluateEsoTypingsFreshness({
      artifacts: [artifact("unstamped", null, { generator: "packages/temper/y/regen.ts" })],
    })
    expect(result.violations.join("\n")).toContain("packages/temper/y/regen.ts")
  })
})

describe("stamp agreement, which is what this repository can answer alone", () => {
  test("passes when every stamp agrees with the others", () => {
    const result = evaluateEsoTypingsFreshness({
      artifacts: [artifact("a", 101050), artifact("b", 101050), artifact("c", 101050)],
    })
    expect(result.ok).toBe(true)
    expect(result.violations).toHaveLength(0)
  })

  test("flags a partial regen (mismatched stamps)", () => {
    const result = evaluateEsoTypingsFreshness({
      artifacts: [artifact("fresh", 101051), artifact("stale", 101050)],
    })
    expect(result.ok).toBe(false)
    expect(result.violations.join("\n")).toContain("partial regen")
  })

  test("agreeing stamps pass whatever version they name, no outside tree deciding it", () => {
    const result = evaluateEsoTypingsFreshness({
      artifacts: [artifact("a", 999999), artifact("b", 999999)],
    })
    expect(result.ok).toBe(true)
    expect(result.violations).toHaveLength(0)
  })
})

describe("esoDocPathForLuaRoot", () => {
  test("resolves the doc one level above the lua-source root", () => {
    expect(esoDocPathForLuaRoot("/home/u/esoui/esoui")).toBe("/home/u/esoui/ESOUIDocumentation.txt")
  })
})
