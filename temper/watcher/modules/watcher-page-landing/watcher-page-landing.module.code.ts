import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import { foldedInLowerCamelCase } from "akasha/page/name-format/pages/lower-camel-case/lower-camel-case.name-format.code.ts"
import {
  readFiles,
  type readPages,
  writeFiles,
} from "akasha/page/query/modules/store-writing/store-writing.module.code.ts"
import { z } from "zod"

const PAGE_TYPE = "page-type"

export const PAGE_LANDING_WRITER = "temper watcher <watcher@alanwalton.com>"

export const LANDING_ATTEMPTS = 4

export const LANDING_PAUSE_MS = 1_500

const PAGE_ENDING = ".ts"

export type ReadFiles = typeof readFiles

export type ReadPages = typeof readPages

export type WriteFiles = typeof writeFiles

export type Waiting = (ms: number) => Promise<undefined>

type LandedBody = { readonly path: string; readonly content: string | null }

export type Landing = Awaited<ReturnType<WriteFiles>>

export type Landed =
  | { readonly outcome: "landed"; readonly at: string }
  | { readonly outcome: "already"; readonly at: string }
  | { readonly outcome: "refused"; readonly why: string }

export type Tried = Landed | { readonly outcome: "again"; readonly why: string }

export type LandingDeps = {
  readonly read?: ReadFiles
  readonly write?: WriteFiles

  readonly waiting?: Waiting
}

export function waitFor(ms: number): Promise<undefined> {
  return new Promise((done) => {
    setTimeout(() => {
      done(undefined)
    }, ms)
  })
}

export function readingFor(deps: LandingDeps): ReadFiles {
  return deps.read ?? readFiles
}

export function writingFor(deps: LandingDeps): WriteFiles {
  return deps.write ?? writeFiles
}

export function triedFrom(landing: Landing): Tried {
  return landing.ok ? { outcome: "landed", at: landing.at } : { outcome: "again", why: landing.why }
}

export function contentIn(bodies: readonly LandedBody[], path: string): string | null {
  return bodies.find((one) => one.path === path)?.content ?? null
}

export async function landOverAttempts(
  unattempted: string,
  tryOnce: (attempt: number) => Promise<Tried>,
  deps: LandingDeps = {}
): Promise<Landed> {
  const waiting = deps.waiting ?? waitFor
  let why = unattempted
  for (let attempt = 1; attempt <= LANDING_ATTEMPTS; attempt++) {
    if (attempt > 1) await waiting(LANDING_PAUSE_MS)
    const tried = await tryOnce(attempt)
    if (tried.outcome !== "again") return tried
    why = tried.why
  }
  return { outcome: "refused", why: `${why} — ${LANDING_ATTEMPTS} attempts were spent` }
}

export function pagePathIn(folder: string, slug: string, pageTypeSlug: string): string {
  return `${folder}/${slug}/${slug}.${pageTypeSlug}.ts`
}

export function rowsPathIn(
  folder: string,
  slug: string,
  pageTypeSlug: string,
  property: string
): string {
  return `${folder}/${slug}/${slug}.${pageTypeSlug}.${property}.jsonl`
}

export function besidePathOf(pagePath: string, property: string, ending: string): string | null {
  if (!pagePath.endsWith(PAGE_ENDING)) return null
  return `${pagePath.slice(0, -PAGE_ENDING.length)}.${property}.${ending}`
}

export function noPagePathWhy(pageTypeSlug: string, named: string): string {
  return `the ${pageTypeSlug} pages named by ${named} gave back no path to put a file beside`
}

export async function besidePathsFor(
  read: ReadPages,
  pageTypeSlug: string,
  slugs: readonly string[],
  property: string,
  ending: string
): Promise<ReadonlyMap<string, string>> {
  const beside = new Map<string, string>()
  if (slugs.length === 0) return beside
  const named = slugs.join(", ")
  const found = await read(slugs.map((slug) => ({ pageTypeSlug, slug })))
  if (!found.ok) throw new Error(`${noPagePathWhy(pageTypeSlug, named)}: ${found.why}`)
  if (found.unplaced.length > 0 || found.bodies.length !== slugs.length) {
    throw new Error(noPagePathWhy(pageTypeSlug, named))
  }
  for (const [at, slug] of slugs.entries()) {
    const path = besidePathOf(found.bodies[at]?.path ?? "", property, ending)
    if (path === null) throw new Error(noPagePathWhy(pageTypeSlug, slug))
    beside.set(slug, path)
  }
  return beside
}

export function exportNameFor(slug: string): string {
  return foldedInLowerCamelCase(slug)
}

export function typeNameFor(pageTypeSlug: string): string {
  const named = exportNameFor(pageTypeSlug)
  return named.charAt(0).toUpperCase() + named.slice(1)
}

export function pageTypeImportFor(folder: string, pageTypeSlug: string): string {
  const above = folder.split("/").slice(0, -1).join("/")
  return `akasha/${above}/${pageTypeSlug}.page-type.types.ts`
}

export function closingFor(pageTypeSlug: string): string {
  return `} as const satisfies ${typeNameFor(pageTypeSlug)}`
}

type PageKey = readonly [string, string | number | boolean]

export function pageBodyFor(
  folder: string,
  pageTypeSlug: string,
  slug: string,
  id: string,
  keys: readonly PageKey[]
): string {
  const typed = typeNameFor(pageTypeSlug)
  const lines = [
    `import type { ${typed} } from "${pageTypeImportFor(folder, pageTypeSlug)}"`,
    "",
    `export const ${exportNameFor(slug)} = {`,
    `  id: ${JSON.stringify(id)},`,
    `  type: ${JSON.stringify(namedAs(PAGE_TYPE, pageTypeSlug, null))},`,
    `  slug: ${JSON.stringify(slug)},`,
  ]
  for (const [key, value] of keys) lines.push(`  ${key}: ${JSON.stringify(value)},`)
  lines.push(closingFor(pageTypeSlug), "")
  return lines.join("\n")
}

export function jsonlLinesOf(body: string | null): readonly string[] {
  return body === null ? [] : body.split("\n").filter((one) => one.trim() !== "")
}

export function jsonlBodyOf(lines: readonly string[]): string {
  return lines.length === 0 ? "" : `${lines.join("\n")}\n`
}

const JSONL_ROW = z.record(z.string(), z.unknown())

export function textIn(line: string, key: string): string {
  let read: ReturnType<typeof JSONL_ROW.safeParse>
  try {
    read = JSONL_ROW.safeParse(JSON.parse(line))
  } catch {
    return ""
  }
  if (!read.success) return ""
  const value = read.data[key]
  return typeof value === "string" ? value : ""
}

export function insertedByInstant(
  lines: readonly string[],
  line: string,
  instantKey: string,
  instant: string
): readonly string[] {
  const put = [...lines]
  let at = put.length
  while (at > 0 && textIn(put[at - 1] ?? "", instantKey) > instant) at--
  put.splice(at, 0, line)
  return put
}

type RowValue = readonly [string, unknown]

export function jsonRowOf(keys: readonly RowValue[]): string {
  const out: Record<string, unknown> = {}
  for (const [key, value] of keys) {
    if (value !== undefined) out[key] = value
  }
  return JSON.stringify(out)
}
