import { askComposed } from "@shared/pages-query/ask"
import { type QueryRow } from "@shared/pages-query/answer-schema"

export const WRITER = "great-courses-sync"

const CEILING = 20_000

const SLUG_CEILING = 70

export async function everyRow(
  pageTypeSlug: string,
  keys: readonly string[]
): Promise<readonly QueryRow[]> {
  const asked = await askComposed({ "page-type": pageTypeSlug, keys, limit: CEILING })
  if (!asked.ok) throw new Error(`\`${pageTypeSlug}\` went unread: ${asked.why}`)
  const { n, rows } = asked.answer
  if (rows.length !== n) {
    throw new Error(
      `\`${pageTypeSlug}\` answered with ${rows.length} of ${n} page(s), so this is a truncated ` +
        `population rather than the whole one, and nothing may be decided against it`
    )
  }
  return rows
}

export async function pageTitled(
  pageTypeSlug: string,
  title: string,
  keys: readonly string[]
): Promise<QueryRow | null> {
  const asked = await askComposed({
    "page-type": pageTypeSlug,
    where: { title },
    keys: [...keys, "slug"],
  })
  if (!asked.ok) throw new Error(`\`${pageTypeSlug}\` titled "${title}" went unread: ${asked.why}`)
  return asked.answer.rows[0] ?? null
}

export function textAt(row: QueryRow, key: string): string | null {
  const held = row.values[key]
  if (typeof held === "string") return held === "" ? null : held
  if (typeof held === "number") return String(held)
  return null
}

export function slugFor(title: string, limit = SLUG_CEILING): string {
  const folded = title
    .normalize("NFKD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/&/g, "and")
  const hyphenated = folded.replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "")
  if (hyphenated.length <= limit) return hyphenated
  return hyphenated.slice(0, limit).replace(/-+$/, "")
}
