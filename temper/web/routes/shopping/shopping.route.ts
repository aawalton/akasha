import type { Route } from "akasha/code-system/routes/route.page-type.types.ts"

export const shopping = {
  id: "01a08305-42a5-7973-a592-6a2b42429ea4",
  pageTypeSlug: "route",
  type: "route",
  slug: "shopping",
  definition: "what a player means to buy, and where it is cheapest",
  code: "tsx",
  urlPath: "shopping",
} as const satisfies Route
