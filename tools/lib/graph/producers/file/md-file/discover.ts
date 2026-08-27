import { readRepoFile } from "../../../repos.ts"
import type { BuildContext } from "../../../types.ts"
import { CODE_REPO } from "../../../../../../repo/scope/scope.ts"
import { repoFiles } from "../../lib/repo-files.ts"

export type DiscoveredMdFile = {
  readonly relPath: string
  readonly content: string
}

const isMdFileName = (name: string): boolean => name.endsWith(".md")

export const walkMdFiles = (ctx: BuildContext): readonly string[] =>
  repoFiles(ctx, CODE_REPO).filter(isMdFileName)

export const discoverMdFiles = (ctx: BuildContext): readonly DiscoveredMdFile[] => {
  const out: DiscoveredMdFile[] = []
  for (const relPath of walkMdFiles(ctx)) {
    const content = readRepoFile(ctx, CODE_REPO, relPath)
    if (content === null) continue
    out.push({ relPath, content })
  }
  return out
}
