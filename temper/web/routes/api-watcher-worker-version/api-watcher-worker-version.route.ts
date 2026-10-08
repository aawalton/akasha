import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const apiWatcherWorkerVersion = {
  id: "01a082a7-d208-71a7-9f7e-98632b505ae2",
  type: "page-type/route",
  slug: "api-watcher-worker-version",
  definition: "the watcher worker build on offer, and where to fetch it",
  code: "ts",
  urlPath: "api/watcher/worker/version",
  createdAt: "2026-09-08T20:13:51.496Z",
  updatedAt: "2026-09-15T16:44:30.000Z",
} as const satisfies Route
