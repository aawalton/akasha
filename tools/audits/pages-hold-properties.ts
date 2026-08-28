import { rootFor } from "../../repo/roots/roots.ts"
import type { Check } from "../lib/check.ts"
import { advise, over, skip } from "../../outcome/outcome.ts"
import { diskFileTree } from "../../page/file-tree.ts"
import { type CompiledPageType, compiledPageTypeFor, PROPERTY_ROOTS } from "../../page/property/frontmatter.ts"
import { judgeFrontmatter } from "../../page/property/judge.ts"
import { registryOf } from "../../page/property/registry.ts"
import { claimant, PAGE_TYPE_GLOBS } from "../../page/page-types.ts"
import { claimedPages, emptyClaim } from "./pages-hold-shape.ts"

const NAME = "pages-hold-properties"
const UNIT = "claimed page(s)"
const SHOWN = 12

function first(lines: readonly string[], noun: string): readonly string[] {
  return lines.length > SHOWN ? [...lines.slice(0, SHOWN), `… and ${lines.length - SHOWN} more ${noun}`] : lines
}

interface KeyLine {
  readonly page: string
  readonly type: string
  readonly line: string
}

function tally(named: readonly string[], lines: readonly KeyLine[], said: string): string {
  if (named.length === 0) return ""
  const carried = new Set(lines.map((one) => one.page)).size
  return `; ${named.length} key(s) ${said}, on ${carried} page(s)`
}

const KEY = /^`([^`]+)`: /

function byKey(lines: readonly KeyLine[]): readonly string[] {
  const groups = new Map<string, KeyLine[]>()
  for (const one of lines) {
    const key = KEY.exec(one.line)?.[1] ?? one.line
    groups.set(key, [...(groups.get(key) ?? []), one])
  }
  const named: string[] = []
  for (const [key, held] of groups) {
    const example = held[0]
    if (example === undefined) continue
    const types = [...new Set(held.map((one) => one.type))].map((one) => `\`${one}\``).join(", ")
    named.push(
      `\`${key}\` — ${held.length} page(s) under ${types}, e.g. ${example.page}: ${example.line.replace(KEY, "")}`
    )
  }
  return named
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
  const unjudged: KeyLine[] = []
  const elsewhere: KeyLine[] = []
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
    for (const line of verdict.unjudged) unjudged.push({ page: relPath, type: type.slug, line })
    for (const line of verdict.elsewhere) elsewhere.push({ page: relPath, type: type.slug, line })
    if (verdict.refusals.length === 0) {
      holding++
      continue
    }
    for (const refusal of verdict.refusals) refusals.push(`${relPath} — ${refusal}`)
  }

  const outside = `${holding} of ${measured} hold the properties their page type declares, ${measured - holding} outside them`
  const registry = `${types.length} page type(s) declare a property set`
  const apart = unjudgeable.length === 0 ? "" : `; ${unjudgeable.length} claimed but not judged`
  const named = byKey(unjudged)
  const aside = byKey(elsewhere)
  const keys = tally(named, unjudged, "nothing states a type for")
  const held = tally(aside, elsewhere, "whose value stands outside frontmatter")

  return {
    ...advise(NAME, `${outside}, against ${registry}${apart}${keys}${held}`, [
      ...first(unjudgeable, "claimed but not judged"),
      ...first(refusals, "refusal line(s)"),
      ...first(named, "key(s) nothing states a type for"),
      ...first(aside, "key(s) whose value stands outside frontmatter"),
    ]),
    population: over(pages.length, UNIT),
  }
}
