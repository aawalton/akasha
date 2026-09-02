import type { SyncResult } from "./result.ts"

const SYNC_RUN_SLUG = "sync-run"

// A RUN OF A SYNC IS NOT RECORDED AS A `sync-run` ROW, AND NO ROAD REACHES ONE. Everything the
// tracking did was a keyed write — `writeRow` opened the run, `patchPage` marked the sync as
// running, `patchRow` settled it, and a second `patchRow` swept a stale run left by a killed
// process — and all four refuse.
//
// Between 2026-09-01 16:26 and 17:13 this file refused instead, throwing before `syncFn()`, which
// took the whole daily sync down with it. The reasoning was that a run nobody can see the start,
// end or failure of is not a tracked run. The first half of that holds. The second half was not
// measured, and it is wrong twice:
//
// The row does not live at a path the store can be asked for. It lives in the checkout at
// `pages/sync/<source>.sync.runs.jsonl`, and the store answers for `akasha/` alone — a read of
// that path comes back 400, `stands outside \`akasha/\``. So `writeFiles` and `patchFiles`, the
// road every one of these refusals names as the way through, does not reach this record either.
// What wrote those 29 rows was the local-checkout branch of the page-query router, severed at
// 4c1f05a264 on 2026-09-01 16:26; the last row it landed was 2026-09-01T13:39:33.052Z, `success`.
// There is no remaining road, so refusing here buys no row — it only stops the sync.
//
// And the run is observed regardless. `great-courses-sync.service` is `Type=oneshot`, so systemd
// holds ExecMainStartTimestamp, ExecMainExitTimestamp, ExecMainStatus and Result for every run,
// and the journal holds the sync's own summary line. The row was a queryable second copy of that,
// not the only witness. Trading a run that happens and is visible to systemd for a run that never
// happens at all is not a trade that buys observability.
//
// So this runs the sync and says plainly that the row went unwritten, rather than refusing. The
// same call was already taken for the same reason at
// `akasha/calendar-sync/track-sync-run/track-sync-run.module.code.ts`.
//
// What this does keep is the exit code: item failures still throw, so a failed run is a failed
// unit rather than silence. That is the property worth guarding here, and it is untouched.
const NO_ROW_ROAD =
  "a `sync-run` row is inside a page's body rather than at a path of its own, the store answers " +
  "for `akasha/` alone, and this record is `pages/sync/<source>.sync.runs.jsonl` outside it, so " +
  "no keyed write and no `writeFiles` reaches it. systemd holds the start, the end and the exit " +
  "status of this run; the journal holds its summary"

export async function trackSyncRun(
  source: string,
  syncFn: () => Promise<SyncResult>
): Promise<void> {
  console.warn(
    `trackSyncRun(${source}): no \`${SYNC_RUN_SLUG}\` row was opened or settled — ${NO_ROW_ROAD}`
  )

  const result = await syncFn()

  if (result.failed > 0) {
    throw new Error(
      `sync "${source}" recorded ${result.failed} item failure${result.failed === 1 ? "" : "s"}, so this exits non-zero`
    )
  }
}
