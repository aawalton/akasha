import { describe, expect, test } from "bun:test"
import { join } from "node:path"
import { type ResolvedAddon, resolveAddon } from "./index"

const repoRoot = join(import.meta.dir, "..", "..", "..", "..", "..", "..")

describe("resolveAddon", () => {
  test("matches an addon by canonical addon.json#name (nested layout)", () => {
    const result: ResolvedAddon = resolveAddon("TemperCharacters", { repoRoot })
    expect(result.canonicalName).toBe("TemperCharacters")
    expect(result.dir).toBe(join(repoRoot, "packages/temper/player/completion/addon"))
  })

  test("matches a nested addon (TemperCharacters) by parent-domain leaf name", () => {
    const result = resolveAddon("completion", { repoRoot })
    expect(result.canonicalName).toBe("TemperCharacters")
    expect(result.dir).toBe(join(repoRoot, "packages/temper/player/completion/addon"))
  })

  test("matches an external (nested) addon by parent-domain leaf name", () => {
    const result = resolveAddon("items", { repoRoot })
    expect(result.canonicalName).toBe("TemperInventory")
    expect(result.dir).toBe(join(repoRoot, "packages/temper/game/items/addon"))
  })

  test("matches a nested addon by canonical addon.json#name", () => {
    const result = resolveAddon("TemperInventory", { repoRoot })
    expect(result.canonicalName).toBe("TemperInventory")
    expect(result.dir).toBe(join(repoRoot, "packages/temper/game/items/addon"))
  })

  test("falls back to a flat-layout path for unknown names", () => {
    const result = resolveAddon("NotARealAddon", { repoRoot })
    expect(result.canonicalName).toBe("NotARealAddon")
    expect(result.dir).toBe(join(repoRoot, "packages/temper/addons/NotARealAddon"))
  })
})
