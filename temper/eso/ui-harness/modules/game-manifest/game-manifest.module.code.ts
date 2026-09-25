import { existsSync, readFileSync } from "node:fs"
import { join } from "node:path"
import { esouiSourceDir } from "akasha/temper/eso/path/modules/eso-paths/eso-paths.module.code.ts"

const INGAME_PROGRAM: readonly string[] = [
  "ingamelocalization",
  "libraries",
  "common",
  "appandingame",
  "pregameandingame",
  "publicallingames",
  "ingame",
]

const LUA = ".lua"

const XML = ".xml"

const UNDER = /^EsoUI\\/i

type GameFileKind = "lua" | "xml"

type GameFile = {
  readonly kind: GameFileKind
  readonly at: string
}

type ManifestEntry = {
  readonly kind: GameFileKind
  readonly rel: string
}

function kindOf(line: string): GameFileKind | null {
  const low = line.toLowerCase()
  if (low.endsWith(LUA)) return "lua"
  if (low.endsWith(XML)) return "xml"
  return null
}

export function manifestEntries(text: string): readonly ManifestEntry[] {
  const found: ManifestEntry[] = []
  for (const raw of text.split("\n")) {
    const line = raw.trim()
    const kind = kindOf(line)
    if (kind === null) continue
    found.push({ kind, rel: line.replace(UNDER, "").split("\\").join("/") })
  }
  return found
}

function heldAt(root: string, rel: string): string | null {
  const exact = join(root, rel)
  if (existsSync(exact)) return exact
  const lower = join(root, rel.toLowerCase())
  return existsSync(lower) ? lower : null
}

export function gameFiles(root: string = esouiSourceDir()): readonly GameFile[] {
  const found: GameFile[] = []
  for (const program of INGAME_PROGRAM) {
    const manifest = join(root, program, `${program}.txt`)
    if (!existsSync(manifest)) continue
    for (const one of manifestEntries(readFileSync(manifest, "utf8"))) {
      const at = heldAt(root, one.rel)
      if (at !== null) found.push({ kind: one.kind, at })
    }
  }
  return found
}
