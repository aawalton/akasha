import { readFileSync } from "node:fs"
import type { Repo } from "../../page/document/types.ts"
import { dataError } from "./exit.ts"
import { parseFrontmatter } from "../../page/frontmatter.ts"
import { MARKDOWN, pageFileIn } from "../../page/page-file.ts"
import { addressParts } from "../../page/page-address.ts"
import { filedIn, pageTypePathIn, placeDirOf } from "../../page/page-types.ts"
import { scan } from "./seat-resolve.ts"

export const DOMAIN_KEY = "domain-slug"

const PAGE_TYPE_KEY = "page-type-slug"

const FINDING = "finding"

const KEBAB = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

function findingsDir(): string {
  return placeDirOf(FINDING)
}

export function findingPathIn(root: string, slug: string): string {
  const dir = findingsDir()
  return pageFileIn(root, dir, slug) ?? `${dir}/${slug}.${FINDING}${MARKDOWN}`
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

export function composeFinding(
  domain: string,
  slug: string,
  title: string,
  claim: string,
  evidence: string
): string {
  const said = title.trim().replace(/"/g, '\\"')
  const front =
    `---\n${PAGE_TYPE_KEY}: ${FINDING}\nslug: ${slug}\ntitle: "${said}"\n${DOMAIN_KEY}: ${domain}\n---`
  return `${front}\n\n# Claim\n\n${claim.trim()}\n\n# Evidence\n\n${evidence.trim()}\n`
}
