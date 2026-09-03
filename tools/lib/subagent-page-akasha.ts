import { AKASHA, resolveRoots, rootFor } from "@akasha/pages-system/checkout-roots"
import type { Roots } from "@akasha/pages-system/markdown-page-at"
import type { Outcome } from "../../akasha/command-system/gated-write/gated-write.module.code.ts"
import {
  pathOf,
  pathsUnder,
  SUBAGENTS_AT,
  slugOf,
  tookUnder,
} from "../../akasha/seat-system/subagents/presence/subagent-presence.module.code.ts"

export function akashaSubagentSlug(seatName: string, own: string): string {
  return slugOf(seatName, own)
}

export function akashaSubagentRelPath(slug: string): string {
  return pathOf(slug)
}

export function akashaSubagentsDirIn(root: string): string {
  return `${root}/${SUBAGENTS_AT}`
}

// The readers here address a page on disk rather than in a commit, so what they are handed is
// rooted. What lands a change addresses it under the repository root, so the two are parted here.
export function akashaSubagentPathsOf(
  seatName: string,
  roots: Roots = resolveRoots()
): readonly string[] {
  const root = rootFor(roots, AKASHA)
  return pathsUnder(root, seatName).map((one) => `${root}/${one}`)
}

export function removeAkashaSubagentPagesOf(
  seatName: string,
  why: string,
  roots: Roots = resolveRoots()
): Outcome {
  const root = rootFor(roots, AKASHA)
  if (pathsUnder(root, seatName).length === 0) return { kind: "unchanged" }
  if (tookUnder(root, seatName, why)) return { kind: "removed" }
  return { kind: "refused", detail: `the subagent pages under ${seatName} did not go` }
}
