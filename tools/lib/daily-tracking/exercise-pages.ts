import {
  composedFor,
  type PageQuery,
  type PagesRead,
  pageOfRow,
} from "@collections/exercises/pages/access"
import { askComposed } from "../page-query-client.ts"

/**
 * The exercise package's queries, asked of the checkout rather than of the remote index.
 *
 * `getPages` in that package binds the same queries to `@shared/pages-query/ask`, whose store holds
 * no page type in this family: `client-profile`, `workout-session`, `set-log` and `exercise` each
 * came back `400: '<page type>' names no page type the index holds`, and the points recompute died
 * on the first of them before it computed one figure.
 *
 * Nothing here decides what a query means or what a row means. `composedFor` and `pageOfRow` are the
 * exercise package's own — the query it would have asked, and the reducer it would have read the
 * answer with — so the only thing this file changes is which store answers. That is why the volume
 * a day is read as having is the same number either client could have given, rather than a second
 * reading of the same sets.
 */
export async function askExercisePages(query: PageQuery): Promise<PagesRead> {
  const asked = await askComposed(composedFor(query))
  if (!asked.ok) throw new Error(`\`${query.pageTypeSlug}\` went unread: ${asked.why}`)
  return { rows: asked.rows.map((row) => pageOfRow(row.values)) }
}
