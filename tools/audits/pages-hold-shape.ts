import type { Check } from "../lib/check.ts"
import { advise, over, skip } from "../../outcome/outcome"
import { diskFileTree } from "../../page/file-tree.ts"
import { registryOf } from "../../page/property/registry.ts"
import { hold, type Shape } from "../../page/shape/shape.ts"
import { partOutsideShape } from "../../page/shape/words.ts"
import { aboveOf, shapeFor } from "../../page/shape/chain.ts"
import { claimant, PAGE_TYPE_GLOBS, placesIn, reposOf, scanIn, type PageType } from "../../page/page-types.ts"
import { isDirty, rootFor } from "../../repo/roots/roots"

const NAME = "pages-hold-shape"
const UNIT = "claimed page(s)"
const SHOWN = 12

/**
 * The first few of one list, saying what the rest were.
 *
 * A TRUNCATION NOTICE NAMES ITS OWN LIST. This emitted a bare "… and N more", and a check that
 * shows two lists in one report emitted two of them, so a reader met two unlabelled tails and
 * could not tell which belonged to what. Worse, the summary above counts pages while a refusal
 * list counts lines — several per page — so the two numbers are true of one run and cannot be
 * reconciled. A seat read 373 failures off such a pair on 2026-08-27 and dispatched an agent
 * against them; the real figure was 3.
 */
function first(lines: readonly string[], noun: string): readonly string[] {
  return lines.length > SHOWN ? [...lines.slice(0, SHOWN), `… and ${lines.length - SHOWN} more ${noun}`] : lines
}

export function claimedPages(types: readonly PageType[], repo: string, root: string): readonly string[] {
  const places = types.flatMap((one) => placesIn(one, repo))
  return scanIn(root, places, repo).filter((relPath) => !isDirty(relPath))
}

export function emptyClaim(types: readonly PageType[], repo: string): string {
  const here = types.filter((one) => reposOf(one).includes(repo))
  if (types.length === 0)
    return `no page type stands at \`${PAGE_TYPE_GLOBS.join("` or `")}\`, so nothing anywhere is a page any page type claims`
  if (here.length === 0)
    return `no page type names ${repo}, so nothing there is a page any page type claims`
  return `${repo} holds no file matching any of the ${here.length} glob(s) the page types naming it state, so it holds no page any page type claims`
}

export const pagesHoldShape: Check = (repo) => {
  const tree = diskFileTree(repo.roots)
  const types = registryOf(tree)

  const shapes = new Map<string, Shape>()
  for (const type of types) shapes.set(type.relPath, shapeFor(type, tree))

  const pages = claimedPages(types, repo.name, rootFor(repo.roots, repo.name))
  if (pages.length === 0) {
    return { ...skip(NAME, emptyClaim(types, repo.name)), population: over(0, UNIT) }
  }

  const unjudgeable: string[] = []
  const refusals: string[] = []
  let measured = 0
  let holding = 0

  for (const relPath of pages) {
    const type = claimant(relPath, types).type
    if (type === null) continue
    const shape = shapes.get(type.relPath)!
    if (shape.compiled === null) {
      unjudgeable.push(`${relPath} — \`${type.slug}\` states no shape this can hold a body to: ${shape.why}`)
      continue
    }
    // A PAGE THE SCAN LISTED CAN BE GONE BY THE TIME IT IS READ. The fleet retires subagent
    // pages continuously, so a claimed path is a path that stood when the scan ran and nothing
    // more. An unguarded read throws out of this loop and takes the whole audit with it, and
    // every check batched behind it, over one page that did what its page type says it should.
    // `pages-hold-properties.ts` guards the identical call; this is that guard.
    let text: string
    try {
      text = repo.read(relPath)
    } catch {
      unjudgeable.push(`${relPath} — \`${type.slug}\` claims it and it left the tree while this ran`)
      continue
    }
    const { above, why } = aboveOf(relPath, text, tree)
    if (above === null) {
      unjudgeable.push(`${relPath} — what \`${type.slug}\` extends is unsettled: ${why}`)
      continue
    }
    measured++
    const verdict = hold(shape, relPath, text, above)
    if (verdict.ok) {
      holding++
      continue
    }
    for (const refusal of verdict.refusals) {
      refusals.push(
        partOutsideShape(refusal, `${relPath}:${refusal.span.start.line}`)
      )
    }
  }

  const outside = `${holding} of ${measured} hold the shape their page type states, ${measured - holding} outside it`
  const registry = `${types.length} page type(s) declare a shape`
  const apart = unjudgeable.length === 0 ? "" : `; ${unjudgeable.length} claimed but not judged`

  return {
    ...advise(NAME, `${outside}, against ${registry}${apart}`, [...first(unjudgeable, "claimed but not judged"), ...first(refusals, "refusal line(s)")]),
    population: over(pages.length, UNIT),
  }
}
