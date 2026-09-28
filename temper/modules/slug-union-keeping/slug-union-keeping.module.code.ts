import { dirname } from "node:path"
import type { Adding, Replacing } from "akasha/change/modules/answer/change-answer.module.code.ts"
import { textIn, textOf } from "akasha/code/body/modules/body-text/body-text.module.code.ts"
import { formattedBody } from "akasha/code/running/modules/code-format/code-format.module.code.ts"
import type { Change } from "akasha/page/modules/change/change.module.code.ts"
import { partedIn } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import { shadowFor } from "akasha/page/modules/shadow/shadow.module.code.ts"

export type Written = {
  readonly edits: readonly (Adding | Replacing)[]
  readonly said: readonly string[]
}

type SlugUnion = {
  readonly name: string
  readonly holds: (page: Readonly<Record<string, unknown>>) => boolean
  readonly pageTypeSlug?: string
}

export type Keeping = {
  readonly at: string
  readonly pageTypeSlug: string
  readonly unions: readonly SlugUnion[]
  readonly from: string
}

const BYTES = new TextEncoder()

const NOTHING: Written = { edits: [], said: [] }

function unionOf(name: string, slugs: readonly string[]): string {
  const sorted = [...new Set(slugs)].sort()
  if (sorted.length === 0) return `export type ${name} = never\n`
  return `export type ${name} =\n${sorted.map((one) => `  | ${JSON.stringify(one)}`).join("\n")}\n`
}

export function unionsBody(unions: readonly (readonly [string, readonly string[]])[]): string {
  return unions.map(([name, slugs]) => unionOf(name, slugs)).join("\n")
}

function typeOf(keeping: Keeping, union: SlugUnion): string {
  return union.pageTypeSlug ?? keeping.pageTypeSlug
}

function pageTypeAt(path: string): string | null {
  const said = partedIn(path)
  return said === null || said.sections.length > 0 ? null : said.pageType
}

function isPageOf(keeping: Keeping, path: string): boolean {
  const pageType = pageTypeAt(path)
  return (
    pageType !== null &&
    (pageType === keeping.pageTypeSlug ||
      keeping.unions.some((union) => typeOf(keeping, union) === pageType))
  )
}

export function keepingTurns(keeping: Keeping, change: Change): boolean {
  return change.changed.some(
    (path) => path.startsWith(`${dirname(keeping.at)}/`) || isPageOf(keeping, path)
  )
}

type KeptPage = {
  readonly pageType: string | null
  readonly value: Readonly<Record<string, unknown>>
}

export function pagesKept(keeping: Keeping, change: Change): readonly KeptPage[] | null {
  const cast = shadowFor(change)
  if ("refused" in cast) return null
  const types = new Set(keeping.unions.map((union) => typeOf(keeping, union)))
  const paths = new Set(
    [...types].flatMap((type) => [...cast.shadow.index.everyOfType(type)].map((one) => one.path))
  )
  for (const path of change.changed) if (isPageOf(keeping, path)) paths.add(path)
  const found: KeptPage[] = []
  for (const path of paths) {
    const value = cast.shadow.pageOf(path)
    if (value !== null && value !== undefined) found.push({ pageType: pageTypeAt(path), value })
  }
  return found
}

export function writtenAgain(keeping: Keeping, change: Change, text: string): Written {
  const body = textIn(formattedBody(change.root, keeping.at, BYTES.encode(text)).body)
  const was = textOf(change.after(keeping.at))
  if (was === body) return NOTHING
  return {
    edits: [
      was === null
        ? { kind: "add", path: keeping.at, content: body }
        : { kind: "replace", path: keeping.at, contentFrom: was, contentTo: body },
    ],
    said: [`\`${keeping.at}\` written again from the ${keeping.from}`],
  }
}

export function slugUnionsKept(keeping: Keeping, change: Change): Written {
  if (!keepingTurns(keeping, change)) return NOTHING
  const pages = pagesKept(keeping, change)
  if (pages === null) return NOTHING
  const slugs: string[][] = keeping.unions.map(() => [])
  for (const { pageType, value } of pages) {
    const held = value.slug
    if (typeof held !== "string") continue
    const at = keeping.unions.findIndex(
      (union) => typeOf(keeping, union) === pageType && union.holds(value)
    )
    if (at >= 0) slugs[at]?.push(held)
  }
  return writtenAgain(
    keeping,
    change,
    unionsBody(keeping.unions.map((union, at) => [union.name, slugs[at] ?? []]))
  )
}
