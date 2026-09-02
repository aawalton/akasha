import { readFileSync } from "node:fs"
import type { Repo } from "@akasha/pages-system/markdown-document"
import { composedFor } from "@akasha/pages-system-service/composing"
import { dataError } from "./exit.ts"
import { parseFrontmatter } from "../../page/frontmatter.ts"
import { addressParts } from "../../page/page-address.ts"
import { filedIn, pageTypePathIn } from "../../page/page-types.ts"
import { scan } from "./seat-resolve.ts"

export const DOMAIN_KEY = "domain-slug"

const FINDING = "finding"

const KEBAB = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

export interface Filing {
  readonly relPath: string
  readonly body: string
}

export function findingRepo(root: string): Repo {
  const relPath = pageTypePathIn(root, FINDING)
  let stated: string
  try {
    stated = readFileSync(`${root}/${relPath}`, "utf8")
  } catch (err) {
    throw dataError(
      `${relPath} could not be read from ${root}, and it is what says which repository ` +
        `a finding stands in: ${err instanceof Error ? err.message : String(err)}`
    )
  }
  const filed = filedIn(parseFrontmatter(stated))
  const only = filed === null || filed.length !== 1 ? null : (filed[0]?.repo ?? null)
  if (only === null) {
    throw dataError(
      `${relPath} declares no \`files: <repo>:<glob>\`, so nothing says which repository a finding ` +
        "stands in and this refuses rather than guess"
    )
  }
  return only as Repo
}

export function kebabRefusal(slug: string): string | null {
  if (KEBAB.test(slug)) return null
  return (
    `\`${slug}\` is not kebab-case, and a finding's file name is — lower-case words joined by ` +
    `single hyphens, as \`reaches-uncredited\` and \`irreversible-spelled-twice\` are`
  )
}

export function declaredDomains(root: string): ReadonlyMap<string, string> {
  return scan(root).slugs
}

function distance(one: string, two: string): number {
  let row = Array.from({ length: two.length + 1 }, (_, i) => i)
  for (let i = 1; i <= one.length; i += 1) {
    const next = [i]
    for (let j = 1; j <= two.length; j += 1) {
      const substitution = (row[j - 1] as number) + (one[i - 1] === two[j - 1] ? 0 : 1)
      next.push(Math.min(substitution, (row[j] as number) + 1, (next[j - 1] as number) + 1))
    }
    row = next
  }
  return row[two.length] as number
}

export function undeclaredRefusal(domain: string, declared: ReadonlyMap<string, string>): string | null {
  if (declared.has(domain)) return null
  const near = [...declared.keys()]
    .map((slug) => ({ slug, at: distance(domain, slug) }))
    .sort((a, b) => a.at - b.at || a.slug.localeCompare(b.slug))
    .slice(0, 5)
    .map((one) => one.slug)
  return (
    `no document declares \`slug: ${domain}\`, so a finding keyed to it would reach nobody — ` +
    `${declared.size} domain(s) are declared, nearest: ${near.join(", ")}. Declare the domain first ` +
    `if it is genuinely new; \`ops domain dag\` prints the map`
  )
}

export function addressRefusal(domain: string, declared: ReadonlyMap<string, string>): string | null {
  if (addressParts(domain) !== null) return null
  const carrying = [...declared.keys()].filter((key) => addressParts(key)?.slug === domain).sort()
  const shown = carrying.slice(0, 8)
  const named =
    carrying.length === 0
      ? "No page carries this slug, so check the spelling as well as the page type."
      : `Write one of: ${shown.join(", ")}${carrying.length > shown.length ? ", …" : ""}.`
  return (
    `\`${domain}\` is a bare slug, and this takes a relation address: the page type and the slug ` +
    `joined by a slash, as \`domain/checks-system\` and \`repo/akasha-repo\` are. A slug is unique ` +
    `within a page type and not across the corpus, so a bare one names a page only by accident of ` +
    `which was reached first. ${named}`
  )
}

/**
 * The path a finding lands at and the body that lands there.
 *
 * A finding is an akasha page. `pages/finding/` holds 0 files and 376 findings stand at
 * `akasha/domain-system/findings/pages/<slug>.finding.ts`, so the markdown path this used to answer
 * named a file that was never there for any of them, and the markdown body it used to compose was
 * frontmatter no reader of a finding parses.
 *
 * Where an akasha page lands is stated once, in `composedFor`, which asks the index where a page of
 * this slug already stands and falls back to the page type's own plural folder for one that does
 * not. Restating that here is how the two halves of one corpus come to disagree about where a page
 * is — the same reason `rowsFileOf` and `sidecarFor` ask akasha rather than answer for it. The `id`
 * is deliberately absent: it is minted at the gate, and a hand-written one would mint a second page
 * rather than carry this one.
 */
export function filingFor(
  root: string,
  domain: string,
  slug: string,
  claim: string,
  evidence: string
): Filing {
  const composed = composedFor(root, {
    pageTypeSlug: FINDING,
    slug,
    values: { pageTypeSlug: FINDING, slug, domainSlug: domain, claim, evidence },
  })
  if ("refused" in composed) {
    throw dataError(`a finding could not be composed for \`${slug}\`: ${composed.refused}`)
  }
  return { relPath: composed.put.path, body: composed.put.content }
}
