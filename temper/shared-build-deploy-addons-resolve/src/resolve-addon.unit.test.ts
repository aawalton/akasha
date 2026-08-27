import { describe, expect, test } from "bun:test"
import { join } from "node:path"
import { type ResolvedAddon, resolveAddon } from "./index"

const repoRoot = join(import.meta.dir, "..", "..", "..")

describe("resolveAddon", () => {
  test("matches an addon by canonical addon.json#name", () => {
    const result: ResolvedAddon = resolveAddon("TemperCharacters", { repoRoot })
    expect(result.canonicalName).toBe("TemperCharacters")
    expect(result.dir).toBe(join(repoRoot, "temper/player-completion-addon"))
  })

  test("matches an addon by its directory name", () => {
    const result = resolveAddon("player-completion-addon", { repoRoot })
    expect(result.canonicalName).toBe("TemperCharacters")
    expect(result.dir).toBe(join(repoRoot, "temper/player-completion-addon"))
  })

  test("matches an external addon by its directory name", () => {
    const result = resolveAddon("game-items-addon", { repoRoot })
    expect(result.canonicalName).toBe("TemperInventory")
    expect(result.dir).toBe(join(repoRoot, "temper/game-items-addon"))
  })

  test("matches a second addon by canonical addon.json#name", () => {
    const result = resolveAddon("TemperInventory", { repoRoot })
    expect(result.canonicalName).toBe("TemperInventory")
    expect(result.dir).toBe(join(repoRoot, "temper/game-items-addon"))
  })

  test("falls back to a flat-layout path for unknown names", () => {
    const result = resolveAddon("NotARealAddon", { repoRoot })
    expect(result.canonicalName).toBe("NotARealAddon")
    expect(result.dir).toBe(join(repoRoot, "temper/addons/NotARealAddon"))
  })
})
