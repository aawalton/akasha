
import { addressParts } from "../../page/page-address.ts"
import { filedIn, pageRelIn, pageTypePathIn, repoPlacings } from "../../page/page-types.ts"
import { blockOf, textAt } from "../../page/text/text.ts"
import { type Roots } from "../../page/page"
import { AKASHA, REPOS, rootFor } from "../../repo/roots/roots"

const placings = new Map<string, ReadonlyMap<string, string>>()

function placedIn(roots: Roots): ReadonlyMap<string, string> {
  const key = REPOS.map((repo) => roots[repo]).join("\n")
  const held = placings.get(key)
  if (held !== undefined) return held
  const made = repoPlacings(roots)
  placings.set(key, made)
  return made
}

function filedRepoOf(text: string): string | null {
  const { fm, why } = blockOf(text)
  if (why !== null) return null
  return filedIn(fm)?.[0]?.repo ?? null
}

const typeRepos = new Map<string, string | null>()

export function repoHolding(type: string, roots: Roots): string | null {
  const at = rootFor(roots, AKASHA)
  if (at === undefined) return null
  const key = `${at}\n${type}`
  const held = typeRepos.get(key)
  if (held !== undefined) return held
  const text = textAt(at, pageTypePathIn(at, type))
  const found = (text === null ? null : filedRepoOf(text)) ?? placedIn(roots).get(type) ?? null
  typeRepos.set(key, found)
  return found
}

export interface Placed {
  readonly repo: string
  readonly root: string
  readonly relPath: string
  readonly absolute: string
}

export function placedElsewhere(slug: string, from: string, roots: Roots): Placed | null {
  const parts = addressParts(slug)
  if (parts === null) return null
  const repo = repoHolding(parts.type, roots)
  if (repo === null) return null
  const root = roots[repo]
  if (root === undefined || root === from) return null
  const relPath = pageRelIn(root, parts.type, parts.slug)
  return { repo, root, relPath, absolute: `${root}/${relPath}` }
}
