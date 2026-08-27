import type { Repo } from "../../../../../page/document/types.ts"
import type { BuildContext } from "../../types.ts"
import { CHECK_EXEMPT_DIRS } from "./constants.ts"

export type RepoFilesOptions = {
  readonly includeFixtures?: boolean
  readonly includeGenerated?: boolean
}

export const repoFiles = (
  ctx: BuildContext,
  repo: Repo,
  options?: RepoFilesOptions
): readonly string[] => {
  const raw = ctx.repoFiles.get(repo)
  if (raw === undefined) {
    throw new Error(`graph: the snapshot holds no reading of the ${repo} repository`)
  }
  const includeFixtures = options?.includeFixtures ?? false
  const includeGenerated = options?.includeGenerated ?? false
  if (includeFixtures && includeGenerated) return raw
  const isExempt = (rel: string): boolean => {
    for (const segment of rel.split("/")) {
      if (!CHECK_EXEMPT_DIRS.has(segment)) continue
      if (segment === "__fixtures__" && !includeFixtures) return true
      if (segment === "generated" && !includeGenerated) return true
    }
    return false
  }
  return raw.filter((rel) => !isExempt(rel))
}
