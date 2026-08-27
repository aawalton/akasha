import { readFileSync, readdirSync } from "node:fs"
import { basename } from "node:path"

const SETTINGS_FLAG = "--settings"

const SETTINGS_STEM = "agent-settings-"

export function settingsPathIn(argv: readonly string[]): string | null {
  const at = argv.indexOf(SETTINGS_FLAG)
  if (at === -1) return null
  const named = argv[at + 1]
  return named === undefined || named === "" ? null : named
}

export function isSpawnedSettings(path: string): boolean {
  return basename(path).startsWith(SETTINGS_STEM) && path.endsWith(".json")
}

export function liveSettingsPaths(root = "/proc"): readonly string[] {
  const found = new Set<string>()
  for (const entry of readdirSync(root)) {
    if (!/^\d+$/.test(entry)) continue
    let argv: readonly string[]
    try {
      argv = readFileSync(`${root}/${entry}/cmdline`, "utf8").split("\0")
    } catch {
      continue
    }
    const named = settingsPathIn(argv)
    if (named !== null && isSpawnedSettings(named)) found.add(named)
  }
  return [...found].sort()
}
