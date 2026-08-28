import { commitAuthor } from "../../agent/commit-author.ts"
import { commitPaths, whileHoldingLanding } from "../../repo/git/git.ts"
import { deferringCommits, queueCommit } from "./page-commit-queue.ts"
import { refuseALiveTestWrite } from "./live-store-write-guard.ts"
import { type Commit, type Landed, type Landings, commitNamed, landFiles } from "../../repo/land/land.ts"
import { type Where } from "./page-write-where.ts"

export function commitPages(
  root: string,
  relPaths: readonly string[],
  message: string
): string | null {
  if (relPaths.length === 0) return null
  const landed = whileHoldingLanding(root, () => commitPaths(root, relPaths, message, commitAuthor()))
  if (!landed.ok) return landed.reason
  return landed.value.ok ? null : landed.value.reason
}

function messageFor(pageType: string, act: string, name: string, by?: string): string {
  return `${pageType}: ${act} ${name}${by === undefined ? "" : ` for ${by}`}`
}

export function commitAll(
  at: Where,
  relPaths: readonly string[],
  pageType: string,
  act: string,
  name: string,
  by?: string
): string | null {
  if (relPaths.length === 0) return null
  if (deferringCommits()) {
    const said = `${pageType} ${act}${by === undefined ? "" : ` for ${by}`}`
    for (const relPath of relPaths) queueCommit(at.root, relPath, said)
    return null
  }
  return commitPages(at.root, relPaths, messageFor(pageType, act, name, by))
}

function commitVia(pageType: string, act: string, by?: string): Commit {
  return (root, named, message) => {
    if (named.length === 0) return null
    if (deferringCommits()) {
      const said = `${pageType} ${act}${by === undefined ? "" : ` for ${by}`}`
      for (const relPath of named) queueCommit(root, relPath, said)
      return null
    }
    return commitNamed(root, named, message)
  }
}

export type Took = {
  readonly landed: Landed | null
  readonly commitError: string | null
}

export function landOne(
  at: Where,
  pageType: string,
  act: string,
  name: string,
  by: string | undefined,
  more: Omit<Landings, "repo" | "root" | "message" | "commit">
): Took {
  try {
    const landed = landFiles({
      repo: at.repo,
      root: at.root,
      message: messageFor(pageType, act, name, by),
      commit: commitVia(pageType, act, by),
      ...more,
    })
    return { landed, commitError: null }
  } catch (err) {
    return { landed: null, commitError: err instanceof Error ? err.message : String(err) }
  }
}
