import { join } from "node:path"
import { type FileTree } from "../../page/file-tree.ts"
import { diskFileTree } from "../../page/file-tree.ts"
import { parseFrontmatter, textField } from "../../page/frontmatter.ts"
import { registryOf } from "../../page/property/registry.ts"
import { SLUG, newPageNameFor, placeDirOf, placesIn, scanIn, soleRepoOf } from "../../page/page-types.ts"
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
 * A PAGE IS SOUGHT BY ITS FILE STEM FIRST AND BY THE SLUG IT STATES ONLY ON A MISS. Both passes
 * stand because either alone loses a page. `page-types.ts:131` and `page/index/identity/identity.ts:158`
 * both derive a page's slug as the stated one falling back to the stem, so the stated slug is the
 * address the rest of the system answers to. Matching the STEM ALONE cannot reach a page whose
 * frontmatter states another slug, and the write then files a second page under an address the
 * first already holds. Matching the STATED SLUG ALONE regresses in mirror image: the page at
 * `pages/life-theme/temper.life-theme.md` states `slug: 946`, so its slug is not `temper`, and a
 * write addressed `life-theme/temper` would stop finding it and file the duplicate at that end
 * instead. Ordered, the two passes reach both and are ambiguous in neither — no name is at once
 * one file's stem and another's stated slug.
 *
 * THE PASSES ARE ORDERED RATHER THAN COMBINED BECAUSE THE SECOND ONE OPENS FILES. It runs only
 * where the free pass found nothing, which is the create path, where a file write and a commit are
 * about to happen regardless. 58,991 of 58,993 pages are reached by stem, so a patch essentially
 * never pays it. Folding both tests into one predicate would open every candidate on every write:
 * 279 ms for `story-chapter-royal-road`, whose place holds 17,905 files.
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
  const stands = (one: string): boolean => {
    const last = one.split("/").at(-1) ?? one
    return last === `${name}.md` || slugOf(last) === name
  }
  const statesSlug = (one: string): boolean => {
    const text = textAt(root, one)
    return text !== null && textField(parseFrontmatter(text), SLUG) === name
  }
  const filed = scanIn(root, placesIn(type, repo), repo)
  const held = filed.find(stands) ?? filed.find(statesSlug)
  const relPath = held ?? `${placeDirOf(type.slug)}/${newPageNameFor(type, name)}`
  return { root, repo, relPath, path: join(root, relPath) }
}
