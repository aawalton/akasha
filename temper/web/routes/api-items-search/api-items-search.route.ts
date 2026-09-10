import type { Route } from "akasha/code-system/routes/route.page-type.types.ts"

export const apiItemsSearch = {
  id: "01a082a6-1421-7056-8dc2-28dffe0465f8",
  pageTypeSlug: "route",
  type: "route",
  slug: "api-items-search",
  definition: "the mined items whose name has what was typed",
  code: "ts",
  urlPath: "api/items/search",
} as const satisfies Route
