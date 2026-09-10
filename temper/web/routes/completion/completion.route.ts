import type { Route } from "akasha/code-system/routes/route.page-type.types.ts"

export const completion = {
  id: "01a08301-3485-79cd-8d0c-32533b2be176",
  pageTypeSlug: "route",
  type: "route",
  slug: "completion",
  definition: "how much of the game the signed-in player has finished",
  code: "tsx",
  urlPath: "completion",
} as const satisfies Route
