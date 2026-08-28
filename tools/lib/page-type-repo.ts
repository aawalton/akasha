
import { addressParts } from "../../page/page-address.ts"
import { indexReaches, loadPages } from "../../page/index/store/store.ts"
import { pageStemOf } from "../../page/name/name.ts"
import { filedIn, pageTypePathIn, placeDirOf, repoPlacings } from "../../page/page-types.ts"
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

const PAGE_TYPE = "page-type"

const typeFiles = new Map<string, ReadonlyMap<string, string>>()

/**
 * Where each page type's own file stands under this root, read off the index by the kind its name
 * carries.
 *
 * A PAGE TYPE NEED NOT STAND IN `pages/page-type/`. Eleven do not — the readout four and the graph
 * seven are filed beside their own domains — so deriving the path from the slug found no file for
 * exactly those, and `repoHolding` fell through to the `pages/` folder listing, which cannot see
 * them either. Both sources answered `null` where the registry answered `akasha`, and the caller
 * read that as a page type belonging to no repository rather than as a path it had guessed wrong.
 *
 * THE DERIVED PATH STILL STANDS BEHIND THIS, for a root the index does not describe: every fixture
 * tree is one, and a page type invented in one has no row anywhere.
 */
function typeFilesIn(at: string): ReadonlyMap<string, string> {
  const held = typeFiles.get(at)
  if (held !== undefined) return held
  const made = new Map<string, string>()
  if (indexReaches(AKASHA, at)) {
    for (const one of loadPages()) {
      if (one.repo === AKASHA && one.type === PAGE_TYPE) made.set(pageStemOf(one.key), one.key)
    }
  }
  typeFiles.set(at, made)
  return made
}

const typeRepos = new Map<string, string | null>()

export function repoHolding(type: string, roots: Roots): string | null {
  const at = rootFor(roots, AKASHA)
  if (at === undefined) return null
  const key = `${at}\n${type}`
  const held = typeRepos.get(key)
  if (held !== undefined) return held
  const text = textAt(at, typeFilesIn(at).get(type) ?? pageTypePathIn(at, type))
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
  const relPath = `${placeDirOf(parts.type)}/${parts.slug}.md`
  return { repo, root, relPath, absolute: `${root}/${relPath}` }
}
