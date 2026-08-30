
import { readdirSync, readFileSync } from "node:fs"
import { join } from "node:path"
import { type Persona, personasStanding } from "./akasha-personas.ts"
import { DOMAIN_SLUG_KEY } from "./domain.ts"
import { pageStemOf } from "../../page/name/name.ts"
import { parseFrontmatter, textField } from "../../page/frontmatter.ts"
import { diskFileTree } from "../../page/file-tree.ts"
import { registryOf } from "../../page/property/registry.ts"
import { placesIn, scanIn, soleRepoOf } from "../../page/page-types.ts"
import { type Roots } from "../../page/page"
import { isDirty, resolveRoots } from "../../repo/roots/roots"
import { isRowsFile } from "../../page/rows-file.ts"
import { isAttachmentFile } from "../../page/attachment-file.ts"

const DOC = ".md"

function isDocument(relPath: string): boolean {
  return relPath.endsWith(DOC) && !isAttachmentFile(relPath) && !isRowsFile(relPath)
}

export const SUBJECTS = ["personas", "domains"] as const

export type Subject = (typeof SUBJECTS)[number]

export function isSubject(value: string): value is Subject {
  return (SUBJECTS as readonly string[]).includes(value)
}

export interface SubjectRecord {
  readonly slug: string
  readonly path: string
  readonly frontmatter: Readonly<Record<string, unknown>>
  readonly championedDomain?: string
  readonly defaultRole?: string
  readonly body?: string
}

export interface SubjectReading {
  readonly subject: Subject
  readonly root: string
  readonly records: readonly SubjectRecord[]
  readonly unnamed: readonly string[]
}

export class DeadRead extends Error {}

function documentsUnder(
  root: string,
  relDir: string,
  what: string,
  skipDirty: boolean
): readonly string[] {
  const out: string[] = []
  const walk = (at: string): undefined => {
    for (const entry of readdirSync(join(root, at), { withFileTypes: true }).sort((a, b) =>
      a.name < b.name ? -1 : 1
    )) {
      const rel = at === "" ? entry.name : `${at}/${entry.name}`
      if (entry.isDirectory()) {
        if (entry.name === ".git") continue
        if (skipDirty && isDirty(rel)) continue
        walk(rel)
      } else if (entry.isFile() && isDocument(entry.name)) out.push(rel)
    }
  }
  try {
    walk(relDir)
  } catch (err) {
    throw new DeadRead(
      `\`${join(root, relDir)}\` could not be walked (${err instanceof Error ? err.message : String(err)}), ` +
        `so no ${what} resolves. That is a dead read rather than a tree with no ${what}s.`
    )
  }
  return out
}

function blockOf(
  absolute: string
): { readonly named: Readonly<Record<string, unknown>>; readonly body: string } | null {
  let text: string
  try {
    text = readFileSync(absolute, "utf8")
  } catch {
    return null
  }
  const fm = parseFrontmatter(text)
  if (fm.error !== null) return null
  const named: Record<string, unknown> = Object.fromEntries(fm.fields)
  const body = text.replace(/\r\n/g, "\n").split("\n").slice(fm.lineCount).join("\n")
  return { named, body }
}

function byDeclaredSlug(
  root: string,
  relPaths: readonly string[],
  withBody: boolean
): { readonly records: readonly SubjectRecord[]; readonly unnamed: readonly string[] } {
  const records: SubjectRecord[] = []
  const unnamed: string[] = []
  const seen = new Set<string>()
  for (const rel of relPaths) {
    const read = blockOf(join(root, rel))
    if (read === null) continue
    const block = read.named
    const carried = withBody ? { body: read.body } : {}
    const declared = block[DOMAIN_SLUG_KEY]
    const slug = typeof declared === "string" ? declared.trim() : ""
    if (slug === "") {
      unnamed.push(rel)
      continue
    }
    if (seen.has(slug)) continue
    seen.add(slug)
    records.push({ slug, path: rel, frontmatter: block, ...carried })
  }
  return { records: records.sort((a, b) => (a.slug < b.slug ? -1 : 1)), unnamed }
}

function declaredBy(one: Persona): Readonly<Record<string, unknown>> {
  const named: Record<string, unknown> = { "page-type-slug": "persona", id: one.id, slug: one.slug }
  const state = (key: string, value: string | number | null): undefined => {
    if (value !== null) named[key] = value
  }
  state("definition", one.definition)
  state("purpose", one.purpose)
  state("portrait", one.portraitPath)
  state("championed-domain-slug", one.championedDomainSlug)
  state("role-slug", one.roleSlug)
  state("value-slug", one.valueSlug)
  state("origin", one.origin)
  state("email-address", one.emailAddress)
  state("voice-instruction", one.voiceInstruction)
  state("voice-reference-sha256", one.voiceReferenceSha256)
  state("cover", one.cover)
  state("green-day-points", one.greenDayPoints)
  state("history", one.history)
  return named
}

