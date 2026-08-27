export const BUILD_SHA_STAMP_FILE = "build/.build-sha"

export type BuildAndSwapRebuildDecision = "skip" | "rebuild"

export function decideBuildAndSwapRebuild(input: {
  readonly headSha: string
  readonly targetSha: string
  readonly artifactPresent: boolean
  readonly stampSha: string
}): BuildAndSwapRebuildDecision {
  if (input.headSha !== input.targetSha) return "rebuild"
  if (!input.artifactPresent) return "rebuild"
  if (input.stampSha !== input.targetSha) return "rebuild"
  return "skip"
}
