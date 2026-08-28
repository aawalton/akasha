import { type Gate, readsText, type Subject, textOf } from "../lib/gate.ts"
import { judge, skip } from "../../outcome/outcome"
import type { FileTree } from "../../page/file-tree.ts"
import { chainOf } from "../../page/property/frontmatter.ts"
import { registryOf } from "../../page/property/registry.ts"
import { fileTreeOf } from "../page/page-file-tree.ts"
import { claimant, pagesOf, reposOf, type PageType } from "../../page/page-types.ts"
import { blockOf, textAt } from "../../page/text/text.ts"
import { pageStemOf } from "../../page/name/name"
import {
  bearersFor,
  relationsOn,
  unread,
  unresolvable,
  wantsOf,
  type Reading,
  type Want,
} from "../../page/relation/relation.ts"
import { isAddressable, isDirty, targetRepo, targetRoot } from "../../repo/roots/roots"

const NAME = "relations-resolve"

function readingFor(subject: Subject, types: readonly PageType[], tree: FileTree): Reading {
  const repo = targetRepo(subject.roots)
  const root = targetRoot(subject.roots)
  const writing = new Set([...subject.pending, subject.relPath])
  const chains = new Map<string, readonly string[]>()
  const listings = new Map<string, readonly string[]>()
  const homesOf = (type: PageType): readonly { repo: string; root: string }[] =>
    reposOf(type).flatMap((each) => {
      const at = isAddressable(each) ? subject.roots[each] : undefined
      return at === undefined ? [] : [{ repo: each, root: at }]
    })
  return {
    types,
    chainOf: (type) => {
      const held = chains.get(type.relPath)
      if (held !== undefined) return held
      const { relPaths } = chainOf(type, tree)
      const made = relPaths === null ? [type.slug] : relPaths.map((at) => pageStemOf(at))
      chains.set(type.relPath, made)
      return made
    },
    listing: (type) => {
      const held = listings.get(type.relPath)
      if (held !== undefined) return held
      const standing = homesOf(type).flatMap((at) => pagesOf(at.root, type, at.repo))
      const also = reposOf(type).includes(repo)
        ? [...writing].filter((one) => claimant(one, [type]).type !== null)
        : []
      const made = [...new Set([...standing, ...also])]
      listings.set(type.relPath, made)
      return made
    },
    open: (type, relPath) => {
      const here = reposOf(type).includes(repo)
      if (here && relPath === subject.relPath) return textOf(subject)
      if (here && writing.has(relPath)) return subject.read(`${root}/${relPath}`)
      for (const at of homesOf(type)) {
        const text = textAt(at.root, relPath)
        if (text !== null) return text
      }
      return null
    },
  }
}

function alreadyStated(subject: Subject, relations: Parameters<typeof wantsOf>[0]): ReadonlySet<string> {
  const before = textAt(targetRoot(subject.roots), subject.relPath)
  if (before === null) return new Set()
  const { fm, why } = blockOf(before)
  if (why !== null) return new Set()
  return new Set(wantsOf(relations, fm).asked.map(stated))
}

function stated(want: Want): string {
  return `${want.relation.key}\n${want.relation.target ?? ""}\n${want.value}`
}

export const relationsResolve: Gate = (subject) => {
  if (isDirty(subject.relPath)) {
    return skip(NAME, "nothing under quarantine names a relation that anything resolves to")
  }
  if (!subject.relPath.endsWith(".md")) {
    return skip(NAME, "not a markdown file, so it carries no frontmatter to name a relation in")
  }
  const body = textOf(subject)
  if (body === null) return readsText(NAME)
  const { fm, why } = blockOf(body)
  if (why !== null && !fm.present) return skip(NAME, `${why}, so it names no relation`)
  if (why !== null) {
    return judge(NAME, `its frontmatter block was reached but not read, so nothing here was measured`, [
      `${why} — until it reads, no relation it states can be resolved and none of its keys can be ` +
        `checked, so this write is refused rather than passed as naming nothing`,
    ])
  }
  const tree = fileTreeOf(subject)
  const types = registryOf(tree)
  const claim = claimant(subject.relPath, types)
  if (claim.type === null) return skip(NAME, `${claim.why}, so nothing says which of its keys are relations`)
  const { relations, why: unbuilt } = relationsOn(claim.type, tree)
  if (unbuilt !== null) {
    return judge(NAME, `\`${claim.slug}\` was judged over a file tree that does not read`, [unbuilt])
  }
  if (relations.length === 0) {
    return skip(NAME, `\`${claim.slug}\` states no relation, so nothing here points at a page`)
  }
  const { asked, spared } = wantsOf(relations, fm)
  const standing = alreadyStated(subject, relations)
  const fresh = asked.filter((want) => !standing.has(stated(want)))
  if (fresh.length === 0) {
    return skip(
      NAME,
      `\`${claim.slug}\` names ${asked.length} relation(s) and this write changes none of them, ` +
        `so each already stood against the same pages`
    )
  }
  const bearers = bearersFor(readingFor(subject, types, tree))
  const broken = fresh.filter((want) => !bearers.holds(want))
  const bounded = [...new Set(fresh.map((want) => want.relation.target))]
    .filter((slug): slug is string => slug !== null)
    .sort()
    .map((slug) => `\`${slug}\``)
  const anywhere = fresh.some((want) => want.relation.target === null)
  const over = [...bounded, ...(anywhere ? ["every page type"] : [])].join(", ")
  return judge(
    NAME,
    `${fresh.length - broken.length} of ${fresh.length} relation(s) this write changes resolve, ` +
      `found in ${bearers.looked} page(s) read of those standing under ${over}` +
      `${asked.length === fresh.length ? "" : `; ${asked.length - fresh.length} unchanged and not asked again`}` +
      `${spared === 0 ? "" : `; ${spared} may name what is gone and ${spared === 1 ? "is" : "are"} not asked to resolve`}`,
    [...broken.map(unresolvable), ...(bearers.missed.size === 0 ? [] : unread(bearers.missed))]
  )
}
