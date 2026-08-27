import { existsSync, readdirSync, readFileSync } from "node:fs"
import { join } from "node:path"
import { z } from "zod"

const ROOT_PACKAGE_JSON_SCHEMA = z
  .object({ workspaces: z.array(z.string()).optional() })
  .passthrough()

function parseTrailingStarGlob(entry: string): { prefix: string; depth: number } {
  const SUFFIX = "/*"
  let prefix = entry
  let depth = 0
  while (prefix.endsWith(SUFFIX)) {
    prefix = prefix.slice(0, -SUFFIX.length)
    depth += 1
  }
  if (depth === 0 || prefix.includes("*")) {
    throw new Error(
      `listWorkspaceDirs: unsupported workspaces glob "${entry}" — only trailing "/*" segments are expanded today`
    )
  }
  return { prefix, depth }
}

function expandGlobEntry(repoRoot: string, entry: string): readonly string[] {
  const { prefix, depth } = parseTrailingStarGlob(entry)
  let level: readonly string[] = [prefix]
  for (let i = 0; i < depth; i += 1) {
    const next: string[] = []
    for (const rel of level) {
      const abs = join(repoRoot, rel)
      if (!existsSync(abs)) continue
      for (const child of readdirSync(abs, { withFileTypes: true })) {
        if (child.isDirectory()) next.push(`${rel}/${child.name}`)
      }
    }
    level = next
  }
  return level.filter((rel) => existsSync(join(repoRoot, rel, "package.json"))).sort()
}

export function listWorkspaceDirs(repoRoot: string): readonly string[] {
  const rootPath = join(repoRoot, "package.json")
  const parsed = ROOT_PACKAGE_JSON_SCHEMA.parse(JSON.parse(readFileSync(rootPath, "utf-8")))
  const entries = parsed.workspaces ?? []
  const out: string[] = []
  for (const entry of entries) {
    if (entry.includes("*")) out.push(...expandGlobEntry(repoRoot, entry))
    else out.push(entry)
  }
  return out
}
