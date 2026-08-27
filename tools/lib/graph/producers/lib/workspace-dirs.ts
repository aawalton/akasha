import { z } from "zod"
import type { Repo } from "../../../../../page/document/types.ts"
import { readRepoFile } from "../../repos.ts"
import type { BuildContext } from "../../types.ts"
import { repoTree } from "./repo-tree.ts"

const MANIFEST = "package.json"

const GLOB_TAIL = "/*"

const RootManifestSchema = z.object({ workspaces: z.array(z.string()).optional() }).loose()

export type TrailingStarGlob = {
  readonly prefix: string
  readonly depth: number
}

export const parseTrailingStarGlob = (entry: string): TrailingStarGlob => {
  let prefix = entry
  let depth = 0
  while (prefix.endsWith(GLOB_TAIL)) {
    prefix = prefix.slice(0, -GLOB_TAIL.length)
    depth += 1
  }
  if (depth === 0 || prefix.includes("*")) {
    throw new Error(
      `graph: only a trailing "/*" is expanded, so the workspace entry \`${entry}\` is not one this reads`
    )
  }
  return { prefix, depth }
}

const dirsHoldingAManifest = (paths: readonly string[]): ReadonlySet<string> => {
  const dirs = new Set<string>()
  for (const path of paths) {
    if (!path.endsWith(`/${MANIFEST}`)) continue
    dirs.add(path.slice(0, -(MANIFEST.length + 1)))
  }
  return dirs
}

const depthOf = (path: string): number => path.split("/").length

export const workspaceDirsAt = (ctx: BuildContext, repo: Repo): readonly string[] => {
  const tree = repoTree(ctx, repo)
  if (!tree.hasFile(MANIFEST)) return []
  const raw = readRepoFile(ctx, repo, MANIFEST)
  if (raw === null) return []
  const declared = RootManifestSchema.parse(JSON.parse(raw)).workspaces ?? []
  const holders = dirsHoldingAManifest(tree.paths)
  const out: string[] = []
  for (const entry of declared) {
    if (!entry.includes("*")) {
      out.push(entry)
      continue
    }
    const { prefix, depth } = parseTrailingStarGlob(entry)
    const want = depthOf(prefix) + depth
    const matched: string[] = []
    for (const dir of holders) {
      if (!dir.startsWith(`${prefix}/`)) continue
      if (depthOf(dir) !== want) continue
      matched.push(dir)
    }
    matched.sort()
    out.push(...matched)
  }
  return out
}
