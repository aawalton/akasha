
import { readFileSync } from "node:fs"
import { listDocuments } from "./check.ts"
import { type Documents, domainNamed, DOMAIN_SLUG_KEY, type Champion, championOf, championParentOf, slugsIn } from "./domain.ts"
import { type Frontmatter, listField, parseFrontmatter, textField } from "../../page/frontmatter.ts"
import { diskFileTree } from "../../page/file-tree.ts"
import { registryOf } from "../../page/property/registry.ts"
import { domainKindTest } from "../../page/page-types.ts"
import { pageTypeOf } from "../../pages-system/page-type/page-type.ts"
import { type Roots } from "../../page/page.ts"
import { addressOf, slugNamed } from "../../page/page-address.ts"
import { AKASHA, isDirty, rootFor } from "../../repo/roots/roots.ts"
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

/**
 * Who is answerable for what, composed from the documents standing now.
 *
 * EVERY SIDE IS READ OUT OF AKASHA, which is where domains, personas, findings and initiatives
 * all stand. A roster built from any other checkout comes back empty rather than wrong, and an
 * empty roster is the shape a corpus with no domains in it would have — so every reader of it
 * draws a panel with no rows and nothing anywhere says the root was the fault.
 *
 * ONE SCAN, AND THE PAGE TYPE DECIDES WHICH SIDE A FILE IS. Findings and initiatives were read
 * from a second checkout and claimed against the repository name `memory`, so once their page
 * types named akasha the claim matched nothing and every persona was reported as holding no
 * finding and no initiative — a clean zero over a corpus that held hundreds.
 */
export function readRoster(roots: Roots): Roster {
  const frontmatter = scan(rootFor(roots, AKASHA))
  const { slugs } = slugsIn(frontmatter)
  const docs: Documents = {
    frontmatterOf: (at) => frontmatter.get(at) ?? null,
    domainAt: (slug) => domainNamed(slugs, slug),
  }

  const claimants = registryOf(diskFileTree(roots))
  const isDomain = domainKindTest(claimants)
  const personas = new Map<string, string>()
  for (const [relPath, fm] of frontmatter) {
    if (pageTypeOf(relPath) !== "persona") continue
    const slug = textField(fm, DOMAIN_SLUG_KEY)
    if (slug !== null) personas.set(slug, relPath)
  }

  const filings = new Map<string, Filed[]>()
  let findings = 0
  let initiatives = 0
  for (const [relPath, fm] of frontmatter) {
    const kind = pageTypeOf(relPath)
    if (kind !== "finding" && kind !== "initiative") continue
    // Spelled bare, for the reason the parent below is: a filing names its domain by address —
    // `domain/agent-harness` — while every key these filings are looked up under is the slug
    // alone, so an address stored unchanged is filed against a domain no champion holds. Each
    // one then counts as an unreached filing and every persona reads as holding none.
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
    // KEPT UNLESS ANOTHER PAGE OF THIS TYPE ALREADY HOLDS THE SLUG. This guard used to ask
    // whether the bare slug resolved back to this page, which dropped every domain whose slug a
    // page of some other type had taken first — the domain vanished from the tree and its
    // children were promoted to roots of their own. A type carries a slug once, so asking by
    // address answers the question the guard was for and only that one.
    const type = pageTypeOf(relPath)
    const named = type === null ? slugs.get(slug) : domainNamed(slugs, addressOf(type, slug))
    if (named !== relPath) continue
    slugAt.set(relPath, slug)
    // Spelled bare for the same reason the parent above is: a sequence names its members by
    // address and the kin it is matched against are bare slugs, so an address left as written
    // places nothing. Nothing about that shows as an error — the children simply come back in
    // the order they were read, which is an order, so it reads as a corpus that declared none.
    const sequence = listField(fm, SEQUENCE_KEY)
      .filter((one) => one !== "")
      .map((one) => slugNamed(one))
    if (sequence.length > 0) sequenceOf.set(slug, sequence)
    domains += 1
    // Spelled bare, because that is what a reader of this map holds. A page addresses its
    // parent by type and slug together — `domain/global` — while every key here is the slug
    // alone, so an address stored unchanged matches no parent, and a domain whose parent is
    // never found is reported as a root of its own. A corpus of that reads as one flat list
    // with every descent lost, which is a shape a tree can genuinely have.
    const addressed = championParentOf(relPath, docs)
    const parent = addressed === null ? null : slugNamed(addressed)
    if (parent !== null) championParent.set(slug, parent)
    const champion = championOf(relPath, docs)
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
