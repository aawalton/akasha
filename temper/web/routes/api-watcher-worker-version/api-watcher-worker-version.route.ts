import type { Route } from "akasha/code-system/routes/route.page-type.types.ts"

export const apiWatcherWorkerVersion = {
  id: "01a082a7-d208-71a7-9f7e-98632b505ae2",
  pageTypeSlug: "route",
  type: "route",
  slug: "api-watcher-worker-version",
  definition: "the watcher worker build on offer, and where to fetch it",
  code: "ts",
  urlPath: "api/watcher/worker/version",
} as const satisfies Route
