import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const temperPageListing = {
  id: "01a0829c-7c1f-7e3f-9f2c-c0fbb8fe6a3c",
  type: "page-type/route",
  slug: "temper-page-listing",
  definition: "the pages of a type shown together on a screen",
  code: "tsx",
  urlPath: ":pageTypeSlug",
  createdAt: "2026-09-08T20:01:28.607Z",
  updatedAt: "2026-09-22T10:09:33.000Z",
} as const satisfies Route
