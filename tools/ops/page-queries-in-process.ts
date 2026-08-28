import { fetchThrough } from "@shared/pages-query/fetcher"

/**
 * Answer `@shared/pages-query` off the checkouts on this machine, for every command `ops` runs.
 *
 * ONE INSTALL, NOT ONE PER COMMAND. `@shared/pages-query` reaches the pages by URL and falls back
 * to the native `fetch` when nothing is installed, so a command that reads through it dialed
 * `page-query-service.page-query-service.svc.cluster.local:8787` — a service that was deleted.
 * The seam is armed here, at the one entry every command comes through, so a command inherits it
 * without knowing the seam exists.
 *
 * THE ANSWERER IS IMPORTED ON THE FIRST FETCH, NOT HERE. `ops` runs constantly and its dispatch is
 * lazy on purpose, pulling a command's module only once that command is chosen. Importing the
 * in-process answerer at startup would load the pages reader into every `ops` call, including the
 * ones that never ask a page anything. The dynamic import inside the fetcher keeps that cost on
 * the calls that spend it.
 *
 * A STATED ORIGIN IS LEFT ALONE. Where `PAGE_QUERY_ORIGIN` is set, the caller has said where its
 * pages are — a CI pod is given one at `tools/lib/ci-pod-dispatcher/pod-spec-env.ts` — and the
 * in-process answerer ignores the origin it is handed. So nothing is installed in that case and
 * the native `fetch` reaches the stated origin exactly as it did before.
 */
export function answerPageQueriesInProcess(env: Record<string, string | undefined>): void {
  const stated = env.PAGE_QUERY_ORIGIN
  if (stated !== undefined && stated.trim() !== "") return
  fetchThrough(async (url, init) => {
    const { pageQueryInProcess } = await import("../lib/page-query-in-process.ts")
    return pageQueryInProcess(url, init)
  })
}
