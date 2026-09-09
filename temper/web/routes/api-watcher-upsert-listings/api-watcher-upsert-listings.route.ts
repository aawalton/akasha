import type { Route } from "@akasha/code/route"

export const apiWatcherUpsertListings = {
  id: "01a082a8-cb4c-7d80-ad39-e50b435f451b",
  pageTypeSlug: "route",
  type: "route",
  slug: "api-watcher-upsert-listings",
  definition: "the guild store listings the watcher posts",
  code: "ts",
  urlPath: "api/watcher/upsert-listings",
} as const satisfies Route
