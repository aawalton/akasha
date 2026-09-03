import { join } from "node:path"
import { fileStemOf as slugOf } from "@akasha/file-page-identity"
import { diskFileTree, type FileTree } from "@akasha/markdown-pages/file-tree"
import { parseFrontmatter, textField } from "@akasha/markdown-pages/frontmatter"
import { MARKDOWN } from "@akasha/markdown-pages/page-file"
import {
  folderIn,
  newPageNameFor,
  placeDirOf,
  placesIn,
  SLUG,
  scanIn,
  soleRepoOf,
  typeSlotOf,
} from "@akasha/markdown-pages/page-types"
import { registryOf } from "@akasha/markdown-pages/property-registry"
import { textAt } from "@akasha/markdown-pages/text-at"
import { isAddressable } from "@akasha/pages-system/checkout-roots"
import type { Roots } from "@akasha/pages-system/markdown-page-at"

export interface Where {
  readonly root: string
  readonly repo: string
  readonly relPath: string
  readonly path: string
}

/**
 * Where a page of this type and name stands, or where a new markdown one would.
 *
 * Both halves of the question used to be the markdown half. `stands` asked `typeSuffixOf`, which
 * answers the empty text for a `.ts` name, so it was false for every one of Alan's 133 moved days
 * before the name was ever compared; `statesSlug` then read a frontmatter block a TypeScript page
 * does not carry. Nothing was found, and the fallback built a name ending `.md` under a folder
 * taken from the type's `.ts` place — `akasha/alan/daily-tracking/day-2026-03-05.daily-tracking.md`,
 * a file that is not on disk and that nothing may write, since a page under `akasha/` lands through
 * `akasha write` alone. Fourteen callers took that path for the day.
 *
 * So the fallback is built from the type's markdown places only, and a type stating none of them is
 * refused rather than answered. A caller asking where to put a page this cannot place gets nothing
 * and can say so; a caller asking where a landed page stands gets the page, of either kind.
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
    if (typeSlotOf(last) !== type.slug) return false
    return last === `${name}${MARKDOWN}` || slugOf(last) === name
  }
  const statesSlug = (one: string): boolean => {
    const text = textAt(root, one)
    return text !== null && textField(parseFrontmatter(text), SLUG) === name
  }
  const stated = placesIn(type, repo)
  const filed = scanIn(root, stated, repo)
  const held = filed.find(stands) ?? filed.find(statesSlug)
  if (held !== undefined) return { root, repo, relPath: held, path: join(root, held) }
  const markdown = stated.filter((one) => one.endsWith(MARKDOWN))
  if (markdown.length === 0) return null
  const dir = markdown.map(folderIn).find((one) => one !== "") ?? placeDirOf(type.slug)
  const relPath = `${dir}/${newPageNameFor(type, name)}`
  return { root, repo, relPath, path: join(root, relPath) }
}
