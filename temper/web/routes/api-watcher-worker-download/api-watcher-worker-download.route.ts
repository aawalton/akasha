import type { Route } from "@akasha/code/route"

export const apiWatcherWorkerDownload = {
  id: "01a082a8-3378-7a06-98c0-67c7d9a8c96e",
  pageTypeSlug: "route",
  type: "route",
  slug: "api-watcher-worker-download",
  definition: "the watcher worker executable a player downloads",
  code: "ts",
  urlPath: "api/watcher/worker/download",
} as const satisfies Route
