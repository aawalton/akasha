import {
  type Value,
  valueAt,
} from "../../akasha/pages-system/indexes/index-entries/index-entries.module.code.ts"
import {
  everyOfType,
  everyPathAnswered,
} from "../../akasha/pages-system/indexes/index-reading/index-reading.module.code.ts"
import { kindsUnder } from "../../akasha/pages-system/page-type/page-type-descent/page-type-descent.module.code.ts"
import type { Frontmatter } from "../../page/frontmatter.ts"

const DOMAIN = "domain"

const PARENTS_KEY = "domain-parent-slug"

export interface DomainStanding {
  readonly relPath: string
  readonly slug: string
  readonly address: string
  readonly frontmatter: Frontmatter
}

interface Held {
  readonly relPath: string
  readonly slug: string
  readonly address: string
  readonly value: Value
}

function kebab(key: string): string {
  return key.replace(/[A-Z]/g, (one) => `-${one.toLowerCase()}`)
}

function textIn(value: Value, key: string): string | null {
  const held = value[key]
  return typeof held === "string" ? held : null
}

function frontmatterFrom(value: Value, parents: readonly string[]): Frontmatter {
  const fields = new Map<string, unknown>()
  for (const [key, held] of Object.entries(value)) fields.set(kebab(key), held)
  if (parents.length > 0) fields.set(PARENTS_KEY, [...parents])
  return {
    present: true,
    fields,
    keys: [...fields.keys()],
    error: null,
    lineCount: 0,
  }
}

function heldIn(root: string): readonly Held[] {
  const found: Held[] = []
  for (const kind of kindsUnder(root, DOMAIN)) {
    for (const standing of everyOfType(root, kind)) {
      let value: Value | null
      try {
        value = valueAt(standing.path, root)
      } catch {
        continue
      }
      if (value === null) continue
      const slug = textIn(value, "slug")
      const pageTypeSlug = textIn(value, "pageTypeSlug")
      if (slug === null || pageTypeSlug === null) continue
      found.push({ relPath: standing.path, slug, address: `${pageTypeSlug}/${slug}`, value })
    }
  }
  return found
}

function parentsIn(held: readonly Held[]): ReadonlyMap<string, readonly string[]> {
  const parents = new Map<string, string[]>()
  for (const one of held) {
    const parts = one.value.partSlugs
    if (!Array.isArray(parts)) continue
    for (const part of parts) {
      if (typeof part !== "string") continue
      const standing = parents.get(part) ?? []
      standing.push(one.address)
      parents.set(part, standing)
    }
  }
  return parents
}

const byRoot = new Map<string, readonly DomainStanding[]>()

export function domainsStanding(root: string): readonly DomainStanding[] {
  const done = byRoot.get(root)
  if (done !== undefined) return done
  everyPathAnswered(root)
  const held = heldIn(root)
  const parents = parentsIn(held)
  const read = held.map((one) => ({
    relPath: one.relPath,
    slug: one.slug,
    address: one.address,
    frontmatter: frontmatterFrom(one.value, parents.get(one.address) ?? []),
  }))
  byRoot.set(root, read)
  return read
}
