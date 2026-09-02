import { diskFileTree } from "../../page/file-tree.ts"
import { registryOf } from "../../page/property/registry.ts"
import { placesIn } from "../../page/page-types.ts"
import type { Roots } from "@akasha/pages-system/markdown-page-at"

/**
 * Where the pages of a type stand, refusing a name that is no page type.
 *
 * The pages system service states the rule these follow: a page type no page is filed under is
 * answered empty, and a name that is no page type is refused rather than answered empty. A true
 * empty and a failure read alike, and only one of them is a fault.
 *
 * Both of these used to answer `[]` for either case, so a page type that had been renamed, moved
 * or never declared came back from `documentsOfType` looking exactly like a page type with no
 * pages yet. `tools/audits/persona-values.ts` is the one caller, and it would then have judged
 * every persona against nothing and said so only as the figure `0 page(s)` inside its own summary
 * line — a check reporting itself clean over a folder it never opened.
 */
export function placesFor(roots: Roots, repo: string, slug: string): readonly string[] {
  const type = registryOf(diskFileTree(roots)).find((one) => one.slug === slug)
  if (type === undefined) {
    throw new Error(
      `\`${slug}\` names no page type, so where its pages stand cannot be said. ` +
        "This is refused rather than answered with no places, which would read as a page type " +
        "that simply holds no pages yet."
    )
  }
  return placesIn(type, repo)
}

export function documentsOfType(
  roots: Roots,
  repo: string,
  documents: readonly string[],
  slug: string
): readonly string[] {
  // A declared page type that names no place in this repo holds no pages here, which is a true
  // empty and is answered as one. `placesFor` has already refused the name that is no page type.
  const places = placesFor(roots, repo, slug).map((one) => new Bun.Glob(one))
  if (places.length === 0) return []
  return documents.filter((one) => places.some((place) => place.match(one)))
}
