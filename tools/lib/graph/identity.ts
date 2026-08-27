import { createHash } from "node:crypto"
import { statSync } from "node:fs"
import { join } from "node:path"
import type { Repo } from "../../../page/document/types.ts"
import type { BuildContext } from "./types.ts"

export type SnapshotIdentity = {
  readonly commit: string
  readonly repos: Readonly<Partial<Record<Repo, string>>>
}

const CODE_REPO: Repo = "code"

const stateOf = (root: string, files: readonly string[]): string => {
  const hash = createHash("sha256")
  for (const path of files) {
    hash.update(path)
    try {
      const stat = statSync(join(root, path))
      hash.update(`\0${stat.size}\0${stat.mtimeMs}\n`)
    } catch {
      hash.update("\0absent\n")
    }
  }
  return hash.digest("hex").slice(0, 16)
}

export const identityOf = (ctx: BuildContext): SnapshotIdentity => {
  const repos: Partial<Record<Repo, string>> = {}
  for (const [repo, files] of ctx.repoFiles) {
    const root = ctx.repoRoots.get(repo)
    if (root === undefined) continue
    repos[repo] = repo === CODE_REPO ? ctx.commit : stateOf(root, files)
  }
  return { commit: ctx.commit, repos }
}

export const identityKey = (identity: SnapshotIdentity): string =>
  Object.keys(identity.repos)
    .sort()
    .map((repo) => `${repo}=${identity.repos[repo as Repo]}`)
    .join(" ")
