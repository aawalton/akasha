import {
  type AskPages,
  composedFor,
  type PageQuery,
  type PagesRead,
  pageOfRow,
} from "@collections/exercises/pages/access"
import { askComposed } from "../../lib/page-query-client.ts"

/**
 * The exercise package's queries, asked of the checkout rather than of the remote index.
 *
 * `getPages` in that package binds the same queries to `@shared/pages-query/ask`, whose store holds
 * no page type in this family: `workout-schedule`, `exercise`, `equipment-item`,
 * `coaching-constraint`, `mobility-reading`, `workout-session` and `set-log` each come back
 * `400: '<page type>' names no page type the index holds`, so every reading command under
 * `ops exercise` exits 70 before printing a line.
 *
 * Nothing here decides what a query means or what a row means. `composedFor` and `pageOfRow` are the
 * exercise package's own — the query it would have asked, and the reducer it would have read the
 * answer with — so the only thing this file changes is which store answers. A command reached from
 * here reads the same rows the package would have read had its own store held them.
 */
export const askExercisePages: AskPages = async (query: PageQuery): Promise<PagesRead> => {
  const asked = await askComposed(composedFor(query))
  if (!asked.ok) throw new Error(`\`${query.pageTypeSlug}\` went unread: ${asked.why}`)
  return { rows: asked.rows.map((row) => pageOfRow(row.values)) }
}
