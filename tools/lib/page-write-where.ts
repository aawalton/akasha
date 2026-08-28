import { join } from "node:path"
import { type FileTree } from "../../page/file-tree.ts"
import { diskFileTree } from "../../page/file-tree.ts"
import { parseFrontmatter, textField } from "../../page/frontmatter.ts"
import { registryOf } from "../../page/property/registry.ts"
import {
  SLUG,
  folderIn,
  newPageNameFor,
  placeDirOf,
  placesIn,
  scanIn,
  soleRepoOf,
  typeSuffixOf,
} from "../../page/page-types.ts"
import { stemOf as slugOf } from "../../page/name/name.ts"
import { type Roots } from "../../page/page.ts"
import { textAt } from "../../page/text/text.ts"
import { isAddressable } from "../../repo/roots/roots.ts"

export interface Where {
  readonly root: string
  readonly repo: string
  readonly relPath: string
  readonly path: string
}

/**
 * Where a write addressed `<pageType>/<name>` lands.
 *
 * A PAGE IS SOUGHT BY ITS FILE STEM FIRST AND BY THE SLUG IT STATES ONLY ON A MISS. `page-types.ts:131`
 * and `page/index/identity/identity.ts:158` both derive a page's slug as the stated one falling back
 * to the stem, so the stated slug is the address the rest of the system answers to. BOTH PASSES ARE
 * LOAD-BEARING, and each was checked by removing it and watching a duplicate appear.
 *
 * WITHOUT THE STEM PASS, a page that states no slug is unreachable, and the fallback below then files
 * a second page at the composed path. That bites wherever a page does not stand at its composed path,
 * which is every nested one: 34,268 pages stand nested under their type's directory and 160 of those
 * state no slug at all.
 *
 * WITHOUT THE SLUG PASS, a page whose stated slug is not its stem is unreachable the other way, and
 * the write files a second page carrying an address the first already holds. No page of 59,247
 * stands in that shape: the two that did were faults `page-named-as-stated` reported, and each has
 * been named to its stem, so the pass guards a shape the corpus no longer holds.
 * Note that a slug-stating page which DOES stand at its composed path is reached either way, because
 * the fallback rebuilds its exact path; the duplicate needs the drift and a nested page to show up.
 *
 * THE PASSES ARE ORDERED RATHER THAN COMBINED BECAUSE THE SECOND ONE OPENS FILES. It runs only where
 * the free pass found nothing, which is the create path, where a file write and a commit are about to
 * happen regardless. Folding both tests into one predicate would open every candidate on every write:
 * 279 ms for `story-chapter-royal-road`, whose place holds 17,905 files.
 *
 * A NEW PAGE'S DIRECTORY IS TAKEN FROM THE STATED PLACE RATHER THAN FROM THE SLUG. `placeDirOf`
 * composes `pages/<slug>` and never reads the `files:` glob, so for a page type whose glob names a
 * directory the composed path cannot match the glob its own page type states, and the page it files
 * would be claimed by no page type — passed over by every check, index and query keyed on one. The
 * glob is what finds an existing page, so it is what places a new one.
 */
export function whereFor(
  roots: Roots,
  pageType: string,
  name: string,
  tree: FileTree = diskFileTree(roots)
): Where | null {
  const type = registryOf(tree).find((one) => one.slug === pageType)
  if (type === undefined) return null
  const repo = soleRepoOf(type)
  if (repo === null || !isAddressable(repo)) return null
  const root = roots[repo]
  if (root === undefined) return null
  // A CANDIDATE MUST CARRY THIS PAGE TYPE'S SEGMENT. Both tests below would otherwise claim a file
  // named `<name>.md` carrying no type at all: the first matches it outright, and `stemOf` cuts at the
  // first dot, so the second reads its stem as `<name>` too. Nothing offers one today because every
  // `files:` glob ends `*.<slug>.md` — 313 across `pages/page-type/`, and the two that constrain a
  // directory constrain the suffix as well — which is a property of the data rather than of this
  // code. `newPageNameFor` composes `<name>.<slug>.md`, so this asks of a page that stands exactly
  // what it spells for one that does not.
  const stands = (one: string): boolean => {
    const last = one.split("/").at(-1) ?? one
    if (typeSuffixOf(last) !== type.slug) return false
    return last === `${name}.md` || slugOf(last) === name
  }
  const statesSlug = (one: string): boolean => {
    const text = textAt(root, one)
    return text !== null && textField(parseFrontmatter(text), SLUG) === name
  }
  const stated = placesIn(type, repo)
  const filed = scanIn(root, stated, repo)
  const held = filed.find(stands) ?? filed.find(statesSlug)
  const dir = stated.map(folderIn).find((one) => one !== "") ?? placeDirOf(type.slug)
  const relPath = held ?? `${dir}/${newPageNameFor(type, name)}`
  return { root, repo, relPath, path: join(root, relPath) }
}
