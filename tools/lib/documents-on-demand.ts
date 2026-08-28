import { readFileSync } from "node:fs"
import { listDocuments } from "./check.ts"
import { fileStemOf } from "../../page/name/name.ts"
import { type Documents, DOMAIN_SLUG_KEY } from "./domain.ts"
import { slugNamed } from "../../page/page-address.ts"
import { type Frontmatter, parseFrontmatter, textField } from "../../page/frontmatter.ts"
import { diskFileTree } from "../../page/file-tree.ts"
import { domainKinds, domainKindTest } from "../../page/page-types.ts"
import { registryOf } from "../../page/property/registry.ts"
import { AKASHA, isDirty } from "../../repo/roots/roots.ts"

export function documentsOnDemand(root: string): Documents {
  const parsed = new Map<string, Frontmatter | null>()
  let byStem: ReadonlyMap<string, readonly string[]> | null = null
  let bySlug: ReadonlyMap<string, string> | null = null
  let domainKind: ((relPath: string) => boolean) | null = null
  let kindAsked = false
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
      const stem = fileStemOf(at)
      out.set(stem, [...(out.get(stem) ?? []), at])
    }
    byStem = out
    return out
  }
  const isDomain = (): ((relPath: string) => boolean) | null => {
    if (kindAsked) return domainKind
    kindAsked = true
    const types = registryOf(diskFileTree({ [AKASHA]: root }))
    if (domainKinds(types).size === 0) return domainKind
    domainKind = domainKindTest(types)
    return domainKind
  }
  const domainHere = (at: string): Frontmatter | null => {
    const held = read(at)
    if (held === null) return null
    const kind = isDomain()
    return kind === null || kind(at) ? held : null
  }
  const declared = (): ReadonlyMap<string, string> => {
    if (bySlug !== null) return bySlug
    const out = new Map<string, string>()
    for (const at of listDocuments(root)) {
      if (isDirty(at)) continue
      const held = domainHere(at)
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
        const held = domainHere(at)
        if (held !== null && textField(held, DOMAIN_SLUG_KEY) === slug) return at
      }
      return declared().get(slug) ?? null
    },
  }
}
