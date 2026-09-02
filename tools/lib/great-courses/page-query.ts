import { askComposed } from "@shared/pages-query/ask"

const CEILING = 20_000

// A row as the store hands one over. This was imported from the old engine's `answer-schema`,
// which no longer exports the name, so the shape these three actually read is stated here.
export type QueryRow = {
  readonly values: Readonly<Record<string, unknown>>
}

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
    where: { title: { is: title } },
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

