import type { Route } from "akasha/code-system/routes/route.page-type.types.ts"

export const home = {
  id: "01a08301-991a-70f9-bd5d-855d3f7bc8ab",
  pageTypeSlug: "route",
  type: "route",
  slug: "home",
  definition: "the screen a signed-in player lands on",
  code: "tsx",
  urlPath: "home",
} as const satisfies Route
