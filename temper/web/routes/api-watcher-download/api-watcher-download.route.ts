import type { Route } from "akasha/code-system/routes/route.page-type.types.ts"

export const apiWatcherDownload = {
  id: "01a082a7-6a2d-7190-b38a-a07b1507f476",
  pageTypeSlug: "route",
  type: "route",
  slug: "api-watcher-download",
  definition: "the watcher executable a player downloads",
  code: "ts",
  urlPath: "api/watcher/download",
} as const satisfies Route
