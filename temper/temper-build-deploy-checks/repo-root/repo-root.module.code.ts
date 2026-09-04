import { existsSync } from "node:fs"
import { resolve } from "node:path"
import { z } from "zod"

const ROOT_MARKER = "bun.lock"
const NAMED_WORKSPACE = z.string().min(1)

export function getRepoRoot(): string {
  const named = NAMED_WORKSPACE.safeParse(process.env.WORKSPACE)
  if (!named.success) {
    throw new Error(
      "getRepoRoot: no code checkout was named. A check reads the code repo and nothing here " +
        "derives it: pass --repo-root, or set WORKSPACE. Deriving the root from where this file " +
        "sits is no longer done, because this file and the tree it reads need not be in the same " +
        "repository."
    )
  }
  const root = resolve(named.data)
  if (!existsSync(resolve(root, ROOT_MARKER))) {
    throw new Error(
      `getRepoRoot: WORKSPACE names ${root}, which holds no ${ROOT_MARKER}, so it is not a ` +
        "checkout of the code repo. A check pointed at the wrong tree scans nothing and reports clean."
    )
  }
  return root
}
