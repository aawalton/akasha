import { existsSync, readdirSync } from "node:fs"
import { join } from "node:path"

export const GAME_MANIFEST_NAME = "addon.json"

export const PAGE_MANIFEST_SUFFIX = ".eso-addon.addon-manifest.json"

function pageManifestNamesIn(dir: string): readonly string[] {
  let entries: readonly string[]
  try {
    entries = readdirSync(dir)
  } catch {
    return []
  }
  return entries.filter((name) => name.endsWith(PAGE_MANIFEST_SUFFIX)).sort()
}

export function addonManifestPathIn(dir: string): string | null {
  const game = join(dir, GAME_MANIFEST_NAME)
  if (existsSync(game)) return game
  const named = pageManifestNamesIn(dir)
  const first = named[0]
  if (first === undefined) return null
  if (named.length > 1) {
    throw new Error(
      `addonManifestPathIn: ${dir} holds ${String(named.length)} files ending in "${PAGE_MANIFEST_SUFFIX}" (${named.join(", ")}) — one folder holds one addon, so which of them the game reads cannot be worked out`
    )
  }
  return join(dir, first)
}
