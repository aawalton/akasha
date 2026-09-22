import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const home = {
  id: "01a08301-991a-70f9-bd5d-855d3f7bc8ab",
  type: "page-type/route",
  slug: "home",
  definition: "a signed-in player's landing screen",
  code: "tsx",
  urlPath: "home",
} as const satisfies Route
