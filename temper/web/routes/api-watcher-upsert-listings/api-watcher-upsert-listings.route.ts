import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const apiWatcherUpsertListings = {
  id: "01a082a8-cb4c-7d80-ad39-e50b435f451b",
  type: "page-type/route",
  slug: "api-watcher-upsert-listings",
  definition: "the guild store listings the watcher posts",
  code: "ts",
  urlPath: "api/watcher/upsert-listings",
} as const satisfies Route
