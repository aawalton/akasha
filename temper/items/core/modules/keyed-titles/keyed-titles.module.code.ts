import {
  numberAt,
  textAt,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

export interface KeyedTitles {
  readonly pageTypeSlug: string
  readonly keys: readonly string[]
  readonly titles: ReadonlyMap<string, string>
  readonly slugs: ReadonlyMap<string, string>
}

export const KEYED_TITLE_FIELDS: readonly string[] = ["slug", "key", "title", "displayOrder"]

interface Entry {
  readonly slug: string
  readonly key: string
  readonly title: string
  readonly order: number
}

function unread(pageTypeSlug: string, slug: string, name: string): Error {
  return new Error(`keyedTitlesFrom: ${pageTypeSlug} \`${slug}\` states no \`${name}\``)
}

function entryOf(pageTypeSlug: string, row: Value): Entry {
  const slug = textAt(row, "slug")
  if (slug === null) throw unread(pageTypeSlug, "?", "slug")
  const key = textAt(row, "key")
  if (key === null) throw unread(pageTypeSlug, slug, "key")
  const title = textAt(row, "title")
  if (title === null) throw unread(pageTypeSlug, slug, "title")
  const order = numberAt(row, "displayOrder")
  if (order === null) throw unread(pageTypeSlug, slug, "displayOrder")
  return { slug, key, title, order }
}

export function keyedTitlesFrom(pageTypeSlug: string, rows: readonly Value[]): KeyedTitles {
  const entries = rows
    .map((row) => entryOf(pageTypeSlug, row))
    .sort((one, two) => one.order - two.order)
  return {
    pageTypeSlug,
    keys: entries.map((one) => one.key),
    titles: new Map(entries.map((one) => [one.key, one.title])),
    slugs: new Map(entries.map((one) => [one.key, one.slug])),
  }
}

export function titleOf(titles: KeyedTitles, key: string): string {
  return titles.titles.get(key) ?? key
}

export function titleIn(titles: KeyedTitles | null, key: string): string {
  return titles === null ? key : titleOf(titles, key)
}

const held = new Map<string, KeyedTitles>()

export function holdKeyedTitles(titles: KeyedTitles): KeyedTitles {
  held.set(titles.pageTypeSlug, titles)
  return titles
}

export function heldKeyedTitles(pageTypeSlug: string): KeyedTitles | null {
  return held.get(pageTypeSlug) ?? null
}
