import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const apiItemsSearch = {
  id: "01a082a6-1421-7056-8dc2-28dffe0465f8",
  type: "page-type/route",
  slug: "api-items-search",
  definition: "the mined items whose name has what was typed",
  code: "ts",
  urlPath: "api/items/search",
  createdAt: "2026-09-08T20:11:57.345Z",
  updatedAt: "2026-09-15T16:44:30.000Z",
} as const satisfies Route
