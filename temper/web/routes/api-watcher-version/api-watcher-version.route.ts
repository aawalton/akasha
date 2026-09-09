import type { Route } from "@akasha/code/route"

export const apiWatcherVersion = {
  id: "01a082a7-13dd-7e88-b9c8-603e9661ec81",
  pageTypeSlug: "route",
  type: "route",
  slug: "api-watcher-version",
  definition: "the watcher build on offer, and where to fetch it",
  code: "ts",
  urlPath: "api/watcher/version",
} as const satisfies Route
