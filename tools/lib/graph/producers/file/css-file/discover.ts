import { posix } from "node:path"
import { readRepoFile } from "../../../repos.ts"
import type { BuildContext } from "../../../types.ts"
import { CODE_REPO } from "../../../../../../repo/scope/scope.ts"
import { repoFiles } from "../../lib/repo-files.ts"

export type DiscoveredCssFile = {
  readonly relPath: string
  readonly content: string
}

const isCssFileName = (name: string): boolean => name.endsWith(".css")

export const walkCssFiles = (ctx: BuildContext): readonly string[] =>
  repoFiles(ctx, CODE_REPO).filter(isCssFileName)

export const discoverCssFiles = (ctx: BuildContext): readonly DiscoveredCssFile[] => {
  const out: DiscoveredCssFile[] = []
  for (const relPath of walkCssFiles(ctx)) {
    const content = readRepoFile(ctx, CODE_REPO, relPath)
    if (content === null) continue
    out.push({ relPath, content })
  }
  return out
}

export const resolveRepoRelative = (fromDirRelPath: string, target: string): string | null => {
  const joined = posix.normalize(posix.join(fromDirRelPath, target))
  if (joined === ".." || joined.startsWith("../")) return null
  return joined === "." ? "" : joined
}

export const resolveRelativeToRepoRelative = (
  specifier: string,
  fromFileRelPath: string
): string | null => resolveRepoRelative(posix.dirname(fromFileRelPath), specifier)
