
import { AKASHA, rootFor } from "../../repo/roots/roots.ts"
import { readFileSync } from "node:fs"
import { ATTRIBUTES, attributesOf, modeOf } from "./attributes.ts"
import { documentsOnDemand } from "./documents-on-demand.ts"
import { listField } from "../../page/frontmatter.ts"
import { subagentStated } from "./hold-seat.ts"
import type { Roots } from "../../page/page"
import { declaredSeatReading } from "./declared-seat-reading.ts"
import type { SeatDocument } from "./seat-attribute.ts"
import { INITIATIVE_SLUG_KEY } from "./seat-initiative.ts"
import { pageTextOf } from "./seat-page-values.ts"
import { onCallOf } from "./seat-on-call.ts"
import { principalOf } from "./seat-principal.ts"
import { sectionNamed, trimEdges } from "./section.ts"

export const CONDITIONAL_READING_KEY = "conditional-reading-slugs"

export function seatDocuments(agent: string, roots: Roots): readonly SeatDocument[] {
  const root = rootFor(roots, AKASHA)
  const documents = documentsOnDemand(root)
  const inherited = subagentStated(agent, root)
  const attributes = inherited ?? attributesOf(agent)
  const warranted = declaredSeatReading(
    {
      attributes,
      initiative: inherited === null ? pageTextOf(agent, INITIATIVE_SLUG_KEY) : null,
      mode: inherited === null ? modeOf(agent) : null,
      onCall: inherited === null && onCallOf(agent),
      principal: inherited === null ? (principalOf(agent)?.value ?? null) : null,
    },
    roots,
    documents
  )
  const held = new Map<string, SeatDocument>()
  for (const one of warranted) {
    for (const at of one.documents ?? []) held.set(`${at.root}/${at.relPath}`, at)
  }
  return [...held.values()]
}

export interface Conditional {
  readonly slug: string
  readonly relPath: string
  readonly definition: string
}

function definitionOf(root: string, relPath: string): string {
  let body: string
  try {
    body = readFileSync(`${root}/${relPath}`, "utf8")
  } catch {
    return ""
  }
  const found = sectionNamed(body, "Definition")
  return found === null ? "" : trimEdges(found.body)
}

export function conditionalBelow(paths: readonly string[], root: string): readonly Conditional[] {
  const documents = documentsOnDemand(root)
  const standing = new Set(paths)
  const out = new Map<string, Conditional>()
  for (const at of paths) {
    const held = documents.frontmatterOf(at)
    if (held === null) continue
    for (const slug of listField(held, CONDITIONAL_READING_KEY)) {
      if (out.has(slug)) continue
      const relPath = documents.domainAt(slug)
      if (relPath === null || standing.has(relPath)) continue
      out.set(slug, { slug, relPath, definition: definitionOf(root, relPath) })
    }
  }
  return [...out.values()].sort((left, right) => left.slug.localeCompare(right.slug))
}

export function conditionalCaption(count: number): string {
  return (
    `read:   ${count} document(s) below are conditional reading: what stands above names them, and each is ` +
    `required once you judge it bears on what you are doing. Its definition is here and its body is not — ` +
    `read the one you need by its path and you have it whole.`
  )
}

export function conditionalText(one: Conditional): string {
  return `cond:   ${one.slug} — ${one.relPath}\n${one.definition}`
}
