import { fetchThrough } from "@shared/pages-query/fetcher"

export function answerPageQueriesInProcess(): void {
  fetchThrough(async (url, init) => {
    const { pageQueryInProcess } = await import("../lib/page-query-in-process.ts")
    return pageQueryInProcess(url, init)
  })
}
