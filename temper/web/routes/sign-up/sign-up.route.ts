import type { Route } from "akasha/code-system/routes/route.page-type.types.ts"

export const signUp = {
  id: "01a08307-1eb0-71af-b03b-9e4a212055e7",
  pageTypeSlug: "route",
  type: "route",
  slug: "sign-up",
  definition: "where someone without an account opens one",
  code: "tsx",
  urlPath: "sign-up",
} as const satisfies Route
