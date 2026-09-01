import type { SyncResult } from "./result.ts"

const SYNC_RUN_SLUG = "sync-run"

// A RUN OF A SYNC HAS NOT BEEN RECORDED SINCE THE STORE STOPPED TAKING KEYED WRITES. Everything
// this did was a keyed write: `writeRow` opened the run, `patchPage` marked the sync as running,
// `patchRow` settled it, and a second `patchRow` swept a stale run left by a killed process. All
// four refuse unconditionally.
//
// The opening `writeRow` was the first non-read statement, and it threw — so `syncFn()` was never
// called. That is the part worth being clear about: this wrapper has not merely failed to record
// the great-courses sync, it has been the reason that sync does not run at all. The one caller is
// `services/great-courses-sync.ts`, on a 07:35 daily timer.
//
// It still refuses rather than running `syncFn` and shrugging about the record, because tracking
// is the whole of what this is for. A run nobody can see the start, end or failure of is not a
// tracked run, and `sweepStaleRun` existed precisely because a run whose ending went unwritten is
// indistinguishable from one still going. Removing the refusal here would trade a loud stop for a
// silent, unobservable sync — flip it deliberately if that is the trade you want, and know that
// `tools/lib/great-courses/create-course.ts` refuses every course anyway, so today the sync would
// read everything and create nothing.
const NO_KEYED_WRITE = "the page store refuses every keyed write"

export const SYNC_WRITER = "sync-run-tracker"

export async function trackSyncRun(
  source: string,
  _syncFn: () => Promise<SyncResult>,
  _staleAfterMs?: number
): Promise<void> {
  throw new Error(
    `trackSyncRun(${source}): no \`${SYNC_RUN_SLUG}\` row can be opened — ${NO_KEYED_WRITE}, ` +
      `so the start, the ending and any failure of this run would all go unwritten. ` +
      `The sync was not started rather than run unobserved`
  )
}
