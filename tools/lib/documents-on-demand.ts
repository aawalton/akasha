import { readFileSync } from "node:fs"
import { listDocuments } from "./check.ts"
import { stemOf as slugOf } from "../../page/name/name"
import { type Documents, DOMAIN_SLUG_KEY } from "./domain.ts"
import { slugNamed } from "../../page/page-address.ts"
import { type Frontmatter, parseFrontmatter, textField } from "../../page/frontmatter.ts"
import { isDirty } from "../../repo/roots/roots"

export function documentsOnDemand(root: string): Documents {
  const parsed = new Map<string, Frontmatter | null>()
  let byStem: ReadonlyMap<string, readonly string[]> | null = null
  let bySlug: ReadonlyMap<string, string> | null = null
  const read = (relPath: string): Frontmatter | null => {
    if (parsed.has(relPath)) return parsed.get(relPath) ?? null
    let held: Frontmatter | null = null
    try {
      held = parseFrontmatter(readFileSync(`${root}/${relPath}`, "utf8"))
    } catch {
      held = null
    }
    parsed.set(relPath, held)
    return held
  }
  const stems = (): ReadonlyMap<string, readonly string[]> => {
    if (byStem !== null) return byStem
    const out = new Map<string, string[]>()
    for (const at of listDocuments(root)) {
      if (isDirty(at)) continue
      const stem = slugOf(at)
      out.set(stem, [...(out.get(stem) ?? []), at])
    }
    byStem = out
    return out
  }
  const declared = (): ReadonlyMap<string, string> => {
    if (bySlug !== null) return bySlug
    const out = new Map<string, string>()
    for (const at of listDocuments(root)) {
      if (isDirty(at)) continue
      const held = read(at)
      if (held === null) continue
      const slug = textField(held, DOMAIN_SLUG_KEY)
      if (slug !== null && !out.has(slug)) out.set(slug, at)
    }
    bySlug = out
    return out
  }
  return {
    frontmatterOf: read,
    domainAt: (named) => {
      const slug = slugNamed(named)
      for (const at of stems().get(slug) ?? []) {
        const held = read(at)
        if (held !== null && textField(held, DOMAIN_SLUG_KEY) === slug) return at
      }
      return declared().get(slug) ?? null
    },
  }
}
