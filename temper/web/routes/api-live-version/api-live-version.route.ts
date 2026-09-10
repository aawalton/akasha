import type { Route } from "akasha/code-system/routes/route.page-type.types.ts"

export const apiLiveVersion = {
  id: "01a082a2-5cce-7494-a17a-6f7d71f5e70b",
  pageTypeSlug: "route",
  type: "route",
  slug: "api-live-version",
  definition: "the build the server is running",
  code: "ts",
  urlPath: "api/live-version",
} as const satisfies Route
