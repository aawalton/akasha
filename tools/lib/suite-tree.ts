import { execFileSync } from "node:child_process"
import { existsSync, mkdirSync, readdirSync, rmSync, statSync } from "node:fs"
import { join } from "node:path"
import { linkModulesInto, workspacesDeclaredIn } from "./main-pipeline-creator/sha-pinned-tree.ts"
import { REPOS, resolveRoots, rootEnvName, AKASHA as SIBLING } from "../../repo/roots/roots"
import { linkSibling } from "./sibling-link.ts"

export const SUITE_TREES_ROOT = "/var/tmp/suite-trees"

export const ABANDONED_AFTER_MS = 3_600_000

const SHORT = 7

export interface SuiteTree {
  readonly at: string
  readonly env: Readonly<Record<string, string>>
}

function randomSuffix(): string {
  return Math.random().toString(36).slice(2, 10)
}

export function suiteTreeEnv(pinnedAt: string): Readonly<Record<string, string>> {
  const roots = resolveRoots()
  const env: Record<string, string> = { ...(process.env as Record<string, string>) }
  for (const repo of REPOS) {
    const root = repo === "instructions" ? pinnedAt : roots[repo]
    if (root === undefined) continue
    env[rootEnvName(repo)] = root
  }
  return env
}

export async function withSuiteTree<T>(
  root: string,
  sha: string,
  fn: (tree: SuiteTree) => Promise<T>
): Promise<T> {
  sweepAbandonedSuiteTrees(root)
  const box = join(SUITE_TREES_ROOT, `${sha.slice(0, SHORT)}-${randomSuffix()}`)
  const at = join(box, "repo")
  mkdirSync(box, { recursive: true })
  linkSibling(box)
  execFileSync("git", ["-C", root, "worktree", "add", "--detach", at, sha], { stdio: "pipe" })
  try {
    linkModulesInto(at, root, await workspacesDeclaredIn(at))
    return await fn({ at, env: suiteTreeEnv(at) })
  } finally {
    try {
      execFileSync("git", ["-C", root, "worktree", "remove", "--force", at], { stdio: "pipe" })
    } catch {
      rmSync(at, { recursive: true, force: true })
    }
    rmSync(box, { recursive: true, force: true })
  }
}

export function sweepAbandonedSuiteTrees(root: string, now: number = Date.now()): void {
  if (!existsSync(SUITE_TREES_ROOT)) return
  let swept = false
  for (const name of readdirSync(SUITE_TREES_ROOT)) {
    if (name === SIBLING) continue
    const at = join(SUITE_TREES_ROOT, name)
    const stood = statSync(at, { throwIfNoEntry: false })
    if (stood === undefined || now - stood.mtimeMs < ABANDONED_AFTER_MS) continue
    rmSync(at, { recursive: true, force: true })
    swept = true
  }
  if (!swept) return
  try {
    execFileSync("git", ["-C", root, "worktree", "prune"], { stdio: "pipe" })
  } catch {
  }
}
