import { existsSync } from "node:fs"
import { resolve } from "node:path"
import { z } from "zod"

const ROOT_MARKER = "bun.lock"
const NAMED_WORKSPACE = z.string().min(1)

let cached: string | null = null

export function getRepoRoot(): string {
  if (cached !== null) return cached
  const named = NAMED_WORKSPACE.safeParse(process.env.WORKSPACE)
  if (!named.success) {
    throw new Error(
      "getRepoRoot: no code checkout was named. A check reads the code repo and nothing here " +
        "derives it: pass --repo-root, or set WORKSPACE. Walking up from this file is no longer " +
        "done, because this file and the tree it reads need not be in the same repository."
    )
  }
  const root = resolve(named.data)
  if (!existsSync(resolve(root, ROOT_MARKER))) {
    throw new Error(
      `getRepoRoot: WORKSPACE names ${root}, which holds no ${ROOT_MARKER}, so it is not a ` +
        "checkout of the code repo. A check pointed at the wrong tree scans nothing and reports clean."
    )
  }
  cached = root
  return cached
}
