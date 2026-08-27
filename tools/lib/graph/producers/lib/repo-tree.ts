import type { Repo } from "../../../../../page/document/types.ts"
import type { BuildContext } from "../../types.ts"
import { repoFiles } from "./repo-files.ts"

export type RepoTree = {
  readonly paths: readonly string[]
  readonly hasFile: (relPath: string) => boolean
  readonly hasDir: (relPath: string) => boolean
  readonly hasPath: (relPath: string) => boolean
}

const treesByContext = new WeakMap<BuildContext, Map<Repo, RepoTree>>()

const buildTree = (ctx: BuildContext, repo: Repo): RepoTree => {
  const paths = repoFiles(ctx, repo, { includeFixtures: true, includeGenerated: true })
  const files = new Set(paths)
  const dirs = new Set<string>()
  for (const path of paths) {
    let slash = path.lastIndexOf("/")
    while (slash > 0) {
      const dir = path.slice(0, slash)
      if (dirs.has(dir)) break
      dirs.add(dir)
      slash = dir.lastIndexOf("/")
    }
  }
  const hasFile = (relPath: string): boolean => files.has(relPath)
  const hasDir = (relPath: string): boolean => relPath === "" || dirs.has(relPath)
  return {
    paths,
    hasFile,
    hasDir,
    hasPath: (relPath) => hasFile(relPath) || hasDir(relPath),
  }
}

export const repoTree = (ctx: BuildContext, repo: Repo): RepoTree => {
  const byRepo = treesByContext.get(ctx) ?? new Map<Repo, RepoTree>()
  treesByContext.set(ctx, byRepo)
  const cached = byRepo.get(repo)
  if (cached !== undefined) return cached
  const fresh = buildTree(ctx, repo)
  byRepo.set(repo, fresh)
  return fresh
}
