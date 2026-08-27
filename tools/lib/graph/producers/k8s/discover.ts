import { posix } from "node:path"
import { readRepoFile } from "../../repos.ts"
import type { BuildContext } from "../../types.ts"
import { CODE_REPO } from "../../../../../repo/scope/scope.ts"
import { repoFiles } from "../lib/repo-files.ts"

export type DiscoveredManifest = {
  readonly relPath: string
  readonly text: string
}

const isManifestFileName = (name: string): boolean => {
  if (name.endsWith(".sops.yaml") || name.endsWith(".sops.yml")) return false
  return name.endsWith(".yaml") || name.endsWith(".yml")
}

export const walkManifestFiles = (ctx: BuildContext): readonly string[] =>
  repoFiles(ctx, CODE_REPO).filter((relPath) => isManifestFileName(posix.basename(relPath)))

export const discoverManifests = (ctx: BuildContext): readonly DiscoveredManifest[] => {
  const out: DiscoveredManifest[] = []
  for (const relPath of walkManifestFiles(ctx)) {
    const text = readRepoFile(ctx, CODE_REPO, relPath)
    if (text === null) {
      throw new Error(
        `graph: the snapshot listed the manifest ${relPath} but could not read it, and going on ` +
          `would report a clean run over a population that quietly shrank`
      )
    }
    out.push({ relPath, text })
  }
  return out
}