function personaRecords(root: string): readonly SubjectRecord[] {
  let standing: readonly Persona[]
  try {
    standing = personasStanding(root)
  } catch (err) {
    throw new DeadRead(
      `no persona resolves under \`${root}\` ` +
        `(${err instanceof Error ? err.message : String(err)}). That is a dead read rather than a ` +
        "tree with no personas."
    )
  }
  return standing.map((one) => ({
    slug: one.slug,
    path: one.path,
    frontmatter: declaredBy(one),
    ...(one.championedDomainSlug === null ? {} : { championedDomain: one.championedDomainSlug }),
    ...(one.roleSlug === null ? {} : { defaultRole: one.roleSlug }),
  }))
}

function byStem(
  root: string,
  relPaths: readonly string[],
  what: string,
  withBody: boolean
): readonly SubjectRecord[] {
  const at = new Map<string, string[]>()
  for (const rel of relPaths) {
    const stem = pageStemOf(rel)
    at.set(stem, [...(at.get(stem) ?? []), rel])
  }
  const shared = [...at].filter(([, found]) => found.length > 1)
  if (shared.length > 0) {
    throw new DeadRead(
      `a stem under \`${root}\` must name one document, and these do not — ` +
        `${shared.map(([stem, found]) => `${stem}: ${found.join(", ")}`).join("; ")}. A seat holds ` +
        `one ${what} and \`lib/seat-resolve.ts\` refuses such a slug, so handing it back would put ` +
        "a value in the column that no pin can answer to. Rename one rather than having this choose."
    )
  }
  const records: SubjectRecord[] = []
  for (const [slug, found] of [...at].sort((a, b) => (a[0] < b[0] ? -1 : 1))) {
    const rel = found[0]
    if (rel === undefined) continue
    const read = blockOf(join(root, rel))
    if (read === null) continue
    records.push({
      slug,
      path: rel,
      frontmatter: read.named,
      ...(withBody ? { body: read.body } : {}),
    })
  }
  return records
}

interface Home {
  readonly root: string
  readonly relPaths: readonly string[]
}

const TYPE_OF: Readonly<Record<Subject, string>> = {
  domains: "domain",
  personas: "persona",
}

function homeOf(root: string, subject: Subject, what: string): Home {
  const slug = TYPE_OF[subject]
  const roots: Roots = { ...resolveRoots(), akasha: root }
  const type = registryOf(diskFileTree(roots)).find((one) => one.slug === slug)
  const repo = type === undefined ? null : soleRepoOf(type)
  if (type === undefined || repo === null) {
    throw new DeadRead(
      `no page type \`${slug}\` states where its files stand, so no ${what} resolves. That is a ` +
        `dead read rather than a tree with no ${what}s.`
    )
  }
  const home = (roots as unknown as Record<string, string | undefined>)[repo]
  if (home === undefined) {
    throw new DeadRead(
      `\`${slug}\` states its files stand in \`${repo}\`, which names no checkout here, so no ` +
        `${what} resolves. That is a dead read rather than a tree with no ${what}s.`
    )
  }
  return { root: home, relPaths: scanIn(home, placesIn(type, repo), repo) }
}

export function readSubject(root: string, subject: Subject, withBody = false): SubjectReading {
  const one = subject.slice(0, -1)
  if (subject === "personas") {
    return deadUnless({ records: personaRecords(root), unnamed: [] }, subject, one, root)
  }
  const home = homeOf(root, subject, one)
  if (subject === "domains") {
    const walked = byDeclaredSlug(home.root, documentsUnder(home.root, "", one, true), withBody)
    return deadUnless(walked, subject, one, home.root)
  }
  const kept = home.relPaths.filter((relPath) => !isDirty(relPath))
  const found = byDeclaredSlug(home.root, kept, withBody)
  return deadUnless(found, subject, one, home.root)
}

function deadUnless(
  found: { readonly records: readonly SubjectRecord[]; readonly unnamed: readonly string[] },
  subject: Subject,
  one: string,
  root: string
): SubjectReading {
  if (found.records.length === 0) {
    throw new DeadRead(
      `nothing under \`${root}\` names a ${one}, so this read returned none. That is a dead read ` +
        `rather than a repository with no ${subject}: a ${one} IS a document in this tree, and there ` +
        "is no state in which it legitimately holds none."
    )
  }
  return { subject, root, records: found.records, unnamed: found.unnamed }
}

export function slugsOf(root: string, subject: Subject): readonly string[] {
  return readSubject(root, subject).records.map((record) => record.slug)
}

export function readCorpora(
  root: string,
  subjects: readonly Subject[],
  withBody = false
): ReadonlyMap<Subject, SubjectReading> {
  const wanted = new Set(subjects)
  return new Map(
    SUBJECTS.filter((subject) => wanted.has(subject)).map((subject) => [
      subject,
      readSubject(root, subject, withBody),
    ])
  )
}
