import { readFileSync } from "node:fs"
import { diskFileTree } from "../../page/file-tree.ts"
import { type Frontmatter, listField, parseFrontmatter, textField } from "../../page/frontmatter.ts"
import type { Roots } from "../../page/page.ts"
import { addressOf, slugNamed } from "../../page/page-address.ts"
import { domainKindTest } from "../../page/page-types.ts"
import { registryOf } from "../../page/property/registry.ts"
import { pageTypeOf } from "../../pages-system/page-type/page-type.ts"
import { AKASHA, isDirty, rootFor } from "../../repo/roots/roots.ts"
import { championsStanding, personasStanding } from "./akasha-personas.ts"
import { listDocuments } from "./check.ts"
import {
  type Champion,
  championOf,
  championParentOf,
  championsAt,
  DOMAIN_SLUG_KEY,
  type Documents,
  domainNamed,
  slugsIn,
} from "./domain.ts"
import { SEQUENCE_KEY } from "./sequence-manifest.ts"

const SUBJECT_KEY = "domain-slug"

export interface Filed {
  readonly relPath: string
  readonly finding: boolean
}

export interface Held {
  readonly slug: string
  readonly relPath: string
  readonly filed: readonly Filed[]
}

export interface Roster {
  readonly personas: ReadonlyMap<string, string>
  readonly slugAt: ReadonlyMap<string, string>
  readonly championedBy: ReadonlyMap<string, readonly Held[]>
  readonly championOfSlug: ReadonlyMap<string, Champion>
  readonly championParent: ReadonlyMap<string, string>
  readonly sequenceOf: ReadonlyMap<string, readonly string[]>
  readonly declared: ReadonlySet<string>
  readonly domains: number
  readonly findings: number
  readonly initiatives: number
  readonly unchampionedDomains: number
  readonly unreachedFilings: number
}

function byKind(a: Filed, b: Filed): number {
  return Number(b.finding) - Number(a.finding) || a.relPath.localeCompare(b.relPath)
}

function scan(root: string): Map<string, Frontmatter> {
  const frontmatter = new Map<string, Frontmatter>()
  for (const relPath of listDocuments(root)) {
    if (isDirty(relPath)) continue
    let body: string
    try {
      body = readFileSync(`${root}/${relPath}`, "utf8")
    } catch {
      continue
    }
    frontmatter.set(relPath, parseFrontmatter(body))
  }
  return frontmatter
}

export function readRoster(roots: Roots): Roster {
  const root = rootFor(roots, AKASHA)
  const frontmatter = scan(root)
  const { slugs } = slugsIn(frontmatter)
  const docs: Documents = {
    frontmatterOf: (at) => frontmatter.get(at) ?? null,
    domainAt: (slug) => domainNamed(slugs, slug),
  }

  const claimants = registryOf(diskFileTree(roots))
  const isDomain = domainKindTest(claimants)
  const championAt = championsAt(championsStanding(root), frontmatter, slugs, isDomain)
  const personas = new Map<string, string>(
    personasStanding(root).map((one) => [one.slug, one.path])
  )

  const filings = new Map<string, Filed[]>()
  let findings = 0
  let initiatives = 0
  for (const [relPath, fm] of frontmatter) {
    const kind = pageTypeOf(relPath)
    if (kind !== "finding" && kind !== "initiative") continue
    const subject = slugNamed(textField(fm, SUBJECT_KEY))
    if (subject === null) continue
    const finding = kind === "finding"
    if (finding) findings += 1
    else initiatives += 1
    const filed = { relPath, finding }
    filings.set(subject, [...(filings.get(subject) ?? []), filed])
  }

  const championOfSlug = new Map<string, Champion>()
  const championParent = new Map<string, string>()
  const championedBy = new Map<string, Held[]>()
  const slugAt = new Map<string, string>()
  const sequenceOf = new Map<string, readonly string[]>()
  let domains = 0
  let unchampionedDomains = 0
  for (const [relPath, fm] of frontmatter) {
    const slug = textField(fm, DOMAIN_SLUG_KEY)
    if (slug === null) continue
    if (!isDomain(relPath)) continue
    const type = pageTypeOf(relPath)
    const named = type === null ? slugs.get(slug) : domainNamed(slugs, addressOf(type, slug))
    if (named !== relPath) continue
    slugAt.set(relPath, slug)
    const sequence = listField(fm, SEQUENCE_KEY)
      .filter((one) => one !== "")
      .map((one) => slugNamed(one))
    if (sequence.length > 0) sequenceOf.set(slug, sequence)
    domains += 1
    const addressed = championParentOf(relPath, docs)
    const parent = addressed === null ? null : slugNamed(addressed)
    if (parent !== null) championParent.set(slug, parent)
    const champion = championOf(relPath, docs, championAt)
    if (champion === null) {
      unchampionedDomains += 1
      continue
    }
    championOfSlug.set(slug, champion)
    championedBy.set(champion.persona, [
      ...(championedBy.get(champion.persona) ?? []),
      { slug, relPath, filed: [...(filings.get(slug) ?? [])].sort(byKind) },
    ])
  }

  let unreachedFilings = 0
  for (const [slug, held] of filings) if (!championOfSlug.has(slug)) unreachedFilings += held.length

  return {
    personas,
    slugAt,
    championedBy: championedBy,
    championOfSlug,
    championParent: championParent,
    sequenceOf,
    declared: new Set(slugs.keys()),
    domains,
    findings,
    initiatives,
    unchampionedDomains: unchampionedDomains,
    unreachedFilings,
  }
}
