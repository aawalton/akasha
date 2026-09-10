import type { Route } from "akasha/code-system/routes/route.page-type.types.ts"

export const methodology = {
  id: "01a08303-c18c-7e41-a3f8-f6712ebf65be",
  pageTypeSlug: "route",
  type: "route",
  slug: "methodology",
  definition: "how Temper works out what it tells a player",
  code: "tsx",
  urlPath: "methodology",
} as const satisfies Route
