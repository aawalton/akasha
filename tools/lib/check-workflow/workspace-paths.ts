import { existsSync, readdirSync, readFileSync } from "node:fs"
import { join } from "node:path"
import { z } from "zod"

const ROOT_PACKAGE_JSON_SCHEMA = z
  .object({ workspaces: z.array(z.string()).optional() })
  .passthrough()

const DEEP_SUFFIX = "/**"

function unsupported(entry: string): Error {
  return new Error(
    `listWorkspaceDirs: unsupported workspaces glob "${entry}" — only trailing "/*" and "/**" segments are expanded today`
  )
}

function parseTrailingStarGlob(entry: string): { prefix: string; depth: number } {
  const SUFFIX = "/*"
  let prefix = entry
  let depth = 0
  while (prefix.endsWith(SUFFIX)) {
    prefix = prefix.slice(0, -SUFFIX.length)
    depth += 1
  }
  if (depth === 0 || prefix.includes("*")) throw unsupported(entry)
  return { prefix, depth }
}

function dirsUnder(repoRoot: string, prefix: string): readonly string[] {
  const found: string[] = []
  const walk = (rel: string): undefined => {
    const abs = join(repoRoot, rel)
    if (!existsSync(abs)) return
    for (const child of readdirSync(abs, { withFileTypes: true })) {
      if (!child.isDirectory() || child.name === "node_modules") continue
      const next = `${rel}/${child.name}`
      found.push(next)
      walk(next)
    }
  }
  walk(prefix)
  return found
}

function expandGlobEntry(repoRoot: string, entry: string): readonly string[] {
  if (entry.endsWith(DEEP_SUFFIX)) {
    const under = entry.slice(0, -DEEP_SUFFIX.length)
    if (under.includes("*")) throw unsupported(entry)
    return dirsUnder(repoRoot, under)
      .filter((rel) => existsSync(join(repoRoot, rel, "package.json")))
      .sort()
  }
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
