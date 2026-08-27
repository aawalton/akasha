import { describe, expect, test } from "bun:test"
import { existsSync, readdirSync, readFileSync } from "node:fs"
import { basename, dirname, join } from "node:path"
import { z } from "zod"
import { ADDONS_REL_ROOT, listAllAddons } from "./index"

const repoRoot = join(import.meta.dir, "..", "..", "..", "..", "..", "..")

const addonNameSchema = z.object({ name: z.string().optional() }).passthrough()

function readAddonName(dir: string, fallback: string): string | undefined {
  const addonJsonPath = join(dir, "addon.json")
  if (!existsSync(addonJsonPath)) return undefined
  try {
    const raw: unknown = JSON.parse(readFileSync(addonJsonPath, "utf-8"))
    return addonNameSchema.parse(raw).name ?? fallback
  } catch {
    return undefined
  }
}

function findNestedAddonDirs(): readonly string[] {
  const flatRoot = join(repoRoot, ADDONS_REL_ROOT)
  const out: string[] = []
  const walk = (dir: string): undefined => {
    if (
      existsSync(join(dir, "addon.json")) &&
      dir !== flatRoot &&
      !dir.startsWith(`${flatRoot}/`)
    ) {
      out.push(dir)
    }
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      if (!entry.isDirectory()) continue
      if (entry.name === "node_modules" || entry.name === "dist" || entry.name === ".git") continue
      walk(join(dir, entry.name))
    }
  }
  walk(join(repoRoot, "packages/temper"))
  return out
}

function enumerateAddonNamesFromDisk(): Set<string> {
  const names = new Set<string>()

  const addonsRoot = join(repoRoot, ADDONS_REL_ROOT)
  if (existsSync(addonsRoot)) {
    for (const entry of readdirSync(addonsRoot, { withFileTypes: true })) {
      if (!entry.isDirectory()) continue
      const name = readAddonName(join(addonsRoot, entry.name), entry.name)
      if (name !== undefined) names.add(name)
    }
  }
  for (const dir of findNestedAddonDirs()) {
    const name = readAddonName(dir, basename(dirname(dir)))
    if (name !== undefined) names.add(name)
  }
  return names
}

describe("listAllAddons workspace closure", () => {
  const addons = listAllAddons({ repoRoot })

  test("discovers exactly the addons present on disk", () => {
    const names = new Set(addons.map((a) => a.canonicalName))
    expect(names).toEqual(enumerateAddonNamesFromDisk())
  })

  test("discovery is non-empty and includes the core Temper addons and a shared lib", () => {
    expect(addons.length).toBeGreaterThanOrEqual(40)
    const names = new Set(addons.map((a) => a.canonicalName))
    for (const required of [
      "TemperAddons",
      "TemperCharacters",
      "TemperCombat",
      "TemperInventory",
      "LibAddonMenu-2.0",
    ]) {
      expect(names).toContain(required)
    }
  })

  test("each addon's closure includes its own dir", () => {
    for (const addon of addons) {
      expect(addon.workspaceClosure).toContain(addon.repoRelDir)
    }
  })

  test("each closure is sorted and deduped", () => {
    for (const addon of addons) {
      const sorted = [...addon.workspaceClosure].sort()
      expect(addon.workspaceClosure).toEqual(sorted)
      expect(new Set(addon.workspaceClosure).size).toEqual(addon.workspaceClosure.length)
    }
  })

  test("TemperCharacters closure includes every TSTL-bundled workspace dep", () => {
    const characters = addons.find((a) => a.canonicalName === "TemperCharacters")
    expect(characters).toBeDefined()
    if (characters === undefined) return
    expect(characters.workspaceClosure).toContain(
      "packages/temper/game/characters/skills/morphs/addon"
    )
    expect(characters.workspaceClosure).toContain(
      "packages/temper/game/characters/skills/morphs/core"
    )
    expect(characters.workspaceClosure).toContain("packages/temper/player/completion")
    expect(characters.workspaceClosure).toContain("packages/temper/shared/foundation-misc/dungeons")
    expect(characters.workspaceClosure).toContain("packages/temper/shared/interface/hud/window")
  })

  test("TemperInventory closure includes its addon-side deps", () => {
    const inventory = addons.find((a) => a.canonicalName === "TemperInventory")
    expect(inventory).toBeDefined()
    if (inventory === undefined) return
    expect(inventory.workspaceClosure).toContain("packages/temper/game/items/addon")
    expect(inventory.workspaceClosure).toContain("packages/temper/game/items/core")
    expect(inventory.workspaceClosure).toContain("packages/temper/shared/interface/hud/window")
  })
})
