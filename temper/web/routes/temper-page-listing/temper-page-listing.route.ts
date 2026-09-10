import type { Route } from "akasha/code-system/routes/route.page-type.types.ts"

export const temperPageListing = {
  id: "01a0829c-7c1f-7e3f-9f2c-c0fbb8fe6a3c",
  pageTypeSlug: "route",
  type: "route",
  slug: "temper-page-listing",
  definition: "the pages of one type shown together on a screen",
  code: "tsx",
  urlPath: ":pageTypeSlug",
} as const satisfies Route
