
import { existsSync } from "node:fs"
import { ownRepoRoot } from "../../repo/roots/roots.ts"

/**
 * The tree these tools walk.
 *
 * THE `code` REPOSITORY IS GONE, absorbed into akasha, so this answers the akasha root. `CODE_ROOT`
 * still overrides it, because CI points that at the checkout a run works in.
 *
 * A `CODE_ROOT` NAMING A DIRECTORY THAT IS NOT THERE IS DISREGARDED. Every shell started before the
 * consolidation still exports the old path, and honouring it would send each of these callers to
 * walk a tree that no longer exists — which returns an empty set, indistinguishable from a tree
 * with nothing in it, so every check over it reports clean.
 */
export function codeRoot(): string {
  const stated = process.env.CODE_ROOT
  if (stated !== undefined && stated !== "" && existsSync(stated)) return stated
  return ownRepoRoot()
}
