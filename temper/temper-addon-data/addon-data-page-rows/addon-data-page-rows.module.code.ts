import { camelizeKey, kebabizeKey } from "@akasha/pages-access/file-rows"
import { askComposed } from "@akasha/pages-query/ask"
import { askedAsSpelled } from "@akasha/pages-query/store-spelling"
import { asPage, type Json, type Page } from "@akasha/temper-addon-generators/addon-data-page"

export interface PageResult {
  readonly rows: readonly Page[]
}

export interface GetPagesArgs {
  readonly pageTypeSlug: string
  readonly limit?: number
  readonly select?: readonly string[]
}

const CARRIED: readonly string[] = ["id", "title", "slug", "icon"]

export const JSON_TEXT_PROPERTIES: Readonly<Record<string, readonly string[]>> = {
  "temper-skill": ["description"],
}

function jsonTextIn(pageTypeSlug: string): ReadonlySet<string> {
  return new Set(JSON_TEXT_PROPERTIES[pageTypeSlug] ?? [])
}

function jsonIn(key: string, value: string): Json {
  try {
    return JSON.parse(value) as Json
  } catch {
    throw new Error(
      `\`${key}\` is declared json and holds ${JSON.stringify(value.slice(0, 60))}, which no ` +
        `parse reads, so what a generator would render is the text rather than the value`
    )
  }
}

function valueIn(key: string, value: unknown, jsonText: ReadonlySet<string>): Json {
  if (value === undefined || value === null) return null
  if (typeof value === "string" && jsonText.has(key)) return jsonIn(key, value)
  return value as Json
}

function pageOf(
  pageTypeSlug: string,
  jsonText: ReadonlySet<string>,
  values: Readonly<Record<string, unknown>>
): Page {
  const held: Record<string, Json> = { pageTypeSlug }
  for (const [key, value] of Object.entries(values)) {
    held[camelizeKey(key)] = valueIn(key, value, jsonText)
  }
  return asPage(held)
}

function keysFor(select: readonly string[] | undefined): readonly string[] | undefined {
  if (select === undefined) return undefined
  const wanted = new Set(CARRIED)
  for (const one of select) wanted.add(kebabizeKey(one))
  return [...wanted]
}

export async function getPages(args: GetPagesArgs): Promise<PageResult> {
  const keys = keysFor(args.select)
  const asked = await askedAsSpelled(
    {
      "page-type": args.pageTypeSlug,
      ...(args.limit === undefined ? {} : { limit: args.limit }),
      ...(keys === undefined ? {} : { keys }),
    },
    (one) => askComposed(one)
  )
  if (!asked.ok) throw new Error(`\`${args.pageTypeSlug}\` went unread: ${asked.why}`)
  const { n, rows } = asked.answer
  if (rows.length !== n) {
    throw new Error(
      `\`${args.pageTypeSlug}\` answered with ${rows.length} of ${n} page(s), so this is a ` +
        `truncated population rather than the whole one, and nothing may be generated from it`
    )
  }
  const jsonText = jsonTextIn(args.pageTypeSlug)
  return { rows: rows.map((row) => pageOf(args.pageTypeSlug, jsonText, row.values)) }
}
