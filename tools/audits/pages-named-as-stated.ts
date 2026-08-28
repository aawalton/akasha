import { AKASHA, rootFor } from "../../repo/roots/roots.ts"
import type { AsyncCheck, CheckOutcome } from "../lib/check.ts"
import { constantHolesIn } from "@shared/pages-access/file-name"
import { filledBy, unfilledIn } from "../../named-for/named-for.ts"
import { parseFrontmatter, textField } from "../../page/frontmatter.ts"
import { advise, over, skip } from "../../outcome/outcome"
import { diskFileTree } from "../../page/file-tree.ts"
import { registryOf } from "../../page/property/registry.ts"
import { claimant, type PageType } from "../../page/page-types.ts"
import { textAt } from "../../page/text/text.ts"
import { pageStemOf } from "../../page/name/name"
import { refusalText } from "../../refusal/refusal.ts"
import { claimedPages, emptyClaim } from "./pages-hold-shape.ts"

const NAME = "pages-named-as-stated"
const UNIT = "claimed page(s)"
const KEY = "named-for"
const SHOWN = 12

const first = (lines: readonly string[]): readonly string[] =>
  lines.length > SHOWN ? [...lines.slice(0, SHOWN), `and ${lines.length - SHOWN} more`] : lines

const SLUG_RULE = "{slug}"

type Read = { readonly holes: readonly string[] } | { readonly name: string; readonly stem: string }

interface Unfilled {
  readonly relPath: string
  readonly holes: readonly string[]
}

interface Named {
  readonly relPath: string
  readonly name: string
  readonly stem: string
}

interface Covered {
  readonly type: PageType
  readonly template: string
  readonly unfilled: Unfilled[]
  readonly filled: Named[]
  readonly held: string[]
}

function fill(template: string, body: string): Read {
  const fm = parseFrontmatter(body)
  const heldAt = (key: string): string | null => textField(fm, key)
  const stem = filledBy(template, heldAt)
  if (stem === null) return { holes: unfilledIn(template, heldAt) }
  return { name: textField(fm, "slug") ?? stem, stem }
}

function isUnfilled(one: Read): one is { readonly holes: readonly string[] } {
  return "holes" in one
}

function sharedStems(one: Covered): readonly string[] {
  const byStem = new Map<string, string[]>()
  if (one.template.trim() === SLUG_RULE) return []
  for (const { relPath, stem } of one.filled) {
    const held = byStem.get(stem) ?? []
    held.push(relPath)
    byStem.set(stem, held)
  }
  const lines: string[] = []
  for (const [stem, paths] of byStem) {
    if (paths.length < 2) continue
    lines.push(
      `${paths[0]} - \`${one.type.slug}\` is named \`${one.template}\`, which fills to \`${stem}\` ` +
        `for ${paths.length} pages - ${paths.slice(0, 4).join(", ")}` +
        (paths.length > 4 ? `, and ${paths.length - 4} more` : "") +
        ` - one filled name is one page, so these are distinct pages sharing an address`
    )
  }
  return lines
}

export const pagesNamedAsStated: AsyncCheck = async (repo): Promise<CheckOutcome> => {
  const types = registryOf(diskFileTree(repo.roots))
  const pages = claimedPages(types, repo.name, rootFor(repo.roots, repo.name))
  if (pages.length === 0)
    return { ...skip(NAME, emptyClaim(types, repo.name)), population: over(0, UNIT) }

  const covered = new Map<string, Covered>()
  for (const type of types) {
    const text = textAt(rootFor(repo.roots, AKASHA), type.relPath)
    const template = text === null ? null : textField(parseFrontmatter(text), KEY)
    if (template !== null)
      covered.set(type.relPath, { type, template, unfilled: [], filled: [], held: [] })
  }

  for (const relPath of pages) {
    const type = claimant(relPath, types).type
    if (type === null) continue
    const under = covered.get(type.relPath)
    if (under === undefined) continue
    const read = fill(under.template, repo.read(relPath))
    if (isUnfilled(read)) {
      under.unfilled.push({ relPath, holes: read.holes })
      continue
    }
    under.filled.push({ relPath, name: read.name, stem: read.stem })
    if (pageStemOf(relPath) === read.name) under.held.push(relPath)
  }

  const refusals: string[] = []
  let counted = 0
  let holding = 0
  for (const one of covered.values()) {
    // THE `instructions` REPOSITORY IS GONE, absorbed into akasha, so the pages this rule is about
    // stand here. This read `repo.name === "instructions"`, which no repository answers to any more,
    // so the arm below was weighed over none of the conventions and every naming rule that a file
    // page can never satisfy passed unnamed — while the check went on reporting the pages it did
    // count, which is what made the gap invisible.
    const constant = repo.name === AKASHA ? constantHolesIn(one.template) : []
    if (constant.length > 0) {
      refusals.push(
        `${one.type.relPath} - \`${one.type.slug}\` is named \`${one.template}\`, and a file page ` +
          `carries no \`${constant.join("`, no `")}\` of its own - the row a file is read into ` +
          `settles that key, so every write that states no name of its own is refused here and ` +
          `no page of this type can be minted under this rule`
      )
    }
    const seen = one.unfilled.length + one.filled.length
    if (seen === 0) continue
    counted += seen
    holding += one.held.length
    if (one.filled.length === 0) {
      refusals.push(
        refusalText(
          "page-name-key-unwritten",
          { slug: one.type.slug, named: one.template, count: String(seen) },
          rootFor(repo.roots, AKASHA)
        )
      )
      continue
    }
    refusals.push(...sharedStems(one))
    for (const { relPath, holes } of one.unfilled)
      refusals.push(
        `${relPath} - \`${one.type.slug}\` is named \`${one.template}\` and this page carries no ` +
          `\`${holes.join(":`, no `")}:\`, though its siblings do`
      )
    for (const { relPath, name } of one.filled) {
      if (one.held.includes(relPath)) continue
      refusals.push(
        `${relPath} - \`${one.type.slug}\` is named \`${one.template}\`, which fills to \`${name}\` ` +
          `against a file named \`${pageStemOf(relPath)}\` - the name on disk and the name in the page differ`
      )
    }
  }

  const detail =
    counted === 0
      ? `no page type here states a rule its files are named by, so every file's name is the page's own name, over ${pages.length} page(s)`
      : `${holding} of ${counted} covered page(s) carry the name their file does, across ${covered.size} convention(s), over ${pages.length} page(s)`
  return { ...advise(NAME, detail, first(refusals)), population: over(pages.length, UNIT) }
}
