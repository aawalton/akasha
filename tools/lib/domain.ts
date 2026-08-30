import { type Frontmatter, listField, textField } from "../../page/frontmatter.ts"
import { addressOf, slugNamed } from "../../page/page-address.ts"
import { pageTypeOf } from "../../pages-system/page-type/page-type.ts"
import { closure } from "./closure.ts"

export const DOMAIN_SLUG_KEY = "slug"

export const DOMAIN_PARENTS_KEY = "domain-parent-slug"

export const DOMAIN_REQUIRED_READING_KEY = "required-reading-slugs"

export const PERSONA_CHAMPION_KEY = "persona-champion-slug"

export const FILE_KIND_EXTENSION_KEY = "extension"

export const PAGE_BODY_SECTION_HEADING_KEY = "heading"

export const FILE_PURPOSE_ENDING_KEY = "ending"

export const CHAMPIONED_DOMAIN_KEY = "championed-domain-slug"

export interface Documents {
  frontmatterOf: (relPath: string) => Frontmatter | null
  domainAt: (slug: string) => string | null
}

export function slugsIn(frontmatter: ReadonlyMap<string, Frontmatter>): {
  readonly slugs: ReadonlyMap<string, string>
  readonly duplicates: ReadonlyMap<string, readonly string[]>
} {
  const slugs = new Map<string, string>()
  const duplicates = new Map<string, string[]>()
  const addressed = new Map<string, string>()
  for (const [relPath, fm] of frontmatter) {
    const slug = textField(fm, DOMAIN_SLUG_KEY)
    if (slug === null) continue
    const type = pageTypeOf(relPath)
    if (type !== null) {
      const address = addressOf(type, slug)
      if (!addressed.has(address)) addressed.set(address, relPath)
    }
    const first = slugs.get(slug)
    if (first === undefined) {
      slugs.set(slug, relPath)
      continue
    }
    const claimants = duplicates.get(slug) ?? [first]
    claimants.push(relPath)
    duplicates.set(slug, claimants)
  }
  for (const [address, relPath] of addressed) slugs.set(address, relPath)
  return { slugs, duplicates }
}

export function domainNamed(slugs: ReadonlyMap<string, string>, value: string): string | null {
  return slugs.get(value) ?? slugs.get(slugNamed(value)) ?? null
}

function pointing(relPath: string, key: string, docs: Documents): readonly string[] {
  const fm = docs.frontmatterOf(relPath)
  if (fm === null) return []
  return listField(fm, key)
    .map((slug) => docs.domainAt(slug))
    .filter((path): path is string => path !== null)
}

export function domainsAbove(relPath: string, docs: Documents): readonly string[] {
  const parentsOf = (at: string): readonly string[] => pointing(at, DOMAIN_PARENTS_KEY, docs)
  return closure(parentsOf(relPath), parentsOf)
}

export function requiredReadingClosure(
  relPaths: readonly string[],
  docs: Documents
): readonly string[] {
  const namedBy = (at: string): readonly string[] => pointing(at, DOMAIN_REQUIRED_READING_KEY, docs)
  return closure(relPaths.flatMap(namedBy), namedBy)
}

export function declaredPathReading(relPath: string, docs: Documents): readonly string[] {
  return [relPath, ...domainsAbove(relPath, docs)]
}

export function championParentOf(relPath: string, docs: Documents): string | null {
  const fm = docs.frontmatterOf(relPath)
  if (fm === null) return null
  return listField(fm, DOMAIN_PARENTS_KEY)[0] ?? null
}

export interface Champion {
  readonly persona: string
  readonly at: string
}

// Who champions the domain at one path, or nothing. A champion is read from the persona pages
// rather than from the domain's own document, so this is handed the answer already resolved.
export type ChampionAt = (relPath: string) => string | null

// The champion edge, keyed by the path it lands on rather than by slug. A persona names the
// domain she champions by a bare slug, and a bare slug is claimed by whichever page took it
// first, which is often not a domain at all: `agent-harness` is claimed by a book chapter and
// `sleep` by a topic. So a champion is placed only on a page that is a domain and is the page
// its own slug names, the same two tests the roster uses to decide a domain is real.
export function championsAt(
  champions: ReadonlyMap<string, string>,
  frontmatter: ReadonlyMap<string, Frontmatter>,
  slugs: ReadonlyMap<string, string>,
  isDomain: (relPath: string) => boolean
): ChampionAt {
  const byPath = new Map<string, string>()
  for (const [relPath, fm] of frontmatter) {
    const slug = textField(fm, DOMAIN_SLUG_KEY)
    if (slug === null) continue
    const persona = champions.get(slug)
    if (persona === undefined) continue
    if (!isDomain(relPath)) continue
    const type = pageTypeOf(relPath)
    const named = type === null ? slugs.get(slug) : domainNamed(slugs, addressOf(type, slug))
    if (named !== relPath) continue
    byPath.set(relPath, persona)
  }
  return (at) => byPath.get(at) ?? null
}

export function championOf(
  relPath: string,
  docs: Documents,
  championAt: ChampionAt
): Champion | null {
  const below = (at: string): string | null => {
    const slug = championParentOf(at, docs)
    return slug === null ? null : docs.domainAt(slug)
  }
  const seen = new Set<string>()
  let at: string | null = relPath
  while (at !== null && !seen.has(at)) {
    seen.add(at)
    const persona = championAt(at)
    if (persona !== null) return { persona, at }
    at = below(at)
  }
  return null
}
