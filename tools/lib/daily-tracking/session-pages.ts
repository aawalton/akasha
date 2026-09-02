import { sessionsFromAnswer, type SessionPage } from "../../../readouts/session-readings.ts"
import { allSessions } from "../tracking/day-place.ts"

/**
 * Every session Alan has recorded, shaped as the readout engine reads one.
 *
 * This used to be taken from `@akasha/status-bar-access/session-reading`, which binds the readout
 * engine's port to `askVia` — a port that asks for a query by the slug of a file in the checkout.
 * The engine that read those files is gone, so every call through it raised
 * ``askVia: `session-tracking-all`: ... the pages system service answers a query stated whole
 * rather than one asked for by name``. That raise was the first thing the daily points recompute
 * did, so nothing after it in that run had executed since the day the slug engine was removed.
 *
 * The repair is the one the refusal names: state the query whole. `allSessions` is the funnel's
 * whole-query reader, so the rows come back from the checkout the days are kept in, and the funnel
 * rather than this file decides where they are read from.
 *
 * `sessionsFromAnswer` is the engine's own reducer and it is handed the store's count untouched, so
 * every check it makes — no rows at all, a count that disagrees with the rows, a key not one row
 * carries — is made against the real answer rather than against a number this file made up.
 */
export async function readSessionPages(): Promise<readonly SessionPage[]> {
  const { n, rows } = await allSessions()
  return sessionsFromAnswer({ n, rows })
}
