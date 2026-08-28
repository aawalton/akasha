import type { Check } from "../lib/check.ts"
import {
  type Documents,
  DOMAIN_PARENTS_KEY,
  DOMAIN_SLUG_KEY,
  CHAMPIONED_DOMAIN_KEY,
  championOf,
  PERSONA_CHAMPION_KEY,
  domainNamed,
  slugsIn,
} from "../lib/domain.ts"
import { type Frontmatter, listField, parseFrontmatter, textField } from "../../page/frontmatter.ts"
import { judge, over } from "../../outcome/outcome"
import { diskFileTree } from "../../page/file-tree.ts"
import { registryOf } from "../../page/property/registry.ts"
import { domainKindTest } from "../../page/page-types.ts"
import { pageTypeOf } from "../../pages-system/page-type/page-type.ts"
import { refusalText } from "../../refusal/refusal.ts"
import { AKASHA, isDirty, rootFor } from "../../repo/roots/roots"

export const domainEdges: Check = (repo) => {
  const root = rootFor(repo.roots, AKASHA)
  const claimants = registryOf(diskFileTree(repo.roots))
  const frontmatter = new Map<string, Frontmatter>()
  for (const relPath of repo.documents) {
    if (isDirty(relPath)) continue
    frontmatter.set(relPath, parseFrontmatter(repo.read(relPath)))
  }
  const { slugs, duplicates } = slugsIn(frontmatter)
  const failures: string[] = []
  const kindOf = (at: string): string => pageTypeOf(at) ?? "none"
  for (const [slug, claiming] of duplicates) {
    const byKind = new Map<string, string[]>()
    for (const at of claiming) byKind.set(kindOf(at), [...(byKind.get(kindOf(at)) ?? []), at])
    for (const [kind, together] of byKind) {
      if (together.length < 2) continue
      failures.push(
        refusalText(
          "domain-slug-declared-twice",
          { slug, kind, count: `${together.length}`, claimants: together.join(", ") },
          root
        )
      )
    }
  }
  let edges = 0
  for (const [relPath, fm] of frontmatter) {
    for (const slug of listField(fm, DOMAIN_PARENTS_KEY)) {
      edges += 1
      if (domainNamed(slugs, slug) !== null) continue
      failures.push(refusalText("domain-parent-unresolved", { path: relPath, slug }, root))
    }
  }
  const claimedBy = new Map<string, string[]>()
  for (const [relPath, fm] of frontmatter) {
    const persona = textField(fm, PERSONA_CHAMPION_KEY)
    if (persona === null) continue
    claimedBy.set(persona, [...(claimedBy.get(persona) ?? []), relPath])
    const at = domainNamed(slugs, persona) ?? undefined
    if (at === undefined) {
      failures.push(refusalText("persona-champion-unresolved", { path: relPath, persona }, root))
      continue
    }
    const kind = kindOf(at)
    if (kind !== "persona") {
      failures.push(
        refusalText(
          "persona-champion-not-a-persona",
          {
            path: relPath,
            persona,
            at,
            kind: kind === null ? "a file no page type claims" : `a ${kind} document`,
          },
          root
        )
      )
    }
  }
  for (const [persona, at] of claimedBy) {
    if (at.length === 1) continue
    failures.push(
      refusalText(
        "persona-champion-claimed-twice",
        { persona, count: `${at.length}`, claimants: at.join(", ") },
        root
      )
    )
  }
  let paired = 0
  for (const [relPath, fm] of frontmatter) {
    if (pageTypeOf(relPath) !== "persona") continue
    const her = textField(fm, DOMAIN_SLUG_KEY)
    const holds = textField(fm, CHAMPIONED_DOMAIN_KEY)
    if (her === null || holds === null) continue
    const at = domainNamed(slugs, holds) ?? undefined
    if (at === undefined) {
      failures.push(
        refusalText("championed-domain-unresolved", { path: relPath, slug: holds }, root)
      )
      continue
    }
    const there = frontmatter.get(at)
    const back = there === undefined ? null : textField(there, PERSONA_CHAMPION_KEY)
    if (back === her) {
      paired += 1
      continue
    }
    failures.push(
      back === null
        ? refusalText("championed-domain-unnamed-back", { path: relPath, her, holds, at }, root)
        : refusalText(
            "championed-domain-claimed-by-another",
            { path: relPath, her, holds, at, persona: back },
            root
          )
    )
  }
  for (const [relPath, fm] of frontmatter) {
    const persona = textField(fm, PERSONA_CHAMPION_KEY)
    const slug = textField(fm, DOMAIN_SLUG_KEY)
    if (persona === null || slug === null) continue
    const at = domainNamed(slugs, persona) ?? undefined
    if (at === undefined) continue
    const hers = frontmatter.get(at)
    const holds = hers === undefined ? null : textField(hers, CHAMPIONED_DOMAIN_KEY)
    if (holds === slug) continue
    failures.push(
      holds === null
        ? refusalText("persona-champion-unreciprocated", { path: relPath, slug, persona, at }, root)
        : refusalText(
            "persona-champion-names-another",
            { path: relPath, slug, persona, at, holds },
            root
          )
    )
  }
  const docs: Documents = {
    frontmatterOf: (at) => frontmatter.get(at) ?? null,
    domainAt: (slug) => domainNamed(slugs, slug),
  }
  const isDomain = domainKindTest(claimants)
  let domains = 0
  let unchampioned = 0
  for (const [relPath, fm] of frontmatter) {
    if (textField(fm, DOMAIN_SLUG_KEY) === null) continue
    if (!isDomain(relPath)) continue
    domains += 1
    if (championOf(relPath, docs) !== null) continue
    unchampioned += 1
    failures.push(refusalText("domain-unchampioned", { path: relPath }, root))
  }
  return {
    ...judge(
      "domain-edges",
      `${domains} domain(s) and ${edges} parent edge(s) across ${frontmatter.size} live documents; ` +
        `${claimedBy.size} persona(s) champion a domain of which ${paired} are named back, and ` +
        `${unchampioned} domain(s) reach none`,
      failures
    ),
    population: over(frontmatter.size, "live document(s)"),
  }
}
