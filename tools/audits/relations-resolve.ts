import type { Check } from "../lib/check.ts"
import { judge, over } from "../../outcome/outcome"
import { diskFileTree } from "../../page/file-tree.ts"
import { chainOf } from "../../page/property/frontmatter.ts"
import { registryOf } from "../../page/property/registry.ts"
import { pagesOf, reposOf, type PageType } from "../../page/page-types.ts"
import { blockOf, textAt } from "../../page/text/text.ts"
import { stemOf as slugOf } from "../../page/name/name"
import { bearersFor, relationsOn, unread, unresolvable, wantsOf, type Reading } from "../../page/relation/relation.ts"
import { isAddressable, isDirty } from "../../repo/roots/roots"

const NAME = "relations-resolve"

export const relationsResolve: Check = (repo) => {
  const { roots } = repo
  const tree = diskFileTree(roots)
  const types = registryOf(tree)
  const chains = new Map<string, readonly string[]>()
  const chainFor = (type: PageType): readonly string[] => {
    const held = chains.get(type.relPath)
    if (held !== undefined) return held
    const { relPaths } = chainOf(type, tree)
    const made = relPaths === null ? [type.slug] : relPaths.map(slugOf)
    chains.set(type.relPath, made)
    return made
  }
  const listings = new Map<string, readonly string[]>()
  const homesOf = (type: PageType): readonly { repo: string; root: string }[] =>
    reposOf(type).flatMap((each) => {
      const root = isAddressable(each) ? roots[each] : undefined
      return root === undefined ? [] : [{ repo: each, root }]
    })
  const listing = (type: PageType): readonly string[] => {
    const held = listings.get(type.relPath)
    if (held !== undefined) return held
    const made = [...new Set(homesOf(type).flatMap((at) => pagesOf(at.root, type, at.repo)))]
    listings.set(type.relPath, made)
    return made
  }
  const openIn = (type: PageType, relPath: string): string | null => {
    for (const at of homesOf(type)) {
      const text = textAt(at.root, relPath)
      if (text !== null) return text
    }
    return null
  }
  const reading: Reading = {
    types,
    chainOf: chainFor,
    listing,
    open: (type, relPath) => openIn(type, relPath),
  }
  const bearers = bearersFor(reading)

  let total = 0
  let pages = 0
  const clean: string[] = []
  const quarantined: string[] = []
  for (const type of types) {
    if (homesOf(type).length === 0) continue
    const { relations } = relationsOn(type, tree)
    if (relations.length === 0) continue
    for (const relPath of listing(type)) {
      const text = openIn(type, relPath)
      if (text === null) continue
      const { fm, why } = blockOf(text)
      if (why !== null) continue
      pages += 1
      const { asked } = wantsOf(relations, fm)
      total += asked.length
      for (const want of asked) {
        if (bearers.holds(want)) continue
        const message = `${relPath} — ${unresolvable(want)}`
        if (isDirty(relPath)) quarantined.push(message)
        else clean.push(message)
      }
    }
  }
  const broken = clean.length + quarantined.length
  const verdict = judge(
    NAME,
    `${total - broken} of ${total} relations resolve across ${pages} page(s) of ${types.length} ` +
      `page type(s) — ${clean.length} unresolved among the live pages, ${quarantined.length} under quarantine`,
    [...clean, ...(bearers.missed.size === 0 ? [] : unread(bearers.missed))]
  )
  return { ...verdict, messages: [...clean, ...quarantined], population: over(total, "relation(s)") }
}
