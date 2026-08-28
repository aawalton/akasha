
import { rootFor } from "../../repo/roots/roots.ts"
import type { Check } from "../lib/check.ts"
import { advise, over, skip } from "../../outcome/outcome"
import { diskFileTree } from "../../page/file-tree.ts"
import { type CompiledPageType, compiledPageTypeFor, PROPERTY_ROOTS } from "../../page/property/frontmatter.ts"
import { judgeFrontmatter } from "../../page/property/judge.ts"
import { registryOf } from "../../page/property/registry.ts"
import { claimant, PAGE_TYPE_GLOBS } from "../../page/page-types.ts"
import { claimedPages, emptyClaim } from "./pages-hold-shape.ts"

const NAME = "pages-hold-properties"
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

export const pagesHoldProperties: Check = (repo) => {
  const tree = diskFileTree(repo.roots)
  const types = registryOf(tree)
  const pages = claimedPages(types, repo.name, rootFor(repo.roots, repo.name))
  if (pages.length === 0) {
    return { ...skip(NAME, emptyClaim(types, repo.name)), population: over(0, UNIT) }
  }

  const declared = new Map<string, CompiledPageType>()
  for (const type of types) declared.set(type.relPath, compiledPageTypeFor(type, tree))

  const unjudgeable: string[] = []
  const refusals: string[] = []
  const unjudged: string[] = []
  let measured = 0
  let holding = 0

  for (const relPath of pages) {
    const type = claimant(relPath, types).type
    if (type === null) continue
    const held = declared.get(type.relPath)!
    const { properties, why } = held
    if (properties === null) {
      unjudgeable.push(`${relPath} — \`${type.slug}\` states no property set this can hold frontmatter to: ${why}`)
      continue
    }
    if (properties.length === 0) {
      unjudgeable.push(
        `${relPath} — nothing under \`${PROPERTY_ROOTS.join("/` or `")}/\` states \`defined-on-slug: ${type.slug}\` or names a type above it, so \`${type.slug}\` declares no property`
      )
      continue
    }
    let body: string
    try {
      body = repo.read(relPath)
    } catch {
      unjudgeable.push(`${relPath} — \`${type.slug}\` claims it and it left the tree while this ran`)
      continue
    }
    const verdict = judgeFrontmatter(body, type.slug, properties, null, held)
    if (verdict.why !== null) {
      unjudgeable.push(`${relPath} — \`${type.slug}\` claims it and ${verdict.why}`)
      continue
    }
    measured++
    for (const key of verdict.unjudged) unjudged.push(`${relPath} — ${key}`)
    if (verdict.refusals.length === 0) {
      holding++
      continue
    }
    for (const refusal of verdict.refusals) refusals.push(`${relPath} — ${refusal}`)
  }

  const outside = `${holding} of ${measured} hold the properties their page type declares, ${measured - holding} outside them`
  const registry = `${types.length} page type(s) declare a property set`
  const apart = unjudgeable.length === 0 ? "" : `; ${unjudgeable.length} claimed but not judged`
  const keys = unjudged.length === 0 ? "" : `; ${unjudged.length} key(s) nothing states a type for`

  return {
    ...advise(NAME, `${outside}, against ${registry}${apart}${keys}`, [
      ...first(unjudgeable, "claimed but not judged"),
      ...first(refusals, "refusal line(s)"),
    ]),
    population: over(pages.length, UNIT),
  }
}
